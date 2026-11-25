// FR-2.8 / JSF-207: every term match uses \b word boundaries. Never use String.includes for terms.
const cache = new Map();
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Build a case-insensitive word-boundary regex. `term` is literal unless isPattern=true. */
export function wordRegex(term, isPattern = false) {
  const key = `${isPattern}:${term}`;
  if (!cache.has(key)) cache.set(key, new RegExp(isPattern ? term : `\\b${escape(term).replace(/\\ /g, '\\s+').replace(/ /g, '\\s+')}\\b`, 'i'));
  return cache.get(key);
}

export const matchesTerm = (text, term) => wordRegex(term).test(text || '');
export const matchesAny = (text, terms) => terms.some((t) => matchesTerm(text, t));
export const firstMatch = (text, terms) => terms.find((t) => matchesTerm(text, t)) ?? null;

/** Deliberately-wrong substring matcher, kept ONLY for the TC-207 regression test. */
export const naiveIncludes = (text, term) => (text || '').toLowerCase().includes(term.toLowerCase());
