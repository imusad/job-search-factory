// JSF-204: PM hiring velocity = (current - previous) / days, history kept in state.pm_counts.
// JSF-205 (part): hiring freeze = previous ≥ freeze_min_previous and current = 0.
import { settings } from '../lib/config.js';

export function recordPmCount(state, company, count, now = new Date()) {
  const hist = (state.pm_counts[company] ||= []);
  const prev = hist.at(-1);
  hist.push({ at: now.toISOString(), count });
  if (hist.length > 60) hist.splice(0, hist.length - 60);
  return velocityFrom(prev, { at: now.toISOString(), count });
}

export function velocityFrom(prev, cur) {
  if (!prev) return { velocity: 0, previous: null, current: cur.count, hiring_freeze: false };
  const days = Math.max((new Date(cur.at) - new Date(prev.at)) / 864e5, 1 / 24);
  const velocity = Number(((cur.count - prev.count) / days).toFixed(3));
  const hiring_freeze = prev.count >= settings().thresholds.freeze_min_previous && cur.count === 0;
  return { velocity, previous: prev.count, current: cur.count, hiring_freeze };
}
