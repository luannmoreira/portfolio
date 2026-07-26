import CardProjects from "../components/CardProjects";
import { projects } from "../content/projects";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Projects() {
  useDocumentMeta(
    "Projects — Luann Curioso",
    "Production engineering work — architecture, maintainability, and long-term thinking, not just UI."
  );

  return (
    <div className="min-h-screen text-white">
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="font-light text-gray-400">
        Production engineering work — architecture, maintainability, and
        long-term thinking, not just UI.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        {projects.map((project) => (
          <CardProjects key={project.name} {...project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
