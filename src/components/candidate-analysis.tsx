import { getCandidateAssessment } from "@/lib/candidate-analysis";
import { analysisCopy } from "@/lib/candidate-analysis-i18n";
import type { CandidateProfile } from "@/lib/candidate-list";
import { dictionaries, type Locale } from "@/lib/i18n";
import type { Job } from "@/lib/jobs";

export default function CandidateAnalysis({
  candidate,
  job,
  locale,
  onBack,
  onAllCandidates,
}: {
  candidate: CandidateProfile;
  job: Job;
  locale: Locale;
  onBack: () => void;
  onAllCandidates: () => void;
}) {
  const t = analysisCopy[locale];
  const common = dictionaries[locale];
  const assessment = getCandidateAssessment(candidate, job, locale);
  const initials = candidate.name
    .split(" ")
    .map((name) => name[0])
    .join("");
  return (
    <article className="analysis-page">
      <nav className="analysis-navigation" aria-label={t.allCandidates}>
        <button onClick={onBack}>← {t.back}</button>
        <button onClick={onAllCandidates}>{t.allCandidates}</button>
      </nav>

      <header className="analysis-header">
        <div className="analysis-person">
          <span className={`avatar ${candidate.tone}`}>{initials}</span>
          <div>
            <span className="analysis-demo-label">✦ {t.demo}</span>
            <h1>{candidate.name}</h1>
            <p>{candidate.detail.currentRole[locale]}</p>
            <div className="analysis-header-meta">
              <span>
                {t.target}: <strong>{job.title[locale]}</strong>
              </span>
              <span className={`stage-badge badge-${candidate.stage}`}>
                <i />
                {common.stages[candidate.stage]}
              </span>
            </div>
          </div>
        </div>
        <div
          className="analysis-score"
          aria-label={`${t.score}: ${candidate.score}%`}
        >
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="49" />
            <circle
              cx="60"
              cy="60"
              r="49"
              pathLength="100"
              strokeDasharray={`${candidate.score} 100`}
            />
          </svg>
          <span>
            <strong>{candidate.score}%</strong>
            <small>{t.score}</small>
          </span>
        </div>
      </header>

      <section className="analysis-overall">
        <span className="analysis-section-index">01</span>
        <div>
          <p>{t.overall}</p>
          <h2>{assessment.verdict}</h2>
          <div className="analysis-confidence">
            <i style={{ width: `${candidate.score}%` }} />
          </div>
        </div>
        <p>{assessment.summary}</p>
      </section>

      <div className="analysis-columns">
        <div className="analysis-main-column">
          <div className="analysis-signal-grid">
            <section className="analysis-card signal-card strength-card">
              <div className="analysis-card-heading">
                <span className="signal-icon">✓</span>
                <h2>{t.strengths}</h2>
                <small>
                  {String(assessment.strengths.length).padStart(2, "0")}
                </small>
              </div>
              <ul>
                {assessment.strengths.map((strength) => (
                  <li key={strength}>{strength}</li>
                ))}
              </ul>
            </section>
            <section className="analysis-card signal-card gap-card">
              <div className="analysis-card-heading">
                <span className="signal-icon">↗</span>
                <h2>{t.gaps}</h2>
                <small>{String(assessment.gaps.length).padStart(2, "0")}</small>
              </div>
              <ul>
                {assessment.gaps.map((gap) => (
                  <li key={gap}>{gap}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="analysis-card requirement-card">
            <div className="analysis-card-heading">
              <span className="analysis-section-index">02</span>
              <div>
                <p>{job.title[locale]}</p>
                <h2>{t.requirements}</h2>
              </div>
            </div>
            <div className="requirement-list">
              {assessment.requirements.map((requirement) => (
                <article key={requirement.skill}>
                  <span className={`requirement-mark ${requirement.status}`}>
                    {requirement.status === "strong"
                      ? "✓"
                      : requirement.status === "partial"
                        ? "◐"
                        : "–"}
                  </span>
                  <div>
                    <div className="requirement-name">
                      <strong>{requirement.skill}</strong>
                      <small>
                        {requirement.required ? t.required : t.preferred}
                      </small>
                    </div>
                    <p>{requirement.evidence}</p>
                  </div>
                  <span className={`requirement-status ${requirement.status}`}>
                    {t.statuses[requirement.status]}
                  </span>
                </article>
              ))}
            </div>
          </section>

          <section className="analysis-card skills-match-card">
            <div className="analysis-card-heading">
              <span className="analysis-section-index">03</span>
              <h2>{t.skills}</h2>
            </div>
            {(
              [
                ["matched", assessment.skills.matched],
                ["partial", assessment.skills.partial],
                ["missing", assessment.skills.missing],
              ] as const
            ).map(([status, skills]) => (
              <div className="analysis-skill-row" key={status}>
                <strong>{t[status]}</strong>
                <div>
                  {skills.length ? (
                    skills.map((skill) => (
                      <span className={`skill-${status}`} key={skill}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="skill-empty">—</span>
                  )}
                </div>
              </div>
            ))}
          </section>
        </div>

        <aside className="analysis-side-column">
          <section className="analysis-card risk-card">
            <div className="analysis-card-heading">
              <span className="signal-icon">!</span>
              <h2>{t.risks}</h2>
            </div>
            <div className="risk-list">
              {assessment.risks.map((risk) => (
                <article key={risk.text}>
                  <span className={`risk-level ${risk.level}`}>
                    {t.levels[risk.level]}
                  </span>
                  <p>{risk.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="analysis-card recommendation-card">
            <span className="recommendation-mark">→</span>
            <p>{t.recommendation}</p>
            <h2>{assessment.recommendation}</h2>
            <div />
            <p>{assessment.recommendationCopy}</p>
          </section>

          <section className="analysis-card interview-card">
            <div className="analysis-card-heading">
              <span className="analysis-section-index">04</span>
              <h2>{t.interview}</h2>
            </div>
            <ol>
              {assessment.focus.map((question, index) => (
                <li key={question}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{question}</p>
                </li>
              ))}
            </ol>
          </section>

          <p className="analysis-disclosure">✦ {t.disclosure}</p>
        </aside>
      </div>
    </article>
  );
}
