// JSF-402..407: Drive folder per application; .docx built locally (docx lib) and converted to native Google Docs on upload.
import { Readable } from 'node:stream';
import { drive, slidesApi } from './auth.js';

const FOLDER = 'application/vnd.google-apps.folder';
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

export const folderName = (company, title, date) => `${company} — ${title} (${date})`;

export async function ensureFolder(name, parentId) {
  const q = `name = '${esc(name)}' and mimeType = '${FOLDER}' and '${parentId}' in parents and trashed = false`;
  const found = await drive().files.list({ q, fields: 'files(id,webViewLink)' });
  if (found.data.files.length) return found.data.files[0];
  const f = await drive().files.create({ requestBody: { name, mimeType: FOLDER, parents: [parentId] }, fields: 'id,webViewLink' });
  return f.data;
}

export async function uploadDocxAsGoogleDoc(buffer, name, parentId) {
  const f = await drive().files.create({
    requestBody: { name, parents: [parentId], mimeType: 'application/vnd.google-apps.document' },
    media: { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', body: Readable.from(buffer) },
    fields: 'id,webViewLink',
  });
  return f.data;
}

export async function exportPdf(fileId) {
  const r = await drive().files.export({ fileId, mimeType: 'application/pdf' }, { responseType: 'arraybuffer' });
  return Buffer.from(r.data);
}

export async function uploadPdf(buffer, name, parentId) {
  const f = await drive().files.create({ requestBody: { name, parents: [parentId] }, media: { mimeType: 'application/pdf', body: Readable.from(buffer) }, fields: 'id,webViewLink' });
  return f.data;
}

export const trash = (fileId) => drive().files.update({ fileId, requestBody: { trashed: true } });

export async function listFolder(folderId) {
  const r = await drive().files.list({ q: `'${folderId}' in parents and trashed = false`, fields: 'files(id,name,mimeType,webViewLink)' });
  return r.data.files;
}

/** Count PDF pages without a PDF library: count /Type /Page objects (not /Pages). */
export function pdfPageCount(buf) {
  const m = buf.toString('latin1').match(/\/Type\s*\/Page(?!s)\b/g);
  return m ? m.length : 0;
}

/** JSF-406: Google Slides deck via Slides API (presentations.create + batchUpdate). */
export async function createDeck(title, slides, parentId) {
  const api = slidesApi();
  const pres = await api.presentations.create({ requestBody: { title } });
  const id = pres.data.presentationId;
  const firstSlide = pres.data.slides[0].objectId;
  const requests = [{ deleteObject: { objectId: firstSlide } }];
  slides.forEach((s, i) => {
    const sid = `s${i}`; const t = `s${i}_t`; const b = `s${i}_b`;
    requests.push({ createSlide: { objectId: sid, insertionIndex: i, slideLayoutReference: { predefinedLayout: 'TITLE_AND_BODY' }, placeholderIdMappings: [{ layoutPlaceholder: { type: 'TITLE' }, objectId: t }, { layoutPlaceholder: { type: 'BODY' }, objectId: b }] } });
    requests.push({ insertText: { objectId: t, text: s.title } });
    requests.push({ insertText: { objectId: b, text: s.lines.join('\n') } });
    requests.push({ updateTextStyle: { objectId: b, style: { fontSize: { magnitude: i === 0 ? 16 : 14, unit: 'PT' } }, fields: 'fontSize' } });
  });
  await api.presentations.batchUpdate({ presentationId: id, requestBody: { requests } });
  await drive().files.update({ fileId: id, addParents: parentId, removeParents: 'root', fields: 'id' });
  return { id, webViewLink: `https://docs.google.com/presentation/d/${id}/edit` };
}
