// Edge-case tests: scoring (deterministic, financial, layoffs, velocity, rank)
import '../helpers.js';
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { normalise, vetoReason, isHomeCountry, isUkLocation, phase1Score, phase2Score, rangesFor } from '../../src/scoring/deterministic.js';
import { growthToScore, inferredHealth } from '../../src/scoring/financial.js';
import { layoffFlag } from '../../src/scoring/layoffs.js';
import { recordPmCount, velocityFrom } from '../../src/scoring/velocity.js';
import { rank } from '../../src/scoring/rank.js';

// --- normalise ---
describe('normalise edge cases', () => {
  test('returns 0 when min === max', () => {
    assert.equal(normalise(5, 5, 5), 0);
  });

  test('clamps to 0–1', () => {
    assert.equal(normalise(-10, 0, 100), 0);
    assert.equal(normalise(200, 0, 100), 1);
    assert.equal(normalise(50, 0, 100), 0.5);
  });
});

// --- veto ---
describe('veto edge cases', () => {
  test('no veto on empty description', () => {
    assert.equal(vetoReason({ full_description: '', hiring_location: 'Remote' }), null);
  });

  test('veto fires on "unable to sponsor"', () => {
    const r = vetoReason({ full_description: 'We are unable to sponsor visas.', hiring_location: 'London, UK' });
    assert.ok(r && r.includes('veto'));
  });

  test('veto skipped for home country (India)', () => {
    const r = vetoReason({ full_description: 'We are unable to sponsor visas.', hiring_location: 'Bangalore, India' });
    assert.equal(r, null);
  });

  test('veto skipped for Indian city names', () => {
    for (const city of ['Bengaluru', 'Hyderabad', 'Pune', 'Mumbai', 'Delhi', 'Gurgaon', 'Noida', 'Chennai']) {
      assert.equal(vetoReason({ full_description: 'does not sponsor visas', hiring_location: city }), null, city);
    }
  });

  test('veto fires for non-home-country location', () => {
    const r = vetoReason({ full_description: 'does not sponsor visas', hiring_location: 'San Francisco, CA' });
    assert.ok(r);
  });
});

// --- isHomeCountry / isUkLocation ---
describe('location helpers', () => {
  test('isHomeCountry matches India and Indian cities', () => {
    assert.ok(isHomeCountry('India'));
    assert.ok(isHomeCountry('Bangalore, India'));
    assert.ok(isHomeCountry('Bengaluru'));
    assert.ok(!isHomeCountry('London'));
    assert.ok(!isHomeCountry(''));
  });

  test('isUkLocation matches UK and UK cities', () => {
    assert.ok(isUkLocation('UK'));
    assert.ok(isUkLocation('United Kingdom'));
    assert.ok(isUkLocation('London'));
    assert.ok(isUkLocation('Manchester'));
    assert.ok(isUkLocation('Edinburgh'));
    assert.ok(!isUkLocation('Berlin'));
    assert.ok(!isUkLocation('Bangalore'));
  });
});

// --- phase1Score ---
describe('phase1Score edge cases', () => {
  const baseListing = {
    work_model: 'Remote-Verified', velocity: 5, visa_sponsor: true, funding_stage: 'public',
    layoff_recent: false, hiring_freeze: false, financial_score: 0.8, hiring_location: 'London, UK',
    full_description: 'Great opportunity for a product manager.',
  };
  const ranges = { velocity: { min: 0, max: 10 } };

  test('score > 0 for a good listing', () => {
    const s = phase1Score(baseListing, ranges);
    assert.ok(s.phase1 > 0);
    assert.equal(s.veto, null);
  });

  test('veto zeroes the score', () => {
    const s = phase1Score({ ...baseListing, full_description: 'We are unable to sponsor visas.', hiring_location: 'San Francisco' }, ranges);
    assert.equal(s.phase1, 0);
    assert.ok(s.veto);
  });

  test('layoff/freeze zeroes the layoff component', () => {
    const s = phase1Score({ ...baseListing, layoff_recent: true }, ranges);
    assert.equal(s.weighted.layoff, 0);
  });

  test('visa component: 1 for home country regardless of visa_sponsor', () => {
    const s = phase1Score({ ...baseListing, visa_sponsor: false, hiring_location: 'Bangalore, India' }, ranges);
    assert.equal(s.components.visa, 1);
  });

  test('visa component: 1 for UK location with visa_sponsor=true', () => {
    const s = phase1Score({ ...baseListing, visa_sponsor: true, hiring_location: 'London, UK' }, ranges);
    assert.equal(s.components.visa, 1);
  });

  test('visa component: 0 for UK location with visa_sponsor=false', () => {
    const s = phase1Score({ ...baseListing, visa_sponsor: false, hiring_location: 'London, UK' }, ranges);
    assert.equal(s.components.visa, 0);
  });

  test('visa component: 0 for non-UK non-home with visa_sponsor=true', { todo: 'BUG-1: visa_sponsor from US company scores 0 — visa logic only uses UK register data for UK roles' }, () => {
    const s = phase1Score({ ...baseListing, visa_sponsor: true, hiring_location: 'San Francisco, US' }, ranges);
    assert.equal(s.components.visa, 0);
  });

  test('unknown funding_stage scores 0', () => {
    const s = phase1Score({ ...baseListing, funding_stage: 'unknown' }, ranges);
    assert.equal(s.components.funding, 0);
  });

  test('unknown work_model scores 0', () => {
    const s = phase1Score({ ...baseListing, work_model: 'Unknown' }, ranges);
    assert.equal(s.components.work_model, 0);
  });

  test('velocity normalised to 0 when min=max=0', () => {
    const s = phase1Score({ ...baseListing, velocity: 0 }, { velocity: { min: 0, max: 0 } });
    assert.equal(s.components.velocity, 0);
  });
});

// --- phase2Score ---
describe('phase2Score', () => {
  test('experience and domain normalised and weighted', () => {
    const s = phase2Score({ experience_raw: 3.5, domain_raw: 3.5 });
    assert.equal(s.experience_norm, 1);
    assert.equal(s.domain_norm, 1);
    assert.ok(s.phase2 > 0);
  });

  test('below-min values clamp to 0', () => {
    const s = phase2Score({ experience_raw: 0, domain_raw: 0 });
    assert.equal(s.experience_norm, 0);
    assert.equal(s.domain_norm, 0);
    assert.equal(s.phase2, 0);
  });
});

// --- rangesFor ---
describe('rangesFor', () => {
  test('empty listings → min=0, max=0', () => {
    const r = rangesFor([]);
    assert.equal(r.velocity.min, 0);
    assert.equal(r.velocity.max, 0);
  });

  test('single listing', () => {
    const r = rangesFor([{ velocity: 5 }]);
    assert.equal(r.velocity.min, 0);
    assert.equal(r.velocity.max, 5);
  });

  test('negative velocity included', () => {
    const r = rangesFor([{ velocity: -3 }, { velocity: 10 }]);
    assert.equal(r.velocity.min, -3);
    assert.equal(r.velocity.max, 10);
  });
});

// --- financial ---
describe('financial edge cases', () => {
  test('growthToScore: -10% → 0, +30% → 1, 10% → 0.5', () => {
    assert.equal(growthToScore(-0.1), 0);
    assert.equal(growthToScore(0.3), 1);
    assert.equal(growthToScore(0.1), 0.5);
  });

  test('growthToScore clamps beyond range', () => {
    assert.equal(growthToScore(-0.5), 0);
    assert.equal(growthToScore(1.0), 1);
  });

  test('inferredHealth: hiring freeze → 0.1', () => {
    assert.equal(inferredHealth({ hiring_freeze: true }), 0.1);
  });

  test('inferredHealth: layoff deducts 0.3', () => {
    const a = inferredHealth({ funding_stage: 'public', velocity: 1, layoff_recent: false });
    const b = inferredHealth({ funding_stage: 'public', velocity: 1, layoff_recent: true });
    assert.ok(a - b >= 0.29);
  });

  test('inferredHealth: unknown funding + no velocity → low', () => {
    const s = inferredHealth({ funding_stage: 'unknown', velocity: 0 });
    assert.ok(s < 0.4);
  });

  test('inferredHealth never negative', () => {
    const s = inferredHealth({ funding_stage: 'unknown', velocity: -5, layoff_recent: true });
    assert.ok(s >= 0);
  });
});

// --- layoffs ---
describe('layoff edge cases', () => {
  const events = [
    { company: 'Meta', date: '2026-11-01', source: 'layoffs.fyi' },
    { company: 'Acme Corp', date: '2025-01-01', source: 'manual' },
    { company: 'Stripe', source: 'manual' },  // no date
  ];
  const now = new Date('2026-11-26T00:00:00Z');

  test('recent layoff flagged', () => {
    const r = layoffFlag('Meta', events, now);
    assert.equal(r.layoff_recent, true);
    assert.equal(r.layoff_source, 'layoffs.fyi');
  });

  test('old layoff NOT flagged (>180 days)', () => {
    const r = layoffFlag('Acme Corp', events, now);
    assert.equal(r.layoff_recent, false);
  });

  test('no-date event still matches', () => {
    const r = layoffFlag('Stripe', events, now);
    assert.equal(r.layoff_recent, true);
  });

  test('no match returns false', () => {
    const r = layoffFlag('Nonexistent', events, now);
    assert.equal(r.layoff_recent, false);
  });

  test('company name matching uses word boundary', () => {
    const r = layoffFlag('Met', events, now);
    assert.equal(r.layoff_recent, false);
  });

  test('layoff match rejects names much longer than the event name', () => {
    const r = layoffFlag('Meta Platforms International Holdings Ltd', events, now);
    assert.equal(r.layoff_recent, false);
  });
});

// --- velocity ---
describe('velocity edge cases', () => {
  test('first record → velocity 0, no freeze', () => {
    const r = velocityFrom(null, { at: '2026-11-26T00:00:00Z', count: 10 });
    assert.equal(r.velocity, 0);
    assert.equal(r.hiring_freeze, false);
  });

  test('increasing count → positive velocity', () => {
    const prev = { at: '2026-11-25T00:00:00Z', count: 5 };
    const cur = { at: '2026-11-26T00:00:00Z', count: 10 };
    const r = velocityFrom(prev, cur);
    assert.ok(r.velocity > 0);
  });

  test('decreasing count → negative velocity', () => {
    const prev = { at: '2026-11-25T00:00:00Z', count: 10 };
    const cur = { at: '2026-11-26T00:00:00Z', count: 5 };
    const r = velocityFrom(prev, cur);
    assert.ok(r.velocity < 0);
  });

  test('hiring freeze: previous ≥ threshold and current = 0', () => {
    const prev = { at: '2026-11-25T00:00:00Z', count: 15 };
    const cur = { at: '2026-11-26T00:00:00Z', count: 0 };
    const r = velocityFrom(prev, cur);
    assert.equal(r.hiring_freeze, true);
  });

  test('no freeze when previous < threshold', () => {
    const prev = { at: '2026-11-25T00:00:00Z', count: 5 };
    const cur = { at: '2026-11-26T00:00:00Z', count: 0 };
    const r = velocityFrom(prev, cur);
    assert.equal(r.hiring_freeze, false);
  });

  test('recordPmCount trims history to 60', () => {
    const state = { pm_counts: { 'X': Array.from({ length: 65 }, (_, i) => ({ at: `2026-01-${String(i + 1).padStart(2, '0')}T00:00:00Z`, count: i })) } };
    recordPmCount(state, 'X', 100, new Date('2026-11-26'));
    assert.ok(state.pm_counts['X'].length <= 60);
  });

  test('same-day measurements use minimum 1/24 day', () => {
    const prev = { at: '2026-11-26T00:00:00Z', count: 0 };
    const cur = { at: '2026-11-26T00:00:00Z', count: 10 };
    const r = velocityFrom(prev, cur);
    assert.ok(isFinite(r.velocity));
    assert.ok(r.velocity > 0);
  });
});

// --- rank ---
describe('rank edge cases', () => {
  test('sorts descending by total_score', () => {
    const input = [{ total_score: 0.3, id: 'a' }, { total_score: 0.5, id: 'b' }, { total_score: 0.1, id: 'c' }];
    const r = rank(input);
    assert.equal(r[0].id, 'b');
    assert.equal(r[2].id, 'c');
  });

  test('stable sort: ties keep input order', () => {
    const input = [{ total_score: 0.5, id: 'first' }, { total_score: 0.5, id: 'second' }];
    const r = rank(input);
    assert.equal(r[0].id, 'first');
    assert.equal(r[1].id, 'second');
  });

  test('handles undefined scores', () => {
    const input = [{ id: 'a' }, { total_score: 0.5, id: 'b' }];
    const r = rank(input);
    assert.equal(r[0].id, 'b');
  });

  test('empty input', () => {
    assert.deepEqual(rank([]), []);
  });
});
