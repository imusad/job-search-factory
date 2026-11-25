// npm run assets:validate -- out/<id>/assets.json  → prints every rule violation; exit 1 if any.
import { readJson } from '../lib/config.js';
import { validateAssets } from '../assets/validate.js';
const errors = validateAssets(readJson(process.argv[2]));
console.log(errors.length ? `INVALID:\n- ${errors.join('\n- ')}` : 'VALID');
process.exitCode = errors.length ? 1 : 0;
