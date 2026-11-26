// Layout per master file Part 10.9, matched to Iman's finalised resume ("Sample Resume/Iman Sadhu - Resume.docx"):
// A4, 0.3in margins, Calibri, body 10pt (nothing <9pt), full-width navy section bars (paragraph shading), upper-case navy
// name, EAF0F6 label fill, C9D3DD borders, two-column story table (1417 / 9625 twips), real Word bullets with a hanging
// indent, "Title | Company | Years:" lead-ins for earlier roles. Generated lines (R14 G1/G2) are highlighted yellow in the
// review copy only; the clean copy (used for the PDF) has no highlights.
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, ShadingType, AlignmentType, BorderStyle, TableLayoutType, PageOrientation, LevelFormat } from 'docx';

const NAVY = '0B2545'; const HEADLINE = '1F4E79'; const LABEL_FILL = 'EAF0F6'; const BORDER = 'C9D3DD'; const MUTED = '333333';
const A4 = { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT };
const MARGIN = 432; // 0.3in
const FULL = 11042; const LEFT = 1417; const RIGHT = 9625;
const pt = (n) => Math.round(n * 2);
const font = 'Calibri';
const SEP = '  |  ';

const run = (text, o = {}) => new TextRun({ text, font, size: pt(o.size ?? 10), bold: o.bold, italics: o.italics, color: o.color, characterSpacing: o.spacing, highlight: o.highlight });
const border = { style: BorderStyle.SINGLE, size: 4, color: BORDER };
const borders = { top: border, bottom: border, left: border, right: border };
const margins = { left: 45, right: 45, top: 8, bottom: 8 };

/** Rich text: **bold** anchors → bold runs (one anchor per bullet, R9). */
function rich(text, o = {}) {
  return String(text).split(/(\*\*[^*]+\*\*)/).filter(Boolean)
    .map((part) => (part.startsWith('**') ? run(part.slice(2, -2), { ...o, bold: true }) : run(part, o)));
}

const sectionBar = (title) => new Paragraph({
  shading: { type: ShadingType.CLEAR, fill: NAVY, color: 'auto' }, spacing: { before: 100, after: 40 },
  children: [run(title.toUpperCase(), { bold: true, size: 9, color: 'FFFFFF', spacing: 30 })],
});

const isGen = (b) => b && typeof b === 'object' && (b.type === 'G1' || b.type === 'G2' || b.flag === 'GEN');
const bulletPara = (b, review) => new Paragraph({
  numbering: { reference: 'jsf-bullet', level: 0 },
  children: rich(typeof b === 'string' ? b : b.text, review && isGen(b) ? { highlight: 'yellow' } : {}),
});

function labelledRows(rows, review) {
  return new Table({
    width: { size: FULL, type: WidthType.DXA }, layout: TableLayoutType.FIXED, columnWidths: [LEFT, RIGHT],
    rows: rows.map((r) => new TableRow({ children: [
      new TableCell({ width: { size: LEFT, type: WidthType.DXA }, borders, margins, shading: { type: ShadingType.CLEAR, fill: LABEL_FILL, color: 'auto' }, children: [new Paragraph({ spacing: { before: 20, after: 20 }, children: [run(r.label, { bold: true, color: NAVY })] })] }),
      new TableCell({ width: { size: RIGHT, type: WidthType.DXA }, borders, margins, children: r.bullets ? r.bullets.map((b) => bulletPara(b, review)) : [new Paragraph({ spacing: { before: 20, after: 20 }, children: rich(r.text) })] }),
    ] })),
  });
}

function kpiStrip(kpis) {
  const w = Math.floor(FULL / kpis.length);
  return new Table({
    width: { size: FULL, type: WidthType.DXA }, layout: TableLayoutType.FIXED, columnWidths: kpis.map(() => w),
    rows: [new TableRow({ children: kpis.map((k) => new TableCell({ width: { size: w, type: WidthType.DXA }, borders, margins, children: [
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 20 }, children: [run(k.figure, { bold: true, size: 11.5, color: NAVY })] }),
      // each caption line is its own paragraph (10.9 text integrity: never a line break inside a run)
      ...String(k.caption).split('\n').map((line) => new Paragraph({ alignment: AlignmentType.CENTER, children: [run(line, { size: 9, color: MUTED })] })),
    ] })) })],
  });
}

const numbering = { config: [{ reference: 'jsf-bullet', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 145, hanging: 145 } } } }] }] };
const page = (children) => new Document({
  creator: 'Job Search Factory', numbering,
  styles: { default: { document: { run: { font, size: pt(10) } } } },
  sections: [{ properties: { page: { size: A4, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } }, children }],
});

function header(h) {
  return [
    new Paragraph({ children: [run(String(h.name).toUpperCase(), { bold: true, size: 15, color: NAVY }), run('     '), run(String(h.headline).replace(/\s*·\s*/g, '  ·  '), { bold: true, size: 10.5, color: HEADLINE })] }),
    new Paragraph({ spacing: { after: 20 }, children: [run(String(h.contact).replace(/\s*·\s*/g, '  ·  '), { size: 9, color: MUTED })] }),
  ];
}

const roleLine = (r) => new Paragraph({ spacing: { before: 40, after: 0 }, children: [run([r.title, r.company, r.dates].join(SEP), { bold: true, color: NAVY })] });

/** Earlier-experience line: {lead: "Title | Company | Years", text} (legacy "lead:: text" strings still accepted). */
function earlierLine(e) {
  let lead; let text;
  if (typeof e === 'string') [lead, text] = e.includes('::') ? e.split('::').map((s) => s.trim()) : [null, e];
  else ({ lead, text } = e);
  const kids = lead ? [run(`${lead.split(/\s*\|\s*/).join(SEP)}:  `, { bold: true, color: NAVY })] : [];
  return new Paragraph({ spacing: { before: 20 }, children: [...kids, ...rich(text)] });
}

/** @param padLines fit test only: reserve this many blank lines (page_safety_lines).
 * @param review true → yellow highlight on generated (G1/G2) lines; false → clean copy for the PDF. */
export function resumeDoc(r, { review = false, padLines = 0 } = {}) {
  const children = [
    ...header(r),
    sectionBar('Summary'), new Paragraph({ spacing: { before: 0, after: 0 }, children: rich(r.summary) }),
    sectionBar('Impact at a glance'), kpiStrip(r.kpis),
    sectionBar('Skills'), labelledRows(r.skills, review),
    sectionBar('Experience'),
    roleLine(r.role_line),
    ...(r.role_line.context ? [new Paragraph({ children: [run(r.role_line.context, { italics: true, size: 9, color: MUTED })] })] : []),
    labelledRows(r.story_rows, review),
  ];
  if (r.prior_role) {
    children.push(roleLine(r.prior_role));
    children.push(labelledRows([{ label: r.prior_role.label || 'Built and scaled', bullets: r.prior_role.bullets }], review));
  }
  children.push(sectionBar('Earlier experience and education'));
  for (const e of r.earlier || []) children.push(earlierLine(e));
  if (r.education) children.push(new Paragraph({ spacing: { before: 20 }, children: [run('Education:  ', { bold: true, color: NAVY }), run(r.education)] }));
  // Fit test only (R8): blank 10 pt lines that reserve a safety margin, so the page still holds in Word, Pages and Google Docs.
  for (let i = 0; i < padLines; i++) children.push(new Paragraph({ spacing: { before: 0, after: 0 }, children: [run('\u00A0')] }));
  return page(children);
}

/**
 * ATS file (R16, added 26 Nov 2026): the same content as the designed resume, built for applicant-tracking parsers.
 * One column, no tables, text boxes, shading, images, headers or footers; contact line in the body; real headings
 * (Summary, Skills, Experience, Education) and real list bullets. Same bullets as the designed resume, so no keyword
 * appears here that is absent from it.
 */
export function resumeAtsDoc(r) {
  const H = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 140, after: 40 }, children: [run(t, { bold: true, size: 11, color: '000000' })] });
  const line = (kids, o = {}) => new Paragraph({ spacing: { before: o.before ?? 20, after: 0 }, children: kids });
  const bullet = (b) => new Paragraph({ numbering: { reference: 'jsf-bullet', level: 0 }, children: rich(typeof b === 'string' ? b : b.text) });
  const role = (x) => line([run([x.title, x.company, x.dates].join(SEP), { bold: true })], { before: 80 });
  const children = [
    new Paragraph({ children: [run(String(r.name).toUpperCase(), { bold: true, size: 15 })] }),
    line([run(r.headline, { bold: true })]),
    line([run(r.contact, { size: 10 })]),
    H('Summary'), new Paragraph({ children: rich(r.summary) }),
    H('Impact at a glance'),
    ...(r.kpis || []).map((k) => line([run(`${k.figure}: `, { bold: true }), run(String(k.caption).replace(/\s*\n\s*/g, ', '))])),
    H('Skills'), ...(r.skills || []).map((s) => line([run(`${s.label}: `, { bold: true }), run(s.text)])),
    H('Experience'), role(r.role_line),
    ...(r.role_line.context ? [line([run(r.role_line.context, { italics: true })])] : []),
  ];
  for (const row of r.story_rows || []) { children.push(line([run(row.label, { bold: true })], { before: 60 })); children.push(...row.bullets.map(bullet)); }
  if (r.prior_role) {
    children.push(role(r.prior_role));
    if (r.prior_role.label) children.push(line([run(r.prior_role.label, { bold: true })], { before: 40 }));
    children.push(...r.prior_role.bullets.map(bullet));
  }
  children.push(H('Earlier experience'));
  for (const e of r.earlier || []) children.push(line([run(`${(e.lead || '').split(/\s*\|\s*/).join(SEP)}: `, { bold: true }), run(e.text || String(e))]));
  children.push(H('Education'), new Paragraph({ children: [run(r.education || '')] }));
  return page(children);
}

/**
 * Cover letter (R13 as revised 25 Nov 2026): a real letter in prose, not resume bullets.
 * c = { date?, recipient?, greeting, paragraphs: [string], sign_off? }
 */
export function coverLetterDoc(c, h) {
  const date = c.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const body = { size: 10.5 };
  const children = [
    ...header(h),
    new Paragraph({ spacing: { before: 280 }, children: [run(date, body)] }),
    ...(c.recipient ? String(c.recipient).split('\n').map((l, i) => new Paragraph({ spacing: { before: i ? 0 : 200 }, children: [run(l, body)] })) : []),
    new Paragraph({ spacing: { before: 240, after: 160 }, children: [run(c.greeting, body)] }),
    ...c.paragraphs.map((p) => new Paragraph({ spacing: { after: 160, line: 276 }, children: rich(p, body) })),
    new Paragraph({ spacing: { before: 120 }, children: [run(c.sign_off || 'Kind regards,', body)] }),
    new Paragraph({ spacing: { before: 360 }, children: [run(h.name, { ...body, bold: true, color: NAVY })] }),
  ];
  return page(children);
}

/** LinkedIn note: the message itself, then who to send it to and why — no automation, you send it. */
export function linkedInDoc(msg, target, max) {
  return simpleDoc('LinkedIn connection note', [
    { heading: 'Message', lines: [msg] },
    { heading: `${msg.length} / ${max} characters`, lines: ['Paste it into "Add a note" on the connection request. Nothing is sent for you.'] },
    ...(target ? [{ heading: 'Who to send it to', lines: [].concat(target) }] : []),
  ]);
}

/** Simple document: title + [{heading, text|lines}] — used for company info, answer pack, selection log. */
export function simpleDoc(title, blocks) {
  const children = [new Paragraph({ spacing: { after: 120 }, children: [run(title, { bold: true, size: 14, color: NAVY })] })];
  for (const b of blocks) {
    if (b.heading) children.push(new Paragraph({ spacing: { before: 160, after: 60 }, children: [run(b.heading, { bold: true, color: NAVY, size: 11 })] }));
    for (const line of [].concat(b.lines || b.text || [])) children.push(new Paragraph({ spacing: { after: 60 }, children: rich(line, { size: 10.5 }) }));
  }
  return page(children);
}

export const toBuffer = (doc) => Packer.toBuffer(doc);
