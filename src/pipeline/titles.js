// JSF-107: target-title matching — case-insensitive, word-boundary regex. Exclusions also word-boundary (JSF-207).
import { settings } from '../lib/config.js';
import { wordRegex, matchesAny } from '../lib/match.js';

export function makeTitleFilter(cfg = settings().titles) {
  const include = cfg.include.map((p) => wordRegex(p, true));
  return (title = '') => include.some((r) => r.test(title)) && !matchesAny(title, cfg.exclude_terms);
}

export const isPmTitle = (title, cfg = settings().titles) => new RegExp(cfg.pm_count_pattern, 'i').test(title || '');
