// Google integration tests (TC-301..304, 402..407, 601, 604). Need GOOGLE_* + OWNER_EMAIL env. Uses a throwaway
// "JSF TEST" Sheet + folder so the real tracker is untouched. Run: npm run test:google
import { listing } from '../helpers.js';
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { hasGoogle, sheets, drive } from '../../src/google/auth.js';
import { formatSheet, upsertListings, readRows, listProtectedRanges, ensureRootFolder } from '../../src/google/sheet.js';
import { COLUMNS, APPROVAL_INDEX, colLetter } from '../../src/google/columns.js';
import { sendEmail } from '../../src/google/gmail.js';
import { digestEmail } from '../../src/email/templates.js';
import { listFolder, trash } from '../../src/google/drive.js';

const skip = !hasGoogle() && 'Google credentials not configured';
let sheetId, folderId;
const ctx = {};

before(async () => {
  if (skip) return;
  const parent = await ensureRootFolder();
  const f = await drive().files.create({ requestBody: { name: `JSF TEST ${new Date().toISOString()}`, mimeType: 'application/vnd.google-apps.folder', parents: [parent] }, fields: 'id' });
  folderId = f.data.id; process.env.DRIVE_FOLDER_ID = folderId;
  const s = await sheets().spreadsheets.create({ requestBody: { properties: { title: 'JSF TEST tracker' }, sheets: [{ properties: { title: 'Tracker', gridProperties: { columnCount: COLUMNS.length } } }] } });
  sheetId = s.data.spreadsheetId; process.env.SHEET_ID = sheetId;
  await drive().files.update({ fileId: sheetId, addParents: folderId, fields: 'id' });
  await formatSheet(sheetId, s.data.sheets[0].properties.sheetId);
  console.log(`  test sheet: https://docs.google.com/spreadsheets/d/${sheetId}`);
});

after(async () => {
  if (skip || !folderId) return;
  await trash(folderId); // the Sheet lives inside it; recoverable from Drive Trash for 30 days
  console.log('  test artifacts moved to Drive Trash');
});

test('TC-301 live: sheet created in folder, 24 headers, frozen row, conditional formatting', { skip }, async () => {
  const meta = await sheets().spreadsheets.get({ spreadsheetId: sheetId, fields: 'sheets(properties.gridProperties,conditionalFormats)' });
  assert.equal(meta.data.sheets[0].properties.gridProperties.frozenRowCount, 1);
  assert.ok(meta.data.sheets[0].conditionalFormats.length >= 3);
  const h = await sheets().spreadsheets.values.get({ spreadsheetId: sheetId, range: 'Tracker!A1:X1' });
  assert.deepEqual(h.data.values[0], COLUMNS.map((c) => c.header));
});

test('TC-302/303/304 live: append/update, approvals preserved, protected range present', { skip }, async () => {
  assert.deepEqual(await upsertListings(sheetId, ['a1', 'a2', 'a3', 'a4', 'a5'].map((id) => listing({ id }))), { appended: 5, updated: 0 });
  // owner approves 3 rows (direct write, as the owner would on iPad)
  await sheets().spreadsheets.values.update({ spreadsheetId: sheetId, range: `Tracker!${colLetter(APPROVAL_INDEX)}2:${colLetter(APPROVAL_INDEX)}4`, valueInputOption: 'RAW', requestBody: { values: [['Approved'], ['Approved'], ['Approved']] } });
  const r = await upsertListings(sheetId, ['a1', 'a2', 'a3', 'a4', 'a5', 'b1', 'b2', 'b3'].map((id) => listing({ id, phase1: 0.41 })));
  assert.deepEqual(r, { appended: 3, updated: 5 });
  const rows = await readRows(sheetId);
  assert.equal(rows.length, 8);
  assert.deepEqual(rows.slice(0, 3).map((x) => x.obj.approval), ['Approved', 'Approved', 'Approved']);
  const pr = await listProtectedRanges(sheetId);
  assert.ok(pr.some((p) => p.range.startColumnIndex === APPROVAL_INDEX));
  // strict dropdown rule is in place (enforced in the Sheets app; the API itself does not enforce validation,
  // which is why the pipeline also never writes this column)
  const dv = await sheets().spreadsheets.get({ spreadsheetId: sheetId, ranges: [`Tracker!${colLetter(APPROVAL_INDEX)}2`], fields: 'sheets(data(rowData(values(dataValidation))))' });
  const rule = dv.data.sheets[0].data[0].rowData[0].values[0].dataValidation;
  assert.equal(rule.strict, true);
  assert.deepEqual(rule.condition.values.map((v) => v.userEnteredValue), ['Approved', 'Not Approved']);
  ctx.row = rows[0];
});

test('TC-402..407 live: publish example assets → folder with 5 assets, 1-page resume PDF, link written back', { skip, timeout: 300000 }, async () => {
  const { publishAssets } = await import('../../src/assets/publish.js');
  const a = JSON.parse(fs.readFileSync(new URL('../../claude/assets.example.json', import.meta.url)));
  a.listing_id = 'a1';
  const r = await publishAssets(a, { email: true });
  console.log(`  folder: ${r.folder} · resume pages: ${r.resume_pages} · ATS pages: ${r.ats_pages} · bullets cut: ${r.bullets_cut}`);
  assert.equal(r.resume_pages, 1);
  assert.equal(r.ats_pages, 1, 'R8 + R16: the ATS twin is one page too');
  assert.ok(r.assets.resume_ats && r.assets.resume_ats_pdf, 'R16: ATS twin Doc and PDF are linked');
  const appFolderId = r.folder.match(/folders\/([^/?]+)/)[1];
  const parentMeta = await drive().files.get({ fileId: appFolderId, fields: 'parents' });
  const parentName = (await drive().files.get({ fileId: parentMeta.data.parents[0], fields: 'name,parents' })).data;
  assert.equal(parentName.name, 'Applications', 'FR-4.7: per-application folder nests under Applications');
  assert.equal(parentName.parents[0], folderId, 'Applications nests under the root folder');
  const files = await listFolder(appFolderId);
  const names = files.map((f) => f.name).join(' | ');
  for (const n of ['Resume', 'Resume \\(ATS\\)', 'Cover letter', 'LinkedIn message', 'Company info', 'Case study', 'Selection Log']) assert.match(names, new RegExp(n));
  assert.ok(files.some((f) => f.name === 'Resume (ATS) — Cloudflare.pdf'), 'R16: ATS PDF uploaded');
  const row = (await readRows(sheetId)).find((x) => x.obj.id === 'a1');
  assert.match(row.obj.assets_folder, /drive\.google\.com/); assert.ok(row.obj.assets_generated);
  assert.equal(row.obj.approval, 'Approved');
  // The publisher trims the bundle in place to fit one page, so a re-run must start from the stored bundle, as production does.
  const fresh = JSON.parse(fs.readFileSync(new URL('../../claude/assets.example.json', import.meta.url))); fresh.listing_id = 'a1';
  const again = await publishAssets(fresh, { email: false });
  assert.equal(again.skipped, true, 'idempotent — no regeneration');
});

test('TC-601/602 live: digest email sends', { skip }, async () => {
  const id = await sendEmail(digestEmail({ newListings: 20, aboveThreshold: 5, pendingActions: 5, pendingApprovals: 5, assetsToReview: 0, sheetUrl: `https://docs.google.com/spreadsheets/d/${sheetId}`, runAt: new Date().toISOString(), top: [listing({ title: 'Senior Product Manager, AI', employer: 'TestCo', total_score: 0.52 })] }));
  assert.ok(id);
});
