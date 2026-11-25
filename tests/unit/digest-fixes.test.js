// Regression tests for issues found in the first live digest (2026-11-25).
import '../helpers.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeTitleFilter } from '../../src/pipeline/titles.js';
import { makeListing, cleanText } from '../../src/pipeline/listing.js';
import { parseRss } from '../../src/sources/boards.js';
import { phase1Score } from '../../src/scoring/deterministic.js';
import { digestEmail } from '../../src/email/templates.js';

test('Director/Head of Product must be product management, not design/marketing', () => {
  const f = makeTitleFilter();
  for (const t of ['Director of Product Design', 'Head of Product Marketing', 'Director, Product Engineering', 'Head of Product Design']) assert.equal(f(t), false, t);
  for (const t of ['Director of Product Management', 'Director of Product', 'Head of Product', 'Director, Product - AI Platform', 'Head of Product, Payments']) assert.equal(f(t), true, t);
});

test('employer/title never carry HTML, entities or location glyphs (Jobspresso RSS case)', () => {
  assert.equal(cleanText('Beacon Biosignals<br>⚲&nbsp;United States'), 'Beacon Biosignals');
  const rss = '<?xml version="1.0"?><rss><channel><item><title>Senior Product Manager at Beacon Biosignals&lt;br&gt;⚲&amp;nbsp;United States</title><link>https://jobspresso.co/job/x</link></item></channel></rss>';
  const [it] = parseRss(rss, 'jobspresso');
  const l = makeListing({ ...it, source: 'jobspresso' });
  assert.equal(l.employer, 'Beacon Biosignals');
  assert.equal(l.title, 'Senior Product Manager');
});

test('UK sponsor register only earns visa credit for UK-located roles', () => {
  const r = { velocity: { min: 0, max: 1 } };
  const base = { work_model: 'Onsite', velocity: 0, visa_sponsor: true, funding_stage: 'unknown', layoff_recent: true, full_description: '' };
  assert.equal(phase1Score({ ...base, hiring_location: 'Berlin, Germany' }, r).components.visa, 0);
  assert.equal(phase1Score({ ...base, hiring_location: 'London, UK' }, r).components.visa, 1);
  assert.equal(phase1Score({ ...base, visa_sponsor: false, hiring_location: 'Bengaluru, India' }, r).components.visa, 1, 'home country needs no visa');
});

test('digest: not-configured sources are a muted note, not failures; backlog shown separately', () => {
  const { html } = digestEmail({ newListings: 28, aboveThreshold: 2, pendingActions: 2, pendingApprovals: 2, assetsToReview: 0, backlog: 149, runAt: 'now', top: [],
    failures: [{ source: 'adzuna', error: 'ADZUNA_APP_ID not configured (OD-5) — skipped' }, { source: 'workable:Jasper', error: 'HTTP 429' }] });
  assert.match(html, /1 source\(s\) failed/);
  assert.match(html, /Not set up yet \(optional\): adzuna/);
  assert.match(html, /~2 minutes/);
  assert.match(html, /Older backlog: 149/);
});
