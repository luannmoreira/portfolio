import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import Hero from "../components/Hero";
import Timeline from "../components/Timeline";
import CardProjects from "../components/CardProjects";
import DotCanvas from "../components/DotCanvas";
import MaterialIcon from "../components/icons/MaterialIcon";
import { projects } from "../content/projects";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useScrollToSection } from "../hooks/useScrollToSection";

// Curated, not just "first two" — picked by id so the teaser survives
// reordering/additions to the full projects list on /projects.
const FEATURED_PROJECT_IDS = ["shellhub", "sedec-invest-mt"];
const featuredProjects = FEATURED_PROJECT_IDS.map((id) =>
  projects.find((project) => project.id === id)!
);

function Home() {
  const { t } = useTranslation();
  useScrollToSection();
  useDocumentMeta(t("home.metaTitle"), t("home.metaDescription"));

  return (
    <>
      <Hero />
      <Timeline />
      <section className="py-stack-lg">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-gutter">
          <div className="mb-stack-md">
            <span className="mb-2 block font-label-mono text-label-mono uppercase tracking-widest text-primary">
              {t("home.projectsEyebrow")}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-background">
              {t("home.projectsHeading")}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-stack-md md:grid-cols-2">
            {featuredProjects.map((project) => (
              <CardProjects
                key={project.id}
                name={project.name}
                description={t(`projects.items.${project.id}.description`)}
                tech={project.tech}
                link={project.link}
                animate={false}
              />
            ))}
          </div>
          <div className="mt-stack-md text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-headline-md text-on-surface-variant transition-all hover:gap-4 hover:text-primary"
            >
              {t("home.exploreAllProjects")}
              <MaterialIcon name="arrow_forward" className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      <DotCanvas
        as="section"
        className="bg-inverse-surface py-stack-lg text-inverse-on-surface"
      >
        <div className="mx-auto max-w-container-max px-margin-mobile text-center md:px-gutter">
          <h2 className="mb-stack-sm font-headline-lg text-headline-lg">
            <span data-text-plate className="text-plate text-plate-inverse">
              {t("home.ctaHeading")}
            </span>
          </h2>
          <p className="mx-auto mb-stack-md max-w-2xl font-body-lg text-body-lg">
            <span
              data-text-plate
              className="text-plate text-plate-inverse text-inverse-on-surface/80"
            >
              {t("home.ctaBody")}
            </span>
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:luannmcurioso@gmail.com"
              className="rounded-lg bg-inverse-on-surface px-8 py-3 font-headline-md text-inverse-surface transition-colors hover:opacity-90"
            >
              {t("home.sendEmail")}
            </a>
            <Link
              to="/contact"
              className="rounded-lg border border-inverse-on-surface/30 bg-inverse-surface/60 px-8 py-3 font-headline-md text-inverse-on-surface backdrop-blur-md transition-colors hover:bg-inverse-on-surface/10"
            >
              {t("home.moreWaysToReach")}
            </Link>
          </div>
        </div>
      </DotCanvas>
    </>
  );
}

export default Home;
