// Layout per master file Part 10.9: A4, 0.3in margins, Calibri, body 10pt (nothing <9pt), navy 0B2545 bars,
// EAF0F6 label fill, C9D3DD borders, two-column story table (1417 / 9625 twips), bullet glyph + space.
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, AlignmentType, BorderStyle, TableLayoutType, PageOrientation } from 'docx';

const NAVY = '0B2545'; const LABEL_FILL = 'EAF0F6'; const BORDER = 'C9D3DD'; const MUTED = '333333';
const A4 = { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT };
const MARGIN = 432; // 0.3in
const FULL = 11042; const LEFT = 1417; const RIGHT = 9625;
const pt = (n) => n * 2;
const font = 'Calibri';

const run = (text, o = {}) => new TextRun({ text, font, size: pt(o.size ?? 10), bold: o.bold, italics: o.italics, color: o.color, characterSpacing: o.spacing });
const border = { style: BorderStyle.SINGLE, size: 4, color: BORDER };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorders = { top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' } };
const margins = { left: 45, right: 45, top: 8, bottom: 8 };

/** Rich text: **bold** anchors → bold runs (one anchor per bullet, R9). */
function rich(text, size = 10) {
  return String(text).split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((part) => part.startsWith('**') ? run(part.slice(2, -2), { bold: true, size }) : run(part, { size }));
}

const sectionBar = (title) => new Table({
  width: { size: FULL, type: WidthType.DXA }, layout: TableLayoutType.FIXED, columnWidths: [FULL],
  rows: [new TableRow({ children: [new TableCell({ width: { size: FULL, type: WidthType.DXA }, borders: noBorders, margins: { left: 80, right: 45, top: 10, bottom: 10 }, shading: { type: ShadingType.CLEAR, fill: NAVY, color: 'auto' }, children: [new Paragraph({ children: [run(title.toUpperCase(), { bold: true, size: 9, color: 'FFFFFF', spacing: 20 })] })] })] })],
});

const bulletPara = (text) => new Paragraph({ spacing: { after: 0 }, children: [run('• ', { size: 10 }), ...rich(text)] });

function labelledRows(rows) {
  return new Table({
    width: { size: FULL, type: WidthType.DXA }, layout: TableLayoutType.FIXED, columnWidths: [LEFT, RIGHT],
    rows: rows.map((r) => new TableRow({ children: [
      new TableCell({ width: { size: LEFT, type: WidthType.DXA }, borders, margins, shading: { type: ShadingType.CLEAR, fill: LABEL_FILL, color: 'auto' }, children: [new Paragraph({ children: [run(r.label, { bold: true, color: NAVY, size: 9.5 })] })] }),
      new TableCell({ width: { size: RIGHT, type: WidthType.DXA }, borders, margins, children: r.bullets ? r.bullets.map((b) => bulletPara(typeof b === 'string' ? b : b.text)) : [new Paragraph({ children: rich(r.text) })] }),
    ] })),
  });
}

function kpiStrip(kpis) {
  const w = Math.floor(FULL / kpis.length);
  return new Table({
    width: { size: FULL, type: WidthType.DXA }, layout: TableLayoutType.FIXED, columnWidths: kpis.map(() => w),
    rows: [new TableRow({ children: kpis.map((k) => new TableCell({ width: { size: w, type: WidthType.DXA }, borders, margins, children: [
      new Paragraph({ alignment: AlignmentType.CENTER, children: [run(k.figure, { bold: true, size: 11.5, color: NAVY })] }),
      ...String(k.caption).split('\n').map((line) => new Paragraph({ alignment: AlignmentType.CENTER, children: [run(line, { size: 9, color: MUTED })] })),
    ] })) })],
  });
}

const gap = (after = 40) => new Paragraph({ spacing: { after }, children: [] });
const page = (children) => new Document({ creator: 'Job Search Factory', styles: { default: { document: { run: { font, size: pt(10) } } } }, sections: [{ properties: { page: { size: A4, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } }, children }] });

function header(h) {
  return [
    new Paragraph({ children: [run(h.name, { bold: true, size: 15 }), run('   '), run(h.headline, { bold: true, size: 10.5, color: '1F4E79' })] }),
    new Paragraph({ spacing: { after: 60 }, children: [run(h.contact, { size: 9, color: MUTED })] }),
  ];
}

export function resumeDoc(r) {
  const role = r.role_line;
  const children = [
    ...header(r),
    sectionBar('Summary'), new Paragraph({ spacing: { before: 30, after: 40 }, children: rich(r.summary) }),
    sectionBar('Impact at a glance'), kpiStrip(r.kpis), gap(),
    sectionBar('Skills'), labelledRows(r.skills), gap(),
    sectionBar('Experience'),
    new Paragraph({ spacing: { before: 40 }, children: [run(`${role.title} | ${role.company} | ${role.dates}`, { bold: true, color: NAVY })] }),
    ...(role.context ? [new Paragraph({ children: [run(role.context, { italics: true, size: 9, color: MUTED })] })] : []),
    labelledRows(r.story_rows),
  ];
  if (r.prior_role) {
    children.push(new Paragraph({ spacing: { before: 40 }, children: [run(`${r.prior_role.title} | ${r.prior_role.company} | ${r.prior_role.dates}`, { bold: true, color: NAVY })] }));
    children.push(labelledRows([{ label: r.prior_role.label || 'Highlights', bullets: r.prior_role.bullets }]));
  }
  children.push(gap(), sectionBar('Earlier experience and education'));
  for (const line of r.earlier || []) {
    const [lead, ...rest] = String(line).split('::');
    children.push(new Paragraph({ children: rest.length ? [run(lead.trim() + ' ', { bold: true }), ...rich(rest.join('::').trim())] : rich(lead) }));
  }
  if (r.education) children.push(new Paragraph({ children: [run('Education: ', { bold: true }), run(r.education)] }));
  return page(children);
}

export function coverLetterDoc(c, h) {
  const children = [...header(h), new Paragraph({ spacing: { before: 120, after: 120 }, children: rich(c.hook) })];
  for (const s of c.sections || []) {
    children.push(new Paragraph({ spacing: { before: 80 }, children: [run(s.heading, { bold: true, color: NAVY })] }));
    for (const b of s.bullets || []) children.push(bulletPara(b));
    if (s.text) children.push(new Paragraph({ children: rich(s.text) }));
  }
  if (c.gap_paragraph) children.push(new Paragraph({ spacing: { before: 120 }, children: rich(c.gap_paragraph) }));
  if (c.close) children.push(new Paragraph({ spacing: { before: 120 }, children: rich(c.close) }));
  children.push(new Paragraph({ spacing: { before: 120 }, children: [run(h.name, { bold: true })] }));
  return page(children);
}

/** Simple document: title + [{heading, text|lines}] — used for LinkedIn message, company info, answer pack, selection log. */
export function simpleDoc(title, blocks) {
  const children = [new Paragraph({ spacing: { after: 120 }, children: [run(title, { bold: true, size: 14, color: NAVY })] })];
  for (const b of blocks) {
    if (b.heading) children.push(new Paragraph({ spacing: { before: 120, after: 40 }, children: [run(b.heading, { bold: true, color: NAVY, size: 11 })] }));
    for (const line of [].concat(b.lines || b.text || [])) children.push(new Paragraph({ spacing: { after: 40 }, children: rich(line, 10.5) }));
  }
  return page(children);
}

export const toBuffer = (doc) => Packer.toBuffer(doc);
