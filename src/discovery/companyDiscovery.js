// JSF-103: nominate AI-workflow companies from bounded sources. Terminating rule: this module ONLY nominates
// companies into data/candidates.json. It never fetches or returns job listings.
import * as cheerio from 'cheerio';
import { XMLParser } from 'fast-xml-parser';
import { http } from '../lib/http.js';
import { slugify, stripHtml } from '../lib/normalize.js';
import { matchesAny } from '../lib/match.js';
import { log } from '../lib/log.js';

export const TIERS = { VC: 'vc_portfolio', DIRECTORY: 'product_directory', HN: 'hn_hiring' };
const AI_TERMS = ['ai', 'artificial intelligence', 'machine learning', 'llm', 'generative ai', 'genai', 'agents', 'agentic', 'automation', 'workflow', 'copilot', 'nlp'];

export async function fromYC() {
  const d = await http('https://yc-oss.github.io/api/companies/hiring.json', { timeout: 60000, tag: 'discovery' });
  return d.filter((c) => c.status === 'Active' && matchesAny(`${c.one_liner} ${c.long_description} ${(c.tags || []).join(' ')} ${c.industry}`, AI_TERMS) && (c.team_size ?? 0) >= 15)
    .map((c) => ({ name: c.name, tier: TIERS.VC, source: 'yc', website: c.website, description: c.one_liner, funding_stage: c.stage === 'Growth' ? 'late' : 'series_a', ats_slug: c.slug }));
}

async function vcPortfolio(source, url, selector) {
  const html = await http(url, { as: 'text', tag: 'discovery' });
  const $ = cheerio.load(html);
  const names = new Set();
  $(selector).each((_, el) => { const t = $(el).text().trim(); if (t && t.length < 40) names.add(t); });
  return [...names].map((name) => ({ name, tier: TIERS.VC, source }));
}
export const fromAccel = () => vcPortfolio('accel', 'https://www.accel.com/relationships', 'h3, .company-name');
export const fromSequoia = () => vcPortfolio('sequoia', 'https://www.sequoiacap.com/our-companies/', 'th, .company-listing__name, h3');
export const fromLightspeed = () => vcPortfolio('lightspeed', 'https://lsvp.com/portfolio/', 'h3, .portfolio-company__name');

export async function fromProductHunt() {
  const xml = await http('https://www.producthunt.com/feed?category=artificial-intelligence', { as: 'text', tag: 'discovery' });
  const feed = new XMLParser({ ignoreAttributes: false }).parse(xml);
  const entries = [].concat(feed.feed?.entry || feed.rss?.channel?.item || []);
  return entries.map((e) => ({ name: String(e.title?.['#text'] ?? e.title).split(/\s[-–—:]\s/)[0].trim(), tier: TIERS.DIRECTORY, source: 'producthunt', description: stripHtml(e.content?.['#text'] || e.description || '').slice(0, 300) }));
}

export async function fromG2() {
  const html = await http('https://www.g2.com/categories/ai-writing-assistant', { as: 'text', tag: 'discovery' });
  const $ = cheerio.load(html);
  return $('[itemprop="name"], .product-card__product-name').map((_, el) => ({ name: $(el).text().trim(), tier: TIERS.DIRECTORY, source: 'g2' })).get();
}

/** HN "Ask HN: Who is hiring?" — first line of top-level comments is "Company | Role | Location | ...". */
export async function fromHN({ maxComments = 400 } = {}) {
  const user = await http('https://hacker-news.firebaseio.com/v0/user/whoishiring.json', { tag: 'discovery' });
  let thread;
  for (const id of user.submitted.slice(0, 6)) {
    const item = await http(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, { tag: 'discovery' });
    if (/who is hiring/i.test(item.title || '')) { thread = item; break; }
  }
  if (!thread) return [];
  return parseHnComments(await Promise.all((thread.kids || []).slice(0, maxComments).map((k) => http(`https://hacker-news.firebaseio.com/v0/item/${k}.json`, { tag: 'discovery' }).catch(() => null))));
}

export function parseHnComments(comments) {
  const out = [];
  for (const c of comments) {
    if (!c?.text || c.deleted) continue;
    const text = stripHtml(c.text);
    const first = text.split('\n')[0];
    if (!first.includes('|')) continue;
    const name = first.split('|')[0].replace(/\(.*?\)/g, '').trim();
    if (!name || name.length > 50) continue;
    if (!matchesAny(text, AI_TERMS) || !/\bproduct\b/i.test(text)) continue;
    out.push({ name, tier: TIERS.HN, source: 'hn', description: first.slice(0, 200) });
  }
  return out;
}

/** Merge duplicates across tiers into one candidate with all sources noted. */
export function mergeCandidates(lists, existing = []) {
  const byKey = new Map(existing.map((c) => [slugify(c.name), { ...c, sources: [...(c.sources || [])], tiers: [...(c.tiers || [])] }]));
  for (const c of lists.flat()) {
    const key = slugify(c.name);
    if (!key) continue;
    const cur = byKey.get(key) || { name: c.name, sources: [], tiers: [], nominated_at: new Date().toISOString() };
    if (!cur.sources.includes(c.source)) cur.sources.push(c.source);
    if (!cur.tiers.includes(c.tier)) cur.tiers.push(c.tier);
    for (const f of ['website', 'description', 'funding_stage', 'ats_slug']) cur[f] ??= c[f];
    byKey.set(key, cur);
  }
  return [...byKey.values()];
}

export async function discoverCompanies(existing = []) {
  const sources = { yc: fromYC, accel: fromAccel, sequoia: fromSequoia, lightspeed: fromLightspeed, producthunt: fromProductHunt, g2: fromG2, hn: fromHN };
  const results = await Promise.all(Object.entries(sources).map(async ([k, fn]) => {
    try { const r = await fn(); log.info(`discovery ${k}: ${r.length} companies`); return r; } catch (e) { log.warn(`discovery ${k} failed: ${e.message}`); return []; }
  }));
  return mergeCandidates(results, existing);
}
