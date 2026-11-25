import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const p = (...parts) => path.join(ROOT, ...parts);

export function readJson(rel, fallback) {
  const file = path.isAbsolute(rel) ? rel : p(rel);
  if (!fs.existsSync(file)) {
    if (fallback !== undefined) return structuredClone(fallback);
    throw new Error(`Missing required file: ${rel}`);
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function writeJson(rel, data) {
  const file = path.isAbsolute(rel) ? rel : p(rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

let cached;
export function settings() {
  cached ??= readJson('config/settings.json');
  return cached;
}

export const env = (name, required = false) => {
  const v = process.env[name];
  if (required && !v) throw new Error(`Environment variable ${name} is not set (see RUNBOOK.md → Credentials)`);
  return v || undefined;
};
