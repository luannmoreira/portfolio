import { Link } from "react-router";

import AboutSection from "../components/About";
import Habilidades from "../components/Habilidades";
import Principles from "../components/Principles";
import Experiencia from "../components/Experiencia";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useScrollToSection } from "../hooks/useScrollToSection";

function About() {
  useScrollToSection();
  useDocumentMeta(
    "About — Luann Curioso",
    "Background, skills, and experience — from infrastructure and government systems to production front-end engineering at ShellHub and OS Systems."
  );

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile pt-32 md:px-gutter">
      <AboutSection />
      <Habilidades />
      <Principles />
      <Experiencia />
      <section className="mb-stack-lg border-y border-outline-variant/30 py-stack-md text-center">
        <h2 className="mb-6 font-headline-lg text-headline-lg">
          Looking for a technical partner?
        </h2>
        <p className="mx-auto mb-8 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
          Always interested in collaborative projects and high-impact roles
          where technical excellence is a core value.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/contact"
            className="bg-primary px-8 py-3 font-semibold text-on-primary transition-all hover:opacity-90"
          >
            Get In Touch
          </Link>
          <Link
            to="/resume"
            className="border border-outline px-8 py-3 font-semibold text-primary transition-all hover:bg-surface-container-high"
          >
            View Resume
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
