# TalentLens AI

Stages 1A–3A.1b — Foundation, Overview, Jobs, Candidates, Candidate Analysis, and Compare. A bilingual recruiting portfolio demo built with Next.js, TypeScript, and React.

## Run locally

```sh
npm install
npm run dev -- --port 3001
```

Open http://localhost:3001. Russian is the default language; use RU / EN to switch. Cmd/Ctrl+K opens navigation. Reset Demo returns to the initial Overview and clears navigation/search state while preserving the selected language.

## Checks

```sh
npm run typecheck
npm run lint
npm run build
```

The production build is a static export in `out`. For a root-path preview, run `npm run start` and open http://localhost:3001.

For GitHub Pages or another subpath host, provide the deployment path at build time:

```sh
NEXT_PUBLIC_BASE_PATH=/repository-name npm run build
```

The value may be supplied with or without surrounding slashes. Rebuild when the deployment path changes because Next.js embeds `basePath` in the client bundles.

## Scope

Overview includes six positions, 48 candidates across four pipeline stages, four featured profiles, and three illustrative AI assessments. Jobs includes search, status/department/priority filters, sorting, job details, linked demo candidates, and session-local create/edit/status changes. Job state is shared with Overview and Command Palette. Reset Demo restores all six original records and clears navigation/filters; the selected language is retained. Text fields can be edited separately in RU and EN; newly created text is shared until translated.

Stage 2A.1 adds a Candidates list with 14 selected demo profiles linked to the existing jobs. Search, job/stage/score filters, and sorting work locally. The screen explicitly distinguishes the selected profiles from the full candidate pipeline KPIs. Stage 2A.2a adds a localized candidate detail drawer with profile context, resume metadata, hiring progress, recent activity, and a short AI preview. Stage 2A.2b adds session-local create/edit/stage actions and keeps linked job counts, funnel data, scores, and featured candidates in sync. Stage 2B.1 adds a full bilingual demo assessment with requirement and skills matching, strengths, gaps, risks, a recruiter recommendation, and interview focus. The four featured profiles use tailored assessments; other profiles use their current candidate and job data. Stage 3A.1 adds a vacancy-scoped shortlist with up to three existing candidates, add/remove/replace controls, empty states, and a focused side-by-side layout. Compare reuses each profile's existing strengths, gaps, requirement match, and recruiter recommendation, with evidence-based difference labels rather than an automatic winner. Reset Demo restores the original 14 profiles and six jobs.

There are no AI API calls, uploads, authentication, or backend services. Assessments are explicitly labeled demo data, are deterministic, and do not make hiring decisions.
