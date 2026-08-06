import { useTranslation } from "react-i18next";
import { formatDate, useLocale } from "@portfolio/i18n";
import ExperienceCard from "./ExperienceCard";
import { experience } from "../content/experience";

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
};

export default function Experience() {
  const { t } = useTranslation();
  const [locale] = useLocale();

  return (
    <section className="mb-stack-lg">
      <h2 className="mb-stack-md font-headline-lg text-headline-lg">
        {t("experience.heading")}
      </h2>
      <ul className="flex flex-col gap-stack-sm">
        {experience.map((entry) => (
          <ExperienceCard
            key={entry.id}
            name={t(`experience.entries.${entry.id}.name`)}
            issued={t(`experience.entries.${entry.id}.issued`)}
            desc={t(`experience.entries.${entry.id}.desc`)}
            startDate={formatDate(entry.startDate, locale, DATE_OPTIONS)}
            endDate={formatDate(entry.endDate, locale, DATE_OPTIONS)}
          />
        ))}
      </ul>
    </section>
  );
}
