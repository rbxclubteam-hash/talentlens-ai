import { candidates, positions } from "./demo";
import { dictionaries, type Locale } from "./i18n";
export type Text = Record<Locale, string>;
export type JobStatus = "open" | "paused" | "closed";
export type Department = "engineering" | "design" | "product";
export type Job = {
  id: string;
  role: number;
  title: Text;
  department: Department;
  location: Text;
  employment: "fullTime" | "contract";
  status: JobStatus;
  priority: "normal" | "urgent";
  count: number;
  score: number;
  manager: string;
  created: string;
  target: string;
  salary: string;
  description: Text;
  required: string[];
  nice: string[];
  funnel: number[];
  candidates: { name: string; score: number }[];
};
const descriptions: Text[] = [
  {
    en: "Build accessible, high-performance product experiences for our customer platform. Partner with design and backend teams, shape frontend architecture, and mentor engineers.",
    ru: "Создавайте доступные и быстрые интерфейсы клиентской платформы. Работайте с дизайнерами и backend-командой, развивайте архитектуру frontend и помогайте инженерам расти.",
  },
  {
    en: "Turn complex workflows into thoughtful product experiences. Own discovery, interaction design, and our evolving design system with a cross-functional product team.",
    ru: "Превращайте сложные процессы в понятный продуктовый опыт. Отвечайте за исследования, проектирование взаимодействий и развитие дизайн-системы.",
  },
  {
    en: "Design reliable services and APIs for a growing platform. Improve data models, system observability, and performance while keeping security central to delivery.",
    ru: "Проектируйте надёжные сервисы и API. Развивайте модели данных, наблюдаемость и производительность, уделяя внимание безопасности.",
  },
  {
    en: "Connect customer insights with a focused product roadmap. Set measurable outcomes, prioritize opportunities, and guide a multidisciplinary team from discovery to launch.",
    ru: "Связывайте потребности клиентов с планом развития продукта. Определяйте результаты, расставляйте приоритеты и ведите команду от исследований до запуска.",
  },
  {
    en: "Help teams make informed decisions through clear analysis. Build trusted reporting, explore product behavior, and communicate insights that lead to practical improvements.",
    ru: "Помогайте командам принимать обоснованные решения. Создавайте надёжную отчётность, изучайте поведение пользователей и находите возможности для улучшений.",
  },
  {
    en: "Make quality a shared habit across the delivery cycle. Develop automated test coverage, investigate defects, and collaborate on reliable, accessible releases.",
    ru: "Развивайте культуру качества на всех этапах разработки. Автоматизируйте тесты, исследуйте дефекты и помогайте выпускать надёжный и доступный продукт.",
  },
];
export function createJobs(): Job[] {
  return positions.map((p, i) => ({
    id: `job-${i + 1}`,
    role: i,
    title: { ru: dictionaries.ru.roles[i], en: dictionaries.en.roles[i] },
    department: i === 1 ? "design" : i === 3 ? "product" : "engineering",
    location: { ru: "Удалённо", en: "Remote" },
    employment: "fullTime",
    status: "open",
    priority: p.status ? "urgent" : "normal",
    count: p.count,
    score: p.score,
    manager: [
      "Emily Carter",
      "Nathan Brooks",
      "Priya Shah",
      "Alex Lee",
      "Emily Carter",
      "Priya Shah",
    ][i],
    created: [
      "2026-08-18",
      "2026-08-22",
      "2026-08-25",
      "2026-08-12",
      "2026-09-01",
      "2026-08-28",
    ][i],
    target: [
      "2026-10-15",
      "2026-10-20",
      "2026-10-25",
      "2026-09-30",
      "2026-11-01",
      "2026-10-01",
    ][i],
    salary: [
      "$130,000 – $160,000",
      " $105,000 – $135,000",
      "$125,000 – $155,000",
      "$140,000 – $170,000",
      "$90,000 – $115,000",
      "$85,000 – $110,000",
    ][i].trim(),
    description: descriptions[i],
    required: [
      ["React", "TypeScript", "Accessibility"],
      ["Figma", "Design systems", "Research"],
      ["Python", "PostgreSQL", "API design"],
      ["Strategy", "Discovery", "SQL"],
      ["SQL", "Python", "Data visualization"],
      ["Playwright", "TypeScript", "Test automation"],
    ][i],
    nice: [
      ["Next.js", "GraphQL"],
      ["Prototyping", "HTML / CSS"],
      ["AWS", "Kubernetes"],
      ["B2B SaaS", "Analytics"],
      ["dbt", "BigQuery"],
      ["CI/CD", "Accessibility"],
    ][i],
    funnel: [
      [5, 4, 3, 2],
      [3, 2, 2, 2],
      [4, 4, 2, 1],
      [2, 2, 2, 1],
      [2, 1, 1, 0],
      [2, 1, 0, 0],
    ][i],
    candidates:
      i < 4
        ? [
            { name: candidates[i].name, score: candidates[i].score },
            {
              name: [
                "Alex Rivera",
                "Sophie Martin",
                "Ethan Brooks",
                "Isabella Rossi",
              ][i],
              score: [83, 80, 78, 81][i],
            },
            {
              name: [
                "Maya Patel",
                "Theo Laurent",
                "Lena Fischer",
                "Ben Taylor",
              ][i],
              score: 78,
            },
          ]
        : [
            {
              name: i === 4 ? "Grace Park" : "Noah Evans",
              score: i === 4 ? 81 : 84,
            },
            { name: i === 4 ? "Hugo Silva" : "Aria Cooper", score: 78 },
          ],
  }));
}
export function jobMetrics(jobs: Job[]) {
  const count = jobs.reduce((n, j) => n + j.count, 0);
  return {
    open: jobs.filter((j) => j.status === "open").length,
    urgent: jobs.filter((j) => j.status === "open" && j.priority === "urgent")
      .length,
    count,
    score: count
      ? Math.round(jobs.reduce((n, j) => n + j.count * j.score, 0) / count)
      : 0,
  };
}
