// npm run assets:validate -- out/<id>/assets.json  → prints every rule violation; exit 1 if any.
// The listing text (out/<id>/listing.json or data/jd/<id>.json) lets the R15 keyword check confirm every term came from the listing.
import { readJson } from '../lib/config.js';
import { validateAssets, loadJdText } from '../assets/validate.js';
const file = process.argv[2];
const a = readJson(file);
const jd = loadJdText(a, file);
if (!jd) console.log('note: no listing text found (out/<id>/listing.json or data/jd/<id>.json); keyword terms are not cross-checked against the listing');
const errors = validateAssets(a, { jd });
console.log(errors.length ? `INVALID:\n- ${errors.join('\n- ')}` : 'VALID');
process.exitCode = errors.length ? 1 : 0;
