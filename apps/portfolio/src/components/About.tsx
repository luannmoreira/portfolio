import profile from "../assets/profilepic.webp";

export default function About() {
  return (
    <section className="mb-stack-lg">
      <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
        <div className="lg:col-span-8">
          <span className="mb-4 block font-label-mono text-label-mono uppercase tracking-widest text-secondary">
            Professional Philosophy
          </span>
          <h1 className="mb-stack-sm font-display text-display leading-tight">
            Software engineering is more than just writing code; it's about
            solving problems and building{" "}
            <span className="text-secondary">sustainable systems</span>.
          </h1>
          <div className="max-w-3xl space-y-6">
            <p className="font-body-lg text-body-lg text-on-surface">
              I'm a Software Engineer with a front-end-heavy background —
              five-plus years building production interfaces in TypeScript,
              React, and Vue. My path started in infrastructure: configuring
              servers, virtualization, and Active Directory before I ever
              shipped a web interface, and that early exposure to systems still
              shapes how I think about software today. Since then I've worked
              across production, enterprise, and government platforms —
              ShellHub's remote device management product, OS Systems'
              infrastructure tooling, and a public-sector application for the
              State of Mato Grosso — with a focus on reusable architecture,
              automated testing, accessibility, and code quality, not just UI.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface">
              I'm an open-source contributor to ShellHub and UpdateHub, AWS
              Certified Cloud Practitioner, and currently finishing a Bachelor's
              in Information Systems. My interests keep expanding past the
              browser, toward backend and platform engineering, but the
              throughline has always been caring about how software is actually
              built, not just how it looks. Outside of that, I spend my free
              time cooking and hanging out with dogs.
            </p>
          </div>
        </div>
        <div className="mt-stack-md lg:col-span-4 lg:mt-0">
          <div className="relative overflow-hidden border border-outline-variant/30 bg-surface-container-lowest p-unit">
            <img
              src={profile}
              alt="Luann Curioso"
              className="w-full grayscale contrast-110"
              width={600}
              height={680}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
