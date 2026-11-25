// Entry point for the GitHub Actions cron (07:00 / 19:00 IST). Sends the digest; exits non-zero on fatal error.
import { runDiscovery } from '../pipeline/run.js';
import { digestEmail } from '../email/templates.js';
import { log } from '../lib/log.js';

const args = process.argv.slice(2);
const noGoogle = args.includes('--no-google');
const only = args.find((a) => a.startsWith('--sources='))?.split('=')[1].split(',');
const runUrl = process.env.GITHUB_RUN_ID ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}` : null;

try {
  const { summary } = await runDiscovery({ google: !noGoogle, sources: only });
  log.info(`Run complete in ${(summary.durationMs / 1000).toFixed(0)}s: fetched ${summary.totalFetched}, matched ${summary.matched}, dedup -${summary.dedupRemoved}, new ${summary.newListings}, above threshold ${summary.aboveThreshold}`);
  for (const f of summary.failures) log.annotate('warning', `${f.source}: ${f.error}`);
  if (!noGoogle) await sendDigest({ ...summary, runUrl, pendingApprovals: summary.pendingApprovals ?? summary.aboveThreshold, assetsToReview: summary.assetsToReview ?? 0, pendingActions: summary.pendingActions ?? summary.aboveThreshold });
  // A Google failure means the owner sees nothing — make the run red so it shows on GitHub.
  if (summary.googleError) { log.annotate('error', `Google publish failed: ${summary.googleError}`); process.exitCode = 1; }
} catch (e) {
  log.error(e.stack || e.message);
  log.annotate('error', `Discovery run failed: ${e.message}`);
  await sendDigest({ fatal: e.message, runUrl, newListings: 0, aboveThreshold: 0, pendingActions: 0, pendingApprovals: 0, assetsToReview: 0, runAt: new Date().toISOString() });
  process.exitCode = 1;
}

async function sendDigest(s) {
  try {
    const { hasGoogle } = await import('../google/auth.js');
    if (!hasGoogle()) return log.warn('Digest not sent: Google OAuth not configured');
    const { sendEmail } = await import('../google/gmail.js');
    await sendEmail(digestEmail(s));
    log.info('Digest email sent');
  } catch (e) { log.error(`Digest email failed: ${e.message}`); log.annotate('error', `Digest email failed: ${e.message}`); process.exitCode = 1; }
}
