import { Link } from "react-router";

import Hero from "../components/Hero";
import Now from "../components/Now";
import CardProjects from "../components/CardProjects";
import DotCanvas from "../components/DotCanvas";
import MaterialIcon from "../components/icons/MaterialIcon";
import { projects } from "../content/projects";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Home() {
  useDocumentMeta(
    "Luann Curioso",
    "Luann Curioso's portfolio — software engineer with production front-end experience and an infrastructure background, from ShellHub to government platforms."
  );

  return (
    <>
      <Hero />
      <Now />
      <section className="py-stack-lg">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-gutter">
          <div className="mb-stack-md">
            <span className="mb-2 block font-label-mono text-label-mono uppercase tracking-widest text-secondary">
              Portfolio
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-background">
              Selected Engineering Work
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-stack-md md:grid-cols-2">
            {projects.slice(0, 2).map((project) => (
              <CardProjects key={project.name} {...project} animate={false} />
            ))}
          </div>
          <div className="mt-stack-md text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-headline-md text-primary transition-all hover:gap-4"
            >
              Explore all projects
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
            <span className="text-plate text-plate-inverse">
              Ready to scale your engineering?
            </span>
          </h2>
          <p className="mx-auto mb-stack-md max-w-2xl font-body-lg text-body-lg">
            <span className="text-plate text-plate-inverse text-inverse-on-surface/80">
              Always interested in hard technical problems — reach out if you'd
              like to talk architecture, collaboration, or opportunities.
            </span>
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:luannmcurioso@gmail.com"
              className="rounded-lg bg-inverse-on-surface px-8 py-3 font-headline-md text-inverse-surface transition-colors hover:opacity-90"
            >
              Send an Email
            </a>
            <Link
              to="/contact"
              className="rounded-lg border border-inverse-on-surface/30 bg-inverse-surface/60 px-8 py-3 font-headline-md text-inverse-on-surface backdrop-blur-md transition-colors hover:bg-inverse-on-surface/10"
            >
              More ways to reach me
            </Link>
          </div>
        </div>
      </DotCanvas>
    </>
  );
}

export default Home;
