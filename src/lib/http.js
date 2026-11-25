// Single HTTP choke point: timeouts, retries, excluded-host enforcement and a request audit log.
// The audit log backs TC-108 (no direct Indeed/Naukri), TC-504 (no paid keys) and TC-104/112 (no model calls).
import { settings } from './config.js';

export const audit = [];
export function resetAudit() { audit.length = 0; }

const MODEL_HOSTS = ['api.anthropic.com', 'api.openai.com', 'generativelanguage.googleapis.com'];

export class HttpError extends Error {
  constructor(status, url, body) { super(`HTTP ${status} for ${url}`); this.status = status; this.url = url; this.body = body; }
}

export async function http(url, opts = {}) {
  const cfg = settings();
  const u = new URL(url);
  if (cfg.excluded_hosts.includes(u.hostname)) throw new Error(`Blocked: ${u.hostname} is an excluded source (NFR-7)`);
  if (MODEL_HOSTS.includes(u.hostname) && !opts.allowModel) throw new Error(`Blocked: model endpoint ${u.hostname} not allowed in deterministic tier`);
  const { method = 'GET', headers = {}, body, json, timeout = cfg.http.timeout_ms, retries = 1, as = 'json', tag } = opts;
  const init = {
    method,
    headers: { 'User-Agent': cfg.http.user_agent, Accept: as === 'json' ? 'application/json' : '*/*', ...headers },
    redirect: 'follow',
  };
  if (json !== undefined) { init.body = JSON.stringify(json); init.headers['Content-Type'] = 'application/json'; }
  else if (body !== undefined) init.body = body;

  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const started = Date.now();
    const entry = { url: redact(url), host: u.hostname, method, tag, at: new Date().toISOString() };
    audit.push(entry);
    try {
      const res = await fetch(url, { ...init, signal: AbortSignal.timeout(timeout) });
      entry.status = res.status; entry.ms = Date.now() - started;
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        const err = new HttpError(res.status, redact(url), text.slice(0, 300));
        if (res.status >= 500 || res.status === 429) { lastErr = err; await sleep(Math.min(Number(res.headers.get('retry-after')) * 1000 || 1500 * 2 ** attempt, 15000)); continue; }
        throw err;
      }
      if (as === 'text') return await res.text();
      if (as === 'response') return res;
      const text = await res.text();
      try { return JSON.parse(text); } catch { throw new HttpError('INVALID_JSON', redact(url), text.slice(0, 200)); }
    } catch (e) {
      entry.status ??= e.name === 'TimeoutError' ? 'TIMEOUT' : 'ERR';
      lastErr = e;
      if (e instanceof HttpError && e.status !== 429 && !(e.status >= 500)) throw e;
      if (attempt < retries) await sleep(500 * (attempt + 1));
    }
  }
  throw lastErr;
}

// never write API keys into logs
function redact(url) {
  return url.replace(/(app_key|app_id|key|token|api_key)=[^&]+/gi, '$1=***');
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx], idx); }
  });
  await Promise.all(workers);
  return out;
}
