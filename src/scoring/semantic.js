// JSF-202: validate Claude's semantic scores. Every component must cite real lines of the master experience file;
// a citation whose quote is not on the cited line is rejected (prevents inflated / invented matches).
import fs from 'node:fs';
import { p, settings } from '../lib/config.js';
import { phase2Score } from './deterministic.js';

let lines;
const masterLines = () => (lines ??= fs.readFileSync(p('experience/master.md'), 'utf8').split('\n'));
const norm = (s) => String(s).toLowerCase().replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim();

export function checkCitation(c) {
  if (!Number.isInteger(c?.line) || c.line < 1 || c.line > masterLines().length) return `line ${c?.line} out of range`;
  if (!c.quote || norm(c.quote).length < 12) return `quote too short for line ${c.line}`;
  // allow ±1 line tolerance for wrapped table rows
  const window = [c.line - 2, c.line - 1, c.line].map((i) => norm(masterLines()[i] || '')).join(' ');
  return window.includes(norm(c.quote)) ? null : `quote not found on line ${c.line}: "${c.quote.slice(0, 60)}"`;
}

export function validateSemantic(entry) {
  const e = [];
  const s = settings().semantic;
  for (const [k, min, max] of [['experience_raw', s.experience_raw_min, s.experience_raw_max], ['domain_raw', s.domain_raw_min, s.domain_raw_max]]) {
    if (typeof entry[k] !== 'number' || entry[k] < min || entry[k] > max) e.push(`${k} must be a number in ${min}–${max}`);
  }
  for (const k of ['experience_evidence', 'domain_evidence']) {
    if (!entry[k]?.length) e.push(`${k}: at least one citation required`);
    for (const c of entry[k] || []) { const err = checkCitation(c); if (err) e.push(`${k}: ${err}`); }
  }
  return e;
}

export function scoreEntry(entry) {
  const errors = validateSemantic(entry);
  if (errors.length) return { id: entry.id, errors };
  const p2 = phase2Score(entry);
  const cite = (arr) => arr.map((c) => `L${c.line}${c.ach ? ` ${c.ach}` : ''}`).join(', ');
  return { id: entry.id, ...p2, evidence: `Exp ${entry.experience_raw}/3.5 [${cite(entry.experience_evidence)}]; Domain ${entry.domain_raw}/3.5 [${cite(entry.domain_evidence)}]${entry.rationale ? ` — ${entry.rationale}` : ''}` };
}
