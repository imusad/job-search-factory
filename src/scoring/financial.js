// JSF-203: financial health. Public → SEC EDGAR (free). Private → inferred signal, always labelled "inferred".
import { http } from '../lib/http.js';
import { env, settings } from '../lib/config.js';

const SEC_UA = () => env('SEC_USER_AGENT') || 'JobSearchFactory personal-research-tool';
let tickerMap;

async function cikFor(ticker) {
  tickerMap ??= Object.values(await http('https://www.sec.gov/files/company_tickers.json', { headers: { 'User-Agent': SEC_UA() }, tag: 'sec' }));
  const hit = tickerMap.find((t) => t.ticker === ticker.toUpperCase());
  return hit ? String(hit.cik_str).padStart(10, '0') : null;
}

export async function secRevenueGrowth(ticker) {
  const cik = await cikFor(ticker);
  if (!cik) return null;
  let best = null; // companies switch revenue concepts over time: use whichever has the latest fiscal year
  for (const concept of ['RevenueFromContractWithCustomerExcludingAssessedTax', 'Revenues', 'SalesRevenueNet']) {
    try {
      const d = await http(`https://data.sec.gov/api/xbrl/companyconcept/CIK${cik}/us-gaap/${concept}.json`, { headers: { 'User-Agent': SEC_UA() }, tag: 'sec' });
      const annual = (d.units?.USD || []).filter((u) => u.form === '10-K' && u.fp === 'FY' && /^CY\d{4}$/.test(u.frame || ''));
      const byYear = new Map(annual.map((u) => [u.frame, u.val]));
      const years = [...byYear.keys()].sort();
      if (years.length < 2) continue;
      const [y0, y1] = years.slice(-2);
      if (best && best.period.split('→')[1] >= y1) continue;
      const growth = (byYear.get(y1) - byYear.get(y0)) / Math.abs(byYear.get(y0));
      best = { growth: Number(growth.toFixed(3)), period: `${y0}→${y1}`, revenue: byYear.get(y1), cik };
    } catch { /* concept not reported */ }
  }
  return best;
}

/** Map revenue growth to 0–1: ≤ -10% → 0, ≥ +30% → 1. */
export const growthToScore = (g) => Math.max(0, Math.min(1, (g + 0.1) / 0.4));

export function inferredHealth({ funding_stage, velocity = 0, hiring_freeze = false, layoff_recent = false }) {
  if (hiring_freeze) return 0.1;
  const f = settings().funding_stage_scores[funding_stage || 'unknown'] ?? 0;
  const v = velocity > 0 ? 1 : velocity === 0 ? 0.5 : 0.2;
  return Number(Math.max(0, 0.6 * f + 0.4 * v - (layoff_recent ? 0.3 : 0)).toFixed(3));
}

export async function financialHealth(company, signals = {}) {
  if (company.ticker) {
    try {
      const r = await secRevenueGrowth(company.ticker);
      if (r) return { score: Number(growthToScore(r.growth).toFixed(3)), basis: 'reported', source: 'sec_edgar', label: `SEC EDGAR revenue growth ${(r.growth * 100).toFixed(1)}% (${r.period})` };
    } catch { /* fall through to inferred */ }
  }
  const score = inferredHealth({ funding_stage: company.funding_stage, ...signals });
  return { score, basis: 'inferred', source: 'inferred', label: `inferred (funding: ${company.funding_stage || 'unknown'}, velocity, freeze) — not reported data` };
}
