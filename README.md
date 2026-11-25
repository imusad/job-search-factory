# Job Search Factory

This system finds Senior, AI, Group and Principal PM and Product Lead roles twice a day. It scores them, writes them to a Google Sheet tracker, and emails a digest. When a row is set to **Approved**, Claude generates five tailored application assets in Google Drive. Everything runs in the cloud and can be operated from an iPad.

It is built from *Solution Design v1.0*, *Jira Stories* (42 stories, EPIC-1 to EPIC-7) and *Test Scripts* (TC-101 to TC-707).

```
GitHub Actions cron 01:30 / 13:30 UTC (07:00 / 19:00 IST)        ← .github/workflows/discovery.yml
  → ~32 sources: 7 ATS APIs · Adzuna/JSearch · 7 JSON boards · 3 RSS · 12 HTML boards
  → title filter (\b regex) → dedup (employer|normalised title) → first-seen / ghost risk
  → work model (two-pass) → Phase-1 deterministic score (55%) → single ranked list
  → Google Sheet (append/update, Approval never written) → HTML digest (Gmail)
  → data/shortlist.json (top 50) committed
Claude routine "semantic scoring" 02:07 / 14:07 UTC              ← claude/semantic-scoring.md
  → experience (30%) + domain (15%) with line citations → validated → Sheet
Owner sets Approval = Approved (iPad Sheets app)
  → Apps Script onEdit (+ 30-min sweep) → POST routine /fire      ← apps-script/Code.gs
  → Claude routine "asset generation"                              ← claude/asset-generation.md
  → validated assets.json → Drive "Job Search Factory/Applications/<Company> — <Title> (<date>)":
    resume (Doc+PDF, 1 page), cover letter, LinkedIn msg,
    company info, case-study deck (Slides), Selection Log, answer pack → Sheet link → confirmation email
```

## Layout

| Path | Purpose |
|---|---|
| `config/settings.json` | Titles, weights, thresholds, rate limits. All tuning lives here |
| `config/companies.json` | Curated seed list (43 companies) with flags and ATS config |
| `config/domains.json` | Product-domain taxonomy for the deterministic fit scorer |
| `config/profile.json` | Canonical profile for the ATS answer pack (fill in the TODOs) |
| `config/forbidden_terms.json` | R5 blocklist of real client names and internal codes |
| `experience/master.md` | Master experience file, the only source of truth for generated content |
| `src/` | Pipeline (`pipeline/`, `ats/`, `sources/`, `discovery/`, `scoring/`, `google/`, `assets/`, `email/`, `cli/`) |
| `data/` | Committed state: first-seen dates, PM-count history, ATS cache, shortlist, stored JDs, Sheet and folder IDs |
| `apps-script/Code.gs` | Approval trigger and 30-minute safety sweep |
| `claude/` | Routine prompts, plus an example `assets.json` contract |
| `tests/unit` · `tests/live` · `tests/google` · `tests/MANUAL.md` | Offline · live endpoints · Google integration · iPad/handover gates |

## Commands

```bash
npm test                  # 41 offline unit tests (TC-101..TC-707)
npm run test:live         # live endpoint checks (network)
npm run test:google       # Google integration (needs GOOGLE_* + OWNER_EMAIL env)
npm run discover -- --no-google   # full discovery dry run without Sheet/email
npm run oauth -- url      # Google sign-in link (works from iPad Safari)
npm run oauth -- exchange <code>   # turn the code into a refresh token
npm run assets:validate -- claude/assets.example.json
```

Operations, credentials and failure handling are covered in [RUNBOOK.md](RUNBOOK.md).
