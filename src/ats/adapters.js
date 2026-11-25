// FR-1.5 / JSF-106 + FR-1.6: one adapter per ATS. Each has probe(company) → config|null and fetch(company, config) → listings.
// Adapters are isolated: a failing adapter never stops the others (Risk register: ATS API changes).
import { http, mapLimit } from '../lib/http.js';
import { settings } from '../lib/config.js';
import { makeListing } from '../pipeline/listing.js';
import { relativePosted, slugify, stripHtml } from '../lib/normalize.js';

const probeT = () => settings().http.probe_timeout_ms;
const slugsFor = (c) => [...new Set([c.ats_slug, slugify(c.name), slugify(c.name).replace(/-/g, '')].filter(Boolean))];

// Probe all slug variants in parallel; resolve with the first non-null result (or null).
async function firstOk(slugs, fn) {
  try {
    return await Promise.any(slugs.map(async (s) => { const r = await fn(s); if (!r) throw new Error('miss'); return r; }));
  } catch { return null; }
}

export const greenhouse = {
  name: 'greenhouse',
  probe: (c) => firstOk(slugsFor(c), async (slug) => {
    const d = await http(`https://boards-api.greenhouse.io/v1/boards/${slug}/jobs`, { timeout: probeT(), retries: 0, tag: 'probe' });
    return d.jobs?.length > 0 ? { slug } : null;
  }),
  async fetch(c, cfg, titleFilter) {
    const d = await http(`https://boards-api.greenhouse.io/v1/boards/${cfg.slug}/jobs?content=true`, { timeout: 45000 });
    return d.jobs.filter((j) => titleFilter(j.title)).map((j) => makeListing({
      title: j.title, employer: c.name, url: j.absolute_url, location: j.location?.name,
      posted: j.first_published || j.updated_at, descriptionHtml: decode(j.content), source: 'greenhouse', ats: 'greenhouse', raw_id: String(j.id),
    }));
  },
  countAll: async (c, cfg) => (await http(`https://boards-api.greenhouse.io/v1/boards/${cfg.slug}/jobs`)).jobs.map((j) => j.title),
};

export const lever = {
  name: 'lever',
  probe: (c) => firstOk(slugsFor(c), async (slug) => {
    const d = await http(`https://api.lever.co/v0/postings/${slug}?mode=json&limit=1`, { timeout: probeT(), retries: 0, tag: 'probe' });
    return Array.isArray(d) && d.length > 0 ? { slug } : null;
  }),
  async fetch(c, cfg, titleFilter) {
    const d = await http(`https://api.lever.co/v0/postings/${cfg.slug}?mode=json`, { timeout: 30000 });
    return d.filter((j) => titleFilter(j.text)).map((j) => makeListing({
      title: j.text, employer: c.name, url: j.hostedUrl, location: j.categories?.allLocations?.join(', ') || j.categories?.location,
      posted: j.createdAt, description: [j.descriptionPlain, ...(j.lists || []).map((l) => `${l.text}\n${stripHtml(l.content)}`), j.additionalPlain].filter(Boolean).join('\n'),
      source: 'lever', ats: 'lever', remoteHint: j.workplaceType, raw_id: j.id,
    }));
  },
  countAll: async (c, cfg) => (await http(`https://api.lever.co/v0/postings/${cfg.slug}?mode=json`)).map((j) => j.text),
};

export const ashby = {
  name: 'ashby',
  probe: (c) => firstOk(slugsFor(c), async (slug) => {
    const d = await http(`https://api.ashbyhq.com/posting-api/job-board/${slug}`, { timeout: probeT() * 2, retries: 0, tag: 'probe' });
    return d.jobs?.length > 0 ? { slug } : null;
  }),
  async fetch(c, cfg, titleFilter) {
    const d = await http(`https://api.ashbyhq.com/posting-api/job-board/${cfg.slug}`, { timeout: 45000 });
    return d.jobs.filter((j) => j.isListed !== false && titleFilter(j.title)).map((j) => makeListing({
      title: j.title, employer: c.name, url: j.jobUrl, location: [j.location, ...(j.secondaryLocations || []).map((s) => s.location)].join(', '),
      posted: j.publishedAt, description: j.descriptionPlain, descriptionHtml: j.descriptionHtml, source: 'ashby', ats: 'ashby',
      remoteHint: j.isRemote ? 'remote' : j.workplaceType, raw_id: j.id,
    }));
  },
  countAll: async (c, cfg) => (await http(`https://api.ashbyhq.com/posting-api/job-board/${cfg.slug}`)).jobs.map((j) => j.title),
};

export const smartrecruiters = {
  name: 'smartrecruiters',
  probe: (c) => firstOk(slugsFor(c).concat(c.name.replace(/\s+/g, '')), async (id) => {
    const d = await http(`https://api.smartrecruiters.com/v1/companies/${id}/postings?limit=1`, { timeout: probeT(), retries: 0, tag: 'probe' });
    return d.totalFound > 0 ? { id } : null;
  }),
  async fetch(c, cfg, titleFilter) {
    const out = [];
    for (let offset = 0; offset < 2000; offset += 100) {
      const d = await http(`https://api.smartrecruiters.com/v1/companies/${cfg.id}/postings?limit=100&offset=${offset}&q=product`);
      out.push(...d.content.filter((j) => titleFilter(j.name)));
      if (offset + 100 >= d.totalFound) break;
    }
    return mapLimit(out, 5, async (j) => {
      let desc = '';
      try {
        const det = await http(`https://api.smartrecruiters.com/v1/companies/${cfg.id}/postings/${j.id}`);
        desc = Object.values(det.jobAd?.sections || {}).map((s) => stripHtml(s.text || '')).join('\n');
      } catch { /* description optional */ }
      return makeListing({
        title: j.name, employer: c.name, url: `https://jobs.smartrecruiters.com/${cfg.id}/${j.id}`,
        location: j.location?.fullLocation || [j.location?.city, j.location?.country].filter(Boolean).join(', '),
        posted: j.releasedDate, description: desc, source: 'smartrecruiters', ats: 'smartrecruiters',
        remoteHint: j.location?.remote ? 'remote' : j.location?.hybrid ? 'hybrid' : null, raw_id: j.id,
      });
    });
  },
  countAll: async (c, cfg) => (await http(`https://api.smartrecruiters.com/v1/companies/${cfg.id}/postings?limit=100&q=product`)).content.map((j) => j.name),
};

export const workable = {
  name: 'workable',
  probe: (c) => firstOk(slugsFor(c), async (slug) => {
    const d = await http(`https://apply.workable.com/api/v3/accounts/${slug}/jobs`, { method: 'POST', json: { query: '' }, timeout: probeT(), retries: 0, tag: 'probe' });
    return d.results?.length > 0 ? { slug } : null;
  }),
  async fetch(c, cfg, titleFilter) {
    const all = [];
    let token;
    for (let i = 0; i < 20; i++) {
      const d = await http(`https://apply.workable.com/api/v3/accounts/${cfg.slug}/jobs`, { method: 'POST', json: { query: '', ...(token ? { token } : {}) }, retries: 3 });
      all.push(...d.results);
      token = d.nextPage; if (!token) break;
    }
    return mapLimit(all.filter((j) => titleFilter(j.title)), 1, async (j) => {
      let desc = '';
      try {
        const det = await http(`https://apply.workable.com/api/v2/accounts/${cfg.slug}/jobs/${j.shortcode}`);
        desc = stripHtml([det.description, det.requirements, det.benefits].filter(Boolean).join('\n'));
      } catch { /* optional */ }
      return makeListing({
        title: j.title, employer: c.name, url: `https://apply.workable.com/${cfg.slug}/j/${j.shortcode}/`,
        location: (j.locations || [j.location]).map((l) => [l?.city, l?.country].filter(Boolean).join(', ')).join('; '),
        posted: j.published, description: desc, source: 'workable', ats: 'workable', remoteHint: j.workplace || (j.remote ? 'remote' : null), raw_id: String(j.id),
      });
    });
  },
};

export const rippling = {
  name: 'rippling',
  probe: (c) => firstOk(slugsFor(c), async (slug) => {
    const d = await http(`https://ats.rippling.com/api/v2/board/${slug}/jobs`, { timeout: probeT(), retries: 0, tag: 'probe' });
    return d.items?.length > 0 ? { slug } : null;
  }),
  async fetch(c, cfg, titleFilter) {
    const d = await http(`https://ats.rippling.com/api/v2/board/${cfg.slug}/jobs?pageSize=500`);
    const byId = new Map();
    for (const j of d.items.filter((j) => titleFilter(j.name))) {
      const prev = byId.get(j.id);
      const locs = (j.locations || []).map((l) => l.name);
      if (prev) prev.locs.push(...locs); else byId.set(j.id, { j, locs });
    }
    return mapLimit([...byId.values()], 4, async ({ j, locs }) => {
      let desc = ''; let posted = null;
      try {
        const html = await http(j.url, { as: 'text' });
        const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
        if (m) { const nd = JSON.parse(m[1]); const job = findKey(nd, 'description'); desc = stripHtml(typeof job === 'string' ? job : JSON.stringify(job || '')); posted = findKey(nd, 'createdOn'); }
      } catch { /* optional */ }
      return makeListing({
        title: j.name, employer: c.name, url: j.url, location: [...new Set(locs)].join(', '), posted, description: desc,
        source: 'rippling', ats: 'rippling', remoteHint: j.locations?.[0]?.workplaceType, raw_id: j.id,
      });
    });
  },
};

// Workday: tenant/site vary per company. Seeds may carry {host, tenant, site}; otherwise probe common patterns.
const WD_HOSTS = ['wd1', 'wd3', 'wd5', 'wd12', 'wd103'];
const wdSites = (slug) => ['External', 'Careers', 'careers', `${slug}`, `${slug}_Careers`, 'External_Careers'];
export const workday = {
  name: 'workday',
  async probe(c) {
    // Tenant/site can't be derived from a name reliably; guess only when the seed hints Workday.
    const slug = c.ats_slug || slugify(c.name).replace(/-/g, '');
    const candidates = c.workday ? [c.workday] : c.ats === 'workday' ? WD_HOSTS.flatMap((wd) => wdSites(slug).map((site) => ({ host: `${slug}.${wd}.myworkdayjobs.com`, tenant: slug, site }))) : [];
    return firstOk(candidates, async (cfg) => {
      const d = await http(`https://${cfg.host}/wday/cxs/${cfg.tenant}/${cfg.site}/jobs`, { method: 'POST', json: { appliedFacets: {}, limit: 1, offset: 0, searchText: '' }, timeout: probeT(), retries: 0, tag: 'probe' });
      return typeof d.total === 'number' && d.total > 0 ? cfg : null;
    });
  },
  async fetch(c, cfg, titleFilter, { detailLimit = 150 } = {}) {
    const base = `https://${cfg.host}/wday/cxs/${cfg.tenant}/${cfg.site}`;
    const postings = [];
    for (const searchText of ['product manager', 'product lead', 'head of product', 'director product']) {
      for (let offset = 0; offset < 2000; offset += 20) {
        const d = await http(`${base}/jobs`, { method: 'POST', json: { appliedFacets: {}, limit: 20, offset, searchText } });
        postings.push(...(d.jobPostings || []));
        if (!d.jobPostings?.length || offset + 20 >= d.total) break;
      }
    }
    const seen = new Set();
    const matched = postings.filter((j) => j.title && titleFilter(j.title) && !seen.has(j.externalPath) && seen.add(j.externalPath));
    return mapLimit(matched, 6, async (j, idx) => {
      let info = {};
      if (idx < detailLimit) { try { info = (await http(`${base}${j.externalPath}`)).jobPostingInfo || {}; } catch { /* optional */ } }
      const site = `https://${cfg.host}/en-US/${cfg.site}${j.externalPath}`;
      return makeListing({
        title: j.title, employer: c.name, url: info.externalUrl || site,
        location: [info.location, ...(info.additionalLocations || [])].filter(Boolean).join(', ') || j.locationsText,
        posted: info.startDate || relativePosted(j.postedOn), descriptionHtml: info.jobDescription || '',
        source: 'workday', ats: 'workday', remoteHint: info.remoteType || null, raw_id: j.bulletFields?.[0] || j.externalPath,
      });
    });
  },
  async countAll(c, cfg) {
    const d = await http(`https://${cfg.host}/wday/cxs/${cfg.tenant}/${cfg.site}/jobs`, { method: 'POST', json: { appliedFacets: {}, limit: 20, offset: 0, searchText: 'product manager' } });
    return { total: d.total, titles: d.jobPostings.map((j) => j.title) };
  },
};

export const ADAPTERS = { workday, greenhouse, lever, ashby, smartrecruiters, workable, rippling };

function decode(s = '') { return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&'); }
function findKey(obj, key, depth = 0) {
  if (!obj || typeof obj !== 'object' || depth > 12) return undefined;
  if (key in obj && obj[key]) return obj[key];
  for (const v of Object.values(obj)) { const r = findKey(v, key, depth + 1); if (r) return r; }
  return undefined;
}
