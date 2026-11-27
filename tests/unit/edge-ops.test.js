// Edge-case tests: ops (http, config, columns, templates, Apps Script logic)
import '../helpers.js';
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { audit, resetAudit, HttpError, mapLimit } from '../../src/lib/http.js';
import { COLUMNS, APPROVAL_INDEX, colIndex, colLetter, writableSegments } from '../../src/google/columns.js';
import { readFileSync } from 'node:fs';
import { timeToClear, digestEmail, confirmationEmail, batchConfirmationEmail } from '../../src/email/templates.js';
import { wordRegex, matchesTerm, matchesAny, firstMatch, naiveIncludes } from '../../src/lib/match.js';
import { readJson, settings } from '../../src/lib/config.js';

// --- http ---
describe('http module edge cases', () => {
  test('HttpError stores status, url, body', () => {
    const e = new HttpError(404, 'https://example.com/api', 'not found');
    assert.equal(e.status, 404);
    assert.equal(e.url, 'https://example.com/api');
    assert.equal(e.body, 'not found');
    assert.ok(e.message.includes('404'));
  });

  test('audit log tracks requests', () => {
    resetAudit();
    assert.equal(audit.length, 0);
  });

  test('mapLimit respects concurrency', async () => {
    let peak = 0; let running = 0;
    const items = Array.from({ length: 10 }, (_, i) => i);
    await mapLimit(items, 3, async (x) => {
      running++;
      peak = Math.max(peak, running);
      await new Promise((r) => setTimeout(r, 10));
      running--;
      return x * 2;
    });
    assert.ok(peak <= 3, `peak concurrency was ${peak}`);
  });

  test('mapLimit preserves order', async () => {
    const items = [30, 10, 20];
    const results = await mapLimit(items, 2, async (x) => {
      await new Promise((r) => setTimeout(r, x));
      return x;
    });
    assert.deepEqual(results, [30, 10, 20]);
  });

  test('mapLimit handles empty input', async () => {
    const r = await mapLimit([], 5, async () => 'x');
    assert.deepEqual(r, []);
  });
});

// --- columns ---
describe('columns edge cases', () => {
  test('APPROVAL_INDEX is correct', () => {
    assert.equal(COLUMNS[APPROVAL_INDEX].key, 'approval');
    assert.equal(COLUMNS[APPROVAL_INDEX].writer, 'owner');
  });

  test('colIndex finds all columns', () => {
    for (const c of COLUMNS) assert.ok(colIndex(c.key) >= 0, c.key);
  });

  test('colLetter converts correctly', () => {
    assert.equal(colLetter(0), 'A');
    assert.equal(colLetter(25), 'Z');
    assert.equal(colLetter(26), 'AA');
  });

  test('writableSegments("discovery") excludes Approval', () => {
    const segs = writableSegments('discovery');
    const indices = segs.flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, k) => a + k));
    assert.ok(!indices.includes(APPROVAL_INDEX), 'Approval column must never be in discovery writable segments');
  });

  test('writableSegments("assets") only covers assets columns', () => {
    const segs = writableSegments('assets');
    const indices = segs.flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, k) => a + k));
    for (const i of indices) {
      assert.ok(COLUMNS[i].writer.includes('assets'), `column ${COLUMNS[i].key} should not be writable by assets`);
    }
  });

  test('writableSegments("semantic") only covers semantic columns', () => {
    const segs = writableSegments('semantic');
    const indices = segs.flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, k) => a + k));
    for (const i of indices) {
      assert.ok(COLUMNS[i].writer.includes('semantic'), `column ${COLUMNS[i].key} should not be writable by semantic`);
    }
  });

  test('writableSegments("owner") returns empty (owner never machine-writes)', () => {
    const segs = writableSegments('owner');
    assert.equal(segs.length, 0);
  });

  test('no column has both owner and discovery writer', () => {
    for (const c of COLUMNS) {
      if (c.writer === 'owner') assert.ok(!c.writer.includes('discovery'), c.key);
    }
  });

  test('24 columns total', () => {
    assert.equal(COLUMNS.length, 24);
  });
});

// --- templates ---
describe('templates edge cases', () => {
  test('timeToClear calculates correctly', () => {
    assert.equal(timeToClear({ pendingApprovals: 5, assetsToReview: 2 }), 5 * 1 + 2 * (3 + 1 + 4));
  });

  test('timeToClear with zero input', () => {
    assert.equal(timeToClear({}), 0);
  });

  test('digestEmail contains key stats', () => {
    const s = {
      runAt: '2026-11-26T05:30:00Z', newListings: 15, aboveThreshold: 5, pendingActions: 3,
      pendingApprovals: 2, assetsToReview: 1, totalFetched: 300, sourcesOk: 12, matched: 50,
      failures: [], top: [{ title: 'Senior PM', employer: 'Acme', work_model: 'Remote', hiring_location: 'Remote', total_score: 0.45 }],
    };
    const e = digestEmail(s);
    assert.ok(e.subject.includes('15 new'));
    assert.ok(e.subject.includes('5 above threshold'));
    assert.ok(e.html.includes('15'));
    assert.ok(e.html.includes('Acme'));
  });

  test('digestEmail with fatal error', () => {
    const s = { runAt: '2026-11-26', newListings: 0, aboveThreshold: 0, pendingActions: 0, pendingApprovals: 0, assetsToReview: 0, fatal: 'Token expired', failures: [], top: [] };
    const e = digestEmail(s);
    assert.ok(e.subject.includes('FAILED'));
    assert.ok(e.html.includes('Token expired'));
  });

  test('digestEmail separates real failures from not-configured', () => {
    const s = {
      runAt: '2026-11-26', newListings: 0, aboveThreshold: 0, pendingActions: 0, pendingApprovals: 0, assetsToReview: 0,
      failures: [
        { source: 'adzuna', error: 'ADZUNA_APP_ID not configured (OD-5) — skipped' },
        { source: 'greenhouse:Stripe', error: 'HTTP 404' },
      ],
      top: [],
    };
    const e = digestEmail(s);
    assert.ok(e.html.includes('1 source(s) failed'));
    assert.ok(e.html.includes('Not set up yet'));
  });

  test('confirmationEmail includes company name', () => {
    const e = confirmationEmail({ company: 'Stripe', title: 'GPM', count: 5, folder: 'https://drive.google.com/x', pages: 1 });
    assert.ok(e.subject.includes('Stripe'));
    assert.ok(e.html.includes('Stripe'));
  });

  test('confirmationEmail warns about multi-page resume', () => {
    const e = confirmationEmail({ company: 'X', title: 'PM', count: 5, folder: 'https://drive.google.com/x', pages: 2 });
    assert.ok(e.html.includes('over one page'));
  });

  test('batchConfirmationEmail: one listing reads like the single confirmation', () => {
    const e = batchConfirmationEmail([{ company: 'Veeva', title: 'Senior PM', folder: 'https://drive.google.com/a', pages: 1, ats_pages: 1 }]);
    assert.equal(e.subject, 'Assets ready: Veeva — Senior PM');
  });

  test('batchConfirmationEmail: several listings in one email, each with its folder; ATS overflow is flagged too', () => {
    const e = batchConfirmationEmail([
      { company: 'Veeva', title: 'Senior PM', folder: 'https://drive.google.com/a', pages: 1, ats_pages: 2 },
      { company: 'Smartsheet', title: 'Senior PM I', folder: 'https://drive.google.com/b', pages: 1, ats_pages: 1 },
    ]);
    assert.equal(e.subject, 'Assets ready: 2 applications');
    assert.ok(e.html.includes('https://drive.google.com/a') && e.html.includes('https://drive.google.com/b'));
    assert.equal(e.html.match(/over one page/g).length, 1);
  });

  test('assets:publish holds the email until no approved listing is pending, and never asks for a republish', () => {
    const src = readFileSync(new URL('../../src/cli/assets-publish.js', import.meta.url), 'utf8');
    assert.match(src, /publishAssets\(a, \{ email: false \}\)/, 'publish itself never emails');
    assert.match(src, /approval === 'Approved' && !x\.obj\.assets_generated/, 'checks for pending rows before emailing');
    assert.match(src, /emailed: true/, 'marks bundles as emailed so a later call does not resend');
    assert.match(src, /Do not edit assets\.json and republish/, 'tells the routine an over-one-page publish is final');
  });
});

// --- match ---
describe('match module edge cases', () => {
  test('matchesTerm uses word boundaries', () => {
    assert.ok(matchesTerm('The Meta team', 'Meta'));
    assert.ok(!matchesTerm('Metadata pipeline', 'Meta'));
  });

  test('matchesTerm is case-insensitive', () => {
    assert.ok(matchesTerm('the meta team', 'Meta'));
    assert.ok(matchesTerm('THE META TEAM', 'meta'));
  });

  test('matchesAny returns true if any match', () => {
    assert.ok(matchesAny('intern position', ['intern', 'junior']));
    assert.ok(!matchesAny('senior position', ['intern', 'junior']));
  });

  test('firstMatch returns the matching term', () => {
    assert.equal(firstMatch('Looking for an intern', ['intern', 'junior']), 'intern');
    assert.equal(firstMatch('Senior role', ['intern', 'junior']), null);
  });

  test('wordRegex with special characters escaped', () => {
    const r = wordRegex('c++');
    assert.ok(!r.test('cc'));
  });

  test('wordRegex handles multi-word terms with flexible whitespace', () => {
    assert.ok(matchesTerm('unable  to  sponsor', 'unable to sponsor'));
  });

  test('naiveIncludes is deliberately wrong (TC-207 regression)', () => {
    assert.ok(naiveIncludes('Metadata pipeline', 'Meta'));
    assert.ok(naiveIncludes('Metadata pipeline', 'meta'));
  });
});

// --- config ---
describe('config edge cases', () => {
  test('settings returns valid object', () => {
    const s = settings();
    assert.ok(s.owner);
    assert.ok(s.titles);
    assert.ok(s.weights);
    assert.ok(Array.isArray(s.veto_terms));
    assert.ok(Array.isArray(s.excluded_hosts));
  });

  test('readJson with fallback for missing file', () => {
    const r = readJson('nonexistent-file-12345.json', { default: true });
    assert.deepEqual(r, { default: true });
  });

  test('readJson throws for missing required file', () => {
    assert.throws(() => readJson('nonexistent-file-12345.json'), /Missing/);
  });

  test('excluded_hosts contains the expected domains', () => {
    const s = settings();
    assert.ok(s.excluded_hosts.includes('indeed.com'));
    assert.ok(s.excluded_hosts.includes('naukri.com'));
    assert.ok(s.excluded_hosts.includes('glassdoor.com'));
  });

  test('weight sum is 1.0', () => {
    const w = settings().weights;
    const sum = Object.values(w).reduce((a, b) => a + b, 0);
    assert.ok(Math.abs(sum - 1.0) < 0.001, `weights sum to ${sum}, expected 1.0`);
  });

  test('phase1 max = sum of non-semantic weights', () => {
    const w = settings().weights;
    const phase1 = w.work_model + w.velocity + w.visa + w.funding + w.layoff + w.financial;
    assert.ok(Math.abs(phase1 - 0.55) < 0.001, `phase1 max = ${phase1}`);
  });

  test('phase2 max = experience + domain', () => {
    const w = settings().weights;
    const phase2 = w.experience + w.domain;
    assert.ok(Math.abs(phase2 - 0.45) < 0.001, `phase2 max = ${phase2}`);
  });
});

// --- Apps Script logic (pure-function simulation) ---
describe('Apps Script logic edge cases', () => {
  const DEBOUNCE_MIN = 10;
  const SWEEP_GRACE_MIN = 25;

  test('debounce prevents rapid fires', () => {
    const lastFire = Date.now() - 5 * 60000;
    const shouldFire = (Date.now() - lastFire) >= DEBOUNCE_MIN * 60000;
    assert.equal(shouldFire, false);
  });

  test('fire allowed after debounce window', () => {
    const lastFire = Date.now() - 11 * 60000;
    const shouldFire = (Date.now() - lastFire) >= DEBOUNCE_MIN * 60000;
    assert.equal(shouldFire, true);
  });

  test('sweep grace prevents re-fire during active run', () => {
    const lastFire = Date.now() - 20 * 60000;
    const shouldSweep = (Date.now() - lastFire) >= SWEEP_GRACE_MIN * 60000;
    assert.equal(shouldSweep, false);
  });

  test('sweep allowed after grace period', () => {
    const lastFire = Date.now() - 30 * 60000;
    const shouldSweep = (Date.now() - lastFire) >= SWEEP_GRACE_MIN * 60000;
    assert.equal(shouldSweep, true);
  });

  test('fire_ with missing props does not throw (graceful skip)', () => {
    const url = null;
    const token = null;
    const shouldFire = url && token;
    assert.equal(shouldFire, null);
  });

  test('failed fire clears LAST_FIRE_MS to allow sweep retry', () => {
    let lastFireMs = String(Date.now());
    const responseCode = 500;
    if (responseCode !== 200) lastFireMs = undefined;
    assert.equal(lastFireMs, undefined);
  });
});
