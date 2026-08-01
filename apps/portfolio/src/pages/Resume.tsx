import { useTranslation } from "react-i18next";
import { formatDate, useLocale } from "@portfolio/i18n";
import { experience } from "../content/experience";
import { skills } from "../content/skills";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
};

// Printable-friendly, not a reskin of the themed components used
// elsewhere — print:* variants switch to plain black-on-white and drop the
// print button, since none of that belongs in a printed/PDF resume.
function Resume() {
  const { t } = useTranslation();
  const [locale] = useLocale();

  useDocumentMeta(t("resume.metaTitle"), t("resume.metaDescription"));

  return (
    <div className="min-h-screen bg-background px-4 pb-stack-lg text-on-surface print:bg-white print:px-0 print:py-0 print:text-black">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-headline-lg text-headline-lg">Luann Curioso</h1>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg border border-outline px-4 py-2 font-body-md font-bold text-primary transition-colors hover:bg-surface-container print:hidden"
          >
            {t("resume.print")}
          </button>
        </div>

        <section className="mt-stack-md">
          <h2 className="font-headline-md text-headline-md">
            {t("resume.summaryHeading")}
          </h2>
          <p className="mt-4 font-body-md text-body-md text-on-surface-variant">
            {t("resume.summary")}
          </p>
        </section>

        <section className="mt-stack-md">
          <h2 className="font-headline-md text-headline-md">
            {t("experience.heading")}
          </h2>
          <ul className="mt-4 flex flex-col gap-4">
            {experience.map((entry) => (
              <li key={entry.id}>
                <p className="font-semibold">
                  {t(`experience.entries.${entry.id}.name`)} —{" "}
                  {t(`experience.entries.${entry.id}.issued`)}
                </p>
                <p className="text-sm opacity-80">
                  {formatDate(entry.startDate, locale, DATE_OPTIONS)} —{" "}
                  {formatDate(entry.endDate, locale, DATE_OPTIONS)}
                </p>
                <p className="mt-1 whitespace-pre-line text-sm">
                  {t(`experience.entries.${entry.id}.desc`)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-stack-md">
          <h2 className="font-headline-md text-headline-md">
            {t("resume.skillsHeading")}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {skills.map((skill) => (
              <li key={skill.name}>{skill.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Resume;
