// JSF-106: probe all 7 ATS patterns in parallel per company; first valid JSON hit identifies the platform.
import { ADAPTERS } from './adapters.js';
import { mapLimit } from '../lib/http.js';
import { settings } from '../lib/config.js';

const ORDER = ['greenhouse', 'ashby', 'lever', 'smartrecruiters', 'workable', 'rippling', 'workday'];

export async function detectAts(company) {
  if (company.ats && company.ats_config) return { platform: company.ats, config: company.ats_config };
  // All 7 platforms probed in parallel; the first valid JSON hit with postings wins.
  const order = company.ats ? [company.ats, ...ORDER.filter((n) => n !== company.ats)] : ORDER;
  try {
    return await Promise.any(order.map(async (name) => {
      const cfg = await ADAPTERS[name].probe(company);
      if (!cfg) throw new Error('miss');
      return { platform: name, config: cfg };
    }));
  } catch { return { platform: null, config: null }; }
}

export async function detectMany(companies, { state, now = new Date() } = {}) {
  const retryMs = settings().discovery.ats_retry_days * 864e5;
  return mapLimit(companies, settings().http.concurrency, async (c) => {
    const cached = state?.ats_cache?.[c.name];
    if (cached && (cached.platform || now - new Date(cached.checked_at) < retryMs)) return { company: c, ...cached };
    const r = await detectAts(c);
    const entry = { platform: r.platform, config: r.config, checked_at: now.toISOString() };
    if (state) state.ats_cache[c.name] = entry;
    return { company: c, ...entry };
  });
}
