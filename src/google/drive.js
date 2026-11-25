// JSF-402..407: Drive folder per application; .docx built locally (docx lib) and converted to native Google Docs on upload.
import { Readable } from 'node:stream';
import { drive, slidesApi } from './auth.js';
import { deckRequests } from '../assets/deck.js';

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

/** JSF-406: Google Slides deck via Slides API (presentations.create + batchUpdate). Layout lives in src/assets/deck.js. */
export async function createDeck(title, deck, parentId, meta) {
  const api = slidesApi();
  const pres = await api.presentations.create({ requestBody: { title } });
  const id = pres.data.presentationId;
  const firstSlide = pres.data.slides[0].objectId;
  const requests = [...deckRequests(deck, meta), { deleteObject: { objectId: firstSlide } }];
  await api.presentations.batchUpdate({ presentationId: id, requestBody: { requests } });
  await drive().files.update({ fileId: id, addParents: parentId, removeParents: 'root', fields: 'id' });
  return { id, webViewLink: `https://docs.google.com/presentation/d/${id}/edit` };
}
