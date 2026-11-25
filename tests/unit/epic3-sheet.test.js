import { fakeSheets, listing } from '../helpers.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { _setClient } from '../../src/google/auth.js';
import { upsertListings, updateCells, listProtectedRanges, formatSheet } from '../../src/google/sheet.js';
import { COLUMNS, APPROVAL_INDEX, writableSegments } from '../../src/google/columns.js';

test('TC-301 schema: 24 columns in 6 groups; formatting requests (frozen header, validation, protection, conditional format)', async () => {
  assert.equal(COLUMNS.length, 24);
  const groups = COLUMNS.reduce((m, c) => ({ ...m, [c.group]: (m[c.group] || 0) + 1 }), {});
  assert.deepEqual(groups, { Identity: 6, Classification: 4, Scoring: 4, Company: 4, 'Owner control': 1, Workflow: 5 });
  const fake = fakeSheets(); const reqs = [];
  fake.spreadsheets.batchUpdate = async ({ requestBody }) => { reqs.push(...requestBody.requests); return {}; };
  _setClient('sheets', fake);
  await formatSheet('S', 0);
  assert.deepEqual(fake.grid[0], COLUMNS.map((c) => c.header));
  const kinds = reqs.map((r) => Object.keys(r)[0]);
  for (const k of ['updateSheetProperties', 'setDataValidation', 'addProtectedRange', 'addConditionalFormatRule', 'updateDimensionProperties']) assert.ok(kinds.includes(k), k);
  assert.equal(reqs.find((r) => r.updateSheetProperties).updateSheetProperties.properties.gridProperties.frozenRowCount, 1);
});

test('TC-302 append new / update existing / never delete / idempotent', async () => {
  const fake = fakeSheets(); _setClient('sheets', fake);
  const five = ['a', 'b', 'c', 'd', 'e'].map((id) => listing({ id }));
  assert.deepEqual(await upsertListings('S', five), { appended: 5, updated: 0 });
  assert.equal(fake.grid.length, 6);
  const r2 = await upsertListings('S', five.map((l) => ({ ...l, phase1: 0.4 })));
  assert.deepEqual(r2, { appended: 0, updated: 5 }); assert.equal(fake.grid.length, 6, 'no duplicates');
  const r3 = await upsertListings('S', [listing({ id: 'a' }), listing({ id: 'b' }), listing({ id: 'x' }), listing({ id: 'y' }), listing({ id: 'z' })]);
  assert.deepEqual(r3, { appended: 3, updated: 2 });
  assert.equal(fake.grid.length, 9); assert.equal(fake.calls.deletes, 0);
  await upsertListings('S', [listing({ id: 'q' }), listing({ id: 'q' })]);
  assert.equal(fake.grid.length, 10, 'same key twice in one batch → one row');
});

test('TC-303 Approval column: validation rule is strict two-value list and pipeline never writes it', async () => {
  const fake = fakeSheets(); const reqs = [];
  fake.spreadsheets.batchUpdate = async ({ requestBody }) => { reqs.push(...requestBody.requests); return {}; };
  _setClient('sheets', fake);
  await formatSheet('S', 0);
  const dv = reqs.find((r) => r.setDataValidation).setDataValidation;
  assert.equal(dv.range.startColumnIndex, APPROVAL_INDEX);
  assert.deepEqual(dv.rule.condition.values.map((v) => v.userEnteredValue), ['Approved', 'Not Approved']);
  assert.equal(dv.rule.strict, true, 'free text rejected');
  const f2 = fakeSheets(); _setClient('sheets', f2);
  await upsertListings('S', [listing({ id: 'a' })]); await upsertListings('S', [listing({ id: 'a' })]);
  assert.ok(!f2.calls.writes.includes(APPROVAL_INDEX), 'no write ever touched the Approval column');
});

test('TC-304 Approval protection: values preserved, built-in protection, hard exclusion', async () => {
  const fake = fakeSheets(); _setClient('sheets', fake);
  await upsertListings('S', ['a', 'b', 'c', 'd'].map((id) => listing({ id })));
  for (const r of [1, 2, 3]) fake.grid[r][APPROVAL_INDEX] = 'Approved';
  await upsertListings('S', ['a', 'b', 'c', 'd', 'e'].map((id) => listing({ id, phase1: 0.5 })));
  assert.deepEqual(fake.grid.slice(1, 4).map((r) => r[APPROVAL_INDEX]), ['Approved', 'Approved', 'Approved']);
  const pr = await listProtectedRanges('S');
  assert.ok(pr.some((p) => p.range.startColumnIndex === APPROVAL_INDEX));
  for (const w of ['discovery', 'semantic', 'assets', 'owner']) for (const [a, b] of writableSegments(w)) assert.ok(!(a <= APPROVAL_INDEX && APPROVAL_INDEX <= b), w);
  await assert.rejects(updateCells('S', 2, { approval: 'Approved' }, 'assets'), /may not write/);
  await assert.rejects(updateCells('S', 2, { approval: 'Not Approved' }, 'discovery'), /may not write/);
  // simulate a buggy writer that clobbers the column mid-update → detected and restored
  const orig = fake.spreadsheets.values.batchUpdate;
  let bugOnce = true;
  fake.spreadsheets.values.batchUpdate = async (req) => { await orig(req); if (bugOnce) { bugOnce = false; fake.grid[1][APPROVAL_INDEX] = ''; } };
  await assert.rejects(upsertListings('S', [listing({ id: 'a' })]), /Approval column changed/);
  fake.spreadsheets.values.batchUpdate = orig;
  assert.equal(fake.grid[1][APPROVAL_INDEX], 'Approved', 'restored');
});
