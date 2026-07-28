import { Link } from "react-router";

import AboutSection from "../components/About";
import Habilidades from "../components/Habilidades";
import Principles from "../components/Principles";
import Experiencia from "../components/Experiencia";
import Uses from "../components/Uses";
import DotCanvas from "../components/DotCanvas";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useScrollToSection } from "../hooks/useScrollToSection";

function About() {
  useScrollToSection();
  useDocumentMeta(
    "About • Luann Curioso",
    "Background, skills, experience, and the tools used day to day — from infrastructure and government systems to production front-end engineering at ShellHub and OS Systems."
  );

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile md:px-gutter">
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

      <DotCanvas
        as="section"
        className="mb-stack-lg rounded-lg bg-inverse-surface px-6 py-stack-md text-center text-inverse-on-surface"
      >
        <h2 className="mb-6 font-headline-lg text-headline-lg">
          <span className="text-plate text-plate-inverse">
            Looking for a technical partner?
          </span>
        </h2>
        <p className="mx-auto mb-8 max-w-xl font-body-lg text-body-lg">
          <span className="text-plate text-plate-inverse text-inverse-on-surface/80">
            Always interested in collaborative projects and high-impact roles
            where technical excellence is a core value.
          </span>
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/contact"
            className="rounded-lg bg-inverse-on-surface px-8 py-3 font-headline-md text-inverse-surface transition-colors hover:opacity-90"
          >
            Get In Touch
          </Link>
          <Link
            to="/resume"
            className="rounded-lg border border-inverse-on-surface/30 bg-inverse-surface/60 px-8 py-3 font-headline-md text-inverse-on-surface backdrop-blur-md transition-colors hover:bg-inverse-on-surface/10"
          >
            View Resume
          </Link>
        </div>
      </DotCanvas>
    </div>
  );
}

export default About;
