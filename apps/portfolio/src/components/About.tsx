import { Trans, useTranslation } from "react-i18next";
import profile from "../assets/profilepic.webp";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="mb-stack-lg">
      <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
        <div className="lg:col-span-8">
          <span className="mb-4 block font-label-mono text-label-mono uppercase tracking-widest text-secondary">
            {t("about.philosophyEyebrow")}
          </span>
          <h1 className="mb-stack-sm font-display text-display leading-tight">
            <Trans
              i18nKey="about.philosophyHeading"
              components={{ highlight: <span className="text-secondary" /> }}
            />
          </h1>
          <div className="max-w-3xl space-y-6">
            <p className="font-body-lg text-body-lg text-on-surface">
              {t("about.bioParagraph1")}
            </p>
            <p className="font-body-lg text-body-lg text-on-surface">
              {t("about.bioParagraph2")}
            </p>
          </div>
        </div>
        <div className="mt-stack-md lg:col-span-4 lg:mt-0">
          <div className="relative overflow-hidden border border-outline-variant/30 bg-surface-container-lowest p-unit">
            <img
              src={profile}
              alt={t("about.profileAlt")}
              className="w-full grayscale contrast-110"
              width={600}
              height={680}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
