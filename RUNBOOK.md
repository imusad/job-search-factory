# Job Search Factory — Runbook

Every procedure here can be done from an **iPad** (Safari + the Google apps). Nothing runs on, or needs, the Mac.

## Contents

1. [How the system runs](#1-how-the-system-runs)
2. [Daily use](#2-daily-use)
3. [Failed run](#3-failed-run)
4. [Expired or revoked token](#4-expired-or-revoked-token)
5. [API errors by source](#5-api-errors-by-source)
6. [Pause and resume the system](#6-pause-and-resume-the-system)
7. [Credentials and where they live](#7-credentials-and-where-they-live)
8. [Pre-launch checklist](#8-pre-launch-checklist)
9. [Tuning](#9-tuning)

---

## 1. How the system runs

| What | Where it runs | When |
|---|---|---|
| Discovery → scoring → Sheet → digest email | GitHub Actions (`.github/workflows/discovery.yml`) | 07:00 and 19:00 IST (01:30 / 13:30 UTC) |
| Semantic scoring of the top 50 | Claude scheduled task "JSF semantic scoring" (`claude/semantic-scoring.md`) | 02:07 and 14:07 UTC |
| Asset generation | Claude scheduled task "JSF asset generation" (`claude/asset-generation.md`), API trigger only | When you set a row to **Approved** |
| 30-minute safety sweep | Google Apps Script time trigger in the tracker Sheet (`apps-script/Code.gs`) | Every 30 min. It fires only if approved rows still have no assets |

State lives in three places only: the GitHub repo (`data/`), the Google Sheet, and Google Drive.

## 2. Daily use

1. Open the digest email in the Gmail app. It shows how many listings are new, how many are above the threshold, and an estimate of the minutes needed to clear them.
2. Tap **Open tracker**. In the Sheets app, set **Approval** to `Approved` or `Not Approved`.
3. Within about 5 minutes a confirmation email arrives with a link to the Drive folder. It holds the resume (Doc and PDF), the cover letter, the LinkedIn message, the company info sheet, the case-study deck, the Selection Log and the ATS answer pack.
4. Review the resume using its Selection Log, especially every line marked `GEN`. Then apply yourself. Nothing is ever submitted or sent for you.

## 3. Failed run

**Symptoms:** a digest with the subject `⚠️ FAILED`, no digest at 07:00 or 19:00, or a red ✗ on GitHub.

1. In Safari, open `github.com/<you>/job-search-factory` → **Actions** → **Discovery** → the red run.
2. The run's summary page lists annotations such as `greenhouse:Stripe: HTTP 404`. Open the **Run discovery** step for the full log.
3. Decide what kind of failure it is:
   - **One source failed** (a warning annotation, while the run itself is green): no action is needed. Each source is isolated, and it usually recovers by the next run. If it fails for 3 days in a row, see §5.
   - **Google publish failed** (`invalid_grant`, `401`, `403`): see §4.
   - **The run crashed** (red, with an error annotation): press **Re-run all jobs**. If it fails again, open a Claude Code cloud session from the Claude iOS app on this repo and paste in the error.
4. To run it immediately: **Actions** → **Discovery** → **Run workflow**.

## 4. Expired or revoked token

**Google** (the error says `invalid_grant` or `Token has been expired or revoked`):

> Refresh tokens issued while the OAuth consent screen is in **Testing** mode expire after **7 days**. The app must be set to **In production** (see §8). Being unverified is fine for a single user.

1. In Safari, open `myaccount.google.com` → **Security** → **Third-party apps with account access**. Remove "Job Search Factory" if it is listed.
2. Get a new refresh token. You can do this from the iPad by starting a Claude Code cloud session on this repo and asking it to run `npm run oauth` with your client ID and secret. Open the URL it prints, approve, and copy the code from the redirect. Or, if the Mac is still available, run `GOOGLE_CLIENT_ID=… GOOGLE_CLIENT_SECRET=… npm run oauth` there.
3. On GitHub, open the repo → **Settings** → **Secrets and variables** → **Actions** → **GOOGLE_REFRESH_TOKEN** → **Update**.
4. Update the same value in the Claude cloud environment: claude.ai/code → Environments → "job-search-factory" → Environment variables.
5. **Actions** → **Discovery** → **Run workflow** to confirm it works.

**Claude routine token** (the Apps Script log shows `HTTP 401`):
1. claude.ai/code/routines → "JSF asset generation" → API trigger → **Regenerate token** (the old token stops working).
2. Open the tracker Sheet. On iPad you need the desktop site in Safari (Extensions are not available in the app): **Extensions** → **Apps Script** → **Project Settings** → **Script Properties** → update `CLAUDE_FIRE_TOKEN`.

**Adzuna / JSearch keys**: regenerate the key at developer.adzuna.com or rapidapi.com (JSearch) and update `ADZUNA_APP_ID`, `ADZUNA_APP_KEY` and `JSEARCH_API_KEY` in GitHub Secrets.

## 5. API errors by source

| Error | Meaning | Action |
|---|---|---|
| `HTTP 404` on greenhouse / lever / ashby | The company moved to a different ATS or changed its slug | Delete that company's entry from `data/state.json` → `ats_cache` (it is re-detected), or fix `ats_config` in `config/companies.json` |
| `HTTP 429` on workday / workable | The source is rate-limiting this client | No action. These roles still reach you through JSearch. Lowering `http.concurrency` in `config/settings.json` can help |
| `HTTP 401` / `403` on adzuna / jsearch | The key is wrong, or the free quota is used up | Check the key in GitHub Secrets and your quota on the provider dashboard |
| `not configured (OD-5) — skipped` | The aggregator keys are missing | Add the keys (see §7) |
| `UK sponsor register CSV link not found` | gov.uk changed the page layout | The visa flags fall back to the seed values. Update the regex in `src/discovery/visaRegister.js` |
| `Assets failed validation` (routine log) | Generated content broke a rule (300 characters, R5, bullet count…) | The routine fixes it and retries on its own. If it is still stuck, run it again with **Run now** |

## 6. Pause and resume the system

**Pause everything:**
1. GitHub → **Actions** → **Discovery** → **⋯** → **Disable workflow**.
2. claude.ai/code/routines → pause both "JSF" routines.
3. Sheet → **Extensions** → **Apps Script** → **Triggers** (clock icon) → delete both triggers. To pause approvals only, this step on its own is enough.

**Resume:** re-enable the workflow, un-pause the routines, and in Apps Script run `setup` once to reinstall the triggers.

**Pause only the email digest:** delete the `OWNER_EMAIL` secret. The digest step logs a warning and the run stays green.

## 7. Credentials and where they live

| Credential | Stored in | Used by | Refresh path (iPad) |
|---|---|---|---|
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | GitHub Secrets, plus the Claude environment's variables | Discovery, semantic scoring, assets | console.cloud.google.com → APIs & Services → Credentials |
| `GOOGLE_REFRESH_TOKEN` | GitHub Secrets, plus the Claude environment's variables | Same | §4 |
| `OWNER_EMAIL` | GitHub Secrets, plus the Claude environment's variables | Digest and confirmation emails | Edit the secret |
| `ADZUNA_APP_ID`, `ADZUNA_APP_KEY` | GitHub Secrets | Discovery (aggregator) | developer.adzuna.com |
| `JSEARCH_API_KEY` | GitHub Secrets | Discovery (aggregator) | rapidapi.com → JSearch → Apps |
| `CLAUDE_FIRE_URL`, `CLAUDE_FIRE_TOKEN` | Apps Script → Script Properties | Approval trigger and sweep | §4 |
| Claude Pro subscription | Your claude.ai account | Both routines | claude.ai/settings |

Values in the Claude environment can be read by anyone who has access to that environment, which here is only you. Never paste secrets into issues, commits or chat.

## 8. Pre-launch checklist

- [ ] Google Cloud → OAuth consent screen → **Publishing status: In production** (otherwise the token expires after 7 days).
- [ ] claude.ai → Settings → Usage: **usage credits disabled** (FR-5.6). With credits on, a run that exhausts the Pro allowance keeps going at metered API rates.
- [ ] Every secret in §7 is set. `Actions` → `Discovery` → `Run workflow` finishes green and a digest arrives.
- [ ] Apps Script `setup` has run. `testFire` returns HTTP 200 in the Apps Script log.
- [ ] `config/profile.json`: the `TODO` fields (visa status, notice period, salary) are filled in.
- [ ] `config/forbidden_terms.json`: real client names are added (rule R5).
- [ ] One-week quota pilot (OD-6) watched at claude.ai/settings/usage.

## 9. Tuning

All in `config/settings.json`. No code changes are needed.
- Target titles: `titles.include` (OD-2: Director and Head of Product are included).
- Scoring weights (OD-1): `weights`.
- "Above threshold" for the digest: `thresholds`.
- Run times: the two `cron` lines in `.github/workflows/discovery.yml` (IST minus 5:30 gives UTC). After two weeks, use the **Run-time optimisation report** workflow (JSF-503) to choose new times.
