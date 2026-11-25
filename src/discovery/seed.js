// JSF-101: seed list loader + schema validation (no external schema lib; explicit checks).
import { readJson } from '../lib/config.js';

export const SEED_SCHEMA = { name: 'string', remote_global: 'boolean', india_gcc: 'boolean', visa_sponsor: 'boolean', india_presence: 'boolean' };

export function validateSeed(list) {
  const errors = [];
  if (!Array.isArray(list)) return ['seed list must be a JSON array'];
  list.forEach((c, i) => {
    for (const [k, t] of Object.entries(SEED_SCHEMA)) {
      if (!(k in c)) errors.push(`[${i}] ${c.name ?? '?'}: missing ${k}`);
      else if (typeof c[k] !== t) errors.push(`[${i}] ${c.name ?? '?'}: ${k} must be ${t}, got ${c[k] === null ? 'null' : typeof c[k]}`);
    }
  });
  const names = list.map((c) => c.name?.toLowerCase());
  names.forEach((n, i) => { if (names.indexOf(n) !== i) errors.push(`duplicate company ${n}`); });
  return errors;
}

export function loadSeed(file = 'config/companies.json') {
  const list = readJson(file);
  const errors = validateSeed(list);
  if (errors.length) throw new Error(`Seed list invalid:\n${errors.join('\n')}`);
  return list;
}
