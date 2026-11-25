// Run by the Claude asset routine: lists rows with Approval = "Approved" AND empty "Assets generated",
// joined with the stored JD. `--count` prints just the number (used by the sweep).
import fs from 'node:fs';
import { p, readJson } from '../lib/config.js';
import { ensureSheet, readRows } from '../google/sheet.js';

const rows = await readRows(await ensureSheet());
const pending = rows.filter((r) => r.obj.approval === 'Approved' && !r.obj.assets_generated);
if (process.argv.includes('--count')) { console.log(pending.length); process.exit(0); }
const out = pending.map((r) => {
  const jdFile = p('data/jd', `${r.obj.id}.json`);
  const jd = fs.existsSync(jdFile) ? readJson(jdFile) : null;
  return { listing_id: String(r.obj.id), company: r.obj.employer, title: r.obj.title, application_url: r.obj.application_url, hiring_location: r.obj.hiring_location, work_model: r.obj.work_model, product_domain: r.obj.product_domain, first_seen_date: r.obj.first_seen_date, full_description: jd?.full_description || null, jd_missing: !jd };
});
console.log(JSON.stringify(out, null, 2));
