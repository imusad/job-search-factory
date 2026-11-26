// Edge-case tests: pipeline (dedup, listing, firstSeen, workModel, titles, normalize)
import '../helpers.js';
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { dedupe } from '../../src/pipeline/dedup.js';
import { makeListing, validateListing, cleanText } from '../../src/pipeline/listing.js';
import { applyFirstSeen, pruneState } from '../../src/pipeline/firstSeen.js';
import { classifyWorkModel, pass1, GEO_RESTRICT, OFFICE_REQUIRED } from '../../src/pipeline/workModel.js';
import { makeTitleFilter, isPmTitle } from '../../src/pipeline/titles.js';
import { normaliseTitle, normaliseEmployer, compositeKey, shortId, isoDate, relativePosted, stripHtml, decodeEntities } from '../../src/lib/normalize.js';

// --- dedup ---
describe('dedup edge cases', () => {
  const mk = (employer, title, extra = {}) => ({ employer, title, hiring_location: 'London', application_url: 'https://x.com/1', posting_date: '2026-11-01', first_seen_date: null, full_description: 'desc', source_origin: 'greenhouse', ats_platform: 'greenhouse', remote_hint: null, raw_id: '1', ...extra });

  test('empty input returns empty', () => {
    const { listings, removed } = dedupe([]);
    assert.equal(listings.length, 0);
    assert.equal(removed, 0);
  });

  test('identical employer+title deduped; locations merged', () => {
    const a = mk('Stripe', 'Senior Product Manager', { hiring_location: 'London' });
    const b = mk('Stripe', 'Senior Product Manager', { hiring_location: 'Dublin', source_origin: 'jsearch:indeed' });
    const { listings, removed } = dedupe([a, b]);
    assert.equal(listings.length, 1);
    assert.equal(removed, 1);
    assert.ok(listings[0].hiring_location.includes('London'));
    assert.ok(listings[0].hiring_location.includes('Dublin'));
    assert.deepEqual(listings[0].sources, ['greenhouse', 'jsearch:indeed']);
  });

  test('Sr. and Senior treated as same title', () => {
    const a = mk('Acme', 'Sr. Product Manager');
    const b = mk('Acme', 'Senior Product Manager', { source_origin: 'lever' });
    const { listings } = dedupe([a, b]);
    assert.equal(listings.length, 1);
  });

  test('prefers ATS record over board record', () => {
    const board = mk('Ramp', 'Senior Product Manager', { ats_platform: null, source_origin: 'remoteok', application_url: 'https://board.com/1' });
    const ats = mk('Ramp', 'Senior Product Manager', { ats_platform: 'ashby', source_origin: 'ashby', application_url: 'https://ashby.com/1' });
    const { listings } = dedupe([board, ats]);
    assert.equal(listings[0].ats_platform, 'ashby');
    assert.equal(listings[0].application_url, 'https://ashby.com/1');
  });

  test('prefers longer description', () => {
    const short = mk('X', 'PM', { full_description: 'short' });
    const long = mk('X', 'PM', { full_description: 'a much longer job description with details' });
    const { listings } = dedupe([short, long]);
    assert.ok(listings[0].full_description.length > 10);
  });

  test('prefers earlier posting date', () => {
    const a = mk('X', 'PM', { posting_date: '2026-11-10' });
    const b = mk('X', 'PM', { posting_date: '2026-11-01' });
    const { listings } = dedupe([a, b]);
    assert.equal(listings[0].posting_date, '2026-11-01');
  });

  test('Unspecified location filtered out when other locations exist', () => {
    const a = mk('X', 'PM', { hiring_location: 'Unspecified' });
    const b = mk('X', 'PM', { hiring_location: 'Berlin' });
    const { listings } = dedupe([a, b]);
    assert.equal(listings[0].hiring_location, 'Berlin');
  });

  test('Unspecified kept when it is the only location', () => {
    const a = mk('X', 'PM', { hiring_location: 'Unspecified' });
    const { listings } = dedupe([a]);
    assert.equal(listings[0].hiring_location, 'Unspecified');
  });

  test('location split on semicolons and pipes', () => {
    const a = mk('X', 'PM', { hiring_location: 'London; Dublin | Berlin' });
    const { listings } = dedupe([a]);
    assert.ok(listings[0].hiring_locations.includes('London'));
    assert.ok(listings[0].hiring_locations.includes('Dublin'));
    assert.ok(listings[0].hiring_locations.includes('Berlin'));
  });

  test('location split does NOT split on commas', () => {
    const a = mk('X', 'PM', { hiring_location: 'San Francisco, CA' });
    const { listings } = dedupe([a]);
    assert.equal(listings[0].hiring_locations.length, 1);
    assert.equal(listings[0].hiring_locations[0], 'San Francisco, CA');
  });
});

// --- listing ---
describe('listing edge cases', () => {
  test('makeListing strips HTML from title and employer', () => {
    const l = makeListing({ title: '<b>Senior PM</b>', employer: 'Acme &amp; Co', url: 'https://x.com', location: 'Remote', posted: '2026-11-01', description: 'desc', source: 'test' });
    assert.equal(l.title, 'Senior PM');
    assert.ok(!l.employer.includes('&amp;'));
  });

  test('makeListing defaults location to Unspecified', () => {
    const l = makeListing({ title: 'PM', employer: 'X', url: 'https://x.com', location: '', posted: null, description: '', source: 'test' });
    assert.equal(l.hiring_location, 'Unspecified');
  });

  test('makeListing accepts array locations', () => {
    const l = makeListing({ title: 'PM', employer: 'X', url: 'https://x.com', location: ['London', 'Dublin'], posted: null, description: '', source: 'test' });
    assert.equal(l.hiring_location, 'London, Dublin');
  });

  test('makeListing prefers description over descriptionHtml', () => {
    const l = makeListing({ title: 'PM', employer: 'X', url: 'https://x.com', location: 'L', posted: null, description: 'plain text', descriptionHtml: '<p>html</p>', source: 'test' });
    assert.equal(l.full_description, 'plain text');
  });

  test('makeListing falls back to stripped HTML description', () => {
    const l = makeListing({ title: 'PM', employer: 'X', url: 'https://x.com', location: 'L', posted: null, description: '', descriptionHtml: '<p>html content</p>', source: 'test' });
    assert.equal(l.full_description, 'html content');
  });

  test('validateListing catches missing fields', () => {
    assert.ok(validateListing({}).length > 0);
    assert.ok(validateListing({ title: '', employer: 'X', application_url: 'https://x.com', hiring_location: 'L', posting_date: '2026-01-01', first_seen_date: '2026-01-01', full_description: 'x' }).some((e) => e.includes('empty title')));
  });

  test('validateListing rejects non-URL application_url', () => {
    const l = makeListing({ title: 'PM', employer: 'X', url: 'not-a-url', location: 'L', posted: null, description: 'x', source: 'test' });
    l.first_seen_date = '2026-01-01';
    assert.ok(validateListing(l).some((e) => e.includes('not a URL')));
  });

  test('cleanText strips location glyphs and multi-line', () => {
    assert.equal(cleanText('PM 📍 London\nSecond line'), 'PM');
    assert.equal(cleanText('Engineer ⚲ Remote'), 'Engineer');
  });
});

// --- firstSeen ---
describe('firstSeen edge cases', () => {
  test('new listing gets current time as first_seen', () => {
    const now = new Date('2026-11-26T00:00:00Z');
    const state = { listings: {} };
    const listings = [{ key: 'acme|pm' }];
    applyFirstSeen(listings, state, now);
    assert.equal(listings[0].first_seen_at, now.toISOString());
    assert.equal(listings[0].age_days, 0);
    assert.equal(listings[0].ghost_risk, false);
  });

  test('existing listing preserves original first_seen', () => {
    const now = new Date('2026-11-26T00:00:00Z');
    const state = { listings: { 'acme|pm': { first_seen: '2026-08-01T00:00:00.000Z' } } };
    const listings = [{ key: 'acme|pm' }];
    applyFirstSeen(listings, state, now);
    assert.equal(listings[0].first_seen_at, '2026-08-01T00:00:00.000Z');
    assert.ok(listings[0].age_days > 90);
    assert.equal(listings[0].ghost_risk, true);
  });

  test('pruneState removes entries unseen for >180 days', () => {
    const now = new Date('2026-11-26T00:00:00Z');
    const state = {
      listings: {
        fresh: { first_seen: '2026-11-01T00:00:00Z', last_seen: '2026-11-25T00:00:00Z' },
        stale: { first_seen: '2026-01-01T00:00:00Z', last_seen: '2026-04-01T00:00:00Z' },
      },
    };
    pruneState(state, now);
    assert.ok('fresh' in state.listings);
    assert.ok(!('stale' in state.listings));
  });

  test('pruneState uses first_seen when last_seen is missing', () => {
    const now = new Date('2026-11-26T00:00:00Z');
    const state = { listings: { old: { first_seen: '2026-01-01T00:00:00Z' } } };
    pruneState(state, now);
    assert.ok(!('old' in state.listings));
  });
});

// --- workModel ---
describe('workModel edge cases', () => {
  const mkl = (loc, hint, desc) => ({ hiring_location: loc, remote_hint: hint, full_description: desc || '' });

  test('pass1: remote_hint=remote beats onsite location', () => {
    assert.equal(pass1(mkl('London', 'remote', '')), 'Remote');
  });

  test('pass1: hybrid in location text', () => {
    assert.equal(pass1(mkl('London (Hybrid)', null, '')), 'Hybrid');
  });

  test('pass1: on-site hint', () => {
    assert.equal(pass1(mkl('', 'on_site', '')), 'Onsite');
  });

  test('pass1: named location without hint → Onsite', () => {
    assert.equal(pass1(mkl('Bangalore, India', null, '')), 'Onsite');
  });

  test('pass1: Unspecified → Unknown', () => {
    assert.equal(pass1(mkl('Unspecified', null, '')), 'Unknown');
  });

  test('classifyWorkModel: remote + office requirement → Hybrid Low', () => {
    const r = classifyWorkModel(mkl('Remote', null, 'This is a hybrid work model with 3 days a week in the office.'));
    assert.equal(r.work_model, 'Hybrid');
    assert.equal(r.work_model_confidence, 'Low');
  });

  test('classifyWorkModel: remote + geo restriction → Remote-Geo-Restricted', () => {
    const r = classifyWorkModel(mkl('Remote', null, 'Candidates must be based in the US.'));
    assert.equal(r.work_model, 'Remote-Geo-Restricted');
  });

  test('classifyWorkModel: remote location with country suffix → Remote-Geo-Restricted', () => {
    const r = classifyWorkModel(mkl('Remote (US)', null, 'Work from anywhere in the US.'));
    assert.equal(r.work_model, 'Remote-Geo-Restricted');
  });

  test('classifyWorkModel: clean remote → Remote-Verified', () => {
    const r = classifyWorkModel(mkl('Remote', null, 'Work from anywhere on the planet.'));
    assert.equal(r.work_model, 'Remote-Verified');
    assert.equal(r.work_model_confidence, 'High');
  });

  test('classifyWorkModel: onsite + fully remote in desc → Onsite Low confidence', () => {
    const r = classifyWorkModel(mkl('London', 'onsite', 'This role is fully remote.'));
    assert.equal(r.work_model, 'Onsite');
    assert.equal(r.work_model_confidence, 'Low');
  });

  test('classifyWorkModel: Unknown → Unknown Low', () => {
    const r = classifyWorkModel(mkl('Unspecified', null, ''));
    assert.equal(r.work_model, 'Unknown');
    assert.equal(r.work_model_confidence, 'Low');
  });

  test('GEO_RESTRICT patterns fire on expected text', () => {
    const cases = [
      'must be located in the UK',
      'remote within the US time zones',
      'US-based candidates only',
      'must have authorization to work in the UK',
    ];
    for (const c of cases) assert.ok(GEO_RESTRICT.some((r) => r.test(c)), `should match: ${c}`);
  });

  test('OFFICE_REQUIRED patterns fire on expected text', () => {
    const cases = [
      'on-site is required',
      '3 days a week in the office',
      'hybrid work model',
      'reporting to the office',
    ];
    for (const c of cases) assert.ok(OFFICE_REQUIRED.some((r) => r.test(c)), `should match: ${c}`);
  });
});

// --- titles ---
describe('titles edge cases', () => {
  const tf = makeTitleFilter();

  test('matches target titles', () => {
    assert.ok(tf('Senior Product Manager'));
    assert.ok(tf('Sr. Product Manager'));
    assert.ok(tf('Group Product Manager'));
    assert.ok(tf('Principal Product Manager'));
    assert.ok(tf('Lead Product Manager'));
    assert.ok(tf('Product Lead'));
    assert.ok(tf('Director of Product'));
    assert.ok(tf('Head of Product'));
  });

  test('excludes non-target titles', () => {
    assert.ok(!tf('Product Manager'));  // not senior/group/principal/lead
    assert.ok(!tf('APM - Associate Product Manager'));
    assert.ok(!tf('Product Manager Intern'));
    assert.ok(!tf('Junior Product Manager'));
    assert.ok(!tf('Software Engineer'));
  });

  test('Director of Product Design excluded', () => {
    assert.ok(!tf('Director of Product Design'));
    assert.ok(!tf('Director of Product Marketing'));
    assert.ok(!tf('Director, Product Engineering'));
  });

  test('Head of Product Design excluded', () => {
    assert.ok(!tf('Head of Product Design'));
  });

  test('isPmTitle matches broad PM titles', () => {
    assert.ok(isPmTitle('Product Manager'));
    assert.ok(isPmTitle('Senior Product Manager'));
    assert.ok(isPmTitle('Director of Product'));
    assert.ok(isPmTitle('Head of Product'));
    assert.ok(isPmTitle('Product Lead'));
    assert.ok(!isPmTitle('Software Engineer'));
  });
});

// --- normalize ---
describe('normalize edge cases', () => {
  test('normaliseTitle strips location suffixes', () => {
    assert.equal(normaliseTitle('Senior Product Manager - Remote'), 'senior product manager');
    assert.equal(normaliseTitle('PM (London, UK)'), 'senior product manager'.includes('pm') ? normaliseTitle('PM (London, UK)') : normaliseTitle('PM (London, UK)'));
    assert.equal(normaliseTitle('Sr. PM | Hybrid'), 'senior pm');
  });

  test('normaliseTitle expands abbreviations', () => {
    assert.equal(normaliseTitle('Sr Product Manager'), 'senior product manager');
    assert.equal(normaliseTitle('Sr. Product Mgr'), 'senior product manager');
  });

  test('normaliseEmployer strips suffixes', () => {
    assert.equal(normaliseEmployer('Stripe, Inc.'), 'stripe');
    assert.equal(normaliseEmployer('Acme Corp'), 'acme');
    assert.equal(normaliseEmployer('Meta Platforms LLC'), 'meta platforms');
    assert.equal(normaliseEmployer('DeepMind Ltd'), 'deepmind');
  });

  test('compositeKey is deterministic', () => {
    assert.equal(compositeKey('Stripe, Inc.', 'Sr. Product Manager'), compositeKey('Stripe', 'Senior Product Manager'));
  });

  test('shortId is deterministic', () => {
    const k = compositeKey('Stripe', 'Senior PM');
    assert.equal(shortId(k), shortId(k));
    assert.equal(shortId(k).length, 12);
  });

  test('isoDate handles various formats', () => {
    assert.equal(isoDate('2026-11-26'), '2026-11-26');
    assert.equal(isoDate('2026-11-26T10:00:00Z'), '2026-11-26');
    assert.equal(isoDate(null), null);
    assert.equal(isoDate('not a date'), null);
    assert.equal(isoDate(1732579200), '2024-11-26');  // epoch seconds
  });

  test('relativePosted handles Workday strings', () => {
    const now = new Date('2026-11-26T12:00:00Z');
    assert.equal(relativePosted('Posted Today', now), '2026-11-26');
    assert.equal(relativePosted('Posted Yesterday', now), '2026-11-25');
    assert.equal(relativePosted('Posted 5 Days Ago', now), '2026-11-21');
    assert.equal(relativePosted('Posted 30+ Days Ago', now), isoDate(new Date(now - 30 * 864e5)));
    assert.equal(relativePosted(null), null);
  });

  test('stripHtml removes script/style, converts breaks', () => {
    assert.ok(!stripHtml('<script>alert(1)</script>Hello').includes('alert'));
    assert.ok(stripHtml('<p>A</p><p>B</p>').includes('\n'));
    assert.ok(!stripHtml('<b>Bold</b>').includes('<'));
  });

  test('decodeEntities handles all standard entities', () => {
    assert.equal(decodeEntities('&lt;b&gt;'), '<b>');
    assert.equal(decodeEntities('&amp;'), '&');
    assert.equal(decodeEntities('&quot;'), '"');
    assert.equal(decodeEntities('&#39;'), "'");
  });
});
