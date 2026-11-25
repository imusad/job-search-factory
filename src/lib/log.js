const ts = () => new Date().toISOString();
const quiet = () => process.env.JSF_QUIET === '1';
export const log = {
  info: (...a) => { if (!quiet()) console.log(`[${ts()}]`, ...a); },
  warn: (...a) => { if (!quiet()) console.warn(`[${ts()}] WARN`, ...a); },
  error: (...a) => console.error(`[${ts()}] ERROR`, ...a),
  // GitHub Actions annotation so failures are visible on the run summary page (iPad Safari)
  annotate: (level, msg) => { if (process.env.GITHUB_ACTIONS) console.log(`::${level}::${msg.replace(/\n/g, ' ')}`); },
};
