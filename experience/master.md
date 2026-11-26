# Master Document for Experience: Iman Sadhu

**Last updated:** 25 Nov 2026 (reconciled against Iman's finalised GPM resume: team reverted to 3 (2 PMs, 1 BA) from the briefly-recorded 5; suite reverted to 3 products from 4; first-product users corrected to 0 to 30+ from 0 to 200+; Client A markets corrected to 10 from 7; Client D resume wording changed to "a UK biopharmaceutical company"; Client F (BI) resume wording changed to "a major German biopharmaceutical company" — flagged for Iman to confirm, as it narrows the anonymising effect. Superseded prior 13 Nov 2026 update: ACH-078 to ACH-086 knowledge-graph and upstream-retrieval experience from Copilot dump; glossary, metrics, keywords and gap updates)
**Purpose:** Single source of truth for Iman Sadhu's work experience. Tailored resumes are generated from this file for specific job listings. New context is added over time (Part 11).
**Built from:** (1) resume "Iman Sadhu Senior PM Resume.docx", (2) Copilot retrieval files 1 and 2 (emails, Teams chats and channels, meeting recaps and transcripts, 1 Aug to 12 Oct 2026), (3) the full transcript of the 17 Sep 2026 determinism-testing meeting, (4) the resume strategy file (Oct 2026), (5) a Copilot dump on vector-database and semantic-retrieval work (meeting notes from Jul to Oct 2025 and Sep 2026; SRC-5), (6) a second Copilot dump on RAG, explainability, agents and observability (SRC-6), (7) six transition-activity files (banner and email releases; SRC-7), (8) a Copilot dump of Iman's interactions with the Business Analyst (SRC-8), (9) Iman's value-summary card and confirmations of 13 to 14 Oct 2026 (SRC-9), (10) the client's cost-saved dashboards for Client D, 2022 to Aug 2026 (33 screenshots) and the 8-page business impact report built from them (SRC-10), (11) Iman's agentic email-authoring deck presented to the business team on 17 Sep 2026 (SRC-11), (12) Iman's stylization-pipeline I/O and testing deck, 29 Jul 2026 (SRC-12), (13) a Copilot dump on knowledge-graph, upstream-retrieval and content-relationship work (emails, Teams chats, meeting transcripts, files, Mar 2026 to Oct 2026; SRC-14).

## How this file is organised

| Part | What it holds | Read it when |
|---|---|---|
| 1 | Rules and workflow for AI assistants | Always, first |
| 2 to 3 | Profile, summary variants, roles and dates | Writing any resume |
| 4 to 5 | Achievement index and the full bank, grouped by theme | Choosing and wording bullets |
| 6 | Metrics, marked RESULT or TARGET | Checking numbers |
| 7 to 9 | Skills and keywords, client aliases and glossary, leadership profile, education | Tailoring and wording |
| 10 | Resume strategy playbook and base one-page resume | Reviewing a draft |
| 11 | Known gaps and how to add new entries | Updating this file |
| 12 | Verbatim evidence | Verifying a claim only |

## Contents

1. [Read first: instructions for AI assistants](#1-read-first-instructions-for-ai-assistants)
2. [Profile](#2-profile)
3. [Roles](#3-roles)
4. [Achievement quick-pick index](#4-achievement-quick-pick-index)
5. [Achievement bank, by theme](#5-achievement-bank-by-theme)
   - 5.1 [Ownership and business impact](#51-ownership-and-business-impact)
   - 5.2 [GenAI, evaluation and responsible AI](#52-genai-evaluation-and-responsible-ai)
   - 5.3 [Product development and release management](#53-product-development-and-release-management)
   - 5.4 [Technical depth](#54-technical-depth)
   - 5.5 [Stakeholder management](#55-stakeholder-management)
   - 5.6 [Leadership and people](#56-leadership-and-people)
   - 5.7 [AI tools and innovation](#57-ai-tools-and-innovation)
   - 5.8 [Product Manager role, 2020 to 2025](#58-product-manager-role-2020-to-2025)
   - 5.9 [Earlier career, 2014 to 2020](#59-earlier-career-2014-to-2020)
6. [Metrics bank](#6-metrics-bank)
7. [Skills, keywords and tags](#7-skills-keywords-and-tags)
8. [Clients, products and glossary](#8-clients-products-and-glossary)
9. [Leadership and stakeholder profile, and education](#9-leadership-and-stakeholder-profile-and-education)
10. [Resume strategy playbook](#10-resume-strategy-playbook)
11. [Gaps and how to add new context](#11-gaps-and-how-to-add-new-context)
12. [Evidence appendix (verbatim)](#12-evidence-appendix-verbatim)

---

## 1. Read first: instructions for AI assistants

> If you are an AI assistant using this file to write or tailor a resume or cover letter, follow Part 1 exactly. Parts 2 to 11 are data. Part 12 is evidence for checking only.
>
> **Style reference (set 25 Nov 2026, Iman):** `experience/style-reference.md` holds Iman's finalised resume. It is the approved standard for story writing, depth, voice and layout, and overrides the "do not open earlier resumes" line below for those purposes only. Facts still come only from this file.
>
> **Sources (set 18 Oct 2026, Iman):** build every resume and cover letter only from `CLAUDE.md` and this file. Do not open, compare with, copy from or reuse any earlier resume, cover letter, template file or application folder, and do not build from an existing .docx. Layout is defined in Part 10.9. Generated lines (R14) in any earlier resume are not evidence and are never read or reused. The only other inputs are the job listing and the product research in step 1b.

### 1.1 Workflow

1. **Read the job listing.** Extract must-haves, nice-to-haves, seniority signals, domain (pharma, AI, SaaS, consumer) and keywords.
1b. **Product research brief (gated; added 18 Oct 2026).** Before selecting any evidence, write `Job search/Applications/<Company>/Product brief.md` (one page; this is the one file the step writes, and it is not read for any other application). Cover: (a) what the product is, who uses it, its core capabilities and how it works (the listing first; if it says little, the company site, product pages and docs); (b) competitors and positioning; (c) company stage, PM type (growth, platform, 0-to-1, enterprise, AI) and whether it is regulated; (d) recent launches, funding and strategy shifts, each with source and date, never invented. End with a **capability map**: 4 to 6 product capabilities, each mapped to specific ACH IDs in Iman's evidence with a one-line reason, and a flag where the match is weak or missing (R12). Do not select evidence or write a summary until the brief exists. The brief decides which AI points lead, the row titles and order (R11), and the KPI tiles.
1c. **Keyword extraction (R15; added 26 Nov 2026).** Before selecting evidence, extract every term from the listing in its own wording and keep the list for steps 4b and 4d. Save the listing text beside the bundle as `out/<id>/listing.json` (`full_description`), so the validator can confirm every term came from the listing.
2. **Scan Part 4** (the quick-pick index). Match listing requirements to Tags, Theme and Role. List requirements with no match and say so. Do not stretch facts; you may add generated lines under R14, never as a replacement for a fact.
3. **Pick achievements.** Prefer entries that match the most must-haves. Use `USE` entries first, then `USE-SOFT`. Skip `CONFIRM-FIRST` entries unless the user confirmed them in this conversation.
3b. **Anchor plus variable (replaces "include everything"; 18 Oct 2026).** Two parts.
   - **Anchor, on every resume:** suite revenue (ACH-064), cumulative cost savings (ACH-069), the team and leadership facts (ACH-060), and the AI credibility core: production LLM ownership (ACH-001), evaluation (ACH-002, ACH-074), deterministic testing (ACH-044), explainability (ACH-003, ACH-013). These are near-universal credibility signals (Part 10.1 Gate 5); step 2's "no match" filter must not drop them. AI evidence keeps priority over every other theme.
   - **Variable, chosen per product:** all other evidence is ranked by the capability map from step 1b. Lead with the 3 to 5 AI points that best mirror the product's capabilities and say them in the product's terms where the evidence supports it. Evidence that does not serve this product may be cut; never pad. Fit the page by cutting the least relevant evidence first, then by tightening words (R8).
   - **Highlight for review:** in the .docx, highlight yellow every generated line or phrase (R14 types G1 and G2). Do not highlight plain facts, including facts reworded for length or order. The hand-over note lists each highlighted line with the reason and the ACH ID. Highlights appear in the review .docx only; the clean PDF is made after Iman approves.
   - **Fresh-build rule (replaces the old sameness check; 18 Oct 2026):** never look at earlier resumes, so build each one from facts, not from phrasing. Write every bullet from the entry's facts in Part 5 and the product brief's capability map, and state which capability or listing requirement it answers (Selection log). If a bullet would read the same on a resume for any product, rewrite it around this product or cut it. Headline facts (revenue, savings, team) may repeat across resumes; their wording and the order they appear in must come from this product's brief. Do not copy the Part 2 summary variants verbatim; write the summary from the brief.
4. **Write bullets** from each entry's facts, not its sentence structure. Long fields are records (most run 35 to 70 words) and are not resume copy; rewrite every bullet to R9. Adopt the listing's wording only where the entry's evidence supports it (for example, "evaluation framework" may become "model quality framework").
4b. **Keyword pass.** Check the draft against the Part 7.2 keyword banks. Keep the AI core terms (LLM, deterministic testing, explainability, evaluation, guardrails, RAG where the evidence supports them) on every resume, and add other bank terms the evidence supports where the product or listing cares about them. Use the named concept, not a paraphrase (write "deterministic testing", not "proved it is deterministic"). Skills rows are reordered and renamed per product, not copied.
4c. **Generate pass (added 19 Oct 2026, R14).** After the fact bullets are written, use the brief's capability map to add generated lines that make the resume read as written for this product: G1 relevance lines and G2 implied-practice lines. Each cites the ACH ID it follows from, is highlighted yellow, and is listed in the hand-over with what Iman must confirm. Respect the R14 limits.
4d. **Keyword coverage and ATS check (R15, R16; added 26 Nov 2026).** Classify every extracted term `used` or `gap`. For each `used` term the exact wording must be on the resume, in the Skills block or Summary and, for core requirements, in a bullet; for each `gap` term record the reason and make sure it is not on the resume. Write the result to `keywords` in assets.json (`{term, status, where | reason}`), run `assets:validate`, and report the totals. Then confirm the ATS twin builds from the same content (R16).
5. **Check the draft** against the six gates in Part 10.1 and the length targets in R8.
6. **Output** the resume, then the Selection log and Open items (1.3).

### 1.2 Rules

| Rule | What to do |
|---|---|
| R1 | **Never invent facts.** Use only facts and numbers in Parts 2 to 9. Do not round, inflate, or combine metrics from different periods or sources. These classes can never be generated, even as highlighted content (R14): numbers, dates, durations, money amounts, job titles, employers, clients, tools and technologies, team sizes, results or outcomes, certifications, and domain experience or years in a domain. Qualitative content may be generated only under R14. |
| R2 | **Targets are never results.** Metrics marked TARGET in Part 6 are written as targets or left out. |
| R3 | **Flags.** `USE`: use freely. `USE-SOFT`: use the entry's own wording and no stronger verbs (do not write "led" if the entry says "participated"). `CONFIRM-FIRST`: ask the user first. `GEN`: a generated line under R14; it is never stored in Part 4 or 5 and is marked in the Selection log. |
| R4 | **Confidence.** Resume and High are usable. Medium and Low are usable only as `USE-SOFT`. In the closing note, list every used entry that rests on AI meeting notes. **Exception:** Iman accepted AI meeting notes as direct evidence on 13 Oct 2026 for ACH-055 to ACH-059; treat those as `USE`, still listed in the closing note. |
| R5 | **Clients.** Use the aliases in Part 8.1 only. Never output real client names. Never use internal programme codes (NCCA, NCCI, Peak D and similar); use the resume-safe wording in Part 8.2. Never call a client "top-5". **For Client A write exactly "a top-10 US biopharmaceutical company" on every resume-facing line (mandated by Iman, 14 Oct 2026). For Client D write exactly "a UK biopharmaceutical company" (updated 25 Nov 2026 per Iman's finalised GPM resume; supersedes the 14 Oct 2026 "a leading global biopharmaceutical company, US-headquartered" wording; its markets can be described as "20+ countries across Europe, the Middle East and beyond"). For Client F (BI) write exactly "a major German biopharmaceutical company" (updated 25 Nov 2026; supersedes "a major European biopharmaceutical company").** |
| R6 | **Team scaling and reports.** Write "scaled the cross-functional team" for the 3-to-26 claim; that team is not direct reports. Separately, Iman leads 3 people (2 Product Managers, 1 Business Analyst; confirmed 25 Nov 2026 on Iman's finalised GPM resume, reverting the "5 (4 PMs, 1 BA)" recorded 13 Oct to Nov 2026): write "lead a team of 3 (2 PMs, 1 BA)" and never extend it to the cross-functional team. Source of truth is the ACH-060 entry body. |
| R7 | **Titles and dates.** Take them from Part 3 only. The EY and Sprintly dates were corrected on 17 Oct 2026 (EY Consultant & Software Engineer ends Dec 2018); never use "Dec 2019" for them. **On the page (set 24 Nov 2026, Iman):** the two Indegene roles carry month dates. Every role in EARLIER EXPERIENCE is written year-only and in one consistent format — "EY, India | 2014 to 2018", "Sprintly Works, Finland | 2019", "EY, India | 2019 to 2020". This is accurate and it keeps the unexplained five-month 2019 gap (Part 3 note) off the page; Iman still answers for it in interview. **Education carries no years** (removes the graduation-year age signal). Part 3 and Part 9 keep the full month dates and years as the source of truth — this rule governs output only. |
| R8 | **Length.** One page, always (restated 27 Nov 2026, Iman: a resume that runs to two pages is rejected). **One page means one page with room to spare:** the fit test reserves `page_safety_lines` (3) blank 10 pt lines, so the page still holds in Word, Pages and Google Docs, whose line breaks differ (on 26 Nov 2026 two resumes each had under 2 lines of room and one spilled to page 2). The publisher cuts the highest-rank bullets until the padded test is one page, can go below the 20-bullet authoring minimum down to `resume_bullets_floor` (16) because one page outranks bullet count, never cuts the only carrier of a `used` keyword (R15), and refuses to publish if it still cannot fit. Judge length by lines, not bullet counts: the current role carries about 26 to 31 one-line bullets across its story rows (R11) (reduced from 30-36 on 24 Nov 2026, when body type went to 10 pt and margins to 0.3 in), the prior role 2 to 3 lines, each older role 1 to 2 lines. Fit the page by shortening wording, never by dropping a must-have or supporting fact. (Updated 15 Oct 2026; the old 3-to-5-bullet cap forced many facts into a few long bullets.) |
| R9 | **Style (result first, consultant-style).** Lead with the outcome or number, then how it was achieved ("Cut content turnaround 50% with a production GenAI pipeline."); if the entry states no result, lead with an action verb. **Bullet length (revised 25 Nov 2026, Iman — the earlier "every bullet fits on one line" rule made generated resumes read thinner than Iman's own):** most bullets are one line (about 15 to 18 words), and **up to about a quarter may run to two lines (about 25 to 32 words)** where the point is the product thinking rather than a fact — the strategy row above all, and architecture bullets that name real components. A two-line bullet must earn it: say the bet, the before-and-after, or who benefits and by how much ("merging three separate, effort-intensive product workflows into a single AI-native workflow"), never pad a fact with adjectives. When an entry holds two unrelated facts, write two one-line bullets rather than one long one. No stacked em-dashes, no chains of semicolons. When the evidence shows a design was built with engineering, say so ("with engineering", "co-designed with engineering"); credit Iman for the product decisions, not the engineering build. Bold one anchor per bullet (the number or key term), never several. No first person. No "responsible for" or "helped to". Name a tool only where the evidence shows it was used. (Updated 15 Oct 2026.) |
| R10 | **No duplicates.** Do not use two entries that describe the same work (for example ACH-011 overlaps ACH-044 and ACH-045; pick one or merge). |
| R11 | **Layout (Iman's preferred format, set 15 Oct 2026).** One page. Header (name, headline, contact), then Summary, an "Impact at a glance" strip of 4 headline figures from Part 6 (reduced from 6 on 24 Nov 2026): 2 fixed tiles (suite revenue, cumulative cost savings) and 2 chosen for relevance to the product, each with a one-line reason in the hand-over note (updated 18 Oct 2026; each tile is a figure plus a caption that says what moved and from where, e.g. "~87%: content-selection accuracy, up from ~67%"; prefer business figures such as revenue, revenue share, savings and satisfaction over process figures), Skills as labelled rows, Experience for the current role told as a story in labelled rows, using the default rows below as a menu, not a fixed list (updated 18 Oct 2026). **Default order and balance (set 25 Nov 2026 from Iman's finalised resume; this is the shape to keep):** Value generated via Products (5 bullets) · The strategy (5) · What I built (4) · How I made it trustworthy (3) · How I delivered (5) · Whom I led (2). Row titles and emphasis are still tailored from the capability map (step 1b) — rename rows in the product's own terms, and a product whose team cares most about one theme may move that row up one place and gain a bullet or two. **But keep the arc and the balance:** never collapse the strategy row to make space, and never let one row exceed about 5 bullets. A resume where testing or architecture swells to 7 bullets while strategy shrinks to 2 reads as a specialist's plan, not a product leader's story (seen 25 Nov 2026 on the first Cloudflare build). Keep the story logic: answer first, then mandate, build, quality, delivery, people. Default menu, answer first: The value (revenue, savings, satisfaction, scale), The strategy (business and product strategy only: roadmap ownership, budget and team, suite strategy, market assessment and benchmarking, product-market-fit validation, release phasing; architecture and platform choices such as the vector database belong in What I built), What I built, How I made it trustworthy (evaluation, deterministic testing, AI safety, explainability), How I delivered, Whom I led, How I work (AI-native across the product lifecycle: name the AI tool used for each task). A product leader should be able to read the rows top to bottom and follow mandate, build, quality, delivery and impact. The prior role as one labelled row, Earlier experience as compact one-liners, Education. Readability: body text 10 pt, nothing in the file below 9 pt, margins 0.3 in on all sides, visible spacing between rows, one bold anchor per bullet; fit the page by shortening wording or cutting a bullet, never by shrinking type, spacing or margins (updated 24 Nov 2026). Build the file from the layout specification in Part 10.9, not from an existing document. The plain single-column, no-table ATS twin is no longer optional: it is produced on every run (R16). |
| R12 | **Gaps.** If the file has no evidence for a requirement (for example scale or revenue figures, Part 11), say so in Open items. Do not fill the gap: never claim the missing number, certification, tool, outcome or domain experience. A relevance bridge (R14, type G1) may say what transfers from Iman's recorded work; it may not say the missing thing exists. |
| R13 | **Cover letters — REVISED 25 Nov 2026 (Iman): write a real letter in prose, not resume points.** The 15 Oct bullet-section format below is superseded. Format: date, recipient line, "Dear <Company> <team>," then 4 to 6 short prose paragraphs (250 to 380 words), "Kind regards," and the name. Order: (1) a specific observation about the company's product or a recent, dated, public development, and why that problem is the reason for applying; (2) one story told properly (situation, what Iman decided and did, result), chosen because it mirrors that problem; (3) a second, shorter proof point tied to what the role asks for; (4) scope in one or two sentences (revenue, team, leadership); (5) the honest gap and what transfers; (6) a two-sentence close inviting a conversation about the product. Never repeat resume bullets as sentences: tell the story behind them. No lists, no bold, no clichés ("I am writing to express", "passionate", "perfect fit"). R1 to R6, R10 and R14 still apply; list the ACH IDs behind each paragraph in the Selection log. The rest of this cell is the superseded 15 Oct format, kept for history. **Superseded — Cover letters (Iman's preferred format, set 15 Oct 2026).** Same standards as the resume: R1 to R6 and R10 apply (only facts in Parts 2 to 9, mandated client wording, targets never results), and so do steps 3b and 4b (headline value figures and named keywords even if the listing did not ask). One page, about 250 to 320 words, same header style as the resume. Write for a hiring manager or product leader as a short story, in this order: (1) a 2 to 3 sentence hook naming the role and the single strongest match between Iman's work and the company's problem; (2) "The value I have delivered": 2 to 3 one-line bullets with the headline figures (suite revenue, client cost savings, satisfaction); (3) "How I build AI that holds up": 4 to 5 one-line bullets (architecture, evaluation results, deterministic and AI-safety testing, explainability); (4) "How I work": 3 to 4 one-line bullets (prototyping, requirements discipline, stakeholder communication, staying close to the models); (5) one short, honest paragraph naming the main gap against the listing and what transfers; (6) a one-line close. Sentences follow R9: result first, one idea per sentence, one bold anchor per bullet. Never state a purpose, outcome or effect that the entry does not record (for example, do not add "so the team built the right thing first time"); this applies to generated lines too. The hook and the "what carries over" paragraph may use R14 lines (G1 and G2), highlighted yellow in the review copy. Same layout specification as the resume (Part 10.9); build from it, not from an existing document. |
| R14 | **Generated content (added 19 Oct 2026, Iman).** The resume may carry content the file does not state, so it reads as written for the product, within these rules. **Types.** G1 relevance line: links a recorded fact to what the product needs, its users or its language; it describes the practice and why it fits, and does not claim an effect of Iman's work. G2 implied practice: something the cited entry's own verbs imply but the file does not record (for example, an entry that says Iman set QA sample standards implies working with QA on test data). A G2 line must follow from a named ACH entry and be something Iman could say in an interview. **Marking.** Every G1 and G2 line is highlighted yellow in the review .docx, flagged `GEN`, and listed in the hand-over with its type, source ACH IDs and what Iman must confirm (true, reword or delete). **Limits.** (a) Never generate the classes in R1. (b) Never in the header, KPI strip, dates, Education or Earlier experience. (c) At most about a quarter of the bullets in the current role. (d) No outcome words ("so that", "resulting in", "reducing", "improving") unless the entry records that outcome. (e) Vendor-neutral wording; name a tool only where R9 allows. (f) A generated line never fills a hard gap (R12). **After review.** Approved lines stay in that one resume. They are not added to Parts 4 or 5 and are never treated as facts by later resumes. |
| R15 | **JD keyword coverage (added 26 Nov 2026, Iman): every keyword in the listing is accounted for, and an ATS matches by exact phrase.** **(1) Extract.** Right after reading the listing (step 1c) list every skill, method, tool, domain, responsibility, qualification and seniority term in it, from every section (overview, what you will own, required, preferred, nice to have), **in the listing's own words and spelling** (UK or US as the listing writes it): normally 30 to 60 terms, never fewer than 15, one per distinct concept. Do not skip a term because it looks soft, generic or hard to evidence. **(2) Classify each term.** `used`: the evidence in Parts 2 to 9 supports it, so the listing's exact wording appears on the resume (Skills block or Summary; core requirements also in a bullet or role line). Where the listing gives both an acronym and its expansion, show both. `gap`: no evidence. A gap term is never added to the resume in any form (not in Skills, not hidden, not as "familiar with"), and a reason is recorded (R1, R12). **(3) Adjacent evidence.** Use the listing's phrase only where it is true to the entry (for example "MVP experiments" for MVP-led validation, or "navigated ambiguity" for problem validation before solutioning); each such reword is listed in Open items, and a bullet that adds a characterisation the entry does not state is a G1 line (R14). Never turn a gap into `used` by generating content. **(4) No stuffing.** No invisible, white, tiny or off-page text, no keyword lists detached from evidence, no term repeated to game a count. **(5) Cutting.** When the page is fitted (R8), never cut the only bullet that carries a `used` term; cut another bullet or shorten wording. **(6) Deliver** the keyword coverage matrix (term | used or gap | where on the resume, or the gap reason) with the totals (for example "38 of 52 used; 14 gaps"), and carry every gap in the listing's required qualifications into Open items as a knockout risk and, where honest, into the cover letter. The deterministic check lives in `assets:validate` (`keywords` in assets.json); a bundle without a valid matrix cannot be published. |
| R16 | **ATS-safe file (added 26 Nov 2026, Iman).** Every run produces two resume files from the same, already-fitted content: the designed resume (Part 10.9, for people) and an ATS twin for uploading to applicant-tracking systems and job portals (`resumeAtsDoc`). The ATS twin has one column and no tables, text boxes, columns, shading, images, icons, headers or footers; the contact line sits in the body; real Heading styles for Summary, Impact at a glance, Skills, Experience, Earlier experience and Education; real list bullets (a bullet glyph, then a space); the Part 3 job titles exactly; role lines as Title | Company | Dates with consistent month dates (R7); Calibri 10 pt; text-selectable PDF. Impact tiles become plain lines ("USD 4M+: Suite licence revenue"). It carries the same bullets as the designed resume, so no keyword appears in it that is absent from the designed resume (R15). Upload the ATS twin to portals and parsers; send the designed resume to people. The ATS twin is a resume too, so R8 applies to it in full: one page with the same safety margin, fitted on its own (its layout wraps differently), dropping lowest-priority bullets from the twin only if it needs to and never the sole carrier of a `used` keyword (R15); two pages is never acceptable. |

### 1.3 Required output

1. The resume.
2. **Selection log:** a table with columns Bullet, Type (Fact, G1 or G2), ACH ID, Requirement matched, Flag.
3. **Open items:** (a) `USE-SOFT` entries used and why, (b) `CONFIRM-FIRST` entries skipped, (c) listing requirements with no evidence, (d) metrics worth fetching (Part 10.6), (e) every G1 and G2 line, with what Iman must confirm.
3b. **Keyword coverage matrix (R15):** term | used or gap | where used or gap reason, with totals, plus the ATS twin (R16) and the page count with its safety margin (R8).
4. **Cover letter, when asked:** follow R13, and list the ACH ID behind each bullet in the Selection log so every claim can be traced.

### 1.4 Paste-ready prompt

```
Here is my master experience file and a job listing. Follow Part 1 of the file exactly.
Write a [one-page / two-page] resume tailored to this listing, then give the Selection log
and Open items.

JOB LISTING:
[paste the listing here]
```

### 1.5 Note for the human reader

Parts 2 to 9 are the data an assistant reads. Part 10 is your resume playbook. Part 11 lists known gaps and the template for adding entries. Part 12 holds the verbatim quotes behind the achievements and can be skipped unless you are checking a claim. After you edit the file, update "Last updated" at the top.

---

## 2. Profile

| Field | Value |
|---|---|
| Name | Iman Sadhu |
| Headline | Senior Product Manager, AI / GenAI Products |
| Location | Bangalore, India |
| Email | imansadhu2010@gmail.com |
| Phone | +91 9686567059 |
| LinkedIn | linkedin.com/in/imansadhu |
| Experience | 12 years across six industries and five global regions |
| Mobility and targets | Open to relocation (Dubai, Malaysia, Malta); targets Senior PM and Lead PM roles (Iman, 14 Oct 2026) |

### Summary variants (all from resume facts)

- **AI / GenAI PM (default):** Senior Product Manager with 12 years across six industries and five global regions. Built 2 products from 0 to 1, scaled a team from 3 to 26, and currently owns two production LLM-powered platforms serving global pharma brands. Focus on AI evaluation frameworks, scope governance, and execution under ambiguity.
- **Generalist Senior PM:** Senior Product Manager who has taken products from ideation to go-to-market, scaled cross-functional teams, and run roadmap and release governance across global enterprise accounts. Operates with VP- and Director-level stakeholders.
- **Leadership-weighted:** Product leader who scaled a team from 3 to 26, runs a 28+ person cross-functional delivery across four regions, manages and coaches a team of 3 (2 PMs, 1 BA), and delegates and mentors through structured handovers.
- **Option C (shortest, most confident; strategy file default):** Senior Product Manager, 12 years across six industries and five global regions. Built a product from zero to 30+ users, scaled the team from 3 to 26, and currently own two production LLM-powered platforms serving global pharma brands. Operate across VP- and Director-level stakeholders with a focus on AI evaluation frameworks, scope governance, and execution under ambiguity.
- **Suite-lead (added 14 Oct 2026):** Senior Product Manager leading a three-product commercial-content suite for a top-10 US biopharmaceutical company: owns two production LLM-powered products and the suite strategy, manages 2 PMs and 1 BA, and the suite generated USD 4M+ in SaaS licence revenue (about 30 to 40% of Indegene's commercial licence revenue). Facts: ACH-064, ACH-060.
- **Impact-weighted (added 14 Oct 2026):** Senior Product Manager whose email platform delivered about USD 0.6M in cumulative client cost savings across 20+ countries (2022 to Aug 2026, a UK biopharmaceutical company) and whose product suite earned Indegene USD 4M+ in SaaS licence revenue from a top-10 US biopharmaceutical company; manages 2 PMs and 1 BA. Facts: ACH-069, ACH-064, ACH-060.
- **Headline variant:** Senior Product Manager · AI / GenAI Products · Regulated MarTech

---

## 3. Roles

| Role | Company | Dates | Location |
|---|---|---|---|
| Senior Product Manager | Indegene | Feb 2025 to Present | India (global stakeholders) |
| Product Manager | Indegene | Jul 2020 to Jan 2025 | India |
| Manager | EY, India | Nov 2019 to Jul 2020 | India |
| Strategy Consulting Manager | Sprintly Works | Jan 2019 to May 2019 | Finland |
| Consultant | EY, India | May 2017 to Dec 2018 | India |
| Software Engineer | EY, India | Jul 2014 to May 2017 | India |

**Dates resolved (17 Oct 2026):** Iman confirmed that Consultant and Software Engineer at EY together ran Jul 2014 to Dec 2018 (resume line: "Consultant & Software Engineer | EY, India | Jul 2014-Dec 2018"). The old Dec 2019 end date was wrong. The earlier overlaps with Sprintly Works (Jan to May 2019) and EY Manager (from Nov 2019) no longer exist. **Timeline gap to be ready to explain:** nothing is recorded between Sprintly Works (ends May 2019) and EY Manager (starts Nov 2019), about five months. Do not invent a reason; ask Iman if an interviewer or form needs one.

### 3.1 Senior Product Manager, Indegene (Feb 2025 to Present)

- **Context:** AI-powered content platform for global pharma brands. Product-adoption KPIs tracked across EU, Americas, Middle East and Japan.
- **Scope:** Two production AI products (LLM-powered email platform and banner platform), each with two active client tracks plus a forward roadmap. 28+ person cross-functional team across four regions. Leads a three-product commercial-content suite: owns two products and the suite strategy; the other product is led by another PM (name and product to confirm); manages 2 PMs and 1 BA (ACH-060, ACH-064).
- **Stakeholders:** VP, AVP and Director level, plus engineering leads, QA, UX, business owners and client-side reviewers.
- **Status:** Still owning both products (confirmed by user, 12 Oct 2026). Recent activity includes structured handovers of requirements work to other product managers.
- **Tools:** Jira, AHA, Figma, Mural, Claude, Microsoft Copilot, Langfuse (LLM tracing, used in demos), Jira Service Management (probable, see Glossary).
- **Achievement IDs:** ACH-001 to ACH-007, ACH-011 to ACH-036, ACH-044 to ACH-074, ACH-078 to ACH-084, ACH-086 (Part 5).

### 3.2 Product Manager, Indegene (Jul 2020 to Jan 2025)

- **Context:** Pharma MarTech. Products built from zero across enterprise SaaS and AI-augmented products.
- **Achievement IDs:** ACH-037 to ACH-038, ACH-085 (Part 5); ACH-069 and ACH-070 span this role and the Senior PM role (2022 to Aug 2026).
- **Gap:** No Aug to Oct 2026 evidence applies to this role. Add detail later (Part 11).

### 3.3 Manager, EY India (Nov 2019 to Jul 2020)

- Led an AI bot product for tax filing. See ACH-039.

### 3.4 Strategy Consulting Manager, Sprintly Works, Finland (Jan 2019 to May 2019)

- See ACH-040.
- **Naming note:** An earlier strategy draft used a different employer name (SCG). Iman confirmed Sprintly Works on 12 Oct 2026.

### 3.5 Consultant, EY India (May 2017 to Dec 2018)

- See ACH-041, ACH-042.

### 3.6 Software Engineer, EY India (Jul 2014 to May 2017)

- See ACH-043.

---

## 4. Achievement quick-pick index

Scan this table first. Pick entries by Tags, Theme and Role, then read the full entry in Part 5. Flags: `USE` use freely. `USE-SOFT` use the entry's own wording and list it in the closing note. `CONFIRM-FIRST` ask the user before using it.

| ID | Title | Theme | Role | Tags | Conf. | Flag |
|---|---|---|---|---|---|---|
| ACH-001 | Two production AI products, end-to-end | Ownership and business impact | Sr PM, Indegene | #genai #roadmap #leadership #technical | Resume | `USE` |
| ACH-007 | Client value and satisfaction metrics | Ownership and business impact | Sr PM, Indegene | #metrics #gtm | High | `USE` |
| ACH-064 | Product-suite leadership and licence revenue | Ownership and business impact | Sr PM, Indegene | #leadership #gtm #metrics #revenue #product-suite | High | `USE` |
| ACH-065 | Leadership buy-in for the GenAI email, non-GenAI email and banner roadmaps | Ownership and business impact | Sr PM, Indegene (role to confirm) | #gtm #roadmap #leadership #stakeholder #vision | High | `USE` |
| ACH-069 | Cumulative client cost savings from the email platform, 2022 to Aug 2026 | Ownership and business impact | PM and Sr PM, Indegene | #metrics #gtm #revenue #leadership #0-to-1 | High | `USE` |
| ACH-070 | Adoption breadth across ELMAC markets | Ownership and business impact | PM and Sr PM, Indegene | #metrics #gtm #roadmap | High | `USE` |
| ACH-002 | GenAI evaluation framework | GenAI, evaluation and responsible AI | Sr PM, Indegene | #llm-evaluation #genai #metrics #guardrails | Resume | `USE` |
| ACH-003 | AI transparency and explainability | GenAI, evaluation and responsible AI | Sr PM, Indegene | #xai #responsible-ai #prd #guardrails #metrics | Resume | `USE` |
| ACH-011 | Determinism, safety and auditability validation plan | GenAI, evaluation and responsible AI | Sr PM, Indegene | #llm-evaluation #guardrails #responsible-ai #genai #stakeholder | High | `USE` |
| ACH-012 | LLM output-variance risk and single-workflow requirement | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #llm-evaluation #prompt #requirements #technical | High | `USE` |
| ACH-013 | Explainability tracing for stakeholder demos | GenAI, evaluation and responsible AI | Sr PM, Indegene | #xai #genai #guardrails #prompt #exec-comms | High | `USE` |
| ACH-014 | Seven-stage GenAI email-generation experience | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #requirements #prompt #ux | High | `USE` |
| ACH-015 | Accuracy and SME-testing escalation | GenAI, evaluation and responsible AI | Sr PM, Indegene | #llm-evaluation #escalation #metrics #stakeholder | High | `USE` |
| ACH-016 | Content-selection criteria escalation | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #llm-evaluation #escalation #release-mgmt | High | `USE` |
| ACH-017 | Agentic-guardrails documentation shared with engineering | GenAI, evaluation and responsible AI | Sr PM, Indegene | #guardrails #genai #technical | Medium | `USE` |
| ACH-018 | Product review of GenAI backlog stories | GenAI, evaluation and responsible AI | Sr PM, Indegene | #backlog #genai #requirements #guardrails | Medium | `USE-SOFT` |
| ACH-044 | Deterministic-testing scope for a multi-agent GenAI email workflow | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #llm-evaluation #guardrails #responsible-ai #requirements #stakeholder | High | `USE` |
| ACH-055 | Vector database strategy for the GenAI email platform | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #technical #requirements #architecture | High | `USE` |
| ACH-056 | Vector database epic and prompt-vectorisation scoping | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #technical #requirements #architecture #backlog | High | `USE` |
| ACH-057 | RAG workflow for AI email creation | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #technical #architecture #requirements #llm-evaluation | High | `USE` |
| ACH-058 | Cluster selection and ranking logic | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #technical #requirements #architecture #stakeholder | High | `USE` |
| ACH-059 | Dynamic LLM-generated UI behaviour | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #ux #requirements #vision | High | `USE` |
| ACH-066 | Production GenAI content pipeline for pharma marketing | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #technical #architecture #gtm #metrics | High | `USE` |
| ACH-071 | End-to-end agentic email-authoring architecture | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #architecture #technical #guardrails #responsible-ai #requirements | High | `USE` |
| ACH-072 | Red-team assessment of the agentic email flow | GenAI, evaluation and responsible AI | Sr PM, Indegene | #guardrails #responsible-ai #llm-evaluation #metrics | High (role to confirm) | `CONFIRM-FIRST` |
| ACH-073 | Stage-inspectable stylization pipeline (I/O contracts) | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #technical #architecture #requirements #llm-evaluation | High | `USE` |
| ACH-074 | Layered per-agent and end-to-end evaluation design | GenAI, evaluation and responsible AI | Sr PM, Indegene | #llm-evaluation #genai #metrics #technical | High | `USE` |
| ACH-077 | Production system architecture for the GenAI email platform (Content Studio - Email) | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #architecture #technical #guardrails #responsible-ai #requirements | High | `USE` |
| ACH-067 | MVP-led validation cutting engineering effort | Product development and release management | Sr PM, Indegene | #requirements #prd #stakeholder #metrics #vision | High | `USE` |
| ACH-019 | Banner feedback triage | Product development and release management | Sr PM, Indegene | #backlog #prioritisation #requirements | High | `USE` |
| ACH-020 | Business-demand prioritisation for the next banner release | Product development and release management | Sr PM, Indegene | #prioritisation #roadmap #stakeholder #release-mgmt | High/Low | `USE` |
| ACH-021 | Requirement evidence standards for banner features | Product development and release management | Sr PM, Indegene | #requirements #prd #backlog #stakeholder | High | `USE` |
| ACH-022 | Demand vs capacity framing for October release | Product development and release management | Sr PM, Indegene | #prioritisation #release-mgmt #stakeholder #scope-governance | High | `USE` |
| ACH-023 | Sequencing low-input features first | Product development and release management | Sr PM, Indegene | #prioritisation #roadmap #requirements | High | `USE` |
| ACH-024 | Cross-channel email conversion requirement | Product development and release management | Sr PM, Indegene | #requirements #prd #genai #scope-governance | High | `USE` |
| ACH-025 | Problem validation and requirements freeze before solutioning | Product development and release management | Sr PM, Indegene | #prd #requirements #stakeholder #scope-governance | High | `USE` |
| ACH-026 | Release gating across Product, Engineering, QA and Business | Product development and release management | Sr PM, Indegene | #release-mgmt #uat #stakeholder #technical | High/Low | `USE` |
| ACH-027 | Preventing scope creep in a banner epic | Product development and release management | Sr PM, Indegene | #scope-governance #backlog #requirements | Low | `USE` |
| ACH-046 | Sprint-risk intervention | Product development and release management | Sr PM, Indegene | #release-mgmt #scope-governance #backlog #ai-tools | High | `USE` |
| ACH-050 | Story decomposition at scale | Product development and release management | Sr PM, Indegene | #backlog #requirements #prd #ai-tools | High | `USE` |
| ACH-005 | Technical product decisions with engineering | Technical depth | Sr PM, Indegene | #technical #prd #release-mgmt | Resume | `USE` |
| ACH-047 | Cross-system integration architecture trade-off | Technical depth | Sr PM, Indegene | #technical #prd #genai #stakeholder | High | `USE` |
| ACH-048 | Upstream API payload analysis | Technical depth | Sr PM, Indegene | #technical #genai #requirements #ai-tools | High | `USE` |
| ACH-049 | Email rendering and accessibility specifications | Technical depth | Sr PM, Indegene | #technical #accessibility #requirements #prd | High | `USE` |
| ACH-051 | Rendering POCs and trade-off communication | Technical depth | Sr PM, Indegene | #technical #stakeholder #exec-comms | High | `USE` |
| ACH-052 | Release-risk gatekeeping before customer communication | Technical depth | Sr PM, Indegene | #release-mgmt #technical #stakeholder | High | `USE` |
| ACH-004 | Product decision point across senior stakeholders | Stakeholder management | Sr PM, Indegene | #stakeholder #escalation #release-mgmt #scope-governance #exec-comms | Resume | `USE` |
| ACH-028 | Holding timelines until requirements are defined | Stakeholder management | Sr PM, Indegene | #stakeholder #scope-governance #exec-comms | High | `USE` |
| ACH-029 | Two-option framing for business expectations | Stakeholder management | Sr PM, Indegene | #stakeholder #exec-comms #prioritisation | Low | `USE` |
| ACH-030 | Risk escalation with a drop-dead ETA | Stakeholder management | Sr PM, Indegene | #escalation #stakeholder #llm-evaluation | High | `USE` |
| ACH-053 | Escalation and scope enforcement across four accounts | Stakeholder management | Sr PM, Indegene | #stakeholder #escalation #scope-governance #release-mgmt | High | `USE` |
| ACH-031 | Delegated banner requirements with a discovery framework | Leadership and people | Sr PM, Indegene | #leadership #delegation #mentoring #requirements | High | `USE` |
| ACH-032 | Knowledge transfer and handover of discussions | Leadership and people | Sr PM, Indegene | #mentoring #leadership #delegation | High | `USE` |
| ACH-033 | Protecting UX delivery capacity | Leadership and people | Sr PM, Indegene | #leadership #stakeholder #roadmap | High | `USE` |
| ACH-034 | Single-tester dependency | Leadership and people | Sr PM, Indegene | #leadership #delegation #risk | Low | `USE-SOFT` |
| ACH-036 | Participation in leadership release reviews | Leadership and people | Sr PM, Indegene | #leadership #stakeholder | Low | `USE` |
| ACH-045 | Turning the testing scope into owned workstreams | Leadership and people | Sr PM, Indegene | #leadership #delegation #mentoring #stakeholder #uat #prioritisation | High | `USE` |
| ACH-060 | Lead a team of 3 (2 PMs, 1 BA) | Leadership and people | Sr PM, Indegene | #leadership #mentoring #delegation #team-management | High | `USE` |
| ACH-061 | PM coaching on requirements and release scoping | Leadership and people | Sr PM, Indegene | #leadership #mentoring #prioritisation #requirements #release-mgmt | High | `USE` |
| ACH-062 | PM competency coaching and onboarding | Leadership and people | Sr PM, Indegene | #leadership #mentoring #ai-tools #stakeholder | High | `USE` |
| ACH-063 | Directed a BA across backlog, stories and release coordination | Leadership and people | Sr PM, Indegene | #leadership #delegation #mentoring #backlog #requirements #release-mgmt #team-management | High | `USE` |
| ACH-006 | AI tools in the PM workflow | AI tools and innovation | Sr PM, Indegene | #ai-tools #prd #backlog #leadership | Resume | `USE` |
| ACH-035 | AI-assisted product handover | AI tools and innovation | Sr PM, Indegene | #ai-tools #leadership #delegation | High | `USE` |
| ACH-054 | Future email editor prototype and team coordination | AI tools and innovation | Sr PM, Indegene | #vision #ai-tools #leadership | High | `USE` |
| ACH-068 | Claude-powered Jira dashboard | AI tools and innovation | Sr PM, Indegene | #ai-tools #backlog #release-mgmt | High | `USE` |
| ACH-075 | Product suite implementation for BI client, $1M phased contract | Ownership and business impact | PM, Indegene | #revenue #gtm #0-to-1 #metrics | High | `USE` |
| ACH-076 | End-to-end PDLC workflow using Claude for PM team | AI tools and innovation | Sr PM, Indegene | #ai-tools #leadership #delegation #prd #vision | High | `USE` |
| ACH-037 | Built a product from zero | Product Manager role, 2020 to 2025 | PM, Indegene | #0-to-1 #gtm #team-scaling #metrics | Resume | `USE` |
| ACH-038 | Roadmap and release execution across global accounts | Product Manager role, 2020 to 2025 | PM, Indegene | #roadmap #release-mgmt #uat #stakeholder | Resume | `USE` |
| ACH-039 | AI bot product for tax filing (EY Manager) | Earlier career, 2014 to 2020 | Manager, EY | #genai #0-to-1 #leadership | Resume | `USE` |
| ACH-040 | Demand-optimisation tool, revenue and service levels (Sprintly Works) | Earlier career, 2014 to 2020 | Sprintly Works | #consulting #metrics #gtm #technical #analytics | Resume / High | `USE` |
| ACH-041 | National ease-of-doing-business programme (EY Consultant) | Earlier career, 2014 to 2020 | Consultant, EY | #consulting #digital-transformation #metrics | Resume | `USE` |
| ACH-042 | Land management platform (EY Consultant) | Earlier career, 2014 to 2020 | Consultant, EY | #digital-transformation #0-to-1 #metrics | Resume | `USE` |
| ACH-043 | Guidewire ClaimCenter configuration and legacy-to-Guidewire migration (EY Software Engineer) | Earlier career, 2014 to 2020 | Software Eng., EY | #technical #digital-transformation #insurance #claims #guidewire | High ("led" resume only) | `USE` / `USE-SOFT` for "led" |
| ACH-078 | Defined the content-relationship model for knowledge-graph-sourced content clusters | Technical depth | Sr PM, Indegene | #genai #technical #requirements #architecture #stakeholder #knowledge-graph | High | `USE` |
| ACH-079 | Designed an experiment to test which knowledge-graph cluster shapes produce usable emails | GenAI, evaluation and responsible AI | Sr PM, Indegene | #llm-evaluation #genai #requirements #knowledge-graph | High | `CONFIRM-FIRST` |
| ACH-080 | Shaped the direction for multiple knowledge graphs feeding one semantic layer | AI tools and innovation | Sr PM, Indegene | #architecture #genai #stakeholder #knowledge-graph | High | `USE-SOFT` |
| ACH-081 | Specified the integration contract with the upstream knowledge-graph retrieval service | Product development and release management | Sr PM, Indegene | #requirements #architecture #technical #knowledge-graph | High | `USE` |
| ACH-082 | Analysed node-level quality of knowledge-graph payloads | Technical depth | Sr PM, Indegene | #technical #escalation #knowledge-graph | High | `CONFIRM-FIRST` |
| ACH-083 | Escalated a tagging gap blocking evaluation of graph-sourced content | Stakeholder management | Sr PM, Indegene | #escalation #stakeholder #llm-evaluation #knowledge-graph | High | `CONFIRM-FIRST` |
| ACH-084 | Built taxonomy-aware test prompts for cluster selection evaluation | GenAI, evaluation and responsible AI | Sr PM, Indegene | #llm-evaluation #genai #knowledge-graph | High | `USE` |
| ACH-085 | Defined parent–related claim hierarchy handling from the approved-content library | Product development and release management | PM to Sr PM, Indegene | #requirements #technical #knowledge-graph | High | `USE-SOFT` |
| ACH-086 | Tracked upstream retrieval accuracy against product benchmark | GenAI, evaluation and responsible AI | Sr PM, Indegene | #llm-evaluation #stakeholder #knowledge-graph | High | `CONFIRM-FIRST` |
| ACH-087 | Suite strategy: three workflows merged into one AI-native workflow | Ownership and business impact | Sr PM, Indegene | #vision #roadmap #gtm #genai #product-suite | Resume | `USE` |
| ACH-088 | Conversational-AI product converting campaign goals into compliant assets | GenAI, evaluation and responsible AI | Sr PM, Indegene | #genai #architecture #requirements #ux | Resume | `USE` |
| ACH-089 | Eight-agent RAG architecture: named stages | Technical depth | Sr PM, Indegene | #genai #architecture #technical #knowledge-graph | Resume | `USE` |
| ACH-090 | Model selection framework, runtime model switching, generative UI | Technical depth | Sr PM, Indegene | #genai #technical #architecture #ux #requirements | Resume | `USE` |
| ACH-091 | Veeva Vault and knowledge-graph integration points | Technical depth | Sr PM, Indegene | #technical #architecture #requirements #knowledge-graph | Resume | `USE` |
| ACH-092 | Championed the explainability (XAI) practice across the commercial-content space | GenAI, evaluation and responsible AI | Sr PM, Indegene | #xai #responsible-ai #leadership #vision | Resume | `USE` |
| ACH-093 | Pushed UX delivery of UI differentiators | Leadership and people | Sr PM, Indegene | #leadership #ux #stakeholder | Resume | `USE` |
| ACH-094 | Claude-automated sprint performance tracking and risk flagging | AI tools and innovation | Sr PM, Indegene | #ai-tools #release-mgmt #backlog | Resume | `USE` |
| ACH-095 | Stakeholder-management discipline across three client tracks | Stakeholder management | Sr PM, Indegene | #stakeholder #release-mgmt #exec-comms | Resume | `USE` |
| ACH-096 | Indegene's first email and banner authoring web applications | Product Manager role, 2020 to 2025 | PM, Indegene | #0-to-1 #gtm #product-suite | Resume | `USE` |
| ACH-097 | Port Community System for Indian ports | Earlier career, 2014 to 2020 | Consultant, EY | #consulting #digital-transformation #metrics | Resume | `USE` |
| ACH-098 | Inventory optimisation model for Finland's largest coffee manufacturer | Earlier career, 2014 to 2020 | Sprintly Works | #consulting #analytics #technical #metrics | Resume | `USE` |
| ACH-099 | Brand teams seeing cost savings rose from 15 to 22 in 2026 | Ownership and business impact | PM and Sr PM, Indegene | #metrics #gtm #roadmap | Resume | `USE` (conflict with ACH-070 — read the entry) |

---

## 5. Achievement bank, by theme

**Confidence key:** *Resume* = self-reported on the resume. *High* = Iman's own words in an email, chat or transcript, or confirmed by Iman. *Medium* = shows involvement, not Iman's words. *Low* = AI meeting notes only.

**Flag key:** `USE` = Resume or High. `USE-SOFT` = Medium or Low; usable with the entry's own softer wording. `CONFIRM-FIRST` = an open check changes the claim.

**Entry fields (fixed order):** Role, Period, Theme, Tags, Long, Short, Metrics, Confidence, Evidence, Flag, Notes. Entries ACH-046 to ACH-054 come from AI-extracted source dumps (SRC-1 to SRC-3, Part 12) and are not dated in the source. Internal codes are replaced with resume-safe wording (Part 8.2).

### 5.1 Ownership and business impact

#### ACH-001 | Two production AI products, end-to-end
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** Ownership and business impact
- **Tags:** #genai #roadmap #leadership #technical
- **Long:** Own two production AI products end-to-end, an LLM-powered email platform and a banner platform, each with two active client tracks and a forward roadmap, delivered by a 28+ person cross-functional team across four global regions.
- **Short:** Own two production GenAI products across four client tracks with a 28+ person team.
- **Metrics:** None
- **Confidence:** Resume
- **Evidence:** EV-001, EV-002, EV-009, EV-030 (corroborate Aug to Oct 2026 activity on both products)
- **Flag:** `USE`
- **Notes:**
  - **Suite context (14 Oct 2026; product count corrected 25 Nov 2026):** The two products sit in a three-product suite that Iman leads; see ACH-064 for the suite scope and licence revenue.

#### ACH-007 | Client value and satisfaction metrics
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** Ownership and business impact
- **Tags:** #metrics #gtm
- **Long:** Delivered monthly client cost savings of USD 10,368 (Jun 2025), reaching USD 17,556 in May 2026 and USD 15,656 in Jun 2026, and lifted client satisfaction (PSAT) from 3.63/4 (Jun 2025) to 3.93/4 (Jun 2026).
- **Short:** Client PSAT improved from 3.63/4 to 3.93/4; monthly client cost saved reached USD 17,556 (May 2026).
- **Metrics:** see Part 6.
- **Confidence:** High (cost-saved figures: client dashboards, SRC-10; PSAT: resume)
- **Evidence:** SRC-10 (cost saved); PSAT from the resume only
- **Flag:** `USE`
- **Notes:**
  - **Resolved (14 Oct 2026):** Iman confirmed these are Client D monthly cost-saved values, so they are monthly, not cumulative. The dashboard shows May 2026 above Jun 2026 (about $18K vs $17K), matching the order here. Jun 2025 matches (about $10K). **Small check:** the Jun 2026 chart label reads $17K while 15,656 would round to $16K; use USD 17,556 (May 2026) as the lead figure, or fetch the exact Jun 2026 value.
  - **Wording:** Say "monthly cost savings"; for the cumulative figure use ACH-069.

#### ACH-064 | Product-suite leadership and licence revenue
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated (revenue period to confirm)
- **Theme:** Ownership and business impact
- **Tags:** #leadership #gtm #metrics #revenue #product-suite
- **Long:** Lead a three-product commercial-content suite for a top-10 US biopharmaceutical company, owning two products and the suite strategy end to end and managing 2 PMs and 1 BA; the suite generated USD 4M+ in SaaS licence revenue, about 30 to 40% of Indegene's total commercial licence revenue, with about 50 to 60 daily active users across 10 markets.
- **Short:** My product suite earned Indegene USD 4M+ in SaaS licence revenue (about 30 to 40% of its commercial licence revenue).
- **Metrics:** USD 4M+ SaaS licence revenue (suite level); about 30 to 40% share of Indegene commercial licence revenue; about 50 to 60 daily active users; 10 markets; suite of 3 products, 2 owned directly.
- **Confidence:** High (Iman's own statements, 13 to 14 Oct 2026; the licence contract is held by Iman and is not in this file)
- **Evidence:** SRC-9
- **Flag:** `USE`
- **Notes:**
  - **Wording (updated 15 Oct 2026, Iman):** the revenue is Indegene's, earned from Client A through the suite Iman leads. Resume wording: "My product suite earned Indegene USD 4M+ in SaaS licence revenue from a top-10 US biopharmaceutical company." Never open a bullet with "Generated USD 4M+" (it reads as Iman's or the client's revenue), and never write revenue "for" or "at" the client. The 30 to 40% share is of Indegene's commercial licence revenue, not of the client. All figures are for the one client (Client A) only.
  - **Consistency check:** USD 4M+ against a 30 to 40% share implies roughly USD 10M to 13M of total commercial licence revenue; be ready for that arithmetic in interviews.
  - **Do not claim:** The AI/ML content-tagging product and its 60% efficiency figure belong to another PM in the suite.
  - **VERIFY:** The period the USD 4M+ covers; who leads the suite's other product (the transition files show the two PMs Iman manages working inside Iman's own banner and email products, so do not say they lead a separate product until Iman confirms).
  - **Overlap (R10):** Use with ACH-001, not alongside it as a second ownership bullet.

#### ACH-065 | Leadership buy-in for the GenAI email, non-GenAI email and banner roadmaps
- **Role:** Senior Product Manager, Indegene (to confirm: may sit under the earlier PM role)
- **Period:** Not dated (year and role to confirm)
- **Theme:** Ownership and business impact
- **Tags:** #gtm #roadmap #leadership #stakeholder #vision
- **Long:** Secured senior-leadership buy-in, budget and team for three roadmaps (GenAI email, non-GenAI email and banner) through market assessment and competitive benchmarking.
- **Short:** Won leadership buy-in, budget and teams for the GenAI email, non-GenAI email and banner roadmaps through market assessment and competitive benchmarking.
- **Metrics:** 3 roadmaps with separate buy-ins.
- **Confidence:** High (Iman's own statement, 14 Oct 2026)
- **Evidence:** SRC-9
- **Flag:** `USE`
- **Notes:**
  - **Phrasing:** GenAI email and non-GenAI email are two workflows of one product with separate roadmaps, budgets and teams; banner is a separate product. Write "two products, three roadmaps", never "three products".
  - **VERIFY:** The year and role in which each buy-in was won; this decides whether the entry belongs under the Senior PM or the earlier PM role (R7). Do not link the buy-ins to the USD 4M+ without Iman's confirmation.

#### ACH-069 | Cumulative client cost savings from the email platform, 2022 to Aug 2026
- **Role:** Product Manager (2022 to Jan 2025) and Senior Product Manager (Feb 2025 on), Indegene
- **Period:** Jan 2022 to Aug 2026
- **Theme:** Ownership and business impact
- **Tags:** #metrics #gtm #revenue #leadership #0-to-1
- **Long:** Owned the email platform that delivered about USD 598K in cumulative cost savings to a UK biopharmaceutical company between Jan 2022 and Aug 2026 (USD 593.8K in ELMAC, USD 3.9K in JAPAC), up 44% from USD 90.7K in 2022 to USD 131.2K in 2023 and sustained at USD 126K to USD 132K a year since, with 2026 running at about USD 14.7K a month against USD 11.0K in 2025.
- **Short:** Email platform delivered about USD 598K in client cost savings (Jan 2022 to Aug 2026); up 44% in 2023.
- **Metrics:** Annual totals: USD 90,742 (2022); 131,219 (2023); 125,764 (2024); 132,192 (2025); 117,722 (Jan to Aug 2026). Cumulative USD 597,639 (ELMAC 593,785; JAPAC 3,854). Average per month: USD 7.5K (2022), 10.8K (2023), 10.3K (2024), 11.0K (2025), 14.7K (2026 YTD). Peak month USD 22K (Apr 2026). Email deployments about 99% of ELMAC savings (586,421 of 593,785).
- **Confidence:** High (client Power BI dashboards, 33 screenshots, reconciled to the totals; accepted by Iman as direct evidence, 14 Oct 2026)
- **Evidence:** SRC-10
- **Flag:** `USE`
- **Notes:**
  - **Attribution (Iman, 14 Oct 2026):** Iman states this is entirely his work as PM of the email product. Resume wording: "the email platform I owned delivered...". Do not write "single-handedly" or "I saved"; the dashboards measure savings through brand marketers' use of the platform.
  - **Role split:** 2022 to Jan 2025 sits under the Product Manager role (USD 347.7K for 2022 to 2024, plus Jan 2025); Feb 2025 on sits under the Senior PM role (USD 249.9K for 2025 and Jan to Aug 2026, which includes Jan 2025). Use the cumulative figure with both titles or split by role; do not double count.
  - **Interview prep:** The dashboards do not define "cost saved". Many country bars are exact multiples of USD 324 (2023 to 2025) and USD 308 (2026), which points to a fixed saving per email deployed. GenAI usage (from 2025) cannot be separated from the data. Be ready to explain the baseline.
  - **Wording:** Client D wording: "a UK biopharmaceutical company" (updated 25 Nov 2026; Part 8.1). 2026 is Jan to Aug only; do not annualise.
  - **Overlap (R10):** ACH-007 holds the monthly 2025 to 2026 values; use ACH-069 for the cumulative claim.

#### ACH-070 | Adoption breadth across ELMAC markets
- **Role:** Product Manager and Senior Product Manager, Indegene
- **Period:** 2022 to Aug 2026
- **Theme:** Ownership and business impact
- **Tags:** #metrics #gtm #roadmap
- **Long:** Grew platform savings beyond the lead market: non-lead-market savings rose from USD 26.9K (2022) to USD 73.5K (2025), the lead market's share of regional savings fell from 70% to 38% by 2026, the number of countries with savings grew from 15 to 22, and 2026 added Middle East markets (UAE USD 9.9K, Kuwait USD 6.2K).
- **Short:** Broadened adoption: lead-market share down from 70% to 38%; countries with savings up from 15 to 22.
- **Metrics:** Non-Spain ELMAC savings: USD 26,926 (2022); 61,295 (2023); 64,867 (2024); 73,548 (2025); 72,542 (2026 YTD). Spain share of ELMAC: 70% (2022), 53%, 47%, 44%, 38% (2026 YTD). Countries with non-zero savings: 15, 19, 20, 22, 21 (2026 YTD).
- **Confidence:** High (client dashboards, SRC-10)
- **Evidence:** SRC-10
- **Flag:** `USE`
- **Notes:**
  - **Wording:** Write "the lead market" and "20+ countries across Europe, the Middle East and beyond"; do not name countries. Do not claim the Middle East launches personally unless Iman confirms what he did.
  - **VERIFY:** Iman's role in each market rollout (not shown by the data).

### 5.2 GenAI, evaluation and responsible AI

#### ACH-002 | GenAI evaluation framework
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #llm-evaluation #genai #metrics #guardrails
- **Long:** Designed and ran an evaluation framework to measure how well the GenAI engine selects and presents content, defining accuracy targets, writing business rules governing AI behaviour, and coordinating SME reviewers to score outputs; improved content-selection accuracy from about 67% in an earlier round to about 87% against staged 75% and 85% targets.
- **Short:** Built a GenAI evaluation framework; content-selection accuracy rose from about 67% to about 87% vs 75% and 85% staged targets.
- **Metrics:** about 67% (earlier round) to about 87% (latest) accuracy; staged targets 75% and 85% (targets, not results).
- **Confidence:** Resume
- **Evidence:** None (resume only)
- **Flag:** `USE`
- **Notes:**
  - **Confirmed by Iman (12 Oct 2026):** about 87% is the current figure and about 67% was an earlier round.
  - **VERIFY:** Add the dates of each round. EV-015 (3 Sep 2026) records free-text generation accuracy as "not more than 85% yet"; confirm that is a different measure from content-selection accuracy.

#### ACH-003 | AI transparency and explainability
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #xai #responsible-ai #prd #guardrails #metrics
- **Long:** Drove AI transparency and explainability across both products, championing a feature that surfaces AI reasoning so compliance reviewers and users can verify every output; authored the PRD, defined success metrics, and split delivery into three independent layers to de-risk rollout.
- **Short:** Led an AI-reasoning transparency feature for compliance reviewers; shipped in three de-risked layers.
- **Metrics:** [TARGETS, not results] PRD success targets of 60% adoption and 15% MLR revision reduction (SRC-1). Replace with actuals once launched.
- **Confidence:** Resume
- **Evidence:** EV-019, EV-020, EV-021 (related), EV-040
- **Flag:** `USE`
- **Notes:**
  - **Detail (added 13 Oct 2026):** An Aug 2026 grooming session records Iman describing a metadata check after a prompt is submitted, shown as an internal LLM message, and a plan to generate and stream structured reasoning payloads and display reasoning steps in the UI to build user trust (EV-040). Supports "streamed reasoning" and "show-thinking" wording.

#### ACH-011 | Determinism, safety and auditability validation plan
- **Role:** Senior Product Manager, Indegene
- **Period:** 17 Sep 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #llm-evaluation #guardrails #responsible-ai #genai #stakeholder
- **Long:** Defined an agent-level validation plan covering determinism, repeatability, variance, AI safety (guardrail red-team and prompt-injection testing) and auditability across the content-retrieval and email-generation workflow, to answer internal and client questions on how deterministic, safe and auditable the system is.
- **Short:** Defined determinism, safety and auditability testing for a multi-agent GenAI email workflow.
- **Metrics:** None
- **Confidence:** High
- **Evidence:** EV-021, EV-035. See ACH-044 and ACH-045 for the detailed breakdown of this meeting; the 17 Sep deck presented to the business team is SRC-11 (EV-048)
- **Flag:** `USE`

#### ACH-012 | LLM output-variance risk and single-workflow requirement
- **Role:** Senior Product Manager, Indegene
- **Period:** 19 Aug 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #llm-evaluation #prompt #requirements #technical
- **Long:** Identified LLM output variance as a product risk when the same prompt generates two channel variants in separate conversations, and specified that both variants be created inside one workflow so content placement stays identical and only tokens differ.
- **Short:** Spotted LLM variance risk and specified a single-workflow design to keep outputs identical.
- **Metrics:** None
- **Confidence:** High
- **Evidence:** EV-030
- **Flag:** `USE`

#### ACH-013 | Explainability tracing for stakeholder demos
- **Role:** Senior Product Manager, Indegene
- **Period:** 15 to 16 Sep 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #xai #genai #guardrails #prompt #exec-comms
- **Long:** Used an LLM tracing tool (Langfuse) to inspect prompts, guardrail-agent decisions and semantic queries, and prepared end-to-end demos showing approved content turning into generated emails alongside backend traces of the model's reasoning.
- **Short:** Prepared GenAI demos with LLM tracing to show model reasoning to stakeholders.
- **Metrics:** None
- **Confidence:** High
- **Evidence:** EV-019, EV-020, EV-041, EV-048
- **Flag:** `USE`
- **Notes:**
  - **Detail (added 13 Oct 2026):** The validation-review summary records Langfuse tracing inputs, outputs, latency, token counts and relevance scores so decisions can be replayed and audited (EV-041). Supports "LLM observability and auditability" wording.
  - **Deck (SRC-11):** every agent decision traced in Langfuse end to end (inputs, outputs, scores, reasoning) and replayable after the fact.
  - **Confirmed by ACH-077 (Nov 2026):** The production architecture diagram shows LLM and agent tracing/telemetry as a formal system component, capturing end-to-end execution traces, LLM calls, token usage, latency, errors and cost metrics. This upgrades the Langfuse tracing from a demo capability to a production-grade observability layer.

#### ACH-014 | Seven-stage GenAI email-generation experience
- **Role:** Senior Product Manager, Indegene
- **Period:** 24 Aug 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #requirements #prompt #ux
- **Long:** Defined the seven-stage generation experience (search for relevant content, choose approved template, curate content, generate payload, place content, style content, generate final email) and refined user-facing wording and metadata inputs with the design team.
- **Short:** Defined the seven-stage flow for AI-generated emails and its user-facing copy.
- **Metrics:** None
- **Confidence:** High (own chat)
- **Evidence:** EV-006
- **Flag:** `USE`
- **Notes:**
  - **Stage count (Iman, 15 Oct 2026):** the final flow has eight stages (see ACH-071, 17 Sep deck); the seven stages above are from the Aug 2026 chat. Resume wording: "eight-stage generation experience". Keep ACH-014 (user experience) and ACH-071 (agent architecture) on separate lines.

#### ACH-015 | Accuracy and SME-testing escalation
- **Role:** Senior Product Manager, Indegene
- **Period:** 3 Sep and 12 Oct 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #llm-evaluation #escalation #metrics #stakeholder
- **Long:** Escalated free-text generation accuracy reported as not above 85% and four market-specific SME-testing stories, requesting completion dates and a plan to reach benchmark; followed up on data availability risks with a drop-dead ETA.
- **Short:** Escalated accuracy gaps and SME-testing dates; asked for an improvement plan to reach benchmark.
- **Metrics:** "not more than 85% yet"; 4 SME-testing stories.
- **Confidence:** High
- **Evidence:** EV-015, EV-023
- **Flag:** `USE`

#### ACH-016 | Content-selection criteria escalation
- **Role:** Senior Product Manager, Indegene
- **Period:** 11 Aug 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #llm-evaluation #escalation #release-mgmt
- **Long:** Escalated a QA finding that the upstream content-selection criteria needed to be completely revamped, clarified that the selection accuracy target applied relative to the final email, and kept stakeholders updated on blocked and delayed releases.
- **Short:** Escalated and clarified content-selection accuracy criteria while managing release blockers.
- **Metrics:** None
- **Confidence:** High
- **Evidence:** EV-002
- **Flag:** `USE`

#### ACH-017 | Agentic-guardrails documentation shared with engineering
- **Role:** Senior Product Manager, Indegene
- **Period:** 13 Aug 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #guardrails #genai #technical
- **Long:** Shared the agentic-guardrails specification for output generation with engineering stakeholders to explain how the content agent consumes retrieved information and builds the email.
- **Short:** Shared an agentic-guardrails specification to align engineering on content-agent logic.
- **Metrics:** None
- **Confidence:** Medium (document title only)
- **Evidence:** EV-034
- **Flag:** `USE`
- **Notes:**
  - **VERIFY:** Confirm Iman authored the document before claiming authorship.

#### ACH-018 | Product review of GenAI backlog stories
- **Role:** Senior Product Manager, Indegene
- **Period:** 31 Aug to 1 Sep 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #backlog #genai #requirements #guardrails
- **Long:** Held product review on GenAI backend and UI stories covering change-intent responses, chat-session persistence, error handling for API failures, and the empty-result case when upstream retrieval returns no content.
- **Short:** Reviewed GenAI stories covering change intent, session persistence and failure handling.
- **Metrics:** None
- **Confidence:** Medium (Jira items assigned to Iman)
- **Evidence:** EV-011
- **Flag:** `USE-SOFT`

#### ACH-044 | Deterministic-testing scope for a multi-agent GenAI email workflow
- **Role:** Senior Product Manager, Indegene
- **Period:** 17 Sep 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #llm-evaluation #guardrails #responsible-ai #requirements #stakeholder
- **Long:** Defined the deterministic-testing and AI-safety scope for a multi-agent GenAI email workflow in response to a senior stakeholder's concerns, separating where variance must not exist (retrieval with no LLM, approved content, fixed templates, MJML compile validation, no unapproved claims, altered wording or fabricated references) from each LLM decision point where variance must be measured (semantic-query generation, cluster retrieval and scoring, curation, placement, styling).
- **Short:** Defined where a GenAI email workflow must be deterministic and where LLM variance must be measured, agent by agent.
- **Metrics:** Product-built test-activity matrix: 60 tests (retrieval 15; five LLM agents 27; end-to-end 8; safety 10). The deck headlines it as "50+".
- **Confidence:** High
- **Evidence:** EV-035 (full transcript), EV-021, EV-048, SRC-11
- **Flag:** `USE`
- **Notes:**
  - **Detail (interviews and cover letters):** Framed three questions the system must answer in internal and client demos: how deterministic, how safe and how auditable it is. Included guardrail, red-team, prompt-injection and harmful-prompt testing, with the evidence needed for stakeholders. Treated retrieval determinism as an assumption for Engineering to verify rather than a result. Described these as valid questions for any LLM system, especially in pharma.
  - **Note:** The stakeholder's VP / AVP / Director level was confirmed by Iman. The transcript names the stakeholder but does not state the level.
  - **Vector search link (added 13 Oct 2026):** The semantic query generated for each user prompt is run against the vector database, so the framework checks that the same query returns the same clusters and relevance scores (EV-035, EV-039). Resume wording: "semantic-search retrieval". **Resolved (14 Oct 2026):** Iman confirmed the vector database sits in the email product. The transcript's "their vector DB" wording is superseded by this confirmation; write "vector database in the email product".
  - **Deck detail (SRC-11, presented to the business team 17 Sep 2026; added 15 Oct 2026):** Framed as "the three questions": how deterministic, how safe, how auditable. Retrieval designed as a zero-variance zone (algorithmic, no LLM); variance bounded to five LLM agents, controlled with temperature 0 and structured outputs; a same-prompt, N-run suite measuring cluster overlap, curation agreement, section match and end-to-end email similarity; prompt pre-processing flagged as a possible micro-variance source. Principle: "We measure variance; stakeholders decide acceptable limits." Cited Anthropic, OpenAI, Google, xAI and Moonshot documentation that no LLM guarantees identical output even at temperature 0, to set stakeholder expectations.

#### ACH-055 | Vector database strategy for the GenAI email platform
- **Role:** Senior Product Manager, Indegene
- **Period:** Jul 2025
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #technical #requirements #architecture
- **Long:** Defined the vector-database strategy for the GenAI email platform: set up a dedicated vector database inside the platform rather than reuse an integration partner's, and aligned with engineering on keeping it in sync with the approved-content library for continuous updates.
- **Short:** Defined the dedicated vector-database strategy for the GenAI email platform, synced to approved content.
- **Metrics:** None
- **Confidence:** High (AI meeting notes, accepted by Iman as direct evidence on 13 Oct 2026; Iman is named as clarifying that the partner team would not provide a vector database)
- **Evidence:** EV-036
- **Flag:** `USE`
- **Notes:**
  - **Confirmed by Iman (13 Oct 2026):** The vector DB sits in the email platform, one of the applications Iman manages. The 2025 client is Client A (resume wording: a top-10 US biopharmaceutical company). Confirmed again 14 Oct 2026: the vector database is in the email product.
  - **Source note:** Iman accepted AI notes as direct evidence and will verify the final resume. The notes themselves say "discussed" and "clarified"; strong verbs such as "defined" are Iman's call.
  - **VERIFY:** Whether the content library (internal term "Viva") is the approved-content store; see Part 8.2.
  - **Resolved (13 Nov 2026):** NCCI ownership confirmed as another team's service (SRC-14, E43: "The Knowledge Graph is part of the Sematic Mesh developed by NCCI. Again no actions needed from NCCA."). The vector database sits in the email product (Iman, 14 Oct 2026) but the knowledge graph and retrieval service belong to NCCI. Resume wording should not claim ownership of retrieval.
  - **Confirmed by ACH-077 (Nov 2026):** The production architecture diagram shows Pinecone as the vector database (Knowledge Base) and MongoDB and Redis as separate long-term memory stores. MongoDB and Redis are new facts not in earlier entries. The diagram also shows an event-triggered data-ingestion pipeline that keeps Pinecone current; see ACH-077 for the full pipeline.

#### ACH-056 | Vector database epic and prompt-vectorisation scoping
- **Role:** Senior Product Manager, Indegene
- **Period:** Sep to Oct 2025
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #technical #requirements #architecture #backlog
- **Long:** Scoped vector-database setup as the first epic of the GenAI email platform: separated migration of existing approved content from vectorising and retrieving prompts as distinct technical stories, explained semantic comparison of user prompts using vectorisation and relevance scoring, and listed the mandatory and optional metadata needed to vectorise prompts.
- **Short:** Scoped the vector-database epic: content migration, prompt vectorisation, retrieval and metadata requirements.
- **Metrics:** None
- **Confidence:** High (AI meeting notes, accepted by Iman 13 Oct 2026; Iman is named as speaker for each point; plus Iman's own Teams roadmap line, EV-041)
- **Evidence:** EV-037, EV-038, EV-041
- **Flag:** `USE`
- **Notes:**
  - **Add (Iman's own words):** A Teams message listing the GenAI roadmap includes "Input Prompting - vectorisation/parsing of the locked input prompt" (late 2025, EV-041).
  - **Wording limit:** The Oct 2025 session shows a colleague building the email-platform-to-vector-DB integration story. That is participation, not Iman's work; do not claim it.
  - **Do not claim:** The vector platform (Pinecone) was named by a colleague, not chosen by Iman. Name no tool on a resume.
  - **VERIFY:** Whether the epic shipped and when; add go-live date and content volume (Part 11).
  - **Resume priority (Iman, 15 Oct 2026): low.** Leave off by default; use in interviews or when a listing asks for it.

#### ACH-057 | RAG workflow for AI email creation
- **Role:** Senior Product Manager, Indegene
- **Period:** Sep 2026 (17 Sep transcript; 2 Sep sync notes)
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #technical #architecture #requirements #llm-evaluation
- **Long:** Defined the retrieval-augmented generation workflow behind AI email creation (user prompt, LLM-generated semantic query, vector-database retrieval of content clusters with relevance scores, curation, placement, email generation), specifying semantic-query generation as its own AI component and requiring that the same prompt returns the same clusters.
- **Short:** Defined the RAG workflow for AI email creation, from semantic query to vector retrieval to generation.
- **Metrics:** None
- **Confidence:** High (Iman's own transcript words, EV-035/EV-043; "RAG" label from a colleague's description in AI notes, EV-039)
- **Evidence:** EV-035, EV-039, EV-043, EV-047, EV-048
- **Flag:** `USE`
- **Notes:**
  - **Overlap (R10):** Same meeting as ACH-011, ACH-044 and ACH-045. Use ACH-057 for RAG/retrieval-architecture roles and ACH-044 for testing-scope roles; do not use both on one resume.
  - **Wording limit:** In the transcript Iman says the cosine-similarity behaviour is an assumption for engineering to verify (ACH-044). Do not claim measured retrieval results.
  - **Resolved (14 Oct 2026):** Iman confirmed the vector database sits in the email product; resume text follows that, not the transcript's "their vector DB" wording.
  - **Resume-safe wording:** "semantic query", "vector database", "content clusters" (not NCCA/NCCI).
  - **Retrieval design (SRC-11, added 15 Oct 2026):** cluster retrieval uses cosine similarity plus BM25 with reciprocal rank fusion and no LLM; relevance scores are pure computation ("A 96% score is 96% every run for the same query-cluster pair"). These are design guarantees and expected behaviour, not measured results; the wording limit above still applies.
  - **Wording (Iman, 15 Oct 2026):** say it was defined with engineering ("Defined the RAG architecture with engineering").
  - **Confirmed by ACH-077 (Nov 2026):** The production architecture diagram shows the full RAG pipeline as: rewrite query → semantic search → top-K document retrieval → re-ranking → top-N selection. This adds two steps (query rewriting and re-ranking) not explicitly named in this entry's earlier sources. Resume wording may now include "query rewriting and re-ranking" where the listing values RAG depth.

#### ACH-058 | Cluster selection and ranking logic
- **Role:** Senior Product Manager, Indegene
- **Period:** Aug 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #technical #requirements #architecture #stakeholder
- **Long:** Drove clarification of how the upstream retrieval service selects and orders content clusters for email generation, setting up a working session with its engineering team and defining the use cases where more than one cluster is used in a single email.
- **Short:** Drove clarity on cluster selection and ordering logic and multi-cluster use cases for AI email generation.
- **Metrics:** None
- **Confidence:** High (AI meeting notes and action items from a grooming file, accepted by Iman 13 Oct 2026; related Iman escalation in EV-002)
- **Evidence:** EV-002, EV-042
- **Flag:** `USE`
- **Notes:**
  - **VERIFY:** The source lists these as tasks "owned or driven" by Iman; confirm the discussion took place and its outcome.
  - **Resume priority (Iman, 15 Oct 2026): low.** Leave off by default; use in interviews or when a listing asks for it.

#### ACH-059 | Dynamic LLM-generated UI behaviour
- **Role:** Senior Product Manager, Indegene
- **Period:** Jun 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #ux #requirements #vision
- **Long:** Defined LLM-driven UX behaviour in which the interface adapts to the complexity and type of user input, and specified that the system must support scalable, variable UI outputs for LLM-generated messages.
- **Short:** Defined dynamic, LLM-generated UI behaviour with scalable variable outputs.
- **Metrics:** None
- **Confidence:** High (AI meeting notes, accepted by Iman 13 Oct 2026)
- **Evidence:** EV-040, EV-047
- **Flag:** `USE`
- **Notes:**
  - **Period:** Jun 2026 is before the Aug 2026 retrieval window, so it adds evidence from earlier in the year.
  - **Deck detail (SRC-11, 17 Sep 2026):** live UI updates reflect each agent's progress as the email is built, and the system gives dynamic, guided responses that steer users to the next action.

#### ACH-066 | Production GenAI content pipeline for pharma marketing
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #technical #architecture #gtm #metrics
- **Long:** Led the build of a production GenAI pipeline that creates derivative marketing assets from pre-approved content (extraction, semantic database, intent-based retrieval, final output) for a top-10 US biopharmaceutical company, cutting content turnaround by 50%.
- **Short:** Led a production GenAI pipeline for pharma marketing assets; content turnaround down 50%.
- **Metrics:** -50% content turnaround (baseline and period not stated; confirmed by Iman).
- **Confidence:** High (Iman's own statements, 13 to 14 Oct 2026)
- **Evidence:** SRC-9, EV-035, EV-043 (pipeline stages)
- **Flag:** `USE`
- **Notes:**
  - **Terminology:** Iman's term "semantic mesh" means the semantic database. On a resume write "semantic database (vector database)" once, then one term.
  - **Verbs:** Iman confirmed "led" and "built" (14 Oct 2026).
  - **Vector DB location:** Iman confirmed the vector database sits in the email product.
  - **Overlap (R10):** Same system as ACH-057, ACH-044 and ACH-001; use one on a resume, or this entry for the business result and ACH-057 for the architecture.

#### ACH-071 | End-to-end agentic email-authoring architecture
- **Role:** Senior Product Manager, Indegene
- **Period:** By 17 Sep 2026 (presented to the business team that day)
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #architecture #technical #guardrails #responsible-ai #requirements
- **Long:** Designed the end-to-end agentic email-authoring flow in which one natural-language prompt becomes a validated, brand-ready email: eight agents across two systems (guardrail, metadata extractor, copy generation for the semantic query, curation, placement, rule-based template selection, stylization and a validator that recompiles MJML until it is error-free), with cluster retrieval and relevance scoring done algorithmically, without an LLM, in the retrieval service.
- **Short:** Designed an eight-agent flow that turns one prompt into a validated, brand-ready email.
- **Metrics:** 8 agents across 2 systems; 5 agents make LLM decisions; retrieval and scoring use no LLM.
- **Confidence:** High (Iman's own deck, authored and presented by him; Iman: "how I have designed the end-to-end email generation flow", 15 Oct 2026)
- **Evidence:** EV-047, SRC-11
- **Flag:** `USE`
- **Notes:**
  - **Design guarantees:** safe by default (the guardrail screens every prompt; unsafe input never runs); retrieval is math (cosine + BM25 + reciprocal rank fusion, no LLM: same query, same result); self-correcting (the validator loops until MJML compiles); compliance built in (only MLR-approved claims and templates: "AI arranges, never invents"); fully auditable (every agent decision traced in Langfuse). Non-variance zones: content library, templates, MJML validation, claims library, email rendering.
  - **Demo scope (stakeholder management):** in scope: prompting, live UI updates per agent, dynamic guided responses, the new agentic flow. Deferred to later phases: non-happy paths, targeted e-detailing data, automated content extraction, reference emails for design.
  - **Overlap (R10):** ACH-014 is the user-facing seven-stage UX, ACH-057 the retrieval design, ACH-066 the business result (-50% turnaround). Use ACH-071 for the architecture claim; it pairs with ACH-066 and ACH-057, but do not put it on the same line as ACH-014.
  - **VERIFY:** who owns the retrieval service (see ACH-055).
  - **Resume-safe wording:** "agentic email-authoring flow", "retrieval service", "LLM agent layer"; never NCCA, NCCI or Peak D.
  - **Resume-ready line (15 Oct 2026):** "Built compliance in: agents use only approved claims and templates, so AI arranges but never invents."
  - **Superseded by ACH-077 (Nov 2026):** The Nov 2026 architecture diagram names a different set of agents (Metadata Extractor, Module Searcher, Template Searcher, Email Assembler, Email Assembly Helper, plus a Business Rules Agent and a Planning Agent/Orchestrator). Use ACH-077's agent naming on future resumes. The 8-agent count and 2-system architectural split from this entry remain valid context for how the pipeline was designed; ACH-071 is still the best entry for the step-by-step pipeline logic.

#### ACH-072 | Red-team assessment of the agentic email flow
- **Role:** Senior Product Manager, Indegene (role in the red-team to confirm)
- **Period:** By 17 Sep 2026 (date to confirm)
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #guardrails #responsible-ai #llm-evaluation #metrics
- **Long:** Reported red-team results for the agentic email flow to the business: a 98.64% overall defence rate (1,795 of 1,819 tests defended), no critical findings, 3 high, 8 medium and 4 low, with targeted remediation and a retest plan for the highest attack-success areas (system-prompt override 40%, disinformation 34%, hallucination 18%).
- **Short:** Red-team: 98.64% defence rate across 1,819 tests, no critical findings.
- **Metrics:** 98.64% defence (1,795 of 1,819); 0 critical, 3 high, 8 medium, 4 low. Defence by category: security and access control 97%, compliance and legal 99%, trust and safety 99%, brand 98%.
- **Confidence:** High for the figures as shown on the slide; Iman's role in the red-team is not stated.
- **Evidence:** EV-049
- **Flag:** `CONFIRM-FIRST`
- **Notes:**
  - **Denominators:** the deck's notes say the report screenshots show 1,781 tests (evaluation header), 1,819 (risk-category view) and 1,469 (attack-success view). Quote only 98.64% with 1,795 of 1,819; never mix the totals.
  - **VERIFY:** Iman's role (ran, commissioned and owned, or reported), the tool and the date. Use the verb "reported" until confirmed.

#### ACH-073 | Stage-inspectable stylization pipeline (I/O contracts)
- **Role:** Senior Product Manager, Indegene
- **Period:** 29 Jul 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #technical #architecture #requirements #llm-evaluation
- **Long:** Resolved how the five-agent stylization pipeline (curation, payload assembly, placement, stylization, validation) hands off between stages: proposed, and aligned engineering and QA on, unstyled MJML at the placement stage and styled MJML at the stylization stage, so QA catches placement bugs one stage earlier, separates placement from styling bugs and re-runs a single stage; added two safeguards, a Level-1 MJML profile (allowed tags as a lint spec) and an automatic content-preservation diff that rejects any stylization change beyond styling.
- **Short:** Aligned engineering and QA on a stage-inspectable stylization pipeline with a content-preservation check.
- **Metrics:** 5 agents; 2 design decisions; 2 safeguards.
- **Confidence:** High (Iman's plan; Iman confirmed it was aligned with engineering and QA, 15 Oct 2026)
- **Evidence:** EV-050, SRC-12
- **Flag:** `USE`
- **Notes:**
  - **Wording limit:** "proposed and aligned", not "shipped"; adoption and build status are not shown. Next steps in the deck: write the Level-1 profile spec, design the diff check, update the I/O contracts on the related tickets.
  - **Research cited:** HeyGen Hyperframes, UniPPTBench, Charts-of-Thought and Renderify, showing markup-native pipelines with intermediate rendering as the dominant pattern.
  - **Related:** ACH-047 (earlier HTML-to-MJML vs design-agent trade-off), ACH-049 (MJML specs).

#### ACH-074 | Layered per-agent and end-to-end evaluation design
- **Role:** Senior Product Manager, Indegene
- **Period:** 29 Jul 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #llm-evaluation #genai #metrics #technical
- **Long:** Designed a layered evaluation for the five-agent pipeline: per-agent metrics as the diagnostic layer and one end-to-end outcome score, all instrumented as scored observations in Langfuse with an alert on any drop above 10% week over week; defined the primary metric for each stage and planned rubrics, test datasets per interface and LLM-as-judge evaluators.
- **Short:** Designed per-agent plus end-to-end evaluation in Langfuse, with LLM-as-judge and weekly alerts.
- **Metrics:** 6 scored observations (5 agents plus end-to-end); alert on a >10% week-over-week drop (design threshold, not a result); SME-rated 0 to 5 final-email quality.
- **Confidence:** High (Iman's plan, aligned with engineering and QA)
- **Evidence:** EV-050, SRC-12
- **Flag:** `USE`
- **Notes:**
  - **Per-stage metrics:** curation: mandatory-component recall, MLR pass rate; payload: field completeness, schema validity; placement: placement-strategy correctness, visual QA render pass; stylization: brand adherence, content-preservation diff, MJML compiles; validator: false-positive and false-negative rates; end-to-end: SME-rated quality (0 to 5) and task success.
  - **Rationale:** localises failures, protects each agent from regressions, and allows per-stage model swaps for cost. Sources cited: Confident AI, MLflow and Langfuse evaluation guides.
  - **Wording limit:** a design and plan; no measured results yet.
  - **Overlap (R10):** distinct from ACH-002 (content-selection accuracy results); can sit beside it.
  - **Resume priority (Iman, 15 Oct 2026): low.** Leave off by default; use in interviews or when a listing asks for it.
  - **Infrastructure confirmed by ACH-077 (Nov 2026):** The production architecture diagram shows end-to-end LLM and agent telemetry as a formal system component, confirming that the scored-observations instrumentation in Langfuse (designed in this entry) has production-grade tracing infrastructure behind it.

#### ACH-077 | Production system architecture for the GenAI email platform (Content Studio - Email)
- **Role:** Senior Product Manager, Indegene
- **Period:** By Nov 2026 (exact date of diagram to confirm)
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #architecture #technical #guardrails #responsible-ai #requirements
- **Long:** Set the architectural requirements and directed engineering to build the end-to-end production system for the GenAI email platform (Content Studio - Email): a multi-agent RAG architecture hosted on AWS (Indegene Cloud) with Azure OpenAI multi-model inference (GPT-4o, GPT-4o mini, GPT-5 mini), comprising a conversational NL interface, a Node.js API gateway with authentication and routing, request and response guardrails for safety and intent validation, a planning agent/orchestrator using a ReAct loop to decompose tasks and coordinate agents, a business rules agent enforcing compliance across all agents, a multi-agentic environment with five specialised agents (Metadata Extractor, Module Searcher, Template Searcher, Email Assembler, Email Assembly Helper) supported by five tools (Retrieval, External API, Validation, Content Block and Footnote/Reference, Response Refinement), a RAG pipeline (query rewriting, semantic search, top-K retrieval, re-ranking, top-N selection), a memory layer (MongoDB and Redis for long-term storage, Pinecone vector database as the knowledge base), an event-triggered data-ingestion pipeline (Data Loader, extraction, cleaning, chunking with metadata, embedding via text-embedding-3-large, indexing in Pinecone), Apigee as secure TLS-encrypted middleware to Veeva PromoMats for MLR review and approval, and end-to-end LLM and agent tracing/telemetry capturing execution traces, LLM calls, token usage, latency, errors and cost metrics.
- **Short:** Set architectural requirements for a multi-agent RAG email platform on AWS with Azure OpenAI, RAG, event-driven ingestion and end-to-end telemetry.
- **Metrics:** 5 specialised agents; 5 tools; 3 storage systems (MongoDB, Redis, Pinecone); 3 AI models (GPT-4o, GPT-4o mini, GPT-5 mini); 1 embedding model (text-embedding-3-large).
- **Confidence:** High (architecture diagram built by engineering based on Iman's requirements; Iman shared and confirmed in conversation, Nov 2026)
- **Evidence:** SRC-13 (architecture diagram "Content Studio - Email", Nov 2026)
- **Flag:** `USE`
- **Notes:**
  - **Framing (GPM):** Iman set the requirements and architectural direction; the engineering team built the system. Resume wording: "Set the architecture requirements for..." or "Directed engineering to build...", not "Built" or "Designed" (see GPM-framing feedback). For the current role use direction verbs; hands-on design verbs are fine when describing the earlier ACH-071 deck work.
  - **Supersedes ACH-071 agent naming (Nov 2026):** The diagram names five agents (Metadata Extractor, Module Searcher, Template Searcher, Email Assembler, Email Assembly Helper) in the multi-agentic environment plus a separate Business Rules Agent and a Planning Agent/Orchestrator. The earlier SRC-11 deck (ACH-071, Sep 2026) named eight agents (guardrail, metadata extractor, copy generation, curation, placement, template selection, stylization, validator) across two systems. Future resumes should use ACH-077's naming; ACH-071's 8-agent count remains valid historical context.
  - **Overlap (R10):** Use ACH-077 for the full system architecture on resumes. Use ACH-071 for the agentic email-authoring pipeline detail (how the flow works step by step). Use ACH-057 for RAG-specific depth. Use ACH-066 for the business result (-50% turnaround). Do not put more than two of these on one resume.
  - **Resume-safe wording:** "multi-agent RAG architecture", "planning agent with ReAct reasoning", "business rules agent", "event-driven data ingestion", "multi-model LLM strategy", "vector knowledge base", "end-to-end LLM telemetry", "secure API middleware to compliance review system". Never use internal terms (NCCA, NCCI, Peak D); for vendor names, use them only when a listing calls for the specific technology.
  - **Data-ingestion pipeline (new):** When a module's status changes to "Available for Use" in the source system, an event triggers the Data Loader → extraction → cleaning → chunking with metadata → embedding (text-embedding-3-large) → indexing in Pinecone. This keeps the RAG knowledge base current with the latest approved content. No existing ACH entry captures this pipeline.
  - **Memory architecture (new):** MongoDB and Redis for long-term memory; Pinecone as the vector-database knowledge base. ACH-055 and ACH-056 cover the vector-database strategy; ACH-077 adds MongoDB and Redis.
  - **VERIFY:** The exact date the diagram was created or last updated. Which specific architectural decisions were Iman's vs engineering's choices (for example, the multi-model selection, the choice of MongoDB and Redis, the ReAct pattern for the orchestrator). Whether the agent count (5 in the multi-agentic environment + Business Rules Agent + Planning Agent = 7 total) is how Iman frames it, or if it is still "8 agents across 2 systems" as in ACH-071.

#### ACH-079 | Designed an experiment to test which knowledge-graph cluster shapes produce usable emails
- **Role:** Senior Product Manager, Indegene
- **Period:** Jul 2026 to Aug 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #llm-evaluation #genai #requirements #knowledge-graph
- **Long:** Proposed and scoped a validation experiment that generates emails from each content-cluster type sourced from the upstream knowledge graph, so SMEs can decide which cluster shapes the agentic email-authoring flow should accept.
- **Short:** Proposed an SME-validated experiment to test which content-cluster shapes produce usable emails.
- **Metrics:** About 64 clusters, 16 scenarios × 4 each [TARGETS, not results]
- **Confidence:** High (Iman named as proposer; AI meeting notes also reference the plan)
- **Evidence:** SRC-14 (E16, E22, E15, E20)
- **Flag:** `CONFIRM-FIRST`
- **Notes:**
  - **VERIFY:** The outcome. No result was found; sources only show plans for 15 to 20 sample emails (31 Aug recap). Confirm whether the experiment ran and what it showed.
  - **Overlap (R10):** Distinct from ACH-002 (content-selection accuracy results); this tests cluster shapes, not selection accuracy.

#### ACH-084 | Built taxonomy-aware test prompts for cluster selection evaluation
- **Role:** Senior Product Manager, Indegene
- **Period:** Aug 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #llm-evaluation #genai #knowledge-graph
- **Long:** Revised the SME evaluation prompt set with deliberate topic and audience repetition and probe prompts targeting edge-case cluster shapes from the content taxonomy, to isolate retrieval failures in the upstream knowledge-graph service.
- **Short:** Designed probe prompts to test retrieval across content-taxonomy cluster shapes.
- **Metrics:** None
- **Confidence:** High (Iman's own work on the prompt sheet)
- **Evidence:** SRC-14 (E14, E13)
- **Flag:** `USE`
- **Notes:**
  - **VERIFY:** The prompt count in the final sheet ("Prompts - Cluster selection and sequencing.xlsx").
  - **Resume-safe wording:** "content-taxonomy cluster shapes", "probe prompts for edge-case retrieval".

#### ACH-086 | Tracked upstream retrieval accuracy against product benchmark
- **Role:** Senior Product Manager, Indegene
- **Period:** Oct 2026
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #llm-evaluation #stakeholder #knowledge-graph
- **Long:** Tracked content-cluster creation and selection accuracy from the upstream knowledge-graph service against the email platform's 85% benchmark, proposed independent SME sampling to challenge upstream figures, and flagged risks before user acceptance testing.
- **Short:** Tracked upstream retrieval accuracy against an 85% benchmark before user acceptance testing.
- **Metrics:** Cluster creation 76%; selection hybrid 45.3% and agentic 60.55% (latest iterations); benchmark 85% [TARGETS, not results for benchmark]
- **Confidence:** High (Iman's own emails and meeting participation)
- **Evidence:** SRC-14 (E3, E4, E5, E7)
- **Flag:** `CONFIRM-FIRST`
- **Notes:**
  - **VERIFY:** These are the upstream team's accuracy results, not Iman's. The link to the knowledge graph is indirect. Confirm what Iman's role was in setting the benchmark and whether the accuracy improved.
  - **Overlap (R10):** Related to ACH-002 (evaluation framework) and ACH-030 (upstream escalation with a drop-dead ETA). ACH-086 adds the specific accuracy figures and the independent-sampling proposal.

### 5.3 Product development and release management

#### ACH-019 | Banner feedback triage
- **Role:** Senior Product Manager, Indegene
- **Period:** 11 Aug 2026
- **Theme:** Product development and release management
- **Tags:** #backlog #prioritisation #requirements
- **Long:** Triaged client-reviewer banner feedback into confirmed bugs, feature requests, UX improvements, observations and design limitations, using filters and colour coding to separate decisions that need data.
- **Short:** Triaged banner feedback into bugs, features, UX improvements and design limitations.
- **Metrics:** 1 bug confirmed in the initial triage.
- **Confidence:** High
- **Evidence:** EV-008
- **Flag:** `USE`

#### ACH-020 | Business-demand prioritisation for the next banner release
- **Role:** Senior Product Manager, Indegene
- **Period:** 7 to 25 Aug 2026
- **Theme:** Product development and release management
- **Tags:** #prioritisation #roadmap #stakeholder #release-mgmt
- **Long:** Requested business context and sharper must-have prioritisation for 23 proposed banner features before product assessment, and consolidated defect-tracker, live-testing and business-intake sources into an initial list of 11 proposed features.
- **Short:** Prioritised 23 banner demands into an initial 11-feature release proposal.
- **Metrics:** 23 feature demands; 11 proposed features.
- **Confidence:** High for the 23-feature request (EV-001). Low for the 11-feature list (AI notes, EV-009)
- **Evidence:** EV-001 (High), EV-009 (Low, AI notes)
- **Flag:** `USE`
- **Notes:**
  - **VERIFY:** Confirm the 11-feature list and the code-editor vs 30 to 40 of 60+ requests trade-off.

#### ACH-021 | Requirement evidence standards for banner features
- **Role:** Senior Product Manager, Indegene
- **Period:** 3 and 10 Sep 2026
- **Theme:** Product development and release management
- **Tags:** #requirements #prd #backlog #stakeholder
- **Long:** Set evidence standards for banner requirements: defined user problem statements (for example selecting overlapping layers), asked whether the improvement applies beyond the editor canvas, required PRD review, and asked for concrete value samples for QA reference.
- **Short:** Set requirement standards: problem statements, PRD review and QA test samples.
- **Metrics:** None
- **Confidence:** High
- **Evidence:** EV-014, EV-018
- **Flag:** `USE`

#### ACH-022 | Demand vs capacity framing for October release
- **Role:** Senior Product Manager, Indegene
- **Period:** 18 Aug 2026
- **Theme:** Product development and release management
- **Tags:** #prioritisation #release-mgmt #stakeholder #scope-governance
- **Long:** Separated 27 business feature requests from available engineering and testing capacity, told the business October-end was not possible at current capacity, and still planned what could be done by October end.
- **Short:** Framed 27 feature requests against engineering capacity and planned a feasible October scope.
- **Metrics:** 27 feature requests.
- **Confidence:** High
- **Evidence:** EV-024. Corroborated (Low) by EV-004, EV-005
- **Flag:** `USE`

#### ACH-023 | Sequencing low-input features first
- **Role:** Senior Product Manager, Indegene
- **Period:** 18 Aug 2026
- **Theme:** Product development and release management
- **Tags:** #prioritisation #roadmap #requirements
- **Long:** Sequenced four features needing minimal further product input to start first, while requirements work continued on the remaining requests through 28 August.
- **Short:** Started with four low-input features while continuing requirements on the rest.
- **Metrics:** 4 features; requirements gathering until 28 Aug.
- **Confidence:** High
- **Evidence:** EV-026
- **Flag:** `USE`

#### ACH-024 | Cross-channel email conversion requirement
- **Role:** Senior Product Manager, Indegene
- **Period:** 18 to 19 Aug 2026
- **Theme:** Product development and release management
- **Tags:** #requirements #prd #genai #scope-governance
- **Long:** Defined a time-saving requirement to convert an approved email into another marketing-platform channel by changing only tokens and avoiding a separate MLR review cycle; split the combined demand into two independently scoped features, each with its own problem statement.
- **Short:** Defined an approved-email conversion feature that avoids a second MLR cycle; split one demand into two.
- **Metrics:** None
- **Confidence:** High
- **Evidence:** EV-027, EV-028, EV-032
- **Flag:** `USE`
- **Notes:**
  - **Resume priority (Iman, 15 Oct 2026): low.** Leave off by default; use in interviews or when a listing asks for it.

#### ACH-025 | Problem validation and requirements freeze before solutioning
- **Role:** Senior Product Manager, Indegene
- **Period:** 19 Aug 2026
- **Theme:** Product development and release management
- **Tags:** #prd #requirements #stakeholder #scope-governance
- **Long:** Required problem validation and a frozen requirement before solutioning, replaced a working diagram with a PRD for scope sign-off, and linked client sign-off to the start of solutioning and engineering-capacity planning.
- **Short:** Enforced problem validation and PRD sign-off before solutioning.
- **Metrics:** None
- **Confidence:** High
- **Evidence:** EV-031, EV-033
- **Flag:** `USE`

#### ACH-026 | Release gating across Product, Engineering, QA and Business
- **Role:** Senior Product Manager, Indegene
- **Period:** 11 and 25 Aug 2026
- **Theme:** Product development and release management
- **Tags:** #release-mgmt #uat #stakeholder #technical
- **Long:** Managed release blockers and gating decisions across Product, Engineering, QA and Business for two email releases, including recommending a single CRM for remaining testing and deciding that one release could move to UAT without waiting for remaining client confirmation.
- **Short:** Drove release gating and UAT timing across Product, Engineering, QA and Business.
- **Metrics:** None
- **Confidence:** High for blocker reporting (EV-002). Low for the UAT decisions (AI notes, EV-007)
- **Evidence:** EV-002 (High), EV-007 (Low, AI notes)
- **Flag:** `USE`
- **Notes:**
  - **VERIFY:** Confirm the UAT dates before quoting them.

#### ACH-027 | Preventing scope creep in a banner epic
- **Role:** Senior Product Manager, Indegene
- **Period:** 9 Sep 2026
- **Theme:** Product development and release management
- **Tags:** #scope-governance #backlog #requirements
- **Long:** Challenged a numeric limit with an edge case during grooming and instructed the team not to include unconfirmed functionality in the epic.
- **Short:** Challenged an edge case in grooming and kept unconfirmed functionality out of scope.
- **Metrics:** None
- **Confidence:** Low (AI notes)
- **Evidence:** EV-022
- **Flag:** `USE`

#### ACH-046 | Sprint-risk intervention
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated in source
- **Theme:** Product development and release management
- **Tags:** #release-mgmt #scope-governance #backlog #ai-tools
- **Long:** Led a sprint-risk intervention on a 115-item scope with 4 days to close, analysing per-assignee load with Claude and making 8 descope decisions.
- **Short:** Used Claude to run a 115-item sprint-risk review with 4 days to close: per-assignee load analysis and 8 descope decisions.
- **Metrics:** 115 items; 4 days to close; 8 descope decisions.
- **Confidence:** High (confirmed by Iman, 12 Oct 2026; source is an AI-extracted dump)
- **Evidence:** SRC-1
- **Flag:** `USE`
- **Notes:**
  - **Wording (Iman, 15 Oct 2026):** always name Claude; place it in the AI-native row as an example of AI used across the product lifecycle.

#### ACH-050 | Story decomposition at scale
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated in source
- **Theme:** Product development and release management
- **Tags:** #backlog #requirements #prd #ai-tools
- **Long:** Decomposed features into build-ready stories with Claude: a 24-story epic for the core email-generation product, 20+ stories for a table feature (drag-and-drop, cross-client rendering), banner component foundations and responsive stacking, and stories derived from Figma designs.
- **Short:** Broke features into stories at scale (24-story epic, 20+ story table feature) with Claude.
- **Metrics:** 24 stories; 20+ stories.
- **Confidence:** High (confirmed by Iman, 12 Oct 2026; source is an AI-extracted dump)
- **Evidence:** SRC-1
- **Flag:** `USE`

#### ACH-067 | MVP-led validation cutting engineering effort
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated
- **Theme:** Product development and release management
- **Tags:** #requirements #prd #stakeholder #metrics #vision
- **Long:** Cut engineering effort by about 50% against planning estimates by validating requirements through MVPs and structured interviews with domain experts, analysts and end customers to establish product-market fit.
- **Short:** Cut engineering effort about 50% against estimates through MVP-led validation and customer interviews.
- **Metrics:** about -50% engineering man-hours against Iman's planning estimate (estimate-based, not a measured baseline).
- **Confidence:** High (Iman's own statement, 14 Oct 2026)
- **Evidence:** SRC-9
- **Flag:** `USE`
- **Notes:**
  - **Wording limit:** Always say "against planning estimates"; do not write "reduced requirements rework by 50%".
  - **VERIFY:** Which product and period.

#### ACH-081 | Specified the integration contract with the upstream knowledge-graph retrieval service
- **Role:** Senior Product Manager, Indegene
- **Period:** Mar 2026 to Jun 2026
- **Theme:** Product development and release management
- **Tags:** #requirements #architecture #technical #knowledge-graph
- **Long:** Specified what the upstream content-retrieval service must return to the email platform: tagged content nodes including parent–child claim links, relevance scores, machine-readable justification and source lineage. These requirements were tracked in dependent user stories.
- **Short:** Specified the data contract for knowledge-graph content clusters feeding the email platform.
- **Metrics:** Top 3 clusters per query, aligned to top 2 for now [TARGETS, not results]
- **Confidence:** High (Iman's own emails and integration requirements)
- **Evidence:** SRC-14 (E31, E24, E28)
- **Flag:** `USE`
- **Notes:**
  - **VERIFY:** Which fields were actually delivered. Jira stories: CONE-8938, CONE-9220, CONE-9221, CONE-8949, CONE-9233.
  - **Resume-safe wording:** "content-retrieval service", "knowledge-graph content clusters", "machine-readable justification", "source lineage". Never NCCI.

#### ACH-085 | Defined parent–related claim hierarchy handling from the approved-content library
- **Role:** Product Manager to Senior Product Manager, Indegene
- **Period:** Aug 2024 to Feb 2026
- **Theme:** Product development and release management
- **Tags:** #requirements #technical #knowledge-graph
- **Long:** Wrote requirements for importing, prioritising and rendering parent claims with their related claims from the approved-content library, including shared related-claim handling, broad-to-narrow prioritisation in guardrails, and scope exclusions.
- **Short:** Defined parent–related claim hierarchy behaviour for import, prioritisation and editor use.
- **Metrics:** None
- **Confidence:** High (Iman's own emails and requirements)
- **Evidence:** SRC-14 (E50, E47, E45, E48, E53, E51, E49, E46)
- **Flag:** `USE-SOFT`
- **Notes:**
  - **VERIFY:** This is graph-like (parent–child hierarchy), not a knowledge graph in the strict sense, so word it carefully. Release 9 and 10 stories were sent by others; confirm Iman's authorship.
  - **Jira stories:** NCCA-R9-1, NCCA-R9-2, CIA-2261, CIA-2269, CONE-6802.

### 5.4 Technical depth

#### ACH-005 | Technical product decisions with engineering
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** Technical depth
- **Tags:** #technical #prd #release-mgmt
- **Long:** Drove technical product decisions with engineering leads: structured a cross-system integration architecture trade-off, analysed upstream API payloads to catch data mistagging before it reached the AI pipeline, ran rendering and device-testing POCs, and communicated technical limitations to business with specificity.
- **Short:** Drove architecture trade-offs, API payload analysis and device-testing POCs with engineering.
- **Metrics:** None
- **Confidence:** Resume
- **Evidence:** EV-005, EV-030 (related)
- **Flag:** `USE`

#### ACH-047 | Cross-system integration architecture trade-off
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated in source
- **Theme:** Technical depth
- **Tags:** #technical #prd #genai #stakeholder
- **Long:** Structured a cross-system integration trade-off between two competing paths (converting HTML to MJML, or passing raw cluster data to an embedded design agent), asked diagnostic questions on MJML constraints and native rendering support, and drove the decision with engineering leads.
- **Short:** Structured and drove an integration architecture decision between two competing paths with engineering leads.
- **Metrics:** None
- **Confidence:** High (confirmed by Iman, 12 Oct 2026; source is an AI-extracted dump)
- **Evidence:** SRC-1
- **Flag:** `USE`
- **Notes:**
  - **Resume priority (Iman, 15 Oct 2026): low.** Leave off by default; use in interviews or when a listing asks for it.

#### ACH-048 | Upstream API payload analysis
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated in source
- **Theme:** Technical depth
- **Tags:** #technical #genai #requirements #ai-tools
- **Long:** Personally analysed two raw JSON payloads from an upstream retrieval API, found mistagging and redundant tagging in the cluster data, and turned the findings into product rules before the data reached the AI pipeline.
- **Short:** Analysed raw API payloads, caught data mistagging and turned it into product rules.
- **Metrics:** 2 raw payloads analysed.
- **Confidence:** High (confirmed by Iman, 12 Oct 2026; source is an AI-extracted dump)
- **Evidence:** SRC-1
- **Flag:** `USE`
- **Notes:**
  - **Detail:** Claude was used to analyse the JSON payloads (SRC-1).

#### ACH-049 | Email rendering and accessibility specifications
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated in source
- **Theme:** Technical depth
- **Tags:** #technical #accessibility #requirements #prd
- **Long:** Specified email rendering and accessibility requirements: MJML compiler version parity, headless rendering viewports (600, 480 and 320 px), VML fallback handling, Outlook border-radius degradation documented as expected behaviour, and WCAG contrast-ratio validation logic written into stories.
- **Short:** Wrote rendering, cross-client and WCAG contrast requirements into stories.
- **Metrics:** viewports 600, 480 and 320 px.
- **Confidence:** High (confirmed by Iman, 12 Oct 2026; source is an AI-extracted dump)
- **Evidence:** SRC-1
- **Flag:** `USE`
- **Notes:**
  - **Resume priority (Iman, 15 Oct 2026): low.** Leave off by default; use in interviews or when a listing asks for it.

#### ACH-051 | Rendering POCs and trade-off communication
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated in source
- **Theme:** Technical depth
- **Tags:** #technical #stakeholder #exec-comms
- **Long:** Ran rendering POCs for Salesforce and Outlook, analysed device-testing failures, compared authoring in the banner platform against Google Banner Studio, and communicated POC limitations to business with explicit trade-off framing.
- **Short:** Ran rendering POCs and communicated their limitations to business as clear trade-offs.
- **Metrics:** None
- **Confidence:** High (confirmed by Iman, 12 Oct 2026; source is an AI-extracted dump)
- **Evidence:** SRC-1, SRC-3
- **Flag:** `USE`

#### ACH-052 | Release-risk gatekeeping before customer communication
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated in source
- **Theme:** Technical depth
- **Tags:** #release-mgmt #technical #stakeholder
- **Long:** Flagged that older templates might break after a rich-text editor library change and required confirmation before communicating to the customer; made a precise product decision on two-decimal-point precision across settings.
- **Short:** Stopped a customer message until a template-breakage risk was confirmed; set a two-decimal precision rule.
- **Metrics:** None
- **Confidence:** High (confirmed by Iman, 12 Oct 2026; source is an AI-extracted dump)
- **Evidence:** SRC-1
- **Flag:** `USE`

#### ACH-078 | Defined the content-relationship model for knowledge-graph-sourced content clusters
- **Role:** Senior Product Manager, Indegene
- **Period:** Jul 2026 to Aug 2026
- **Theme:** Technical depth
- **Tags:** #genai #technical #requirements #architecture #stakeholder #knowledge-graph
- **Long:** Defined how the email platform consumes content clusters from an upstream knowledge graph: node types (KeyClaim, SupportingClaim, ReusableText, Component), primary-node rules, relationship direction, cardinality (1..N) and mandatory/optional mapping. Led cross-team sessions with business, retrieval engineering and QA to align on 12 in-scope cluster types.
- **Short:** Defined node and relationship model for knowledge-graph content clusters; aligned 12 in-scope cluster types.
- **Metrics:** 12 in-scope cluster types (5 Aug 2026 transcript); 48 example clusters requested [TARGETS, not results]
- **Confidence:** High (Iman listed as file author and said "I have worked on it"; Iman chaired the business session)
- **Evidence:** SRC-14 (E17, E18, E19, E20, E21, E22, E23)
- **Flag:** `USE`
- **Notes:**
  - **VERIFY:** Whether business signed off formally (E21 asked for sign-off by 24 Jul 2026). Document is the derivative content flow guardrails doc; 12 types comes from Iman's spoken count.
  - **Resume-safe wording:** "content-relationship model", "knowledge-graph content clusters", "node types", "cluster types". Never use NCCA or NCCI.
  - **Overlap (R10):** Complements ACH-057 (RAG workflow) and ACH-058 (cluster selection and ranking logic). ACH-078 adds the node-level data model that ACH-057 and ACH-058 do not record. Can sit beside them.

#### ACH-082 | Analysed node-level quality of knowledge-graph payloads
- **Role:** Senior Product Manager, Indegene
- **Period:** Jun 2026
- **Theme:** Technical depth
- **Tags:** #technical #escalation #knowledge-graph
- **Long:** Analysed upstream cluster payloads at node level and found substantiation attached to unrelated nodes. Requested machine-readable selection reasoning and no-result reasoning to support an explainable UI.
- **Short:** Found node-level data issues in knowledge-graph payloads; requested explainable API fields.
- **Metrics:** One footnote on 18 nodes in a single cluster
- **Confidence:** High (Iman's own analysis)
- **Evidence:** SRC-14 (E26, E28, E27)
- **Flag:** `CONFIRM-FIRST`
- **Notes:**
  - **VERIFY:** Overlap with ACH-048 (upstream API payload analysis from SRC-1). ACH-048 found mistagging and redundant tagging; ACH-082 adds substantiation attached to unrelated nodes and the request for machine-readable reasoning. If the same work, merge into ACH-048. If different instances, keep both.

### 5.5 Stakeholder management

#### ACH-004 | Product decision point across senior stakeholders
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** Stakeholder management
- **Tags:** #stakeholder #escalation #release-mgmt #scope-governance #exec-comms
- **Long:** Operated as product decision point across VP-, AVP- and Director-level stakeholders: escalating blockers with delivery-impact statements, steering release planning to prevent under-scoped commitments, enforcing scope boundaries when late inputs threatened timelines, and communicating risk posture during live customer testing.
- **Short:** Product decision point for VP, AVP and Director stakeholders on scope, releases and risk.
- **Metrics:** None
- **Confidence:** Resume
- **Evidence:** EV-002, EV-023, EV-024, EV-029 (related)
- **Flag:** `USE`

#### ACH-028 | Holding timelines until requirements are defined
- **Role:** Senior Product Manager, Indegene
- **Period:** 18 Aug 2026
- **Theme:** Stakeholder management
- **Tags:** #stakeholder #scope-governance #exec-comms
- **Long:** Prepared the team to hold timeline commitments until open questions were answered, sharing open questions with the business in advance and using the discussion as a requirement-gathering session.
- **Short:** Held timeline commitments until requirements were defined, with open questions shared in advance.
- **Metrics:** None
- **Confidence:** High
- **Evidence:** EV-029
- **Flag:** `USE`

#### ACH-029 | Two-option framing for business expectations
- **Role:** Senior Product Manager, Indegene
- **Period:** 19 Aug 2026
- **Theme:** Stakeholder management
- **Tags:** #stakeholder #exec-comms #prioritisation
- **Long:** Proposed presenting the business with two options: an October release with prioritised features, and an estimate of the time needed to address all client feedback, to manage expectations.
- **Short:** Offered the business two scope-vs-time options to manage expectations.
- **Metrics:** None
- **Confidence:** Low (AI notes)
- **Evidence:** EV-004
- **Flag:** `USE`

#### ACH-030 | Risk escalation with a drop-dead ETA
- **Role:** Senior Product Manager, Indegene
- **Period:** 12 Oct 2026
- **Theme:** Stakeholder management
- **Tags:** #escalation #stakeholder #llm-evaluation
- **Long:** Escalated a data-availability risk from an upstream team, asked for a drop-dead ETA and requested a plan to raise accuracy to benchmark.
- **Short:** Escalated an upstream data risk with a drop-dead ETA and an accuracy plan.
- **Metrics:** None
- **Confidence:** High
- **Evidence:** EV-023
- **Flag:** `USE`

#### ACH-053 | Escalation and scope enforcement across four accounts
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated in source
- **Theme:** Stakeholder management
- **Tags:** #stakeholder #escalation #scope-governance #release-mgmt
- **Long:** Escalated and enforced scope across four client accounts: held the line with "there is no descoping" under pressure, recommended moving a release-planning meeting when inputs were not ready, raised blockers with impact statements, and sent a UAT triage email directly to a senior leader and a guardrails-blocking email to the full senior group.
- **Short:** Enforced scope and escalated blockers with impact statements across four client accounts.
- **Metrics:** None
- **Confidence:** High (confirmed by Iman, 12 Oct 2026; source is an AI-extracted dump)
- **Evidence:** SRC-2, SRC-3
- **Flag:** `USE`
- **Notes:**
  - **Detail (interviews):** Adds a product-judgment layer before escalating rather than only relaying; escalated a fragment-related blocker with an impact statement (SRC-3). Stakeholder levels are in Part 9.

#### ACH-083 | Escalated a tagging gap blocking evaluation of graph-sourced content
- **Role:** Senior Product Manager, Indegene
- **Period:** Sep 2026
- **Theme:** Stakeholder management
- **Tags:** #escalation #stakeholder #llm-evaluation #knowledge-graph
- **Long:** Escalated that upstream knowledge-graph clusters carried no optional text nodes, which blocked curation-agent testing. Clarified that tag ownership sits with the upstream retrieval team, called an urgent meeting, and testing continued in phases.
- **Short:** Escalated an upstream tagging gap that blocked agent testing; testing continued in phases.
- **Metrics:** None
- **Confidence:** High (Iman's own emails)
- **Evidence:** SRC-14 (E11, E12, E10)
- **Flag:** `CONFIRM-FIRST`
- **Notes:**
  - **VERIFY:** Overlap with ACH-030 (escalation on NCCI data availability with a drop-dead ETA). ACH-030 is the accuracy escalation; ACH-083 is the tagging-gap escalation. If the same event, merge. The phased plan rests partly on AI recap and on a colleague's email.
  - **Resume-safe wording:** "upstream content clusters", "tagging gap". Never NCCI.

### 5.6 Leadership and people

#### ACH-031 | Delegated banner requirements with a discovery framework
- **Role:** Senior Product Manager, Indegene
- **Period:** 17 and 31 Aug 2026
- **Theme:** Leadership and people
- **Tags:** #leadership #delegation #mentoring #requirements
- **Long:** Delegated banner requirements ownership with a structured framework (problem statement, requirements, package examples for each feature request) and an action plan covering evidence consolidation, PRDs, client sign-off and Jira grooming.
- **Short:** Delegated banner requirements using a structured discovery framework.
- **Metrics:** None
- **Confidence:** High
- **Evidence:** EV-003, EV-010
- **Flag:** `USE`

#### ACH-032 | Knowledge transfer and handover of discussions
- **Role:** Senior Product Manager, Indegene
- **Period:** 1 Sep 2026
- **Theme:** Leadership and people
- **Tags:** #mentoring #leadership #delegation
- **Long:** Gave a one-hour knowledge-transfer session on a banner feature, showing how problem statements and requirements are documented in the ticketing system, so a colleague could lead the next requirements discussion with support.
- **Short:** Ran a one-hour KT so a colleague could lead banner requirements discussions.
- **Metrics:** 1-hour KT.
- **Confidence:** High
- **Evidence:** EV-012
- **Flag:** `USE`

#### ACH-033 | Protecting UX delivery capacity
- **Role:** Senior Product Manager, Indegene
- **Period:** 18 Aug 2026
- **Theme:** Leadership and people
- **Tags:** #leadership #stakeholder #roadmap
- **Long:** Directed early notice to the UX team about upcoming visual-design needs for three GenAI features so work could be planned into their pipeline and delay avoided.
- **Short:** Gave UX early notice on three GenAI features to avoid capacity-driven delays.
- **Metrics:** None
- **Confidence:** High
- **Evidence:** EV-025
- **Flag:** `USE`

#### ACH-034 | Single-tester dependency
- **Role:** Senior Product Manager, Indegene
- **Period:** 7 Sep 2026
- **Theme:** Leadership and people
- **Tags:** #leadership #delegation #risk
- **Long:** Identified that one senior tester supported the whole GenAI area and advised delegating important testing work to a colleague catching up.
- **Short:** Flagged a single-tester dependency and advised delegation.
- **Metrics:** None
- **Confidence:** Low (AI notes)
- **Evidence:** EV-017
- **Flag:** `USE-SOFT`

#### ACH-036 | Participation in leadership release reviews
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated in source
- **Theme:** Leadership and people
- **Tags:** #leadership #stakeholder
- **Long:** Participated in daily leadership connects on banner release scope (all requested features vs a prioritised subset) and email scope organised with a prioritised list.
- **Short:** Participated in leadership reviews of release scope.
- **Metrics:** None
- **Confidence:** Low (participation only)
- **Evidence:** EV-013
- **Flag:** `USE`
- **Notes:**
  - **VERIFY:** Do not use as an ownership claim.

#### ACH-045 | Turning the testing scope into owned workstreams
- **Role:** Senior Product Manager, Indegene
- **Period:** 17 Sep 2026
- **Theme:** Leadership and people
- **Tags:** #leadership #delegation #mentoring #stakeholder #uat #prioritisation
- **Long:** Turned the testing scope into owned workstreams: assigned validation of retrieval, curation, placement, styling and guardrails across two engineering teams and QA, shared a pre-built Excel test-design framework, asked QA to standardise a reusable GenAI testing template, and told stakeholders that untested items were planned rather than complete.
- **Short:** Assigned GenAI validation workstreams, shared a test-design framework and asked QA for a reusable template.
- **Metrics:** None
- **Confidence:** High
- **Evidence:** EV-035
- **Flag:** `USE`
- **Notes:**
  - **Detail (interviews and cover letters):** Framework tabs covered retrieval and scoring and curation decisions (same prompt returns the same clusters, cluster-count stability, relevance-score stability). Asked Engineering and QA to research deterministic-testing approaches and produce a documented execution plan, working as one team because "to the customer, it's one solution". Flagged duplicate content data and optional-component tagging issues ahead of UAT ("We are still testing with not correct data"). Agreed that results not yet available would be described as planned, not yet run.
  - **Deck (SRC-11, added 15 Oct 2026):** the 60-test matrix in ACH-044 is the product-built test plan behind these workstreams.

#### ACH-060 | Lead a team of 3 (2 PMs, 1 BA)
- **Role:** Senior Product Manager, Indegene
- **Period:** Dec 2025 to Present; evidenced in files (BA: Dec 2025 to Aug 2026; PMs: Aug to Sep 2026); exact reporting dates to confirm
- **Theme:** Leadership and people
- **Tags:** #leadership #mentoring #delegation #team-management
- **Long:** Lead a team of 3 (2 Product Managers and 1 Business Analyst) across the product suite: each PM owns one product; set scope and priorities, coached on requirements discovery and stakeholder management, and handed over release ownership.
- **Short:** Lead a team of 3 (2 PMs, 1 BA), each PM owning one product in the suite.
- **Metrics:** Team of 3.
- **Confidence:** High (Iman's statement, 13 Oct 2026, reconfirmed 25 Nov 2026 on the finalised GPM resume; PM coaching in EV-044, EV-045)
- **Evidence:** EV-044, EV-045, EV-046
- **Flag:** `USE`
- **Notes:**
  - **Source note:** The Business Analyst's work with Iman is now evidenced (EV-046, ACH-063). The evidence is a neutral record of collaboration; the reporting line itself is Iman's statement (13 Oct 2026). Do not confuse the BA with the banner stakeholder who has a similar first name.
  - **Reverted 25 Nov 2026:** This entry briefly read "5 (4 PMs, 1 BA)" (added 13 Oct to Nov 2026) before Iman's finalised GPM resume reverted it to 3 (2 PMs, 1 BA). Treat 3 (2 PMs, 1 BA) as current.
  - **Overlap (R10):** Do not use with ACH-031, ACH-032 or ACH-035 on one resume; pick the strongest.

#### ACH-061 | PM coaching on requirements and release scoping
- **Role:** Senior Product Manager, Indegene
- **Period:** 14 Aug to 3 Sep 2026
- **Theme:** Leadership and people
- **Tags:** #leadership #mentoring #prioritisation #requirements #release-mgmt
- **Long:** Coached two Product Managers through release scoping end to end: consolidated backlog from three sources (client testing feedback, business intake, engineering backlog), P1 to P4 prioritisation, problem-statement-first discovery, PRD and documented sign-off lifecycle, and engineering-capacity framing for an October UAT target.
- **Short:** Coached two PMs through release scoping, prioritisation and PRD sign-off.
- **Metrics:** 10 logged email sessions (17 Aug to 3 Sep 2026) and 6 banner sessions (14 Aug to 3 Sep 2026).
- **Confidence:** High (transition files, accepted by Iman)
- **Evidence:** EV-044, EV-045
- **Flag:** `USE`

#### ACH-062 | PM competency coaching and onboarding
- **Role:** Senior Product Manager, Indegene
- **Period:** 17 Aug to 3 Sep 2026
- **Theme:** Leadership and people
- **Tags:** #leadership #mentoring #ai-tools #stakeholder
- **Long:** Coached PMs on as-is and to-be analysis, controlling unstructured stakeholder discussions, change management, becoming a domain SME and AI-assisted prioritisation, and taught the pharma commercial-content value chain.
- **Short:** Coached PMs on discovery, stakeholder control and AI-assisted prioritisation.
- **Metrics:** None
- **Confidence:** High (transition files, accepted by Iman)
- **Evidence:** EV-045
- **Flag:** `USE`

#### ACH-063 | Directed a Business Analyst across backlog, stories and release coordination
- **Role:** Senior Product Manager, Indegene
- **Period:** Dec 2025 to Aug 2026
- **Theme:** Leadership and people
- **Tags:** #leadership #delegation #mentoring #backlog #requirements #release-mgmt #team-management
- **Long:** Directed a Business Analyst on backlog consolidation, story writing and review, engineering progress tracking, stakeholder communication and release coordination: set the working standards (consolidate customer requests into one backlog, track individual stories in scrums, close duplicate tickets), coached on engineering follow-up and external messaging, and relied on the BA to hold the product workstream during an absence.
- **Short:** Directed a BA on backlog, stories, engineering tracking and release coordination.
- **Metrics:** None
- **Confidence:** High (Iman's own chat messages, accepted by Iman 13 Oct 2026)
- **Evidence:** EV-046
- **Flag:** `USE`
- **Notes:**
  - **Detail (interviews):** Examples: told the BA to sit with an engineer to understand what he was building rather than relay a status; asked for sharp tracking of each Banner story in scrums "so they know that you are tracking actual progress"; set the delivery milestone plan for a client demo cycle (feature testing, client demo, client testing, regression, sign-off, UAT 3 Aug, production 4 Aug); thanked the BA for "holding the fort" in his absence (May 2026); coached on tone for an external stakeholder email.
  - **Wording limit:** The search was targeted, not exhaustive (100+ meetings matched). Do not cite a count of interactions. "Directed" and "coached" are supported; do not claim performance outcomes.
  - **Overlap (R10):** Do not use with ACH-060 on the same resume line; ACH-063 is the BA-specific detail.

### 5.7 AI tools and innovation

#### ACH-006 | AI tools in the PM workflow
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** AI tools and innovation
- **Tags:** #ai-tools #prd #backlog #leadership
- **Long:** Integrated Claude and Microsoft Copilot into the PM workflow for PRD drafting, story decomposition from Figma designs, architecture analysis, sprint-health audits across 100+ items, and stakeholder-communication synthesis, enabling single-PM ownership of two products across four client tracks.
- **Short:** Used Claude and Copilot for PRDs, story decomposition and sprint audits (100+ items).
- **Metrics:** 100+ items audited.
- **Confidence:** Resume
- **Evidence:** EV-016 (related)
- **Flag:** `USE`

#### ACH-035 | AI-assisted product handover
- **Role:** Senior Product Manager, Indegene
- **Period:** 7 Sep 2026
- **Theme:** AI tools and innovation
- **Tags:** #ai-tools #leadership #delegation
- **Long:** Handed over product context for two products to colleagues through shared Claude projects and Markdown context files, so they could start onboarding with the full conversation history.
- **Short:** Handed over product context through shared Claude projects and Markdown files.
- **Metrics:** None
- **Confidence:** High
- **Evidence:** EV-016
- **Flag:** `USE`

#### ACH-054 | Future email editor prototype and team coordination
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated in source
- **Theme:** AI tools and innovation
- **Tags:** #vision #ai-tools #leadership
- **Long:** Built an interactive HTML prototype of a futuristic email editor using Claude.
- **Short:** Built an interactive prototype of a future email editor with Claude.
- **Metrics:** None
- **Confidence:** High (confirmed by Iman, 12 Oct 2026; source is an AI-extracted dump)
- **Evidence:** SRC-1, SRC-2
- **Flag:** `USE`
- **Notes:**
  - **Detail (interviews):** SRC-2 also records PTO coverage and a structured grooming approach for the team, usable as a people-coordination example.

#### ACH-068 | Claude-powered Jira dashboard
- **Role:** Senior Product Manager, Indegene
- **Period:** Not dated
- **Theme:** AI tools and innovation
- **Tags:** #ai-tools #backlog #release-mgmt
- **Long:** Automated a dashboard with Claude that pulls delivery information from Jira.
- **Short:** Built a Claude-powered dashboard on Jira data.
- **Metrics:** None
- **Confidence:** High (Iman's own statement, 14 Oct 2026)
- **Evidence:** SRC-9
- **Flag:** `USE`
- **Notes:**
  - **Wording limit:** Do not describe it as a multi-agent system or as generating user stories; Iman corrected the card's wording on 14 Oct 2026.
  - **VERIFY:** What the dashboard shows, who uses it and the period. Related to ACH-006 and ACH-046.

#### ACH-075 | Product suite implementation for a major German biopharmaceutical client, $1M phased contract
- **Role:** Product Manager, Indegene
- **Period:** 2022
- **Theme:** Ownership and business impact
- **Tags:** #revenue #gtm #0-to-1 #metrics
- **Long:** Won and implemented the product suite for a major German biopharmaceutical client with a $1M total phased contract: $429K initial setup, configuration and pilot (SOW signed), $242K for additional channels expansion, and $332K for YoY recurring maintenance and management.
- **Short:** Won a $1M phased implementation for a major German biopharmaceutical client: $429K SOW, $242K expansion, $332K YoY recurring.
- **Metrics:** $1M total; $429K Phase 1 (SOW signed); $242K Phase 2 (expansion, forecast); $332K Phase 3 (YoY recurring maintenance, forecast).
- **Confidence:** High (Iman's own statements, Nov 2026)
- **Evidence:** Iman's direct statement in conversation
- **Flag:** `USE`
- **Notes:**
  - **Wording (updated 25 Nov 2026, Iman; supersedes "a major European biopharmaceutical company" of Nov 2026):** Client F (BI): "a major German biopharmaceutical company" on resumes. This names the client's headquarters country more specifically than the prior "European" wording; flagged for Iman to confirm this is intentional (Boehringer Ingelheim is itself German, so the new wording narrows the anonymising effect considerably).
  - **Phase status:** Phase 1 SOW signed (budget approved). Phases 2 and 3 are forecasts with email approval.
  - **VERIFY:** Iman's specific role in winning and implementing, and whether the expansion and maintenance forecasts materialised.

#### ACH-076 | End-to-end PDLC workflow using Claude for PM team
- **Role:** Senior Product Manager, Indegene
- **Period:** 2026 (exact date to confirm)
- **Theme:** AI tools and innovation
- **Tags:** #ai-tools #leadership #delegation #prd #vision
- **Long:** Designed an end-to-end PDLC (product development lifecycle) workflow using Claude that enables all PMs in the team to rapidly onboard product knowledge and deliver PRDs, prototypes and user stories, standardising AI-assisted product management across the team.
- **Short:** Designed an end-to-end PDLC workflow using Claude for all PMs to onboard knowledge and deliver PRDs, prototypes and user stories.
- **Metrics:** Used by 4 PMs across the team.
- **Confidence:** High (Iman's own statement, Nov 2026)
- **Evidence:** Iman's direct statement in conversation
- **Flag:** `USE`
- **Notes:**
  - **Extends:** ACH-006 (AI tools in PM workflow), ACH-035 (AI-assisted handover). This is the team-wide, structured version.
  - **GPM signal:** building process and tooling for a team, not just personal use.
  - **VERIFY:** Exact date, specific outputs (PRDs, prototypes created), adoption metrics.

#### ACH-080 | Shaped the direction for multiple knowledge graphs feeding one semantic layer
- **Role:** Senior Product Manager, Indegene
- **Period:** Mar 2026
- **Theme:** AI tools and innovation
- **Tags:** #architecture #genai #stakeholder #knowledge-graph
- **Long:** Raised with product leadership that several knowledge graphs (content, copy, design) need to combine into one output for email generation, and asked business to finalise the scope of knowledge graphs feeding the semantic layer. Aligned strategically that the email-creation knowledge graph should sit with the email platform.
- **Short:** Raised multi-knowledge-graph scope for GenAI email generation with leadership and business.
- **Metrics:** None
- **Confidence:** High (Iman's own statements); some supporting items are AI recaps only
- **Evidence:** SRC-14 (E39, E37, E32, E35, E41)
- **Flag:** `USE-SOFT`
- **Notes:**
  - **VERIFY:** Whether the multi-KG scope was ever finalised or built. E35 and E41 are AI recaps only. Whether "aligned strategically" that the email-creation KG sits with the email platform (NCCA) was ultimately implemented.
  - **Resume-safe wording:** "multiple knowledge graphs", "semantic layer", "email-creation knowledge graph". Never NCCA or NCCI.

### 5.8 Product Manager role, 2020 to 2025

#### ACH-037 | Built a product from zero
- **Role:** Product Manager, Indegene
- **Period:** Jul 2020 to Jan 2025
- **Theme:** Product Manager role, 2020 to 2025
- **Tags:** #0-to-1 #gtm #team-scaling #metrics
- **Long:** Built a product from scratch through the full lifecycle (ideation, design, build, go-to-market), growing the user base from 0 to 30+ in 18 months and scaling the cross-functional team from 3 to 26; achieved product NPS of 8.66 in 2022.
- **Short:** Took a product from 0 to 30+ users in 18 months; team 3 to 26; NPS 8.66.
- **Metrics:** 0 to 30+ users; 18 months; team 3 to 26; NPS 8.66 (2022).
- **Confidence:** Resume
- **Evidence:** None (resume only)
- **Flag:** `USE`
- **Notes:**
  - **Note (user count corrected 25 Nov 2026, from "0 to 200+" to "0 to 30+"):** Team scaling 3 to 26 confirmed by Iman on 12 Oct 2026 (the earlier resume said 3 to 15). Write it as scaling the cross-functional team, not direct reports (Iman's 3 direct reports are separate, ACH-060).

#### ACH-038 | Roadmap and release execution across global accounts
- **Role:** Product Manager, Indegene
- **Period:** Jul 2020 to Jan 2025
- **Theme:** Product Manager role, 2020 to 2025
- **Tags:** #roadmap #release-mgmt #uat #stakeholder
- **Long:** Owned roadmap and release execution across four global pharma accounts (including a top-5 brand), driving data-driven prioritisation, UAT/PROD sequencing and risk communication to leadership; delivered 20+ story features with cross-client rendering validation and WCAG-compliant components.
- **Short:** Owned roadmap and releases across four global pharma accounts, including a top-5 brand.
- **Metrics:** four global pharma accounts; 20+ story features.
- **Confidence:** Resume
- **Evidence:** None (resume only)
- **Flag:** `USE`
- **Notes:**
  - **Note:** The 20+ story features come from the strategy file's resume version. The "top-5 brand" is a pharma product brand, as on the original resume.

### 5.9 Earlier career, 2014 to 2020

#### ACH-039 | AI bot product for tax filing (EY Manager)
- **Role:** Manager, EY India
- **Period:** Nov 2019 to Jul 2020
- **Theme:** Earlier career, 2014 to 2020
- **Tags:** #genai #0-to-1 #leadership
- **Long:** Led an AI bot product for tax filing, from 0 to 1.
- **Short:** Led an AI bot product for tax filing, from 0 to 1.
- **Metrics:** None
- **Confidence:** Resume
- **Evidence:** None (resume only)
- **Flag:** `USE`
- **Notes:**
  - **Gap:** add scope, team, users and outcomes (Part 11).

#### ACH-040 | Demand-optimisation tool, revenue and service levels (Sprintly Works)
- **Role:** Strategy Consulting Manager, Sprintly Works
- **Period:** Jan 2019 to May 2019
- **Theme:** Earlier career, 2014 to 2020
- **Tags:** #consulting #metrics #gtm #technical #analytics
- **Long:** Built a demand-optimisation tool from historical and forecast demand data for a leading Nordic coffee manufacturer, reaching 97% inventory service levels and reducing product wastage; used it to flag supplier-performance outliers, which led the client to renegotiate supplier contracts. Generated EUR 28K revenue (28% of annual) in 2.5 months and improved customer ratings by 10%.
- **Short:** Built a demand-optimisation tool: 97% service levels, less wastage, supplier contracts renegotiated.
- **Metrics:** EUR 28K; 28% of annual revenue; 2.5 months; 10% rating improvement; 97% service levels.
- **Confidence:** Resume; analytics detail High (Iman, 14 Oct 2026)
- **Evidence:** None (resume only)
- **Flag:** `USE`
- **Notes:**
  - **Added 14 Oct 2026 (Iman):** analytics and optimisation detail. Client wording: "a leading Nordic coffee manufacturer"; Iman described it as the largest in the Nordics, so use "largest" only after confirming. This is data analysis and optimisation, not A/B testing.

#### ACH-041 | National ease-of-doing-business programme (EY Consultant)
- **Role:** Consultant, EY India
- **Period:** May 2017 to Dec 2018
- **Theme:** Earlier career, 2014 to 2020
- **Tags:** #consulting #digital-transformation #metrics
- **Long:** Contributed to India's Ease of Doing Business improvement (rank 100 to 77).
- **Short:** Contributed to India's Ease of Doing Business improvement (rank 100 to 77).
- **Metrics:** rank 100 to 77.
- **Confidence:** Resume
- **Evidence:** None (resume only)
- **Flag:** `USE`

#### ACH-042 | Land management platform (EY Consultant)
- **Role:** Consultant, EY India
- **Period:** May 2017 to Dec 2018
- **Theme:** Earlier career, 2014 to 2020
- **Tags:** #digital-transformation #0-to-1 #metrics
- **Long:** Built a land management platform, 99.15% digitised.
- **Short:** Built a land management platform, 99.15% digitised.
- **Metrics:** 99.15% digitised.
- **Confidence:** Resume
- **Evidence:** None (resume only)
- **Flag:** `USE`

#### ACH-043 | Guidewire ClaimCenter configuration and legacy-to-Guidewire migration (EY Software Engineer)
- **Role:** Software Engineer (Guidewire configuration developer), EY India (the EY GDS unit; write "EY" on resumes)
- **Period:** Jul 2014 to May 2017 (dates as in Part 3; Iman did not restate them on 19 Oct 2026)
- **Theme:** Earlier career, 2014 to 2020
- **Tags:** #technical #digital-transformation #insurance #claims #guidewire
- **Long:** Worked as a Guidewire configuration developer on a legacy-to-Guidewire migration for a US insurer (personal auto, homeowners and commercial lines), configuring Guidewire ClaimCenter through Guidewire code; worked with the client's IT team, with a QA team testing the work; after the migration, drove enhancements to Claims Management and a Claim survey; produced the documentation related to change management. The resume line reads "Led a legacy-to-Guidewire migration for insurance products and drove post-migration enhancements."
- **Short:** Configured Guidewire ClaimCenter for a US insurer's legacy-to-Guidewire migration; drove post-migration Claims Management and Claim survey enhancements.
- **Metrics:** None (Iman gave no scale, volume, date or result figures, 19 Oct 2026)
- **Confidence:** High (Iman's own statements, 19 Oct 2026); the word "led" rests on the resume only
- **Evidence:** None beyond Iman's statements (add to Part 12 if a quote is wanted)
- **Flag:** `USE` for the facts above. Use `USE-SOFT` for "led the migration": Iman described his role as configuration developer, so write "configured" or "worked on", not "led", until he confirms.
- **Notes:**
  - **Wording:** "a US insurer", "personal auto, homeowners and commercial lines", "Guidewire ClaimCenter", "configuration developer", "change-management documentation", "worked with client IT". Never name the client.
  - **Do not claim:** policy administration, product-model, rating, underwriting-rule or form configuration; rate manuals, filings or underwriting guidelines; underwriters or actuaries as stakeholders; a Guidewire or insurance certification. None were stated. QA, not Iman, tested the work.
  - **VERIFY:** whether the configuration covered product definitions (coverages, rules) or only claims workflows; the migration's scale and outcome; the exact start and end dates; whether any Guidewire or insurance certification or training exists (not answered on 19 Oct 2026); whether "led" holds.

---

### 5.10 From Iman's finalised GPM resume (added 25 Nov 2026)

**Source:** `Sample Resume/Iman Sadhu - Resume.docx`, Iman's own finalised Group PM resume, supplied 25 Nov 2026 as the approved standard for story writing. Every entry below is a line Iman wrote and approved about his own work, so confidence is **Resume** and the flag is `USE`. Added because a generated resume was found to be thinner than Iman's own: these facts existed only on the resume, not in this file, so no generated resume could use them (R1 forbids inventing them). Wording notes mark the few places where a claim needs care.

#### ACH-087 | Suite strategy: three workflows merged into one AI-native workflow
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** Ownership and business impact
- **Tags:** #vision #roadmap #gtm #genai #product-suite
- **Long:** Set the suite strategy: pull the suite out of the pre-GenAI world by merging three separate, effort-intensive product workflows into a single AI-native workflow, so that pharma brand teams with small marketing budgets can create their emails, banners and e-details at about half the effort it used to take to build each one by hand in a separate editor; this reduced engineering overhead and won buy-in and budget for three roadmaps.
- **Short:** Merged three effort-intensive workflows into one AI-native workflow so small-budget brand teams build emails, banners and e-details at half the effort.
- **Metrics:** 3 workflows merged into 1; about half the effort; 3 roadmaps funded.
- **Confidence:** Resume (Iman's finalised GPM resume, 25 Nov 2026)
- **Evidence:** Sample resume, "The strategy" row
- **Flag:** `USE`
- **Notes:**
  - **Why it matters:** this is the clearest statement of Iman's product *thinking* (the bet, the before-and-after and who benefits) rather than a delivery fact. Lead the strategy row with it.
  - **Wording:** "about half the effort" — the resume says "at half the effort it used to take"; keep the comparison to building each asset by hand in a separate editor. Do not convert it into a percentage time saving; that is ACH-066's separate 50% turnaround figure.
  - **Overlap (R10):** the "three roadmaps" buy-in is ACH-065; use one or the other on a resume, or this entry for the strategy and ACH-065 for the stakeholder story.

#### ACH-088 | Conversational-AI product converting campaign goals into compliant assets
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #genai #architecture #requirements #ux
- **Long:** Built a conversational-AI driven product that converts pharma campaign goals into compliant emails, banners and e-details.
- **Short:** Built a conversational-AI product that turns pharma campaign goals into compliant emails, banners and e-details.
- **Metrics:** 3 asset types (email, banner, e-detail).
- **Confidence:** Resume (finalised GPM resume, 25 Nov 2026)
- **Evidence:** Sample resume, "What I built" row
- **Flag:** `USE`
- **Notes:**
  - **Wording:** the resume writes "Conversation AI driven product"; write "conversational AI" on generated resumes. This is the plain-language description of what the product *is* — use it before the architecture bullets (ACH-089), which describe how it works.
  - **Overlap (R10):** same system as ACH-071 and ACH-077.

#### ACH-089 | Eight-agent RAG architecture: named stages
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** Technical depth
- **Tags:** #genai #architecture #technical #knowledge-graph
- **Long:** Directed an eight-agent RAG architecture with engineering, spanning semantic-graph query, content retrieval and output generation.
- **Short:** Directed an eight-agent RAG architecture with engineering: semantic-graph query, content retrieval, output generation.
- **Metrics:** 8 agents; 3 named stages.
- **Confidence:** Resume (finalised GPM resume, 25 Nov 2026); the agent count is corroborated by ACH-071
- **Evidence:** Sample resume, "What I built" row; ACH-071 (EV-047, SRC-11)
- **Flag:** `USE`
- **Notes:**
  - **Wording:** "with engineering" is required (R9): Iman owns the product decisions, engineering owns the build.
  - **Use this phrasing** when a listing values architecture: naming the three stages is more credible than "an eight-agent flow".
  - **Overlap (R10):** ACH-071 (the eight-agent design) and ACH-077 (the production architecture). Pick one per resume.

#### ACH-090 | Model selection framework, runtime model switching and LLM-driven generative UI
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** Technical depth
- **Tags:** #genai #technical #architecture #ux #requirements
- **Long:** Defined the model selection framework, runtime model switching, and a generative UI driven by the LLM response.
- **Short:** Defined the model selection framework, runtime model switching and an LLM-driven generative UI.
- **Metrics:** None
- **Confidence:** Resume (finalised GPM resume, 25 Nov 2026)
- **Evidence:** Sample resume, "What I built" row; related: ACH-059 (dynamic LLM-generated UI), ACH-077 (multi-model inference: GPT-4o, GPT-4o mini, GPT-5 mini)
- **Flag:** `USE`
- **Notes:**
  - **Why it matters:** cost-and-capability model routing is a strong signal for AI-platform and AI-infrastructure roles. ACH-077 records the actual models, so the claim is corroborated.
  - **Do not claim** a measured cost saving from model switching; none is recorded.

#### ACH-091 | Veeva Vault and knowledge-graph integration points
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** Technical depth
- **Tags:** #technical #architecture #requirements #knowledge-graph
- **Long:** Collaborated with Veeva on defining integration points with Veeva Vault and the upstream knowledge-graph.
- **Short:** Defined Veeva Vault and upstream knowledge-graph integration points with Veeva.
- **Metrics:** None
- **Confidence:** Resume (finalised GPM resume, 25 Nov 2026)
- **Evidence:** Sample resume, "What I built" row; related: ACH-081 (upstream retrieval integration contract)
- **Flag:** `USE`
- **Notes:**
  - **R5 check:** Veeva is a named software vendor and partner, not a client, so it may appear on resumes. Client names stay aliased.
  - **Wording:** "collaborated with Veeva on defining integration points" — not "integrated with Veeva" and not "partnered with Veeva" at company level.

#### ACH-092 | Championed the explainability (XAI) practice across the commercial-content space
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** GenAI, evaluation and responsible AI
- **Tags:** #xai #responsible-ai #leadership #vision
- **Long:** Championed the explainability (XAI) practice for all products in the commercial-content space at Indegene, beyond the two products owned directly.
- **Short:** Championed the explainability (XAI) practice across all commercial-content products at Indegene.
- **Metrics:** None (scope stated as the commercial-content space)
- **Confidence:** Resume (finalised GPM resume, 25 Nov 2026)
- **Evidence:** Sample resume, "The strategy" row; related: ACH-003, ACH-013
- **Flag:** `USE`
- **Notes:**
  - **Why it matters:** this is influence beyond Iman's own products, which answers the "leading without authority" hiring-manager question (Part 10.1 Gate 5). ACH-003 is the feature; this entry is the practice.
  - **Overlap (R10):** do not use with ACH-003 as two separate explainability claims; combine or choose.

#### ACH-093 | Pushed UX delivery of UI differentiators
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** Leadership and people
- **Tags:** #leadership #ux #stakeholder
- **Long:** Pushed the UI/UX team to deliver innovative UI differentiators.
- **Short:** Pushed the UI/UX team to deliver UI differentiators.
- **Metrics:** None
- **Confidence:** Resume (finalised GPM resume, 25 Nov 2026)
- **Evidence:** Sample resume, "How I delivered" row; related: ACH-033 (protecting UX delivery capacity)
- **Flag:** `USE`
- **Notes:**
  - **Wording limit:** no differentiator is named and no outcome is recorded. Do not say which feature, and do not claim a competitive win.

#### ACH-094 | Claude-automated sprint performance tracking and risk flagging
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** AI tools and innovation
- **Tags:** #ai-tools #release-mgmt #backlog
- **Long:** Used Claude to automate sprint performance tracking and risk flagging.
- **Short:** Automated sprint performance tracking and risk flagging with Claude.
- **Metrics:** None
- **Confidence:** Resume (finalised GPM resume, 25 Nov 2026)
- **Evidence:** Sample resume, "How I delivered" row
- **Flag:** `USE`
- **Notes:**
  - **Overlap (R10):** this is the resume wording for the same work as ACH-068 (Claude-powered Jira dashboard) and overlaps ACH-046 (sprint-risk intervention). Use one.
  - **Wording limit (carried from ACH-068):** do not describe it as a multi-agent system or as generating user stories.

#### ACH-095 | Stakeholder-management discipline across three client tracks
- **Role:** Senior Product Manager, Indegene
- **Period:** Feb 2025 to Present
- **Theme:** Stakeholder management
- **Tags:** #stakeholder #release-mgmt #exec-comms
- **Long:** Maintained stakeholder-management discipline for three client tracks.
- **Short:** Held stakeholder-management discipline across three client tracks.
- **Metrics:** 3 client tracks.
- **Confidence:** Resume (finalised GPM resume, 25 Nov 2026)
- **Evidence:** Sample resume, "How I delivered" row
- **Flag:** `USE`
- **Notes:**
  - **Number check:** the same resume says "four regions and four client tracks" in the delivery line and "3 client tracks" here, and ACH-001 and ACH-053 say four accounts or tracks. Both appear on Iman's own approved resume, so treat 3 as the stakeholder-discipline scope and 4 as the delivery scope. **VERIFY** with Iman, and never write both numbers for the same thing on one resume.

#### ACH-096 | Indegene's first email and banner authoring web applications
- **Role:** Product Manager, Indegene
- **Period:** Jul 2020 to Jan 2025
- **Theme:** Product Manager role, 2020 to 2025
- **Tags:** #0-to-1 #gtm #product-suite
- **Long:** Built Indegene's first email and banner authoring B2B web applications, serving pharma brand teams.
- **Short:** Built Indegene's first email and banner authoring B2B web applications for brand teams.
- **Metrics:** 2 applications; first of their kind at Indegene.
- **Confidence:** Resume (finalised GPM resume, 25 Nov 2026)
- **Evidence:** Sample resume, prior-role row
- **Flag:** `USE`
- **Notes:**
  - **Why it matters:** "first at the company" is the strongest 0-to-1 framing available and sets up ACH-037 (0 to 30+ users). Lead the prior role with it.

#### ACH-097 | Port Community System for Indian ports (EY Consultant)
- **Role:** Consultant, EY India
- **Period:** May 2017 to Dec 2018
- **Theme:** Earlier career, 2014 to 2020
- **Tags:** #consulting #digital-transformation #metrics
- **Long:** Contributed to India's Ease of Doing Business rank improving from 100 to 77 through a Port Community System for Indian ports.
- **Short:** Contributed to India's Ease of Doing Business rank 100 to 77 via a Port Community System for Indian ports.
- **Metrics:** rank 100 to 77.
- **Confidence:** Resume (finalised GPM resume, 25 Nov 2026)
- **Evidence:** Sample resume, earlier-experience line
- **Flag:** `USE`
- **Notes:**
  - **Supersedes the vaguer wording:** this names the programme behind ACH-041. Use this entry; keep ACH-041 as the same fact without the programme name.

#### ACH-098 | Inventory optimisation model for Finland's largest coffee manufacturer (Sprintly Works)
- **Role:** Strategy Consulting Manager, Sprintly Works, Finland
- **Period:** Jan 2019 to May 2019
- **Theme:** Earlier career, 2014 to 2020
- **Tags:** #consulting #analytics #technical #metrics
- **Long:** Built an inventory-optimisation model for Finland's largest coffee manufacturer, alongside generating EUR 28K of startup revenue (28% of annual) in 2.5 months.
- **Short:** Built an inventory-optimisation model for Finland's largest coffee manufacturer.
- **Metrics:** EUR 28K (28% of annual revenue) in 2.5 months; 97% inventory service levels (ACH-040).
- **Confidence:** Resume (finalised GPM resume, 25 Nov 2026)
- **Evidence:** Sample resume, earlier-experience line; ACH-040 (service levels, wastage, supplier renegotiation)
- **Flag:** `USE`
- **Notes:**
  - **Client wording:** Iman's own resume names the client only as "Finland's biggest Coffee Manufacturer" (a category, not a company). ACH-040 says "a leading Nordic coffee manufacturer". Either is safe; prefer the resume wording.
  - **Overlap (R10):** merge with ACH-040 into one earlier-experience line.

#### ACH-099 | Brand teams seeing cost savings rose from 15 to 22 in 2026
- **Role:** Product Manager and Senior Product Manager, Indegene
- **Period:** 2022 to 2026
- **Theme:** Ownership and business impact
- **Tags:** #metrics #gtm #roadmap
- **Long:** The number of brand teams seeing cost savings in marketing operations rose from 15 to 22 in 2026.
- **Short:** Brand teams seeing marketing-operations cost savings rose from 15 to 22 in 2026.
- **Metrics:** 15 to 22 brand teams (2026).
- **Confidence:** Resume (finalised GPM resume, 25 Nov 2026)
- **Evidence:** Sample resume, "Value generated via Products" row
- **Flag:** `USE` — **but see the conflict below**
- **Notes:**
  - **CONFLICT TO RESOLVE (flagged 25 Nov 2026):** ACH-070 records the same 15-to-22 figure as **countries** with non-zero savings (from the client dashboards, SRC-10: 15, 19, 20, 22). This entry, from Iman's own resume, calls them **brand teams**. One of the two labels is wrong. Until Iman confirms which, write the figure only once on a resume and prefer the dashboard-sourced wording (ACH-070, "countries with savings"), or omit the figure. Never write both claims on one resume.

---

## 6. Metrics bank

**Use as:** RESULT = something that happened. TARGET = a goal; never present it as achieved.

| Metric | Value as sourced | Period | Source | Confidence | Use as |
|---|---|---|---|---|---|
| Content-selection accuracy | about 67% (earlier round) to about 87% (latest); staged targets 75% and 85% | Present role | Resume; SRC-1 to SRC-3; Iman | Resume (VERIFY dates) | RESULT |
| Free-text generation accuracy | "not more than 85% yet" | 3 Sep 2026 | EV-015 | High | RESULT |
| Client cost saved (monthly) | USD 10,368 (Jun 2025); USD 17,556 (May 2026); USD 15,656 (Jun 2026) | 2025 to 2026 | SRC-10 (Client D dashboards) | High | RESULT |
| Client satisfaction (PSAT) | 3.63/4 (Jun 2025) to 3.93/4 (Jun 2026) | 2025 to 2026 | Resume | Resume | RESULT |
| Cumulative client cost saved (Client D) | USD 597,639 (ELMAC 593,785; JAPAC 3,854) | Jan 2022 to Aug 2026 | SRC-10 | High | RESULT |
| Annual client cost saved (Client D) | 90,742 (2022); 131,219 (2023); 125,764 (2024); 132,192 (2025); 117,722 (2026 YTD) | 2022 to Aug 2026 | SRC-10 | High | RESULT |
| Year-on-year growth in cost saved | +44% (2022 to 2023) | 2023 | SRC-10 | High (computed) | RESULT |
| Average monthly cost saved | 7.5K; 10.8K; 10.3K; 11.0K; 14.7K (2026 YTD); 2026 vs 2025 about +34% | 2022 to 2026 | SRC-10 | High (computed) | RESULT |
| Lead-market share of ELMAC savings | 70% (2022) to 38% (2026 YTD) | 2022 to 2026 | SRC-10 | High (computed) | RESULT |
| Countries with savings (ELMAC) | 15 (2022); 22 (2025) | 2022 to 2025 | SRC-10 | High | RESULT |
| Email deployments share of ELMAC savings | about 99% (586,421 of 593,785) | 2022 to 2026 | SRC-10 | High (template builds derived) | RESULT |
| Sprint-health audit size | 100+ items | Present role | Resume | Resume | RESULT |
| Team size | 28+ cross-functional, four regions | Present role | Resume | Resume | RESULT |
| Team scale | 3 to 26 (summary and PM role; confirmed by Iman 12 Oct 2026) | Career | Resume; Iman | Resume | RESULT |
| Suite SaaS licence revenue (Client A) | USD 4M+ (suite level; period not stated) | Present role | SRC-9 (Iman; contract held by Iman) | High (no document in file) | RESULT |
| Suite share of Indegene commercial licence revenue | about 30 to 40% | Present role | SRC-9 | High (no document in file) | RESULT |
| Daily active users (Client A suite) | about 50 to 60 | Present role | SRC-9 | High | RESULT |
| Markets served (Client A) | 10 | Present role | SRC-9 | High | RESULT |
| Content turnaround (GenAI pipeline) | -50% (baseline and period not stated) | Present role | SRC-9 | High (no baseline in file) | RESULT |
| Engineering effort (MVP-led validation) | about -50% against planning estimates (estimate-based) | Present role | SRC-9 | High (estimate-based) | RESULT |
| Suite size | 3 products (2 owned directly) | Present role | SRC-9 | High | RESULT |
| People managed | 3 (2 PMs, 1 BA) | Present role | Iman (25 Nov 2026); EV-044 to EV-046 | High | RESULT |
| Banner feature demands | 23 | 7 Aug 2026 | EV-001 | High | RESULT |
| Business feature requests (email) | 27 | 18 Aug 2026 | EV-024 | High | RESULT |
| Proposed Release 15 features | 11 | 25 Aug 2026 | EV-009 | Low | RESULT |
| Feature volume trade-off | 30 to 40 of 60+ requests | 25 Aug 2026 | EV-009 | Low | RESULT |
| Low-input features started first | 4 | 18 Aug 2026 | EV-026 | High | RESULT |
| Requirements-gathering end date | 28 Aug 2026 | 18 Aug 2026 | EV-026 | High | RESULT |
| Italy SME-testing stories | 4 | 3 Sep 2026 | EV-015 | High | RESULT |
| Knowledge-transfer session | 1 hour | 1 Sep 2026 | EV-012 | High | RESULT |
| Users (first product) | 0 to 30+ in 18 months | 2020 to 2022 | Resume | Resume | RESULT |
| Product NPS | 8.66 | 2022 | Resume | Resume | RESULT |
| Sprintly revenue | EUR 28K (28% of annual) in 2.5 months | 2019 | Resume | Resume | RESULT |
| Customer ratings | +10% | 2019 | Resume | Resume | RESULT |
| Service level | 97% | 2019 | Resume | Resume | RESULT |
| Ease of Doing Business rank | 100 to 77 | 2017 to 2019 | Resume | Resume | RESULT |
| Land records digitised | 99.15% | 2017 to 2019 | Resume | Resume | RESULT |
| Sprint-risk intervention | 115 items; 4 days to close; 8 descope decisions | Present role | SRC-1 | High (confirmed by Iman) | RESULT |
| Core email-product epic | 24 stories | Present role | SRC-1 | High (confirmed by Iman) | RESULT |
| Table feature | 20+ stories | Present role | SRC-1 | High (confirmed by Iman) | RESULT |
| Story features delivered (PM role) | 20+ | 2020 to 2025 | Strategy file | Resume | RESULT |
| Rendering viewports | 600, 480 and 320 px | Present role | SRC-1 | High (confirmed by Iman) | RESULT |
| System architecture — specialised agents | 5 agents in multi-agentic environment (Metadata Extractor, Module Searcher, Template Searcher, Email Assembler, Email Assembly Helper) + Business Rules Agent + Planning Agent/Orchestrator | By Nov 2026 | SRC-13 | High | RESULT |
| System architecture — tools layer | 5 tools (Retrieval, External API, Validation, Content Block and Footnote/Reference, Response Refinement) | By Nov 2026 | SRC-13 | High | RESULT |
| System architecture — storage systems | 3 (MongoDB long-term, Redis long-term, Pinecone vector DB) | By Nov 2026 | SRC-13 | High | RESULT |
| System architecture — AI models | 3 models on Azure OpenAI (GPT-4o, GPT-4o mini, GPT-5 mini) | By Nov 2026 | SRC-13 | High | RESULT |
| System architecture — embedding model | text-embedding-3-large | By Nov 2026 | SRC-13 | High | RESULT |
| Product-built test matrix (agentic email flow) | 60 tests: retrieval 15, agents 27, end-to-end 8, safety 10 ("50+" on the slide) | 17 Sep 2026 | SRC-11 | High | RESULT |
| Agentic flow architecture | 8 agents across 2 systems; 5 make LLM decisions | 17 Sep 2026 | SRC-11 | High | RESULT |
| Red-team defence rate | 98.64% (1,795 of 1,819 tests); 0 critical, 3 high, 8 medium, 4 low | By 17 Sep 2026 | SRC-11 | High figures; Iman's role to confirm (ACH-072 `CONFIRM-FIRST`) | RESULT |
| KG cluster types in scope (ACH-078) | 12 | 5 Aug 2026 | SRC-14 (E20) | High (transcript) | RESULT |
| KG cluster validation experiment (ACH-079) | 64 clusters (16 scenarios × 4) | Jul–Aug 2026 | SRC-14 (E16, E22) | High | TARGET |
| Upstream cluster creation accuracy (ACH-086) | 76% | Oct 2026 | SRC-14 (E3) | High (upstream team's figures) | RESULT |
| Upstream cluster selection accuracy — hybrid (ACH-086) | 45.3% | Oct 2026 | SRC-14 (E3) | High (upstream team's figures) | RESULT |
| Upstream cluster selection accuracy — agentic (ACH-086) | 60.55% | Oct 2026 | SRC-14 (E3) | High (upstream team's figures) | RESULT |
| Evaluation alert threshold | >10% week-over-week drop per scored stage | 29 Jul 2026 | SRC-12 | **Design threshold, not a result** | TARGET |
| AI-reasoning feature adoption | 60% | PRD target | SRC-1 | **TARGET, not a result** | TARGET |
| AI-reasoning feature MLR revision reduction | 15% | PRD target | SRC-1 | **TARGET, not a result** | TARGET |
| Staged accuracy targets | 75% then 85% | Present role | SRC-2 | **TARGET, not a result** | TARGET |

Revenue, share and usage figures marked SRC-9 come from Iman's own statements on 13 to 14 Oct 2026, with no supporting document in this file; cost-saved figures marked SRC-10 come from the client's dashboards (reconciled to their totals). All are treated as High and usable (14 Oct 2026). Still not found in any source: ROI figures and the dashboard's definition of "cost saved". Do not invent them.

---

## 7. Skills, keywords and tags

### 7.1 Skills inventory

Evidence level: **R** = stated on resume. **E** = also shown in Aug to Oct 2026 evidence (EV IDs).

| Area | Skills | Evidence |
|---|---|---|
| Product | Product strategy and roadmap; product-suite strategy; product vision; end-to-end lifecycle; PRD authorship; user stories and backlog prioritisation; go-to-market; KPIs / OKRs; release governance; stakeholder management; user research; Agile / Scrum | R. E for PRDs, prioritisation, release planning, scope control (EV-001, EV-003, EV-009, EV-014, EV-024, EV-031) |
| AI / GenAI | LLM product design; conversational AI; guardrails and responsible AI; evaluation frameworks (accuracy, precision, recall); explainability (XAI); prompt management; human-in-the-loop; vector databases, RAG and semantic retrieval (embeddings, relevance scoring, prompt vectorisation, cluster ranking); multi-agent architecture; LLM observability (Langfuse); dynamic LLM-generated UI; planning agent with ReAct orchestration; business rules agent; query rewriting and re-ranking; event-driven data ingestion; multi-model LLM strategy (GPT-4o, GPT-4o mini, GPT-5 mini); embedding pipeline (text-embedding-3-large); knowledge-graph integration (upstream content graph, node and relationship modelling, mandatory/optional tagging, multi-KG architecture) | R. E for LLM variance, guardrails, determinism and safety testing, explainability tracing (EV-019, EV-020, EV-021, EV-030, EV-034, EV-035). Vector, RAG and agent evidence: AI meeting notes accepted by Iman as direct evidence, plus Iman's own words (EV-035, EV-036 to EV-043). Architecture components: SRC-13. Knowledge-graph evidence: SRC-14 (ACH-078 to ACH-086) |
| Technical product work | Cross-system integration trade-offs; API payload analysis; rendering and device-testing POCs; token-mapping between marketing platforms | R. E (EV-005, EV-027, EV-030). Also SRC-1 (ACH-047 to ACH-051) |
| Leadership | People management (4 PMs, 1 BA); PM coaching; delegation; mentoring; knowledge transfer; capacity and dependency management | E (EV-003, EV-010, EV-012, EV-017, EV-025, EV-035, EV-044, EV-045) |
| Stakeholder management | Escalation with delivery-impact framing; scope boundaries; expectation setting; sign-off governance; risk communication | R. E (EV-004, EV-023, EV-029, EV-033) |
| Tools | Jira, AHA, Figma, Mural, MJML / WCAG, MS Office, Claude, Microsoft Copilot | R. E for Claude projects and Jira stories (EV-011, EV-016) |
| Data and analytics | Data analysis; demand forecasting; optimisation modelling; supplier-performance outlier analysis | E (ACH-040, 2019) |
| Domain | Pharma MarTech; approved-email and MLR (medical-legal-regulatory) review workflows; insurance claims software (Guidewire ClaimCenter configuration, EY, ACH-043) | R. E (EV-027, EV-032) |

### 7.2 Keyword banks (weave into bullets naturally, only where the evidence supports them)

- **General Senior PM:** product strategy, product roadmap, product vision, product lifecycle, cross-functional leadership, stakeholder management, data-driven, go-to-market, KPIs, OKRs, user research, A/B testing, agile, scrum, backlog, user stories, release governance
- **AI PM:** LLM, generative AI, conversational AI, evaluation framework, guardrails, responsible AI, explainability (XAI), model evaluation metrics, accuracy, precision, recall, human-in-the-loop, prompt management, agentic, vector database, semantic search, embeddings, relevance scoring retrieval-augmented generation (RAG), multi-agent / agentic architecture, LLM observability, prompt-injection and red-team testing, semantic-query generation, deterministic testing, repeatability and output-variance testing, AI-safety testing, harmful-prompt testing, AI auditability, streamed model reasoning, LLM tracing, production GenAI pipeline, prompt vectorisation, cluster ranking, dynamic LLM-generated UI (added 15 Oct 2026; these sat only in Part 5 and Part 12 before); hybrid retrieval (BM25, cosine similarity, reciprocal rank fusion), guardrail agent, self-correcting validator loop, per-agent (component-level) evaluation, LLM-as-judge, red-teaming, I/O contracts, scored observations, temperature-0 structured outputs (added 15 Oct 2026 from SRC-11, SRC-12); planning agent, orchestrator agent, ReAct pattern, business rules agent, query rewriting, re-ranking, event-driven data ingestion, embedding pipeline, chunking and metadata extraction, multi-model LLM strategy, long-term memory (MongoDB, Redis), LLM and agent telemetry (added 11 Nov 2026 from SRC-13); knowledge graph, content graph, semantic mesh, node and relationship model, content clusters, mandatory/optional tagging, parent–child claim hierarchy, upstream integration contract, machine-readable justification, source lineage, multi-knowledge-graph architecture (added 13 Nov 2026 from SRC-14)
- **Tools:** Jira, AHA, Figma, Mural, Claude, Microsoft Copilot, MJML, WCAG, MS Office

Note: A/B testing is a keyword the evidence does not currently support. Use it only if Iman confirms experience (see Part 10.6).

### 7.3 Tag taxonomy (used in the achievement bank)

`#genai` `#llm-evaluation` `#xai` `#guardrails` `#responsible-ai` `#prompt` `#ai-tools` `#roadmap` `#prd` `#requirements` `#backlog` `#prioritisation` `#release-mgmt` `#uat` `#technical` `#scope-governance` `#stakeholder` `#escalation` `#exec-comms` `#leadership` `#delegation` `#mentoring` `#team-scaling` `#gtm` `#metrics` `#0-to-1` `#consulting` `#digital-transformation` `#accessibility` `#risk` `#ux` `#vision` `#architecture` `#team-management` `#revenue` `#product-suite` `#analytics` `#knowledge-graph`

---

## 8. Clients, products and glossary

### 8.1 Client and product aliases

Use these on all resumes. Real client names are deliberately not stored in this file.

| Alias | Description for resumes | Used in |
|---|---|---|
| Client A | A top-10 US biopharmaceutical company (global brands). **Mandated resume wording: "a top-10 US biopharmaceutical company"** | Email and banner platforms; most Aug to Oct 2026 evidence; 2025 vector database work (ACH-055, ACH-056; confirmed by Iman 13 Oct 2026) |
| Client D | **Mandated resume wording: "a UK biopharmaceutical company"** (updated 25 Nov 2026, Iman's finalised GPM resume; supersedes the 14 Oct 2026 "a leading global biopharmaceutical company, US-headquartered" wording) with markets across Europe, the Middle East and beyond | Email platform cost savings 2022 to Aug 2026 (ACH-007, ACH-069, ACH-070) |
| Client B | A Fortune 500, top-10 US biopharmaceutical company (global brands). Distinguishing wording to be set when Iman supplies this client's data; it must differ from Client A. | Email migration scope (EV-005) |
| Client F (BI) | A major German biopharmaceutical company. **Mandated resume wording: "a major German biopharmaceutical company"** (updated 25 Nov 2026; supersedes "a major European biopharmaceutical company"; Boehringer Ingelheim; distinct from Client A and Client D) | Product suite implementation, $1M phased contract (2022, ACH-075) |
| Client C | A European specialty pharma company | Mentioned in retrieval gaps only |
| Client E | A US insurer (personal auto, homeowners and commercial lines), EY period. Write "a US insurer"; never name it | Guidewire ClaimCenter work (ACH-043) |
| Email platform | LLM-powered email platform for pharma content (GenAI and non-GenAI tracks) | Present role |
| Banner platform | Banner creation and editing platform for pharma content | Present role |

Wording guidance: for Client A write exactly "a top-10 US biopharmaceutical company" on every resume-facing line (mandated by Iman, 14 Oct 2026; apply the same reference everywhere, including headers and summaries). Do not say "top-5". Research on FY2025 revenue (web search, 12 Oct 2026) places both clients below the five largest US pharma companies but inside the top ten. Re-check the ranking if a listing needs a specific claim, and add a revenue figure only if the user approves.

### 8.2 Glossary of internal terms

Resumes should use the "resume-safe wording" column, not the internal term. Status "Inferred" means the meaning is deduced from context and needs the user's confirmation.

| Term | Meaning as used in the sources | Resume-safe wording | Status |
|---|---|---|---|
| VAE / VA | Likely Veeva Approved Email | approved-email platform | Inferred |
| SFMC | Likely Salesforce Marketing Cloud | marketing automation platform | Inferred |
| MLR | Medical-legal-regulatory review | MLR / compliance review | Known |
| Peak D | Agentic email-authoring flow for Client A: one prompt to a validated, brand-ready email through eight agents (SRC-11); earlier sources describe its chat-driven, seven-stage UX | agentic email-authoring workflow | Known (SRC-11) |
| Peak B | Unknown (appears in retrieval gaps) | not used | Unknown |
| NCCA | The email product; in the agentic flow, the LLM agent layer (guardrail, metadata, copy generation, curation, placement, template selection, stylization, validator) | email platform / LLM agent layer | Known (SRC-11) |
| NCC | Same email platform as NCCA (appears as "NCC" in 2025 notes) | email platform | Known (confirmed by Iman, 13 Oct 2026) |
| Vector DB | Database storing vector embeddings of approved content, used for semantic search; sits in the email platform | vector database / semantic-search store | Known (Iman, 13 Oct 2026) |
| Viva | Likely Veeva; source of the approved modules loaded into the vector DB | approved-content library | Inferred |
| Pinecone | Managed vector-database service named by a colleague (EV-038) | not used (do not name a tool) | Known |
| NCCI | Retrieval service that returns and scores content clusters algorithmically (cosine + BM25 + RRF, no LLM); contains the Semantic Mesh knowledge graph. Owned by another team, not Iman's product (confirmed SRC-14, E43: "The Knowledge Graph is part of the Sematic Mesh developed by NCCI. Again no actions needed from NCCA.") | content-retrieval service / knowledge-graph service | Known (SRC-11, SRC-14); ownership confirmed: another team |
| CPC | Client-side reviewer or sign-off group giving banner feedback | client reviewers | Inferred |
| NCFP | Unit of requirement discussion for banner (feature request or problem area) | banner feature request | Unknown |
| JSM | Likely Jira Service Management | ticketing system | Inferred |
| Langfuse | LLM observability and tracing tool | LLM tracing tool | Known |
| Vault CRM | Veeva Vault CRM testing environment | CRM test environment | Inferred |
| VD | Visual design | visual design | Inferred |
| KT | Knowledge transfer | knowledge transfer | Known |
| Copy generation, curation, placement, stylisation and guardrail agents | Individual LLM agents in the email-generation workflow (semantic-query generation, content curation, section and content placement, styling, safety checks) | multi-agent GenAI email workflow | Known (from EV-035) |
| WSR | Weekly status report | weekly status report | Known |
| PSAT | Client satisfaction score | client satisfaction (PSAT) | Resume |
| UAT / PROD | User acceptance testing / production | UAT / production release | Known |
| CCA | Core email-generation product (appears as "CCA core product" in SRC-1) | core email-generation product | Inferred |
| CSA | System integrated with the email product (appears in "CSA-NCCA integration", SRC-1). In 2025 its team declined to provide a vector database (EV-036) | integration partner platform | Unknown |
| CONE- | Ticket prefix on Jira stories (for example CONE-9681) | ticket | Inferred |
| TipTap | Rich-text editor library used in the email editor | rich-text editor library | Known |
| Show Thinking | Feature that surfaces AI reasoning for reviewers (ACH-003) | AI-reasoning transparency feature | Known (SRC-1) |
| Guardrail Agent | First agent; screens every prompt for injection, harmful content and jailbreaks | guardrail agent | Known (SRC-11) |
| Metadata Extractor | Parses the prompt for product, country, audience and topic | metadata extraction | Known (SRC-11) |
| Copy Generation Agent | Builds the semantic query sent to retrieval | semantic-query generation | Known (SRC-11) |
| Payload Assembler | Bundles context, brand and audience for the generation agents | payload assembly | Known (SRC-12) |
| Validator Agent | Compiles MJML and retries until error-free; the pipeline's QA gate | validator agent | Known (SRC-11, SRC-12) |
| BM25 / RRF | Keyword ranking (BM25) combined with cosine similarity through reciprocal rank fusion | hybrid retrieval | Known (SRC-11) |
| PromoMats | Likely Veeva PromoMats; source of claims-library IDs | approved-claims library | Inferred |
| Level-1 MJML profile | MJML tags and attributes the placement stage may emit (structure and content only, no styling) | placement-stage markup spec | Known (SRC-12) |
| CONE-9222, CONE-9225, CONE-10120 | Jira tickets for the stylization-pipeline I/O and testing work | ticket | Known (SRC-12) |
| LLM-as-judge | An LLM scoring outputs against a rubric | LLM-as-judge evaluation | Known |
| Planning Agent / Orchestrator | Central agent in the email platform using a ReAct loop (Request Handler → ReAct → Action → Context Retrieval → Response Generation) to decompose user goals into tasks, coordinate specialised agents and manage context | orchestrator agent / planning agent | Known (SRC-13) |
| Business Rules Agent | Standalone agent that checks and applies predefined compliance rules across all agents in the multi-agent environment to ensure correct logic and compliant outputs | compliance rules agent | Known (SRC-13) |
| Module Searcher | Specialised agent that searches for relevant approved content modules from the knowledge base | content-search agent | Known (SRC-13) |
| Template Searcher | Specialised agent that finds the appropriate email template | template-search agent | Known (SRC-13) |
| Email Assembler | Specialised agent that assembles the final email from retrieved modules and selected template | email-assembly agent | Known (SRC-13) |
| Email Assembly Helper | Helper agent assisting the Email Assembler | assembly helper | Known (SRC-13) |
| Response Refinement (tool) | Tool that writes only essential data into a shared object, preventing agents from generating oversized JSON responses | response refinement tool | Known (SRC-13) |
| Content Block and Footnote/Reference (tool) | Tool that creates content blocks from module content and automatically adds footnote symbols with corresponding reference number mapping | content-block and referencing tool | Known (SRC-13) |
| text-embedding-3-large | OpenAI embedding model (used in the data-ingestion pipeline) that converts content chunks into vectors for indexing in Pinecone | embedding model | Known (SRC-13) |
| MongoDB | Long-term memory database in the email platform storing durable data | long-term database | Known (SRC-13) |
| Redis | Fast-access long-term memory store in the email platform | fast-access memory store | Known (SRC-13) |
| Apigee | Secure middleware layer (Google Apigee) that enables the email platform to connect with Veeva PromoMats through authenticated, TLS-encrypted API communication | API middleware | Known (SRC-13) |
| Azure OpenAI | Cloud-hosted LLM inference service providing GPT-4o, GPT-4o mini and GPT-5 mini models to the email platform (hosted separately from the AWS infrastructure) | LLM service / AI models | Known (SRC-13) |
| AWS (Indegene Cloud) | Amazon Web Services hosting environment for the email platform (Indegene's cloud) | cloud hosting | Known (SRC-13) |
| Semantic Mesh | NCCI's clustered content store; contains the knowledge graph (SRC-14, E43) | semantic content layer / knowledge graph | Known (SRC-14) |
| Key claim / key node / primary node | Central node of a cluster; must be a claim or ReusableText (SRC-14, E19) | primary content node | Known (SRC-14) |
| Main artefact | Node type that anchors a cluster (SRC-14, E17) | anchor node | Known (SRC-14) |
| Supporting claim | Claim linked to a key claim | supporting claim | Known (SRC-14) |
| RT (Reusable Text) | Pre-approved text snippet node | approved text block | Known (SRC-14) |
| Component / data graphic | Visual node linked to text nodes | visual asset | Known (SRC-14) |
| Must use / mandatory–optional | Node-level inclusion tag from upstream | inclusion tag | Known (SRC-14) |
| Related claim / qualifier | Child claim linked to a parent claim in Veeva | related claim | Known (SRC-14) |
| HITL clusters | SME-reviewed clusters | human-validated content | Known (SRC-14) |
| RRF / BM25 + vector leg | Hybrid retrieval fusion (SRC-14, E8) | hybrid semantic + keyword retrieval | Known (SRC-14) |
| Semantic Mesh Orchestrator | Orchestration layer noted in Iman's message (SRC-14, E36) | orchestration layer | Inferred (SRC-14) |
| Derivative Agent | Agentic pathway consuming clusters | agentic email-authoring flow | Known (SRC-14) |
| AFU Material | Input asset type in the enablement deck (SRC-14, E44) | — (meaning not stated) | Inferred (SRC-14) |
| CMSD | Appears in Release 9 stories; meaning not stated | — | Inferred (SRC-14) |
| Landing AI, Dockling | Extraction and parsing tools in the upstream pipeline | document extraction tools | Known (SRC-14; AI recap and chat) |

---

## 9. Leadership and stakeholder profile, and education

- **Team shape:** 28+ person cross-functional team across four global regions (product, engineering, QA, UX, SMEs). Iman manages 2 Product Managers and 1 Business Analyst (confirmed 13 Oct 2026; PM coaching in EV-044, EV-045). Evidence of delegating requirements ownership to product colleagues (EV-003, EV-010, EV-012).
- **Stakeholder levels:** VP, AVP and Director on the business and delivery side. Evidence of scope enforcement and escalation with delivery-impact statements (EV-002, EV-023, EV-029).
- **Working style evidence:** Asks for problem statements before solutions (EV-031), sets evidence standards for requirements (EV-014), uses edge cases to challenge scope (EV-022), prepares options before business calls (EV-004).
- **AI-in-workflow:** Claude projects with shareable Markdown context files used for onboarding and handover (EV-016).

**Senior stakeholder engagement** (from AI-extracted dumps SRC-2 and SRC-3, confirmed by Iman). On a resume use the level, not names.

| Level | Context | Source |
|---|---|---|
| VP, Strategic Solutions | Aligned GenAI accuracy targets and release scope | SRC-3 |
| AVP (two) | Release planning, scope enforcement, risk escalation | SRC-3 |
| Director of Product | Feature prioritisation, roadmap decisions | SRC-3 |
| Director of Engineering | Architecture trade-off decision, technical alignment | SRC-3 |
| Business leadership (general) | Timeline and risk communication, descope enforcement | SRC-2 |

Pattern: adds a product-judgment layer before escalating, rather than only relaying messages (SRC-3).

### Education

- General Management, Indian School of Business (2016 to 2017)
- B.Tech, VIT University, Vellore (2010 to 2014)

**Output rule (24 Nov 2026, Iman):** the years above are the source of truth and stay here. **Resumes and cover letters print no graduation years** — "General Management, Indian School of Business · B.Tech, VIT University, Vellore". See R7.

---

## 10. Resume strategy playbook

Source: Iman's resume strategy session (strategy file, Oct 2026). Use it together with Part 1 when generating a resume. Where this part and Parts 2 to 9 disagree, Parts 2 to 9 win (they hold the corrected facts).

### 10.1 The six-gate checklist

Every resume passes six gates in order. Failing any gate ends the application, so check a draft against all six.

| Gate | Question | Rules for the draft |
|---|---|---|
| 1. Parse cleanly | Can software read it, and can a human skim it in 6 seconds? | Single column. Standard headers (Summary, Experience, Education, Skills). No tables, text boxes or columns. Contact details in the body, not the header or footer. Standard font (Arial). No information as graphics. Clean .docx or text-based PDF. |
| 2. Survive the disqualifier check | Is there a quick reason to reject? | Title and level fit the role. Minimum years of experience met. Domain relevance visible fast. Location and work authorisation clear. Check knockout questions on the application form. Compensation alignment, if asked. |
| 3. Match the specific req | Does it fit this one role? | Mirror the listing's keywords naturally. Put the relevant domain near the top. Emphasise the right PM type (growth, platform, 0-to-1). Quantify what the listing cares about. Use their stack and language. |
| 4. Avoid red flags | Does anything undermine strong content? | Explain gaps. Address stints under a year. Show upward scope. Zero typos. No bloat. No "responsible for". |
| 5. Answer the four hiring-manager questions | Is this person impressive at our level? | **Scope** (team size, users, revenue, number of products). **Impact** (metrics, money, percentages). **Ownership** ("I decided", not "we did"). **People leadership** (mentoring, leading without authority, coordinating teams). **If scope or impact reads thin, go back to Part 4/Part 6 and add your strongest figures regardless of requirement match (R1.1, step 3b) — don't wait to be asked.** **Flow check: can a product leader read the current role top to bottom in 30 seconds and follow what was owned, built, made trustworthy, delivered and led, and the value it created? If not, reorder into the R11 story rows.** |
| 6. Get it in front of people | How does it enter the pipeline? | Outside the document: referrals beat cold applications at senior level, map the network at target companies, reach the hiring manager directly, apply early, use recruiter and inbound channels (LinkedIn). |

### 10.2 Standing decisions

| Decision | Choice | Why |
|---|---|---|
| Target level | **Group PM / product-leader scope in the headline; held titles unchanged in Experience** (updated 24 Nov 2026, Iman; supersedes the Oct 2026 "Senior PM, not Group PM") | The body now evidences a three-product suite, 3 direct reports (2 PMs, 1 BA), a 28+ person cross-functional org and licence revenue — GPM scope sitting under an IC-sounding headline, which cost points on a seniority check. The header headline states the **target level**, never a held title; the Experience section always prints the real titles from Part 3 verbatim (R7), so nothing is misrepresented. Default headline: "Group Product Manager · AI Product Portfolio · <domain>". |
| Client naming | Descriptors only (see Part 8) | Confidentiality. Descriptors still convey scope. |
| Metrics | Real numbers where available. Targets labelled as targets. | Senior interviewers probe every line. Inflated metrics become liabilities. |
| Length | One page | A wide search needs a scannable resume. One page forces prioritisation. |
| Summary style | "Option C": shortest, most confident (see Part 2) | Leads with the hardest metric (0 to 30+), shows breadth without listing every geography, closes with a capability line. |
| Earlier EY roles | Kept as separate entries | Shows clear title progression (Software Engineer, Consultant, Manager). Consultant and Software Engineer may share one line when the one-page limit requires it. |
| Layout | KPI strip and labelled theme rows (R11) | Iman's preferred format (15 Oct 2026); fits more evidence on one page and is easier to scan than prose bullets. |
| Content breadth | Anchor plus variable (18 Oct 2026, replaces "cover every theme"): fixed anchor of revenue, cost savings, leadership and the AI core; everything else chosen from the product brief's capability map, AI points first | Both first drafts (Deriv, Tether) matched only the listing's explicit asks and left out the strongest AI and cost-saving evidence; see Part 1.1 steps 3b and 4b. |
| Audience | A senior PM, lead PM or product leader | Write every row so that reader sees the value and the progression, not a list of tasks matched to a listing (15 Oct 2026). |

### 10.3 Targeting strategy

- **Strongest fit (apply first):** AI-PM roles at major tech companies (Google AI, Microsoft AI, Amazon AI/ML). B2B SaaS companies that value pharma or regulated-industry experience (Salesforce, Veeva, Adobe, HubSpot, ServiceNow). AI startups building regulated or enterprise AI products.
- **Good fit with tailoring:** General Senior PM roles at large tech companies where the team does B2B or enterprise work (AWS, Google Cloud, Microsoft 365). Growth-stage AI companies that need evaluation and guardrails experience.
- **Weakest fit (only with a referral and strong tailoring):** Consumer-facing PM roles at Meta, Google core products or Apple. Roles that need marketplace, social or advertising product experience.

### 10.4 Stress test against large tech-company listings

**Strong (6 of 12)**
1. Years of experience: 12 years total, 6+ in product.
2. Technical fluency: software engineering background plus current API and architecture work.
3. AI / ML product experience: production LLM ownership, evaluation, guardrails, explainability. The biggest differentiator.
4. Cross-functional leadership: 28+ person team, four client tracks.
5. Executive stakeholder management: VP, AVP and Director with specific examples.
6. End-to-end lifecycle: built from zero to 30+ users.

**Partial (3 of 12)**
7. Data-driven decisions: NPS and accuracy show measurement, but no analytics tools (Amplitude, Mixpanel, SQL, Looker), A/B testing or experimentation language. *Fix:* add any analytics tools used; describe SME evaluation rounds as structured experimentation only if accurate.
8. Strategic vision: reads execution-heavy ("drove", "delivered", "operated"). *Fix:* add "identified", "proposed", "convinced leadership to invest in" where true. Example candidates: the AI-reasoning transparency feature (ACH-003) and the future-editor prototype (ACH-054).
9. Brand and domain breadth: employer is not a household name and all evidence is pharma. *Fix:* use a cross-industry summary; referrals bypass brand bias.

**Gap (3 of 12)**
10. Scale: 30+ users is far below consumer-scale expectations. *Fix:* find scale proxies (emails generated, compliance decisions per month, markets served, API requests). Highest-priority metric to chase. *Update 14 Oct 2026:* 7 markets and about 50 to 60 daily active users were recorded (Part 6); *updated 25 Nov 2026:* corrected to 10 markets.
11. Revenue or P&L ownership: no revenue figures in Indegene roles. *Fix:* find aggregate contract value or platform revenue contribution. *Update 14 Oct 2026:* suite licence revenue of USD 4M+ and a 30 to 40% share of Indegene's commercial licence revenue are now recorded (ACH-064); no contract value is in the file. Cumulative client cost savings of about USD 598K are also recorded (ACH-069).
12. Consumer or massive-scale B2B: the whole career is niche B2B enterprise. *Fix:* cannot be fixed on the resume; target roles where it does not matter (see 10.3).

### 10.5 Honest flags (apply to every generated resume)

1. **Targets are not results.** The AI-reasoning feature's PRD targets (60% adoption, 15% MLR revision reduction) and the staged accuracy targets (75% then 85%) are goals. Write them as targets or leave them out.
2. **Source dumps can over-attribute.** The Claude-project dump was AI-generated and may credit team outcomes to Iman. Iman has confirmed the dump-derived achievements (ACH-046 to ACH-054) as High, but any bullet must still be one Iman can defend line by line in an interview.
3. **Short tenure.** The Senior PM role is about 20 months (Feb 2025 to Oct 2026). The PM role beneath it must show a clear upward-scope trajectory.
4. **Team-size wording.** "Team from 3 to 26" means the cross-functional team grew, not 26 direct reports. Always write "scaled the cross-functional team". The 3 people Iman leads (2 PMs, 1 BA) are a separate claim (ACH-060).
5. **Next lever.** The resume only gets interviews. Mock interviews (PM cases, metrics questions, behavioural stories) are the next best use of Claude after the resume is done.

### 10.6 Metrics and facts still to fetch

| Item | Where it would go | Status | What to look up |
|---|---|---|---|
| Latest GenAI accuracy and dates of the 67% and 87% rounds | ACH-002 | Dates missing | Ask the AI/ML team for the round dates and the latest score |
| Production-time reduction | ACH-001 | Partly provided: -50% content turnaround (ACH-066), no baseline | Ask client success: email production time before vs after the platform |
| Platform volume | ACH-001 | Missing | Emails or banners generated per month, or compliance decisions processed |
| AI-reasoning feature adoption | ACH-003 | PRD target only (60%) | Replace with the actual once launched |
| MLR revision reduction | ACH-003 | PRD target only (15%) | Replace with the actual once launched |
| Revenue or contract value | ACH-064 | Provided 14 Oct 2026 (USD 4M+ licence revenue, ACH-064; USD 598K client cost savings, ACH-069) | Period the USD 4M+ covers; annual contract value if shareable |
| Scale proxies | Summary and ACH-064 | Partly provided (10 markets; about 50 to 60 daily users) | API requests, emails or banners generated per month |
| Analytics and experimentation tools | Skills | Missing | Any of Amplitude, Mixpanel, SQL, Looker, A/B testing actually used |

### 10.7 Base one-page resume (v1)

**Content reference only (15 Oct 2026):** this template predates Iman's preferred layout and writing style. For layout follow R11 and for sentences follow R9; the layout is specified in Part 10.9.

Reference template built in the strategy session. Corrections applied from Parts 2 to 9: accuracy shown as a progression from about 67% to about 87%, employer name "Sprintly Works", team scaling 3 to 26 as a cross-functional team. "Top-5 brand" in the Product Manager role refers to a pharma product brand (as on the original resume), not a company ranking.

**IMAN SADHU**
Senior Product Manager · AI / GenAI Products · Regulated MarTech
Bangalore, India · imansadhu2010@gmail.com · +91 9686567059 · linkedin.com/in/imansadhu

**Summary**
Senior Product Manager, 12 years across six industries and five global regions. Built a product from zero to 200+ users, scaled the team from 3 to 26, and currently own two production LLM-powered platforms serving global pharma brands. Operate across VP- and Director-level stakeholders with a focus on AI evaluation frameworks, scope governance, and execution under ambiguity.

**Skills**
- **Product:** Product strategy & roadmap · Product vision · End-to-end product lifecycle · PRD authorship · User stories & backlog prioritisation · Go-to-market · KPIs / OKRs · Release governance · Stakeholder management · User research · Agile / Scrum
- **AI / GenAI:** LLM product design · Conversational AI · Guardrails & responsible AI · Evaluation frameworks (accuracy, precision, recall) · Explainability (XAI) · Prompt management · Human-in-the-loop
- **Tools:** Jira · AHA · Figma · Mural · Claude · Microsoft Copilot · MJML / WCAG · MS Office

**Experience**

**Senior Product Manager | Indegene (Remote) | Feb 2025 to Present**
*AI-powered content platform; product-adoption KPIs across EU, Americas, Middle East, and Japan.*
1. Own two production AI products end-to-end, an LLM-powered email platform and a banner platform, for a top-10 US biopharmaceutical company, leading the four-product suite strategy that generated USD 4M+ in SaaS licence revenue; the email platform separately delivered about USD 598K in cumulative client cost savings (2022 to Aug 2026) for a leading global biopharmaceutical company, delivered by a 28+ person cross-functional team across four global regions.
2. Designed and ran an evaluation framework to measure how well the GenAI engine selects and presents content: defined accuracy targets, wrote business rules governing AI behaviour, and coordinated SME reviewers to score outputs; improved content-selection accuracy from about 67% to about 87% against staged 75% / 85% targets.
3. Drove AI transparency and explainability across both products, championing a feature that surfaces AI reasoning so compliance reviewers and users can verify every output; authored the PRD, defined success metrics, and split delivery into three independent layers to de-risk rollout.
4. Operated as product decision point across VP-, AVP-, and Director-level stakeholders: escalating blockers with delivery-impact statements, steering release planning to prevent under-scoped commitments, enforcing scope boundaries when late inputs threatened timelines, and communicating risk posture during live customer testing.
5. Drove technical product decisions alongside engineering leads: structured a cross-system integration architecture trade-off, analysed upstream API payloads to catch data mistagging before it reached the AI pipeline, ran rendering and device-testing POCs, and communicated technical limitations to business with specificity.
6. Integrated AI tools (Claude, Microsoft Copilot) into the PM workflow: PRD drafting, story decomposition from Figma designs, architecture analysis, sprint-health audits across 100+ items, and stakeholder-communication synthesis, enabling single-PM ownership of two products across four client tracks.

**Product Manager | Indegene (Remote) | Jul 2020 to Jan 2025**
*Pharma MarTech: built from zero across enterprise SaaS and AI-augmented products.*
1. Built a product from scratch through the full lifecycle (ideation, design, build, go-to-market), growing the user base from 0 to 200+ in 18 months and scaling the cross-functional team from 3 to 26; achieved product NPS of 8.66 in 2022.
2. Owned roadmap and release execution across four global pharma accounts (including a top-5 brand), driving data-driven prioritisation, UAT/PROD sequencing, and risk communication to leadership; delivered 20+ story features with cross-client rendering validation and WCAG-compliant components.

**Manager | EY, India | Nov 2019 to Jul 2020**
Led an AI bot product for tax filing, from 0 to 1.

**Strategy Consulting Manager | Sprintly Works, Finland | Jan 2019 to May 2019**
Generated EUR 28K revenue (28% of annual) in 2.5 months; improved customer ratings 10%; delivered inventory product at 97% service levels.

**Consultant | EY, India | May 2017 to Dec 2018**
Contributed to India's Ease of Doing Business improvement (100 to 77); built land management platform, 99.15% digitised.

**Software Engineer | EY, India | Jul 2014 to May 2017**
Led legacy-to-Guidewire migration for insurance products; drove post-migration enhancements.

**Education**
General Management, Indian School of Business (2016 to 2017) · B.Tech, VIT University, Vellore (2010 to 2014)

### 10.9 Layout specification (added 18 Oct 2026)

Build resumes and cover letters from this specification, not from an existing file. Appearance is the look Iman has approved; only content changes between applications.

| Element | Specification |
|---|---|
| Page | A4, one page. Margins: 0.3 in on all four sides (432 twips). Single section. Never reduce a margin below 0.3 in to win space; shorten wording instead. (Updated 24 Nov 2026: the old 0.08 in top and bottom sat inside the printer crop zone and triggered a resume-checker design flag.) |
| Font | Calibri throughout. **Body 10 pt. No text anywhere in the file below 9 pt** (updated 24 Nov 2026). Name 15 pt bold. Headline about 10.5 pt bold, colour 1F4E79, on the name line. Contact line 9 pt, colour 333333. Impact-strip captions 9 pt. Shrinking type is never the way to fit the page: cut bullets or shorten wording (R8). |
| Colours | Navy 0B2545 (section bars, row labels, role lines, KPI figures). Row-label fill EAF0F6. Table borders C9D3DD (0.5 pt). Muted text 333333. |
| Section bars | Full-width navy bar, white bold 9 pt text with letter spacing, upper case: SUMMARY, IMPACT AT A GLANCE, SKILLS, EXPERIENCE, EARLIER EXPERIENCE AND EDUCATION. |
| Impact strip | One row of **4** equal cells (reduced from 6 on 24 Nov 2026, so captions can be readable at 9 pt). Figure: bold, 11.5 pt, navy, centred. Caption: 9 pt, colour 333333, centred, at most two short lines. |
| Skills and story rows | Two-column table, fixed layout. Left column 1,417 twips with EAF0F6 fill and bold navy label; right column 9,625 twips (total 11,042 = A4 width less the 0.3 in margins; updated 24 Nov 2026). Cell margins 45 twips left and right, 8 top and bottom. Right column holds bullets (a bullet character, then a tab) for story rows and plain text for skills rows. |
| Role lines | Bold navy line "Title | Company | Dates", 2 pt space above. The current role carries one italic 9 pt context line below it. |
| Earlier experience | One line per role, bold lead-in then text; Education as the last line. |
| Text integrity (added 24 Nov 2026) | **Never stack two lines with a line break inside one text run.** Every stacked caption or label line is its own paragraph in the cell (or, if a break is unavoidable, the break is preceded by a space). A break inside a run glues the words together for every machine that reads the file: the 9 Nov General GPM build produced "revenue**from** suite", "accuracy**up** from ~67%", "turnaround**with** GenAI pipeline", "across**3** pharma clients" and "Portfolio**impact**", which a resume checker read as spelling errors. |
| Bullets (added 24 Nov 2026) | A bullet is a bullet character **followed by a space**, then the text. Never `•Text`. The 19 Nov builds emitted 37 bullets as `•My product suite earned...`, which an ATS tokenises as `•My`. Preferred: Word list formatting (numPr). Acceptable: glyph + space + tab. |
| Repetition (added 24 Nov 2026) | No bullet-opening verb appears more than twice in the file. Check before saving: the 9 Nov build opened three bullets with "Set the" and two with "Established". |
| Dates on the page (added 24 Nov 2026) | Indegene roles carry month dates. The whole EARLIER EXPERIENCE block is year-only (see R7). Education carries no years at all. |
| ATS twin (added 26 Nov 2026) | Same content as the designed resume, built as one column with no tables, shading, headers or footers (R16). Plain headings, real list bullets, Calibri 10 pt. Used for portals and parsers. |
| Page fit (added 27 Nov 2026) | One page with `page_safety_lines` (3) spare lines when tested (R8). If the safety margin is lost, cut the highest-rank bullet that is not the sole carrier of a used keyword. |
| Highlights | Yellow highlight on review copies only (see step 3b). Clean copy has none. |
| Cover letter | Same page, margins, font and header as the resume. Section labels bold navy 10 pt. Bullets as above. About 250 to 320 words. |

### 10.8 Prompt for mining other Claude projects

Use this in any Claude project that holds Iman's product work (specs, inputs, decisions, discussions) to extract resume-grade achievements, then add the results to Part 5.

```
You are helping me build a Senior / Group Product Manager resume. This project
contains my real product work — feature specs, development inputs, decisions,
and discussions. Mine everything available to you in this project (uploaded
documents and our past conversations) and extract resume-grade accomplishments.

For each distinct feature, initiative, or project you find, capture:
- Context: what it was, in one line
- The problem and MY decision: what I chose, what I killed, what I bet on
- Measurable outcome: metrics, %, revenue, adoption, retention, time/cost saved
- Scope I operated at: team size, cross-functional partners, user base, budget
- People leadership: mentoring PMs, leading without authority, coordinating teams

Then turn each into 1–2 resume bullets in the form:
"Accomplished [quantified impact] by [the action/decision I made], across [scope]."
Lead with the outcome, never the activity.

Hard rules:
- Do NOT invent, estimate, or round up numbers, scope, or outcomes. If a metric
  is missing, write [METRIC NEEDED] and tell me exactly what to go look up.
- Separate what I personally drove from what the team did. Flag anything unclear.
- Prioritise seniority signals: business impact, judgment under ambiguity,
  influence across functions, and ownership of execution and of people.
- Where the material is thin, interview me — ask pointed follow-ups one batch at
  a time until each entry is strong enough for a senior resume.

Start by giving me an inventory of every feature/initiative you can find here.
Then we'll go through them one at a time.
```

---

## 11. Gaps and how to add new context

### Known gaps

1. **Evidence period:** Retrieval covers 1 Aug to 12 Oct 2026, plus vector-database meeting notes from Jul to Oct 2025 (SRC-5). Several searches were capped. Evaluation, leadership, stakeholder, business-impact and AI-tools queries were not completed. Expect more achievements once those are run.
2. **Business impact:** Licence revenue (ACH-064), client cost savings (ACH-007, ACH-069, ACH-070), turnaround and effort figures (ACH-066, ACH-067) are recorded as High. Remaining gaps: the definition and baseline of "cost saved", the baselines for turnaround and effort, and the period the USD 4M+ covers. This was the main gap against large tech listings; it is now largely closed.
3. **Older roles:** Product Manager (2020 to 2025) and EY, Sprintly and earlier roles have resume lines only. Add scope, team, users, tools and outcomes.
4. **Items marked VERIFY** in Parts 5 and 6. The Part 3 date overlaps are resolved (17 Oct 2026); the roughly five-month gap between Sprintly Works (May 2019) and EY Manager (Nov 2019) is unexplained.
5. **Glossary items marked Inferred or Unknown** (Part 8).
6. **Not yet captured:** certifications, awards, publications, speaking, patents, tools proficiency levels, languages.
7. **Scale and revenue:** Partly closed (ACH-064: USD 4M+, 10 markets, about 50 to 60 daily users). Still missing: platform volume (emails or banners per month, API requests), the period the revenue covers, and any contract value.
8. **Analytics and experimentation:** Partly covered: demand forecasting and optimisation analytics at Sprintly Works (ACH-040, 2019 consulting). Still missing: A/B testing, funnel analysis and product-analytics tools (Amplitude, Mixpanel, SQL, Looker). Do not claim A/B testing.
9. **Strategic-vision bullets:** Few "identified" or "proposed" examples. Candidates: ACH-003 and ACH-054.
10. **Dump-derived achievements (ACH-046 to ACH-054)** have no verbatim quotes in this file. Confirm each one can be defended line by line in an interview.
11. **Vector database (ACH-055, ACH-056):** Evidence is AI meeting notes (accepted by Iman as direct evidence) plus one Teams message. Missing: Jira epic and story IDs, go-live date, content volume, retrieval-quality figures, and Iman's own words on the 2025 decisions. Vector DB location is resolved: Iman confirmed on 14 Oct 2026 that it sits in the email product.
12. **MCP (Model Context Protocol):** No enterprise evidence found in any source (checked 13 Oct 2026). Do not list MCP unless Iman supplies evidence.
13. **People management (ACH-060, ACH-063):** Still need: the exact start and end dates of the reporting lines, what the BA owned formally (job scope), and any outcomes for the team (ratings, promotions).
14. **Suite and products (ACH-064, ACH-065):** Open: who leads the suite's other product (Raksha and Pooja work inside Iman's products per the files); the year and role of each buy-in; the period of the USD 4M+. Cost-saved dashboards are now recorded (ACH-069, ACH-070, Client D); open: the dashboard's definition and baseline of "cost saved", the 2026 JAPAC view and a monthly export. Excluded on purpose: the AI/ML tagging product and its +60% figure belong to another PM.
15. **Agentic-flow decks (SRC-11, SRC-12; added 15 Oct 2026):** Open: Iman's role in the red-team run and its date (ACH-072); whether the placement-stage MJML and layered evaluation were built, and with what results (ACH-073, ACH-074); actual N-run determinism results (ACH-044). NCCI ownership is now confirmed: another team (SRC-14, E43).
16. **Production architecture diagram (ACH-077, SRC-13; added 11 Nov 2026):** Open: (a) the exact date the diagram was created or last updated; (b) which specific architectural decisions were Iman's vs engineering's (the multi-model selection, choice of MongoDB and Redis, ReAct pattern for the orchestrator, Apigee as the middleware); (c) whether the total agent count is framed as 7 (5 specialised + Business Rules Agent + Planning Agent/Orchestrator) or whether the architecture diagram supersedes the "8 agents across 2 systems" count from ACH-071's Sep 2026 deck.
17. **Knowledge-graph and upstream-retrieval entries (ACH-078 to ACH-086, SRC-14; added 13 Nov 2026):** Open items from the Copilot dump:
    - **No graph-database tool names found.** No Neo4j, Neptune, Gremlin, SPARQL, RDF or GraphRAG anywhere. Do not name a graph tool.
    - **Copilot search coverage was incomplete (SRC-14):** searches were not split by quarter; Teams channels were not listed one by one; shared mailboxes were not searched; most files were read from snippets only; Jan 2022 to Jul 2024 returned nothing; transcripts have only line numbers, no timestamps.
    - **Claims resting on AI recaps only:** E30, E35, E41, E42 (SRC-14), the phased-testing plan, and the 70% vs 85% benchmark challenge (20 Oct recap).
    - **Outcomes not found:** the cluster validation experiment result (ACH-079), the multi-KG scope decision (ACH-080), whether the email platform ever got its own KG (E32), and business sign-off on the relationship model (ACH-078).
    - **Authorship unconfirmed:** who wrote each section of the guardrails doc (Harika commented on it); whether Iman authored the Release 9 and 10 stories (ACH-085).
    - **Possible overlaps with existing entries:** ACH-082 with ACH-048 (upstream API payload analysis); ACH-083 with ACH-030 (escalation on NCCI data availability); ACH-086 with ACH-002 (evaluation framework). Merge or keep per Iman's call.
    - **Not Iman's (do not claim):** knowledge graph and semantic mesh build (NCCI team); retrieval algorithm (Vidwath Hebse1, NCCI); mesh scope document and relationship vetting (Harika Aaraveeti); component-linking rules (Harika Aaraveeti, confirmed by Gokuul Veerasamy); SME tagging of 1,133 assets (NCCI SMEs); Peak D architecture diagram (Shashank Dubey); enablement deck listing knowledge graphs (Sivakumar Tumma / Manaswin Pandey); "asset-level mesh vs combined knowledge graph" and inter-cluster questions (Manaswin Pandey); engineering question list on inter-cluster relationships (M Shyam); curation-agent decision logic (Swapnil Bhattacharya).

### How to add new context

Add each new achievement to the matching theme in Part 5 and to the index in Part 4, using this template. Add new evidence to Part 12. IDs are stable and never renumbered; the next free ID is ACH-087.

```
#### ACH-0xx | Title
- **Role:** Title, Company
- **Period:** month year to month year
- **Theme:** one theme from Part 5
- **Tags:** #tag1 #tag2 (use tags from Part 7.3, add new ones there)
- **Long:** one to two sentences, action verb first, scope and result.
- **Short:** about 15 words.
- **Metrics:** values exactly as sourced, or None. Prefix [TARGETS, not results] for goals.
- **Confidence:** Resume / High / Medium / Low
- **Evidence:** EV-0xx (add the quote to Part 12), or None
- **Flag:** `USE` (Resume or High), `USE-SOFT` (Medium or Low), `CONFIRM-FIRST` (open check changes the claim)
- **Notes:**
  - **VERIFY:** what needs confirming, if anything.
```

---

## 12. Evidence appendix (verbatim)

> **Skip this part unless you are verifying a claim.** Achievements in Part 5 cite evidence by EV ID. The quotes below exist so a person can check the source.

Quotes are copied word for word from the Copilot retrieval files. Changes made: links and participant lists removed; real client names replaced by [Client A], [Client B] and [Client C]. Colleague names inside quotes are unchanged. EV-001 to EV-023 come from retrieval file 1 (E-001 to E-023). EV-024 to EV-034 come from retrieval file 2 (E-016 to E-026, renumbered because both files reuse the same IDs). EV-035 comes from the full transcript of the 17 Sep 2026 determinism-testing meeting (a .docx supplied by Iman), not from the retrieval files; it adds Iman's own passages and supersedes the shorter EV-021 for detail.

**Confidence key:** High = Iman's own words. Medium = shows involvement, not Iman's words. Low = Copilot AI meeting notes, not a transcript; verify before use.

**Source register for achievements without verbatim quotes**

| ID | Source | Notes |
|---|---|---|
| SRC-1 | Claude project dump (10 conversations): core email-generation product epic, AI-reasoning feature PRD, table feature, AI CTA button, banner component, sprint-risk intervention, architecture decision, upstream API analysis, future-editor prototype, context-understanding analysis | AI-generated; may over-attribute; confirmed by Iman 12 Oct 2026; original text not stored here |
| SRC-2 | Outlook and Teams dump (Copilot): four-account breadth, accuracy progression, leadership signals, release planning | Same caveats |
| SRC-3 | Second Copilot dump: senior stakeholder engagement, POC trade-off communication, UAT triage and blocker escalations | Same caveats |
| SRC-4 | Original resume (PDF version): NPS, user base, EY AI bot growth, Sprintly Works, EY metrics, education | Resume |
| SRC-5 | Copilot dump on vector-database and semantic-retrieval work (13 Oct 2026): AI meeting notes from Jul, Sep and Oct 2025 and Sep 2026 | AI-generated; accepted by Iman as direct evidence (13 Oct 2026); quotes in EV-036 to EV-039; a second dump (13 Oct 2026, SRC-6) adds EV-040 to EV-043 |
| SRC-12 | Deck "AI Agents – Stylization pipeline – Input/Outputs – Testing process" (CONE-9222, 13 slides), NCCA product team, 29 Jul 2026: Iman's plan, aligned with engineering and QA (Iman, 15 Oct 2026) | Iman's plan (High); recommendations, not build results; quotes in EV-050 |
| SRC-11 | Iman's deck "Agentic Email Authoring" (Peak D Agentic Flow E2E, 6 slides), internal demo to the business team, 17 Sep 2026, authored and presented by Iman: pipeline, determinism, AI safety, production readiness, red-team summary, vendor sources | Iman's own deck (High); the red-team slide was built from five report screenshots with differing totals; client name redacted; quotes in EV-047 to EV-049 |
| SRC-10 | Client D cost-saved dashboards (Power BI, 33 screenshots: ELMAC and JAPAC for 2022 to 2025, ELMAC for Jan to Aug 2026) and the 8-page report "email platform cost savings report 2022-2026" built from them (14 Oct 2026) | Client dashboards, reconciled: country bars, category bars and monthly points agree with each year's region total (monthly within about 2%); template-builds values derived; accepted by Iman as direct evidence; stored in the Business impact data folder |
| SRC-9 | Iman's value-summary card (screenshot, 13 Oct 2026) and Q&A answers (13 to 14 Oct 2026): suite scope, revenue, share, usage, turnaround, effort, buy-ins, vector DB location | Iman's own statements; no contract or measurement data in this file; the card's "Mar 2020" start, "2 enterprise clients", AI/ML tagging bullet and "multi-agent" Jira wording were rejected or corrected by Iman |
| SRC-8 | Copilot dump of Iman's chats and emails with the Business Analyst (13 Oct 2026), Dec 2025 to Aug 2026; targeted search, not exhaustive | AI-generated; accepted by Iman; quotes in EV-046 |
| SRC-7 | Six transition-activity files (banner Release 14.0 and 15.0; email Release 15.0; Peak D, email 14.0 and 14.1 are empty), Aug to Sep 2026 | Copilot-generated notes of Iman's KT and coaching; accepted by Iman; quotes in EV-044, EV-045 |
| SRC-6 | Copilot dump on RAG, explainability, agents and observability (13 Oct 2026): AI meeting notes (Jun, Aug, Sep 2026), Iman's transcript quotes and one late-2025 Teams message | AI-generated; accepted by Iman as direct evidence; quotes in EV-040 to EV-043 |
| SRC-13 | Architecture diagram "Content Studio - Email" (by Nov 2026), shared by Iman in conversation: full production system architecture built by engineering based on Iman's requirements and architectural direction. Shows the full stack: AWS hosting, Node.js API gateway, request/response guardrails, planning agent/orchestrator (ReAct), business rules agent, multi-agentic environment (5 agents), tools layer (5 tools), RAG pipeline, memory layer (MongoDB, Redis, Pinecone), data-ingestion pipeline (event-triggered, text-embedding-3-large), Azure OpenAI models (GPT-4o, GPT-4o mini, GPT-5 mini), Apigee middleware, Veeva PromoMats integration, and end-to-end LLM and agent telemetry. Iman confirmed this is the system built to his requirements. Date to verify. | Iman's own shared diagram (High); specific architectural decisions (Iman's vs engineering's) to verify |
| SRC-14 | Copilot dump on knowledge-graph, upstream-retrieval and content-relationship work (13 Nov 2026): emails, Teams chats, meeting transcripts and files, Mar 2026 to Oct 2026. Covers NCCI semantic mesh knowledge graph (node types, relationships, cluster shapes, tagging), upstream integration contract, cluster validation experiment, multi-KG architecture discussion, tagging-gap escalation, taxonomy-aware test prompts, parent–related claim hierarchy, and upstream retrieval accuracy tracking. | Mixed: Iman's own emails and transcript lines (High); AI recaps (Low for E30, E35, E41, E42); colleague messages (Medium). Evidence IDs E1 to E53. Quotes not stored verbatim in this file; retain the SRC-14 dump for reference. |

### EV-001: Banner release prioritisation request
- **Origin:** R1, original entry E-001
- **Date/time:** 7 August 2026, 11:14 PM
- **Source type:** Outlook sent email
- **Source name:** Re: [Client A] October Release 2026 – Banner Channel Feature List
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Hello @Bishnupriya, Noted 23 - should have - feature demands. Can I request you to  
> - Fill out the description/Business context for some of the remaining ones?  
> - Check if further prioritisation can be done (Are some features must have?  
> Please do let us know whenever this is done. In the meanwhile, from product side we would start familiarising ourself with the feature descriptions  
>  
> Best,  
> Iman"

### EV-002: Peak D content-selection escalation
- **Origin:** R1, original entry E-002
- **Date/time:** 11 August 2026, 11:34 AM–1:15 PM
- **Source type:** Teams chat
- **Source name:** Teams chat with Manaswin Pandey
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Couple of updates:  
> NCCA Email - Release 14.0 - still blocked - Have followed up over teams with Hitaishi  
> NCCA Email - Release 14.1 - Getting delayed more - Domino effect of the Veeva blocker above - Have asked team to check alternatives - meeting at 3:30 pm today  
> NCCA Email - Peak D - QA has reported that NCCI current cluster selection criteria needs to be completely revamped - urgent - QA will setup discussion tomorrow"

> "out of the say 10 relevant clusters sent by NCCI to NCCA, we first have to choose the 3 out of those 10"

> "this will be on NCCIs side now since their content selection accuracy we have told them should also be relative to final email"

### EV-003: Banner handover and requirement framework
- **Origin:** R1, original entry E-003
- **Date/time:** 17 August 2026, 6:35 PM
- **Source type:** Teams chat
- **Source name:** [Client A] Banner walkthrough
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Raksha Prakash Action Items for banner  
> Review the Banner defect tracker and business requirement intake sheet.  
> Compare both sources and identify missing or overlapping feature requests.  
> Validate with Bishnupriya Dhawan whether additional live-testing feedback should be included in the next release plan  
> Consolidate a single "ground truth" list of Banner requirements for prioritization.  
> Ensure feature requests are supported by JSM tickets and sufficient business inputs.  
> Conduct requirement clarification sessions with Business and CPC stakeholders.  
> Draft PRDs and user stories, obtain CPC and Business sign-off, and prepare for Jira grooming.  
> Review existing NCFPs, Banner samples, and storyboards to build product understanding.  
> Engage with key stakeholders across Business, CPC, QA, Engineering, and UX teams for Banner planning and execution.  
> Reconnect with Iman Sadhu after the initial review to align on scope and prioritization."

### EV-004: Banner release scope trade-offs
- **Origin:** R1, original entry E-004
- **Date/time:** 19 August 2026, 2:30 PM–3:15 PM
- **Source type:** Meeting recap
- **Source name:** Banner - Release 15.0 Items - Internal huddle and planning
- **Speaker / author:** AI meeting notes (not a transcript)
- **Confidence:** Low (AI notes; verify before use)
- **Verbatim:**

> "Iman proposed presenting two options to the business: one for an October release with prioritised features, and another estimating the time required to address all CPC feedback, to manage expectations."

> "Iman stated that the scope for the October release will be finalised in coordination with Raksha and the team, with a plan to align internally before the business call."

### EV-005: October scope and technical discovery
- **Origin:** R1, original entry E-005
- **Date/time:** 18 August 2026, 5:00 PM–5:30 PM
- **Source type:** Meeting recap
- **Source name:** [Client A] VAE/SFMC Discussion
- **Speaker / author:** AI meeting notes (not a transcript)
- **Confidence:** Low (AI notes; verify before use)
- **Verbatim:**

> "Iman advised Pooja to give early notice to the UX team (Karthik, Naval, Manoj) about upcoming VD requirements to avoid resource conflicts, and clarified that engineering bandwidth concerns should be addressed after aligning with business priorities."

> "Manaswin and Iman agreed that only the most crucial features, such as VA SFMC creation and [Client B] migration, should be considered for the October release due to limited capacity, and that other features should be discussed only if business pushes for them."

> "Iman explained that VA and SFMC use different token syntaxes (e.g., double parentheses for VA, percentage signs for SFMC), and that mapping between these tokens is non-trivial due to differences in how each platform handles personalisation and deployment."

### EV-006: AI email generation workflow definition
- **Origin:** R1, original entry E-006
- **Date/time:** 24 August 2026, 1:10 PM–5:03 PM
- **Source type:** Teams chat
- **Source name:** Peak D changes
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Changes discussed today:  
> 1. Please put Email type as droddown in the metadaata selection screen"

> "And these are the steps required in the email generation steps  
> 1. Searching for relevant e details  
> 2. Choosing approved template  
> 3. Curating content  
> 4. Generating payload for email generation  
> 5. Placing content  
> 6. Styling content  
> 7. Generating final email"

> "Searching for relevant content"

> "Write this instead then"

### EV-007: Release dates and CRM transition
- **Origin:** R1, original entry E-007
- **Date/time:** 25 August 2026, 6:00 PM–6:30 PM
- **Source type:** Meeting recap
- **Source name:** Business x Product x Eng x QA dsicussion on [Client A] Email 14.0 and 14.1 releases
- **Speaker / author:** AI meeting notes (not a transcript)
- **Confidence:** Low (AI notes; verify before use)
- **Verbatim:**

> "Iman recommended that the team use Vault CRM for all remaining testing."

> "Iman stated that three Vault CRM issues had already been identified for remediation."

> "Iman stated that 14.0 can be deployed to UAT without waiting for the remaining CPC confirmation."

> "Iman stated that 14.1 can be deployed to UAT on 15 October if CPC sign-off is not required; a 20 October date would apply if sign-off were needed."

### EV-008: Banner backlog triage
- **Origin:** R1, original entry E-008
- **Date/time:** 11 August 2026, 3:00 PM–3:49 PM
- **Source type:** Teams chat
- **Source name:** Teams chat with Manaswin Pandey
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Triaged"

> "put a filter on the Traiged column :"

> "1 bug confirmed for now"

> "All other are feature requests/UX improvements/Observations"

> "and the ones marked yellow like this are the ones which will give them some design limitations"

> "with data"

### EV-009: Release 15 business alignment
- **Origin:** R1, original entry E-009
- **Date/time:** 25 August 2026, 3:30 PM–4:00 PM
- **Source type:** Meeting recap
- **Source name:** Re: [Client A] October Release 2026 – Banner Channel Feature List
- **Speaker / author:** AI meeting notes (not a transcript)
- **Confidence:** Low (AI notes; verify before use)
- **Verbatim:**

> "Iman explained that the team is consolidating requirements from the defect tracker, live testing feedback, and the NCCA business requirement sheet shared by Bishnupriya."

> "Iman presented an initial list of 11 proposed features for Release 15, including ISI PI scroll improvements, paragraph spacing controls, font weight options, bullet point customisation, hyperlink customisation, Mozilla scroll width behaviour, and timeline preview behaviour."

> "Iman and Keerthi discussed the feasibility of enabling either a code editor or a larger set of features (30-40 out of 60+ requests)."

### EV-010: Delegated Banner requirement ownership
- **Origin:** R1, original entry E-010
- **Date/time:** 31 August 2026, 1:15 PM–4:28 PM
- **Source type:** Teams chat
- **Source name:** Teams chat with Raksha Prakash
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "If you can take the discussion at 6 pm, take it and gather :  
> Problem statement for each NCFP  
> What are the requirements due to the problem statement  
> Any package examples needed for each NCFP"

> "It will be good if you can get started. Keerthi would be there to guide on banner related items"

> "Start with these 2"

### EV-011: Product review across Peak D backlog
- **Origin:** R1, original entry E-011
- **Date/time:** 31 August–1 September 2026
- **Source type:** Teams channel message
- **Source name:** Team - Email
- **Speaker / author:** System listing: work items assigned to Iman
- **Confidence:** Medium (shows involvement, not Iman's words)
- **Verbatim:**

> "Story CONE-9681 BE — Generate Confirmation Vibe Message Describing What Will Change Product Review iman.sadhu"

> "Story CONE-9678 BE — Generate Dynamic Change-Intent Response and Serve Change-Menu Chip Definitions Product Review iman.sadhu"

> "Story CONE-8991 Persist Peak D Chat ID and Full Session Payload to Backend on Context Lock Product Review iman.sadhu"

> "Story CONE-8953 09_Handle Metadata Panel API Failure Gracefully with Inline Error and Retry Product Review iman.sadhu"

> "Story CONE-8948 03_Backend: What happens when NCCI returns no clusters for a particular prompt Product Review iman.sadhu"

> "Story CONE-8368 UI Entry Point for Asset-Driven Authoring Workflow Product Review iman.sadhu"

### EV-012: Banner coaching and product KT
- **Origin:** R1, original entry E-012
- **Date/time:** 1 September 2026, 1:36 PM
- **Source type:** Teams chat
- **Source name:** Teams chat with Manaswin Pandey
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Gave a 1 hour KT to Raksha on scroll bar in banner today. So she will be leading the NCFP discussions today and Ill be there to support. Showed her how we are documenting the problem statement and the requirements on JSM and how to catch the additional questions for banner as a product"

### EV-013: Banner requirements and release control
- **Origin:** R1, original entry E-013
- **Date/time:** 2 September 2026, 11:55 AM–12:09 PM
- **Source type:** Teams meeting chat/AI notes
- **Source name:** NCCA Leaders : Daily Connect
- **Speaker / author:** AI meeting notes (not a transcript)
- **Confidence:** Low (participation only, statements not attributed to Iman)
- **Verbatim:**

> "Release scope: Decide whether the next banner release includes all 30 requested features or a prioritized subset, and confirm the engineering estimate and business-alignment owner."

> "Email and banner work: E-detail has been sent for sign-off, banner work is progressing, and email scope is being organized through a prioritized list alongside VA SFMC."

### EV-014: Banner requirement evidence standards
- **Origin:** R1, original entry E-014
- **Date/time:** 3 September 2026, 2:02 PM–3:01 PM
- **Source type:** Meeting transcript
- **Source name:** Weekly operational tracker - NCCA Email and Banner - Transitional activities-20260910_140103-Meeting Recording.mp4
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "So the problem statement here is how can the users who are using multiple things on top of each other, slightly overlap, full overlap, partial overlap, how can they easily select individual layer, individual elements basically?"

> "Yeah, is the is the ask to improve the selection experience only in the editor canvas or in any other places of the application?"

> "Then we draft of the PRD and we review the PRD for this."

> "Make sure you understand, like for 100, what exactly happens? For 200, what exactly happens? Get some samples, maybe 100, 200, 300, so that they can be provided to our QA team for reference when they're testing."

### EV-015: Accuracy and Italy evaluation escalation
- **Origin:** R1, original entry E-015
- **Date/time:** 3 September 2026, 12:55 PM
- **Source type:** Outlook sent email
- **Source name:** RE: [Client A] GenAI Email - Italy Testing Completion Update
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Hello @M Shyam,  
> Could you please share out by when the Italy SME testing stories (4) would be completed? Also I understand from Minu that that the current free text field generation accuracy is not more than 85% yet. Can you pls check what is the plan for this as well?  
>  
> Best,  
> Iman"

### EV-016: Claude-enabled product handover
- **Origin:** R1, original entry E-016
- **Date/time:** 7 September 2026, 3:27 PM
- **Source type:** Outlook sent email
- **Source name:** Claude Context to feed in shared chat for [Client A] Email and Banner
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Hello Pooja and Raksha,  
>  
> I have already shared out the Claude projects for email and banner with you. PFA all the conversations from those projects individually in markdown files. Please add them as context files to your claude project and start the onboarding process  
>  
> @Manaswin Pandey , I have handed over all claude context available with me for [Client A] Email (non GEN AI and Peak D), [Client A] Banner  
>  
> Best,  
> Iman"

### EV-017: QA delegation and coverage risk
- **Origin:** R1, original entry E-017
- **Date/time:** 7 September 2026, 3:30 PM–4:00 PM
- **Source type:** Meeting recap
- **Source name:** QA Briefing to SME- Curation & Placement Agent
- **Speaker / author:** AI meeting notes (not a transcript)
- **Confidence:** Low (AI notes; verify before use)
- **Verbatim:**

> "Iman noted that Revanth is currently the only senior tester supporting the whole Peak D area, creating multiple dependencies on their availability and capacity."

> "Iman advised Revanth to delegate important testing work to the colleague who is catching up."

### EV-018: Explainability and requirement refinement
- **Origin:** R1, original entry E-018
- **Date/time:** 10 September 2026
- **Source type:** Meeting transcript
- **Source name:** Weekly operational tracker - NCCA Email and Banner - Transitional activities-20260910_140103-Meeting Recording.mp4
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "The problem statement here is how can the users who are using multiple things on top of each other, slightly overlap, full overlap, partial overlap, how can they easily select individual layer, individual elements basically?"

> "Yeah, yeah, yeah, yeah, VDs will be required here. Correct, definitely. This is primarily on them."

> "Then we draft of the PRD and we review the PRD for this."

### EV-019: Langfuse workflow investigation
- **Origin:** R1, original entry E-019
- **Date/time:** 15 September 2026
- **Source type:** Meeting transcript
- **Source name:** langfuse internal prep for 17 Sep demo-20260915_141933-Meeting Recording.mp4
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Okay, so my question is, where is the where is my prompt? This prompt that I have put here, can you create this thing? Where is this thing?"

> "Okay, so I can see the prompt in three places now."

> "And this, you have not asked it to review the prompt three times. This is doing on its own. It can also be one time."

> "So essentially I give the prompt back the guardrails, the guardrail agent, which is nothing but a GPT 4.0. It is essentially analyzing everything in the back end."

> "This is the query, correct?"

> "This I have to showcase."

### EV-020: Stakeholder GenAI workflow demonstration
- **Origin:** R1, original entry E-020
- **Date/time:** 16 September 2026
- **Source type:** Meeting transcript
- **Source name:** Internal demo prep before Sharan demo-20260916_193156-Meeting Recording.mp4
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "What we wanted to show today is go through an end-to-end happy flow."

> "What we are going to look at today is a Gen. AI-based workflow."

> "Where the system essentially creates emails automatically out of your out of your content that comes from your approved e-details, right?"

> "And since it's an approved content in the e-detail, the content that will go in the e-mail is also approved."

> "we are going to showcase side by side our LangFuse tool"

> "I will show you the places where the intelligence of the LLM can be seen."

### EV-021: Determinism and AI safety framework
- **Origin:** R1, original entry E-021
- **Date/time:** 17 September 2026
- **Source type:** Meeting transcript
- **Source name:** NCCA Validation Review: Determinism Testing, AI Safety & Production Readiness
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "what Satish input was that that most of our stakeholders, the questions that can come during internal demos, even client demos, is questions about deterministic testing being done."

> "are the model reasonings coming out the same for the same prompt?"

> "are the, for example, the clusters coming the same every time? And are the reasoning why those clusters were selected coming the same every time? And is the relevant score also coming the same every time? If not, how much are the variance in all of these kind of activities?"

> "someone can ask us how deterministic is your system, how safe is your system, and how auditable is your system."

> "what I am proposing, and this is to align, is that variance in our end-to-end workflow"

> "for the guardrail agent, red team testing, prompt injection testing, harmful prompt injection, these are stuff Muniraja, this data we need to keep on already on our side"

> "So I am from product side. This is the, I'm like, I'm already laying out what needs to be done."

### EV-022: Banner scrollbar grooming decisions
- **Origin:** R1, original entry E-022
- **Date/time:** 9 September 2026, 12:15 PM–1:00 PM
- **Source type:** Meeting recap
- **Source name:** Banner Grooming - Scroll bar customisation
- **Speaker / author:** AI meeting notes (not a transcript)
- **Confidence:** Low (AI notes; verify before use)
- **Verbatim:**

> "Iman asked what would happen with a value such as 1000; Karthik confirmed that the content would move outside the canvas."

> "Iman instructed the team not to assume or include that functionality in this epic."

### EV-023: NCCI risk and benchmark escalation
- **Origin:** R1, original entry E-023
- **Date/time:** 12 October 2026, 10:53 AM
- **Source type:** Outlook sent email
- **Source name:** RE: WSR [Client A] Gen AI Email - Testing Status- 05th Oct - 09th Oct
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Hello @M Shyam  
> Can you please check the risk highlighted by Keerthi in terms of lack of data available from NCCI? Would like you to send out a communication to NCCI team if required with a drop dead ETA from our side. Please also share with this group the plan for accuracy to increase as per benchmark.  
>  
> Iman"

### EV-024: Planned October release scope
- **Origin:** R2, original entry E-016
- **Date/time:** 18 Aug 2026, 5:00–5:30 PM
- **Source type:** Teams meeting transcript
- **Source name:** [Client A] VAE/SFMC Discussion
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Right, so I'll give Manaswin also an update. So, Manaswin, there are 27 feature requests that the business has given as demand for the next release with the date of October end they want. Now, I've seen your communications October end, of course, at the current moment is not possible with our current engineering and testing capacities. However, on product side, what I have told Pooja to do is, despite that, if since they are asking October end, let us plan what can be done for October end."

### EV-025: Protected UX delivery capacity
- **Origin:** R2, original entry E-017
- **Date/time:** 18 Aug 2026, 5:00–5:30 PM
- **Source type:** Teams meeting transcript
- **Source name:** [Client A] VAE/SFMC Discussion
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Okay, FYI, this three days of VD creation, please be aware that Karthik, Naval and Manoj, they might have other priorities as well. So the moment you already know, for example, you will know out of these five, we will know now which have VD requirement. Today only give them a heads up. That ask them to plan that we are going to give them three more three features from [Client A] Gen AI, ask them to plan it as per in their UX delivery pipeline."

> "So if you're basically blocking their capacity, which will otherwise go away somewhere else, and then you would become delayed, OK?"

### EV-026: Sequenced low-input requirements
- **Origin:** R2, original entry E-018
- **Date/time:** 18 Aug 2026, 5:00–5:30 PM
- **Source type:** Teams meeting transcript
- **Source name:** [Client A] VAE/SFMC Discussion
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Yeah, yeah, I was just giving that context. So this is essentially in these four features that you see, these four features would need very less product inputs. Most of the product inputs are already done in this feature. So that is why I told Pooja that let us tomorrow since Bishnupriya has requested a feature gathering, we can start with these four things where product input is minimal."

> "We just need confirmation on the scope. In the meanwhile, the rest 27 minus 5 items, she can use that time that she will get to work on the mural and requirements from her side on the rest. And we continue requirement gathering till 28th of August."

### EV-027: Defined VAE–SFMC problem
- **Origin:** R2, original entry E-019
- **Date/time:** 18 Aug 2026, 5:00–5:30 PM
- **Source type:** Teams meeting transcript
- **Source name:** [Client A] VAE/SFMC Discussion
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "This feature essentially, it's a time saver feature. What they're saying is that right now when a user creates an e-mail, they have to forcibly choose between a VAE versus an SFMC. However, there are cases where VAEs and SFMCs both have content exactly same, verbatim same, just the tokens are different. That VAE will have VAE token and SFMC will have an SFMC token."

> "So they don't want users, the problem statement is they don't want users right now to waste time creating multiple placeholders, then doing multiple reviews for those placeholders. They want users to, number one, if they're creating an e-mail, they should have the flexibility to create both VAE and SFMC out of the same content."

### EV-028: Split one demand into two features
- **Origin:** R2, original entry E-020
- **Date/time:** 18 Aug 2026, 5:00–5:30 PM
- **Source type:** Teams meeting transcript
- **Source name:** [Client A] VAE/SFMC Discussion
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Yeah, there are two correct. There are two asks here. We have split them into two features actually. Feature one has its own problem statement and feature two will have its own."

### EV-029: Held timelines pending requirements
- **Origin:** R2, original entry E-021
- **Date/time:** 18 Aug 2026, 5:00–5:30 PM
- **Source type:** Teams meeting transcript
- **Source name:** [Client A] VAE/SFMC Discussion
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "All right, so aligning that goal for tomorrow's discussion is further requirement gathering on this and if business pushes for timelines, we so to that we share out the questions today only. If they push us, we can say that look, there are open questions, we have already shared that out with you. We will need to gather requirements properly for this."

> "We'll use that as a requirement gathering session. Pushback will come from business, define the timelines, but of course without requirements we cannot. And we'll start with this one because this is what is burning right now."

### EV-030: Scoped LLM variance risk
- **Origin:** R2, original entry E-022
- **Date/time:** 19 Aug 2026, 5:30–6:00 PM
- **Source type:** Teams meeting transcript
- **Source name:** VAE/ SFMC PS Walkthrough and Requirements Gathering
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Yeah, correct. I'll pitch in here, Pooja. So if Abhishek, Hitaishi, Arjun, so like you know, right, LLMs, there is variance of output with AI systems, right? So that means even for the same prompt, if we write everything same, but just make, ask it to create a VA instead of SFMC, we don't know, but there is a chance that the output."

> "might be different in the sense difference in the sense maybe the content could be same, but there could be a chance that it selects different modules for no, not different modules, but maybe the design and placement might be different of the content if it's an SFMC versus a VAE, but that is not the requirement here. The requirement here is the SF, the placement of the content in the VAE and SFMC is exactly the same."

> "Just the tokens are different. So in that case, this variance of LLMs will be a problem because the same prompt may not give you the same output, which is the requirement here. So this is 1 problem statement for this same feature on the Gen AI side, that if the user wants to create in Gen AI flow using the same prompt."

> "to VA and SFMC both, it has to happen inside the same workflow so that the next, so that a fresh chat is not started giving the LLM a chance for a different variant output."

### EV-031: Required problem validation first
- **Origin:** R2, original entry E-023
- **Date/time:** 19 Aug 2026, 5:30–6:00 PM
- **Source type:** Teams meeting transcript
- **Source name:** VAE/ SFMC PS Walkthrough and Requirements Gathering
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Yeah, Hitaishi, so let us continue this prop because we cannot move into solution space without finishing the problem space. So apart from this validation, there is a lot of questions we have specifically regarding SFMC tokens. How you map SFMC to VAE because even a quick search on the internet did not really give us a lot of results on how that mapping is."

> "So there are grey areas without which we won't be able to proceed to solution it."

> "How can we without the requirement being frozen?"

> "We have, that's why we're freezing the requirement. There are some questions also, I think Pooja shared them out last night. We'll have to address those questions. Freeze the, so instead of sharing the mural, the plan is to share out a PDD with you. So easier to look at than a mural with all this diagram. So that PDD, you folks can give us a sign of that the scope of the requirement is corrected."

> "or a PRD, project requirement document. Basically, it will tell you the same mural, but in a Word document, it will give you the scope of what we are tackling as part of the feature."

### EV-032: Focused conversion release scope
- **Origin:** R2, original entry E-024
- **Date/time:** 19 Aug 2026, 5:30–6:00 PM
- **Source type:** Teams meeting transcript
- **Source name:** VAE/ SFMC PS Walkthrough and Requirements Gathering
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Okay, okay, fine, fine. All right, so I think problem statement wise, so that means we are going to focus Arjun Hitaishi on this particular problem statement, not the other one where you have to create during creation of 1 e-mail you get to create VAE, SFMC separately. Not that we are going with the problem statement where there is an approve for use VAE or SFMC. The goal is to convert that."

> "quickly into another SFMC or VAE, changing only the tokens and not incurring a separate MLR cycle."

### EV-033: Linked sign-off to solutioning
- **Origin:** R2, original entry E-025
- **Date/time:** 19 Aug 2026, 5:30–6:00 PM
- **Source type:** Teams meeting transcript
- **Source name:** VAE/ SFMC PS Walkthrough and Requirements Gathering
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Verbatim:**

> "Okay, we are moving on this as quick as possible, Arjun Hitaishi. So the moment you give us a sign off on the requirements, solutioning, we will start. So in case there is something that comes, we need to do it. We can have a word with the engineering team that at least we know the scope. They can start capacity augmentation or whatever is needed. Let's also have those discussions with Manaswin."

### EV-034: Shared agentic-guardrails specification
- **Origin:** R2, original entry E-026
- **Date/time:** 13 Aug 2026, 3:55 PM
- **Source type:** Teams chat
- **Source name:** Direct or group chat on Content Agent logic
- **Speaker / author:** Iman (own words)
- **Confidence:** Medium (document title only)
- **Verbatim:**

> "NCCA – DERIVATIVE CONTENT FLOW – AGENTIC GUARDRAILS FOR OUTPUT GENERATION.docx"


### EV-035: Determinism, safety and auditability: Iman's passages
- **Origin:** Full meeting transcript (19m 40s), supplied by Iman as a .docx
- **Date/time:** 17 September 2026
- **Source type:** Meeting transcript
- **Source name:** NCCA Validation Review: Determinism Testing, AI Safety & Production Readiness
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words)
- **Note:** Only Iman's turns are included. `[...]` marks text removed at Iman's request. Transcription wording is unedited.
- **Verbatim:**

**[1:32]**

> Alrighty, thanks for, thanks everyone for joining in. Let's get started. So this is about, so we had a discussion with.Satish yesterday night, so Muniraja, me, Manaswin, we were there, and what the what Satish input was that that most of our stakeholders, the questions that can come during internal demos, even client demos, is questions about deterministic testing being done.which is one of the primary things that he highlighted, giving a short overview for that, meaning that why are we using one particular model? For example, on NCCA side for curation, I think we are using GPT 4.0. And for that particular model, are the model reasonings coming out the same for the same prompt?This is something on our side. And on NCCI side, for the same prompt that NCCA sends NCCI, are the, for example, the clusters coming the same every time? And are the reasoning why those clusters were selected coming the same every time? And is the relevant score also coming the same every time? If not, how much are the variance in all of these kind of activities?activities.

**[5:17]**

> Okay, got it, got it. So then, so team and this is for both teams to align on. What I have done is the questions what Satish had asked us yesterday are quite valid, which means someone can ask us how deterministic is your system, how safe is your system, and how auditable is your system. These are questions that will come from every person.

**[5:36]**

> to every product which is using Gen AI and LLMs, right? So that means in that case, what I am proposing, and this is to align, is that variance in our end-to-end workflow, when I say end-to-end workflow means NCCI giving us the clusters, us processing the clusters and generating the final e-mail in that end-to-end workflow.where variance cannot enter, I am assuming that since like, like with what is saying is a cosine similarity for semantic matching, their variance should not come in. So I'm assuming that there is, there is going to be no variance in content retrieval at least, right? So the same query always returns the same cluster because there is no LLM involved here. So there cannot be any variance here, should not be any variance here.Right, so content retrieval cannot have any variance for our solution. The content library is going to be a approved library, so content-wise also there won't be any variations, which means the system will always use approved content and only that content. Templates are again on our side, no variations there.We have validations in place on NCCA side where we make sure that all the MJML compiles properly so nothing is broken and the system cannot emit an unapproved claim, alter approved wording, or fabricate a reference. It is bound by the approved library, which is the content library. So these are all the places where variants cannot enter our.Solution, yeah, yeah, Vidwath, go ahead.

**[8:15]**

> right? Content retrieval is fixed because there is no LLM involved there. Templates are fixed because templates are also on our side, latest approved templates, and we are also validating MGML code, so there is no error. So there will be no variations, at least in the e-mail output rendering. So if you're all good on this part.

**[9:11]**

> Okay, cool. So that that is one action item, fine. So now coming to where the variance is has to be measured and bounded, which is our this column. So there are three LLM decision point. One is the semantic query generation, which means our NCCA generates a semantic query.So that means we have to check, and Minu, Muniraja, this is on our side, which means that every time user inputs a prompt, system will generate a semantic query, right? That semantic query is sent to NCCI to query their vector DB. Now, that semantic query, the first cheque to understand is, will the system generate the same semantic query?every time the same prompt is used. If not, what is the variance?OK, that's number one.on our side, right? On NCCI side, like I said, the things that we need to understand is that for every prompt that goes into this NCCI for the same prompt, for let's say N number of times, the clusters return should be the same, assuming that your database remains the same, there is no new clusters being added.Right, so, and if there is, what is the variance that needs to be done there? Harika, this is something that we need to cheque on your side. I hope we are aligned.

**[11:00]**

> and prompts remain the same, from NCCI, you should be getting the same clusters every time, the same reasoning of those same clusters every time, and the relevance score of the clusters should also be the same, and the order in which the clusters are arranged on our side should also be the same. And if they're not coming the same.

**[11:47]**

> Okay, okay. So now, now primarily moving on to the NCCI side. So NCCI and sorry, NCCA and NCCA, we have all of these agents which are working together. So first thing for the guardrail agent, red team testing, prompt injection testing, harmful prompt injection, these are stuff Muniraja, this data we need to keep on already on our side, like Satish was saying.Have we tested that the guardians are working properly? Prompt injection, red team testing, these are all going to come here.Right, so this is something that has Minu that has to be done on our side, right? And those details, you will have to touch base with Muniraja and understand what are the exact details and reports we need to generate for our stakeholders.All right, that's number one. Number 2 on this other side is now, if you look at other places where variants can come in, Minu, on our side is, for example, this one, copy generation agent is there. This builds the semantic query, right? Which means for every particular prompt that NC user gives in NCCA, one semantic query is generated by this agent.And this agent then sends that semantic query to NCCI. That semantic query, is it the same every time for every prompt? If not, what is the variance?This is one more thing. Next is template selection is fine. There won't be any variance here because it's the latest selected template. Curation agent. Curation agent, so Minu Revanth, for example, there is, let's say, to one cluster. In one cluster, there is five, let's say, 5 text, 5 images, and five reusable text, and...Some of them are optional. So for that same prompt, when those same clusters are being fetched, is the system making the same decisions about taking out the same number of optional content? And if it has, are the justifications for those decisions the same? If not, what is the variance?

**[13:53]**

> Yeah, so I am from product side. This is the, I'm like, I'm already laying out what needs to be done. After this, essentially you'll have to go back to your internal teams and plan it out and then bring it to Manaswin. [...] So please bring it out to Manaswin. This is important because as I understand from Satish, questions will come here. From anyone can come.

**[14:12]**

> And it's a valid questions to ask about any LLM system, especially in pharma.

**[14:34]**

> Assume that all of that is fixed and you will have also four elements. And that thing really needs to be fixed, that data we really need to fix. Even if I demo to Sharan tomorrow, I'm seeing a lot of, today I'm seeing a lot of duplicate data and every component is still optional. So team, as we come closer to UAT, please make sure that the data is sorted out. We are still testing with not correct data.

**[15:49]**

> Okay, so let's assume, so Revanth, let's assume you will have those. That's an assumption that you will have to call out, you and Minu have to call out when you are designing this exercise, what needs to be done. Okay, just quickly overview. So now coming after the curation agent, you come to the placement agent. Now placement agent, what it does is if you have seen our land use placement agent looks at decides.How many, like for example, if an e-mail needs to have a headline, greeting section, section divider, salutation. For the same prompt, is the system designing the same sections of the e-mail? That's #1. Number 2 would be for the same prompt, is this inside each section, is the system placing the content in the same way?If not, what is the variance?And then you come to stylization. Same thing is the is the system stylizing it the same way for every prompt and then the validator is this is the I don't I'm not sure we need need here, but so we are going to need for guardrail agent, we're going to need for copy generation agent, curation agent, placement agent, stylization agent. These are the areas on NCCI we will need and to help the team I have already created a Excel sheet that I'll share out. So for example.If you can see here for NCCI, for cluster retrieval, these are the items that we have to do. Same prompt receives the same clusters, cluster count stability, cluster gain loss between runs, relevance scrolling. So the same query should give the same cluster and the same relevance score. So all of this is already there. You can see it in the tabs, NCCI, retrieval and scoring, and then NCCI, you will have the curation decisions here. And the other.So teams, this is just to help you design your design and create the plan for this activity on your side. So you can take a reference at this Excel and I'll share also that link of that PPD.

**[18:00]**

> Mm.Yeah, yeah, if someone else we can showcase.But we can say that all of these items that right now we don't have the bandwidth to work on it. So Manaswin, maybe this is also for me, you and Harika to align on internally. Maybe that at the moment we haven't run this test, but they are planned and we are going to do it.

**[18:34]**

> Talent then.All right. [...] And Minu Revanth, if you can standardise this kind of template for any kind of Gen AI testing that we do in the future, that will be just off. You'll be able to reuse that and save effort in the future.

**[18:58]**

> All right, team. Yeah, so do some research, please. QA team specifically on your side, Minu Revanth, you will need to do some research on this. Discuss with Rajini internally and come up with a good strategy for this deterministic testing.So us on your side as well, please. We need to work closely together on this, right? To the customer, it's one solution. Everything has to work perfectly.

### EV-036: Vector database strategy
- **Origin:** SRC-5 (Copilot dump, 13 Oct 2026)
- **Date/time:** July 2025
- **Source type:** Copilot AI meeting notes
- **Source name:** [Client A] GenAI Scope of features
- **Speaker / author:** Copilot notes naming Iman, Muniraja and Manaswin
- **Confidence:** High (AI notes, accepted by Iman 13 Oct 2026)
- **Verbatim:**

> "Set up a separate vector database in NCC, not use CSA's."

> "Iman, Muniraja, and Manaswin discussed the need to set up a vector database for storing and searching modules."

> "Iman clarified that the CSA team will not provide a vector database; a separate one may be required in NCC."

> "Muniraja and Manaswin discussed syncing the vector database with Viva modules for continuous updates."

### EV-037: Vector database infrastructure as the first epic
- **Origin:** SRC-5
- **Date/time:** 4 September 2025
- **Source type:** Copilot AI meeting notes
- **Source name:** [Client A] Gen AI Refinement session 2025-09-04
- **Speaker / author:** Copilot notes naming Iman, Muniraja and Rashmi
- **Confidence:** High (AI notes, accepted by Iman 13 Oct 2026)
- **Verbatim:**

> "Iman and team discussed setting up vector database infrastructure for [Client A] Gen AI as the first epic."

> "Iman and Muniraja clarified that the current story covers migrating existing modules from Viva to the vector database."

> "Iman explained the process for semantic comparison of user prompts using vectorization and relevance scoring in the backend."

> "Iman and Rashmi clarified that vectorizing and storing the prompt and retrieving for comparison are separate technical stories with different techniques."

> "Iman listed mandatory and optional metadata required for locking and vectorizing user prompts before sending to the vector database."

### EV-038: Email platform and vector database integration
- **Origin:** SRC-5
- **Date/time:** 9 October 2025
- **Source type:** Copilot AI meeting notes
- **Source name:** [Client A] Gen AI Refinement session_09-10-25
- **Speaker / author:** Copilot notes naming Rashmi and Himanshu (not Iman)
- **Confidence:** Low (AI notes; shows the context Iman was in, not Iman's own work)
- **Verbatim:**

> "Rashmi is currently working on the 'Integrate NCC and Vector DB' story, which establishes the data pipeline between Vector DB and the NCC application."

> "Himanshu explained that the Vector DB is a cloud-based, private database managed through Pinecone."

### EV-039: Retrieval flow and determinism, Sep 2026
- **Origin:** SRC-5 (first quote); EV-035 (second and third quotes, repeated from the transcript)
- **Date/time:** 2 September 2026 (sync notes); 17 September 2026 (transcript)
- **Source type:** Copilot AI meeting notes; meeting transcript
- **Source name:** Delivery sync between the email and upstream-retrieval teams; Validation Review: Determinism Testing, AI Safety & Production Readiness
- **Speaker / author:** Notes name Prashant (not Iman) for the RAG description; the second and third quotes are Iman's own words
- **Confidence:** Low for the sync notes. High for the Iman quotes
- **Verbatim:**

> "approved modules were fetched, embedded locally, and stored in the team's vector database after their status changed to approved." / "Searches then queried that local vector database rather than Vibhav." / "Prashant characterized the flow as retrieval-augmented generation based on vector-embedding similarity."

> "That semantic query is sent to NCCI to query their vector DB."

> "for every prompt that goes into this NCCI for the same prompt, for let's say N number of times, the clusters return should be the same, assuming that your database remains the same"

### EV-040: Show-thinking and dynamic LLM UI
- **Origin:** SRC-6 (Copilot dump, 13 Oct 2026)
- **Date/time:** 14 August 2026 (grooming session); June 2026 (dynamic-UI discussion)
- **Source type:** Copilot AI meeting notes
- **Source name:** Recurring grooming sessions for the GenAI email experience, 2026-08-14; June 2026 GenAI UX discussion
- **Speaker / author:** Copilot notes naming Iman
- **Confidence:** High (AI notes, accepted by Iman 13 Oct 2026)
- **Verbatim:**

> "Iman described the process where the system checks for metadata after a user submits a prompt, and explained that this will be shown as an internal LLM message"

> "Iman outlined the plan for NCCA to generate and stream structured reasoning payloads"

> "Iman discussed the importance of displaying LLM reasoning steps on the user interface to enhance user trust"

> "Iman demonstrated how the LLM dynamically generates UI elements based on the complexity and type of user input"

> "build the system to support scalable, variable UI outputs for LLM-generated messages"

### EV-041: Observability and vectorised prompt roadmap line
- **Origin:** SRC-6
- **Date/time:** September 2026 (validation review summary); late 2025 (Teams message, date not given)
- **Source type:** Copilot AI meeting summary; Teams message
- **Source name:** NCCA Validation Review: Determinism Testing, AI Safety & Production Readiness; Teams message listing the GenAI roadmap
- **Speaker / author:** Meeting summary (Copilot); Teams message (Iman's own words)
- **Confidence:** High (AI notes accepted by Iman 13 Oct 2026; Teams line is Iman's own words)
- **Verbatim:**

> "LangFuse tracing inputs, outputs, latency, token counts and relevance scores so decisions can be replayed and audited."

> "Input Prompting - vectorisation/parsing of the locked input prompt"

### EV-042: Cluster selection and multi-cluster tasks
- **Origin:** SRC-6
- **Date/time:** August 2026
- **Source type:** Grooming file (Copilot-extracted action items)
- **Source name:** Peak D grooming file
- **Speaker / author:** Action items attributed to Iman
- **Confidence:** High (AI notes accepted by Iman 13 Oct 2026; VERIFY outcome)
- **Verbatim:**

> "Set up a discussion with the NCCI engineering team to clarify cluster selection and ordering logic for e-mail generation"

> "Clarify use cases for scenarios where more than one cluster is used in an email"

### EV-043: Semantic-query generation and prompt-level determinism (Iman's transcript words)
- **Origin:** SRC-6, quoting the 17 Sep 2026 transcript (see EV-035)
- **Date/time:** 17 September 2026
- **Source type:** Meeting transcript
- **Source name:** NCCA Validation Review: Determinism Testing, AI Safety & Production Readiness
- **Speaker / author:** Iman (own words)
- **Confidence:** High
- **Verbatim:**

> "One is the semantic query generation"

> "every time user inputs a prompt, system will generate a semantic query"

> "someone can ask us how deterministic is your system, how safe is your system, and how auditable is your system"

### EV-044: Banner PM coaching and transition notes
- **Origin:** SRC-7
- **Date/time:** 14 Aug to 3 Sep 2026 (banner Release 15.0, six sessions); 26 Aug 2026 (banner Release 14.0)
- **Source type:** Copilot-generated transition notes
- **Source name:** [Client A] Banner Release 15.0 and 14.0 transition files
- **Speaker / author:** Notes of KT and guidance provided by Iman
- **Confidence:** High (accepted by Iman 13 Oct 2026)
- **Verbatim:**

> "Taught Raksha that Banner planning requires analysis of three independent inputs: CPC testing feedback, business intake demand, and existing Banner backlog."

> "Provided release planning framework: include currently active engineering work, high-value CPC requests, low-hanging-fruit opportunities, finalize scope jointly with product leadership."

> "Emphasized JSM documentation is mandatory; verbal confirmation is insufficient."

> "Explained Product must participate in requirement discussions and should not allow business to directly align with engineering without Product involvement."

### EV-045: Email PM coaching notes
- **Origin:** SRC-7
- **Date/time:** 17 Aug to 3 Sep 2026 (ten sessions)
- **Source type:** Copilot-generated transition notes
- **Source name:** [Client A] Email Release 15.0 transition file
- **Speaker / author:** Notes of KT, mentoring and guidance provided by Iman
- **Confidence:** High (accepted by Iman 13 Oct 2026)
- **Verbatim:**

> "Prioritize all requests into P1, P2, P3, and P4 instead of treating every request equally."

> "Follow structured process: Prioritize > Analyze > Validate > Document > PRD > Sign-off > Release Planning."

> "Release scoping is an important PM growth opportunity."

> "PMs should actively control unstructured discussions and bring conversations back to objectives."

> "PM is fundamentally a change-management discipline."

> "Taught structured AI-assisted prioritisation using Claude with CPC HTML developer persona."

### EV-046: Directing the Business Analyst
- **Origin:** SRC-8
- **Date/time:** 24 Dec 2025 to 21 Aug 2026 (nine interaction sets)
- **Source type:** Teams chats and emails (Copilot-extracted)
- **Source name:** Chats between Iman and the Business Analyst, [Client A] backlog, stories, Banner and Email releases
- **Speaker / author:** Iman (own words)
- **Confidence:** High (Iman's own words; accepted by Iman 13 Oct 2026)
- **Verbatim:**

> "Transfer those improvements/feature requests to the [Client A] backlog excel" (24 Dec 2025; client name replaced)

> "work on the stories" (28 Jan 2026)

> "no you have to sit with him and understand what he is trying to do" / "we just want to understand what they are working on and when can we see some results" (29 Jan 2026)

> "please keep a sharp eye from tomorrow on banner team" / "every individual story they are wkring track for a while int he scrums" / "so they know that you are tracking actual progress" (29 Jan 2026)

> "for the smfc template ask him to remove the token" / "the token we are not generating via gen ai" / "its coming via the template" (24 Apr 2026)

> "Would like to thank you for holding the fort along with Manswin in my absence" (18 May 2026)

> "so the tone of your email has to be very humble and at the end you should write: "Happy to setup a call to provide you with any other details you may require"" (18 May 2026)

> "timings are okay with me, but do check clanedars of other stakeholders like eng , qa leads and other PMs" (10 Jul 2026)

> "Feature testing end-21 July / CPC Demo-20-21 Jul / CPC testing-20-24 Jul / Regression -22-30 Jul / CPC signoff-28 July / Buffer-No buffer / UAT-3 Aug / QA sanity check in UAT-3 Aug / PROD-4 Aug" (10 Jul 2026)

> "This is also a duplicate" (21 Aug 2026; closing duplicate NCFP tickets and keeping the original)

### EV-047: Agentic email-authoring architecture and guarantees
- **Origin:** SRC-11 (slides 1 to 3)
- **Date/time:** 17 Sep 2026 (internal demo to the business team)
- **Source type:** Iman's own presentation deck
- **Source name:** "NCCA - Agentic Email Authoring" (Peak D Agentic Flow E2E)
- **Speaker / author:** Iman Sadhu, Senior Product Manager (own deck)
- **Confidence:** High
- **Verbatim:**

> "[Client A] · PEAK D" / "NCCA - Agentic Email Authoring" / "How one prompt becomes a validated, brand-ready email — and how we know it's reliable, safe, and auditable." / "Iman Sadhu – Senior Product Manager" (client name replaced)

> "One prompt in, a validated brand-ready email out. Eight agents across two systems: NCCA (LLM agents) and NCCI (algorithmic retrieval — no LLM). The flow hands off NCCA → NCCI → NCCA."

> "Guardrail Agent — Screens every prompt; unsafe input stops here" / "Metadata Extractor — Parses prompt: product, country, audience, topic" / "Copy Generation Agent — Builds the semantic query sent to NCCI" / "Cluster Retrieval — Cosine — no LLM" / "Scoring & Ranking — Relevance scores, ranked" / "Curation Agent — Selects which optional claims, images & text to include" / "Placement Agent — Builds & orders sections (greeting, body, salutation…)" / "Template Selection — Latest MLR-approved template — rule-based (runs in parallel)" / "Stylization Agent — Applies brand rules; outputs render-ready MJML" / "Validator Agent — Compiles MJML; retries until error-free, then delivers"

> "Safe by default — Guardrail screens every prompt; unsafe input never runs." / "Retrieval is math — Cosine + BM25 + RRF, no LLM. Same query = same result." / "Self-correcting — Validator loops until MJML compiles cleanly." / "Compliance built in — Only MLR-approved claims & templates. AI arranges, never invents." / "Fully auditable — Every agent decision traced in LangFuse — replayable."

> "Non-variance zones: Content Library (approved claims only) · Templates (fixed approved) · MJML Validation (compiler) · Claims Library (PromoMats IDs) · Email Rendering (fixed path)"

> "Live UI updates — The interface updates in real time, reflecting each agent's progress as the email is built." / "Dynamic, guided responses — The system responds dynamically, steering users to the right next action at each step." / Out of scope: "Non-happy-path flows" / "Targeted e-detailing data for content" / "Automated content extraction" / "Reference emails for design inspiration" / "Items out of scope are deferred to later phases — not limitations of the underlying system."

### EV-048: Determinism by design, test matrix and the three questions
- **Origin:** SRC-11 (slides 4 and 6)
- **Date/time:** 17 Sep 2026
- **Source type:** Iman's own presentation deck
- **Source name:** "Built for reliability — determinism, safety, and auditability by design"; Sources slide
- **Speaker / author:** Iman Sadhu (own deck)
- **Confidence:** High
- **Verbatim:**

> "No LLM vendor guarantees bitwise-identical outputs (Anthropic, OpenAI, Google, xAI all document this). Our architecture is designed so that variance cannot compromise safety, compliance, or brand integrity."

> "NCCI — ZERO-VARIANCE ZONE: Retrieval is algorithmic, not LLM-driven" / "NCCA — BOUNDED VARIANCE: 5 agents with LLM decisions; variance measured and controlled"

> "Cluster retrieval — Cosine Similarity + BM25 + RRF — no LLM. Same query always returns same clusters in same order with same scores." / "Relevance scoring — Pure mathematical computation. A 96% score is 96% every run for the same query-cluster pair."

> "Prompt pre-processing — Truncation or normalization before query embedding is one potential micro-variance source — flagged for testing."

> "Copy Generation Agent — Generates semantic query from prompt. LLM decision point — controlled via temp=0 and structured outputs." / "Curation Agent — ... Tests: same cluster → same selection → same justification." / "Placement Agent — ... Tests: section structure stability." / "Stylization Agent — ... Tests: styling decision consistency."

> "Determinism test suite — Same-prompt-N-runs measuring cluster overlap, curation agreement, section match, and end-to-end email similarity per stage."

> "Business threshold — We measure variance; stakeholders decide acceptable limits."

> "50+ test activity matrix created from product side — NCCI: 15 tests. NCCA: 5 agents, 27 tests. End-to-end: 8 tests. Safety: 10 tests."

> "'How deterministic is it?' NCCI retrieval is algorithmic — zero expected variance. Variance is bounded to other LLM decision points" / "'How safe is it?' Guardrail agent screens every prompt. The system can only select from approved claims — it cannot emit unapproved content, alter wording, or fabricate references." / "'How auditable is it?' Every agent decision traced in LangFuse end-to-end. Inputs, outputs, scores, reasoning — all replayable. Any decision can be audited after the fact."

> Sources slide (Anthropic): "Even with temperature set to 0, the results will not be fully deterministic and identical inputs may produce different outputs across API calls." Equivalent statements cited from OpenAI, Google (Gemini / Vertex AI), xAI and Moonshot documentation.

### EV-049: Red-team summary
- **Origin:** SRC-11 (slide 5 and its speaker notes)
- **Date/time:** On or before 17 Sep 2026 (run date not stated)
- **Source type:** Slide in Iman's deck, built from five red-team report screenshots
- **Source name:** "Peak D Red Teaming"
- **Speaker / author:** Iman (deck); who ran the red-team is not stated
- **Confidence:** High for the figures as shown; role not stated (ACH-072 `CONFIRM-FIRST`)
- **Verbatim:**

> "Peak D Red Teaming — Strong overall resilience, with targeted remediation needed for 3 high-severity findings"

> "OVERALL DEFENCE RATE 98.64% — 1,795 / 1,819 tests defended"

> "CRITICAL 0 · HIGH 3 · MEDIUM 8 · LOW 4" / "No critical findings. High-severity exposure is concentrated and actionable."

> "EVALUATION SCOPE 1,781 Tests · 3,837 Probes · 1m 59s Duration"

> "Defence by risk category: Security & Access Control 97% · Compliance & Legal 99% · Trust & Safety 99% · Brand 98%"

> "Highest observed attack-success rates: System prompt override 40% · Disinformation campaigns 34% · Hallucination 18% · SSRF vulnerability 12% · Tool discovery 10%"

> Speaker notes: "Presenter cue: Lead with the 99% defence rate and zero critical findings. Then acknowledge the three high findings and close with the targeted remediation and retest plan." / "Note: The screenshots show different totals in separate report views (1,781 tests in the evaluation header; 1,819 tests in the risk-category defence view; 1,469 tests in the attack-success view)."

### EV-050: Stylization pipeline I/O and evaluation decisions
- **Origin:** SRC-12 (13 slides)
- **Date/time:** 29 Jul 2026
- **Source type:** Product team deck (Iman's plan, aligned with engineering and QA per Iman, 15 Oct 2026)
- **Source name:** "CONE-9222 — AI Agents – Peak D – Stylization pipeline – Input/Outputs - Testing process"
- **Speaker / author:** NCCA product team (Iman's plan)
- **Confidence:** High
- **Verbatim:**

> "Five specialized agents. Each output becomes the next input. Failures anywhere break the whole chain." (Content Curator, Payload Assembler, Placement, Stylization, Validator)

> "Two decisions this deck resolves — Both hinge on the same principle: make the pipeline inspectable at every step." / "01 Where does the first MJML appear?" / "02 How do we measure accuracy?"

> "Option B (proposed) — MJML at Stage 3 and Stage 4 ... Same file evolves across stages."

> "Placement bug detection — Option A: Only after full pipeline runs (Stage 4) / Option B: Immediately after Stage 3 in the MJML editor" / "Isolating placement vs styling bugs — Hard — both bugs surface at Stage 4 together / Easy — placement bugs surface at 3, styling at 4" / "Feedback loop when placement is wrong — Full pipeline re-run needed / Fix Stage 3 and re-render only that stage"

> "Adopt Option B with two safeguards" / "Define a Level-1 MJML profile — Document exactly which MJML tags and attributes Stage 3 is allowed to emit — structure and content only, no styling. Removes ambiguity between agents and gives QA a lint spec." / "Enforce a content-preservation diff — Automatically compare Stage 3 and Stage 4 MJML. Only styling attributes may differ. If Stage 4 added, removed, or reworded content, reject and retry. Turns Stage 4 into surgical enrichment, not free rewrite."

> "Per-agent as primary. End-to-end as outcome." / "Content Curation — Mandatory-component recall · MLR pass rate" / "Payload Assembler — Field completeness · schema validity" / "Placement — Placement strategy correctness · visual QA render pass" / "Stylization — Brand adherence · content-preservation diff · MJML compiles" / "Validator — False-positive rate · false-negative rate" / "E2E — SME-rated final email quality (0–5) · end-to-end task success" / "Instrument all six in Langfuse as scored observations. Alert when any drop >10% week-over-week."

> "Enables model swaps per stage — Cheaper model for a stage that scores well; premium model where it doesn't."

> Next steps: "Write the Level-1 MJML profile spec" / "Design the content-preservation diff check" / "Update tickets CONE-9225 and CONE-10120 with new I/O contracts" / "Define metric + rubric per stage" / "Build test datasets for each interface" / "Set up LLM-as-judge evaluators + weekly alert thresholds"

> "Together these decisions turn the pipeline from 'black box we hope works' into a debuggable, QA-inspectable system."
