import { experience } from "../content/experience";
import { skills } from "../content/skills";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

// Printable-friendly, not a reskin of the themed components used
// elsewhere — print:* variants switch to plain black-on-white and drop the
// print button, since none of that belongs in a printed/PDF resume.
function Resume() {
  useDocumentMeta(
    "Resume — Luann Curioso",
    "Luann Curioso's resume — experience, skills, and certifications."
  );

  return (
    <div className="min-h-screen bg-background px-4 pb-stack-lg pt-32 text-on-surface print:bg-white print:px-0 print:py-0 print:text-black">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-headline-lg text-headline-lg">Luann Curioso</h1>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg border border-outline px-4 py-2 font-body-md font-bold text-primary transition-colors hover:bg-surface-container print:hidden"
          >
            Print / Save as PDF
          </button>
        </div>

        <section className="mt-stack-md">
          <h2 className="font-headline-md text-headline-md">Summary</h2>
          <p className="mt-4 font-body-md text-body-md text-on-surface-variant">
            Software Engineer with 5+ years of experience building production
            front-end systems in TypeScript, React, Vue, Node.js, Deno, and
            Golang, plus hands-on infrastructure background (network
            administration, virtualization, Active Directory) from earlier in my
            career. Focused on reusable architecture, automated testing,
            accessibility, and developer experience across production,
            enterprise, and government platforms. Open-source contributor to
            ShellHub and UpdateHub, AWS Certified Cloud Practitioner.
          </p>
        </section>

        <section className="mt-stack-md">
          <h2 className="font-headline-md text-headline-md">Experience</h2>
          <ul className="mt-4 flex flex-col gap-4">
            {experience.map((entry) => (
              <li key={`${entry.issued}-${entry.anoEntrada}`}>
                <p className="font-semibold">
                  {entry.name} — {entry.issued}
                </p>
                <p className="text-sm opacity-80">
                  {entry.anoEntrada} till {entry.anoSaida}
                </p>
                <p className="mt-1 whitespace-pre-line text-sm">{entry.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-stack-md">
          <h2 className="font-headline-md text-headline-md">Skills</h2>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {skills.map((skill) => (
              <li key={skill.name}>{skill.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Resume;
