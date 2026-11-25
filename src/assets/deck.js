// Case-study deck as Google Slides API requests (pure, unit-testable). Consulting storyline:
//   cover → executive summary (exactly 5 lines) → storyline slides with action titles (situation, complication,
//   resolution, proof, plan) → closing slide.
// Simple, consistent branding: white content slides, navy 0B2545 cover/close, one muted accent, Calibri throughout.
// Each content slide carries a section tracker, a full-sentence action title, a body, an optional "So what" panel and a
// source line, so it reads on its own.

const W = 720; const H = 405; // 16:9 page in points
const EMU = 12700;
const NAVY = '0B2545'; const ACCENT = '5B8DB8'; const PANEL = 'EAF0F6'; const INK = '333333'; const GREY = '7A8794'; const RULE = 'C9D3DD';
const FONT = 'Calibri';

const rgb = (hex) => ({ red: parseInt(hex.slice(0, 2), 16) / 255, green: parseInt(hex.slice(2, 4), 16) / 255, blue: parseInt(hex.slice(4, 6), 16) / 255 });
const size = (w, h) => ({ width: { magnitude: w * EMU, unit: 'EMU' }, height: { magnitude: h * EMU, unit: 'EMU' } });
const at = (x, y) => ({ scaleX: 1, scaleY: 1, translateX: x * EMU, translateY: y * EMU, unit: 'EMU' });

/** Strip **bold** markers and return the plain text plus bold ranges (UTF-16 indices, as Slides expects). */
export function parseBold(text) {
  let plain = ''; const ranges = [];
  for (const part of String(text).split(/(\*\*[^*]+\*\*)/).filter(Boolean)) {
    if (part.startsWith('**')) { const t = part.slice(2, -2); ranges.push([plain.length, plain.length + t.length]); plain += t; } else plain += part;
  }
  return { plain, ranges };
}

class Builder {
  constructor() { this.requests = []; this.n = 0; }
  id(p) { this.n += 1; return `jsf_${p}_${String(this.n).padStart(3, '0')}`; }
  slide(bg) {
    const id = this.id('slide');
    this.requests.push({ createSlide: { objectId: id, slideLayoutReference: { predefinedLayout: 'BLANK' } } });
    if (bg) this.requests.push({ updatePageProperties: { objectId: id, pageProperties: { pageBackgroundFill: { solidFill: { color: { rgbColor: rgb(bg) } } } }, fields: 'pageBackgroundFill.solidFill.color' } });
    return id;
  }
  rect(page, x, y, w, h, fill) {
    const id = this.id('rect');
    this.requests.push({ createShape: { objectId: id, shapeType: 'RECTANGLE', elementProperties: { pageObjectId: page, size: size(w, h), transform: at(x, y) } } });
    this.requests.push({ updateShapeProperties: { objectId: id, shapeProperties: { shapeBackgroundFill: { solidFill: { color: { rgbColor: rgb(fill) } } }, outline: { propertyState: 'NOT_RENDERED' } }, fields: 'shapeBackgroundFill.solidFill.color,outline.propertyState' } });
    return id;
  }
  /** Text box. lines: string | string[]; o: {size, color, bold, bullets, spaceBelow, align, fill, valign} */
  text(page, x, y, w, h, lines, o = {}) {
    const arr = [].concat(lines).filter((l) => l !== undefined && l !== null && String(l).length);
    if (!arr.length) return null;
    const id = this.id('text');
    this.requests.push({ createShape: { objectId: id, shapeType: 'TEXT_BOX', elementProperties: { pageObjectId: page, size: size(w, h), transform: at(x, y) } } });
    if (o.fill) this.requests.push({ updateShapeProperties: { objectId: id, shapeProperties: { shapeBackgroundFill: { solidFill: { color: { rgbColor: rgb(o.fill) } } }, contentAlignment: o.valign || 'TOP' }, fields: 'shapeBackgroundFill.solidFill.color,contentAlignment' } });
    else if (o.valign) this.requests.push({ updateShapeProperties: { objectId: id, shapeProperties: { contentAlignment: o.valign }, fields: 'contentAlignment' } });
    const parsed = arr.map(parseBold);
    const text = parsed.map((p) => p.plain).join('\n');
    this.requests.push({ insertText: { objectId: id, text } });
    this.requests.push({ updateTextStyle: { objectId: id, textRange: { type: 'ALL' }, style: { fontFamily: FONT, fontSize: { magnitude: o.size || 12, unit: 'PT' }, bold: !!o.bold, foregroundColor: { opaqueColor: { rgbColor: rgb(o.color || INK) } } }, fields: 'fontFamily,fontSize,bold,foregroundColor' } });
    let offset = 0;
    for (const p of parsed) {
      for (const [s, e] of p.ranges) this.requests.push({ updateTextStyle: { objectId: id, textRange: { type: 'FIXED_RANGE', startIndex: offset + s, endIndex: offset + e }, style: { bold: true, foregroundColor: { opaqueColor: { rgbColor: rgb(o.boldColor || NAVY) } } }, fields: 'bold,foregroundColor' } });
      offset += p.plain.length + 1;
    }
    this.requests.push({ updateParagraphStyle: { objectId: id, textRange: { type: 'ALL' }, style: { spaceBelow: { magnitude: o.spaceBelow ?? 6, unit: 'PT' }, lineSpacing: o.lineSpacing || 110, alignment: o.align || 'START' }, fields: 'spaceBelow,lineSpacing,alignment' } });
    if (o.bullets) this.requests.push({ createParagraphBullets: { objectId: id, textRange: { type: 'ALL' }, bulletPreset: 'BULLET_DISC_CIRCLE_SQUARE' } });
    return id;
  }
}

/**
 * @param deck { cover:{title, subtitle}, slides:[{section, title, lines[], so_what?, source?}], close:{title, lines[]} }
 * @param meta { name, role, company, contact, date }
 */
export function deckRequests(deck, meta) {
  const b = new Builder();
  const total = deck.slides.length + 2;

  // 1 · Cover
  const c = b.slide(NAVY);
  b.rect(c, 48, 118, 56, 4, ACCENT);
  b.text(c, 48, 132, 600, 110, deck.cover.title, { size: 30, bold: true, color: 'FFFFFF', lineSpacing: 100 });
  b.text(c, 48, 246, 600, 50, deck.cover.subtitle, { size: 15, color: 'C9D7E6' });
  b.text(c, 48, 340, 600, 40, [`Prepared by ${meta.name} for the ${meta.role} role, ${meta.company}`, meta.date], { size: 10, color: 'C9D7E6', spaceBelow: 2 });

  // 2…n-1 · Storyline
  deck.slides.forEach((s, i) => {
    const p = b.slide('FFFFFF');
    b.rect(p, 0, 0, W, 5, NAVY);
    b.text(p, 36, 16, 520, 18, String(s.section || (i === 0 ? 'Executive summary' : '')).toUpperCase(), { size: 9, bold: true, color: ACCENT });
    b.text(p, 36, 34, 648, 62, s.title, { size: i === 0 ? 20 : 19, bold: true, color: NAVY, lineSpacing: 100 });
    b.rect(p, 36, 100, 648, 1.2, RULE);
    const hasPanel = !!s.so_what;
    if (i === 0) {
      // executive summary: numbered storyline, one line per step
      s.lines.forEach((line, k) => {
        const y = 114 + k * 46;
        b.text(p, 36, y, 30, 34, String(k + 1), { size: 18, bold: true, color: ACCENT });
        b.text(p, 70, y + 2, hasPanel ? 400 : 614, 40, line, { size: 12.5, color: INK });
      });
    } else {
      b.text(p, 36, 118, hasPanel ? 430 : 648, 234, s.lines, { size: 14, color: INK, bullets: true, spaceBelow: 12 });
    }
    if (hasPanel) {
      b.rect(p, 484, 114, 200, 238, PANEL);
      b.rect(p, 484, 114, 4, 238, NAVY);
      b.text(p, 498, 124, 180, 20, 'SO WHAT', { size: 9, bold: true, color: ACCENT });
      b.text(p, 498, 146, 180, 200, s.so_what, { size: 13, bold: false, color: NAVY, lineSpacing: 115 });
    }
    b.rect(p, 36, 362, 648, 0.8, RULE);
    b.text(p, 36, 366, 560, 30, s.source ? `Source: ${s.source}` : '', { size: 8, color: GREY });
    b.text(p, 600, 366, 84, 20, `${meta.name} · ${i + 2}/${total}`, { size: 8, color: GREY, align: 'END' });
  });

  // n · Close
  const z = b.slide(NAVY);
  b.rect(z, 48, 108, 56, 4, ACCENT);
  b.text(z, 48, 122, 620, 60, deck.close.title, { size: 26, bold: true, color: 'FFFFFF' });
  // no bullet glyphs on the dark slide (Slides draws the first glyph in the default colour); spacing separates the lines
  b.text(z, 48, 188, 620, 130, deck.close.lines, { size: 14, color: 'E3EAF2', spaceBelow: 12, boldColor: 'FFFFFF' });
  b.text(z, 48, 340, 620, 40, [meta.name, meta.contact], { size: 10, color: 'C9D7E6', spaceBelow: 2 });

  return b.requests;
}
