import '../helpers.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { unzipSync, strFromU8 } from 'fflate';
import { validateAssets, validateLinkedIn, validateDeck, validateResume, resumeBullets, r5Violations } from '../../src/assets/validate.js';
import { resumeDoc, toBuffer } from '../../src/assets/docx.js';
import { cutLowestBullet, selectionLogBlocks } from '../../src/assets/publish.js';
import { folderName, pdfPageCount } from '../../src/google/drive.js';
import { answerPackBlocks } from '../../src/assets/answerPack.js';

const example = () => JSON.parse(fs.readFileSync(new URL('../../claude/assets.example.json', import.meta.url)));

// Run the real Apps Script file against fake GAS services.
function gas({ approvalValue = 'Approved', rows = [] } = {}) {
  const props = {}; const fires = []; const triggers = [];
  const header = ['Listing ID', 'Approval', 'Assets generated'];
  const sheet = {
    getLastColumn: () => header.length, getLastRow: () => rows.length + 1,
    getRange: (r, c, nr = 1, nc = 1) => ({ getValues: () => (r === 1 ? [header] : nr === 1 && nc === 1 ? [[approvalValue]] : rows.slice(r - 2, r - 2 + nr)) }),
  };
  const ctx = {
    Date, JSON, Number, String,
    Logger: { log: () => {} },
    SpreadsheetApp: { getActive: () => ({ getSheetByName: () => sheet }) },
    ScriptApp: { getProjectTriggers: () => [], deleteTrigger: () => {}, newTrigger: (fn) => { const t = { fn }; const b = { forSpreadsheet: () => b, onEdit: () => { t.type = 'onEdit'; return b; }, timeBased: () => b, everyMinutes: (m) => { t.type = `every${m}`; return b; }, create: () => triggers.push(t) }; return b; } },
    PropertiesService: { getScriptProperties: () => ({ getProperty: (k) => props[k] ?? null, setProperty: (k, v) => { props[k] = v; }, deleteProperty: (k) => { delete props[k]; } }) },
    UrlFetchApp: { fetch: (url, o) => { fires.push({ url, o, at: Date.now() }); return { getResponseCode: () => 200, getContentText: () => '{"type":"routine_fire"}' }; } },
  };
  props.CLAUDE_FIRE_URL = 'https://api.anthropic.com/v1/claude_code/routines/trig_x/fire'; props.CLAUDE_FIRE_TOKEN = 'sk-ant-oat01-test';
  vm.runInNewContext(fs.readFileSync(new URL('../../apps-script/Code.gs', import.meta.url), 'utf8'), ctx);
  const edit = (row = 2) => ctx.onApprovalEdit({ range: { getSheet: () => sheet, getRow: () => row, getColumn: () => 2, getLastColumn: () => 2, getNumRows: () => 1 } });
  return { ctx, props, fires, triggers, edit, sweep: () => ctx.safetySweep() };
}

test('TC-401 approval trigger: fires on Approved with correct headers; debounced; sweep batches; idempotent', () => {
  const g = gas();
  g.ctx.setup();
  assert.deepEqual(g.triggers.map((t) => `${t.fn}:${t.type}`).sort(), ['onApprovalEdit:onEdit', 'safetySweep:every30']);
  g.edit();
  assert.equal(g.fires.length, 1);
  const o = g.fires[0].o;
  assert.equal(o.method, 'post'); assert.equal(o.headers.Authorization, 'Bearer sk-ant-oat01-test'); assert.equal(o.headers['anthropic-version'], '2026-10-21');
  g.edit(); assert.equal(g.fires.length, 1, 'second approval within debounce window shares the run');
  assert.equal(gas({ approvalValue: 'Not Approved' }).edit() ?? 0, 0);
  // offline batch approvals → sweep fires once
  const s = gas({ rows: [['a', 'Approved', ''], ['b', 'Approved', ''], ['c', 'Approved', '']] });
  s.sweep(); assert.equal(s.fires.length, 1); assert.match(s.fires[0].o.payload, /3 approved/);
  // already has assets → nothing to do
  const done = gas({ rows: [['a', 'Approved', '2026-11-25T10:00:00Z']] });
  done.sweep(); assert.equal(done.fires.length, 0, 'idempotent: assets timestamp prevents regeneration');
});

test('TC-402 resume: bullets 20–24, ACH-traced, R5, six-row spine, keyword echo, docx layout', async () => {
  const a = example();
  assert.deepEqual(validateResume(a.resume), []);
  const n = resumeBullets(a.resume).length; assert.ok(n >= 20 && n <= 24, `bullets=${n}`);
  assert.deepEqual(a.resume.story_rows.map((r) => r.label), ['The value', 'The strategy', 'What I built', 'How I made it trustworthy', 'How I delivered', 'Whom I led']);
  assert.ok(resumeBullets(a.resume).every((b) => /^ACH-\d{3}$/.test(b.ach[0])));
  const jdTerms = ['LLM', 'evaluation framework', 'RAG', 'deterministic testing', 'agentic', 'explainability', 'guardrails'];
  const text = JSON.stringify(a.resume);
  assert.ok(jdTerms.filter((t) => new RegExp(t, 'i').test(text)).length >= 5, 'keyword echo ≥5 JD terms');
  assert.deepEqual(r5Violations(text), []);
  assert.ok(r5Violations('Delivered for Boehringer Ingelheim').length, 'R5 catches real client names');
  const bad = structuredClone(a.resume); bad.story_rows[0].bullets[0].ach = ['ACH-999'];
  assert.match(validateResume(bad).join(), /unknown ACH-999/);
  const xml = strFromU8(unzipSync(new Uint8Array(await toBuffer(resumeDoc(a.resume))))['word/document.xml']);
  assert.match(xml, /w:pgSz w:w="11906" w:h="16838"/, 'A4');
  assert.match(xml, /w:top="432"/, '0.3in margins');
  assert.match(xml, /w:fill="0B2545"/, 'navy section bars');
  assert.match(xml, /Calibri/);
  assert.doesNotMatch(xml, /•[A-Za-z]/, 'bullet glyph followed by a space');
  const sizes = [...xml.matchAll(/<w:sz w:val="(\d+)"/g)].map((m) => Number(m[1]) / 2);
  assert.ok(Math.min(...sizes) >= 9, `no text below 9pt (min ${Math.min(...sizes)})`);
});

test('TC-402 one-page enforcement cuts lowest-priority content first; Selection Log traces cuts', () => {
  const r = example().resume;
  const before = resumeBullets(r).length;
  const cut = cutLowestBullet(r);
  assert.equal(resumeBullets(r).length, before - 1);
  assert.equal(cut.rank, Math.max(...resumeBullets(example().resume).map((b) => b.rank)));
  const log = selectionLogBlocks({ ...example(), resume: r }, [cut]);
  assert.ok(log.some((b) => /Cut for one-page/.test(b.heading)));
  assert.equal(pdfPageCount(Buffer.from('%PDF /Type /Pages /Type /Page /Type /Page')), 2);
});

test('TC-403 cover letter: word count, hook names company, claims traceable', () => {
  const a = example();
  assert.deepEqual(validateAssets(a).filter((e) => /cover/.test(e)), []);
  assert.match(a.cover_letter.hook, /ExampleCo/);
  const short = structuredClone(a); short.cover_letter.sections = []; short.cover_letter.gap_paragraph = '';
  assert.match(validateAssets(short).join(), /cover letter is \d+ words/);
});

test('TC-404 LinkedIn message: ≤300 chars, no asks, no superlatives, specific opening', () => {
  const m = example().linkedin_message;
  assert.ok(m.length <= 300); assert.deepEqual(validateLinkedIn(m), []);
  assert.match(m, /ExampleCo/);
  assert.match(validateLinkedIn('x'.repeat(301)).join(), /301 chars/);
  assert.match(validateLinkedIn('Would you be open to a referral for the role?').join(), /referral/);
  assert.match(validateLinkedIn('Your product is amazing and incredible.').join(), /superlative/);
});

test('TC-405 company info: 5 sections + public sources required', () => {
  const a = example();
  assert.deepEqual(validateAssets(a), []);
  const b = structuredClone(a); delete b.company_info.relevance; b.company_info.sources = [];
  const errs = validateAssets(b).join();
  assert.match(errs, /relevance/); assert.match(errs, /public sources/);
});

test('TC-406 case study deck: 3–4 slides, 5-line hook, product-peer tone', () => {
  const d = example().deck;
  assert.deepEqual(validateDeck(d), []);
  assert.match(validateDeck({ slides: d.slides.slice(0, 2) }).join(), /2 slides/);
  assert.match(validateDeck({ slides: [{ title: 'x', lines: ['a', 'b'] }, ...d.slides.slice(1)] }).join(), /exactly 5/);
  assert.match(validateDeck({ slides: [...d.slides.slice(0, 2), { title: 'Note for the recruiter', lines: [] }] }).join(), /product peer/);
});

test('TC-407 Drive folder naming: "<Company> — <Title> (<date>)"; date prevents collision', () => {
  assert.equal(folderName('Stripe', 'Senior Product Manager', '2026-11-24'), 'Stripe — Senior Product Manager (2026-11-24)');
  assert.notEqual(folderName('Stripe', 'Senior Product Manager', '2026-11-24'), folderName('Stripe', 'Senior Product Manager', '2026-12-02'));
});

test('TC-408 answer pack: standard ATS/Workday fields, one per line', () => {
  const blocks = answerPackBlocks({ title: 'Senior PM', employer: 'Acme', application_url: 'https://x', hiring_location: 'Bangalore, India', ats_platform: 'workday' });
  const lines = blocks.flatMap((b) => b.lines);
  for (const f of ['First name', 'Last name', 'Email', 'Phone', 'LinkedIn', 'Job title', 'Company', 'From', 'To', 'Degree', 'School', 'Work authorisation', 'Requires sponsorship', 'Notice period', 'Salary expectation', 'Relocation']) assert.ok(lines.some((l) => l.startsWith(`${f}:`)), f);
  assert.ok(lines.every((l) => !l.includes('\n')), 'one value per line');
});
