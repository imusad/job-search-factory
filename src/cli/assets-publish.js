// npm run assets:publish -- out/<id>/assets.json  → validates, builds Drive folder + 5 assets, writes Sheet.
// The owner gets ONE email per run: it is held until no approved listing is left pending, then lists every bundle
// published in this session (out/*/published.json). `--no-email` never sends.
import fs from 'node:fs';
import path from 'node:path';
import { readJson, p } from '../lib/config.js';
import { publishAssets } from '../assets/publish.js';
import { ensureSheet, readRows } from '../google/sheet.js';
import { sendEmail } from '../google/gmail.js';
import { batchConfirmationEmail } from '../email/templates.js';

const file = path.isAbsolute(process.argv[2]) ? process.argv[2] : p(process.argv[2]);
const a = readJson(file);
const r = await publishAssets(a, { email: false });
console.log(JSON.stringify(r, null, 2));

if (r.skipped) {
  console.log(`NOTE: ${a.listing_id} was already published, so nothing changed. Do not clear the Sheet cell to force a republish; the owner edits the Drive copy by hand.`);
} else {
  fs.writeFileSync(path.join(path.dirname(file), 'published.json'), JSON.stringify({ company: a.company, title: a.title, folder: r.folder, pages: r.resume_pages, ats_pages: r.ats_pages }, null, 2));
  if (r.resume_pages > 1 || r.ats_pages > 1) console.log('DONE for this listing: it is published over one page and flagged for the owner to trim by hand. Do not edit assets.json and republish it.');
}

if (!process.argv.includes('--no-email')) {
  const pending = (await readRows(await ensureSheet())).filter((x) => x.obj.approval === 'Approved' && !x.obj.assets_generated).length;
  if (pending) {
    console.log(`Email held: ${pending} approved listing(s) still pending. One summary email goes out after the last one is published.`);
  } else {
    const outDir = path.dirname(path.dirname(file));
    const files = fs.readdirSync(outDir).map((d) => path.join(outDir, d, 'published.json')).filter((f) => fs.existsSync(f));
    const unsent = files.map((f) => ({ f, item: readJson(f) })).filter((x) => !x.item.emailed);
    if (unsent.length) {
      await sendEmail(batchConfirmationEmail(unsent.map((x) => x.item)));
      for (const x of unsent) fs.writeFileSync(x.f, JSON.stringify({ ...x.item, emailed: true }, null, 2));
      console.log(`Summary email sent for ${unsent.length} listing(s).`);
    }
  }
}
