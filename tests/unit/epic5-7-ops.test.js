import '../helpers.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { digestEmail, confirmationEmail, timeToClear } from '../../src/email/templates.js';
import { buildMime } from '../../src/google/gmail.js';
import { postingClusters } from '../../src/cli/schedule-report.js';

const root = new URL('../../', import.meta.url).pathname;
const read = (f) => fs.readFileSync(root + f, 'utf8');
const istOf = (cron) => { const [m, h] = cron.split(' ').map(Number); const t = (h * 60 + m + 330) % 1440; return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`; };

test('TC-501 cron: 01:30/13:30 UTC = 07:00/19:00 IST; dispatch enabled; runs full pipeline', () => {
  const y = read('.github/workflows/discovery.yml');
  const crons = [...y.matchAll(/cron: '([^']+)'/g)].map((m) => m[1]);
  assert.deepEqual(crons, ['30 1 * * *', '30 13 * * *']);
  assert.deepEqual(crons.map(istOf), ['07:00', '19:00']);
  assert.match(y, /workflow_dispatch/); assert.match(y, /npm run discover/); assert.match(y, /timeout-minutes: 15/);
});

test('TC-502 approval trigger independent of cron (Apps Script + API-trigger routine)', () => {
  const gs = read('apps-script/Code.gs');
  assert.match(gs, /onEdit\(\)/); assert.match(gs, /everyMinutes\(30\)/);
  assert.doesNotMatch(read('.github/workflows/discovery.yml'), /assets:publish|fire/);
  assert.match(read('claude/asset-generation.md'), /API trigger only/);
});

test('TC-503 schedule report: clusters new listings by arrival window', () => {
  const runs = Array.from({ length: 28 }, (_, i) => ({ at: new Date(Date.UTC(2026, 10, 1 + Math.floor(i / 2), i % 2 ? 13 : 1, 30)).toISOString(), new: i % 2 ? 40 : 10 }));
  const r = postingClusters({ runs }, { now: new Date('2026-11-15T00:00:00Z'), days: 14 });
  assert.ok(r.runs >= 26);
  assert.match(r.windows[0][0], /→19:00 IST/, 'evening run collects most');
});

test('TC-504 zero paid keys: only free-tier env keys referenced; no model endpoint in deterministic tier', async () => {
  const src = execSync(`grep -rhoE "env\\('[A-Z_]+'" ${root}src`).toString().match(/[A-Z_]{3,}/g);
  const allowed = new Set(['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN', 'OWNER_EMAIL', 'ADZUNA_APP_ID', 'ADZUNA_APP_KEY', 'JSEARCH_API_KEY', 'SHEET_ID', 'DRIVE_FOLDER_ID', 'SEC_USER_AGENT']);
  assert.deepEqual([...new Set(src)].filter((k) => !allowed.has(k)), []);
  assert.doesNotMatch(execSync(`grep -rl "ANTHROPIC_API_KEY\\|OPENAI_API_KEY" ${root}src ${root}.github || true`).toString(), /\S/);
  const { http } = await import('../../src/lib/http.js');
  await assert.rejects(http('https://api.anthropic.com/v1/messages'), /model endpoint/);
  for (const f of ['claude/semantic-scoring.md', 'claude/asset-generation.md', 'RUNBOOK.md']) assert.match(read(f), /usage credits/i, f);
});

test('TC-601/603 digest HTML: inline CSS, single column ≤600px, system fonts, no JS/external resources', () => {
  const { html, subject } = digestEmail({ newListings: 20, aboveThreshold: 5, pendingActions: 5, pendingApprovals: 5, assetsToReview: 0, sheetUrl: 'https://docs.google.com/spreadsheets/d/x', runAt: 'now', top: [] });
  assert.doesNotMatch(html, /<script|<link|<style|@import|url\(/i);
  assert.match(html, /max-width:600px/); assert.match(html, /-apple-system/);
  assert.match(html, /href="https:\/\/docs\.google\.com\/spreadsheets/); assert.match(subject, /20 new, 5 above threshold/);
  assert.match(buildMime({ to: 'a@b.c', subject: 'é', html }), /Content-Type: text\/html; charset=UTF-8/);
});

test('TC-602 counts + time-to-clear model; zero-result digest still renders', () => {
  assert.equal(timeToClear({ pendingApprovals: 5, assetsToReview: 0 }), 5);
  assert.equal(timeToClear({ pendingApprovals: 5, assetsToReview: 1 }), 5 * 1 + (3 + 1 + 4));
  const z = digestEmail({ newListings: 0, aboveThreshold: 0, pendingActions: 0, pendingApprovals: 0, assetsToReview: 0, runAt: 'now' });
  assert.match(z.subject, /0 new, 0 above threshold/);
  const fail = digestEmail({ fatal: 'Invalid API key', runUrl: 'https://github.com/x/actions/runs/1', newListings: 0, aboveThreshold: 0, pendingActions: 0, runAt: 'now' });
  assert.match(fail.subject, /FAILED/); assert.match(fail.html, /Invalid API key/);
});

test('TC-604 confirmation email: company, title, asset count, folder link', () => {
  const e = confirmationEmail({ company: 'Stripe', title: 'Senior Product Manager', count: 5, folder: 'https://drive.google.com/drive/folders/abc', pages: 1 });
  assert.match(e.subject, /Stripe — Senior Product Manager/); assert.match(e.html, /5 assets/); assert.match(e.html, /drive\/folders\/abc/);
});

test('TC-701 cloud-only: no local paths or localhost in runtime code', () => {
  const hits = execSync(`grep -rnE "/Users/|/home/|localhost" ${root}src ${root}apps-script ${root}.github ${root}claude ${root}config || true`).toString().trim();
  assert.equal(hits, '', hits);
});

test('TC-702 secrets: every secret the workflow references is documented in RUNBOOK', () => {
  const y = read('.github/workflows/discovery.yml'); const rb = read('RUNBOOK.md');
  const secrets = [...new Set([...y.matchAll(/secrets\.([A-Z_]+)/g)].map((m) => m[1]))];
  assert.ok(secrets.length >= 7);
  for (const s of secrets) assert.match(rb, new RegExp(s), `${s} documented`);
});

test('TC-707 RUNBOOK: contents + failed run, expired token, API errors, pause/resume, iPad', () => {
  const rb = read('RUNBOOK.md');
  for (const h of ['## Contents', '## 3. Failed run', '## 4. Expired or revoked token', '## 5. API errors', '## 6. Pause and resume']) assert.ok(rb.includes(h), h);
  assert.match(rb, /iPad/);
});
