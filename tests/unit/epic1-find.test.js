// EPIC-1 (FR-1) offline tests. Live-endpoint steps are in tests/live/.
import '../helpers.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateSeed, loadSeed } from '../../src/discovery/seed.js';
import { parseCsv, isSponsor, isStale, applyVisaFlags } from '../../src/discovery/visaRegister.js';
import { parseHnComments, mergeCandidates, TIERS } from '../../src/discovery/companyDiscovery.js';
import { classifyDomain, fitScore } from '../../src/discovery/classify.js';
import { generateQueries, runSequential } from '../../src/discovery/queries.js';
import { makeTitleFilter } from '../../src/pipeline/titles.js';
import { dedupe } from '../../src/pipeline/dedup.js';
import { applyFirstSeen } from '../../src/pipeline/firstSeen.js';
import { makeListing, validateListing, REQUIRED_FIELDS } from '../../src/pipeline/listing.js';
import { classifyWorkModel } from '../../src/pipeline/workModel.js';
import { audit, resetAudit } from '../../src/lib/http.js';
import { parseRss } from '../../src/sources/boards.js';
import { extractJobLinks } from '../../src/sources/html.js';

test('TC-101 seed list: parses, schema-valid, booleans only, ≥30 companies', () => {
  const raw = JSON.parse(fs.readFileSync(new URL('../../config/companies.json', import.meta.url)));
  assert.ok(Array.isArray(raw));
  assert.deepEqual(validateSeed(raw), []);
  for (const c of raw) for (const k of ['remote_global', 'india_gcc', 'visa_sponsor', 'india_presence']) assert.equal(typeof c[k], 'boolean', `${c.name}.${k}`);
  assert.ok(raw.length >= 30, `count=${raw.length}`);
  assert.doesNotThrow(() => loadSeed());
  assert.ok(validateSeed([{ name: 'X', remote_global: 'yes', india_gcc: null, visa_sponsor: true, india_presence: true }]).length === 2);
});

test('TC-102 visa register: exact legal-name match, substring rejected, 24h cache rule', () => {
  const csv = 'Organisation Name,Town/City,County,Type & Rating,Route\n"Deloitte LLP",London,,Worker (A rating),Skilled Worker\n"Stripe Payments UK Ltd",London,,Worker (A rating),Skilled Worker\n';
  const rows = parseCsv(csv);
  assert.equal(rows.length, 3);
  const set = new Set(rows.slice(1).map((r) => r[0].toLowerCase()));
  assert.equal(isSponsor(set, 'Deloitte LLP'), true);
  assert.equal(isSponsor(set, 'deloitte llp'), true, 'case-insensitive');
  assert.equal(isSponsor(set, 'Deloitte'), false, 'substring must not match');
  const [c] = applyVisaFlags([{ name: 'Stripe', uk_legal_names: ['Stripe Payments UK Ltd'] }], set);
  assert.equal(c.visa_sponsor, true);
  const f = `${fs.mkdtempSync('/tmp/jsf-')}/fresh.csv`; fs.writeFileSync(f, 'x');
  assert.equal(isStale(f), false, 'fresh cache → no re-download');
  assert.equal(isStale(f, Date.now() + 25 * 3600e3), true, '>24h → re-download');
  assert.equal(isStale('/nonexistent'), true);
  fs.unlinkSync(f);
});

test('TC-103 discovery: HN parsing, tiers, no job listings, cross-tier dedup', () => {
  const hn = parseHnComments([{ text: 'Acme AI | Senior Product Manager | Remote<p>We build LLM agents for product teams.' }, { text: 'NoPipe company text' }, { deleted: true }]);
  assert.equal(hn.length, 1); assert.equal(hn[0].name, 'Acme AI'); assert.equal(hn[0].tier, TIERS.HN);
  const merged = mergeCandidates([[{ name: 'Acme AI', tier: TIERS.VC, source: 'yc' }], hn]);
  assert.equal(merged.length, 1, 'one entry for both tiers');
  assert.deepEqual(merged[0].sources.sort(), ['hn', 'yc']);
  for (const c of merged) for (const k of ['title', 'application_url', 'full_description']) assert.ok(!(k in c), 'queue holds companies, never listings');
});

test('TC-104 domain classification + fit scoring, deterministic, no network', () => {
  resetAudit();
  assert.equal(classifyDomain('Enterprise generative AI platform: LLM agents and RAG'), 'ai_platform');
  const hi = fitScore({ name: 'X', description: 'Generative AI platform with LLM evaluation framework, guardrails, RAG and vector database for pharma marketing content' });
  const lo = fitScore({ name: 'Y', description: 'Artisanal bakery and coffee shop chain' });
  assert.ok(hi.fit > 0.7, `high=${hi.fit}`);
  assert.ok(lo.fit < 0.2, `low=${lo.fit}`);
  assert.ok(hi.keyword_hits.length > 0, 'keywords traced to experience file');
  assert.equal(JSON.stringify(fitScore({ name: 'X', description: 'LLM' })), JSON.stringify(fitScore({ name: 'X', description: 'LLM' })), 'deterministic');
  assert.equal(audit.length, 0, 'zero external calls');
});

test('TC-105 queries from experience file + sequential execution with delay', async () => {
  const qs = generateQueries();
  assert.ok(qs.length >= 5 && new Set(qs).size === qs.length, `queries=${qs.join(' | ')}`);
  assert.ok(qs.some((q) => /llm|generative ai|rag|evaluation/i.test(q)), 'reference real skills');
  const r = await runSequential(['a', 'b', 'c'], async (q) => [makeListing({ title: `Senior Product Manager ${q}`, employer: 'E', url: 'https://x.example', source: 'adzuna' })], 120);
  const gaps = r.timestamps.slice(1).map((t, i) => t - r.timestamps[i]);
  assert.ok(gaps.every((g) => g >= 115), `gaps=${gaps}`);
  assert.deepEqual(Object.keys(r.results[0]).filter((k) => REQUIRED_FIELDS.includes(k)).sort(), [...REQUIRED_FIELDS].sort(), 'aggregator results use the unified schema');
});

test('TC-107 title matching: case-insensitive, word-boundary', () => {
  const f = makeTitleFilter();
  for (const t of ['Senior Product Manager', 'AI PRODUCT MANAGER', 'ai product manager', 'Group Product Manager, Payments', 'Principal Product Manager', 'Product Lead - Agents', 'Sr. Product Manager', 'Head of Product']) assert.ok(f(t), t);
  for (const t of ['Product Manager Intern', 'Junior Product Manager', 'Senior Software Engineer', 'Product Marketing Manager', 'Senior Product Designer']) assert.ok(!f(t), t);
  assert.ok(f('Senior Product Manager, Internal Tools'), '"internal" must not trigger the "intern" exclusion');
  assert.ok(f('Senior Product Manager - Internet of Things'));
});

test('TC-108 multi-source: RSS + HTML parsers produce the unified schema; excluded hosts blocked', async () => {
  const rss = '<?xml version="1.0"?><rss><channel><item><title>Acme: Senior Product Manager &amp; AI</title><region>Anywhere</region><link>https://wwr.example/1</link><pubDate>Mon, 24 Nov 2026 10:00:00 +0000</pubDate><description>&lt;p&gt;Build LLM products&lt;/p&gt;</description></item></channel></rss>';
  const items = parseRss(rss, 'weworkremotely');
  assert.equal(items[0].employer, 'Acme'); assert.equal(items[0].title, 'Senior Product Manager & AI');
  const html = '<ul><li><a href="/jobs/1">Senior Product Manager</a><span class="company">Beta</span><span class="location">London</span></li></ul>';
  const out = extractJobLinks(html, 'https://board.example/', 'lennysjobs', makeTitleFilter());
  assert.equal(out.length, 1); assert.equal(out[0].employer, 'Beta'); assert.deepEqual(validateListing(out[0]), []);
  const { http } = await import('../../src/lib/http.js');
  await assert.rejects(http('https://www.indeed.com/jobs'), /excluded/);
  await assert.rejects(http('https://www.naukri.com/x'), /excluded/);
  for (const src of ['src/sources/boards.js', 'src/sources/html.js', 'src/ats/adapters.js']) assert.doesNotMatch(fs.readFileSync(new URL(`../../${src}`, import.meta.url), 'utf8'), /naukri\.com|indeed\.com/);
});

test('TC-109 dedup: same employer+title merges locations; different title/employer stay separate', () => {
  const mk = (employer, title, loc) => makeListing({ employer, title, url: 'https://x.example', location: loc, source: 'greenhouse' });
  const r1 = dedupe([mk('Stripe', 'Senior Product Manager', 'Dublin'), mk('stripe', 'Senior Product Manager - London', 'London')]);
  assert.equal(r1.listings.length, 1); assert.equal(r1.listings[0].hiring_location, 'Dublin, London');
  assert.equal(dedupe([mk('Stripe', 'Senior Product Manager', 'X'), mk('Stripe', 'Group Product Manager', 'X')]).listings.length, 2);
  assert.equal(dedupe([mk('Stripe', 'Senior Product Manager', 'X'), mk('Ramp', 'Senior Product Manager', 'X')]).listings.length, 2);
});

test('TC-110 first-seen + ghost risk (90 days); Greenhouse updated_at ignored', () => {
  const state = { listings: {} };
  const day0 = new Date('2026-08-01T01:30:00Z');
  const l = () => [{ key: 'acme|senior product manager', posting_date: '2026-11-20' /* Greenhouse updated_at */ }];
  const [a] = applyFirstSeen(l(), state, day0);
  assert.equal(a.first_seen_date, '2026-08-01');
  const [b] = applyFirstSeen(l(), state, new Date(day0.getTime() + 864e5));
  assert.equal(b.first_seen_date, '2026-08-01', 'never overwritten');
  assert.equal(applyFirstSeen(l(), state, new Date(day0.getTime() + 89 * 864e5))[0].ghost_risk, false);
  assert.equal(applyFirstSeen(l(), state, new Date(day0.getTime() + 91 * 864e5))[0].ghost_risk, true);
});

test('TC-111 every listing carries the 7 fields; required fields non-null', () => {
  const l = makeListing({ title: 'Senior Product Manager', employer: 'Acme', url: 'https://acme.example/1', location: 'Remote', posted: '2026-11-01', descriptionHtml: '<p>Text</p>', source: 'workday' });
  for (const f of REQUIRED_FIELDS) assert.ok(f in l, f);
  assert.equal(l.full_description, 'Text');
  assert.deepEqual(validateListing(l), []);
  assert.ok(validateListing({ ...l, application_url: 'not a url' }).length);
});

test('TC-112 work model two-pass classification', () => {
  resetAudit();
  const base = { hiring_location: 'Remote', remote_hint: 'remote' };
  assert.deepEqual(pick(classifyWorkModel({ ...base, full_description: 'Fully distributed team. Work from anywhere.' })), ['Remote-Verified', 'High']);
  assert.deepEqual(pick(classifyWorkModel({ ...base, full_description: 'This role is remote but you must be based in London.' })), ['Remote-Geo-Restricted', 'Low']);
  assert.deepEqual(pick(classifyWorkModel({ hiring_location: 'Hybrid - Bangalore', full_description: 'Hybrid model: three days a week in the office.' })), ['Hybrid', 'High']);
  assert.deepEqual(pick(classifyWorkModel({ ...base, full_description: 'You will regularly meet on-site with customers and in our office.' })), ['Hybrid', 'Low']);
  assert.equal(classifyWorkModel({ hiring_location: 'San Francisco, CA', full_description: '' }).work_model, 'Onsite');
  assert.equal(audit.length, 0, 'pure regex — no external calls');
});
const pick = (r) => [r.work_model, r.work_model_confidence];
