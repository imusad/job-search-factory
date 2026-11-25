// §4.1 24-column schema: Identity 6 · Classification 4 · Scoring 4 · Company 4 · Owner control 1 · Workflow 5.
// `writer` says who may write a column: 'discovery' (append + update), 'append' (first write only),
// 'semantic', 'assets', or 'owner' (never machine-written).
export const COLUMNS = [
  { key: 'id', header: 'Listing ID', group: 'Identity', writer: 'append', width: 110 },
  { key: 'title', header: 'Job title', group: 'Identity', writer: 'append', width: 260 },
  { key: 'employer', header: 'Employer', group: 'Identity', writer: 'append', width: 150 },
  { key: 'hiring_location', header: 'Hiring locations', group: 'Identity', writer: 'discovery', width: 200 },
  { key: 'application_url', header: 'Application URL', group: 'Identity', writer: 'discovery', width: 200 },
  { key: 'source_origin', header: 'Source', group: 'Identity', writer: 'discovery', width: 110 },
  { key: 'work_model', header: 'Work model', group: 'Classification', writer: 'discovery', width: 150 },
  { key: 'work_model_confidence', header: 'Work-model confidence', group: 'Classification', writer: 'discovery', width: 100 },
  { key: 'ats_platform', header: 'ATS platform', group: 'Classification', writer: 'discovery', width: 110 },
  { key: 'product_domain', header: 'Product domain', group: 'Classification', writer: 'discovery', width: 140 },
  { key: 'phase1', header: 'Deterministic score (of 0.55)', group: 'Scoring', writer: 'discovery', width: 110, score: true },
  { key: 'phase2', header: 'Semantic score (of 0.45)', group: 'Scoring', writer: 'semantic', width: 110, score: true },
  { key: 'total_score', header: 'Total score', group: 'Scoring', writer: 'discovery+semantic', width: 90, score: true },
  { key: 'score_evidence', header: 'Score evidence', group: 'Scoring', writer: 'discovery+semantic', width: 320 },
  { key: 'visa_sponsor', header: 'Visa sponsor (UK register)', group: 'Company', writer: 'discovery', width: 110 },
  { key: 'velocity', header: 'PM hiring velocity (/day)', group: 'Company', writer: 'discovery', width: 110 },
  { key: 'layoff_freeze', header: 'Layoff / freeze', group: 'Company', writer: 'discovery', width: 130 },
  { key: 'financial', header: 'Financial health', group: 'Company', writer: 'discovery', width: 220 },
  { key: 'approval', header: 'Approval', group: 'Owner control', writer: 'owner', width: 120 },
  { key: 'first_seen_date', header: 'First seen', group: 'Workflow', writer: 'append', width: 100 },
  { key: 'posting_date', header: 'Posting date', group: 'Workflow', writer: 'discovery', width: 100 },
  { key: 'ghost_risk', header: 'Ghost risk (>90d)', group: 'Workflow', writer: 'discovery', width: 90 },
  { key: 'assets_generated', header: 'Assets generated', group: 'Workflow', writer: 'assets', width: 160 },
  { key: 'assets_folder', header: 'Assets folder link', group: 'Workflow', writer: 'assets', width: 220 },
];

export const APPROVAL_INDEX = COLUMNS.findIndex((c) => c.key === 'approval');
export const colIndex = (key) => COLUMNS.findIndex((c) => c.key === key);
export const colLetter = (i) => { let s = ''; i += 1; while (i) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; };

/** Contiguous index runs of the columns `writer` may update; Approval is excluded unconditionally (JSF-304). */
export function writableSegments(writer) {
  const idx = COLUMNS.map((c, i) => [c, i]).filter(([c, i]) => i !== APPROVAL_INDEX && c.writer !== 'owner' && c.writer.split('+').includes(writer)).map(([, i]) => i);
  const segs = [];
  for (const i of idx) { const last = segs.at(-1); if (last && last[1] === i - 1) last[1] = i; else segs.push([i, i]); }
  if (segs.some(([a, b]) => a <= APPROVAL_INDEX && APPROVAL_INDEX <= b)) throw new Error('BUG: Approval column inside a writable segment');
  return segs;
}
