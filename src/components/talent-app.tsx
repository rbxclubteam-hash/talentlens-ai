"use client";

import { useEffect, useRef, useState } from "react";
import { candidates } from "@/lib/demo";
import { createCandidateProfiles } from "@/lib/candidate-list";
import { createJobs, jobMetrics } from "@/lib/jobs";
import { jobsCopy } from "@/lib/jobs-i18n";
import JobsPage from "./jobs-page";
import CandidatesPage from "./candidates-page";
import ComparePage from "./compare-page";
import { dictionaries, skillNames, type Locale } from "@/lib/i18n";

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    overview: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </>
    ),
    jobs: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="3" />
        <path d="M8 7V4h8v3M3 12c5 4 13 4 18 0M10 13h4" />
      </>
    ),
    candidates: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M18 15a5 5 0 0 1 3 6" />
      </>
    ),
    compare: (
      <>
        <rect x="3" y="4" width="6" height="16" rx="2" />
        <rect x="15" y="4" width="6" height="16" rx="2" />
        <path d="m11 9 2 3-2 3" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
        <path d="M20 2v4M18 4h4" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    reset: (
      <>
        <path d="M4 10a8 8 0 1 1 1 8M4 4v6h6" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M7 3v4M17 3v4M3 11h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 5 7 7-7 7" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.spark}
    </svg>
  );
}
function Score({ value }: { value: number }) {
  return (
    <span className="score" aria-label={`${value}%`}>
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r="18" />
        <circle
          cx="22"
          cy="22"
          r="18"
          pathLength="100"
          strokeDasharray={`${value} 100`}
        />
      </svg>
      <strong>
        {value}
        <small>%</small>
      </strong>
    </span>
  );
}
const navIcons = ["overview", "jobs", "candidates", "compare"];

export default function TalentApp() {
  const [jobs, setJobs] = useState(createJobs);
  const [candidateState, setCandidateState] = useState(createCandidateProfiles);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [locale, setLocale] = useState<Locale>("en");
  const [section, setSection] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [palette, setPalette] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [notice, setNotice] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const paletteRef = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const t = dictionaries[locale];
  const metrics = jobMetrics(jobs);
  const livePipeline = [0, 1, 2, 3].map((stage) =>
    jobs.reduce((total, job) => total + job.funnel[stage], 0),
  );
  const positions = jobs;
  const matches = [
    ...t.nav.map((label, id) => ({ label, id, jobId: null as string | null })),
    ...jobs.map((job) => ({ label: job.title[locale], id: 1, jobId: job.id })),
  ].filter((item) =>
    item.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  function go(id: number, jobId: string | null = null) {
    setSelectedJob(jobId);
    setSection(id);
    setMobile(false);
    setPalette(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function openPalette() {
    opener.current = document.activeElement as HTMLElement;
    setQuery("");
    setSelected(0);
    setPalette(true);
    setMobile(false);
  }
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        opener.current = document.activeElement as HTMLElement;
        setQuery("");
        setSelected(0);
        setPalette((v) => !v);
      }
      if (e.key === "Escape") setMobile(false);
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);
  useEffect(() => {
    if (palette) {
      paletteRef.current?.showModal();
      searchRef.current?.focus();
    } else {
      paletteRef.current?.close();
      if (!document.querySelector(".job-dialog[open]")) opener.current?.focus();
    }
  }, [palette]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(false), 4000);
    return () => clearTimeout(timer);
  }, [notice]);
  function reset() {
    setJobs(createJobs());
    setCandidateState(createCandidateProfiles());
    go(0);
    setQuery("");
    setSelected(0);
    setNotice(true);
  }
  return (
    <div className="app">
      {mobile && (
        <button
          className="nav-shade"
          aria-label={t.close}
          onClick={() => setMobile(false)}
        />
      )}
      <aside
        className={`sidebar ${mobile ? "is-open" : ""}`}
        aria-label={t.workspace}
      >
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go(0);
          }}
        >
          <span className="brand-symbol">
            <Icon name="spark" size={25} />
          </span>
          <span>
            TalentLens<span className="ai-label">AI</span>
          </span>
        </a>
        <div className="workspace-switch">
          <span className="workspace-avatar">a.</span>
          <span>
            <strong>{t.team}</strong>
            <small>{t.demo}</small>
          </span>
          <span className="workspace-dot" />
        </div>
        <p className="nav-label">{t.workspace}</p>
        <nav>
          {t.nav.map((label, i) => (
            <button
              key={i}
              className={section === i ? "active" : ""}
              aria-current={section === i ? "page" : undefined}
              onClick={() => go(i)}
            >
              <Icon name={navIcons[i]} />
              <span>{label}</span>
              {i === 1 && <small>{metrics.open}</small>}
              {i === 2 && <small>{metrics.count}</small>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="demo-note">
            <span className="tiny-spark">
              <Icon name="spark" size={17} />
            </span>
            <p>
              Interactive
              <br />
              Portfolio Demo
            </p>
            <span className="demo-dot" />
          </div>
          <div className="profile">
            <span className="avatar lilac">AL</span>
            <span>
              <strong>Alex Lee</strong>
              <small>{t.recruiter}</small>
            </span>
          </div>
        </div>
      </aside>
      <div className="surface">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="icon-button mobile-toggle"
              aria-label={t.menu}
              aria-expanded={mobile}
              onClick={() => setMobile(!mobile)}
            >
              <Icon name="menu" />
            </button>
            <span className="breadcrumb-home">{t.workspace}</span>
            <span className="slash">/</span>
            <strong>{t.nav[section]}</strong>
          </div>
          <div className="header-actions">
            <button
              className="search-trigger"
              aria-label={t.command}
              onClick={openPalette}
            >
              <Icon name="search" size={17} />
              <span>{t.search}</span>
              <kbd>⌘ K</kbd>
            </button>
            <div className="language" aria-label="Language">
              {(["ru", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  aria-pressed={locale === lang}
                  onClick={() => setLocale(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="reset" onClick={reset} title={t.reset}>
              <Icon name="reset" size={16} />
              <span>{t.reset}</span>
            </button>
          </div>
        </header>
        <main id="main-content">
          {section === 0 ? (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">
                    <span />
                    {t.snapshot}
                  </div>
                  <h1>{t.greeting}</h1>
                  <p>{t.intro}</p>
                </div>
                <div className="date">
                  <Icon name="calendar" size={17} />
                  {t.date}
                </div>
              </div>
              <section className="kpi-grid" aria-label={t.snapshot}>
                {[metrics.open, metrics.count, `${metrics.score}%`, 12].map(
                  (value, i) => (
                    <article className="kpi" key={i}>
                      <div className="kpi-top">
                        <span>{t.kpis[i]}</span>
                        <Icon
                          name={["jobs", "candidates", "spark", "calendar"][i]}
                          size={19}
                        />
                      </div>
                      <div className="kpi-value">
                        <strong>{value}</strong>
                        <span
                          className={`mini-chart chart-${i}`}
                          aria-hidden="true"
                        >
                          {[30, 48, 39, 63, 54, 76, 90].map((h, n) => (
                            <i key={n} style={{ height: `${h - i * 3}%` }} />
                          ))}
                        </span>
                      </div>
                      <p>{t.notes[i]}</p>
                    </article>
                  ),
                )}
              </section>
              <section className="panel pipeline-panel">
                <div className="panel-heading">
                  <div>
                    <h2>{t.pipeline}</h2>
                    <p>{t.pipelineCopy}</p>
                  </div>
                  <span className="count-chip">
                    {metrics.count} <span>{t.candidates}</span>
                  </span>
                </div>
                <div
                  className="pipeline"
                  role="img"
                  aria-label={`${t.pipelineLabel(metrics.count)}. ${t.stages.map((stage, i) => `${stage}: ${livePipeline[i]}`).join(", ")}`}
                >
                  {livePipeline.map((count, i) => (
                    <div className={`pipeline-stage stage-${i}`} key={i}>
                      <div className="stage-title">
                        <span className="stage-number">0{i + 1}</span>
                        <strong>{t.stages[i]}</strong>
                        {i < 3 && <Icon name="chevron" size={15} />}
                      </div>
                      <div className="stage-count">
                        {count}
                        <span>{t.candidates}</span>
                      </div>
                      <div
                        className="pipeline-bar"
                        style={{ height: `${count * 4 + 25}px` }}
                      />
                      <p>{t.stageNotes[i]}</p>
                    </div>
                  ))}
                </div>
                <div className="pipeline-insight">
                  <span className="insight-icon">
                    <Icon name="spark" size={19} />
                  </span>
                  <strong>{t.insight}</strong>
                  <p>{t.insightCopy}</p>
                </div>
              </section>
              <div className="middle-grid">
                <section className="panel candidates-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>{t.top}</h2>
                      <p>{t.topCopy}</p>
                    </div>
                    <button className="text-button" onClick={() => go(2)}>
                      {t.allCandidates}
                      <Icon name="arrow" size={16} />
                    </button>
                  </div>
                  <div className="candidate-head">
                    <span>{t.candidate}</span>
                    <span>{t.score}</span>
                    <span>{t.stage}</span>
                  </div>
                  <div className="candidate-list">
                    {candidates.map((c) => (
                      <article className="candidate-row" key={c.name}>
                        <div className="candidate-identity">
                          <span className={`avatar ${c.tone}`}>
                            {c.initials}
                          </span>
                          <div>
                            <h3>{c.name}</h3>
                            <p>
                              {jobs.find((job) => job.role === c.role)?.title[
                                locale
                              ] ?? t.roles[c.role]}
                            </p>
                            <div className="skills">
                              {c.skills.map((skill) => (
                                <span key={skill}>
                                  {locale === "ru"
                                    ? (skillNames[skill] ?? skill)
                                    : skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Score value={c.score} />
                        <span className={`stage-badge badge-${c.stage}`}>
                          <i />
                          {t.stages[c.stage]}
                        </span>
                      </article>
                    ))}
                  </div>
                </section>
                <section className="panel assessments">
                  <div className="panel-heading">
                    <div>
                      <h2>
                        <Icon name="spark" size={18} />
                        {t.assessments}
                      </h2>
                      <p>{t.assessmentsCopy}</p>
                    </div>
                  </div>
                  <div className="assessment-list">
                    {candidates.slice(0, 3).map((c, i) => (
                      <article key={c.name}>
                        <div className="assessment-meta">
                          <span className="assessment-check">
                            <Icon name="check" size={12} />
                            {t.completed}
                          </span>
                          <time>{t.ago[i]}</time>
                        </div>
                        <div className="assessment-person">
                          <span className={`avatar small ${c.tone}`}>
                            {c.initials}
                          </span>
                          <div>
                            <h3>{c.name}</h3>
                            <p>
                              {jobs.find((job) => job.role === c.role)?.title[
                                locale
                              ] ?? t.roles[c.role]}
                            </p>
                          </div>
                          <strong>
                            {c.score}
                            <small>%</small>
                          </strong>
                        </div>
                        <div className="assessment-track">
                          <span style={{ width: `${c.score}%` }} />
                        </div>
                      </article>
                    ))}
                  </div>
                  <p className="assessment-note">{t.assessmentNote}</p>
                </section>
              </div>
              <section className="positions-section">
                <div className="panel-heading">
                  <div>
                    <h2>
                      {t.positions}
                      <span className="heading-count">{metrics.open}</span>
                    </h2>
                    <p>{t.positionsCopy}</p>
                  </div>
                  <button className="text-button" onClick={() => go(1)}>
                    {t.allJobs}
                    <Icon name="arrow" size={16} />
                  </button>
                </div>
                <div className="positions-grid">
                  {positions
                    .filter((job) => job.status === "open")
                    .map((job, i) => (
                      <article
                        className="position-card overview-job-link"
                        key={job.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => go(1, job.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            go(1, job.id);
                          }
                        }}
                      >
                        <div className="position-top">
                          <span className={`job-icon job-${i % 3}`}>
                            <Icon name="jobs" />
                          </span>
                          <span
                            className={`job-status ${job.priority === "urgent" ? "priority" : ""}`}
                          >
                            <i />
                            {t.statuses[job.priority === "urgent" ? 1 : 0]}
                          </span>
                        </div>
                        <h3>{job.title[locale]}</h3>
                        <p>
                          {jobsCopy[locale].departments[job.department]}
                          <span>·</span>
                          {job.location[locale]}
                        </p>
                        <div className="position-footer">
                          <span>
                            <Icon name="candidates" size={15} />
                            <strong>{job.count}</strong> {t.candidates}
                          </span>
                          <span>
                            {t.avg}
                            <strong className="job-score">{job.score}%</strong>
                          </span>
                        </div>
                      </article>
                    ))}
                </div>
              </section>
              <footer className="footer">
                <span className="footer-brand">
                  <Icon name="spark" size={16} />
                  TalentLens AI
                </span>
                <span>{t.footer}</span>
                <span>
                  <i />
                  {t.live}
                </span>
              </footer>
            </>
          ) : section === 1 ? (
            <JobsPage
              jobs={jobs}
              locale={locale}
              selectedId={selectedJob}
              onSelect={setSelectedJob}
              onChange={setJobs}
            />
          ) : section === 2 ? (
            <CandidatesPage
              jobs={jobs}
              candidates={candidateState}
              locale={locale}
              onChange={setCandidateState}
              onJobsChange={setJobs}
            />
          ) : section === 3 ? (
            <ComparePage
              jobs={jobs}
              candidates={candidateState}
              locale={locale}
            />
          ) : (
            <section className="placeholder">
              <div className="eyebrow">{t.preview}</div>
              <div className="placeholder-icon">
                <Icon name={navIcons[section]} size={38} />
              </div>
              <span className="coming-badge">{t.planned}</span>
              <h1>{t.nav[section]}</h1>
              <h2>{t.placeholder}</h2>
              <p>{t.placeholderCopy[section]}</p>
              <button className="primary-button" onClick={() => go(0)}>
                {t.back}
                <Icon name="arrow" size={18} />
              </button>
            </section>
          )}
        </main>
      </div>
      <dialog
        ref={paletteRef}
        className="palette"
        aria-label={t.command}
        onCancel={() => setPalette(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setPalette(false);
        }}
      >
        <div className="palette-content">
          <div className="palette-search">
            <Icon name="search" />
            <input
              ref={searchRef}
              aria-label={t.command}
              placeholder={t.search}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSelected((v) => (v + 1) % Math.max(matches.length, 1));
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSelected(
                    (v) =>
                      (v - 1 + Math.max(matches.length, 1)) %
                      Math.max(matches.length, 1),
                  );
                }
                if (e.key === "Enter" && matches[selected]) {
                  e.preventDefault();
                  go(matches[selected].id, matches[selected].jobId);
                }
              }}
            />
            <button
              className="icon-button"
              aria-label={t.close}
              onClick={() => setPalette(false)}
            >
              <Icon name="close" size={18} />
            </button>
          </div>
          <p className="palette-label">{t.command}</p>
          <div className="palette-options">
            {matches.map((item, i) => (
              <button
                className={selected === i ? "selected" : ""}
                key={item.jobId ?? item.id}
                onClick={() => go(item.id, item.jobId)}
                onMouseEnter={() => setSelected(i)}
              >
                <Icon name={navIcons[item.id]} />
                {item.label}
                <Icon name="arrow" size={16} />
              </button>
            ))}
            {!matches.length && <p className="no-results">{t.noResults}</p>}
          </div>
          <div className="palette-footer">
            <span>↑ ↓ {t.navigate}</span>
            <span>↵ {t.keys}</span>
            <span>Esc {t.close}</span>
          </div>
        </div>
      </dialog>
      {notice && (
        <div className="toast" role="status">
          <Icon name="check" size={18} />
          {t.resetDone}
        </div>
      )}
    </div>
  );
}
