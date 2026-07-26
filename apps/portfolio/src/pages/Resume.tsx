import { experience } from "../content/experience";
import { skills } from "../content/skills";
import { certs } from "../content/certs";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

// Printable-friendly, not a reskin of the dark-themed Card components used
// elsewhere — print:* variants switch to plain black-on-white and drop the
// print button, since none of that belongs in a printed/PDF resume.
function Resume() {
  useDocumentMeta(
    "Resume — Luann Curioso",
    "Luann Curioso's resume — experience, skills, and certifications."
  );

  return (
    <div className="min-h-screen bg-dark-500 px-4 py-12 text-white print:bg-white print:px-0 print:py-0 print:text-black">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Luann Curioso</h1>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full border border-dark-100 px-4 py-2 font-mono font-bold hover:border-dark-50 print:hidden"
          >
            Print / Save as PDF
          </button>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-bold">Experience</h2>
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

        <section className="mt-8">
          <h2 className="text-xl font-bold">Skills</h2>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {skills.map((skill) => (
              <li key={skill.name}>
                {skill.name} ({skill.experience})
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold">Certifications</h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {certs.map((cert) => (
              <li key={cert.name}>
                {cert.name} — {cert.issued} ({cert.date})
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Resume;
