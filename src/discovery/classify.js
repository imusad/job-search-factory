// JSF-104: deterministic product-domain classification and fit scoring. Zero model calls.
import fs from 'node:fs';
import { readJson, p } from '../lib/config.js';
import { wordRegex } from '../lib/match.js';

let taxonomy;
const tax = () => (taxonomy ??= readJson('config/domains.json'));

export function classifyDomain(text) {
  const scores = Object.entries(tax().domains).map(([label, d]) => [label, d.keywords.reduce((n, k) => n + (wordRegex(k).test(text || '') ? 1 : 0), 0)]);
  scores.sort((a, b) => b[1] - a[1]);
  return scores[0][1] > 0 ? scores[0][0] : 'other';
}

let expTerms;
/** Keyword bank extracted from the master experience file (Part 7 skills + keyword banks). */
export function experienceKeywords(file = p('experience/master.md')) {
  if (expTerms) return expTerms;
  const md = fs.readFileSync(file, 'utf8');
  const section = md.slice(md.indexOf('## 7. Skills'), md.indexOf('## 8. Clients'));
  const terms = new Set();
  for (const line of section.split('\n')) {
    if (!line.startsWith('- **') && !line.startsWith('| ')) continue;
    const body = line.replace(/^- \*\*[^*]+\*\*:?/, '').replace(/\(added[^)]*\)/g, '').replace(/\|[^|]*\|\s*$/, '');
    for (const t of body.split(/[,;|]/)) {
      const term = t.replace(/\(.*?\)/g, '').replace(/[*]/g, '').trim().toLowerCase();
      if (term.length >= 3 && term.length <= 40 && !/^(r|e|area|skills|evidence)$/.test(term) && /^[a-z0-9 /\-.]+$/.test(term)) terms.add(term);
    }
  }
  expTerms = [...terms];
  return expTerms;
}

/** Fit score 0–1 = keyword overlap (60%) + domain weight (40%). */
export function fitScore(company) {
  const text = `${company.name} ${company.description || ''} ${(company.tags || []).join(' ')}`;
  const domain = classifyDomain(text);
  const kws = experienceKeywords();
  const hits = kws.filter((k) => wordRegex(k).test(text));
  const overlap = Math.min(1, hits.length / 4);
  const domainWeight = tax().domains[domain]?.weight ?? 0;
  return { domain, fit: Number((0.6 * overlap + 0.4 * domainWeight).toFixed(3)), keyword_hits: hits };
}
