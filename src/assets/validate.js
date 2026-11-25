// Deterministic guardrails for Claude-generated assets. Publishing refuses anything that fails here.
import fs from 'node:fs';
import { readJson, settings, p } from '../lib/config.js';
import { matchesTerm, firstMatch } from '../lib/match.js';

export const SUPERLATIVES = ['amazing', 'incredible', 'awesome', 'fantastic', 'outstanding', 'exceptional', 'phenomenal', 'revolutionary', 'world-class', 'best-in-class', 'brilliant', 'stellar', 'unparalleled', 'impressive', 'love', 'huge fan', 'admire'];
export const ASKS = ['referral', 'refer me', 'refer', 'open role', 'open position', 'any openings', 'job opening', 'hiring manager', 'quick call', 'hop on a call', 'coffee', 'minutes of your time', 'your time', 'chat sometime', 'set up a call', 'apply', 'resume', 'cv'];

let achIds;
const knownAch = () => (achIds ??= new Set(fs.readFileSync(p('experience/master.md'), 'utf8').match(/ACH-\d{3}/g)));
const forbidden = () => readJson('config/forbidden_terms.json').terms;

export function r5Violations(text) { return forbidden().filter((t) => matchesTerm(text, t)); }

export const resumeBullets = (r) => (r.story_rows || []).flatMap((row) => row.bullets || []);
const allText = (o) => JSON.stringify(o);

export function validateLinkedIn(msg, cfg = settings().assets) {
  const e = [];
  if (!msg || typeof msg !== 'string') return ['linkedin_message missing'];
  if (msg.length > cfg.linkedin_max_chars) e.push(`LinkedIn message is ${msg.length} chars (max ${cfg.linkedin_max_chars})`);
  const sup = firstMatch(msg, SUPERLATIVES); if (sup) e.push(`LinkedIn message contains superlative/flattery: "${sup}"`);
  const ask = firstMatch(msg, ASKS); if (ask) e.push(`LinkedIn message contains a request for referral/role/time: "${ask}"`);
  return e;
}

export function validateDeck(deck, cfg = settings().assets) {
  const e = [];
  const n = deck?.slides?.length || 0;
  if (n < cfg.deck_slides_min || n > cfg.deck_slides_max) e.push(`deck has ${n} slides (need ${cfg.deck_slides_min}–${cfg.deck_slides_max})`);
  if (n && deck.slides[0].lines?.length !== cfg.deck_hook_lines) e.push(`slide 1 must have exactly ${cfg.deck_hook_lines} summary lines (has ${deck.slides[0].lines?.length || 0})`);
  if (/\b(recruiter|talent acquisition|hiring team)\b/i.test(allText(deck))) e.push('deck must be addressed to a product peer, not recruiting');
  return e;
}

export function validateResume(r, cfg = settings().assets) {
  const e = [];
  const bullets = resumeBullets(r);
  if (bullets.length < cfg.resume_bullets_min || bullets.length > cfg.resume_bullets_max) e.push(`resume has ${bullets.length} bullets (need ${cfg.resume_bullets_min}–${cfg.resume_bullets_max})`);
  bullets.forEach((b, i) => {
    if (!b.ach?.length) e.push(`bullet ${i + 1} has no ACH source (source governance)`);
    for (const id of b.ach || []) if (!knownAch().has(id)) e.push(`bullet ${i + 1} cites unknown ${id}`);
    if (!['Fact', 'G1', 'G2'].includes(b.type)) e.push(`bullet ${i + 1} type must be Fact, G1 or G2`);
    if (/\bresponsible for\b|\bhelped to\b/i.test(b.text)) e.push(`bullet ${i + 1} uses banned phrasing (R9)`);
  });
  const gen = bullets.filter((b) => b.type !== 'Fact').length;
  if (gen > Math.ceil(bullets.length / 4)) e.push(`${gen} generated bullets exceeds R14 limit (≤ a quarter)`);
  if ((r.kpis || []).length !== 4) e.push('impact strip must have exactly 4 KPI tiles (R11)');
  if ((r.story_rows || []).length < 4) e.push('story spine needs ≥4 labelled rows (six-row default)');
  return e;
}

export function validateCoverLetter(c) {
  const words = [c?.hook, ...(c?.sections || []).flatMap((s) => [s.heading, ...(s.bullets || []), s.text]), c?.gap_paragraph, c?.close].filter(Boolean).join(' ').split(/\s+/).length;
  const e = [];
  if (words < 200 || words > 380) e.push(`cover letter is ${words} words (target 250–320)`);
  if (!c?.hook) e.push('cover letter hook missing');
  return e;
}

export function validateInfoSheet(s) {
  const need = ['overview', 'products', 'market_position', 'recent_developments', 'relevance'];
  const e = need.filter((k) => !s?.[k]).map((k) => `company info section missing: ${k}`);
  if (!s?.sources?.length) e.push('company info must list public sources');
  return e;
}

export function validateAssets(a) {
  const errors = [
    ...validateResume(a.resume || {}),
    ...validateCoverLetter(a.cover_letter),
    ...validateLinkedIn(a.linkedin_message),
    ...validateInfoSheet(a.company_info),
    ...validateDeck(a.deck),
  ];
  const r5 = r5Violations(allText(a));
  if (r5.length) errors.push(`R5 violation — forbidden client names/codes: ${r5.join(', ')}`);
  for (const k of ['listing_id', 'company', 'title']) if (!a[k]) errors.push(`missing ${k}`);
  return errors;
}
