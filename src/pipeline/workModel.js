// JSF-112: two-pass, rule-based work-model classification. Zero model calls.
const REMOTE = /\b(remote|anywhere|work from home|wfh|distributed|telecommute)\b/i;
const HYBRID = /\bhybrid\b/i;
const ONSITE = /\b(on-?site|in[- ]office|office-based)\b/i;

// Pass-2 contradiction patterns: language that says a "remote" job is tied to a place or an office.
export const GEO_RESTRICT = [
  /\bmust (be )?(based|located|reside|living) in\b/i,
  /\b(remote|work from home)\b[^.\n]{0,40}\b(within|in) (the )?(us|usa|united states|uk|united kingdom|eu|europe|canada|germany|india|emea|apac|latam|[A-Z][a-z]+ time ?zones?)\b/i,
  /\b(us|uk|eu|canada)[- ]based (candidates )?only\b/i,
  /\bonly (accept|consider)(ing)? (applications|candidates) (from|in|based)\b/i,
  /\bmust (have|hold) (the )?(right|authori[sz]ation) to work in\b/i,
  /\bwithin commuting distance\b/i,
];
export const OFFICE_REQUIRED = [
  /\bon-?site (is )?required\b/i,
  /\bregularly (meet|work|be) (on-?site|in (the|our) office)\b/i,
  /\b(\d|one|two|three|four) days? (a|per) week in (the|our) office\b/i,
  /\bin (the|our) office (\d|one|two|three|four) days\b/i,
  /\bhybrid (work )?(model|schedule|role)\b/i,
  /\breport(ing)? to (the|our) office\b/i,
];

export function pass1(listing) {
  const hint = String(listing.remote_hint || '').toLowerCase();
  const loc = listing.hiring_location || '';
  if (/remote/.test(hint) || REMOTE.test(loc)) return 'Remote';
  if (/hybrid/.test(hint) || HYBRID.test(loc)) return 'Hybrid';
  if (/on_?site|onsite|office/.test(hint) || ONSITE.test(loc)) return 'Onsite';
  if (loc && loc !== 'Unspecified') return 'Onsite';
  return 'Unknown';
}

export function classifyWorkModel(listing) {
  const p1 = pass1(listing);
  const desc = listing.full_description || '';
  const officeHit = OFFICE_REQUIRED.find((r) => r.test(desc));
  const geoHit = GEO_RESTRICT.find((r) => r.test(desc));
  let label; let confidence = 'High'; let evidence = null;
  if (p1 === 'Remote') {
    if (officeHit) { label = 'Hybrid'; confidence = 'Low'; evidence = desc.match(officeHit)[0]; }
    else if (geoHit || /\bremote\b[^,]*\(|remote\s*[-–(,]\s*(us|uk|eu|india|emea|usa|europe|canada|apac)\b/i.test(listing.hiring_location || '')) {
      label = 'Remote-Geo-Restricted'; confidence = geoHit ? 'Low' : 'High'; evidence = geoHit ? desc.match(geoHit)[0] : listing.hiring_location;
    } else label = 'Remote-Verified';
  } else if (p1 === 'Hybrid') {
    label = 'Hybrid';
    if (!officeHit && !HYBRID.test(desc)) confidence = desc ? 'Medium' : 'Low';
  } else if (p1 === 'Onsite') {
    label = 'Onsite';
    if (REMOTE.test(desc) && /\b(fully|100%) remote\b/i.test(desc)) { confidence = 'Low'; evidence = 'description mentions fully remote'; }
  } else { label = 'Unknown'; confidence = 'Low'; }
  return { work_model: label, work_model_confidence: confidence, work_model_evidence: evidence, pass1: p1 };
}
