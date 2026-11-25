// JSF-205: layoff signal. Sources: layoffs.fyi (public tracker, Airtable-backed so parsed best-effort),
// WARN notices (state-level, no national API) via the owner-curated config/layoffs.json, plus ATS freeze detection.
import { http } from '../lib/http.js';
import { readJson } from '../lib/config.js';
import { matchesTerm } from '../lib/match.js';
import { log } from '../lib/log.js';

export async function fetchLayoffEvents() {
  const events = [...readJson('config/layoffs.json', { events: [] }).events];
  try {
    const html = await http('https://layoffs.fyi/', { as: 'text', tag: 'layoffs' });
    const m = html.match(/https:\/\/airtable\.com\/embed\/[A-Za-z0-9/?=&._-]+/);
    if (m) events.push(...(await airtableCsv(m[0])));
  } catch (e) { log.warn(`layoffs.fyi fetch failed: ${e.message}`); }
  return events;
}

async function airtableCsv(embedUrl) {
  // Airtable shared views expose a CSV download for public embeds; tolerate failure.
  try {
    const csv = await http(embedUrl.replace('/embed/', '/') + (embedUrl.includes('?') ? '&' : '?') + 'format=csv', { as: 'text', tag: 'layoffs' });
    return csv.split('\n').slice(1).map((l) => l.split(',')).filter((r) => r.length > 3).map((r) => ({ company: r[0].replace(/"/g, ''), date: r[r.length - 1], source: 'layoffs.fyi' }));
  } catch { return []; }
}

export function layoffFlag(companyName, events, now = new Date(), windowDays = 180) {
  const hit = events.find((e) => matchesTerm(e.company, companyName) && e.company.length <= companyName.length + 12 && (!e.date || now - new Date(e.date) < windowDays * 864e5));
  return { layoff_recent: Boolean(hit), layoff_source: hit?.source || null, layoff_date: hit?.date || null };
}
