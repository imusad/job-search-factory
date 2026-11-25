// JSF-111: canonical listing object. Every source adapter must return objects built here.
import { stripHtml, isoDate, decodeEntities } from '../lib/normalize.js';

/** Plain one-line text: no tags, entities or location glyphs leaking in from RSS/HTML sources. */
export function cleanText(s) {
  const t = stripHtml(decodeEntities(String(s || ''))).replace(/\u00a0/g, ' ');
  return t.split(/\n|[⚲📍|•]/)[0].replace(/\s+/g, ' ').trim();
}

export const REQUIRED_FIELDS = ['application_url', 'title', 'employer', 'hiring_location', 'posting_date', 'first_seen_date', 'full_description'];
export const NON_NULL_FIELDS = ['title', 'employer', 'application_url'];

export function makeListing({ title, employer, url, location, posted, description, descriptionHtml, source, ats = null, remoteHint = null, raw_id = null }) {
  return {
    title: cleanText(title),
    employer: cleanText(employer),
    application_url: url || '',
    hiring_location: (Array.isArray(location) ? location.filter(Boolean).join(', ') : location || '').trim() || 'Unspecified',
    posting_date: isoDate(posted),
    first_seen_date: null, // set by firstSeen stage
    full_description: description ? String(description).trim() : stripHtml(descriptionHtml || ''),
    source_origin: source,
    ats_platform: ats,
    remote_hint: remoteHint, // structured remote/workplace field from the source, if any
    raw_id,
  };
}

export function validateListing(l) {
  const errors = [];
  for (const f of REQUIRED_FIELDS) if (!(f in l)) errors.push(`missing field ${f}`);
  for (const f of NON_NULL_FIELDS) if (!l[f]) errors.push(`empty ${f}`);
  if (l.application_url && !/^https?:\/\//.test(l.application_url)) errors.push('application_url not a URL');
  return errors;
}
