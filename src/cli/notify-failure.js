// Called by the workflow's `if: failure()` step so a crash before the digest still reaches the owner (TC-706).
import { sendEmail } from '../google/gmail.js';
import { digestEmail } from '../email/templates.js';
const runUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
try {
  await sendEmail(digestEmail({ fatal: process.argv[2] || 'Workflow step failed (see log)', runUrl, newListings: 0, aboveThreshold: 0, pendingActions: 0, pendingApprovals: 0, assetsToReview: 0, runAt: new Date().toISOString() }));
} catch (e) { console.error(`Could not send failure email: ${e.message}`); process.exitCode = 1; }
