import crypto from 'node:crypto';

const LOCATION_SUFFIX = /\s*[-–—|,(]\s*(remote|hybrid|on-?site|onsite|anywhere|worldwide|global|emea|apac|americas|europe|us|usa|uk|india|bangalore|bengaluru|london|dublin|new york|san francisco|[a-z .]+,\s*[a-z]{2})\b.*$/i;

export function normaliseTitle(title = '') {
  let t = String(title).toLowerCase().trim();
  t = t.replace(/\b(sr)\.?(?=\s)/g, 'senior').replace(/\bmgr\b/g, 'manager');
  for (let i = 0; i < 3; i++) t = t.replace(LOCATION_SUFFIX, '');
  t = t.replace(/\(.*?\)/g, ' ').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  return t;
}

export const normaliseEmployer = (e = '') => String(e).toLowerCase().replace(/[,.]?\s+(inc|llc|ltd|limited|plc|gmbh|corp|corporation|co)\.?$/i, '').replace(/\s+/g, ' ').trim();

/** JSF-109 composite key: lowercase(employer) + '|' + normalised_title */
export const compositeKey = (employer, title) => `${normaliseEmployer(employer)}|${normaliseTitle(title)}`;

export const shortId = (key) => crypto.createHash('sha1').update(key).digest('hex').slice(0, 12);

export const slugify = (s = '') => String(s).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function stripHtml(html = '') {
  return String(html)
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<br\s*\/?>|<\/p>|<\/li>|<\/h\d>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'")
    .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
}

export function decodeEntities(s = '') {
  return String(s).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
}

export const isoDate = (d) => {
  if (!d) return null;
  const dt = typeof d === 'number' ? new Date(d < 1e12 ? d * 1000 : d) : new Date(d);
  return isNaN(dt) ? null : dt.toISOString().slice(0, 10);
};

/** Workday "Posted 5 Days Ago" → ISO date relative to now */
export function relativePosted(text, now = new Date()) {
  if (!text) return null;
  const t = text.toLowerCase();
  if (t.includes('today')) return isoDate(now);
  if (t.includes('yesterday')) return isoDate(new Date(now - 864e5));
  const m = t.match(/(\d+)\+?\s+days?/);
  if (m) return isoDate(new Date(now - Number(m[1]) * 864e5));
  return null;
}
