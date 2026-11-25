// JSON state committed to the repo by the workflow (FR-1.9, FR-2.3). No local-only state.
import { readJson, writeJson } from './config.js';

const FILE = 'data/state.json';
const EMPTY = { version: 1, listings: {}, pm_counts: {}, ats_cache: {}, company_flags: {}, runs: [] };

export const loadState = (file = FILE) => ({ ...structuredClone(EMPTY), ...readJson(file, EMPTY) });
export const saveState = (state, file = FILE) => writeJson(file, state);
