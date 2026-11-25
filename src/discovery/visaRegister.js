// JSF-102: UK Home Office Register of Licensed Sponsors. Exact legal-name matching only (no substring).
import fs from 'node:fs';
import path from 'node:path';
import { http } from '../lib/http.js';
import { p } from '../lib/config.js';
import { log } from '../lib/log.js';

const PAGE = 'https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers';
export const CACHE = p('data/cache/uk-sponsors.csv');
const MAX_AGE_MS = 24 * 3600 * 1000;

export function isStale(file = CACHE, now = Date.now()) {
  if (!fs.existsSync(file)) return true;
  return now - fs.statSync(file).mtimeMs > MAX_AGE_MS;
}

export async function downloadRegister({ file = CACHE, force = false } = {}) {
  if (!force && !isStale(file)) { log.info('UK sponsor register: cache hit (<24h old)'); return { file, cached: true }; }
  const html = await http(PAGE, { as: 'text', tag: 'visa' });
  const url = html.match(/https:\/\/assets\.publishing\.service\.gov\.uk\/[^"']+\.csv/)?.[0];
  if (!url) throw new Error('UK sponsor register CSV link not found on gov.uk page');
  const csv = await http(url, { as: 'text', timeout: 120000, tag: 'visa' });
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, csv);
  log.info(`UK sponsor register downloaded: ${url}`);
  return { file, cached: false, url };
}

// Minimal RFC-4180 CSV parser (quoted fields, embedded commas/newlines).
export function parseCsv(text) {
  const rows = []; let row = []; let field = ''; let q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(field); rows.push(row); row = []; field = ''; }
    else field += ch;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.length > 1 || r[0]);
}

const norm = (s) => String(s).trim().replace(/\s+/g, ' ').toLowerCase();

export function loadSponsorSet(file = CACHE) {
  const rows = parseCsv(fs.readFileSync(file, 'utf8'));
  const header = rows.shift();
  const col = header.findIndex((h) => /organisation name/i.test(h));
  const set = new Set(rows.map((r) => norm(r[col >= 0 ? col : 0])));
  return { set, rowCount: rows.length };
}

/** Exact, case-insensitive legal-name match. "Deloitte LLP" matches; "Deloitte" does not. */
export const isSponsor = (sponsorSet, legalName) => sponsorSet.has(norm(legalName));

const SUFFIXES = ['Ltd', 'Limited', 'UK Ltd', 'UK Limited', 'Technologies Ltd', 'Technologies Limited', 'Inc', 'Inc.', 'LLP', 'Corporation'];
export function legalNameCandidates(company) {
  if (company.uk_legal_names?.length) return company.uk_legal_names;
  return [company.name, ...SUFFIXES.map((s) => `${company.name} ${s}`)];
}

export function applyVisaFlags(companies, sponsorSet) {
  for (const c of companies) {
    const hit = legalNameCandidates(c).find((n) => isSponsor(sponsorSet, n));
    c.visa_sponsor = Boolean(hit);
    c.visa_source = hit ? `uk_register:${hit}` : 'uk_register:no_exact_match';
  }
  return companies;
}
