import '../helpers.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { phase1Score, phase2Score, normalise, rawSum, rangesFor } from '../../src/scoring/deterministic.js';
import { checkCitation, scoreEntry, validateSemantic } from '../../src/scoring/semantic.js';
import { inferredHealth, financialHealth, growthToScore } from '../../src/scoring/financial.js';
import { recordPmCount } from '../../src/scoring/velocity.js';
import { layoffFlag } from '../../src/scoring/layoffs.js';
import { rank } from '../../src/scoring/rank.js';
import { matchesTerm, naiveIncludes } from '../../src/lib/match.js';
import { makeTitleFilter } from '../../src/pipeline/titles.js';
import { audit, resetAudit } from '../../src/lib/http.js';
import fs from 'node:fs';

const ranges = { velocity: { min: 0, max: 5 } };

test('TC-201 deterministic scoring, normalisation and veto', () => {
  resetAudit();
  const good = phase1Score({ work_model: 'Remote-Verified', velocity: 5, visa_sponsor: true, hiring_location: 'London', full_description: '', funding_stage: 'unknown', layoff_recent: true }, ranges);
  assert.ok(Math.abs(good.phase1 - 0.35) < 0.001, `good=${good.phase1}`);
  const bad = phase1Score({ work_model: 'Onsite', velocity: 0, visa_sponsor: false, hiring_location: 'San Francisco', full_description: '', funding_stage: 'unknown', layoff_recent: true }, ranges);
  assert.ok(bad.phase1 < 0.01, `bad=${bad.phase1}`);
  const veto = phase1Score({ work_model: 'Remote-Verified', velocity: 5, visa_sponsor: true, funding_stage: 'public', financial_score: 1, hiring_location: 'New York', full_description: 'We are unable to sponsor visas for this role.' }, ranges);
  assert.equal(veto.phase1, 0); assert.match(veto.veto, /unable to sponsor/);
  assert.equal(normalise(15, 0, 15), 1);
  assert.equal(Number(normalise(2.7, 1, 3.5).toFixed(2)), 0.68);
  assert.ok(Math.max(...Object.values(good.components)) <= 1, 'every component in 0–1');
  // regression: raw sum lets work-model (0–15) swamp experience (1–3.2)
  const remoteWeakFit = rawSum([15, 1.0]); const onsiteStrongFit = rawSum([0, 3.2]);
  assert.ok(remoteWeakFit > onsiteStrongFit, 'without normalisation remote status dominates fit');
  const n1 = 0.15 * 1 + 0.30 * normalise(1.0, 1, 3.5); const n2 = 0.15 * 0 + 0.30 * normalise(3.2, 1, 3.5);
  assert.ok(n2 > n1, 'with normalisation, fit wins');
  assert.equal(audit.length, 0, 'zero model / network calls');
});

test('TC-202 semantic scoring: citations validated against master file lines; only shortlist accepted', () => {
  const lines = fs.readFileSync(new URL('../../experience/master.md', import.meta.url), 'utf8').split('\n');
  const ln = lines.findIndex((l) => l.includes('Own two production AI products end-to-end')) + 1;
  const good = { id: 'x', experience_raw: 2.7, domain_raw: 3, experience_evidence: [{ line: ln, quote: 'Own two production AI products end-to-end', ach: 'ACH-001' }], domain_evidence: [{ line: ln, quote: 'an LLM-powered email platform' }] };
  assert.deepEqual(validateSemantic(good), []);
  const r = scoreEntry(good);
  assert.equal(r.experience_norm, 0.68); assert.match(r.evidence, new RegExp(`L${ln}`));
  assert.match(checkCitation({ line: ln + 40, quote: 'Own two production AI products end-to-end' }), /not found/);
  assert.match(checkCitation({ line: 999999, quote: 'whatever text here' }), /out of range/);
  assert.ok(validateSemantic({ ...good, experience_evidence: [] }).length, 'unsupported score rejected');
  assert.equal(phase2Score({ experience_raw: 3.5, domain_raw: 3.5 }).phase2, 0.45);
});

test('TC-203 financial health: private companies always labelled inferred', async () => {
  const f = await financialHealth({ name: 'PrivateCo', funding_stage: 'series_b' }, { velocity: 1 });
  assert.equal(f.basis, 'inferred'); assert.match(f.label, /inferred/); assert.match(f.label, /not reported/);
  assert.equal(inferredHealth({ funding_stage: 'late', hiring_freeze: true }), 0.1);
  assert.equal(growthToScore(0.3), 1); assert.equal(growthToScore(-0.1), 0);
});

test('TC-204 PM hiring velocity history', () => {
  const s = { pm_counts: {} };
  const d0 = new Date('2026-11-24T01:30:00Z');
  assert.equal(recordPmCount(s, 'Acme', 10, d0).velocity, 0);
  assert.equal(s.pm_counts.Acme[0].count, 10);
  assert.equal(recordPmCount(s, 'Acme', 15, new Date(d0.getTime() + 864e5)).velocity, 5);
  const s2 = { pm_counts: {} }; recordPmCount(s2, 'B', 12, d0);
  const v = recordPmCount(s2, 'B', 0, new Date(d0.getTime() + 864e5));
  assert.ok(v.velocity < 0); assert.equal(v.hiring_freeze, true);
});

test('TC-205 layoff + freeze flags', () => {
  const now = new Date('2026-11-25');
  assert.equal(layoffFlag('Acme', [{ company: 'Acme', date: '2026-10-01', source: 'layoffs.fyi' }], now).layoff_recent, true);
  assert.equal(layoffFlag('Acme', [{ company: 'Acme', date: '2025-01-01' }], now).layoff_recent, false, 'old event ignored');
  assert.equal(layoffFlag('Acme', [{ company: 'Acmeco Global Holdings Ltd Group', date: '2026-10-01' }], now).layoff_recent, false, 'word-boundary, no substring');
  const s = { pm_counts: {} }; const d0 = new Date('2026-11-24');
  recordPmCount(s, 'A', 15, d0); assert.equal(recordPmCount(s, 'A', 0, new Date(d0.getTime() + 864e5)).hiring_freeze, true);
  const s2 = { pm_counts: {} }; recordPmCount(s2, 'A', 15, d0); assert.equal(recordPmCount(s2, 'A', 12, new Date(d0.getTime() + 864e5)).hiring_freeze, false);
});

test('TC-206 single ranked list: score-only, stable, source kept as metadata', () => {
  const sources = ['greenhouse', 'remoteok', 'adzuna', 'workday'];
  const items = Array.from({ length: 100 }, (_, i) => ({ id: i, total_score: (i * 37) % 11 / 10, source_origin: sources[i % 4] }));
  const r = rank(items);
  for (let i = 1; i < r.length; i++) assert.ok(r[i - 1].total_score >= r[i].total_score);
  const tie = rank([{ id: 'a', total_score: 0.5, source_origin: 'remoteok' }, { id: 'b', total_score: 0.5, source_origin: 'greenhouse' }]);
  assert.deepEqual(tie.map((x) => x.id), ['a', 'b'], 'stable — no source preference');
  assert.ok(r.every((x) => x.source_origin));
});

test('TC-207 word-boundary matching vs naive substring regression', () => {
  assert.equal(matchesTerm('intern position', 'intern'), true);
  assert.equal(matchesTerm('internal tools manager', 'intern'), false);
  assert.equal(matchesTerm('internet of things PM', 'intern'), false);
  // synthetic 283-candidate set mirroring the prototype mix: 191 titles contain "intern" only as a substring
  const subs = ['Internal Tools', 'International Markets', 'Internet Platform', 'Internal AI Platform'];
  const cands = [
    ...Array.from({ length: 191 }, (_, i) => `Senior Product Manager, ${subs[i % 4]}`),
    ...Array.from({ length: 92 }, (_, i) => `Senior Product Manager ${['AI', 'Payments', 'Growth', 'Data'][i % 4]}`),
  ];
  assert.equal(cands.length, 283);
  const naive = cands.filter((t) => naiveIncludes(t, 'intern')).length;
  const f = makeTitleFilter();
  const wrong = cands.filter((t) => !f(t)).length;
  assert.equal(naive, 191, 'without \\b: 191/283 (67%) wrongly discarded');
  assert.equal(wrong, 0, 'with \\b: 0 wrongly discarded');
});
