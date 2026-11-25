// Shared test helpers: an in-memory Google Sheets fake that honours protected ranges like the real API would for a
// non-owner, so a buggy write to the Approval column is detectable.
import { COLUMNS, APPROVAL_INDEX } from '../src/google/columns.js';

process.env.JSF_QUIET = '1';

const colNum = (letters) => [...letters].reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0) - 1;
function parseRange(r) {
  const m = r.replace(/^.*!/, '').match(/^([A-Z]+)(\d+)?(?::([A-Z]+)(\d+)?)?$/);
  return { c0: colNum(m[1]), r0: m[2] ? Number(m[2]) : 1, c1: colNum(m[3] || m[1]), r1: m[4] ? Number(m[4]) : null };
}

export function fakeSheets() {
  const grid = [COLUMNS.map((c) => c.header)];
  const calls = { batchUpdate: 0, deletes: 0, writes: [] };
  const set = (r, c, v) => { while (grid.length < r) grid.push([]); grid[r - 1][c] = v; };
  const api = {
    grid, calls,
    spreadsheets: {
      values: {
        get: async ({ range }) => { const { r0 } = parseRange(range); return { data: { values: grid.slice(r0 - 1).map((row) => COLUMNS.map((_, i) => row[i] ?? '')) } }; },
        update: async ({ range, requestBody }) => { const { c0, r0 } = parseRange(range); requestBody.values.forEach((row, i) => row.forEach((v, j) => { calls.writes.push(c0 + j); set(r0 + i, c0 + j, v); })); return {}; },
        batchUpdate: async ({ requestBody }) => {
          calls.batchUpdate++;
          for (const d of requestBody.data) { const { c0, r0 } = parseRange(d.range); d.values.forEach((row, i) => row.forEach((v, j) => { calls.writes.push(c0 + j); set(r0 + i, c0 + j, v); })); }
          return {};
        },
      },
      batchUpdate: async ({ requestBody }) => { for (const r of requestBody.requests) if (r.deleteDimension) calls.deletes++; return {}; },
      get: async () => ({ data: { sheets: [{ protectedRanges: [{ range: { startColumnIndex: APPROVAL_INDEX, endColumnIndex: APPROVAL_INDEX + 1 } }] }] } }),
    },
  };
  return api;
}

export function listing(over = {}) {
  return {
    id: over.id || 'abc', key: 'k', title: 'Senior Product Manager', employer: 'Acme', hiring_location: 'Remote', application_url: 'https://acme.example/job/1',
    source_origin: 'greenhouse', work_model: 'Remote-Verified', work_model_confidence: 'High', ats_platform: 'greenhouse', product_domain: 'ai_platform',
    phase1: 0.3, total_score: 0.3, score_evidence: 'P1', visa_sponsor: true, velocity: 1, layoff_recent: false, hiring_freeze: false,
    financial_label: '0.5 — inferred', first_seen_date: '2026-11-25', posting_date: '2026-11-20', ghost_risk: false, full_description: '', ...over,
  };
}
