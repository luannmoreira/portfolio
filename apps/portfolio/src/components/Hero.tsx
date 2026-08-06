import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import DotCanvas from "./DotCanvas";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <DotCanvas
      as="section"
      className="-mt-8 flex min-h-[70vh] items-center py-stack-lg"
    >
      <div className="mx-auto w-full max-w-container-max px-margin-mobile md:px-gutter">
        <div className="max-w-3xl">
          <p className="mb-stack-sm font-label-mono text-label-mono uppercase tracking-widest text-primary">
            <span data-text-plate className="text-plate">
              {t("hero.eyebrow")}
            </span>
          </p>
          <h1 className="mb-stack-sm font-display text-display leading-[1.1] text-on-background">
            <span data-text-plate className="text-plate">
              {t("hero.heading")}
            </span>
          </h1>
          <p className="mb-stack-md max-w-2xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
            <span data-text-plate className="text-plate">
              {t("hero.body")}
            </span>
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="rounded-lg bg-button px-6 py-3 font-headline-md text-on-button transition-colors hover:opacity-90"
            >
              {t("hero.viewProjects")}
            </Link>
            <Link
              to="/contact"
              className="rounded-lg border border-outline bg-surface/60 px-6 py-3 font-headline-md text-button backdrop-blur-md transition-colors hover:bg-surface-container"
            >
              {t("hero.contactMe")}
            </Link>
          </div>
        </div>
      </div>
    </DotCanvas>
  );
}
