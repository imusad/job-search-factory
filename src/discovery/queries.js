// JSF-105: search queries generated from the master experience file, executed sequentially with a delay.
import { experienceKeywords } from './classify.js';
import { settings } from '../lib/config.js';
import { sleep } from '../lib/http.js';

const ROLE_PATTERNS = ['Senior Product Manager', 'AI Product Manager', 'Group Product Manager', 'Principal Product Manager', 'Product Lead'];
const PRIORITY = ['generative ai', 'llm', 'rag', 'evaluation framework', 'guardrails', 'responsible ai', 'agentic', 'conversational ai', 'pharma martech', 'vector database', 'knowledge graph', 'product strategy'];

export function generateQueries(max = settings().aggregators.max_queries) {
  const kws = experienceKeywords();
  const skills = PRIORITY.filter((k) => kws.some((t) => t.includes(k) || k.includes(t)));
  const qs = [];
  ROLE_PATTERNS.forEach((r, i) => qs.push(skills[i] ? `${r} ${skills[i]}` : r));
  for (const s of skills.slice(ROLE_PATTERNS.length)) qs.push(`Product Manager ${s}`);
  return [...new Set(qs)].slice(0, Math.max(5, max));
}

/** Run fn over queries one at a time with a configurable gap (rate limiting). Returns timestamps for verification. */
export async function runSequential(queries, fn, delayMs = settings().http.aggregator_delay_ms) {
  const results = []; const timestamps = [];
  for (let i = 0; i < queries.length; i++) {
    if (i) await sleep(delayMs);
    timestamps.push(Date.now());
    try { results.push(...(await fn(queries[i]))); } catch (e) { results.push({ error: e.message, query: queries[i] }); }
  }
  return { results: results.filter((r) => !r.error), errors: results.filter((r) => r.error), timestamps };
}
