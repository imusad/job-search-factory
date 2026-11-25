# Manual and handover test steps

These Test Script steps need a person, an iPad or a powered-off Mac, so they can't be automated. Record each result as Pass or Fail with the date.

| TC | Step(s) | How to run | Result |
|---|---|---|---|
| TC-303 | 1–2 | Open the Sheet in the iPad Sheets app. The Approval cell shows a dropdown with Approved / Not Approved. Typing free text is rejected | |
| TC-401 | 1 | Set a row to Approved. In Apps Script, open **Executions** and check that `onApprovalEdit` logged `HTTP 200` within 5 seconds | |
| TC-401 / TC-502 | 2, 4 | Approve 3 rows while the trigger is deleted (simulates offline). Reinstall it with `setup`. The sweep picks up all 3 within 30 minutes | |
| TC-402 | 6–7 | Open the resume PDF in Drive. It is one page and the six story rows appear in order | |
| TC-501 | 3 | After one week, check GitHub → Settings → Billing → Actions minutes. Expect under 600 minutes a month | |
| TC-501 / TC-704 | 4 | Start a run from Actions → Discovery → Run workflow, then power off the Mac. The run goes green and new rows appear in the Sheet on iPad | |
| TC-503 | 1–2 | After 14 days, run Actions → Run-time optimisation report and read the summary table | |
| TC-504 | 2 | claude.ai → Settings → Usage: usage credits are **disabled** | |
| TC-601 / TC-603 | 2, 1–3 | Open the digest in the iPad Gmail app. There is no horizontal scroll, every number is visible, and **Open tracker** opens the Sheets app | |
| TC-604 | 2 | Open the confirmation email on iPad. The folder link opens Drive and shows 5 assets plus the PDF, Selection Log and answer pack | |
| TC-702 | 3 | Follow RUNBOOK §4 in iPad Safari to refresh one credential | |
| TC-703 | 1–5 | Sheets (filter, sort, dropdown), Drive (open, share), Docs (export PDF), Slides (present), Gmail (links) all work on iPadOS | |
| TC-705 | 1–3 | Approve a row on iPad. Within 5 minutes Drive shows a folder with 5 assets | |
| TC-706 | 1–3 | Set the `JSEARCH_API_KEY` secret to `invalid` and run the workflow. The Actions annotations show `jsearch: HTTP 403` and the digest lists the failed source. Restore the key afterwards | |
| TC-707 | 2–4 | Walk through RUNBOOK §3, §4 and §6 in iPad Safari | |

## Steps that are not reproducible as written

- **TC-109 step 4, TC-112 step 4, TC-202 step 4, TC-504 step 3** quote counts from the original prototype dataset (7,286 → 7,184; 186 of 1,235; 0.7%). That dataset isn't in the repo. The mechanisms are covered by unit tests. After the first live week, compare the numbers in `data/last-run.json` (`corpus`, `matched`, `dedupRemoved`, `shortlist`) against these figures.
- **TC-107 step 4** expects about 438 Salesforce listings. The live count changes daily and depends on Workday access (see the README's known limitations).
