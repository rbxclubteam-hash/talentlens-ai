import { useState } from "react";
import { getCandidateAssessment } from "@/lib/candidate-analysis";
import { analysisCopy } from "@/lib/candidate-analysis-i18n";
import type { CandidateProfile } from "@/lib/candidate-list";
import { compareCopy } from "@/lib/compare-i18n";
import { dictionaries, skillNames, type Locale } from "@/lib/i18n";
import type { Job } from "@/lib/jobs";

const MAX_CANDIDATES = 3;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default function ComparePage({
  jobs,
  candidates,
  locale,
}: {
  jobs: Job[];
  candidates: CandidateProfile[];
  locale: Locale;
}) {
  const t = compareCopy[locale];
  const common = dictionaries[locale];
  const [jobId, setJobId] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedJob = jobs.find((job) => job.id === jobId);
  const eligible = candidates.filter((candidate) => candidate.jobId === jobId);
  const selectedCandidates = selectedIds
    .map((id) => eligible.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is CandidateProfile => Boolean(candidate));
  const comparisons = selectedJob
    ? selectedCandidates.map((candidate) => ({
        candidate,
        assessment: getCandidateAssessment(candidate, selectedJob, locale),
      }))
    : [];
  const highestScore = Math.max(
    ...selectedCandidates.map((candidate) => candidate.score),
  );
  const highestExperience = Math.max(
    ...selectedCandidates.map((candidate) => candidate.experience),
  );
  const hasUniqueHighestScore =
    selectedCandidates.length > 1 &&
    selectedCandidates.filter((candidate) => candidate.score === highestScore)
      .length === 1;
  const hasUniqueHighestExperience =
    selectedCandidates.length > 1 &&
    selectedCandidates.filter(
      (candidate) => candidate.experience === highestExperience,
    ).length === 1;

  function chooseJob(nextJobId: string) {
    setJobId(nextJobId);
    setSelectedIds([]);
  }

  function addCandidate(candidateId: string) {
    setSelectedIds((current) =>
      !candidateId ||
      current.includes(candidateId) ||
      current.length >= MAX_CANDIDATES
        ? current
        : [...current, candidateId],
    );
  }

  function replaceCandidate(currentId: string, nextId: string) {
    setSelectedIds((current) =>
      !nextId || current.some((id) => id === nextId && id !== currentId)
        ? current
        : current.map((id) => (id === currentId ? nextId : id)),
    );
  }

  function removeCandidate(candidateId: string) {
    setSelectedIds((current) => current.filter((id) => id !== candidateId));
  }

  return (
    <div className="compare-page">
      <div className="page-heading compare-heading">
        <div>
          <div className="eyebrow">{t.eyebrow}</div>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </div>
        <span className="compare-limit">{t.selected(selectedIds.length)}</span>
      </div>

      <section className="compare-builder" aria-label={t.title}>
        <div className="compare-job-step">
          <span className="compare-step-number">01</span>
          <label>
            <span>{t.vacancy}</span>
            <select
              value={jobId}
              onChange={(event) => chooseJob(event.target.value)}
            >
              <option value="">{t.vacancyHint}</option>
              {jobs.map((job) => (
                <option value={job.id} key={job.id}>
                  {job.title[locale]}
                </option>
              ))}
            </select>
          </label>
          {selectedJob && (
            <span className="compare-job-meta">
              {t.candidateCount(eligible.length)}
            </span>
          )}
        </div>

        <div className="compare-candidate-step">
          <div className="compare-step-label">
            <span className="compare-step-number">02</span>
            <strong>{t.candidates}</strong>
          </div>
          <div className="compare-slots">
            {Array.from({ length: MAX_CANDIDATES }, (_, index) => {
              const candidate = selectedCandidates[index];
              const available = eligible.filter(
                (item) =>
                  item.id === candidate?.id || !selectedIds.includes(item.id),
              );
              return candidate ? (
                <article className="compare-slot is-filled" key={candidate.id}>
                  <div className="compare-slot-person">
                    <span className={`avatar ${candidate.tone}`}>
                      {initials(candidate.name)}
                    </span>
                    <span>
                      <small>{t.slot(index + 1)}</small>
                      <strong>{candidate.name}</strong>
                    </span>
                  </div>
                  <label>
                    <span>{t.replace}</span>
                    <select
                      aria-label={`${t.replace}: ${candidate.name}`}
                      value={candidate.id}
                      onChange={(event) =>
                        replaceCandidate(candidate.id, event.target.value)
                      }
                    >
                      {available.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    className="compare-remove"
                    aria-label={`${t.remove}: ${candidate.name}`}
                    title={t.remove}
                    onClick={() => removeCandidate(candidate.id)}
                  >
                    ×
                  </button>
                </article>
              ) : (
                <label className="compare-slot is-empty" key={index}>
                  <span className="compare-slot-plus" aria-hidden="true">
                    +
                  </span>
                  <span>
                    <small>{t.slot(index + 1)}</small>
                    <strong>{t.add}</strong>
                  </span>
                  <select
                    aria-label={`${t.add}: ${t.slot(index + 1)}`}
                    value=""
                    disabled={!selectedJob || available.length === 0}
                    onChange={(event) => addCandidate(event.target.value)}
                  >
                    <option value="">{t.addHint}</option>
                    {available.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name} · {item.score}%
                      </option>
                    ))}
                  </select>
                </label>
              );
            })}
          </div>
        </div>
      </section>

      {!selectedJob ? (
        <CompareEmpty
          icon="01"
          title={t.chooseJobTitle}
          copy={t.chooseJobCopy}
        />
      ) : eligible.length === 0 ? (
        <CompareEmpty
          icon="0"
          title={t.noCandidatesTitle}
          copy={t.noCandidatesCopy}
        />
      ) : selectedCandidates.length === 0 ? (
        <CompareEmpty icon="＋" title={t.emptyTitle} copy={t.emptyCopy} />
      ) : (
        <section className="compare-results">
          <header>
            <div>
              <span>{t.comparing}</span>
              <h2>{t.comparingCopy(selectedJob.title[locale])}</h2>
            </div>
            <span className="compare-result-count">
              {selectedCandidates.length}/{MAX_CANDIDATES}
            </span>
          </header>
          <div
            className={`compare-profile-grid compare-count-${selectedCandidates.length}`}
          >
            {comparisons.map(({ candidate, assessment }) => {
              const missingRequired = assessment.requirements.filter(
                (requirement) =>
                  requirement.required && requirement.status === "missing",
              ).length;
              const missingPreferred = assessment.requirements.filter(
                (requirement) =>
                  !requirement.required && requirement.status === "missing",
              ).length;
              const signals = [
                hasUniqueHighestScore && candidate.score === highestScore
                  ? { label: t.strongestMatch, tone: "positive" }
                  : null,
                hasUniqueHighestExperience &&
                candidate.experience === highestExperience
                  ? { label: t.experienceAdvantage, tone: "positive" }
                  : null,
                missingRequired
                  ? { label: t.requirementGap, tone: "attention" }
                  : missingPreferred
                    ? { label: t.skillGap, tone: "neutral" }
                    : null,
              ].filter((signal): signal is { label: string; tone: string } =>
                Boolean(signal),
              );
              const statusCounts = assessment.requirements.reduce(
                (counts, requirement) => ({
                  ...counts,
                  [requirement.status]: counts[requirement.status] + 1,
                }),
                { strong: 0, partial: 0, missing: 0 },
              );
              return (
                <article className="compare-profile" key={candidate.id}>
                  <div className="compare-profile-header">
                    <span className={`avatar ${candidate.tone}`}>
                      {initials(candidate.name)}
                    </span>
                    <div>
                      <h2>{candidate.name}</h2>
                      <p>{candidate.detail.currentRole[locale]}</p>
                    </div>
                    <div
                      className="compare-score"
                      aria-label={`${t.match}: ${candidate.score}%`}
                    >
                      <svg viewBox="0 0 72 72" aria-hidden="true">
                        <circle cx="36" cy="36" r="29" />
                        <circle
                          cx="36"
                          cy="36"
                          r="29"
                          pathLength="100"
                          strokeDasharray={`${candidate.score} 100`}
                        />
                      </svg>
                      <strong>{candidate.score}%</strong>
                    </div>
                  </div>

                  <div className="compare-match-label">{t.match}</div>
                  <div className="compare-signals" aria-label={t.comparing}>
                    {signals.map((signal) => (
                      <span className={signal.tone} key={signal.label}>
                        {signal.label}
                      </span>
                    ))}
                  </div>
                  <dl className="compare-facts">
                    <div>
                      <dt>{t.stage}</dt>
                      <dd>
                        <span
                          className={`stage-badge badge-${candidate.stage}`}
                        >
                          <i />
                          {common.stages[candidate.stage]}
                        </span>
                      </dd>
                    </div>
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
                  </dl>

                  <section className="compare-skills">
                    <h3>{t.skills}</h3>
                    <div>
                      {candidate.skills.map((skill) => (
                        <span key={skill}>
                          {locale === "ru"
                            ? (skillNames[skill] ?? skill)
                            : skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className="compare-assessment-block compare-strengths">
                    <div className="compare-block-heading">
                      <span aria-hidden="true">✓</span>
                      <h3>{analysisCopy[locale].strengths}</h3>
                    </div>
                    <ul>
                      {assessment.strengths.slice(0, 3).map((strength) => (
                        <li key={strength}>{strength}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="compare-assessment-block compare-gaps">
                    <div className="compare-block-heading">
                      <span aria-hidden="true">↗</span>
                      <h3>{analysisCopy[locale].gaps}</h3>
                    </div>
                    <ul>
                      {assessment.gaps.map((gap) => (
                        <li key={gap}>{gap}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="compare-requirements">
                    <div className="compare-requirement-heading">
                      <h3>{analysisCopy[locale].requirements}</h3>
                      <div aria-label={analysisCopy[locale].requirements}>
                        {(["strong", "partial", "missing"] as const).map(
                          (status) => (
                            <span
                              className={status}
                              key={status}
                              title={analysisCopy[locale].statuses[status]}
                              aria-label={`${analysisCopy[locale].statuses[status]}: ${statusCounts[status]}`}
                            >
                              {status === "strong"
                                ? "✓"
                                : status === "partial"
                                  ? "◐"
                                  : "–"}{" "}
                              {statusCounts[status]}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="compare-requirement-list">
                      {assessment.requirements.map((requirement) => (
                        <article key={requirement.skill}>
                          <span
                            className={`requirement-mark ${requirement.status}`}
                          >
                            {requirement.status === "strong"
                              ? "✓"
                              : requirement.status === "partial"
                                ? "◐"
                                : "–"}
                          </span>
                          <div>
                            <strong>{requirement.skill}</strong>
                            <p>{requirement.evidence}</p>
                          </div>
                          <span
                            className={`compare-requirement-status ${requirement.status}`}
                          >
                            {analysisCopy[locale].statuses[requirement.status]}
                          </span>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="compare-recommendation">
                    <span aria-hidden="true">→</span>
                    <div>
                      <p>{analysisCopy[locale].recommendation}</p>
                      <h3>{assessment.recommendation}</h3>
                      <p>{assessment.recommendationCopy}</p>
                    </div>
                  </section>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function CompareEmpty({
  icon,
  title,
  copy,
}: {
  icon: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="compare-empty">
      <span aria-hidden="true">{icon}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </section>
  );
}
