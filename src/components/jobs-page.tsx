"use client";
import { useEffect, useRef, useState } from "react";
import { type Job, type JobStatus, jobMetrics } from "@/lib/jobs";
import { jobsCopy } from "@/lib/jobs-i18n";
import { dictionaries, skillNames, type Locale } from "@/lib/i18n";

function Dialog({
  children,
  label,
  onClose,
  wide = false,
}: {
  children: React.ReactNode;
  label: string;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    ref.current?.showModal();
    return () => previous?.focus();
  }, []);
  return (
    <dialog
      ref={ref}
      className={`job-dialog ${wide ? "job-form-dialog" : ""}`}
      aria-label={label}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="job-dialog-content">{children}</div>
    </dialog>
  );
}
const date = (value: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
function Skills({ values, locale }: { values: string[]; locale: Locale }) {
  return (
    <div className="job-skills">
      {values.map((s, i) => (
        <span key={`${s}-${i}`}>
          {locale === "ru" ? (skillNames[s] ?? s) : s}
        </span>
      ))}
    </div>
  );
}
function JobForm({
  job,
  locale,
  onClose,
  onSave,
}: {
  job: Job | null;
  locale: Locale;
  onClose: () => void;
  onSave: (job: Job) => void;
}) {
  const t = jobsCopy[locale];
  const [error, setError] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const created = job?.created ?? "2026-09-07";
    if (
      ["title", "location", "manager", "salary", "description"].some(
        (key) => !value(key),
      ) ||
      !value("required")
        .split(",")
        .some((s) => s.trim())
    ) {
      setError(t.requiredError);
      return;
    }
    if (value("target") < created) {
      setError(t.dateError);
      return;
    }
    const local = (key: "title" | "location" | "description") =>
      job
        ? { ...job[key], [locale]: value(key) }
        : { ru: value(key), en: value(key) };
    onSave({
      ...(job ?? {
        id: crypto.randomUUID(),
        role: -1,
        count: 0,
        score: 0,
        funnel: [0, 0, 0, 0],
        candidates: [],
        created,
      }),
      title: local("title"),
      location: local("location"),
      description: local("description"),
      department: value("department") as Job["department"],
      employment: value("employment") as Job["employment"],
      status: value("status") as JobStatus,
      priority: value("priority") as Job["priority"],
      manager: value("manager"),
      salary: value("salary"),
      target: value("target"),
      required: value("required")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      nice: value("nice")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  }
  return (
    <Dialog label={job ? t.edit : t.create} onClose={onClose} wide>
      <header className="job-dialog-heading">
        <div>
          <span className="eyebrow">TalentLens AI</span>
          <h2>{job ? t.edit : t.create}</h2>
        </div>
        <button className="icon-button" aria-label={t.cancel} onClick={onClose}>
          ✕
        </button>
      </header>
      <form onSubmit={submit} className="job-form">
        <p className="job-form-note">{t.languageNote}</p>
        <label className="full">
          {t.role}
          <input
            name="title"
            required
            maxLength={100}
            defaultValue={job?.title[locale]}
          />
        </label>
        <label>
          {t.department}
          <select
            name="department"
            defaultValue={job?.department ?? "engineering"}
          >
            {Object.entries(t.departments).map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t.location}
          <input
            name="location"
            required
            maxLength={100}
            defaultValue={
              job?.location[locale] ?? (locale === "ru" ? "Удалённо" : "Remote")
            }
          />
        </label>
        <label>
          {t.employment}
          <select
            name="employment"
            defaultValue={job?.employment ?? "fullTime"}
          >
            {Object.entries(t.employmentTypes).map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t.manager}
          <input
            name="manager"
            required
            maxLength={80}
            defaultValue={job?.manager}
          />
        </label>
        <label>
          {t.status}
          <select name="status" defaultValue={job?.status ?? "open"}>
            {Object.entries(t.statuses).map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t.priority}
          <select name="priority" defaultValue={job?.priority ?? "normal"}>
            {Object.entries(t.priorities).map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t.salary}
          <input
            name="salary"
            required
            maxLength={80}
            placeholder="$100,000 – $130,000"
            defaultValue={job?.salary}
          />
        </label>
        <label>
          {t.target}
          <input
            type="date"
            name="target"
            required
            min={job?.created ?? "2026-09-07"}
            defaultValue={job?.target ?? "2026-10-15"}
          />
        </label>
        <label className="full">
          {t.description}
          <textarea
            name="description"
            required
            maxLength={2000}
            rows={4}
            defaultValue={job?.description[locale]}
          />
        </label>
        <label className="full">
          {t.required}
          <input
            name="required"
            required
            maxLength={500}
            placeholder={t.skillHint}
            defaultValue={job?.required.join(", ")}
          />
        </label>
        <label className="full">
          {t.nice}
          <input
            name="nice"
            maxLength={500}
            placeholder={t.skillHint}
            defaultValue={job?.nice.join(", ")}
          />
        </label>
        {error && (
          <p className="job-form-error" role="alert">
            {error}
          </p>
        )}
        <div className="job-form-actions">
          <button type="button" className="job-secondary" onClick={onClose}>
            {t.cancel}
          </button>
          <button className="primary-button" type="submit">
            {job ? t.save : t.create}
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export default function JobsPage({
  jobs,
  locale,
  selectedId,
  onSelect,
  onChange,
}: {
  jobs: Job[];
  locale: Locale;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onChange: (jobs: Job[]) => void;
}) {
  const t = jobsCopy[locale];
  const common = dictionaries[locale];
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [department, setDepartment] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sort, setSort] = useState("newest");
  const [form, setForm] = useState<"create" | "edit" | null>(null);
  const [notice, setNotice] = useState("");
  const metrics = jobMetrics(jobs);
  const selected = jobs.find((j) => j.id === selectedId) ?? null;
  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timeout);
  }, [notice]);
  const visible = jobs
    .filter(
      (j) =>
        (status === "all" || j.status === status) &&
        (department === "all" || j.department === department) &&
        (priority === "all" || j.priority === priority) &&
        [
          j.title[locale],
          j.title.en,
          j.manager,
          ...j.required,
          ...j.nice,
          ...j.required.map((s) => skillNames[s] ?? s),
        ]
          .join(" ")
          .toLocaleLowerCase(locale)
          .includes(search.trim().toLocaleLowerCase(locale)),
    )
    .sort((a, b) =>
      sort === "title"
        ? a.title[locale].localeCompare(b.title[locale], locale)
        : sort === "candidates"
          ? b.count - a.count
          : sort === "score"
            ? b.score - a.score
            : sort === "deadline"
              ? a.target.localeCompare(b.target)
              : b.created.localeCompare(a.created),
    );
  function clear() {
    setSearch("");
    setStatus("all");
    setDepartment("all");
    setPriority("all");
  }
  function save(job: Job) {
    onChange(
      form === "create"
        ? [job, ...jobs]
        : jobs.map((j) => (j.id === job.id ? job : j)),
    );
    setNotice(form === "create" ? t.createdNotice : t.savedNotice);
    setForm(null);
    clear();
    onSelect(job.id);
  }
  return (
    <div className="jobs-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">{t.eyebrow}</div>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </div>
        <button
          className="primary-button"
          onClick={() => {
            onSelect(null);
            setForm("create");
          }}
        >
          ＋ {t.create}
        </button>
      </div>
      <section className="kpi-grid" aria-label={t.title}>
        {[metrics.open, metrics.urgent, metrics.count, `${metrics.score}%`].map(
          (v, i) => (
            <article className="kpi" key={i}>
              <div className="kpi-top">
                {t.kpis[i]}
                <span className="job-kpi-mark">{["◫", "↗", "◎", "✧"][i]}</span>
              </div>
              <div className="kpi-value">
                <strong>{v}</strong>
              </div>
            </article>
          ),
        )}
      </section>
      <div className="jobs-toolbar">
        <input
          type="search"
          aria-label={t.search}
          placeholder={t.searchHint}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="jobs-filters">
          <label>
            {t.status}
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">{t.all}</option>
              {Object.entries(t.statuses).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t.department}
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="all">{t.all}</option>
              {Object.entries(t.departments).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t.priority}
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="all">{t.all}</option>
              {Object.entries(t.priorities).map(([v, l]) => (
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
      <div className="jobs-results">
        <span role="status">
          {t.results}: <strong>{visible.length}</strong>
        </span>
        {(search ||
          status !== "all" ||
          department !== "all" ||
          priority !== "all") && (
          <button className="text-button" onClick={clear}>
            {t.clear}
          </button>
        )}
      </div>
      <div className="jobs-grid">
        {visible.map((j) => (
          <button
            className="job-list-card"
            key={j.id}
            aria-label={`${t.openDetail}: ${j.title[locale]}`}
            onClick={() => onSelect(j.id)}
          >
            <div className="job-card-top">
              <span className={`job-status status-${j.status}`}>
                <i />
                {t.statuses[j.status]}
              </span>
              {j.priority === "urgent" && (
                <span className="job-urgent">↗ {t.priorities.urgent}</span>
              )}
            </div>
            <span className="job-department">
              {t.departments[j.department]}
            </span>
            <h2>{j.title[locale]}</h2>
            <p className="job-location">
              {j.location[locale]} · {t.employmentTypes[j.employment]}
            </p>
            <Skills values={j.required.slice(0, 3)} locale={locale} />
            <div className="job-card-numbers">
              <span>
                <strong>{j.count}</strong>
                {t.candidates}
              </span>
              <span>
                <strong className="job-match">
                  {j.count ? `${j.score}%` : "—"}
                </strong>
                {t.score}
              </span>
              <span className="job-open-arrow">↗</span>
            </div>
            <div className="job-card-bottom">
              <span className="job-manager-avatar">
                {j.manager
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span>{j.manager}</span>
              <time dateTime={j.target}>{date(j.target, locale)}</time>
            </div>
          </button>
        ))}
      </div>
      {!visible.length && (
        <div className="jobs-empty">
          <h2>{t.empty}</h2>
          <p>{t.emptyCopy}</p>
          <button className="job-secondary" onClick={clear}>
            {t.clear}
          </button>
        </div>
      )}
      {selected && !form && (
        <Dialog label={selected.title[locale]} onClose={() => onSelect(null)}>
          <header className="job-dialog-heading">
            <span className="eyebrow">
              {t.departments[selected.department]}
            </span>
            <button
              className="icon-button"
              aria-label={t.close}
              onClick={() => onSelect(null)}
            >
              ✕
            </button>
          </header>
          <h2 className="job-detail-title">{selected.title[locale]}</h2>
          <p className="job-detail-subtitle">
            {selected.location[locale]} ·{" "}
            {t.employmentTypes[selected.employment]}
          </p>
          <div className="job-detail-actions">
            <label>
              {t.status}
              <select
                value={selected.status}
                onChange={(e) => {
                  onChange(
                    jobs.map((j) =>
                      j.id === selected.id
                        ? { ...j, status: e.target.value as JobStatus }
                        : j,
                    ),
                  );
                  setNotice(t.statusNotice);
                }}
              >
                {Object.entries(t.statuses).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
            <span
              className={selected.priority === "urgent" ? "job-urgent" : ""}
            >
              {t.priority}: {t.priorities[selected.priority]}
            </span>
            <button className="job-secondary" onClick={() => setForm("edit")}>
              {t.edit}
            </button>
          </div>
          <dl className="job-facts">
            <div>
              <dt>{t.manager}</dt>
              <dd>{selected.manager}</dd>
            </div>
            <div>
              <dt>{t.salary}</dt>
              <dd>{selected.salary}</dd>
            </div>
            <div>
              <dt>{t.created}</dt>
              <dd>{date(selected.created, locale)}</dd>
            </div>
            <div>
              <dt>{t.target}</dt>
              <dd>{date(selected.target, locale)}</dd>
            </div>
          </dl>
          <section className="job-detail-section">
            <h3>{t.description}</h3>
            <p>{selected.description[locale]}</p>
          </section>
          <section className="job-detail-section">
            <h3>{t.required}</h3>
            <Skills values={selected.required} locale={locale} />
          </section>
          <section className="job-detail-section">
            <h3>{t.nice}</h3>
            <Skills values={selected.nice} locale={locale} />
          </section>
          <section className="job-detail-section">
            <div className="job-section-heading">
              <h3>{t.funnel}</h3>
              <span>
                {t.candidates}: {selected.count} · {t.score}:{" "}
                {selected.count ? `${selected.score}%` : "—"}
              </span>
            </div>
            <div className="job-funnel">
              {selected.funnel.map((count, i) => (
                <div key={i}>
                  <span>{common.stages[i]}</span>
                  <strong>{count}</strong>
                  <div>
                    <i
                      style={{
                        width: `${selected.count ? (count / selected.count) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="job-detail-section">
            <div className="job-section-heading">
              <h3>{t.top}</h3>
              <span>{t.linked}</span>
            </div>
            {selected.candidates.map((c) => (
              <article className="job-candidate" key={c.name}>
                <span className="avatar blue">
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <strong>{c.name}</strong>
                <span className="job-candidate-score">{c.score}%</span>
              </article>
            ))}
            {!selected.count && (
              <div className="job-no-candidates">
                <strong>{t.noCandidates}</strong>
                <p>{t.noCandidatesCopy}</p>
              </div>
            )}
          </section>
          <p className="job-form-note">{t.formNote}</p>
        </Dialog>
      )}
      {form && (
        <JobForm
          key={`${form}-${selected?.id ?? "new"}-${locale}`}
          job={form === "edit" ? selected : null}
          locale={locale}
          onClose={() => setForm(null)}
          onSave={save}
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
