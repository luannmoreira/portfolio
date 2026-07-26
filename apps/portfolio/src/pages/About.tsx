import { Link } from "react-router";

import AboutSection from "../components/About";
import Habilidades from "../components/Habilidades";
import Principles from "../components/Principles";
import Experiencia from "../components/Experiencia";
import Uses from "../components/Uses";
import CardCerts from "../components/CardCerts";
import { certs } from "../content/certs";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useScrollToSection } from "../hooks/useScrollToSection";

function About() {
  useScrollToSection();
  useDocumentMeta(
    "About — Luann Curioso",
    "Background, skills, experience, and the tools used day to day — from infrastructure and government systems to production front-end engineering at ShellHub and OS Systems."
  );

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile pt-32 md:px-gutter">
      <AboutSection />
      <Habilidades />
      <Principles />
      <Experiencia />

      <div className="mb-stack-lg">
        <Uses />
      </div>

      <section className="mb-stack-lg">
        <div className="overflow-hidden rounded-lg border border-white/5 bg-[#1E293B] p-6 shadow-xl">
          <div className="mb-4 flex gap-2">
            <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
            <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
          </div>
          <pre className="font-label-mono text-[14px] leading-relaxed text-[#94A3B8]">
            <span className="text-[#7DD3FC]">export const</span>{" "}
            <span className="text-[#FDE047]">setup</span> = () =&gt; {"{"}
            {"\n"} <span className="text-[#7DD3FC]">const</span> config = {"{"}
            {"\n"} os: <span className="text-[#6EE7B7]">"Garuda Linux"</span>,
            {"\n"} terminal: <span className="text-[#6EE7B7]">"Konsole"</span>,
            {"\n"} editor: <span className="text-[#6EE7B7]">"VS Code"</span>,
            {"\n"} assistant: <span className="text-[#6EE7B7]">"Claude"</span>
            {"\n"} {"}"};{"\n"}
            {"\n"} <span className="text-[#7DD3FC]">return</span>{" "}
            <span className="text-[#F472B6]">new</span> Workspace(config);
            {"\n"}
            {"}"};
          </pre>
        </div>
      </section>

      <section id="courses" className="mb-stack-lg scroll-mt-32">
        <div className="mb-stack-sm flex items-center gap-4">
          <h2 className="font-headline-lg text-headline-lg">Courses</h2>
          <div className="h-px flex-grow bg-outline-variant/30" />
        </div>
        <p className="mb-stack-sm max-w-2xl font-body-md text-body-md text-on-surface-variant">
          Course completions, not professional certifications — a record of
          self-directed learning along the way.
        </p>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {certs.map((cert) => (
            <CardCerts key={cert.name} {...cert} />
          ))}
        </div>
      </section>

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
