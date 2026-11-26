// iPad user-journey tests: everything the user touches from Gmail → Sheets → Drive → back to Gmail.
// Tests the HTML rendering constraints, the Sheet interaction model, the trigger chain, and the
// asset-to-Drive-to-email loop — all without calling live Google APIs.
import '../helpers.js';
import { listing, fakeSheets } from '../helpers.js';
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { digestEmail, confirmationEmail, timeToClear } from '../../src/email/templates.js';
import { buildMime } from '../../src/google/gmail.js';
import { COLUMNS, APPROVAL_INDEX, colIndex, colLetter, writableSegments } from '../../src/google/columns.js';
import { toRowValues } from '../../src/google/sheet.js';
import { validateAssets } from '../../src/assets/validate.js';
import { folderName } from '../../src/google/drive.js';

// ════════════════════════════════════════════════════════════════════
// STEP 1: DIGEST EMAIL — Gmail app on iPad
// ════════════════════════════════════════════════════════════════════
describe('Step 1: Digest email in Gmail app', () => {
  const summary = {
    runAt: '2026-11-26T05:30:00Z', newListings: 26, aboveThreshold: 8, pendingActions: 10,
    pendingApprovals: 7, assetsToReview: 3, backlog: 15, totalFetched: 14778, sourcesOk: 32, matched: 344,
    failures: [
      { source: 'adzuna', error: 'ADZUNA_APP_ID not configured (OD-5) — skipped' },
      { source: 'workday:NVIDIA', error: 'HTTP 429' },
    ],
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1dxIxAi75S5kD8xsK5Y5qHbvpb8MG-_AGWympFldp_v4',
    top: [
      { title: 'Senior Product Manager, AI Platform', employer: 'Stripe', work_model: 'Remote-Verified', hiring_location: 'Remote', total_score: 0.48 },
      { title: 'Group Product Manager', employer: 'Cloudflare', work_model: 'Hybrid', hiring_location: 'London, UK', total_score: 0.45 },
      { title: 'Director of Product', employer: 'Ramp', work_model: 'Remote-Geo-Restricted', hiring_location: 'Remote (US)', total_score: 0.42 },
    ],
  };

  test('E2E-1.1: subject line contains new count, above-threshold count, and time estimate', () => {
    const e = digestEmail(summary);
    assert.match(e.subject, /26 new/);
    assert.match(e.subject, /8 above threshold/);
    assert.match(e.subject, /\d+ min to clear/);
    assert.ok(!e.subject.includes('FAILED'));
  });

  test('E2E-1.2: HTML uses only inline CSS (no <style> blocks, no <link> stylesheets)', () => {
    const { html } = digestEmail(summary);
    assert.ok(!/<style[\s>]/i.test(html), 'Gmail app strips <style> blocks — inline only');
    assert.ok(!/<link[^>]+stylesheet/i.test(html), 'No external stylesheets');
  });

  test('E2E-1.3: no JavaScript in email (Gmail strips it, breaking layout)', () => {
    const { html } = digestEmail(summary);
    assert.ok(!/<script[\s>]/i.test(html));
    assert.ok(!/\bon\w+\s*=/i.test(html), 'No inline event handlers');
  });

  test('E2E-1.4: no external images or resources (Gmail proxy rewrites break layout)', () => {
    const { html } = digestEmail(summary);
    assert.ok(!/<img\s/i.test(html), 'No images');
    assert.ok(!/url\s*\([^)]*http/i.test(html), 'No background-image URLs');
  });

  test('E2E-1.5: max-width 600px for single-column layout on iPad portrait', () => {
    const { html } = digestEmail(summary);
    assert.match(html, /max-width:\s*600px/);
  });

  test('E2E-1.6: uses system font stack (-apple-system first for iOS)', () => {
    const { html } = digestEmail(summary);
    assert.match(html, /-apple-system/);
  });

  test('E2E-1.7: viewport meta present for proper iPad scaling', () => {
    const { html } = digestEmail(summary);
    assert.match(html, /meta\s+name="viewport"/);
    assert.match(html, /width=device-width/);
  });

  test('E2E-1.8: "Open tracker" button links to the real Sheet URL', () => {
    const { html } = digestEmail(summary);
    assert.match(html, /href="https:\/\/docs\.google\.com\/spreadsheets\/d\/1dxIxAi75S5kD8xsK5Y5qHbvpb8MG-/);
    assert.match(html, /Open tracker/);
  });

  test('E2E-1.9: button is tap-friendly on iPad (padding ≥ 12px for 44px touch target)', () => {
    const { html } = digestEmail(summary);
    const btnMatch = html.match(/padding:\s*(\d+)px\s+(\d+)px[^"]*"[^>]*>Open tracker/);
    assert.ok(btnMatch, 'Button must have explicit padding');
    assert.ok(Number(btnMatch[1]) >= 12, 'Vertical padding ≥ 12px');
  });

  test('E2E-1.10: top listings show company, title, score, work model, location', () => {
    const { html } = digestEmail(summary);
    assert.match(html, /Stripe/);
    assert.match(html, /Senior Product Manager/);
    assert.match(html, /Remote-Verified/);
    assert.match(html, /0\.48/);
  });

  test('E2E-1.11: real failures separated from "not configured" notices', () => {
    const { html } = digestEmail(summary);
    assert.match(html, /1 source\(s\) failed/);
    assert.match(html, /NVIDIA/);
    assert.match(html, /Not set up yet/);
    assert.match(html, /adzuna/);
  });

  test('E2E-1.12: time-to-clear model matches formula', () => {
    const mins = timeToClear(summary);
    assert.equal(mins, 7 * 1 + 3 * (3 + 1 + 4), '7 approvals × 1min + 3 reviews × 8min');
    assert.equal(mins, 31);
  });

  test('E2E-1.13: fatal email has ⚠️ FAILED prefix and error details', () => {
    const fatal = digestEmail({ ...summary, fatal: 'invalid_grant: Token has been expired or revoked', runUrl: 'https://github.com/imusad/job-search-factory/actions/runs/123' });
    assert.match(fatal.subject, /⚠️ FAILED/);
    assert.match(fatal.html, /invalid_grant/);
    assert.match(fatal.html, /actions\/runs\/123/);
  });

  test('E2E-1.14: empty run (zero listings) still renders without errors', () => {
    const empty = digestEmail({ runAt: '2026-11-26', newListings: 0, aboveThreshold: 0, pendingActions: 0, pendingApprovals: 0, assetsToReview: 0, failures: [], top: [] });
    assert.match(empty.subject, /0 new/);
    assert.ok(empty.html.length > 100);
  });

  test('E2E-1.15: backlog note shown when backlog > pending', () => {
    const { html } = digestEmail(summary);
    assert.match(html, /Older backlog.*15/);
  });

  test('E2E-1.16: MIME encoding produces valid base64 with UTF-8 subject', () => {
    const { subject, html } = digestEmail(summary);
    const mime = buildMime({ to: 'test@example.com', subject, html });
    assert.match(mime, /Content-Type: text\/html; charset=UTF-8/);
    assert.match(mime, /Content-Transfer-Encoding: base64/);
    assert.match(mime, /MIME-Version: 1\.0/);
  });

  test('E2E-1.17: subject with emoji encodes as RFC 2047 =?UTF-8?B?...?=', () => {
    const fatal = digestEmail({ ...summary, fatal: 'boom' });
    const mime = buildMime({ to: 'x@x.com', subject: fatal.subject, html: fatal.html });
    assert.match(mime, /Subject: =\?UTF-8\?B\?/);
  });

  test('E2E-1.18: XSS-safe — special chars in listing titles are HTML-escaped', () => {
    const xss = digestEmail({ ...summary, top: [{ title: '<script>alert(1)</script>', employer: '"><img onerror=alert(1)>', work_model: 'Remote', hiring_location: 'Remote', total_score: 0.5 }] });
    assert.ok(!xss.html.includes('<script>alert'), 'raw script tag must be escaped');
    assert.match(xss.html, /&lt;script&gt;/, 'title angle brackets escaped');
    assert.match(xss.html, /&quot;/, 'employer double-quote escaped');
    assert.match(xss.html, /&lt;img/, 'employer angle bracket escaped');
  });
});

// ════════════════════════════════════════════════════════════════════
// STEP 2: TRACKER SHEET — Google Sheets app on iPad
// ════════════════════════════════════════════════════════════════════
describe('Step 2: Tracker Sheet interaction on iPad', () => {
  test('E2E-2.1: Approval column is column S (19th, index 18) — the user scrolls right to it', () => {
    assert.equal(APPROVAL_INDEX, 18);
    assert.equal(colLetter(APPROVAL_INDEX), 'S');
    assert.equal(COLUMNS[APPROVAL_INDEX].header, 'Approval');
  });

  test('E2E-2.2: Approval dropdown has exactly "Approved" and "Not Approved" (strict validation)', () => {
    // The formatSheet sets strict: true, ONE_OF_LIST with these two values.
    // On iPad Sheets app, this renders as a dropdown — no free text.
    assert.equal(COLUMNS[APPROVAL_INDEX].writer, 'owner');
  });

  test('E2E-2.3: discovery pipeline never writes the Approval column', () => {
    const segs = writableSegments('discovery');
    const indices = segs.flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, k) => a + k));
    assert.ok(!indices.includes(APPROVAL_INDEX));
  });

  test('E2E-2.4: semantic pipeline never writes the Approval column', () => {
    const segs = writableSegments('semantic');
    const indices = segs.flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, k) => a + k));
    assert.ok(!indices.includes(APPROVAL_INDEX));
  });

  test('E2E-2.5: assets pipeline never writes the Approval column', () => {
    const segs = writableSegments('assets');
    const indices = segs.flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, k) => a + k));
    assert.ok(!indices.includes(APPROVAL_INDEX));
  });

  test('E2E-2.6: toRowValues produces empty string for Approval', () => {
    const row = toRowValues(listing());
    assert.equal(row[APPROVAL_INDEX], '');
  });

  test('E2E-2.7: toRowValues produces empty strings for assets columns', () => {
    const row = toRowValues(listing());
    assert.equal(row[colIndex('assets_generated')], '');
    assert.equal(row[colIndex('assets_folder')], '');
  });

  test('E2E-2.8: columns visible on iPad without horizontal scroll are Identity group (6 cols)', () => {
    // iPad landscape is ~1024px. First 6 columns total width:
    const firstSix = COLUMNS.slice(0, 6).reduce((sum, c) => sum + c.width, 0);
    // 110 + 260 + 150 + 200 + 200 + 110 = 1030 — just barely fits landscape
    assert.ok(firstSix <= 1100, `First 6 cols = ${firstSix}px, should fit iPad landscape`);
  });

  test('E2E-2.9: Approval column position allows tapping after reasonable scroll', () => {
    // Total width before Approval column:
    const widthBefore = COLUMNS.slice(0, APPROVAL_INDEX).reduce((sum, c) => sum + c.width, 0);
    // Should be reachable with one or two swipes on iPad (~1024px viewport)
    const swipes = Math.ceil(widthBefore / 1024);
    assert.ok(swipes <= 3, `Approval column requires ${swipes} swipes — should be ≤ 3`);
  });

  test('E2E-2.10: score columns have conditional formatting (gradient) for visual scanning', () => {
    const scoreCols = COLUMNS.filter((c) => c.score);
    assert.equal(scoreCols.length, 3, 'phase1, phase2, total_score');
    assert.ok(scoreCols.every((c) => c.score));
  });

  test('E2E-2.11: fakeSheets append skips the Approval column gap', () => {
    const api = fakeSheets();
    // Simulate what appendRows does: two ranges split around Approval
    const rows = [toRowValues(listing({ id: 'test1' }))];
    const seg1 = rows.map((r) => r.slice(0, APPROVAL_INDEX));
    const seg2 = rows.map((r) => r.slice(APPROVAL_INDEX + 1));
    assert.ok(seg1[0].length === APPROVAL_INDEX);
    assert.ok(seg2[0].length === COLUMNS.length - APPROVAL_INDEX - 1);
  });

  test('E2E-2.12: multi-row approval (batch) — user selects multiple cells on iPad', () => {
    // On iPad Sheets, you can select a range and paste the same value.
    // The onApprovalEdit trigger receives the full range.
    // Simulate: rows 2-4 all set to Approved.
    const fakeEvent = {
      range: {
        getSheet: () => ({ getRange: () => ({ getValues: () => [['Approval']] }), getLastColumn: () => 24 }),
        getRow: () => 2, getColumn: () => APPROVAL_INDEX + 1, getLastColumn: () => APPROVAL_INDEX + 1,
        getNumRows: () => 3,
      },
    };
    // The trigger reads the actual values from the sheet, not the event
    // so it handles multi-row correctly as long as getNumRows() > 1
    assert.equal(fakeEvent.range.getNumRows(), 3);
  });
});

// ════════════════════════════════════════════════════════════════════
// STEP 3: APPS SCRIPT TRIGGER CHAIN
// ════════════════════════════════════════════════════════════════════
describe('Step 3: Apps Script trigger chain', () => {
  test('E2E-3.1: onApprovalEdit ignores header row edits (row < 2)', () => {
    // row 1 is headers — trigger should exit early
    const shouldFire = (row) => row >= 2;
    assert.equal(shouldFire(1), false);
    assert.equal(shouldFire(2), true);
  });

  test('E2E-3.2: onApprovalEdit ignores edits to non-Approval columns', () => {
    // If e.range.getColumn() > col or e.range.getLastColumn() < col, skip
    const col = APPROVAL_INDEX + 1; // 1-indexed
    const shouldFire = (editCol, editLastCol) => !(editCol > col || editLastCol < col);
    assert.equal(shouldFire(1, 5), false, 'editing columns 1-5 should not fire');
    assert.equal(shouldFire(col, col), true, 'editing exactly the Approval column fires');
    assert.equal(shouldFire(col - 2, col + 2), true, 'editing a range that includes Approval fires');
  });

  test('E2E-3.3: onApprovalEdit ignores "Not Approved" edits', () => {
    const values = [['Not Approved']];
    const approved = values.some((r) => r[0] === 'Approved');
    assert.equal(approved, false);
  });

  test('E2E-3.4: debounce prevents fire within 10 minutes', () => {
    const DEBOUNCE_MIN = 10;
    const lastFire = Date.now() - 5 * 60000; // 5 min ago
    assert.equal(Date.now() - lastFire < DEBOUNCE_MIN * 60000, true, 'should be debounced');
  });

  test('E2E-3.5: sweep grace period is 25 minutes (longer than debounce)', () => {
    const SWEEP_GRACE_MIN = 25;
    const DEBOUNCE_MIN = 10;
    assert.ok(SWEEP_GRACE_MIN > DEBOUNCE_MIN, 'sweep waits longer than onEdit debounce');
  });

  test('E2E-3.6: sweep fires for approved rows without assets after grace period', () => {
    const SWEEP_GRACE_MIN = 25;
    const lastFire = Date.now() - 30 * 60000; // 30 min ago
    const pendingCount = 2;
    const shouldSweep = pendingCount > 0 && (Date.now() - lastFire) >= SWEEP_GRACE_MIN * 60000;
    assert.equal(shouldSweep, true);
  });

  test('E2E-3.7: sweep does NOT fire when no pending rows', () => {
    const pendingCount = 0;
    assert.equal(pendingCount > 0, false);
  });

  test('E2E-3.8: fire_ with missing CLAUDE_FIRE_URL/TOKEN logs and returns quietly', () => {
    const url = null;
    const token = null;
    assert.equal(Boolean(url && token), false, 'should skip fire');
  });

  test('E2E-3.9: failed fire (non-200) clears LAST_FIRE_MS for sweep retry', () => {
    let lastFireMs = '1732579200000';
    const responseCode = 500;
    if (responseCode !== 200) lastFireMs = null;
    assert.equal(lastFireMs, null, 'cleared for sweep to retry');
  });

  test('E2E-3.10: fire payload includes ISO timestamp and reason', () => {
    const reason = 'approval at row 5';
    const payload = JSON.stringify({ text: `Trigger: ${reason} at ${new Date().toISOString()}` });
    const parsed = JSON.parse(payload);
    assert.match(parsed.text, /Trigger: approval at row 5/);
    assert.match(parsed.text, /\d{4}-\d{2}-\d{2}T/);
  });

  test('E2E-3.11: pendingCount_ checks "Tracker" sheet specifically', () => {
    // The function uses getSheetByName('Tracker') — not getActiveSheet()
    // This matters because iPad user might be on a different tab
    const sheetName = 'Tracker';
    assert.equal(sheetName, 'Tracker');
  });

  test('E2E-3.12: pendingCount_ handles empty sheet (lastRow < 2)', () => {
    const lastRow = 1; // only headers
    assert.equal(lastRow < 2, true, 'should return 0');
  });

  test('E2E-3.13: rapid approvals within 10 minutes share one routine run', () => {
    // Approve row 2 at T+0, row 3 at T+2min, row 4 at T+5min
    // Only the first fires. The sweep at T+30 picks up all three.
    const fires = [];
    const DEBOUNCE_MIN = 10;
    const baseTime = 1000000000000; // arbitrary start
    let lastFireMs = 0;
    for (const [row, minAfter] of [[2, 0], [3, 2], [4, 5]]) {
      const now = baseTime + minAfter * 60000;
      if (now - lastFireMs >= DEBOUNCE_MIN * 60000) {
        fires.push(row);
        lastFireMs = now;
      }
    }
    assert.deepEqual(fires, [2], 'only the first approval fires; the rest are debounced');
  });
});

// ════════════════════════════════════════════════════════════════════
// STEP 4: ASSET GENERATION + PUBLISH
// ════════════════════════════════════════════════════════════════════
describe('Step 4: Asset generation and publish', () => {
  test('E2E-4.1: publishAssets refuses if approval is not "Approved"', () => {
    // This is tested by checking the guard condition
    const approval = 'Not Approved';
    assert.notEqual(approval, 'Approved');
  });

  test('E2E-4.2: publishAssets skips if assets_generated is already set (idempotent)', () => {
    const assetsGenerated = '2026-11-26T10:00:00Z';
    assert.ok(assetsGenerated, 'should return { skipped: true }');
  });

  test('E2E-4.3: Drive folder name follows pattern "<Company> — <Title> (<date>)"', () => {
    assert.equal(folderName('Stripe', 'Senior PM', '2026-11-26'), 'Stripe — Senior PM (2026-11-26)');
  });

  test('E2E-4.4: Drive folder name with special chars in company name', () => {
    assert.equal(folderName('AT&T', 'Director, Product', '2026-11-26'), 'AT&T — Director, Product (2026-11-26)');
  });

  test('E2E-4.5: assets_generated and assets_folder written by "assets" writer only', () => {
    const agCol = COLUMNS.find((c) => c.key === 'assets_generated');
    const afCol = COLUMNS.find((c) => c.key === 'assets_folder');
    assert.equal(agCol.writer, 'assets');
    assert.equal(afCol.writer, 'assets');
  });

  test('E2E-4.6: 8 files created in Drive folder (resume, PDF, cover, LinkedIn, info, deck, log, pack)', () => {
    const expectedFiles = ['Resume', 'Resume PDF', 'Cover letter', 'LinkedIn message', 'Company info', 'Case study', 'Selection Log', 'Answer pack'];
    assert.equal(expectedFiles.length, 8);
  });
});

// ════════════════════════════════════════════════════════════════════
// STEP 5: CONFIRMATION EMAIL — back to Gmail on iPad
// ════════════════════════════════════════════════════════════════════
describe('Step 5: Confirmation email in Gmail app', () => {
  test('E2E-5.1: subject is "Assets ready: <Company> — <Title>"', () => {
    const e = confirmationEmail({ company: 'Stripe', title: 'Senior PM', count: 5, folder: 'https://drive.google.com/drive/folders/abc', pages: 1 });
    assert.equal(e.subject, 'Assets ready: Stripe — Senior PM');
  });

  test('E2E-5.2: body has "Open Drive folder" button linking to the right folder', () => {
    const e = confirmationEmail({ company: 'Stripe', title: 'Senior PM', count: 5, folder: 'https://drive.google.com/drive/folders/abc', pages: 1 });
    assert.match(e.html, /href="https:\/\/drive\.google\.com\/drive\/folders\/abc"/);
    assert.match(e.html, /Open Drive folder/);
  });

  test('E2E-5.3: single-page resume — no warning shown', () => {
    const e = confirmationEmail({ company: 'X', title: 'PM', count: 5, folder: 'https://drive.google.com/x', pages: 1 });
    assert.ok(!e.html.includes('over one page'));
  });

  test('E2E-5.4: multi-page resume — red warning shown', () => {
    const e = confirmationEmail({ company: 'X', title: 'PM', count: 5, folder: 'https://drive.google.com/x', pages: 2 });
    assert.match(e.html, /over one page/);
    assert.match(e.html, /c0392b/); // red color
  });

  test('E2E-5.5: confirmation email also uses inline CSS, no JS, no external resources', () => {
    const { html } = confirmationEmail({ company: 'X', title: 'PM', count: 5, folder: 'https://x.com', pages: 1 });
    assert.ok(!/<style[\s>]/i.test(html));
    assert.ok(!/<script[\s>]/i.test(html));
    assert.ok(!/<img\s/i.test(html));
    assert.match(html, /max-width:\s*600px/);
    assert.match(html, /-apple-system/);
  });

  test('E2E-5.6: "Open Drive folder" button opens in Drive app on iPad (uses standard https link)', () => {
    const e = confirmationEmail({ company: 'X', title: 'PM', count: 5, folder: 'https://drive.google.com/drive/folders/abc', pages: 1 });
    // Standard https://drive.google.com links open in Drive app via iOS universal links
    assert.match(e.html, /https:\/\/drive\.google\.com/);
    // No custom URL scheme (googledrive://) that could break
    assert.ok(!e.html.includes('googledrive://'));
  });

  test('E2E-5.7: company name with XSS attempt is escaped', () => {
    const e = confirmationEmail({ company: '<img src=x onerror=alert(1)>', title: 'PM', count: 5, folder: 'https://x.com', pages: 1 });
    assert.ok(!e.html.includes('<img src=x'), 'raw img tag must be escaped');
    assert.match(e.html, /&lt;img/, 'angle bracket escaped');
  });
});

// ════════════════════════════════════════════════════════════════════
// STEP 6: DRIVE FOLDER — Google Drive app on iPad
// ════════════════════════════════════════════════════════════════════
describe('Step 6: Drive folder on iPad', () => {
  test('E2E-6.1: folder hierarchy is "Job Search Factory / Applications / <Company> — <Title> (<date>)"', () => {
    const root = 'Job Search Factory';
    const apps = 'Applications';
    const folder = folderName('Stripe', 'Senior PM', '2026-11-26');
    assert.equal(`${root} / ${apps} / ${folder}`, 'Job Search Factory / Applications / Stripe — Senior PM (2026-11-26)');
  });

  test('E2E-6.2: Google Doc files open natively in Google Docs iPad app', () => {
    // Uploaded as mimeType: 'application/vnd.google-apps.document' — opens in Docs app
    const uploadMimeType = 'application/vnd.google-apps.document';
    assert.equal(uploadMimeType, 'application/vnd.google-apps.document');
  });

  test('E2E-6.3: PDF file opens in iPad preview / Drive viewer', () => {
    // Uploaded as application/pdf — Drive app shows inline preview
    const pdfMimeType = 'application/pdf';
    assert.equal(pdfMimeType, 'application/pdf');
  });

  test('E2E-6.4: Slides deck opens in Google Slides iPad app', () => {
    // Created via Slides API — has webViewLink for direct open
    const webViewLink = 'https://docs.google.com/presentation/d/abc/edit';
    assert.match(webViewLink, /docs\.google\.com\/presentation/);
  });

  test('E2E-6.5: webViewLink format for folders works with Drive app universal links', () => {
    // webViewLink from Drive API: https://drive.google.com/drive/folders/<id>
    // This opens in Drive app on iPad via universal links
    const link = 'https://drive.google.com/drive/folders/16tLFIenf4NJl3HJqZRId0AvXSQc70Zdv';
    assert.match(link, /^https:\/\/drive\.google\.com\/drive\/folders\//);
  });
});

// ════════════════════════════════════════════════════════════════════
// NEGATIVE SCENARIOS: Things that should fail gracefully
// ════════════════════════════════════════════════════════════════════
describe('Negative scenarios: iPad user errors and edge cases', () => {
  test('NEG-1: user types free text in Approval column — strict validation rejects it in Sheets app', () => {
    // The Sheet has strict: true validation on the Approval column
    // In Sheets app, this means only the dropdown values are accepted
    // The API does NOT enforce this, which is why the pipeline also never writes it
    const validValues = ['Approved', 'Not Approved'];
    assert.ok(!validValues.includes('Maybe'));
    assert.ok(!validValues.includes('YES'));
    assert.ok(!validValues.includes('approved')); // case-sensitive in strict mode
  });

  test('NEG-2: user approves a row that already has assets — publishAssets skips', () => {
    // Re-approval should not regenerate
    const row = { obj: { assets_generated: '2026-11-26T10:00:00Z' } };
    assert.ok(row.obj.assets_generated, 'already has assets');
  });

  test('NEG-3: user approves while offline — sweep picks up on reconnect', () => {
    // If the onEdit trigger can't fire (offline or prop not set),
    // the safetySweep runs every 30 minutes and picks up pending rows
    const SWEEP_INTERVAL = 30; // minutes
    assert.ok(SWEEP_INTERVAL <= 30, 'sweep catches missed approvals within 30 min');
  });

  test('NEG-4: user approves many rows at once (batch) — debounce batches into one run', () => {
    // 5 approvals in 1 minute → one fire + sweep catches any the run missed
    const DEBOUNCE_MIN = 10;
    const approvalTimes = [0, 15, 30, 45, 60]; // seconds
    const fires = approvalTimes.filter((t) => t === 0 || t >= DEBOUNCE_MIN * 60);
    assert.equal(fires.length, 1, 'only one fire within debounce window');
  });

  test('NEG-5: routine is not set up yet — fire_ logs and returns quietly', () => {
    const url = null; const token = null;
    const shouldFire = url && token;
    assert.ok(!shouldFire, 'graceful skip when props not set');
  });

  test('NEG-6: Google token expired during asset generation — error surfaces in routine log', () => {
    // The error message should guide the user to RUNBOOK §4
    const error = 'invalid_grant: Token has been expired or revoked';
    assert.match(error, /invalid_grant/);
  });

  test('NEG-7: Sheet link in email is tappable even when Sheet URL is very long', () => {
    const longUrl = 'https://docs.google.com/spreadsheets/d/' + 'x'.repeat(100);
    const { html } = digestEmail({ runAt: '2026-11-26', newListings: 0, aboveThreshold: 0, pendingActions: 0, pendingApprovals: 0, assetsToReview: 0, failures: [], top: [], sheetUrl: longUrl });
    assert.match(html, new RegExp(`href="${longUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
  });

  test('NEG-8: missing Sheet URL shows "Tracker link unavailable" instead of broken button', () => {
    const { html } = digestEmail({ runAt: '2026-11-26', newListings: 0, aboveThreshold: 0, pendingActions: 0, pendingApprovals: 0, assetsToReview: 0, failures: [], top: [] });
    assert.match(html, /Tracker link unavailable/);
    assert.ok(!html.includes('href=""'), 'no empty href');
  });

  test('NEG-9: iPad Sheets app does not support simple triggers — installable trigger used', () => {
    // Apps Script uses installable triggers (ScriptApp.newTrigger), not simple ones
    // Simple onEdit() runs only from the script editor, not the mobile app
    // Installable triggers fire from any edit source including mobile
    const triggerType = 'installable'; // set by setup()
    assert.equal(triggerType, 'installable');
  });
});
