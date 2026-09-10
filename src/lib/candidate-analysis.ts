import type { CandidateProfile } from "./candidate-list";
import { skillNames, type Locale } from "./i18n";
import type { Job, Text } from "./jobs";

export type MatchStatus = "strong" | "partial" | "missing";
export type RiskLevel = "low" | "medium" | "high";

type AssessmentCopy = {
  verdict: Text;
  summary: Text;
  strengths: Text[];
  gaps: Text[];
  risks: { level: RiskLevel; text: Text }[];
  recommendation: Text;
  recommendationCopy: Text;
  focus: Text[];
};

export type CandidateAssessment = {
  verdict: string;
  summary: string;
  strengths: string[];
  gaps: string[];
  risks: { level: RiskLevel; text: string }[];
  recommendation: string;
  recommendationCopy: string;
  focus: string[];
  requirements: {
    skill: string;
    status: MatchStatus;
    evidence: string;
    required: boolean;
  }[];
  skills: {
    matched: string[];
    partial: string[];
    missing: string[];
  };
};

const primaryAssessments: Record<string, AssessmentCopy> = {
  "candidate-1": {
    verdict: { ru: "Сильное соответствие", en: "Strong match" },
    summary: {
      ru: "Sarah уверенно закрывает ключевые требования к frontend-разработке и приносит опыт технического лидерства. Перед следующим этапом стоит уточнить глубину production-опыта с Next.js и практики управления людьми.",
      en: "Sarah meets the core frontend requirements and brings relevant technical leadership experience. The next conversation should clarify the depth of her production Next.js work and people-management responsibilities.",
    },
    strengths: [
      {
        ru: "Опыт React и TypeScript превышает ожидаемый уровень вакансии.",
        en: "React and TypeScript experience exceeds the level required for the role.",
      },
      {
        ru: "Практический опыт frontend-архитектуры для сложных продуктовых интерфейсов.",
        en: "Hands-on experience architecting complex product interfaces.",
      },
      {
        ru: "Техническое лидерство и опыт поддержки роста инженерной команды.",
        en: "Technical leadership experience, including supporting the growth of other engineers.",
      },
      {
        ru: "Сильная ориентация на доступность и качество пользовательского опыта.",
        en: "Strong focus on accessibility and product quality.",
      },
    ],
    gaps: [
      {
        ru: "Production-ответственность за Next.js App Router явно не подтверждена.",
        en: "The profile does not show ownership of a production Next.js App Router application.",
      },
      {
        ru: "GraphQL не указан среди основных навыков профиля.",
        en: "GraphQL is not listed among the profile's core skills.",
      },
    ],
    risks: [
      {
        level: "medium",
        text: {
          ru: "Неясно, включала ли роль Tech Lead формальное управление сотрудниками.",
          en: "It is unclear whether the Tech Lead role included formal people management.",
        },
      },
      {
        level: "low",
        text: {
          ru: "Нужно проверить опыт работы с производительностью на масштабе.",
          en: "Experience improving frontend performance at scale needs validation.",
        },
      },
    ],
    recommendation: {
      ru: "Рекомендовать техническое интервью",
      en: "Proceed to technical interview",
    },
    recommendationCopy: {
      ru: "Профиль выглядит сильным по обязательному стеку. Сфокусируйте интервью на архитектурных решениях, Next.js и лидерском контексте.",
      en: "The profile is strong across the required stack. Focus the interview on architecture decisions, Next.js, and leadership scope.",
    },
    focus: [
      {
        ru: "Как Sarah принимала архитектурные решения в крупном React-продукте?",
        en: "Tell us about a major React architecture decision you owned. What trade-offs did you make?",
      },
      {
        ru: "Какие части Next.js она самостоятельно выводила в production?",
        en: "Which parts of a Next.js application have you owned in production?",
      },
      {
        ru: "Как измерялся эффект улучшений доступности?",
        en: "How did you measure the impact of your accessibility improvements?",
      },
      {
        ru: "Какую ответственность за развитие команды она несла как Tech Lead?",
        en: "As a Tech Lead, how did you coach engineers and support their growth?",
      },
    ],
  },
  "candidate-2": {
    verdict: { ru: "Хорошее соответствие", en: "Good match" },
    summary: {
      ru: "Daniel хорошо соответствует основным требованиям Product Designer и демонстрирует зрелый подход к дизайн-системам и исследованиям. На интервью важно проверить глубину прототипирования и технического взаимодействия с frontend-командами.",
      en: "Daniel aligns well with the Product Designer role and demonstrates a mature approach to design systems and research. The interview should explore his prototyping depth and collaboration with frontend engineers.",
    },
    strengths: [
      {
        ru: "Уверенное владение Figma и построением масштабируемых дизайн-систем.",
        en: "Strong command of Figma and experience building scalable design systems.",
      },
      {
        ru: "Исследования встроены в процесс принятия продуктовых решений.",
        en: "Research consistently informs product decisions.",
      },
      {
        ru: "Релевантный опыт проектирования сложных B2B-сценариев.",
        en: "Relevant experience designing complex B2B workflows.",
      },
    ],
    gaps: [
      {
        ru: "Не показана глубина работы с интерактивными прототипами.",
        en: "The profile offers limited evidence of advanced interactive prototyping.",
      },
      {
        ru: "Практические знания HTML/CSS требуют подтверждения.",
        en: "Hands-on HTML and CSS proficiency needs validation.",
      },
    ],
    risks: [
      {
        level: "low",
        text: {
          ru: "Недостаточно данных о работе с accessibility-аудитами.",
          en: "There is limited evidence of hands-on accessibility audits.",
        },
      },
      {
        level: "medium",
        text: {
          ru: "Нужно уточнить самостоятельность в принятии продуктовых решений.",
          en: "His level of ownership in product decisions needs clarification.",
        },
      },
    ],
    recommendation: {
      ru: "Продолжить продуктовое интервью",
      en: "Proceed to design interview",
    },
    recommendationCopy: {
      ru: "Основные компетенции подтверждены профилем. Следующий разговор должен раскрыть качество решений и взаимодействие с инженерами.",
      en: "The profile demonstrates the core competencies. Use the next conversation to explore decision quality and collaboration with engineering.",
    },
    focus: [
      {
        ru: "Как исследования изменили конкретное продуктовое решение?",
        en: "Tell us about a time research changed a product decision. What changed and why?",
      },
      {
        ru: "Как Daniel измеряет качество и adoption дизайн-системы?",
        en: "How do you measure the quality and adoption of a design system?",
      },
      {
        ru: "Какой уровень прототипа он использует перед передачей в разработку?",
        en: "How do you decide the right level of prototype fidelity before engineering handoff?",
      },
    ],
  },
  "candidate-3": {
    verdict: { ru: "Перспективное соответствие", en: "Promising match" },
    summary: {
      ru: "Olivia совпадает с вакансией по Python, PostgreSQL и облачному опыту, но профиль слабее раскрывает проектирование API и владение распределёнными системами. Технический скрининг поможет отделить реальный production-опыт от общего знакомства с технологиями.",
      en: "Olivia aligns well on Python, PostgreSQL, and cloud experience, but the profile provides less evidence of API design and distributed-system ownership. A technical screen should clarify the depth of her production experience.",
    },
    strengths: [
      {
        ru: "Практический опыт Python и PostgreSQL соответствует основному стеку.",
        en: "Hands-on Python and PostgreSQL experience matches the core stack.",
      },
      {
        ru: "Опыт AWS релевантен облачной архитектуре продукта.",
        en: "AWS experience is relevant to the product's cloud architecture.",
      },
      {
        ru: "Пять лет backend-разработки дают устойчивую инженерную базу.",
        en: "Five years in backend development provide a solid engineering foundation.",
      },
    ],
    gaps: [
      {
        ru: "Проектирование и владение публичными API не подтверждено примерами.",
        en: "The profile does not include specific examples of public API design or ownership.",
      },
      {
        ru: "Kubernetes не указан в текущем наборе навыков.",
        en: "Kubernetes is not present in the current skill set.",
      },
    ],
    risks: [
      {
        level: "medium",
        text: {
          ru: "Может потребоваться поддержка при проектировании сервисов высокой нагрузки.",
          en: "Experience designing high-throughput services is not yet established.",
        },
      },
      {
        level: "low",
        text: {
          ru: "Не указан опыт работы с наблюдаемостью production-систем.",
          en: "Production observability experience is not listed.",
        },
      },
    ],
    recommendation: {
      ru: "Провести технический скрининг",
      en: "Proceed to technical screen",
    },
    recommendationCopy: {
      ru: "Есть достаточное совпадение по стеку, чтобы продолжить. До полноценного интервью проверьте API design, масштабирование и операционную зрелость.",
      en: "The core stack alignment supports moving forward. Validate API design, scaling, and operational maturity during the technical screen.",
    },
    focus: [
      {
        ru: "Как Olivia проектирует границы и контракты API?",
        en: "Walk us through an API you designed. How did you define its boundaries and contracts?",
      },
      {
        ru: "Какой production-инцидент она диагностировала и устранила?",
        en: "Tell us about a production incident you diagnosed. How did you identify and resolve the root cause?",
      },
      {
        ru: "Как она масштабировала PostgreSQL под растущую нагрузку?",
        en: "How have you scaled PostgreSQL for a growing workload, and what trade-offs did you make?",
      },
    ],
  },
  "candidate-4": {
    verdict: { ru: "Сильное соответствие", en: "Strong match" },
    summary: {
      ru: "James сочетает продуктовую стратегию, discovery и уверенную работу с данными — это хорошо соответствует роли Product Manager. Следует проверить масштаб ответственности за B2B SaaS-метрики и влияние без формальных полномочий.",
      en: "James combines product strategy, discovery, and strong data fluency, making him a strong fit for the Product Manager role. The interview should validate his ownership of B2B SaaS metrics and ability to influence without authority.",
    },
    strengths: [
      {
        ru: "Девять лет продуктового опыта превышают базовое ожидание роли.",
        en: "Nine years of product experience exceeds the role's baseline requirement.",
      },
      {
        ru: "Сильное сочетание стратегии, customer discovery и SQL.",
        en: "A strong combination of strategy, customer discovery, and SQL.",
      },
      {
        ru: "Релевантный контекст управления B2B SaaS-продуктами.",
        en: "Relevant experience leading B2B SaaS products.",
      },
    ],
    gaps: [
      {
        ru: "Не показаны конкретные примеры владения revenue-метриками.",
        en: "The profile does not demonstrate direct ownership of revenue metrics.",
      },
      {
        ru: "Глубина самостоятельного аналитического моделирования требует проверки.",
        en: "Hands-on analytical modeling experience needs validation.",
      },
    ],
    risks: [
      {
        level: "medium",
        text: {
          ru: "Масштаб прежних продуктовых команд не указан.",
          en: "The scale of previous product teams is not specified.",
        },
      },
      {
        level: "low",
        text: {
          ru: "Стоит проверить практику принятия сложных приоритетных решений.",
          en: "His approach to difficult prioritization trade-offs needs validation.",
        },
      },
    ],
    recommendation: {
      ru: "Рекомендовать интервью с руководителем",
      en: "Proceed to hiring manager interview",
    },
    recommendationCopy: {
      ru: "Профиль уверенно закрывает основную продуктовую рамку. Интервью должно подтвердить масштаб влияния и ответственность за бизнес-результаты.",
      en: "The profile covers the core product competencies well. Use the interview to confirm his scope of influence and accountability for business outcomes.",
    },
    focus: [
      {
        ru: "Как James связывал discovery с коммерческим результатом?",
        en: "Tell us about a discovery insight that changed a commercial outcome. How did you measure the impact?",
      },
      {
        ru: "Какой сложный roadmap-компромисс он принимал лично?",
        en: "Walk us through a difficult roadmap trade-off you owned. How did you make the decision?",
      },
      {
        ru: "Какие SaaS-метрики он отслеживал и почему?",
        en: "Which SaaS metrics have you owned, and how did they shape your priorities?",
      },
    ],
  },
};

const localizedSkill = (skill: string, locale: Locale) =>
  locale === "ru" ? (skillNames[skill] ?? skill) : skill;

function genericCopy(candidate: CandidateProfile, job: Job): AssessmentCopy {
  const first = candidate.skills[0];
  const second = candidate.skills[1] ?? first;
  const missing = [...job.required, ...job.nice].filter(
    (skill) => !candidate.skills.includes(skill),
  );
  return {
    verdict:
      candidate.score >= 85
        ? { ru: "Сильное соответствие", en: "Strong match" }
        : candidate.score >= 80
          ? { ru: "Хорошее соответствие", en: "Good match" }
          : { ru: "Перспективное соответствие", en: "Promising match" },
    summary: {
      ru: `${candidate.name} показывает релевантный опыт для вакансии «${job.title.ru}» и совпадает с ролью по ключевым навыкам ${localizedSkill(first, "ru")} и ${localizedSkill(second, "ru")}. На интервью стоит подтвердить глубину практического опыта и закрыть пробелы, которые не раскрыты в профиле.`,
      en: `${candidate.name} brings relevant experience for the ${job.title.en} role and matches key needs in ${first} and ${second}. The next conversation should validate hands-on depth and clarify requirements not covered in the profile.`,
    },
    strengths: [
      {
        ru: `${candidate.experience} лет релевантного профессионального опыта.`,
        en: `${candidate.experience} years of relevant professional experience.`,
      },
      {
        ru: `${localizedSkill(first, "ru")} подтверждён как один из основных практических навыков.`,
        en: `The profile highlights ${first} as a core hands-on skill.`,
      },
      {
        ru: `Профиль показывает применимый опыт в области ${localizedSkill(second, "ru")}.`,
        en: `The profile shows relevant experience with ${second}.`,
      },
    ],
    gaps: (missing.length ? missing : job.nice).slice(0, 3).map((skill) => ({
      ru: `${localizedSkill(skill, "ru")} не подтверждён в текущем профиле.`,
      en: `${skill} is not covered in the current profile.`,
    })),
    risks: [
      {
        level: candidate.score < 80 ? "medium" : "low",
        text: {
          ru: "Глубину владения заявленными навыками нужно подтвердить на интервью.",
          en: "The candidate's depth across the listed skills needs validation.",
        },
      },
      {
        level: "low",
        text: {
          ru: "Масштаб ответственности в предыдущей роли раскрыт не полностью.",
          en: "The scope of ownership in recent roles is not fully detailed.",
        },
      },
    ],
    recommendation: {
      ru:
        candidate.score >= 80
          ? "Продолжить профильное интервью"
          : "Провести дополнительный скрининг",
      en:
        candidate.score >= 80
          ? "Proceed to role-specific interview"
          : "Proceed to recruiter screen",
    },
    recommendationCopy: {
      ru: "Совпадения достаточно для следующего разговора. Используйте интервью, чтобы проверить неподтверждённые требования и уровень самостоятельности.",
      en: "The profile shows enough alignment to move forward. Use the next conversation to validate open requirements and clarify the candidate's scope of ownership.",
    },
    focus: (missing.length ? missing : job.nice).slice(0, 3).map((skill) => ({
      ru: `Как кандидат применял ${localizedSkill(skill, "ru")} в реальной работе?`,
      en: `What hands-on experience do you have with ${skill}? Please share a specific example and your contribution.`,
    })),
  };
}

const evidenceOverrides: Record<
  string,
  Record<string, { status: MatchStatus; evidence: Text }>
> = {
  "candidate-1": {
    React: {
      status: "strong",
      evidence: {
        ru: "8 лет, техническое лидерство",
        en: "8 years, technical leadership",
      },
    },
    TypeScript: {
      status: "strong",
      evidence: {
        ru: "Основной production-стек",
        en: "Core production stack",
      },
    },
    Accessibility: {
      status: "partial",
      evidence: {
        ru: "Указан фокус, мало примеров",
        en: "Clear focus, limited examples",
      },
    },
    "Next.js": {
      status: "partial",
      evidence: {
        ru: "Проектный опыт без ownership",
        en: "Project experience shown; ownership unclear",
      },
    },
    GraphQL: {
      status: "missing",
      evidence: { ru: "Не подтверждено", en: "Not evidenced" },
    },
  },
  "candidate-2": {
    Figma: {
      status: "strong",
      evidence: { ru: "Основной инструмент", en: "Primary design tool" },
    },
    "Design systems": {
      status: "strong",
      evidence: {
        ru: "Системный опыт владения",
        en: "Demonstrated design-system ownership",
      },
    },
    Research: {
      status: "strong",
      evidence: {
        ru: "Встроено в продуктовый процесс",
        en: "Integrated into the product process",
      },
    },
    Prototyping: {
      status: "partial",
      evidence: { ru: "Глубина не раскрыта", en: "Depth not demonstrated" },
    },
    "HTML / CSS": {
      status: "partial",
      evidence: { ru: "Требует проверки", en: "Hands-on level unclear" },
    },
  },
  "candidate-3": {
    Python: {
      status: "strong",
      evidence: {
        ru: "5 лет backend-разработки",
        en: "5 years in backend development",
      },
    },
    PostgreSQL: {
      status: "strong",
      evidence: { ru: "Основная база данных", en: "Core database experience" },
    },
    "API design": {
      status: "partial",
      evidence: {
        ru: "Нет конкретных кейсов",
        en: "No specific ownership examples provided",
      },
    },
    AWS: {
      status: "strong",
      evidence: {
        ru: "Практический облачный опыт",
        en: "Hands-on cloud experience",
      },
    },
    Kubernetes: {
      status: "missing",
      evidence: { ru: "Не указан в профиле", en: "Not listed in the profile" },
    },
  },
  "candidate-4": {
    Strategy: {
      status: "strong",
      evidence: {
        ru: "9 лет продуктового опыта",
        en: "9 years in product roles",
      },
    },
    Discovery: {
      status: "strong",
      evidence: {
        ru: "Сильный customer discovery",
        en: "Strong customer discovery",
      },
    },
    SQL: {
      status: "strong",
      evidence: {
        ru: "Уверенная работа с данными",
        en: "Strong data fluency",
      },
    },
    "B2B SaaS": {
      status: "strong",
      evidence: {
        ru: "Релевантный продуктовый контекст",
        en: "Relevant product context",
      },
    },
    Analytics: {
      status: "partial",
      evidence: {
        ru: "Глубина требует проверки",
        en: "Depth needs validation",
      },
    },
  },
};

export function getCandidateAssessment(
  candidate: CandidateProfile,
  job: Job,
  locale: Locale,
): CandidateAssessment {
  const copy = primaryAssessments[candidate.id] ?? genericCopy(candidate, job);
  const overrides = primaryAssessments[candidate.id]
    ? evidenceOverrides[candidate.id]
    : undefined;
  const requirements = [
    ...job.required.map((skill) => ({ skill, required: true })),
    ...job.nice.map((skill) => ({ skill, required: false })),
  ].map(({ skill, required }) => {
    const exact = candidate.skills.includes(skill);
    const override = overrides?.[skill];
    const status: MatchStatus =
      override?.status ?? (exact ? "strong" : "missing");
    const evidence =
      override?.evidence[locale] ??
      (exact
        ? locale === "ru"
          ? "Указан в профиле и напрямую соответствует требованию"
          : "Listed in the profile and directly relevant"
        : required
          ? locale === "ru"
            ? "Не подтверждено в текущем профиле"
            : "Not evidenced in the current profile"
          : locale === "ru"
            ? "Желательный навык, подтверждений нет"
            : "Not evidenced in the profile (preferred)");
    return {
      skill: localizedSkill(skill, locale),
      status,
      evidence,
      required,
    };
  });
  const targetSkills = [...job.required, ...job.nice];
  return {
    verdict: copy.verdict[locale],
    summary: copy.summary[locale],
    strengths: copy.strengths.map((item) => item[locale]),
    gaps: copy.gaps.map((item) => item[locale]),
    risks: copy.risks.map((item) => ({
      level: item.level,
      text: item.text[locale],
    })),
    recommendation: copy.recommendation[locale],
    recommendationCopy: copy.recommendationCopy[locale],
    focus: copy.focus.map((item) => item[locale]),
    requirements,
    skills: {
      matched: candidate.skills
        .filter((skill) => targetSkills.includes(skill))
        .map((skill) => localizedSkill(skill, locale)),
      partial: candidate.skills
        .filter((skill) => !targetSkills.includes(skill))
        .map((skill) => localizedSkill(skill, locale)),
      missing: targetSkills
        .filter((skill) => !candidate.skills.includes(skill))
        .map((skill) => localizedSkill(skill, locale)),
    },
  };
}
