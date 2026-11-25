// JSF-109: dedup on lowercase(employer)|normalised_title; same role in multiple locations → one row.
import { compositeKey, shortId } from '../lib/normalize.js';

export function dedupe(listings) {
  const byKey = new Map();
  for (const l of listings) {
    const key = compositeKey(l.employer, l.title);
    const cur = byKey.get(key);
    if (!cur) {
      byKey.set(key, { ...l, key, id: shortId(key), hiring_locations: splitLocs(l.hiring_location), sources: [l.source_origin] });
      continue;
    }
    for (const loc of splitLocs(l.hiring_location)) if (!cur.hiring_locations.includes(loc)) cur.hiring_locations.push(loc);
    if (!cur.sources.includes(l.source_origin)) cur.sources.push(l.source_origin);
    // prefer the richer record: ATS over board, longer description, earlier posting date
    if (!cur.ats_platform && l.ats_platform) Object.assign(cur, { ats_platform: l.ats_platform, application_url: l.application_url, source_origin: l.source_origin });
    if ((l.full_description || '').length > (cur.full_description || '').length) cur.full_description = l.full_description;
    if (l.posting_date && (!cur.posting_date || l.posting_date < cur.posting_date)) cur.posting_date = l.posting_date;
    cur.remote_hint ??= l.remote_hint;
  }
  const out = [...byKey.values()];
  for (const l of out) {
    l.hiring_locations = l.hiring_locations.filter((x) => x !== 'Unspecified' || l.hiring_locations.length === 1);
    l.hiring_location = l.hiring_locations.join(', ');
  }
  return { listings: out, removed: listings.length - out.length };
}

const splitLocs = (s) => String(s || 'Unspecified').split(/\s*[;]\s*|\s*\|\s*/).map((x) => x.trim()).filter(Boolean);
