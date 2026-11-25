// Google integration tests (TC-301..304, 402..407, 601, 604). Need GOOGLE_* + OWNER_EMAIL env. Uses a throwaway
// "JSF TEST" Sheet + folder so the real tracker is untouched. Run: npm run test:google
import { listing } from '../helpers.js';
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { hasGoogle, sheets, drive } from '../../src/google/auth.js';
import { formatSheet, upsertListings, readRows, listProtectedRanges } from '../../src/google/sheet.js';
import { COLUMNS, APPROVAL_INDEX, colLetter } from '../../src/google/columns.js';
import { sendEmail } from '../../src/google/gmail.js';
import { digestEmail } from '../../src/email/templates.js';
import { listFolder } from '../../src/google/drive.js';

const skip = !hasGoogle() && 'Google credentials not configured';
let sheetId, folderId;
const ctx = {};

before(async () => {
  if (skip) return;
  const f = await drive().files.create({ requestBody: { name: `JSF TEST ${new Date().toISOString()}`, mimeType: 'application/vnd.google-apps.folder' }, fields: 'id' });
  folderId = f.data.id; process.env.DRIVE_FOLDER_ID = folderId;
  const s = await sheets().spreadsheets.create({ requestBody: { properties: { title: 'JSF TEST tracker' }, sheets: [{ properties: { title: 'Tracker', gridProperties: { columnCount: COLUMNS.length } } }] } });
  sheetId = s.data.spreadsheetId; process.env.SHEET_ID = sheetId;
  await drive().files.update({ fileId: sheetId, addParents: folderId, fields: 'id' });
  await formatSheet(sheetId, s.data.sheets[0].properties.sheetId);
  console.log(`  test sheet: https://docs.google.com/spreadsheets/d/${sheetId}`);
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
  // free-text approval is rejected by strict validation
  await assert.rejects(sheets().spreadsheets.values.update({ spreadsheetId: sheetId, range: `Tracker!${colLetter(APPROVAL_INDEX)}9`, valueInputOption: 'USER_ENTERED', requestBody: { values: [['maybe']] } }));
  ctx.row = rows[0];
});

test('TC-402..407 live: publish example assets → folder with 5 assets, 1-page resume PDF, link written back', { skip, timeout: 300000 }, async () => {
  const { publishAssets } = await import('../../src/assets/publish.js');
  const a = JSON.parse(fs.readFileSync(new URL('../../claude/assets.example.json', import.meta.url)));
  a.listing_id = 'a1';
  const r = await publishAssets(a, { email: true });
  console.log(`  folder: ${r.folder} · resume pages: ${r.resume_pages} · bullets cut: ${r.bullets_cut}`);
  assert.equal(r.resume_pages, 1);
  const files = await listFolder(r.folder.match(/folders\/([^/?]+)/)[1]);
  const names = files.map((f) => f.name).join(' | ');
  for (const n of ['Resume', 'Cover letter', 'LinkedIn message', 'Company info', 'Case study']) assert.match(names, new RegExp(n));
  const row = (await readRows(sheetId)).find((x) => x.obj.id === 'a1');
  assert.match(row.obj.assets_folder, /drive\.google\.com/); assert.ok(row.obj.assets_generated);
  assert.equal(row.obj.approval, 'Approved');
  const again = await publishAssets(a, { email: false });
  assert.equal(again.skipped, true, 'idempotent — no regeneration');
});

test('TC-601/602 live: digest email sends', { skip }, async () => {
  const id = await sendEmail(digestEmail({ newListings: 20, aboveThreshold: 5, pendingActions: 5, pendingApprovals: 5, assetsToReview: 0, sheetUrl: `https://docs.google.com/spreadsheets/d/${sheetId}`, runAt: new Date().toISOString(), top: [listing({ title: 'Senior Product Manager, AI', employer: 'TestCo', total_score: 0.52 })] }));
  assert.ok(id);
});
