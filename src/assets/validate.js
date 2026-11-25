// Deterministic guardrails for Claude-generated assets. Publishing refuses anything that fails here.
import fs from 'node:fs';
import { readJson, settings, p } from '../lib/config.js';
import { matchesTerm, firstMatch } from '../lib/match.js';

export const SUPERLATIVES = ['amazing', 'incredible', 'awesome', 'fantastic', 'outstanding', 'exceptional', 'phenomenal', 'revolutionary', 'world-class', 'best-in-class', 'brilliant', 'stellar', 'unparalleled', 'impressive', 'huge fan', 'admire', 'passionate'];
export const ASKS = ['referral', 'refer me', 'refer', 'open role', 'open position', 'any openings', 'job opening', 'hiring manager', 'quick call', 'hop on a call', 'coffee', 'minutes of your time', 'your time', 'chat sometime', 'set up a call', 'apply', 'applied', 'resume', 'cv'];
// Stock phrases that make a note read as a template (owner feedback, 25 Nov 2026: "generic and pathetic").
export const GENERIC_NOTE = ['glad to connect', 'keen to connect', 'happy to connect', "let's connect", 'lets connect', 'expand my network', 'grow my network', 'i came across', 'came across your', 'reaching out', 'problem space', 'synergy', 'pick your brain', 'your profile', 'great work', 'similar interests', 'like-minded', 'i am writing', 'hope this finds you', 'close to mine'];
// Cover-letter clichés (owner feedback: it must read like a letter, not a list of resume points).
export const LETTER_CLICHES = ['i am writing to express', 'i am excited to apply', 'perfect fit', 'ideal candidate', 'dream job', 'team player', 'hit the ground running', 'proven track record', 'passionate about', 'i believe i would be'];

let achIds;
const knownAch = () => (achIds ??= new Set(fs.readFileSync(p('experience/master.md'), 'utf8').match(/ACH-\d{3}/g)));
const forbidden = () => readJson('config/forbidden_terms.json').terms;

export function r5Violations(text) { return forbidden().filter((t) => matchesTerm(text, t)); }

export const resumeBullets = (r) => (r.story_rows || []).flatMap((row) => row.bullets || []);
const allText = (o) => JSON.stringify(o);
const plain = (s) => String(s || '').replace(/\*\*/g, '');
const words = (s) => plain(s).split(/\s+/).filter(Boolean);
const tokens = (s) => new Set(plain(s).toLowerCase().match(/[a-z0-9~$%.+-]+/g)?.filter((t) => t.length > 2) || []);
const jaccard = (a, b) => { const x = tokens(a); const y = tokens(b); const i = [...x].filter((t) => y.has(t)).length; return i / (x.size + y.size - i || 1); };
const sentences = (s) => plain(s).split(/(?<=[.!?])\s+/).filter((x) => x.split(/\s+/).length >= 6);

/** LinkedIn note: ≤300 chars, no asks, no flattery, no stock phrases; must name something specific about the company. */
export function validateLinkedIn(msg, ctx = {}, cfg = settings().assets) {
  const e = [];
  if (!msg || typeof msg !== 'string') return ['linkedin_message missing'];
  if (msg.length > cfg.linkedin_max_chars) e.push(`LinkedIn message is ${msg.length} chars (max ${cfg.linkedin_max_chars})`);
  const sup = firstMatch(msg, SUPERLATIVES); if (sup) e.push(`LinkedIn message contains superlative/flattery: "${sup}"`);
  const ask = firstMatch(msg, ASKS); if (ask) e.push(`LinkedIn message contains a request for referral/role/time: "${ask}"`);
  const gen = GENERIC_NOTE.find((g) => msg.toLowerCase().includes(g)); if (gen) e.push(`LinkedIn message uses a stock phrase: "${gen}" — say something specific instead`);
  if (!/\d/.test(msg)) e.push('LinkedIn message needs one concrete detail (a number, date or named release), not a general statement');
  const anchors = [ctx.company, ...(ctx.products || [])].filter(Boolean).map((s) => String(s).toLowerCase().split(/[,(—–-]/)[0].trim()).filter((s) => s.length > 2);
  if (anchors.length && !anchors.some((a) => msg.toLowerCase().includes(a))) e.push('LinkedIn message must reference the company or one of its products specifically');
  return e;
}

/** Deck: cover + 4–6 storyline slides (exec summary first, exactly 5 lines) + close; action titles; peer, not recruiter. */
export function validateDeck(deck, cfg = settings().assets) {
  const e = [];
  const slides = deck?.slides || [];
  const n = slides.length;
  if (n < cfg.deck_slides_min || n > cfg.deck_slides_max) e.push(`deck has ${n} slides (need ${cfg.deck_slides_min}–${cfg.deck_slides_max} storyline slides between the cover and the close)`);
  if (n && slides[0].lines?.length !== cfg.deck_hook_lines) e.push(`slide 1 (executive summary) must have exactly ${cfg.deck_hook_lines} summary lines (has ${slides[0].lines?.length || 0})`);
  if (!deck?.cover?.title || !deck?.cover?.subtitle) e.push('deck needs a cover {title, subtitle}');
  if (!deck?.close?.title || !deck?.close?.lines?.length) e.push('deck needs a closing slide {title, lines}');
  slides.forEach((s, i) => {
    const w = words(s.title).length;
    if (w < 6 || w > 18) e.push(`slide ${i + 1} title must be an action title: one full-sentence takeaway of 6–18 words (has ${w})`);
    if (i > 0 && !s.section) e.push(`slide ${i + 1} needs a section tag for the tracker (e.g. Situation, Complication, Resolution)`);
    if (i > 0 && ((s.lines || []).length < 2 || s.lines.length > 5)) e.push(`slide ${i + 1} needs 2–5 body lines`);
    (s.lines || []).forEach((l, k) => { if (words(l).length > 26) e.push(`slide ${i + 1} line ${k + 1} is ${words(l).length} words (max 26)`); });
  });
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
    if ((b.text.match(/\*\*/g) || []).length > 2) e.push(`bullet ${i + 1} has more than one bold anchor (R9)`);
    if (plain(b.text).length > cfg.resume_bullet_hard_max_chars) e.push(`bullet ${i + 1} is ${plain(b.text).length} chars — over two lines (max ${cfg.resume_bullet_hard_max_chars}, R9)`);
  });
  // R9 (revised 25 Nov 2026): most bullets one line; up to a quarter may run to two lines where they carry product thinking
  const long = bullets.filter((b) => plain(b.text).length > cfg.resume_bullet_max_chars);
  if (long.length > Math.ceil(bullets.length / 4)) e.push(`${long.length} bullets run to two lines (max ${Math.ceil(bullets.length / 4)}, about a quarter — R9)`);
  // R11: keep the story arc and the balance of Iman's finalised resume
  const rows = r.story_rows || [];
  const fat = rows.filter((row) => (row.bullets || []).length > cfg.story_row_bullets_max);
  for (const row of fat) e.push(`row "${row.label}" has ${row.bullets.length} bullets (max ${cfg.story_row_bullets_max}, R11) — tailor by rewording, not by piling bullets into one row`);
  const strategy = rows.find((row) => /strateg/i.test(row.label));
  if (!strategy) e.push('story spine is missing the strategy row (R11) — it carries the product thinking');
  else if (strategy.bullets.length < cfg.strategy_row_bullets_min) e.push(`strategy row has ${strategy.bullets.length} bullets (min ${cfg.strategy_row_bullets_min}, R11) — never collapse it to make space`);
  else if (!strategy.bullets.some((b) => plain(b.text).length > cfg.resume_bullet_max_chars)) e.push('strategy row needs at least one two-line bullet that states the bet, the before-and-after or who benefits (R9)');
  // 10.9: no bullet-opening verb more than twice
  const openers = {}; for (const b of bullets) { const v = plain(b.text).split(/\s+/)[0].toLowerCase(); openers[v] = (openers[v] || 0) + 1; }
  for (const [v, c] of Object.entries(openers)) if (c > 2) e.push(`"${v}" opens ${c} bullets (max 2, Part 10.9)`);
  const gen = bullets.filter((b) => b.type !== 'Fact').length;
  if (gen > Math.ceil(bullets.length / 4)) e.push(`${gen} generated bullets exceeds R14 limit (≤ a quarter)`);
  if ((r.kpis || []).length !== 4) e.push('impact strip must have exactly 4 KPI tiles (R11)');
  if ((r.story_rows || []).length < 4) e.push('story spine needs ≥4 labelled rows (R11)');
  for (const x of r.earlier || []) if (typeof x === 'object' && !/\|\s*\d{4}/.test(x.lead || '')) e.push(`earlier role "${x.lead}" must read "Title | Company | Years" (R7)`);
  if (/\b(19|20)\d{2}\b/.test(r.education || '')) e.push('education carries no years (R7)');
  return e;
}

/** Cover letter (R13 as revised 25 Nov 2026): prose paragraphs like a real letter; not a restatement of resume bullets. */
export function validateCoverLetter(c, resume, cfg = settings().assets) {
  const e = [];
  if (!c?.greeting) e.push('cover letter needs a greeting (e.g. "Dear <Company> Product team,")');
  const paras = c?.paragraphs || [];
  if (paras.length < cfg.cover_letter_paragraphs_min || paras.length > cfg.cover_letter_paragraphs_max) e.push(`cover letter has ${paras.length} paragraphs (need ${cfg.cover_letter_paragraphs_min}–${cfg.cover_letter_paragraphs_max} prose paragraphs)`);
  const n = paras.reduce((t, x) => t + words(x).length, 0);
  if (n < cfg.cover_letter_words_min || n > cfg.cover_letter_words_max) e.push(`cover letter is ${n} words (target ${cfg.cover_letter_words_min}–${cfg.cover_letter_words_max})`);
  paras.forEach((x, i) => {
    if (/^\s*([•\-*]|\d+\.)\s/m.test(x)) e.push(`cover letter paragraph ${i + 1} contains a list — write prose`);
    if (sentences(x).length < 2) e.push(`cover letter paragraph ${i + 1} is not a paragraph (needs at least 2 full sentences)`);
  });
  const all = paras.join(' ').toLowerCase();
  const cl = LETTER_CLICHES.find((k) => all.includes(k)); if (cl) e.push(`cover letter uses a cliché: "${cl}"`);
  const bullets = resume ? [...resumeBullets(resume), ...(resume.prior_role?.bullets || [])].map((b) => (typeof b === 'string' ? b : b.text)) : [];
  for (const s of paras.flatMap(sentences)) {
    const hit = bullets.find((b) => jaccard(s, b) >= 0.6);
    if (hit) e.push(`cover letter sentence repeats a resume bullet — tell the story behind it instead: "${s.slice(0, 70)}…"`);
  }
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
    ...validateCoverLetter(a.cover_letter, a.resume),
    ...validateLinkedIn(a.linkedin_message, { company: a.company, products: a.company_info?.products }),
    ...validateInfoSheet(a.company_info),
    ...validateDeck(a.deck),
  ];
  const r5 = r5Violations(allText(a));
  if (r5.length) errors.push(`R5 violation — forbidden client names/codes: ${r5.join(', ')}`);
  for (const k of ['listing_id', 'company', 'title']) if (!a[k]) errors.push(`missing ${k}`);
  return errors;
}
