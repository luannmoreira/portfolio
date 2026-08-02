import { useTranslation } from "react-i18next";
import CardProjects from "../components/CardProjects";
import { projects } from "../content/projects";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Projects() {
  const { t } = useTranslation();

  useDocumentMeta(t("projects.metaTitle"), t("projects.tagline"));

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile pb-stack-lg md:px-gutter">
      <section className="mb-stack-lg">
        <span className="mb-2 block font-label-mono text-label-mono uppercase tracking-widest text-primary">
          {t("projects.eyebrow")}
        </span>
        <h1 className="mb-6 font-display text-display">
          {t("projects.heading")}
        </h1>
        <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          {t("projects.tagline")}
        </p>
      </section>
      <h2 className="sr-only">{t("projects.allProjectsHeading")}</h2>
      <div className="grid grid-cols-1 gap-stack-md md:grid-cols-3">
        {projects.map((project) => (
          <CardProjects
            key={project.id}
            name={project.name}
            description={t(`projects.items.${project.id}.description`)}
            tech={project.tech}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
