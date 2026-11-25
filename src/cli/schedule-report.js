// JSF-503: after ~2 weeks, find posting-time clusters from first_seen timestamps and recommend cron times.
import { loadState } from '../lib/state.js';

export function postingClusters(state, { days = 14, now = new Date() } = {}) {
  const since = now - days * 864e5;
  const runs = (state.runs || []).filter((r) => new Date(r.at) >= since);
  const byHour = Array(24).fill(0);
  for (const r of runs) byHour[new Date(new Date(r.at).getTime() + 5.5 * 3600e3).getUTCHours()] += r.new || 0;
  // listings first seen in a run were posted between the previous run and this one: attribute to that window
  const windows = runs.map((r, i) => ({ end: r.at, start: runs[i - 1]?.at || null, new: r.new || 0 }));
  const ist = (d) => new Date(new Date(d).getTime() + 5.5 * 3600e3).toISOString().slice(11, 16);
  const byWindow = {};
  for (const w of windows) { const k = `${w.start ? ist(w.start) : '—'}→${ist(w.end)} IST`; byWindow[k] = (byWindow[k] || 0) + w.new; }
  const ranked = Object.entries(byWindow).sort((a, b) => b[1] - a[1]);
  return { runs: runs.length, newByRunHourIST: byHour, windows: ranked };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = postingClusters(loadState());
  console.log(`# Run-time optimisation report\n\nRuns analysed: ${r.runs} (last 14 days)\n\n| Arrival window (IST) | New listings |\n|---|---|`);
  for (const [w, n] of r.windows) console.log(`| ${w} | ${n} |`);
  const top = r.windows.slice(0, 3).map(([w]) => w.split('→')[1]);
  console.log(`\n**Recommendation:** the windows ending at ${top.join(', ')} carry the most new postings. To move the schedule, edit the two cron lines in .github/workflows/discovery.yml (IST − 5:30 = UTC).`);
  if (r.runs < 20) console.log('\n_Fewer than 20 runs recorded — collect two full weeks before changing the schedule._');
}
