import EcosystemSection from "./EcosystemSection";

export default function Habilidades() {
  return (
    <section id="skills" className="mb-stack-lg scroll-mt-32">
      <h2 className="mb-2 font-headline-lg text-headline-lg">
        Technical Expertise
      </h2>
      <p className="mb-stack-md font-body-md text-body-md text-on-surface-variant">
        Technologies I use in production.
      </p>
      <EcosystemSection />
    </section>
  );
}
