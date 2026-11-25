// One-time (Mac) helper: obtain a Google refresh token for the GitHub secret GOOGLE_REFRESH_TOKEN.
// Usage: GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... npm run oauth
// Uses a loopback redirect on 127.0.0.1 (Desktop-app OAuth client). The token is printed, never written to disk.
import http from 'node:http';
import { google } from 'googleapis';
import { SCOPES } from '../src/google/auth.js';

const PORT = 53682;
const client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, `http://127.0.0.1:${PORT}/callback`);
const url = client.generateAuthUrl({ access_type: 'offline', prompt: 'consent', scope: SCOPES });
console.log(`\nOpen this URL in your browser and approve access:\n\n${url}\n`);
http.createServer(async (req, res) => {
  const code = new URL(req.url, `http://127.0.0.1:${PORT}`).searchParams.get('code');
  if (!code) { res.end('No code'); return; }
  const { tokens } = await client.getToken(code);
  res.end('Done — you can close this tab and return to the terminal.');
  console.log(`\nGOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n\nStore it as a GitHub Actions secret, then clear your terminal scrollback.`);
  process.exit(0);
}).listen(PORT, '127.0.0.1');
