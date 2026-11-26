// R15 (JD keyword coverage), R16 (ATS-safe twin), R8 (one page with a safety buffer). Added 27 Nov 2026.
import '../helpers.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { unzipSync, strFromU8 } from 'fflate';
import { validateAssets, validateKeywords, resumeText, hasTerm, loadJdText, resumeBullets } from '../../src/assets/validate.js';
import { resumeDoc, resumeAtsDoc, toBuffer } from '../../src/assets/docx.js';
import { cutLowestBullet, selectionLogBlocks } from '../../src/assets/publish.js';
import { settings } from '../../src/lib/config.js';

const example = () => JSON.parse(fs.readFileSync(new URL('../../claude/assets.example.json', import.meta.url)));
const read = (rel) => fs.readFileSync(new URL(`../../${rel}`, import.meta.url), 'utf8');
const xmlOf = async (doc) => { const z = unzipSync(new Uint8Array(await toBuffer(doc))); return { z, xml: strFromU8(z['word/document.xml']) }; };

test('TC-409 keywords (R15): the approved example passes, and it passes against its own stored listing', () => {
  const a = example();
  assert.deepEqual(validateKeywords(a), []);
  const jd = JSON.parse(read('data/jd/879f1f8b9bad.json')).full_description;
  assert.deepEqual(validateKeywords(a, jd), [], 'every term comes from the Cloudflare listing');
  assert.deepEqual(validateAssets(a, { jd }), []);
  assert.ok(a.keywords.some((k) => k.status === 'gap') && a.keywords.some((k) => k.status === 'used'), 'matrix has used terms and honest gaps');
});

test('TC-409b keywords: every way the rule can be broken is caught', () => {
  const a = example();
  const jd = JSON.parse(read('data/jd/879f1f8b9bad.json')).full_description;
  const clone = () => structuredClone(a);
  assert.match(validateKeywords({ ...a, keywords: undefined }).join(), /keywords missing/);
  const few = clone(); few.keywords = few.keywords.slice(0, 5);
  assert.match(validateKeywords(few).join(), /min 15/);
  const absent = clone(); absent.keywords.push({ term: 'telemetry', status: 'used', where: 'Skills' });
  assert.match(validateKeywords(absent, jd).join(), /"telemetry" is marked used but its exact wording is not on the resume/);
  const claimed = clone(); claimed.resume.skills[0].text += ' · WAF';
  assert.match(validateKeywords(claimed, jd).join(), /"WAF" is marked gap but appears on the resume/);
  const noReason = clone(); noReason.keywords.find((k) => k.status === 'gap').reason = 'n/a';
  assert.match(validateKeywords(noReason, jd).join(), /is a gap but has no reason/);
  const noWhere = clone(); delete noWhere.keywords.find((k) => k.status === 'used').where;
  assert.match(validateKeywords(noWhere, jd).join(), /has no "where"/);
  const invented = clone(); invented.keywords.push({ term: 'quantum blockchain', status: 'gap', reason: 'Not a term from the listing at all, so it must be rejected' });
  assert.match(validateKeywords(invented, jd).join(), /"quantum blockchain" is not in the listing/);
  const dup = clone(); dup.keywords.push({ ...dup.keywords[0] });
  assert.match(validateKeywords(dup).join(), /listed twice/);
  const badStatus = clone(); badStatus.keywords[0].status = 'maybe';
  assert.match(validateKeywords(badStatus).join(), /status must be used or gap/);
});

test('TC-409c keywords: matching is by whole phrase, case-insensitive, never inside another word', () => {
  assert.ok(hasTerm('lead product management and ai-native work', 'AI-native'));
  assert.ok(hasTerm('a/b testing', 'A/B testing'));
  assert.ok(hasTerm('7+ years of experience', '7+ years'));
  assert.ok(!hasTerm('retained customers', 'retention'));
  assert.ok(!hasTerm('mail', 'ai'), 'AI must not match inside "mail"');
  assert.ok(!hasTerm('prioritisation', 'prioritization'), 'UK and US spellings are different terms for an ATS');
  const text = resumeText(example().resume);
  assert.ok(text.includes('zero-day') === false && text.includes('false-positive'), 'resume text blob holds skills, bullets and roles');
});

test('TC-410 cutting (R8 + R15): highest rank goes first, but never the only carrier of a used keyword', () => {
  const plain = example().resume;
  const top = Math.max(...resumeBullets(plain).map((b) => b.rank));
  assert.equal(cutLowestBullet(plain).rank, top, 'no keywords: highest rank is cut');

  const r = example().resume;
  const worst = resumeBullets(r).find((b) => b.rank === top);
  const word = 'zebra-metric'; // a term that only the lowest-priority bullet carries
  worst.text = `${worst.text.replace(/\*\*/g, '')} ${word}`;
  const cut = cutLowestBullet(r, [{ term: word, status: 'used' }]);
  assert.notEqual(cut.rank, top, 'the sole carrier of a used keyword is protected');
  assert.ok(resumeText(r).includes(word), 'keyword still on the page after the cut');
  assert.equal(cutLowestBullet(structuredClone(r), [{ term: word, status: 'gap' }]).rank, top, 'gap terms do not protect a bullet');
});

test('TC-411 ATS twin (R16): one column, no tables, headers, footers or images; same content as the designed resume', async () => {
  const a = example();
  const { z, xml } = await xmlOf(resumeAtsDoc(a.resume));
  assert.ok(!xml.includes('<w:tbl>') && !xml.includes('<w:tbl '), 'no tables');
  assert.ok(!xml.includes('<w:cols ') || /w:num="1"/.test(xml), 'single column');
  assert.ok(!xml.includes('<w:drawing') && !xml.includes('<w:pict') && !xml.includes('<w:txbxContent'), 'no images, shapes or text boxes');
  assert.ok(!xml.includes('<w:shd '), 'no shading');
  assert.ok(!Object.keys(z).some((n) => /word\/(header|footer|media)/.test(n)), 'no header, footer or media parts');
  assert.ok(!xml.includes('<w:headerReference') && !xml.includes('<w:footerReference'));
  for (const h of ['Summary', 'Skills', 'Experience', 'Education']) assert.match(xml, new RegExp(`<w:t[^>]*>${h}</w:t>`), `heading ${h}`);
  assert.ok((xml.match(/<w:pStyle w:val="Heading2"/g) || []).length >= 5, 'real heading styles');
  assert.ok((xml.match(/<w:numPr>/g) || []).length >= resumeBullets(a.resume).length, 'real list bullets');
  assert.ok(xml.includes(a.resume.contact.replace(/\s*·\s*/g, '  ·  ').slice(0, 20)) || xml.includes('imansadhu'), 'contact details are in the body');
  const flat = strFromU8(z['word/document.xml']).replace(/<\/w:p>/g, ' ').replace(/<[^>]+>/g, '').replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ').toLowerCase(); // runs join as Word joins them
  for (const b of [...resumeBullets(a.resume), ...a.resume.prior_role.bullets]) assert.ok(flat.includes(b.text.replace(/\*\*/g, '').toLowerCase().slice(0, 40)), `bullet present: ${b.text.slice(0, 40)}`);
  for (const k of a.keywords.filter((x) => x.status === 'used')) assert.ok(hasTerm(flat, k.term), `used keyword "${k.term}" is in the ATS file`);
  for (const k of a.keywords.filter((x) => x.status === 'gap')) assert.ok(!hasTerm(flat, k.term), `gap keyword "${k.term}" is not in the ATS file`);
  // the designed resume is the opposite: it keeps its layout tables (Part 10.9), so the twin is a real second file
  assert.ok((await xmlOf(resumeDoc(a.resume))).xml.includes('<w:tbl>'));
});

test('TC-412 page fit (R8): padding reserves spare lines in the fit test only; settings carry the buffer and the floor', async () => {
  const a = example();
  const count = (xml) => (xml.match(/<w:p>|<w:p /g) || []).length;
  const base = count((await xmlOf(resumeDoc(a.resume))).xml);
  const padded = count((await xmlOf(resumeDoc(a.resume, { padLines: 3 }))).xml);
  assert.equal(padded - base, 3, 'three spare lines reserved');
  assert.equal(count((await xmlOf(resumeDoc(a.resume, { padLines: 0 }))).xml), base, 'final document carries no padding');
  const s = settings().assets;
  assert.equal(s.page_safety_lines, 3);
  assert.equal(s.resume_bullets_floor, 16);
  assert.ok(s.resume_bullets_floor < s.resume_bullets_min, 'one page can outrank the 20-bullet authoring minimum');
  assert.ok(s.keywords_min >= 15);
  const src = read('src/assets/publish.js');
  assert.match(src, /padLines: pad/, 'the fit loop tests the padded document');
  assert.match(src, /still \$\{pages\} pages with \$\{floor\} bullets left/, 'refuses to publish a two-page resume');
  assert.ok(!/flagged for owner review/.test(src), 'no more silent two-page fallback');
});

test('TC-413 Selection Log carries the keyword coverage matrix with totals', () => {
  const a = example();
  const blocks = selectionLogBlocks(a, []);
  const kw = blocks.find((b) => /Keyword coverage \(R15\)/.test(b.heading));
  assert.ok(kw, 'keyword block present');
  const used = a.keywords.filter((k) => k.status === 'used').length;
  assert.match(kw.heading, new RegExp(`${used} of ${a.keywords.length} listing terms used, ${a.keywords.length - used} gaps`));
  assert.equal(kw.lines.length, a.keywords.length + 1);
  assert.ok(kw.lines.slice(1).every((l) => l.split(' | ').length === 3 && !/undefined/.test(l)), 'term | status | where or reason');
});

test('TC-414 listing text for the cross-check: listing.json beside the bundle, else the stored JD, else none', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsf-'));
  fs.writeFileSync(path.join(dir, 'listing.json'), JSON.stringify({ full_description: 'Needs 7&#43; years &amp; Bet Builder' }));
  assert.equal(loadJdText({ listing_id: 'nope' }, path.join(dir, 'assets.json')), 'Needs 7+ years & Bet Builder');
  assert.match(loadJdText({ listing_id: '879f1f8b9bad' }), /Zero-Day Protection/);
  assert.equal(loadJdText({ listing_id: 'does-not-exist' }), null);
});

test('TC-415 the written rules: master R15, R16, the page buffer, steps 1c and 4d, and the routine prompt', () => {
  const m = read('experience/master.md');
  assert.match(m, /\| R15 \| \*\*JD keyword coverage/);
  assert.match(m, /\| R16 \| \*\*ATS-safe file/);
  assert.match(m, /One page, always/);
  assert.match(m, /page_safety_lines/);
  assert.match(m, /resume_bullets_floor/);
  assert.match(m, /1c\. \*\*Keyword extraction/);
  assert.match(m, /4d\. \*\*Keyword coverage and ATS check/);
  assert.match(m, /never cuts the only bullet that carries a `used` keyword|never cut the only bullet that carries a `used` term/);
  assert.ok(!/Produce a plain single-column, no-table version only when the user asks/.test(m), 'ATS twin is no longer optional');
  // experience/digest.md is generated and git-ignored: check it only where it exists (it is absent in a fresh clone)
  if (fs.existsSync(new URL('../../experience/digest.md', import.meta.url))) { const d = read('experience/digest.md'); assert.match(d, /R15/); assert.match(d, /R16/); }
  const p = read('claude/asset-generation.md');
  for (const needle of ['R1–R16', 'keywords', 'ATS twin', 'listing.json', 'page_safety_lines', 'never the only carrier']) assert.ok(p.includes(needle), `routine prompt mentions ${needle}`);
});
