// OAuth2 with a long-lived refresh token stored in GitHub Actions secrets (FR-7.4). No local token files.
import { google } from 'googleapis';
import { env } from '../lib/config.js';

export const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/presentations',
  'https://www.googleapis.com/auth/gmail.send',
];

let client;
export function googleAuth() {
  if (client) return client;
  client = new google.auth.OAuth2(env('GOOGLE_CLIENT_ID', true), env('GOOGLE_CLIENT_SECRET', true));
  client.setCredentials({ refresh_token: env('GOOGLE_REFRESH_TOKEN', true) });
  return client;
}

export const hasGoogle = () => Boolean(env('GOOGLE_CLIENT_ID') && env('GOOGLE_CLIENT_SECRET') && env('GOOGLE_REFRESH_TOKEN'));
// Test seam: tests inject in-memory fakes; production uses googleapis.
const overrides = {};
export const _setClient = (name, impl) => { overrides[name] = impl; };
export const sheets = () => overrides.sheets || google.sheets({ version: 'v4', auth: googleAuth() });
export const drive = () => overrides.drive || google.drive({ version: 'v3', auth: googleAuth() });
export const slidesApi = () => google.slides({ version: 'v1', auth: googleAuth() });
export const gmail = () => google.gmail({ version: 'v1', auth: googleAuth() });
