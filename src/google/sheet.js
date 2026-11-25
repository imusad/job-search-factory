// JSF-301..304: create, maintain and protect the tracker Sheet. Rows are never deleted. Approval is never written.
import { sheets, drive } from './auth.js';
import { COLUMNS, APPROVAL_INDEX, colLetter, colIndex, writableSegments } from './columns.js';
import { readJson, writeJson, settings, env } from '../lib/config.js';
import { log } from '../lib/log.js';

const CFG = 'data/google.json'; // committed: sheet id + folder id (ids, not secrets)
export const googleConfig = () => readJson(CFG, {});
const saveGoogleConfig = (c) => writeJson(CFG, c);
const TAB = 'Tracker';

export async function ensureRootFolder() {
  const cfg = googleConfig();
  if (env('DRIVE_FOLDER_ID')) return env('DRIVE_FOLDER_ID');
  if (cfg.folder_id) return cfg.folder_id;
  const f = await drive().files.create({ requestBody: { name: settings().sheet.drive_folder_name, mimeType: 'application/vnd.google-apps.folder' }, fields: 'id' });
  saveGoogleConfig({ ...cfg, folder_id: f.data.id });
  return f.data.id;
}

export async function ensureSheet() {
  const cfg = googleConfig();
  const id = env('SHEET_ID') || cfg.sheet_id;
  if (id) return id;
  const folderId = await ensureRootFolder();
  const created = await sheets().spreadsheets.create({
    requestBody: {
      properties: { title: settings().sheet.title },
      sheets: [{ properties: { title: TAB, gridProperties: { frozenRowCount: 1, columnCount: COLUMNS.length } } }],
    },
  });
  const sheetId = created.data.spreadsheetId;
  await drive().files.update({ fileId: sheetId, addParents: folderId, fields: 'id' });
  await formatSheet(sheetId, created.data.sheets[0].properties.sheetId);
  saveGoogleConfig({ ...googleConfig(), sheet_id: sheetId, sheet_url: `https://docs.google.com/spreadsheets/d/${sheetId}` });
  log.info(`Created tracker Sheet ${sheetId}`);
  return sheetId;
}

export async function formatSheet(spreadsheetId, gid) {
  await sheets().spreadsheets.values.update({ spreadsheetId, range: `${TAB}!A1`, valueInputOption: 'RAW', requestBody: { values: [COLUMNS.map((c) => c.header)] } });
  const scoreCols = COLUMNS.map((c, i) => [c, i]).filter(([c]) => c.score).map(([, i]) => i);
  const requests = [
    { updateSheetProperties: { properties: { sheetId: gid, gridProperties: { frozenRowCount: 1 } }, fields: 'gridProperties.frozenRowCount' } },
    { repeatCell: { range: { sheetId: gid, startRowIndex: 0, endRowIndex: 1 }, cell: { userEnteredFormat: { textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } }, backgroundColor: { red: 0.043, green: 0.145, blue: 0.271 }, wrapStrategy: 'WRAP' } }, fields: 'userEnteredFormat(textFormat,backgroundColor,wrapStrategy)' } },
    ...COLUMNS.map((c, i) => ({ updateDimensionProperties: { range: { sheetId: gid, dimension: 'COLUMNS', startIndex: i, endIndex: i + 1 }, properties: { pixelSize: c.width }, fields: 'pixelSize' } })),
    // JSF-303: dropdown restricted to Approved / Not Approved, strict (free text rejected)
    { setDataValidation: { range: { sheetId: gid, startRowIndex: 1, startColumnIndex: APPROVAL_INDEX, endColumnIndex: APPROVAL_INDEX + 1 }, rule: { condition: { type: 'ONE_OF_LIST', values: [{ userEnteredValue: 'Approved' }, { userEnteredValue: 'Not Approved' }] }, strict: true, showCustomUi: true } } },
    // JSF-304: built-in protection on the Approval column (defence in depth; owner keeps edit rights)
    { addProtectedRange: { protectedRange: { range: { sheetId: gid, startRowIndex: 1, startColumnIndex: APPROVAL_INDEX, endColumnIndex: APPROVAL_INDEX + 1 }, description: 'Approval — owner only, never machine-written', warningOnly: false } } },
    // conditional formatting: green high / red low on score columns
    ...scoreCols.flatMap((i) => [
      { addConditionalFormatRule: { index: 0, rule: { ranges: [{ sheetId: gid, startRowIndex: 1, startColumnIndex: i, endColumnIndex: i + 1 }], gradientRule: { minpoint: { type: 'NUMBER', value: '0', color: { red: 0.96, green: 0.6, blue: 0.6 } }, midpoint: { type: 'PERCENTILE', value: '50', color: { red: 1, green: 0.95, blue: 0.7 } }, maxpoint: { type: 'MAX', color: { red: 0.6, green: 0.85, blue: 0.6 } } } } } },
    ]),
    { setBasicFilter: { filter: { range: { sheetId: gid, startRowIndex: 0, startColumnIndex: 0, endColumnIndex: COLUMNS.length } } } },
  ];
  await sheets().spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });
}

export async function readRows(spreadsheetId) {
  const r = await sheets().spreadsheets.values.get({ spreadsheetId, range: `${TAB}!A2:${colLetter(COLUMNS.length - 1)}`, valueRenderOption: 'UNFORMATTED_VALUE' });
  return (r.data.values || []).map((vals, i) => ({ rowNumber: i + 2, values: vals, obj: Object.fromEntries(COLUMNS.map((c, j) => [c.key, vals[j] ?? ''])) }));
}

export function toRowValues(l) {
  const v = {
    ...l,
    hiring_location: l.hiring_location,
    total_score: l.total_score,
    visa_sponsor: l.visa_sponsor ? 'Yes' : 'No',
    layoff_freeze: [l.layoff_recent && 'layoff', l.hiring_freeze && 'freeze'].filter(Boolean).join(', ') || 'none',
    financial: l.financial_label || '',
    ghost_risk: l.ghost_risk ? 'TRUE' : 'FALSE',
    score_evidence: l.score_evidence || '',
  };
  return COLUMNS.map((c) => (c.key === 'approval' || c.writer === 'assets' || c.writer === 'semantic' ? '' : v[c.key] ?? ''));
}

/** JSF-302: append new, update existing (writable segments only), never delete. Returns counts. */
export async function upsertListings(spreadsheetId, listings) {
  const existing = await readRows(spreadsheetId);
  const approvalsBefore = existing.map((r) => r.obj.approval);
  const byId = new Map(existing.map((r) => [String(r.obj.id), r]));
  const toAppend = []; const data = [];
  const segs = writableSegments('discovery');
  for (const l of listings) {
    const row = byId.get(l.id);
    const vals = toRowValues(l);
    if (!row) { toAppend.push(vals); byId.set(l.id, { pending: true }); continue; }
    if (row.pending) continue; // duplicate within this batch (idempotency)
    // keep semantic contribution when updating total
    const semantic = Number(row.obj.phase2) || 0;
    vals[colIndex('total_score')] = l.veto ? 0 : Number(((l.phase1 || 0) + semantic).toFixed(4));
    if (semantic) vals[colIndex('score_evidence')] = row.obj.score_evidence; // semantic evidence wins
    for (const [a, b] of segs) data.push({ range: `${TAB}!${colLetter(a)}${row.rowNumber}:${colLetter(b)}${row.rowNumber}`, values: [vals.slice(a, b + 1)] });
  }
  if (data.length) {
    for (let i = 0; i < data.length; i += 500) await sheets().spreadsheets.values.batchUpdate({ spreadsheetId, requestBody: { valueInputOption: 'RAW', data: data.slice(i, i + 500) } });
  }
  if (toAppend.length) await appendRows(spreadsheetId, toAppend, existing.length);
  await assertApprovalsUnchanged(spreadsheetId, approvalsBefore);
  return { appended: toAppend.length, updated: data.length / segs.length };
}

// Append via explicit ranges below the last row, split around the Approval column so it is never written.
async function appendRows(spreadsheetId, rows, existingCount) {
  const start = existingCount + 2;
  const data = [];
  for (const [a, b] of [[0, APPROVAL_INDEX - 1], [APPROVAL_INDEX + 1, COLUMNS.length - 1]]) {
    data.push({ range: `${TAB}!${colLetter(a)}${start}:${colLetter(b)}${start + rows.length - 1}`, values: rows.map((r) => r.slice(a, b + 1)) });
  }
  await sheets().spreadsheets.values.batchUpdate({ spreadsheetId, requestBody: { valueInputOption: 'RAW', data } });
}

/** JSF-304 read-before/after-write: if an owner value changed, fail loudly (and restore it). */
export async function assertApprovalsUnchanged(spreadsheetId, before) {
  const after = (await readRows(spreadsheetId)).map((r) => r.obj.approval);
  const changed = before.map((v, i) => [v, after[i], i]).filter(([b, a]) => (b || '') !== (a || ''));
  if (changed.length) {
    await sheets().spreadsheets.values.batchUpdate({ spreadsheetId, requestBody: { valueInputOption: 'RAW', data: changed.map(([b, , i]) => ({ range: `${TAB}!${colLetter(APPROVAL_INDEX)}${i + 2}`, values: [[b]] })) } });
    throw new Error(`Approval column changed during a pipeline write (${changed.length} rows) — restored. This is a bug.`);
  }
}

/** Update specific columns for one row (used by semantic + asset stages). Refuses the Approval column. */
export async function updateCells(spreadsheetId, rowNumber, patch, writer) {
  const allowed = new Set(writableSegments(writer).flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, k) => a + k)));
  const data = Object.entries(patch).map(([key, value]) => {
    const i = colIndex(key);
    if (i === APPROVAL_INDEX || !allowed.has(i)) throw new Error(`Writer "${writer}" may not write column ${key}`);
    return { range: `${TAB}!${colLetter(i)}${rowNumber}`, values: [[value]] };
  });
  await sheets().spreadsheets.values.batchUpdate({ spreadsheetId, requestBody: { valueInputOption: 'RAW', data } });
}

export async function listProtectedRanges(spreadsheetId) {
  const r = await sheets().spreadsheets.get({ spreadsheetId, fields: 'sheets(protectedRanges,properties(sheetId,title))' });
  return r.data.sheets.flatMap((s) => s.protectedRanges || []);
}
