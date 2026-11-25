// JSF-110: first_seen snapshot is the source of truth for listing age (Greenhouse only exposes updated_at).
import { settings } from '../lib/config.js';

export function applyFirstSeen(listings, state, now = new Date()) {
  const ghostDays = settings().thresholds.ghost_days;
  for (const l of listings) {
    const rec = state.listings[l.key] ||= { first_seen: now.toISOString() };
    rec.last_seen = now.toISOString();
    l.first_seen_at = rec.first_seen;
    l.first_seen_date = rec.first_seen.slice(0, 10);
    l.age_days = Math.floor((now - new Date(rec.first_seen)) / 864e5);
    l.ghost_risk = l.age_days > ghostDays;
  }
  return listings;
}

/** Drop state for listings unseen for 180 days to keep the committed file small. */
export function pruneState(state, now = new Date()) {
  for (const [k, v] of Object.entries(state.listings)) if (now - new Date(v.last_seen || v.first_seen) > 180 * 864e5) delete state.listings[k];
}
