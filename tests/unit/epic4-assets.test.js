import '../helpers.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { unzipSync, strFromU8 } from 'fflate';
import { validateAssets, validateLinkedIn, validateDeck, validateResume, validateCoverLetter, resumeBullets, r5Violations } from '../../src/assets/validate.js';
import { deckRequests, parseBold } from '../../src/assets/deck.js';
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

test('TC-402 resume: bullets 20–24, ACH-traced, R5, story spine, keyword echo, docx layout', async () => {
  const a = example();
  assert.deepEqual(validateResume(a.resume), []);
  const n = resumeBullets(a.resume).length; assert.ok(n >= 20 && n <= 24, `bullets=${n}`);
  const labels = a.resume.story_rows.map((r) => r.label);
  assert.ok(labels.length >= 5 && new Set(labels).size === labels.length, 'five or more distinct story rows');
  assert.match(labels[0], /value/i, 'story opens with the value row (R11)');
  // story-writing standard: one-line bullets, one bold anchor, no task labels, no verb opening more than twice
  const tooLong = structuredClone(a.resume); tooLong.story_rows[0].bullets[0].text += ' and then a great deal more words so that this bullet wraps onto a second line';
  assert.match(validateResume(tooLong).join(), /one line/);
  const twoBold = structuredClone(a.resume); twoBold.story_rows[0].bullets[0].text = 'Earned **USD 4M+** from **three** products.';
  assert.match(validateResume(twoBold).join(), /more than one bold anchor/);
  const repeats = structuredClone(a.resume); repeats.story_rows[1].bullets.slice(0, 3).forEach((b) => { b.text = `Designed ${b.text}`; });
  assert.match(validateResume(repeats).join(), /"designed" opens/);
  const badEarlier = structuredClone(a.resume); badEarlier.earlier[0] = { lead: 'EY, India', text: 'x' };
  assert.match(validateResume(badEarlier).join(), /Title \| Company \| Years/);
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
  assert.match(xml, /<w:pPr><w:shd [^>]*w:fill="0B2545"/, 'full-width navy section bars (paragraph shading, as in the sample)');
  assert.match(xml, /Calibri/);
  assert.match(xml, /<w:numPr>/, 'real Word bullets (10.9 preferred)');
  assert.doesNotMatch(xml, /•[A-Za-z]/, 'bullet glyph followed by a space');
  assert.match(xml, />IMAN SADHU</, 'upper-case name, as in the sample');
  assert.match(xml, />Manager {2}\| {2}EY, India {2}\| {2}2019 to 2020: {2}</, 'earlier roles: "Title | Company | Years:" lead-in');
  const sizes = [...xml.matchAll(/<w:sz w:val="(\d+)"/g)].map((m) => Number(m[1]) / 2);
  assert.ok(Math.min(...sizes) >= 9, `no text below 9pt (min ${Math.min(...sizes)})`);
  // generated lines: yellow in the review copy only
  const gen = structuredClone(a.resume); Object.assign(gen.story_rows[2].bullets[0], { type: 'G1', flag: 'GEN' });
  const reviewXml = strFromU8(unzipSync(new Uint8Array(await toBuffer(resumeDoc(gen, { review: true }))))['word/document.xml']);
  const cleanXml = strFromU8(unzipSync(new Uint8Array(await toBuffer(resumeDoc(gen, { review: false }))))['word/document.xml']);
  assert.match(reviewXml, /w:highlight w:val="yellow"/);
  assert.doesNotMatch(cleanXml, /w:highlight/);
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

test('TC-403 cover letter: a prose letter (not resume points), word count, opens on the company, claims traceable', () => {
  const a = example(); const c = a.cover_letter;
  assert.deepEqual(validateCoverLetter(c, a.resume), []);
  assert.ok(c.greeting && c.paragraphs.length >= 4, 'greeting + prose paragraphs');
  assert.ok(c.paragraphs[0].includes(a.company), 'opening paragraph is about the company');
  assert.ok(c.sources.length, 'ACH sources recorded per paragraph');
  const short = structuredClone(c); short.paragraphs = short.paragraphs.slice(0, 2);
  assert.match(validateCoverLetter(short, a.resume).join(), /cover letter is \d+ words/);
  const listy = structuredClone(c); listy.paragraphs[1] = '• Built an evaluation framework.\n• Scoped deterministic testing.';
  assert.match(validateCoverLetter(listy, a.resume).join(), /contains a list/);
  const copied = structuredClone(c); copied.paragraphs[3] += ` ${resumeBullets(a.resume)[0].text.replace(/\*\*/g, '')} It mattered.`;
  assert.match(validateCoverLetter(copied, a.resume).join(), /repeats a resume bullet/);
  const cliche = structuredClone(c); cliche.paragraphs[0] = `I am writing to express my interest. ${cliche.paragraphs[0]}`;
  assert.match(validateCoverLetter(cliche, a.resume).join(), /cliché/);
});

test('TC-404 LinkedIn message: ≤300 chars, no asks, no flattery, no stock phrases, specific to the company', () => {
  const a = example(); const m = a.linkedin_message; const ctx = { company: a.company, products: a.company_info.products };
  assert.ok(m.length <= 300); assert.deepEqual(validateLinkedIn(m, ctx), []);
  assert.ok(m.includes(a.company));
  assert.ok(a.linkedin_target.length >= 2, 'says who to send it to');
  assert.match(validateLinkedIn('x'.repeat(301)).join(), /301 chars/);
  assert.match(validateLinkedIn('Would you be open to a referral for the role?').join(), /referral/);
  assert.match(validateLinkedIn('Your product is amazing and incredible.').join(), /superlative/);
  // the note the owner rejected on 25 Nov 2026
  const old = "Saw ExampleCo's recent work on evaluation tooling for enterprise AI agents. I run evaluation and deterministic testing for two production LLM products in regulated pharma marketing, so the problem space is close to mine. Would be glad to connect.";
  assert.match(validateLinkedIn(old, { company: 'ExampleCo' }).join(), /stock phrase/);
  assert.match(validateLinkedIn('Your team shipped interesting rules recently and I work on testing too.', ctx).join(), /concrete detail/);
  assert.match(validateLinkedIn('Shipping 60 rules in a month is a lot; I run 60 tests on LLM agents.', ctx).join(), /reference the company/);
});

test('TC-405 company info: 5 sections + public sources required', () => {
  const a = example();
  assert.deepEqual(validateAssets(a), []);
  const b = structuredClone(a); delete b.company_info.relevance; b.company_info.sources = [];
  const errs = validateAssets(b).join();
  assert.match(errs, /relevance/); assert.match(errs, /public sources/);
});

test('TC-406 case study deck: cover + storyline (5-line exec summary, action titles) + close, product-peer tone, styled', () => {
  const d = example().deck;
  assert.deepEqual(validateDeck(d), []);
  assert.match(validateDeck({ ...d, slides: d.slides.slice(0, 2) }).join(), /2 slides/);
  assert.match(validateDeck({ ...d, slides: [{ ...d.slides[0], lines: ['a', 'b'] }, ...d.slides.slice(1)] }).join(), /exactly 5/);
  assert.match(validateDeck({ ...d, slides: [...d.slides.slice(0, 4), { section: 'Note', title: 'A short note for the recruiter on this role', lines: ['a', 'b'] }] }).join(), /product peer/);
  assert.match(validateDeck({ ...d, slides: [d.slides[0], { ...d.slides[1], title: 'Situation' }, ...d.slides.slice(2)] }).join(), /action title/);
  assert.match(validateDeck({ ...d, cover: undefined, close: undefined }).join(), /cover[\s\S]*closing slide/);
  // rendering: cover + every storyline slide + close; valid unique object IDs; brand colours and font applied
  const reqs = deckRequests(d, { name: 'Iman Sadhu', role: 'Senior PM', company: 'Cloudflare', contact: 'x', date: 'November 2026' });
  assert.equal(reqs.filter((r) => r.createSlide).length, d.slides.length + 2);
  const ids = reqs.flatMap((r) => Object.values(r).map((v) => v.objectId).filter((id) => id && (r.createSlide || r.createShape)));
  assert.equal(new Set(ids).size, ids.length, 'object IDs unique');
  assert.ok(ids.every((id) => id.length >= 5 && id.length <= 50), 'Slides object IDs 5–50 chars');
  assert.ok(reqs.some((r) => r.updatePageProperties), 'navy cover and close backgrounds');
  assert.ok(reqs.filter((r) => r.updateTextStyle?.style?.fontFamily).every((r) => r.updateTextStyle.style.fontFamily === 'Calibri'));
  assert.ok(reqs.some((r) => r.insertText?.text === 'SO WHAT'), '"So what" panel');
  assert.ok(reqs.every((r) => !r.insertText || !r.insertText.text.includes('**')), 'bold markers converted to styling');
  assert.deepEqual(parseBold('a **b** c'), { plain: 'a b c', ranges: [[2, 3]] });
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
