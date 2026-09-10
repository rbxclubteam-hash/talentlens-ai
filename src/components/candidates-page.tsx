"use client";
import { useEffect, useRef, useState } from "react";
import { candidateMetrics, type CandidateProfile } from "@/lib/candidate-list";
import { candidatesCopy } from "@/lib/candidates-i18n";
import { analysisCopy } from "@/lib/candidate-analysis-i18n";
import { dictionaries, skillNames, type Locale } from "@/lib/i18n";
import type { Job } from "@/lib/jobs";
import CandidateAnalysis from "./candidate-analysis";

const date = (value: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));

const offsetDate = (value: string, days: number) => {
  const result = new Date(`${value}T12:00:00Z`);
  result.setUTCDate(result.getUTCDate() + days);
  return result.toISOString().slice(0, 10);
};

function CandidateDialog({
  candidate,
  job,
  locale,
  onClose,
  onPrevious,
  onNext,
  onEdit,
  onStageChange,
  onAnalysis,
}: {
  candidate: CandidateProfile;
  job?: Job;
  locale: Locale;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onEdit: () => void;
  onStageChange: (stage: number) => void;
  onAnalysis: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const t = candidatesCopy[locale];
  const common = dictionaries[locale];
  const detail = candidate.detail;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    ref.current?.showModal();
    return () => previous?.focus();
  }, []);
  const history = [
    { label: t.activity[0], value: offsetDate(detail.applicationDate, -1) },
    { label: t.activity[1], value: detail.applicationDate },
    ...(candidate.stage >= 1
      ? [{ label: t.activity[2], value: offsetDate(detail.applicationDate, 2) }]
      : []),
    ...(candidate.stage >= 2
      ? [{ label: t.activity[3], value: offsetDate(detail.applicationDate, 5) }]
      : []),
    ...(candidate.stage >= 3
      ? [{ label: t.activity[4], value: offsetDate(detail.applicationDate, 7) }]
      : []),
  ].reverse();
  const translatedSkills = candidate.skills.map((skill) =>
    locale === "ru" ? (skillNames[skill] ?? skill) : skill,
  );
  return (
    <dialog
      ref={ref}
      className="candidate-dialog"
      aria-label={candidate.name}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="candidate-dialog-content">
        <header className="candidate-dialog-toolbar">
          <div className="candidate-switcher">
            <button aria-label={t.previous} onClick={onPrevious}>
              ←
            </button>
            <button aria-label={t.next} onClick={onNext}>
              →
            </button>
          </div>
          <button
            className="icon-button"
            aria-label={t.closeDetail}
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <section className="candidate-identity">
          <span className={`avatar ${candidate.tone}`}>
            {candidate.name
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </span>
          <div>
            <span className="eyebrow">{t.currentRole}</span>
            <h2>{candidate.name}</h2>
            <p>{detail.currentRole[locale]}</p>
          </div>
          <div
            className="candidate-detail-score"
            aria-label={`${t.scoreLabel}: ${candidate.score}%`}
          >
            <svg viewBox="0 0 72 72" aria-hidden="true">
              <circle cx="36" cy="36" r="30" />
              <circle
                cx="36"
                cy="36"
                r="30"
                pathLength="100"
                strokeDasharray={`${candidate.score} 100`}
              />
            </svg>
            <strong>{candidate.score}%</strong>
            <small>{t.match}</small>
          </div>
        </section>

        <div className="candidate-target">
          <span>
            <small>{t.targetRole}</small>
            <strong>{job?.title[locale] ?? "—"}</strong>
          </span>
          <label className="candidate-stage-control">
            {t.stage}
            <select
              value={candidate.stage}
              onChange={(event) => onStageChange(Number(event.target.value))}
            >
              {common.stages.map((stage, index) => (
                <option value={index} key={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="candidate-detail-actions">
          <span className={`stage-badge badge-${candidate.stage}`}>
            <i />
            {common.stages[candidate.stage]}
          </span>
          <div className="candidate-detail-action-buttons">
            <button className="job-secondary" onClick={onEdit}>
              {t.edit}
            </button>
            <button className="primary-button" onClick={onAnalysis}>
              ✦ {analysisCopy[locale].open}
            </button>
          </div>
        </div>

        <dl className="candidate-facts">
          <div>
            <dt>{t.experience}</dt>
            <dd>
              {candidate.experience} {t.years(candidate.experience)}
            </dd>
          </div>
          <div>
            <dt>{t.location}</dt>
            <dd>{candidate.location}</dd>
          </div>
          <div>
            <dt>{t.source}</dt>
            <dd>{t.sources[candidate.source]}</dd>
          </div>
          <div>
            <dt>{t.applicationDate}</dt>
            <dd>{date(detail.applicationDate, locale)}</dd>
          </div>
          <div>
            <dt>{t.recruiter}</dt>
            <dd>{detail.recruiter}</dd>
          </div>
        </dl>

        <section className="candidate-detail-section">
          <h3>{t.professionalSummary}</h3>
          <p>{detail.summary[locale]}</p>
        </section>

        <section className="candidate-detail-section">
          <h3>{common.skills}</h3>
          <div className="candidate-detail-skills">
            {translatedSkills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        <section className="candidate-detail-section">
          <h3>{t.hiringProgress}</h3>
          <div className="candidate-progress">
            {common.stages.map((stage, index) => (
              <div
                className={`${index <= candidate.stage ? "reached" : ""} ${index === candidate.stage ? "current" : ""}`}
                key={stage}
              >
                <i />
                <span>{stage}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="candidate-detail-section candidate-resume">
          <div className="candidate-file-icon">PDF</div>
          <div>
            <h3>{t.resume}</h3>
            <strong>{detail.resume.fileName}</strong>
            <p>
              {t.resumeUpdated} {date(detail.resume.updated, locale)} ·{" "}
              {detail.resume.size} · {t.resumeFormat}
            </p>
          </div>
        </section>

        <section className="candidate-ai-preview">
          <div>
            <span>✦</span>
            <div>
              <h3>{t.aiPreview}</h3>
              <p>{t.aiPreviewNote}</p>
            </div>
          </div>
          <ul>
            <li>{t.insightSkills(translatedSkills.slice(0, 2).join(", "))}</li>
            <li>{t.insightExperience(candidate.experience)}</li>
            <li>{t.insightStage}</li>
          </ul>
        </section>

        <section className="candidate-detail-section">
          <h3>{t.recentActivity}</h3>
          <div className="candidate-timeline">
            {history.map((item) => (
              <div key={`${item.label}-${item.value}`}>
                <i />
                <span>
                  <strong>{item.label}</strong>
                  <time>{date(item.value, locale)}</time>
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </dialog>
  );
}

function CandidateForm({
  candidate,
  jobs,
  locale,
  onClose,
  onSave,
}: {
  candidate: CandidateProfile | null;
  jobs: Job[];
  locale: Locale;
  onClose: () => void;
  onSave: (candidate: CandidateProfile) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState("");
  const t = candidatesCopy[locale];
  const common = dictionaries[locale];
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    ref.current?.showModal();
    return () => previous?.focus();
  }, []);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const experience = Number(value("experience"));
    const score = Number(value("score"));
    const skills = value("skills")
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    const targetJob = value("job");
    if (
      !value("name") ||
      !targetJob ||
      !jobs.some((job) => job.id === targetJob) ||
      !value("currentRole") ||
      !value("location") ||
      !value("experience") ||
      !value("score") ||
      !skills.length
    ) {
      setError(t.requiredError);
      return;
    }
    if (
      !Number.isFinite(experience) ||
      experience < 0 ||
      experience > 40 ||
      !Number.isFinite(score) ||
      score < 0 ||
      score > 100
    ) {
      setError(t.rangeError);
      return;
    }
    const name = value("name");
    const currentRole = candidate
      ? { ...candidate.detail.currentRole, [locale]: value("currentRole") }
      : { ru: value("currentRole"), en: value("currentRole") };
    const applicationDate = candidate?.detail.applicationDate ?? "2026-09-08";
    onSave({
      ...(candidate ?? {
        id: `candidate-${crypto.randomUUID()}`,
        tone: "blue",
        detail: {
          applicationDate,
          recruiter: "Alex Lee",
          summary: {
            ru: candidatesCopy.ru.newSummary,
            en: candidatesCopy.en.newSummary,
          },
          currentRole,
          resume: {
            fileName: "",
            updated: applicationDate,
            size: "1.2 MB",
          },
        },
      }),
      name,
      jobId: targetJob,
      experience,
      location: value("location"),
      skills,
      source: value("source") as CandidateProfile["source"],
      stage: Number(value("stage")),
      score,
      detail: {
        ...(candidate?.detail ?? {
          applicationDate,
          recruiter: "Alex Lee",
          summary: {
            ru: candidatesCopy.ru.newSummary,
            en: candidatesCopy.en.newSummary,
          },
          resume: {
            fileName: "",
            updated: applicationDate,
            size: "1.2 MB",
          },
        }),
        currentRole,
        resume: {
          ...(candidate?.detail.resume ?? {
            updated: applicationDate,
            size: "1.2 MB",
          }),
          fileName: `${name.replace(/\s+/g, "_")}_Resume.pdf`,
        },
      },
    });
  }
  return (
    <dialog
      ref={ref}
      className="candidate-dialog candidate-form-dialog"
      aria-label={candidate ? t.editTitle : t.addTitle}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="candidate-dialog-content">
        <header className="candidate-form-heading">
          <div>
            <span className="eyebrow">TalentLens AI</span>
            <h2>{candidate ? t.editTitle : t.addTitle}</h2>
            <p>{t.formIntro}</p>
          </div>
          <button
            className="icon-button"
            aria-label={t.cancel}
            onClick={onClose}
          >
            ✕
          </button>
        </header>
        <form className="candidate-form" onSubmit={submit} noValidate>
          <p className="candidate-form-note">{t.languageNote}</p>
          <label>
            {t.name}
            <input
              name="name"
              required
              maxLength={80}
              defaultValue={candidate?.name}
            />
          </label>
          <label>
            {t.currentRole}
            <input
              name="currentRole"
              required
              maxLength={100}
              defaultValue={candidate?.detail.currentRole[locale]}
            />
          </label>
          <label className="full">
            {t.targetRole}
            <select name="job" defaultValue={candidate?.jobId ?? jobs[0]?.id}>
              {jobs.map((job) => (
                <option value={job.id} key={job.id}>
                  {job.title[locale]}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t.experience}
            <input
              name="experience"
              type="number"
              min="0"
              max="40"
              required
              defaultValue={candidate?.experience ?? 5}
            />
          </label>
          <label>
            {t.location}
            <input
              name="location"
              required
              maxLength={100}
              defaultValue={candidate?.location}
            />
          </label>
          <label>
            {t.source}
            <select name="source" defaultValue={candidate?.source ?? "careers"}>
              {Object.entries(t.sources).map(([value, label]) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t.stage}
            <select name="stage" defaultValue={candidate?.stage ?? 0}>
              {common.stages.map((stage, index) => (
                <option value={index} key={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </label>
          <label className="full">
            {t.keySkills}
            <input
              name="skills"
              required
              maxLength={180}
              placeholder={t.skillsHint}
              defaultValue={candidate?.skills.join(", ")}
            />
          </label>
          <label className="full">
            {t.match}
            <input
              name="score"
              type="number"
              min="0"
              max="100"
              required
              aria-describedby="candidate-score-hint"
              defaultValue={candidate?.score ?? 78}
            />
            <small id="candidate-score-hint">{t.scoreHint}</small>
          </label>
          {error && (
            <p className="candidate-form-error" role="alert">
              {error}
            </p>
          )}
          <div className="candidate-form-actions">
            <button type="button" className="job-secondary" onClick={onClose}>
              {t.cancel}
            </button>
            <button className="primary-button" type="submit">
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default function CandidatesPage({
  jobs,
  candidates,
  locale,
  onChange,
  onJobsChange,
}: {
  jobs: Job[];
  candidates: CandidateProfile[];
  locale: Locale;
  onChange: (candidates: CandidateProfile[]) => void;
  onJobsChange: (jobs: Job[]) => void;
}) {
  const t = candidatesCopy[locale],
    common = dictionaries[locale];
  const [search, setSearch] = useState(""),
    [job, setJob] = useState("all"),
    [stage, setStage] = useState("all"),
    [match, setMatch] = useState("all"),
    [sort, setSort] = useState("score"),
    [selectedId, setSelectedId] = useState<string | null>(null),
    [analysisId, setAnalysisId] = useState<string | null>(null),
    [form, setForm] = useState<"add" | "edit" | null>(null),
    [notice, setNotice] = useState("");
  const byId = new Map(jobs.map((j) => [j.id, j]));
  const metrics = candidateMetrics(candidates);
  const visible = candidates
    .filter((c) => {
      const role = byId.get(c.jobId);
      return (
        (job === "all" || job === c.jobId) &&
        (stage === "all" || c.stage === Number(stage)) &&
        (match === "all" ||
          (match === "high"
            ? c.score >= 85
            : match === "good"
              ? c.score >= 80 && c.score < 85
              : c.score < 80)) &&
        [
          c.name,
          role?.title[locale] ?? "",
          role?.title.en ?? "",
          c.location,
          ...c.skills,
          ...c.skills.map((s) => skillNames[s] ?? s),
        ]
          .join(" ")
          .toLocaleLowerCase(locale)
          .includes(search.trim().toLocaleLowerCase(locale))
      );
    })
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : sort === "experience"
          ? b.experience - a.experience || b.score - a.score
          : b.score - a.score || a.name.localeCompare(b.name),
    );
  const filtered =
    search || job !== "all" || stage !== "all" || match !== "all";
  const selected = candidates.find((candidate) => candidate.id === selectedId);
  const analysisCandidate = candidates.find(
    (candidate) => candidate.id === analysisId,
  );
  const analysisJob = analysisCandidate
    ? byId.get(analysisCandidate.jobId)
    : undefined;
  const selectedIndex = selected
    ? candidates.findIndex((candidate) => candidate.id === selected.id)
    : -1;
  function selectOffset(offset: number) {
    const index =
      (selectedIndex + offset + candidates.length) % candidates.length;
    setSelectedId(candidates[index].id);
  }
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3000);
    return () => clearTimeout(timer);
  }, [notice]);
  function saveCandidate(candidate: CandidateProfile) {
    const previous = candidates.find((item) => item.id === candidate.id);
    const exists = Boolean(previous);
    syncJobs(previous, candidate);
    onChange(
      exists
        ? candidates.map((item) =>
            item.id === candidate.id ? candidate : item,
          )
        : [...candidates, candidate],
    );
    setSelectedId(candidate.id);
    setForm(null);
    setNotice(exists ? t.updated : t.added);
  }
  function moveStage(nextStage: number) {
    if (!selected || selected.stage === nextStage) return;
    const moved = { ...selected, stage: nextStage };
    syncJobs(selected, moved);
    onChange(
      candidates.map((candidate) =>
        candidate.id === selected.id ? moved : candidate,
      ),
    );
    setNotice(t.stageUpdated);
  }
  function syncJobs(
    previous: CandidateProfile | undefined,
    next: CandidateProfile,
  ) {
    const wasFeatured = previous
      ? jobs.some((job) =>
          job.candidates.some((candidate) => candidate.name === previous.name),
        )
      : true;
    onJobsChange(
      jobs.map((job) => {
        let count = job.count;
        let totalScore = job.score * job.count;
        const funnel = [...job.funnel];
        if (previous?.jobId === job.id) {
          count -= 1;
          totalScore -= previous.score;
          funnel[previous.stage] = Math.max(0, funnel[previous.stage] - 1);
        }
        if (next.jobId === job.id) {
          count += 1;
          totalScore += next.score;
          funnel[next.stage] += 1;
        }
        const featured = job.candidates.filter(
          (candidate) => candidate.name !== previous?.name,
        );
        if (job.id === next.jobId && wasFeatured) {
          featured.push({ name: next.name, score: next.score });
        }
        return {
          ...job,
          count,
          score: count ? Math.round(totalScore / count) : 0,
          funnel,
          candidates: featured.sort((a, b) => b.score - a.score).slice(0, 3),
        };
      }),
    );
  }
  function clear() {
    setSearch("");
    setJob("all");
    setStage("all");
    setMatch("all");
  }
  if (analysisCandidate && analysisJob) {
    return (
      <CandidateAnalysis
        candidate={analysisCandidate}
        job={analysisJob}
        locale={locale}
        onBack={() => setAnalysisId(null)}
        onAllCandidates={() => {
          setAnalysisId(null);
          setSelectedId(null);
        }}
      />
    );
  }
  return (
    <div className="candidate-directory">
      <div className="page-heading">
        <div>
          <div className="eyebrow">{t.eyebrow}</div>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </div>
        <button className="primary-button" onClick={() => setForm("add")}>
          <span aria-hidden="true">＋</span>
          {t.add}
        </button>
      </div>
      <section className="kpi-grid" aria-label={t.title}>
        {[
          metrics.active,
          metrics.screened,
          metrics.interviews,
          `${metrics.score}%`,
        ].map((v, i) => (
          <article key={i} className="kpi">
            <div className="kpi-top">{t.kpis[i]}</div>
            <div className="kpi-value">
              <strong>{v}</strong>
            </div>
          </article>
        ))}
      </section>
      <p className="directory-scope">
        {t.scope(candidates.length, metrics.active)}
      </p>
      <div className="directory-toolbar">
        <input
          type="search"
          aria-label={t.search}
          placeholder={t.hint}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="directory-filters">
          <label>
            {t.job}
            <select value={job} onChange={(e) => setJob(e.target.value)}>
              <option value="all">{t.all}</option>
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title[locale]}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t.stage}
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              <option value="all">{t.all}</option>
              {common.stages.map((s, i) => (
                <option key={s} value={i}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t.match}
            <select value={match} onChange={(e) => setMatch(e.target.value)}>
              <option value="all">{t.all}</option>
              {Object.entries(t.ranges).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t.sort}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(t.sorts).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="directory-results">
        <span role="status">
          {t.results}: <strong>{visible.length}</strong>
        </span>
        {filtered && (
          <button className="text-button" onClick={clear}>
            {t.clear}
          </button>
        )}
      </div>
      <div className="directory-grid">
        {visible.map((c) => (
          <article
            className="profile-card"
            key={c.id}
            role="button"
            tabIndex={0}
            aria-label={`${t.openProfile}: ${c.name}`}
            onClick={() => setSelectedId(c.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedId(c.id);
              }
            }}
          >
            <header>
              <span className={`avatar ${c.tone}`}>
                {c.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <h2>{c.name}</h2>
                <p>{byId.get(c.jobId)?.title[locale] ?? "—"}</p>
              </div>
              <div
                className="profile-score"
                aria-label={`${t.scoreLabel}: ${c.score}%`}
              >
                <svg viewBox="0 0 60 60" aria-hidden="true">
                  <circle cx="30" cy="30" r="25" />
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    pathLength="100"
                    strokeDasharray={`${c.score} 100`}
                  />
                </svg>
                <strong>
                  {c.score}
                  <small>%</small>
                </strong>
              </div>
            </header>
            <div className="profile-stage">
              <span className={`stage-badge badge-${c.stage}`}>
                <i />
                {common.stages[c.stage]}
              </span>
              <span>
                {t.experience}:{" "}
                <strong>
                  {c.experience} {t.years(c.experience)}
                </strong>
              </span>
            </div>
            <div className="profile-skills">
              {c.skills.map((s) => (
                <span key={s}>
                  {locale === "ru" ? (skillNames[s] ?? s) : s}
                </span>
              ))}
            </div>
            <footer>
              <span>
                <small>{t.location}</small>
                {c.location}
              </span>
              <span>
                <small>{t.source}</small>
                {t.sources[c.source]}
              </span>
            </footer>
          </article>
        ))}
      </div>
      {!visible.length && (
        <div className="directory-empty">
          <h2>{t.empty}</h2>
          <p>{t.emptyCopy}</p>
          <button className="job-secondary" onClick={clear}>
            {t.clear}
          </button>
        </div>
      )}
      {selected && !form && (
        <CandidateDialog
          candidate={selected}
          job={byId.get(selected.jobId)}
          locale={locale}
          onClose={() => setSelectedId(null)}
          onPrevious={() => selectOffset(-1)}
          onNext={() => selectOffset(1)}
          onEdit={() => setForm("edit")}
          onStageChange={moveStage}
          onAnalysis={() => setAnalysisId(selected.id)}
        />
      )}
      {form && (
        <CandidateForm
          key={`${form}-${selected?.id ?? "new"}-${locale}`}
          candidate={form === "edit" ? (selected ?? null) : null}
          jobs={jobs}
          locale={locale}
          onClose={() => setForm(null)}
          onSave={saveCandidate}
        />
      )}
      {notice && (
        <p className="job-notice" role="status">
          ✓ {notice}
        </p>
      )}
    </div>
  );
}
