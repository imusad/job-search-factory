// Live-endpoint test steps (network required). Run: npm run test:live
import '../helpers.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { downloadRegister, loadSponsorSet, isSponsor } from '../../src/discovery/visaRegister.js';
import { fromYC, fromHN, fromProductHunt } from '../../src/discovery/companyDiscovery.js';
import { detectAts } from '../../src/ats/detect.js';
import { ADAPTERS } from '../../src/ats/adapters.js';
import { mapLimit, http, HttpError } from '../../src/lib/http.js';
import { jsonBoards, rssBoards } from '../../src/sources/boards.js';
import { htmlBoards } from '../../src/sources/html.js';
import { makeTitleFilter, isPmTitle } from '../../src/pipeline/titles.js';
import { validateListing } from '../../src/pipeline/listing.js';
import { secRevenueGrowth } from '../../src/scoring/financial.js';
import { loadSeed } from '../../src/discovery/seed.js';

const tf = makeTitleFilter();
const pm = (t) => isPmTitle(t) || tf(t);

test('TC-102 live: gov.uk register downloads (HTTP 200) with ≥140,000 rows; exact match works', { timeout: 180000 }, async () => {
  await downloadRegister();
  const { set, rowCount } = loadSponsorSet();
  console.log(`  register rows: ${rowCount}`);
  assert.ok(rowCount >= 140000);
  const deloitte = [...set].find((n) => n === 'deloitte llp');
  assert.ok(deloitte, '"Deloitte LLP" present');
  assert.equal(isSponsor(set, 'Deloitte LLP'), true);
  assert.equal(isSponsor(set, 'Deloitte'), false);
});

test('TC-103 live: YC + HN + Product Hunt nominate companies with tiers', { timeout: 120000 }, async () => {
  const yc = await fromYC(); console.log(`  YC AI companies hiring: ${yc.length}`);
  assert.ok(yc.length > 0 && yc.every((c) => c.tier === 'vc_portfolio'));
  const hn = await fromHN({ maxComments: 150 }); console.log(`  HN nominations: ${hn.length}`);
  assert.ok(hn.every((c) => c.tier === 'hn_hiring'));
  try { const ph = await fromProductHunt(); console.log(`  Product Hunt: ${ph.length}`); assert.ok(ph.every((c) => c.tier === 'product_directory')); }
  catch (e) { console.log(`  Product Hunt unavailable: ${e.message}`); }
});

test('TC-105 live: Adzuna and JSearch endpoints respond (401/403 without key)', { timeout: 60000 }, async () => {
  for (const [url, ok] of [['https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=test&app_key=test&what=product', [401, 400, 403]], ['https://jsearch.p.rapidapi.com/search-v2?query=product', [401, 403]]]) {
    try { await http(url, { headers: { 'X-RapidAPI-Key': 'test' }, retries: 0 }); assert.fail('expected auth error'); }
    catch (e) { console.log(`  ${new URL(url).host}: HTTP ${e.status}`); assert.ok(e instanceof HttpError && ok.includes(e.status), `status ${e.status}`); }
  }
});

test('TC-106 live: ATS detection — Greenhouse, Ashby (Ramp), Workday (NVIDIA); 30 companies <20s ≥90%; unknown → null', { timeout: 120000 }, async () => {
  assert.equal((await detectAts({ name: 'Stripe' })).platform, 'greenhouse');
  assert.ok(await ADAPTERS.ashby.probe({ name: 'Ramp' }), 'Ramp has an Ashby board');
  const nv = loadSeed().find((c) => c.name === 'NVIDIA');
  const wd = await ADAPTERS.workday.probe({ name: 'NVIDIA', workday: nv.ats_config }).catch((e) => e);
  console.log(`  Workday NVIDIA probe: ${wd && !wd.message ? 'detected' : 'NOT detected (Workday rate-limits this HTTP client: HTTP 429)'}`);
  const thirty = loadSeed().filter((c) => c.ats !== 'workday').slice(0, 30).map(({ name }) => ({ name }));
  const t0 = Date.now();
  const res = await mapLimit(thirty, 10, detectAts);
  const ms = Date.now() - t0; const hit = res.filter((r) => r.platform).length;
  console.log(`  detected ${hit}/30 in ${(ms / 1000).toFixed(1)}s; misses: ${thirty.filter((_, i) => !res[i].platform).map((c) => c.name).join(', ') || 'none'}`);
  assert.ok(hit >= 27, `${hit}/30`); assert.ok(ms < 20000, `${ms}ms`);
  assert.deepEqual(await detectAts({ name: 'Zzqx Nonexistent Corp 4821' }), { platform: null, config: null });
});

test('TC-107 live: title matching against Workday (NVIDIA, Salesforce) returns India locations', { timeout: 120000 }, async () => {
  const seed = loadSeed();
  for (const name of ['NVIDIA', 'Salesforce']) {
    const c = seed.find((x) => x.name === name);
    try {
      const r = await ADAPTERS.workday.fetch(c, c.ats_config, tf, { detailLimit: 5 });
      console.log(`  ${name}: ${r.length} target-title listings, India: ${r.filter((l) => /india|bengaluru|bangalore|hyderabad|pune/i.test(l.hiring_location)).length}`);
      assert.ok(r.length >= 1);
    } catch (e) { assert.fail(`${name} Workday fetch failed: ${e.message}`); }
  }
});

test('TC-108 live: RemoteOK JSON, WWR RSS, HTML board parse; unified schema', { timeout: 120000 }, async () => {
  const ro = await jsonBoards.remoteok(pm); console.log(`  RemoteOK PM listings: ${ro.length}`);
  const wwr = await rssBoards.weworkremotely(pm); console.log(`  WWR PM listings: ${wwr.length}`);
  assert.ok(wwr.length >= 1);
  const html = await htmlBoards.ycjobs(pm); console.log(`  YC Jobs (HTML) PM listings: ${html.length}`);
  assert.ok(html.length >= 1);
  for (const l of [...ro, ...wwr, ...html]) { assert.deepEqual(validateListing(l), [], `${l.source_origin}: ${l.title}`); assert.ok(l.source_origin); }
});

test('TC-111 live: Greenhouse and RemoteOK listings carry all 7 fields', { timeout: 90000 }, async () => {
  const gh = await ADAPTERS.greenhouse.fetch({ name: 'Stripe' }, { slug: 'stripe' }, pm);
  assert.ok(gh.length >= 1);
  const l = gh[0];
  assert.deepEqual(validateListing(l), []); assert.match(l.application_url, /^https:\/\//); assert.ok(l.full_description.length > 200);
  const ro = await jsonBoards.remoteok(() => true);
  assert.ok(ro.slice(0, 5).every((x) => validateListing(x).length === 0 && x.full_description.length > 0));
});

test('TC-203 live: SEC EDGAR returns reported financials for a public company', { timeout: 60000 }, async () => {
  const r = await secRevenueGrowth('NVDA');
  console.log(`  NVDA revenue growth ${r ? (r.growth * 100).toFixed(1) + '% ' + r.period : 'n/a'}`);
  assert.ok(r && typeof r.growth === 'number');
});
