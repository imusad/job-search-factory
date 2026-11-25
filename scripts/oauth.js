// Google sign-in that works entirely from an iPad (no local browser callback).
//
//   1. npm run oauth -- url
//        Prints a sign-in link. Open it in Safari, approve, and the redirect page
//        (https://imusad.github.io/job-search-factory-site/oauth.html) shows a one-time code.
//   2. npm run oauth -- exchange <code>
//        Exchanges the code for a refresh token. If a .env file exists here, the token is written
//        into it as GOOGLE_REFRESH_TOKEN and not printed; otherwise it is printed once so you can
//        paste it into GitHub Secrets and the Claude environment.
//
// Needs GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (from env or .env) for a "Web application"
// OAuth client whose Authorized redirect URI is exactly REDIRECT_URI below.
import fs from 'node:fs';
import { google } from 'googleapis';
import { SCOPES } from '../src/google/auth.js';
import { p } from '../src/lib/config.js';

export const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'https://imusad.github.io/job-search-factory-site/oauth.html';
const ENV_FILE = p('.env');

function fromEnvFile(key) {
  if (!fs.existsSync(ENV_FILE)) return undefined;
  const line = fs.readFileSync(ENV_FILE, 'utf8').split('\n').find((l) => l.startsWith(`${key}=`));
  return line ? line.slice(key.length + 1).trim() : undefined;
}
const need = (key) => {
  const v = process.env[key] || fromEnvFile(key);
  if (!v) { console.error(`${key} is not set (put it in .env or the environment).`); process.exit(2); }
  return v;
};

export function writeEnvValue(file, key, value) {
  const lines = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').split('\n').filter((l) => l !== '') : [];
  const kept = lines.filter((l) => !l.startsWith(`${key}=`));
  kept.push(`${key}=${value}`);
  fs.writeFileSync(file, kept.join('\n') + '\n', { mode: 0o600 });
}

const client = () => new google.auth.OAuth2(need('GOOGLE_CLIENT_ID'), need('GOOGLE_CLIENT_SECRET'), REDIRECT_URI);

const [cmd, arg] = process.argv.slice(2);
if (cmd === 'url') {
  const url = client().generateAuthUrl({ access_type: 'offline', prompt: 'consent', scope: SCOPES });
  console.log(`\nOpen this link in Safari (iPad or Mac) and approve access:\n\n${url}\n`);
  console.log('If Google says "Google hasn\'t verified this app": tap Advanced → Go to Job Search Factory (unsafe) → Continue.');
  console.log('Then copy the code the page shows and run:  npm run oauth -- exchange <code>\n');
} else if (cmd === 'exchange' && arg) {
  const { tokens } = await client().getToken(decodeURIComponent(arg.trim()));
  if (!tokens.refresh_token) {
    console.error('Google returned no refresh token. Remove the app at myaccount.google.com/permissions, then run "url" again (prompt=consent forces a new one).');
    process.exit(1);
  }
  if (fs.existsSync(ENV_FILE)) {
    writeEnvValue(ENV_FILE, 'GOOGLE_REFRESH_TOKEN', tokens.refresh_token);
    console.log('Saved GOOGLE_REFRESH_TOKEN to .env (not shown). Upload it with: gh secret set -f .env');
  } else {
    console.log(`\nGOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
    console.log('Paste this into GitHub → Settings → Secrets → Actions → GOOGLE_REFRESH_TOKEN, and into the Claude environment variables. Then clear this output.');
  }
} else {
  console.log('Usage:\n  npm run oauth -- url\n  npm run oauth -- exchange <code>');
  process.exit(2);
}
