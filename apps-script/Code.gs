/**
 * Job Search Factory — approval trigger (FR-4.1 / FR-5.3). Bound to the tracker Sheet.
 *
 * Setup (once, from Extensions → Apps Script in the tracker Sheet):
 *   1. Paste this file. Project Settings → Script Properties:
 *        CLAUDE_FIRE_URL   = https://api.anthropic.com/v1/claude_code/routines/trig_xxx/fire
 *        CLAUDE_FIRE_TOKEN = sk-ant-oat01-...   (per-routine token; regenerate in claude.ai/code/routines)
 *   2. Run `setup` once and accept the permissions. It installs:
 *        - an installable onEdit trigger → fires the asset routine immediately on "Approved"
 *        - a 30-minute time trigger → safety sweep (fires only if approved rows still lack assets)
 *
 * Quota note: every fire starts a Claude session (Pro daily allowance). Fires are debounced: one routine run
 * processes ALL approved rows without assets, so rapid approvals within DEBOUNCE_MIN share one run.
 */
var APPROVAL_HEADER = 'Approval';
var ASSETS_HEADER = 'Assets generated';
var DEBOUNCE_MIN = 10;   // min minutes between fires from onEdit
var SWEEP_GRACE_MIN = 25; // sweep won't re-fire while a recent run may still be working

function setup() {
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
  var ss = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('onApprovalEdit').forSpreadsheet(ss).onEdit().create();
  ScriptApp.newTrigger('safetySweep').timeBased().everyMinutes(30).create();
  Logger.log('Triggers installed: onApprovalEdit (onEdit), safetySweep (every 30 min)');
}

function headers_(sheet) { return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]; }

function onApprovalEdit(e) {
  if (!e || !e.range) return;
  var sheet = e.range.getSheet();
  var col = headers_(sheet).indexOf(APPROVAL_HEADER) + 1;
  if (e.range.getRow() < 2 || col < 1 || e.range.getColumn() > col || e.range.getLastColumn() < col) return;
  var values = sheet.getRange(e.range.getRow(), col, e.range.getNumRows(), 1).getValues();
  var approved = values.some(function (r) { return r[0] === 'Approved'; });
  if (!approved) return;
  var props = PropertiesService.getScriptProperties();
  var last = Number(props.getProperty('LAST_FIRE_MS') || 0);
  if (Date.now() - last < DEBOUNCE_MIN * 60000) { Logger.log('Debounced: a run started ' + Math.round((Date.now() - last) / 60000) + ' min ago will be followed by the sweep'); return; }
  fire_('approval at row ' + e.range.getRow());
}

function pendingCount_() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Tracker');
  var h = headers_(sheet);
  var a = h.indexOf(APPROVAL_HEADER), g = h.indexOf(ASSETS_HEADER);
  if (sheet.getLastRow() < 2) return 0;
  var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, h.length).getValues();
  return rows.filter(function (r) { return r[a] === 'Approved' && !r[g]; }).length;
}

function safetySweep() {
  var n = pendingCount_();
  if (!n) return;
  var last = Number(PropertiesService.getScriptProperties().getProperty('LAST_FIRE_MS') || 0);
  if (Date.now() - last < SWEEP_GRACE_MIN * 60000) return;
  fire_('safety sweep: ' + n + ' approved row(s) without assets');
}

function fire_(reason) {
  var props = PropertiesService.getScriptProperties();
  var url = props.getProperty('CLAUDE_FIRE_URL'), token = props.getProperty('CLAUDE_FIRE_TOKEN');
  if (!url || !token) throw new Error('Set CLAUDE_FIRE_URL and CLAUDE_FIRE_TOKEN in Script Properties');
  props.setProperty('LAST_FIRE_MS', String(Date.now())); // set before the call: no idempotency on the API, avoid double fires
  var res = UrlFetchApp.fetch(url, {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + token, 'anthropic-version': '2026-10-21' },
    payload: JSON.stringify({ text: 'Trigger: ' + reason + ' at ' + new Date().toISOString() })
  });
  Logger.log('Fire (' + reason + '): HTTP ' + res.getResponseCode() + ' ' + res.getContentText().slice(0, 300));
  if (res.getResponseCode() !== 200) props.deleteProperty('LAST_FIRE_MS'); // let the sweep retry
}

/** Manual test from the Apps Script editor. */
function testFire() { fire_('manual test'); }
