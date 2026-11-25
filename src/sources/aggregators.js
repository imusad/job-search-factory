// JSF-105/108: Adzuna + JSearch (free-tier keys). JSearch reaches Indeed/Glassdoor/ZipRecruiter/Dice via Google for Jobs,
// so those hosts are never contacted directly.
import { http } from '../lib/http.js';
import { env, settings } from '../lib/config.js';
import { makeListing } from '../pipeline/listing.js';
import { generateQueries, runSequential } from '../discovery/queries.js';

export async function adzunaSearch(query, country = 'in') {
  const id = env('ADZUNA_APP_ID', true); const key = env('ADZUNA_APP_KEY', true);
  const n = settings().aggregators.results_per_page;
  const d = await http(`https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${id}&app_key=${key}&results_per_page=${n}&what=${encodeURIComponent(query)}&content-type=application/json`, { tag: 'adzuna' });
  return d.results.map((j) => makeListing({
    title: j.title?.replace(/<\/?strong>/g, ''), employer: j.company?.display_name, url: j.redirect_url, location: j.location?.display_name,
    posted: j.created, description: j.description, source: 'adzuna', raw_id: String(j.id),
  }));
}

export async function jsearchSearch(query) {
  const key = env('JSEARCH_API_KEY', true);
  const d = await http(`https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=1&date_posted=month`, {
    headers: { 'X-RapidAPI-Key': key, 'X-RapidAPI-Host': 'jsearch.p.rapidapi.com' }, tag: 'jsearch',
  });
  return (d.data || []).map((j) => makeListing({
    title: j.job_title, employer: j.employer_name, url: j.job_apply_link || j.job_google_link,
    location: [j.job_city, j.job_state, j.job_country].filter(Boolean).join(', ') || (j.job_is_remote ? 'Remote' : ''),
    posted: j.job_posted_at_datetime_utc, description: j.job_description, source: `jsearch:${(j.job_publisher || 'google').toLowerCase()}`,
    remoteHint: j.job_is_remote ? 'remote' : null, raw_id: j.job_id,
  }));
}

export const aggregators = {
  async adzuna(titleFilter) {
    if (!env('ADZUNA_APP_ID')) throw new Error('ADZUNA_APP_ID not configured (OD-5) — skipped');
    const countries = settings().aggregators.adzuna_countries;
    const tasks = generateQueries().flatMap((q) => countries.map((c) => [q, c]));
    const r = await runSequential(tasks, ([q, c]) => adzunaSearch(q, c));
    if (!r.results.length && r.errors.length) throw new Error(r.errors[0].error);
    return r.results.filter((l) => titleFilter(l.title));
  },
  async jsearch(titleFilter) {
    if (!env('JSEARCH_API_KEY')) throw new Error('JSEARCH_API_KEY not configured (OD-5) — skipped');
    // free tier ≈200 req/month: 3 queries × 2 runs/day × 30 days = 180
    const r = await runSequential(generateQueries().slice(0, 3), jsearchSearch);
    if (!r.results.length && r.errors.length) throw new Error(r.errors[0].error);
    return r.results.filter((l) => titleFilter(l.title));
  },
};
