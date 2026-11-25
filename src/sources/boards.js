// JSF-108: public JSON boards (7) + RSS boards (3). No auth. Each source isolated.
import { XMLParser } from 'fast-xml-parser';
import { http } from '../lib/http.js';
import { makeListing } from '../pipeline/listing.js';
import { stripHtml, decodeEntities } from '../lib/normalize.js';

export const jsonBoards = {
  async remoteok(titleFilter) {
    const d = await http('https://remoteok.com/api');
    return d.filter((j) => j.position && titleFilter(j.position)).map((j) => makeListing({
      title: j.position, employer: j.company, url: j.apply_url || j.url, location: j.location || 'Remote', posted: j.date,
      descriptionHtml: j.description, source: 'remoteok', remoteHint: 'remote', raw_id: String(j.id),
    }));
  },
  async remotive(titleFilter) {
    const d = await http('https://remotive.com/api/remote-jobs?category=product');
    return d.jobs.filter((j) => titleFilter(j.title)).map((j) => makeListing({
      title: j.title, employer: j.company_name, url: j.url, location: j.candidate_required_location || 'Remote', posted: j.publication_date,
      descriptionHtml: j.description, source: 'remotive', remoteHint: 'remote', raw_id: String(j.id),
    }));
  },
  async workingnomads(titleFilter) {
    const d = await http('https://www.workingnomads.com/api/exposed_jobs/');
    return d.filter((j) => titleFilter(j.title)).map((j) => makeListing({
      title: j.title, employer: j.company_name, url: j.url, location: j.location || 'Remote', posted: j.pub_date,
      descriptionHtml: j.description, source: 'workingnomads', remoteHint: 'remote',
    }));
  },
  async himalayas(titleFilter) {
    const out = []; let cursor;
    for (let i = 0; i < 5; i++) {
      const d = await http(`https://himalayas.app/jobs/api?limit=20&q=product%20manager${cursor ? `&cursor=${cursor}` : ''}`);
      out.push(...d.jobs); cursor = d.nextCursor; if (!cursor) break;
    }
    return out.filter((j) => titleFilter(j.title)).map((j) => makeListing({
      title: j.title, employer: j.companyName, url: j.applicationLink || j.guid, location: (j.locationRestrictions || []).join(', ') || 'Remote',
      posted: j.pubDate, descriptionHtml: j.description || j.excerpt, source: 'himalayas', remoteHint: 'remote', raw_id: j.guid,
    }));
  },
  async arbeitnow(titleFilter) {
    const out = [];
    for (let page = 1; page <= 3; page++) {
      const d = await http(`https://www.arbeitnow.com/api/job-board-api?page=${page}`);
      out.push(...d.data); if (!d.links?.next) break;
    }
    return out.filter((j) => titleFilter(j.title)).map((j) => makeListing({
      title: j.title, employer: j.company_name, url: j.url, location: j.location, posted: j.created_at,
      descriptionHtml: j.description, source: 'arbeitnow', remoteHint: j.remote ? 'remote' : null, raw_id: j.slug,
    }));
  },
  async jobicy(titleFilter) {
    const d = await http('https://jobicy.com/api/v2/remote-jobs?count=100&tag=product%20manager');
    return (d.jobs || []).filter((j) => titleFilter(j.jobTitle)).map((j) => makeListing({
      title: decodeEntities(j.jobTitle), employer: j.companyName, url: j.url, location: j.jobGeo || 'Remote', posted: j.pubDate,
      descriptionHtml: j.jobDescription, source: 'jobicy', remoteHint: 'remote', raw_id: String(j.id),
    }));
  },
  async instahyre(titleFilter) {
    const out = [];
    for (let offset = 0; offset < 300; offset += 30) {
      const d = await http(`https://www.instahyre.com/api/v1/job_search?company_size=0&isLandingPage=true&job_type=0&limit=30&offset=${offset}&designations=Product%20Manager`);
      out.push(...(d.objects || [])); if (!d.meta?.next) break;
    }
    return out.filter((j) => titleFilter(j.candidate_title || j.title || '')).map((j) => makeListing({
      title: j.candidate_title || j.title, employer: j.employer?.company_name, url: j.public_url, location: (j.locations || '').toString() || 'India',
      posted: j.created_at, description: [j.employer?.instahyre_note, (j.keywords || []).join(', ')].filter(Boolean).join('\n'), source: 'instahyre', raw_id: String(j.id),
    }));
  },
};

const RSS = {
  weworkremotely: 'https://weworkremotely.com/categories/remote-product-jobs.rss',
  jobspresso: 'https://jobspresso.co/feed/?post_type=job_listing',
  nodesk: 'https://nodesk.substack.com/feed',
};

export function parseRss(xml, source) {
  const feed = new XMLParser({ ignoreAttributes: false, processEntities: false }).parse(xml);
  const items = [].concat(feed.rss?.channel?.item || []);
  return items.map((it) => {
    let title = decodeEntities(String(it.title ?? '')); let employer = it['dc:creator'] || it['job_listing:company'] || '';
    // WWR format: "Company: Title"
    if (source === 'weworkremotely' && title.includes(':')) { const i = title.indexOf(':'); employer = title.slice(0, i).trim(); title = title.slice(i + 1).trim(); }
    if (!employer) { const m = title.match(/^(.*?)\s+(?:at|@)\s+(.+)$/i); if (m) { title = m[1]; employer = m[2]; } }
    return { title: decodeEntities(title), employer: String(employer), url: it.link, location: it.region || it['job_listing:location'] || 'Remote', posted: it.pubDate, descriptionHtml: it['content:encoded'] || it.description || '' };
  });
}

export const rssBoards = Object.fromEntries(Object.entries(RSS).map(([name, url]) => [name, async (titleFilter) => {
  const xml = await http(url, { as: 'text' });
  return parseRss(xml, name).filter((j) => j.employer && titleFilter(j.title)).map((j) => makeListing({ ...j, source: name, remoteHint: 'remote' }));
}]));
