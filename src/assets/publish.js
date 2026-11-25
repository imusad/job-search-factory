// FR-4: publish a validated assets bundle → Drive sub-folder with 5 assets (+ resume PDF, selection log, answer pack),
// write folder link + timestamp to the Sheet (idempotency), send confirmation email.
import { validateAssets, resumeBullets } from './validate.js';
import { resumeDoc, coverLetterDoc, linkedInDoc, simpleDoc, toBuffer } from './docx.js';
import { answerPackBlocks } from './answerPack.js';
import { ensureFolder, folderName, uploadDocxAsGoogleDoc, exportPdf, uploadPdf, pdfPageCount, trash, createDeck } from '../google/drive.js';
import { ensureRootFolder, ensureSheet, readRows, updateCells } from '../google/sheet.js';
import { sendEmail } from '../google/gmail.js';
import { confirmationEmail } from '../email/templates.js';
import { settings } from '../lib/config.js';
import { log } from '../lib/log.js';

/** Content is cut before type or margins shrink: drop the lowest-priority bullet (highest rank). */
export function cutLowestBullet(resume) {
  const all = resume.story_rows.flatMap((row, ri) => row.bullets.map((b, bi) => ({ b, ri, bi })));
  const worst = all.reduce((w, x) => ((x.b.rank ?? 0) > (w.b.rank ?? 0) ? x : w), all[0]);
  resume.story_rows[worst.ri].bullets.splice(worst.bi, 1);
  return worst.b;
}

/**
 * Fit to one page using the clean copy (no highlights) — that copy becomes the PDF. The Google Doc left in the folder
 * is the review copy, with generated (R14 G1/G2) lines highlighted yellow for the owner to confirm (Part 1.1 step 3b).
 */
export async function buildOnePageResume(resume, name, folderId) {
  const min = settings().assets.resume_bullets_min;
  const cut = [];
  for (;;) {
    const clean = await uploadDocxAsGoogleDoc(await toBuffer(resumeDoc(resume, { review: false })), `${name} (clean)`, folderId);
    const pdf = await exportPdf(clean.id);
    await trash(clean.id);
    const pages = pdfPageCount(pdf);
    if (pages <= 1 || resumeBullets(resume).length <= min) {
      if (pages > 1) log.warn(`Resume still ${pages} pages at minimum bullet count — flagged for owner review`);
      const doc = await uploadDocxAsGoogleDoc(await toBuffer(resumeDoc(resume, { review: true })), name, folderId);
      return { doc, pdf, pages, cut };
    }
    cut.push(cutLowestBullet(resume));
  }
}

export function selectionLogBlocks(a, cut) {
  return [
    { heading: `Selection Log — ${a.company}, ${a.title}`, lines: ['Columns: Bullet | Type | ACH ID | Requirement matched | Flag'] },
    { heading: 'Bullets used', lines: resumeBullets(a.resume).map((b, i) => `${i + 1}. ${b.text.replace(/\*\*/g, '')} | ${b.type} | ${(b.ach || []).join(', ')} | ${b.requirement || '—'} | ${b.flag || 'USE'}`) },
    ...(cut.length ? [{ heading: 'Cut for one-page fit (lowest priority first)', lines: cut.map((b) => `${b.text.replace(/\*\*/g, '')} | ${(b.ach || []).join(', ')}`) }] : []),
    ...(a.cover_letter?.sources?.length ? [{ heading: 'Cover letter — claim sources', lines: a.cover_letter.sources.map(String) }] : []),
    { heading: 'Open items', lines: (a.open_items || ['None recorded']).map(String) },
  ];
}

export async function publishAssets(a, { email = true } = {}) {
  const errors = validateAssets(a);
  if (errors.length) throw new Error(`Assets failed validation:\n- ${errors.join('\n- ')}`);

  const sheetId = await ensureSheet();
  const rows = await readRows(sheetId);
  const row = rows.find((r) => String(r.obj.id) === String(a.listing_id));
  if (!row) throw new Error(`Listing ${a.listing_id} not in Sheet`);
  if (row.obj.approval !== 'Approved') throw new Error(`Listing ${a.listing_id} is not Approved — refusing to generate`);
  if (row.obj.assets_generated) { log.info(`Listing ${a.listing_id} already has assets (${row.obj.assets_generated}) — skipping`); return { skipped: true }; }

  const root = await ensureRootFolder();
  const apps = await ensureFolder(settings().sheet.applications_folder_name, root);
  const folder = await ensureFolder(folderName(a.company, a.title, row.obj.first_seen_date || new Date().toISOString().slice(0, 10)), apps.id);
  const h = { name: a.resume.name, headline: a.resume.headline, contact: a.resume.contact };

  const resume = await buildOnePageResume(a.resume, `Resume — ${a.company}`, folder.id);
  const pdf = await uploadPdf(resume.pdf, `Resume — ${a.company}.pdf`, folder.id);
  const cover = await uploadDocxAsGoogleDoc(await toBuffer(coverLetterDoc(a.cover_letter, h)), `Cover letter — ${a.company}`, folder.id);
  const li = await uploadDocxAsGoogleDoc(await toBuffer(linkedInDoc(a.linkedin_message, a.linkedin_target, settings().assets.linkedin_max_chars)), `LinkedIn message — ${a.company}`, folder.id);
  const ci = a.company_info;
  const info = await uploadDocxAsGoogleDoc(await toBuffer(simpleDoc(`${a.company} — company information`, [
    { heading: 'Company overview', lines: [ci.overview] }, { heading: 'Product portfolio', lines: [].concat(ci.products) },
    { heading: 'Market position', lines: [ci.market_position] }, { heading: 'Recent developments', lines: [].concat(ci.recent_developments) },
    { heading: "Relevance to Iman's experience", lines: [].concat(ci.relevance) }, { heading: 'Sources', lines: ci.sources },
  ])), `Company info — ${a.company}`, folder.id);
  const deckMeta = { name: a.resume.name, role: a.title, company: a.company, contact: a.resume.contact, date: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) };
  const deck = await createDeck(`Case study — ${a.company}`, a.deck, folder.id, deckMeta);
  const log_ = await uploadDocxAsGoogleDoc(await toBuffer(simpleDoc('Selection Log', selectionLogBlocks(a, resume.cut))), `Selection Log — ${a.company}`, folder.id);
  const listing = { title: a.title, employer: a.company, application_url: row.obj.application_url, hiring_location: row.obj.hiring_location, ats_platform: row.obj.ats_platform };
  const pack = await uploadDocxAsGoogleDoc(await toBuffer(simpleDoc('ATS answer pack', answerPackBlocks(listing))), `Answer pack — ${a.company}`, folder.id);

  const stamp = new Date().toISOString();
  await updateCells(sheetId, row.rowNumber, { assets_generated: stamp, assets_folder: folder.webViewLink }, 'assets');
  const result = { folder: folder.webViewLink, assets: { resume: resume.doc.webViewLink, resume_pdf: pdf.webViewLink, cover_letter: cover.webViewLink, linkedin: li.webViewLink, company_info: info.webViewLink, deck: deck.webViewLink, selection_log: log_.webViewLink, answer_pack: pack.webViewLink }, resume_pages: resume.pages, bullets_cut: resume.cut.length, asset_count: 5 };
  if (email) await sendEmail(confirmationEmail({ company: a.company, title: a.title, count: 5, folder: folder.webViewLink, pages: resume.pages }));
  return result;
}
