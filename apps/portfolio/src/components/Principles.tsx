const principles = [
  {
    title: "01. Reliability First",
    desc: "Designing systems that fail gracefully. Observability and monitoring are baked into the architecture from day one.",
  },
  {
    title: "02. Decoupled Architecture",
    desc: "Embracing modularity to allow components to evolve independently without risking systemic collapse.",
  },
  {
    title: "03. Performance Budgeting",
    desc: "Treating latency as a feature. Every kilobyte and millisecond counts in modern high-scale applications.",
  },
  {
    title: "04. Self-Documenting Code",
    desc: 'Writing clear, expressive code that communicates intent. Comments are for "why", code is for "how".',
  },
];

export default function Principles() {
  return (
    <section className="mb-stack-lg border border-outline-variant/20 bg-surface-container-low p-stack-md">
      <div className="flex flex-col gap-gutter md:flex-row">
        <div className="md:w-1/3">
          <h2 className="mb-4 font-headline-lg text-headline-lg leading-tight">
            Core Engineering Principles
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            The frameworks and mental models I use to navigate complex technical
            landscapes.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:w-2/3">
          {principles.map((principle) => (
            <div key={principle.title}>
              <div className="mb-2 font-label-mono text-label-mono text-primary">
                {principle.title}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
