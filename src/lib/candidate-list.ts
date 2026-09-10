import { candidates } from "./demo";
import type { Text } from "./jobs";

export type CandidateDetail = {
  currentRole: Text;
  applicationDate: string;
  recruiter: string;
  summary: Text;
  resume: {
    fileName: string;
    updated: string;
    size: string;
  };
};

export type CandidateProfile = {
  id: string;
  name: string;
  jobId: string;
  score: number;
  stage: number;
  experience: number;
  location: string;
  skills: string[];
  source: "referral" | "linkedin" | "careers" | "community";
  tone: string;
  detail: CandidateDetail;
};

const candidateCores: Omit<CandidateProfile, "detail">[] = [
  ...candidates.map((c, i) => ({
    id: `candidate-${i + 1}`,
    name: c.name,
    jobId: `job-${c.role + 1}`,
    score: c.score,
    stage: c.stage,
    skills: c.skills,
    tone: c.tone,
    experience: [8, 6, 5, 9][i],
    location: ["London, UK", "Berlin, DE", "Toronto, CA", "Amsterdam, NL"][i],
    source: "referral" as const,
  })),
  {
    id: "candidate-5",
    name: "Alex Rivera",
    jobId: "job-1",
    score: 83,
    stage: 1,
    experience: 6,
    location: "Madrid, ES",
    skills: ["React", "TypeScript", "GraphQL"],
    source: "linkedin",
    tone: "mint",
  },
  {
    id: "candidate-6",
    name: "Maya Patel",
    jobId: "job-1",
    score: 78,
    stage: 0,
    experience: 4,
    location: "London, UK",
    skills: ["React", "Accessibility", "CSS"],
    source: "careers",
    tone: "peach",
  },
  {
    id: "candidate-7",
    name: "Sophie Martin",
    jobId: "job-2",
    score: 80,
    stage: 2,
    experience: 7,
    location: "Paris, FR",
    skills: ["Figma", "Prototyping", "Research"],
    source: "community",
    tone: "lilac",
  },
  {
    id: "candidate-8",
    name: "Theo Laurent",
    jobId: "job-2",
    score: 78,
    stage: 0,
    experience: 4,
    location: "Lyon, FR",
    skills: ["Figma", "Design systems", "Accessibility"],
    source: "careers",
    tone: "blue",
  },
  {
    id: "candidate-9",
    name: "Ethan Brooks",
    jobId: "job-3",
    score: 78,
    stage: 1,
    experience: 5,
    location: "Austin, US",
    skills: ["Python", "AWS", "API design"],
    source: "linkedin",
    tone: "peach",
  },
  {
    id: "candidate-10",
    name: "Lena Fischer",
    jobId: "job-3",
    score: 78,
    stage: 2,
    experience: 6,
    location: "Munich, DE",
    skills: ["PostgreSQL", "Python", "Kubernetes"],
    source: "community",
    tone: "mint",
  },
  {
    id: "candidate-11",
    name: "Isabella Rossi",
    jobId: "job-4",
    score: 81,
    stage: 3,
    experience: 8,
    location: "Milan, IT",
    skills: ["Strategy", "SQL", "B2B SaaS"],
    source: "referral",
    tone: "lilac",
  },
  {
    id: "candidate-12",
    name: "Ben Taylor",
    jobId: "job-4",
    score: 78,
    stage: 0,
    experience: 5,
    location: "Bristol, UK",
    skills: ["Discovery", "Analytics", "Strategy"],
    source: "linkedin",
    tone: "blue",
  },
  {
    id: "candidate-13",
    name: "Grace Park",
    jobId: "job-5",
    score: 81,
    stage: 2,
    experience: 5,
    location: "Vancouver, CA",
    skills: ["SQL", "Python", "Data visualization"],
    source: "careers",
    tone: "mint",
  },
  {
    id: "candidate-14",
    name: "Noah Evans",
    jobId: "job-6",
    score: 84,
    stage: 1,
    experience: 6,
    location: "Dublin, IE",
    skills: ["Playwright", "TypeScript", "Test automation"],
    source: "linkedin",
    tone: "peach",
  },
];

const currentRoles: Text[] = [
  { ru: "Frontend Tech Lead", en: "Frontend Tech Lead" },
  { ru: "Senior Product Designer", en: "Senior Product Designer" },
  { ru: "Backend-разработчик", en: "Backend Developer" },
  { ru: "Senior Product Manager", en: "Senior Product Manager" },
  { ru: "Frontend-инженер", en: "Frontend Engineer" },
  { ru: "Frontend-разработчик", en: "Frontend Developer" },
  { ru: "Product Designer", en: "Product Designer" },
  { ru: "UX/UI Designer", en: "UX/UI Designer" },
  { ru: "Software Engineer", en: "Software Engineer" },
  { ru: "Backend-инженер", en: "Backend Engineer" },
  { ru: "Product Lead", en: "Product Lead" },
  { ru: "Product Manager", en: "Product Manager" },
  { ru: "Data Analyst", en: "Data Analyst" },
  { ru: "QA Automation Engineer", en: "QA Automation Engineer" },
];

const summaries: Text[] = [
  {
    ru: "Ведёт разработку сложных веб-продуктов, развивает frontend-архитектуру и помогает командам выпускать доступные интерфейсы.",
    en: "Leads complex web product delivery, shapes frontend architecture, and helps teams ship accessible experiences.",
  },
  {
    ru: "Проектирует B2B-продукты от исследования до готового интерфейса и системно развивает дизайн-системы.",
    en: "Designs B2B products from discovery to polished UI and takes a systematic approach to design systems.",
  },
  {
    ru: "Создаёт надёжные сервисы на Python, работает с данными и развивает облачную инфраструктуру продуктовых команд.",
    en: "Builds reliable Python services, works closely with data, and improves cloud infrastructure for product teams.",
  },
  {
    ru: "Управляет B2B SaaS-продуктами, соединяя исследования клиентов, стратегию и измеримые продуктовые результаты.",
    en: "Leads B2B SaaS products by connecting customer discovery, strategy, and measurable product outcomes.",
  },
  {
    ru: "Разрабатывает современные React-интерфейсы и уверенно работает с типизированными API и сложным состоянием приложения.",
    en: "Builds modern React interfaces and works confidently with typed APIs and complex application state.",
  },
  {
    ru: "Frontend-разработчик с сильным вниманием к доступности, качеству CSS и согласованности пользовательского опыта.",
    en: "Frontend developer with a strong focus on accessibility, thoughtful CSS, and consistent user experience.",
  },
  {
    ru: "Превращает результаты исследований в понятные продуктовые сценарии и выразительные интерактивные прототипы.",
    en: "Turns research findings into clear product journeys and expressive interactive prototypes.",
  },
  {
    ru: "Создаёт доступные интерфейсы и масштабируемые компоненты для продуктовых команд с высокой скоростью выпуска.",
    en: "Creates accessible interfaces and scalable components for fast-moving product teams.",
  },
  {
    ru: "Разрабатывает backend-сервисы и API, уделяя особое внимание надёжности, наблюдаемости и работе в AWS.",
    en: "Develops backend services and APIs with a strong focus on reliability, observability, and AWS.",
  },
  {
    ru: "Проектирует системы обработки данных на Python и PostgreSQL и поддерживает их работу в Kubernetes.",
    en: "Designs data services with Python and PostgreSQL and supports their operation in Kubernetes.",
  },
  {
    ru: "Ведёт продуктовые команды от исследования рынка до запуска и умеет выстраивать стратегию для B2B SaaS.",
    en: "Guides product teams from market discovery to launch and shapes strategy for B2B SaaS products.",
  },
  {
    ru: "Работает на стыке исследований, аналитики и стратегии, превращая сигналы клиентов в ясные приоритеты.",
    en: "Works across discovery, analytics, and strategy to turn customer signals into clear priorities.",
  },
  {
    ru: "Помогает продуктовым командам принимать решения с помощью SQL, Python и понятной визуализации данных.",
    en: "Helps product teams make informed decisions through SQL, Python, and clear data visualization.",
  },
  {
    ru: "Развивает автоматизированное тестирование веб-продуктов и выстраивает надёжные процессы контроля качества.",
    en: "Builds web test automation and establishes reliable quality practices across the delivery process.",
  },
];

const applicationDates = [
  "2026-08-22",
  "2026-08-24",
  "2026-08-27",
  "2026-08-19",
  "2026-08-29",
  "2026-09-02",
  "2026-08-28",
  "2026-09-03",
  "2026-08-31",
  "2026-08-30",
  "2026-08-21",
  "2026-09-01",
  "2026-09-04",
  "2026-09-02",
];

const recruiters = ["Alex Lee", "Emily Carter", "Priya Shah"];

export const candidateProfiles: CandidateProfile[] = candidateCores.map(
  (candidate, index) => ({
    ...candidate,
    detail: {
      currentRole: currentRoles[index],
      applicationDate: applicationDates[index],
      recruiter: recruiters[index % recruiters.length],
      summary: summaries[index],
      resume: {
        fileName: `${candidate.name.replace(" ", "_")}_Resume.pdf`,
        updated: applicationDates[index],
        size: `${(1.1 + (index % 5) * 0.2).toFixed(1)} MB`,
      },
    },
  }),
);

export function createCandidateProfiles() {
  return candidateProfiles.map((candidate) => ({
    ...candidate,
    skills: [...candidate.skills],
    detail: {
      ...candidate.detail,
      currentRole: { ...candidate.detail.currentRole },
      summary: { ...candidate.detail.summary },
      resume: { ...candidate.detail.resume },
    },
  }));
}

const baselineScreened = candidateProfiles.filter(
  (candidate) => candidate.stage >= 1,
).length;
const baselineInterviews = candidateProfiles.filter(
  (candidate) => candidate.stage >= 2,
).length;
const baselineScore = candidateProfiles.reduce(
  (sum, candidate) => sum + candidate.score,
  0,
);
const baselinePipelineScore = 3760;

export function candidateMetrics(values: CandidateProfile[]) {
  const active = 48 + values.length - candidateProfiles.length;
  const scoreDelta =
    values.reduce((sum, candidate) => sum + candidate.score, 0) - baselineScore;
  return {
    active,
    screened:
      30 +
      values.filter((candidate) => candidate.stage >= 1).length -
      baselineScreened,
    interviews:
      12 +
      values.filter((candidate) => candidate.stage >= 2).length -
      baselineInterviews,
    score: active
      ? Math.round((baselinePipelineScore + scoreDelta) / active)
      : 0,
  };
}
