# TalentLens AI — Demo walkthrough

A short, exact path through the strongest TalentLens workflow: the hiring overview, a full
candidate assessment, and a side-by-side comparison. About two minutes.

All data is fictional demo data for a fictional company ("Acme team"). The app loads in
**English** by default; a **RU / EN** toggle in the header switches the whole UI.

## 1. Open the hiring overview (~20s)

1. Open the live demo (or your local build).
2. You land on **Overview**: KPI cards (Open Positions, Active Candidates, Avg. Match
   Score, Interviews Scheduled) and the four-stage **Hiring Pipeline** (Applied → AI
   Screened → Interview → Final Review).
3. Note **Top Candidates** and **Recent AI Assessments** further down — both link
   directly into the candidate workflow.

> Point out: this is a live pipeline snapshot, not a static screenshot — every number
> reflects the current in-session dataset.

## 2. Open a candidate's full assessment (~40s)

1. Go to **Candidates** in the left sidebar.
2. Open **Sarah Miller** (Senior Frontend Developer track, ~87% match).
3. In the profile drawer, click **View Full Analysis**.
4. You now see the full **Demo AI Assessment**:
   - An overall verdict ("Strong match") with a confidence bar.
   - **Strengths** — concrete, evidence-based points.
   - **Gaps** — what's missing from the profile for this specific role.
   - **Risks & watch-outs** — each tagged with a severity (e.g. Medium, Low).
   - A written **Recommendation** for the next step.

> Point out: the assessment is explicitly labeled **"Demo AI Assessment"** — it's
> deterministic, pre-written content, not a live model call, and it explains *why*, not
> just a score.

## 3. Compare two candidates for the same role (~40s)

1. Go to **Compare** in the sidebar.
2. Under **Vacancy**, choose **Senior Frontend Developer**.
3. Fill **Slot 1** with **Sarah Miller** and **Slot 2** with **Alex Rivera**.
4. The two profiles render side by side with their match scores, evidence-based
   difference labels (e.g. "Strongest match" vs. "Core requirement not evidenced"), and
   hiring stage.

> Point out: Compare reuses each candidate's real assessment data — there's no separate
> "comparison AI call" — and it labels differences in plain language instead of declaring
> an automatic winner, keeping the recruiter in charge of the decision.

## 4. Try the language toggle and reset (~20s)

1. Click **RU** in the header — the entire UI (navigation, KPIs, assessment, comparison
   labels) switches to Russian.
2. Click **EN** to switch back.
3. Click **Reset Demo** at any time to restore the original dataset and return to
   Overview.

## Optional: command palette

Press `Cmd/Ctrl+K` from anywhere to open the command palette and jump straight to a
section, job, or candidate by name.
