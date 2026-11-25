// JSF-201 / FR-2.9: every component normalised to 0–1, then multiplied by its weight. Phase 1 max = 0.55.
// FR-2.1 veto: an unmet hard requirement caps the TOTAL at zero.
import { settings } from '../lib/config.js';
import { firstMatch } from '../lib/match.js';

export const normalise = (raw, min, max) => (max === min ? 0 : Math.max(0, Math.min(1, (raw - min) / (max - min))));

export function vetoReason(listing, cfg = settings()) {
  const hit = firstMatch(listing.full_description || '', cfg.veto_terms);
  if (!hit) return null;
  // Work-authorisation vetoes don't apply where the owner already has the right to work.
  if (isHomeCountry(listing.hiring_location, cfg)) return null;
  return `veto: "${hit}"`;
}

export const isHomeCountry = (loc, cfg = settings()) => cfg.owner.home_countries.some((c) => new RegExp(`\\b${c}\\b|\\b(bangalore|bengaluru|hyderabad|pune|mumbai|delhi|gurgaon|gurugram|noida|chennai)\\b`, 'i').test(loc || ''));

/**
 * @param l listing with work_model, company signals {velocity, visa_sponsor, funding_stage, layoff_recent, hiring_freeze, financial_score}
 * @param ranges {velocity:{min,max}} computed across the run for min-max normalisation
 */
export function phase1Score(l, ranges, cfg = settings()) {
  const w = cfg.weights;
  const wmPoints = cfg.work_model_points;
  const maxWm = Math.max(...Object.values(wmPoints));
  const c = {
    work_model: normalise(wmPoints[l.work_model] ?? 0, 0, maxWm),
    velocity: normalise(l.velocity ?? 0, ranges.velocity.min, ranges.velocity.max),
    visa: l.visa_sponsor || isHomeCountry(l.hiring_location, cfg) ? 1 : 0,
    funding: cfg.funding_stage_scores[l.funding_stage || 'unknown'] ?? 0,
    layoff: l.layoff_recent || l.hiring_freeze ? 0 : 1,
    financial: l.financial_score ?? 0,
  };
  const weighted = Object.fromEntries(Object.entries(c).map(([k, v]) => [k, Number((v * w[k]).toFixed(4))]));
  const veto = vetoReason(l, cfg);
  const total = veto ? 0 : Number(Object.values(weighted).reduce((a, b) => a + b, 0).toFixed(4));
  return { phase1: total, components: c, weighted, veto };
}

/** Regression-only: raw (un-normalised) sum, to prove FR-2.9's measured defect. */
export const rawSum = (parts) => parts.reduce((a, b) => a + b, 0);

export function phase2Score({ experience_raw, domain_raw }, cfg = settings()) {
  const s = cfg.semantic; const w = cfg.weights;
  const e = normalise(experience_raw, s.experience_raw_min, s.experience_raw_max);
  const d = normalise(domain_raw, s.domain_raw_min, s.domain_raw_max);
  return { experience_norm: Number(e.toFixed(4)), domain_norm: Number(d.toFixed(4)), phase2: Number((e * w.experience + d * w.domain).toFixed(4)) };
}

export function rangesFor(listings) {
  const v = listings.map((l) => l.velocity ?? 0);
  return { velocity: { min: Math.min(0, ...v), max: Math.max(0, ...v) } };
}
