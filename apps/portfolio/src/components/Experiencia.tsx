import CardExperiencia from "./CardExperiencia";
import { experience } from "../content/experience";

export default function Experiencia() {
  return (
    <section className="mb-stack-lg">
      <h2 className="mb-stack-md font-headline-lg text-headline-lg">
        Experience
      </h2>
      <ul className="flex flex-col gap-stack-sm">
        {experience.map((entry) => (
          <CardExperiencia
            key={`${entry.issued}-${entry.anoEntrada}`}
            {...entry}
          />
        ))}
      </ul>
    </section>
  );
}
