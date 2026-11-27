// npm run digest:build  → regenerates experience/digest.md from experience/master.md.
// Run this whenever master.md changes. Mechanical extraction only (no LLM), so it is
// free to run and never paraphrases or drops facts. It keeps what a generation pass needs
// by default (rules, profile, roles, the achievement quick-pick index, Parts 6-10) and
// leaves out the bulky parts: full achievement narratives (Part 5, fetched per ACH id via
// get-achievements.js) and the verbatim evidence appendix (Part 12).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const srcPath = path.join(root, 'experience', 'master.md');
const outPath = path.join(root, 'experience', 'digest.md');

const lines = fs.readFileSync(srcPath, 'utf8').split('\n');

const sections = [];
lines.forEach((line, i) => {
  const m = line.match(/^## (\d+)\./);
  if (m) sections.push({ num: Number(m[1]), line: i });
});
sections.push({ num: Infinity, line: lines.length });

function slice(nums) {
  const out = [];
  for (const n of nums) {
    const idx = sections.findIndex((s) => s.num === n);
    if (idx === -1) continue;
    out.push(lines.slice(sections[idx].line, sections[idx + 1].line).join('\n'));
  }
  return out.join('\n');
}

const body = slice([1, 2, 3, 4, 6, 7, 8, 9, 10]);

const header = `# Experience Digest (generated from master.md, do not edit by hand)

This is the lean, default-load reference for asset generation. It has everything needed
to draft a resume, cover letter, LinkedIn note, company sheet and deck EXCEPT the full
achievement narratives (Part 5 of master.md) and the verbatim evidence appendix (Part 12).
Fetch those on demand:

\`\`\`
npm run ach -- ACH-001 ACH-064 ACH-002 ...
\`\`\`

Workflow: scan the quick-pick index (Part 4) against the JD, shortlist roughly 25-35 ACH ids
by Theme and Tags, fetch only those, then draft. Never invent facts (R1). Regenerate this
file with \`npm run digest:build\` whenever master.md changes.

---

`;

fs.writeFileSync(outPath, header + body + '\n');
const bytes = Buffer.byteLength(header + body);
console.log(`Wrote ${outPath} (${bytes} bytes, ~${Math.round(bytes / 4)} tokens)`);
