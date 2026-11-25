// npm run assets:publish -- out/<id>/assets.json  → validates, builds Drive folder + 5 assets, writes Sheet, emails owner.
import { readJson } from '../lib/config.js';
import { publishAssets } from '../assets/publish.js';
const r = await publishAssets(readJson(process.argv[2]), { email: !process.argv.includes('--no-email') });
console.log(JSON.stringify(r, null, 2));
