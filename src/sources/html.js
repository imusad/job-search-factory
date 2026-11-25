// JSF-108: HTML-parsed boards (12). Cheerio extraction. Many are JS-rendered or bot-protected;
// each parser fails in isolation and the failure is reported in the run summary, never fatal.
import * as cheerio from 'cheerio';
import { http } from '../lib/http.js';
import { makeListing } from '../pipeline/listing.js';

/** Generic extractor: anchors whose text looks like a job title, employer from nearest card text. */
export function extractJobLinks(html, baseUrl, source, titleFilter, { card = 'li, article, tr, div' } = {}) {
  const $ = cheerio.load(html);
  const out = []; const seen = new Set();
  // JSON-LD JobPosting blocks first (most reliable)
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      for (const j of [].concat(JSON.parse($(el).text()))) {
        const list = j['@graph'] || (j.itemListElement ? j.itemListElement.map((x) => x.item || x) : [j]);
        for (const p of list) {
          if (p['@type'] !== 'JobPosting' || !titleFilter(p.title || '')) continue;
          const url = p.url || baseUrl;
          if (seen.has(url + p.title)) continue; seen.add(url + p.title);
          out.push(makeListing({ title: p.title, employer: p.hiringOrganization?.name, url, location: [].concat(p.jobLocation || []).map((l) => l.address?.addressLocality || l.address?.addressCountry).filter(Boolean).join(', ') || (p.jobLocationType === 'TELECOMMUTE' ? 'Remote' : ''), posted: p.datePosted, descriptionHtml: p.description, source, remoteHint: p.jobLocationType === 'TELECOMMUTE' ? 'remote' : null }));
        }
      }
    } catch { /* malformed JSON-LD */ }
  });
  if (out.length) return out;
  $('a[href]').each((_, a) => {
    const title = $(a).text().replace(/\s+/g, ' ').trim();
    if (!title || title.length > 120 || !titleFilter(title)) return;
    const href = new URL($(a).attr('href'), baseUrl).toString();
    if (seen.has(href)) return; seen.add(href);
    const cardEl = $(a).closest(card);
    const cardText = cardEl.text().replace(/\s+/g, ' ').trim();
    const employer = cardEl.find('[class*="company"], [class*="Company"], [data-company]').first().text().trim() || cardText.replace(title, '').trim().split(/[·|•\n]/)[0].trim().slice(0, 60);
    out.push(makeListing({ title, employer, url: href, location: cardEl.find('[class*="location"], [class*="Location"]').first().text().trim(), descriptionHtml: '', source }));
  });
  return out;
}

export const HTML_BOARDS = {
  lennysjobs: 'https://lennysjobs.com/jobs',
  mindtheproduct: 'https://www.mindtheproduct.com/jobs/',
  ycjobs: 'https://www.ycombinator.com/jobs/role/product-manager',
  aijobs: 'https://aijobs.net/?cat=product',
  welcometothejungle: 'https://www.welcometothejungle.com/en/jobs?query=senior%20product%20manager',
  hirist: 'https://www.hirist.tech/k/senior-product-manager-jobs',
  iimjobs: 'https://www.iimjobs.com/k/senior-product-manager-jobs',
  foundit: 'https://www.foundit.in/srp/results?query=senior%20product%20manager',
  shine: 'https://www.shine.com/job-search/senior-product-manager-jobs',
  wellfound: 'https://wellfound.com/role/product-manager',
  builtin: 'https://builtin.com/jobs/product?search=senior%20product%20manager',
  simplyhired: 'https://www.simplyhired.com/search?q=senior+product+manager',
};

export const htmlBoards = Object.fromEntries(Object.entries(HTML_BOARDS).map(([name, url]) => [name, async (titleFilter) => {
  const html = await http(url, { as: 'text', headers: { Accept: 'text/html' } });
  return extractJobLinks(html, url, name, titleFilter).filter((l) => l.employer);
}]));
