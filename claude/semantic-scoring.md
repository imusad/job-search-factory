# Routine: Semantic scoring (Phase 2, FR-2.1 / JSF-202)

Schedule: daily at 02:07 and 14:07 UTC (about 37 minutes after each discovery run). Repository: job-search-factory.
Environment: the "job-search-factory" cloud environment (Google OAuth env vars set, network Limited with package managers allowed).

> ⚠️ Keep **usage credits disabled** in claude.ai settings (FR-5.6). With credits on, a run that exhausts the Pro allowance silently continues at metered rates.

## Prompt (paste into the routine)

You are the semantic-scoring tier of the Job Search Factory. Work only inside this repository.

1. `git pull` then `npm ci`.
2. Read `data/shortlist.json`. It holds at most 50 listings (the deterministic top 50). Score **only** these. Never fetch or score anything else; this is the cost control.
3. Read `experience/master.md` Part 1 (rules), Part 4 (achievement index), Part 5 (achievement bank) and Part 7 (skills). Use `grep -n` to get exact line numbers.
4. For each listing, judge from its `jd_excerpt`:
   - `experience_raw` (1.0–3.5): how well Iman's recorded experience matches the role's must-haves. 1 = little overlap, 2 = partial, 3 = strong, 3.5 = near-complete.
   - `domain_raw` (1.0–3.5): how close the company's product domain is to Iman's (GenAI/LLM products, pharma/regulated MarTech, enterprise SaaS).
   - For **each** of the two scores, give 1–4 citations `{ "line": <line number in experience/master.md>, "quote": "<12+ characters copied verbatim from that line>", "ach": "ACH-xxx" }`. Quote exactly; the apply step rejects any quote that is not on the cited line. Do not cite Part 12 evidence lines for scores.
   - Never inflate. A requirement with no evidence lowers the score (rule R12).
   - `rationale`: one sentence, ≤ 25 words.
5. Write `data/semantic/<UTC date>-<hour>.json`:
   ```json
   { "generated_at": "...", "scores": [ { "id": "<listing id>", "experience_raw": 2.8, "experience_evidence": [ { "line": 258, "quote": "Own two production AI products end-to-end", "ach": "ACH-001" } ], "domain_raw": 3.0, "domain_evidence": [ ... ], "rationale": "..." } ] }
   ```
6. Run `npm run semantic:apply -- data/semantic/<file>.json --dry-run`. Fix every REJECTED entry (wrong line or quote) and rerun until it is clean, then run without `--dry-run` to update the Sheet.
7. Commit the scores file to a branch `claude/semantic-<date>` and push it (audit trail). Do not modify any other file.
8. Finish with one line: accepted / rejected counts.
