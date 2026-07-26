import CardCerts from "../components/CardCerts";
import Uses from "../components/Uses";
import EcosystemSection from "../components/EcosystemSection";
import { certs } from "../content/certs";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useScrollToSection } from "../hooks/useScrollToSection";

function Certifications() {
  useScrollToSection();
  useDocumentMeta(
    "Certifications & Uses — Luann Curioso",
    "Certifications, and the workstation and software stack used day to day."
  );

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile pb-stack-lg pt-32 md:px-gutter">
      <section className="mb-stack-lg">
        <span className="mb-2 block font-label-mono text-label-mono uppercase tracking-widest text-secondary">
          Professional Roadmap
        </span>
        <h1 className="mb-6 font-display text-display">
          Certifications & Tools
        </h1>
        <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          A record of courses and certifications completed, and a look at
          the workstation and software stack used day to day.
        </p>
      </section>

      <section id="certifications" className="mb-stack-lg scroll-mt-32">
        <div className="mb-stack-sm flex items-center gap-4">
          <h2 className="font-headline-lg text-headline-lg">
            Courses & Certifications
          </h2>
          <div className="h-px flex-grow bg-outline-variant/30" />
        </div>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {certs.map((cert) => (
            <CardCerts key={cert.name} {...cert} />
          ))}
        </div>
      </section>

      <div className="mb-stack-lg">
        <Uses />
      </div>

      <section className="mb-stack-lg border border-outline-variant/30 bg-surface-container-low p-stack-md">
        <h3 className="mb-6 font-headline-md text-headline-md">
          Core Development Ecosystem
        </h3>
        <EcosystemSection />
      </section>

      <section>
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
    </div>
  );
}

export default Certifications;
