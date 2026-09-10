import type { Locale } from "./i18n";

export const compareCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    vacancy: string;
    vacancyHint: string;
    candidates: string;
    candidateCount: (count: number) => string;
    selected: (count: number) => string;
    slot: (index: number) => string;
    add: string;
    addHint: string;
    replace: string;
    remove: string;
    emptyTitle: string;
    emptyCopy: string;
    chooseJobTitle: string;
    chooseJobCopy: string;
    noCandidatesTitle: string;
    noCandidatesCopy: string;
    comparing: string;
    comparingCopy: (job: string) => string;
    currentRole: string;
    match: string;
    stage: string;
    experience: string;
    years: (value: number) => string;
    location: string;
    skills: string;
    strongestMatch: string;
    experienceAdvantage: string;
    skillGap: string;
    requirementGap: string;
  }
> = {
  ru: {
    eyebrow: "Короткий список",
    title: "Сравнение кандидатов",
    intro:
      "Выберите вакансию и соберите до трёх релевантных профилей для просмотра рядом.",
    vacancy: "Вакансия",
    vacancyHint: "Выберите вакансию",
    candidates: "Кандидаты",
    candidateCount: (count) => {
      const mod10 = count % 10;
      const mod100 = count % 100;
      const noun =
        mod10 === 1 && mod100 !== 11
          ? "кандидат"
          : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
            ? "кандидата"
            : "кандидатов";
      return `${count} ${noun}`;
    },
    selected: (count) => `${count} из 3 выбрано`,
    slot: (index) => `Слот ${index}`,
    add: "Добавить кандидата",
    addHint: "Выберите кандидата",
    replace: "Заменить кандидата",
    remove: "Убрать из сравнения",
    emptyTitle: "Добавьте кандидатов в сравнение",
    emptyCopy:
      "Выберите два или три профиля из этой вакансии, чтобы увидеть их рядом.",
    chooseJobTitle: "Сначала выберите вакансию",
    chooseJobCopy:
      "Так в списке останутся только кандидаты, которые рассматриваются на одну роль.",
    noCandidatesTitle: "Для этой вакансии пока нет профилей",
    noCandidatesCopy:
      "Выберите другую вакансию или добавьте кандидата в разделе «Кандидаты».",
    comparing: "Выбранные профили",
    comparingCopy: (job) => `Кандидаты на вакансию «${job}»`,
    currentRole: "Текущая роль",
    match: "Match Score",
    stage: "Этап найма",
    experience: "Опыт",
    years: (value) => {
      const mod10 = value % 10;
      const mod100 = value % 100;
      return mod10 === 1 && mod100 !== 11
        ? "год"
        : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
          ? "года"
          : "лет";
    },
    location: "Местоположение",
    skills: "Ключевые навыки",
    strongestMatch: "Самое сильное соответствие",
    experienceAdvantage: "Преимущество в опыте",
    skillGap: "Пробел в желательном навыке",
    requirementGap: "Требование не подтверждено",
  },
  en: {
    eyebrow: "Shortlist workspace",
    title: "Compare candidates",
    intro:
      "Choose a vacancy and bring up to three relevant profiles into one focused view.",
    vacancy: "Vacancy",
    vacancyHint: "Choose a vacancy",
    candidates: "Candidates",
    candidateCount: (count) =>
      `${count} ${count === 1 ? "candidate" : "candidates"}`,
    selected: (count) => `${count} of 3 selected`,
    slot: (index) => `Slot ${index}`,
    add: "Add candidate",
    addHint: "Choose a candidate",
    replace: "Replace candidate",
    remove: "Remove from comparison",
    emptyTitle: "Add candidates to compare",
    emptyCopy:
      "Choose two or three profiles for this vacancy to view them side by side.",
    chooseJobTitle: "Choose a vacancy first",
    chooseJobCopy:
      "This keeps the shortlist focused on candidates being considered for the same role.",
    noCandidatesTitle: "No profiles for this vacancy yet",
    noCandidatesCopy:
      "Choose another vacancy or add a profile from the Candidates section.",
    comparing: "Selected profiles",
    comparingCopy: (job) => `Candidates for ${job}`,
    currentRole: "Current role",
    match: "Match Score",
    stage: "Hiring stage",
    experience: "Experience",
    years: (value) => (value === 1 ? "year" : "years"),
    location: "Location",
    skills: "Key skills",
    strongestMatch: "Strongest match",
    experienceAdvantage: "Experience advantage",
    skillGap: "Preferred skill gap",
    requirementGap: "Core requirement not evidenced",
  },
};
