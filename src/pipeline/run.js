// FR-5 pipeline: discovery → dedup → classify → score → Sheet → digest. Each source is isolated; one failure never stops the run.
import fs from 'node:fs';
import { loadSeed } from '../discovery/seed.js';
import { downloadRegister, loadSponsorSet, applyVisaFlags, isSponsor, legalNameCandidates } from '../discovery/visaRegister.js';
import { discoverCompanies } from '../discovery/companyDiscovery.js';
import { fitScore, classifyDomain } from '../discovery/classify.js';
import { detectMany } from '../ats/detect.js';
import { ADAPTERS } from '../ats/adapters.js';
import { jsonBoards, rssBoards } from '../sources/boards.js';
import { htmlBoards } from '../sources/html.js';
import { aggregators } from '../sources/aggregators.js';
import { makeTitleFilter, isPmTitle } from './titles.js';
import { validateListing } from './listing.js';
import { dedupe } from './dedup.js';
import { applyFirstSeen, pruneState } from './firstSeen.js';
import { classifyWorkModel } from './workModel.js';
import { recordPmCount } from '../scoring/velocity.js';
import { fetchLayoffEvents, layoffFlag } from '../scoring/layoffs.js';
import { financialHealth } from '../scoring/financial.js';
import { phase1Score, rangesFor } from '../scoring/deterministic.js';
import { rank } from '../scoring/rank.js';
import { loadState, saveState } from '../lib/state.js';
import { readJson, writeJson, settings, p } from '../lib/config.js';
import { mapLimit, audit } from '../lib/http.js';
import { normaliseEmployer } from '../lib/normalize.js';
import { log } from '../lib/log.js';

export async function runDiscovery({ now = new Date(), google = true, sources: only, skipDiscovery = false } = {}) {
  const cfg = settings();
  const t0 = Date.now();
  const state = loadState();
  const summary = { runAt: now.toISOString(), failures: [], sourceCounts: {} };
  const titleFilter = makeTitleFilter();
  let corpus = 0; // every posting title examined = corpus size for the cost funnel (TC-504)
  const pmFilter = (t) => { corpus++; return isPmTitle(t) || titleFilter(t); };
  const stage = {}; let last = Date.now();
  const mark = (n) => { stage[n] = Date.now() - last; last = Date.now(); };
  const want = (name) => !only || only.includes(name);

  // FR-1.1 seed + UK visa register (exact legal name)
  const seed = loadSeed();
  let sponsorSet = null;
  try { await downloadRegister(); const r = loadSponsorSet(); sponsorSet = r.set; summary.sponsorRows = r.rowCount; applyVisaFlags(seed, sponsorSet); }
  catch (e) { summary.failures.push({ source: 'uk_visa_register', error: e.message }); }

  mark('visa');
  // FR-1.2 nominate companies (once per ~day), FR-1.3 classify + fit (deterministic)
  let candidates = readJson('data/candidates.json', []);
  const stale = !candidates.length || now - new Date(state.last_discovery || 0) > 20 * 3600e3;
  if (!skipDiscovery && want('discovery') && stale) {
    try { candidates = await discoverCompanies(candidates); state.last_discovery = now.toISOString(); writeJson('data/candidates.json', candidates); }
    catch (e) { summary.failures.push({ source: 'company_discovery', error: e.message }); }
  }
  const seedNames = new Set(seed.map((c) => c.name.toLowerCase()));
  const scored = candidates.filter((c) => !seedNames.has(c.name.toLowerCase())).map((c) => ({ ...c, ...fitScore(c) }));
  const fresh = scored.filter((c) => c.fit >= 0.3 && !state.ats_cache[c.name]).sort((a, b) => b.fit - a.fit).slice(0, cfg.discovery.max_new_candidates_per_run);
  const known = scored.filter((c) => state.ats_cache[c.name]?.platform);
  for (const c of [...fresh, ...known]) c.visa_sponsor = sponsorSet ? legalNameCandidates(c).some((n) => isSponsor(sponsorSet, n)) : false;

  mark('company_discovery');
  // FR-1.5 ATS detection (parallel), FR-1.6 retrieval
  const t1 = Date.now();
  const detected = want('ats') ? await detectMany([...seed, ...fresh, ...known], { state, now }) : [];
  summary.atsDetection = { companies: detected.length, detected: detected.filter((d) => d.platform).length, ms: Date.now() - t1 };
  const companyByName = new Map();
  for (const c of [...seed, ...fresh, ...known]) companyByName.set(normaliseEmployer(c.name), { ...c, product_domain: classifyDomain(`${c.description || ''}`) });

  const raw = [];
  const pmCounts = {};
  await mapLimit(detected.filter((d) => d.platform), 6, async ({ company, platform, config }) => {
    try {
      const all = await ADAPTERS[platform].fetch(company, config, pmFilter);
      pmCounts[company.name] = all.filter((l) => isPmTitle(l.title)).length;
      raw.push(...all);
      summary.sourceCounts[platform] = (summary.sourceCounts[platform] || 0) + all.length;
    } catch (e) { summary.failures.push({ source: `${platform}:${company.name}`, error: e.message.slice(0, 160) }); }
  });

  mark('ats_fetch');
  // FR-1.7 boards + aggregators, equal priority, isolated
  const boardFns = { ...jsonBoards, ...rssBoards, ...htmlBoards, ...aggregators };
  await mapLimit(Object.entries(boardFns).filter(([n]) => want(n) || want('boards')), 6, async ([name, fn]) => {
    try { const r = await fn(pmFilter); raw.push(...r); summary.sourceCounts[name] = r.length; }
    catch (e) { summary.failures.push({ source: name, error: e.message.slice(0, 160) }); }
  });
  mark('boards');
  summary.totalFetched = raw.length;
  summary.corpus = corpus;
  summary.sourcesOk = Object.keys(summary.sourceCounts).length;

  // FR-1.10 field validation, FR-1.6 title filter, FR-1.8 dedup
  const valid = raw.filter((l) => validateListing(l).length === 0);
  summary.invalid = raw.length - valid.length;
  const matched = valid.filter((l) => titleFilter(l.title));
  const { listings, removed } = dedupe(matched);
  summary.matched = matched.length; summary.dedupRemoved = removed;

  // FR-1.9 first-seen / ghost risk, FR-1.11 work model
  applyFirstSeen(listings, state, now);
  for (const l of listings) Object.assign(l, classifyWorkModel(l));

  // FR-2.3/2.5 company signals
  const velocityBy = {};
  for (const [name, count] of Object.entries(pmCounts)) velocityBy[name] = recordPmCount(state, name, count, now);
  const layoffEvents = want('layoffs') ? await fetchLayoffEvents().catch(() => []) : [];
  const financialCache = {};
  for (const l of listings) {
    const c = companyByName.get(normaliseEmployer(l.employer)) || { name: l.employer, funding_stage: 'unknown' };
    const v = velocityBy[c.name] || { velocity: 0, hiring_freeze: false };
    const lay = layoffFlag(c.name, layoffEvents, now);
    const visa = c.visa_sponsor ?? (sponsorSet ? legalNameCandidates({ name: l.employer }).some((n) => isSponsor(sponsorSet, n)) : false);
    Object.assign(l, { velocity: v.velocity, hiring_freeze: v.hiring_freeze, ...lay, visa_sponsor: visa, funding_stage: c.funding_stage || 'unknown', product_domain: c.product_domain || classifyDomain(`${l.employer} ${l.full_description.slice(0, 1500)}`) });
    financialCache[c.name] ??= financialHealth(c, { velocity: v.velocity, hiring_freeze: v.hiring_freeze, layoff_recent: lay.layoff_recent }).catch(() => ({ score: 0, label: 'unavailable', basis: 'inferred' }));
    l._fin = financialCache[c.name];
  }
  for (const l of listings) { const f = await l._fin; delete l._fin; l.financial_score = f.score; l.financial_label = `${f.score.toFixed(2)} — ${f.label}`; l.financial_basis = f.basis; }

  mark('signals');
  // FR-2.1 phase 1 + FR-2.7 single ranked list
  const ranges = rangesFor(listings);
  for (const l of listings) {
    const s = phase1Score(l, ranges);
    Object.assign(l, { phase1: s.phase1, total_score: s.phase1, veto: s.veto, components: s.weighted, score_evidence: s.veto || `P1: ${Object.entries(s.weighted).filter(([, v]) => v > 0).map(([k, v]) => `${k} ${v}`).join(', ') || 'no positive signals'}` });
  }
  const ranked = rank(listings);
  const newOnes = ranked.filter((l) => l.first_seen_at === now.toISOString());
  summary.newListings = newOnes.length;
  summary.aboveThreshold = newOnes.filter((l) => l.phase1 >= cfg.thresholds.above_threshold_phase1).length;
  summary.top = newOnes.slice(0, 5);

  // FR-2.10 shortlist → semantic tier (Claude) + JD store for asset generation
  const shortlist = ranked.filter((l) => !l.veto).slice(0, cfg.semantic.shortlist_size);
  writeJson('data/shortlist.json', { generated_at: now.toISOString(), corpus: summary.totalFetched, matched: listings.length, listings: shortlist.map(slim) });
  storeJds(ranked.slice(0, cfg.sheet.max_jd_files), now);
  summary.shortlist = shortlist.length;

  if (google) await publishToGoogle(ranked, summary).catch((e) => { summary.failures.push({ source: 'google_sheets', error: e.message }); summary.googleError = e.message; });

  mark('google');
  summary.stageMs = stage;
  pruneState(state, now);
  state.runs = [...(state.runs || []).slice(-60), { at: now.toISOString(), fetched: summary.totalFetched, matched: summary.matched, new: summary.newListings, ms: Date.now() - t0 }];
  saveState(state);
  summary.durationMs = Date.now() - t0;
  summary.requests = audit.length;
  writeJson('data/last-run.json', { ...summary, top: summary.top.map((l) => ({ id: l.id, title: l.title, employer: l.employer, total_score: l.total_score })) });
  return { summary, listings: ranked };
}

const slim = (l) => ({ id: l.id, key: l.key, title: l.title, employer: l.employer, hiring_location: l.hiring_location, work_model: l.work_model, product_domain: l.product_domain, phase1: l.phase1, application_url: l.application_url, jd_excerpt: (l.full_description || '').slice(0, 6000) });

function storeJds(listings, now) {
  fs.mkdirSync(p('data/jd'), { recursive: true });
  for (const l of listings) writeJson(`data/jd/${l.id}.json`, { ...slim(l), full_description: l.full_description, stored_at: now.toISOString() });
  const keep = settings().sheet.jd_retention_days * 864e5;
  for (const f of fs.readdirSync(p('data/jd'))) {
    const file = p('data/jd', f);
    if (now - fs.statSync(file).mtimeMs > keep) fs.unlinkSync(file);
  }
}

async function publishToGoogle(ranked, summary) {
  const { hasGoogle } = await import('../google/auth.js');
  if (!hasGoogle()) { summary.failures.push({ source: 'google', error: 'Google OAuth secrets not configured (OD-3) — Sheet and email skipped' }); return; }
  const { ensureSheet, upsertListings, readRows, googleConfig } = await import('../google/sheet.js');
  const sheetId = await ensureSheet();
  const r = await upsertListings(sheetId, ranked);
  summary.sheet = r;
  summary.sheetUrl = googleConfig().sheet_url || `https://docs.google.com/spreadsheets/d/${sheetId}`;
  const rows = await readRows(sheetId);
  const th = settings().thresholds;
  // Daily workload = today's new above-threshold rows still undecided (the older backlog is optional browsing)
  const dayAgo = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  summary.pendingApprovals = rows.filter((x) => !x.obj.approval && Number(x.obj.total_score) >= th.above_threshold_phase1 && String(x.obj.first_seen_date) >= dayAgo).length;
  summary.backlog = rows.filter((x) => !x.obj.approval && Number(x.obj.total_score) >= th.above_threshold_phase1).length;
  summary.assetsToReview = rows.filter((x) => x.obj.assets_generated && Date.now() - new Date(x.obj.assets_generated) < 864e5).length;
  summary.pendingActions = summary.pendingApprovals + summary.assetsToReview;
}
