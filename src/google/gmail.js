// FR-6: send HTML email via Gmail API (gmail.send scope only).
import { gmail } from './auth.js';
import { env } from '../lib/config.js';

const b64url = (s) => Buffer.from(s).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const encodeHeader = (s) => (/^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${Buffer.from(s).toString('base64')}?=`);

export function buildMime({ to, subject, html }) {
  return [`To: ${to}`, `Subject: ${encodeHeader(subject)}`, 'MIME-Version: 1.0', 'Content-Type: text/html; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', Buffer.from(html).toString('base64')].join('\r\n');
}

export async function sendEmail({ subject, html, to = env('OWNER_EMAIL', true) }) {
  const r = await gmail().users.messages.send({ userId: 'me', requestBody: { raw: b64url(buildMime({ to, subject, html })) } });
  return r.data.id;
}
