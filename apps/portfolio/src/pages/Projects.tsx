import CardProjects from "../components/CardProjects";
import { projects } from "../content/projects";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Projects() {
  useDocumentMeta(
    "Projects • Luann Curioso",
    "Production engineering work — architecture, maintainability, and long-term thinking, not just UI."
  );

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile pb-stack-lg md:px-gutter">
      <section className="mb-stack-lg">
        <span className="mb-2 block font-label-mono text-label-mono uppercase tracking-widest text-secondary">
          Portfolio
        </span>
        <h1 className="mb-6 font-display text-display">Engineering Work</h1>
        <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Production engineering work — architecture, maintainability, and
          long-term thinking, not just UI.
        </p>
      </section>
      <h2 className="sr-only">All projects</h2>
      <div className="grid grid-cols-1 gap-stack-md md:grid-cols-3">
        {projects.map((project) => (
          <CardProjects key={project.name} {...project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
