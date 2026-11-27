// npm run ach -- ACH-001 ACH-064 ACH-002 ...
// Prints the full Part 5 entry for each requested achievement id, verbatim from master.md.
// Use this instead of loading all of Part 5 (about 28K tokens). A typical resume draws on
// roughly 25 entries, so fetch only those.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const lines = fs.readFileSync(path.join(root, 'experience', 'master.md'), 'utf8').split('\n');

const starts = [];
lines.forEach((line, i) => {
  const m = line.match(/^#### (ACH-\d+)/);
  if (m) starts.push({ id: m[1], line: i });
});
starts.push({ id: null, line: lines.length });

const ids = process.argv.slice(2).map((s) => s.toUpperCase());
if (!ids.length) {
  console.error('Usage: npm run ach -- ACH-001 ACH-064 ...');
  process.exitCode = 1;
} else {
  for (const id of ids) {
    const idx = starts.findIndex((s) => s.id === id);
    if (idx === -1) {
      console.log(`--- ${id}: NOT FOUND ---\n`);
      continue;
    }
    console.log(lines.slice(starts[idx].line, starts[idx + 1].line).join('\n').trimEnd());
    console.log('');
  }
}
