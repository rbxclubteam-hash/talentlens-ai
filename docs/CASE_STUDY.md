# TalentLens AI — Case study

A portfolio demonstration of an AI-assisted candidate analysis workspace for recruiters,
built with Next.js, TypeScript, and React, exported as a static site.

All companies, roles, and candidates are fictional. There is no live AI, no backend, and
no real hiring activity behind this demo — this document describes what was built and why.

## Problem

Recruiters working a real pipeline hit two recurring frictions:

- **Comparing candidates is slow.** Resumes and ATS exports don't line up against one
  role in a consistent, scannable way.
- **A bare match score doesn't help a decision.** A number alone doesn't tell a recruiter
  *why* a candidate fits, what's missing, or what to ask about next — and it doesn't help
  them defend the call to a hiring manager.

## Product goal

Give a recruiter a single workspace that:

1. Shows the hiring pipeline at a glance — open roles, active candidates, funnel stages.
2. Lets them search and filter a real pool of candidates linked to specific roles.
3. Turns "AI analysis" into something a recruiter can actually use: a match verdict,
   concrete strengths and gaps, risk flags with severity, and a plain-language
   recommendation — not just a percentage.
4. Lets them shortlist and compare a handful of candidates for one role side by side.

Deliberately **not** in this demo: authentication, real candidate data ingestion, resume
upload/parsing, a live model call, outbound communication (email/interview scheduling),
multi-team permissions, and billing. Those are real-product concerns; the demo focuses on
the analysis and comparison experience a client would actually evaluate.

## Implemented workflow

`Overview → Candidates → Candidate assessment → Compare`

- **Overview**: KPI cards (open positions, active candidates, average match score,
  upcoming interviews) and a four-stage pipeline (Applied → AI Screened → Interview →
  Final Review), plus shortcuts into top candidates and recent assessments.
- **Jobs**: search, status/department/priority filters, sorting, and session-local
  create/edit/status actions that stay in sync with Overview and the command palette.
- **Candidates**: a searchable, filterable, sortable directory of profiles linked to open
  roles, with session-local create/edit/stage actions.
- **Candidate assessment**: a detail view with profile context, resume metadata, hiring
  progress, recent activity, and the full **Demo AI Assessment**.
- **Compare**: a vacancy-scoped shortlist of up to three candidates in a focused
  side-by-side layout.

`Cmd/Ctrl+K` opens a command palette for fast navigation. **Reset Demo** restores the
original dataset at any point without reloading the page.

## UX / analysis flow

The assessment view is the centerpiece: an overall match verdict (e.g. "Strong match")
with a confidence bar, then three focused panels — **Strengths**, **Gaps**, and **Risks &
watch-outs** (each risk carries a severity tag) — followed by a written **Recommendation**.
Every assessment is headed **"Demo AI Assessment"** so it reads as illustrative content,
never as a live model output. The four featured candidate profiles carry fully
hand-written, tailored assessments; the remaining profiles reuse their existing candidate
and job data so the directory stays populated and consistent.

Compare reuses each selected profile's existing strengths, gaps, match score, and
recommendation, and labels differences between candidates in plain language (e.g.
"Strongest match", "Core requirement not evidenced") rather than declaring an automatic
winner — keeping the recruiter, not the tool, in charge of the decision.

## Technical approach

- **Next.js static export** (`output: "export"`): the entire app is client-side HTML/CSS/
  JS with no server runtime, deployable to any static host (here, GitHub Pages).
  `NEXT_PUBLIC_BASE_PATH` configures the deployment subpath at build time.
- **In-memory demo dataset**: jobs and candidates are seeded in code and held in React
  state; create/edit/status actions mutate that session-local state, so the app feels
  live without a backend.
- **Bilingual by design**: a small dictionary-based i18n layer (`src/lib/*-i18n.ts`)
  covers navigation, section copy, and structured content in both English and Russian;
  the active locale is plain React state with an explicit toggle.
- **No external calls**: no AI API, no analytics, no network requests beyond loading the
  static assets themselves.

## What this demonstrates to a potential client

- **Product thinking beyond a UI shell**: an analysis experience designed around how a
  recruiter actually evaluates a candidate (verdict → evidence → risk → recommendation),
  not just a scorecard.
- **A real, working comparison workflow** — vacancy-scoped, capped, and evidence-labeled,
  not a generic diff.
- **Honest demo framing**: AI-style content is clearly and consistently labeled as demo
  data, which is exactly the discipline a client-facing AI feature needs before it's real.
- **Bilingual, responsive front-end engineering** with Next.js, TypeScript, and a static
  export pipeline suitable for lightweight hosting.
- **Scoped judgment**: a focused, complete slice (overview → candidates → assessment →
  compare) rather than a sprawling, half-built feature set.
