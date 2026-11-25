// Run by the Claude semantic-scoring routine: npm run semantic:apply -- <scores.json>
// Validates every citation, computes phase-2 (experience 30% + domain 15%), updates Sheet (semantic columns only).
import { readJson, settings } from '../lib/config.js';
import { scoreEntry } from '../scoring/semantic.js';
import { ensureSheet, readRows, updateCells } from '../google/sheet.js';

const file = process.argv[2];
if (!file) { console.error('usage: npm run semantic:apply -- data/semantic/<run>.json'); process.exit(2); }
const input = readJson(file);
const shortlist = readJson('data/shortlist.json');
const allowed = new Set(shortlist.listings.map((l) => l.id));
const results = input.scores.map((s) => (allowed.has(s.id) ? scoreEntry(s) : { id: s.id, errors: ['not in current shortlist (cost control: only the top shortlist is scored)'] }));
const bad = results.filter((r) => r.errors);
for (const r of bad) console.error(`REJECTED ${r.id}: ${r.errors.join('; ')}`);
const good = results.filter((r) => !r.errors);
if (process.argv.includes('--dry-run')) { console.log(JSON.stringify({ accepted: good.length, rejected: bad.length, sent: input.scores.length, shortlist: allowed.size }, null, 2)); process.exit(bad.length ? 1 : 0); }

const sheetId = await ensureSheet();
const rows = new Map((await readRows(sheetId)).map((r) => [String(r.obj.id), r]));
let updated = 0;
for (const g of good) {
  const row = rows.get(g.id); if (!row) continue;
  const p1 = Number(row.obj.phase1) || 0;
  const total = /^veto/.test(row.obj.score_evidence) ? 0 : Number((p1 + g.phase2).toFixed(4));
  await updateCells(sheetId, row.rowNumber, { phase2: g.phase2, total_score: total, score_evidence: g.evidence }, 'semantic');
  updated++;
}
console.log(JSON.stringify({ accepted: good.length, rejected: bad.length, updated, threshold: settings().thresholds.above_threshold_total }));
if (bad.length) process.exitCode = 1;
