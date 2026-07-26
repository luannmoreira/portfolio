import HonorCard from "./CardExperiencia";
import HrCurve from "./HrCurve";
import { experience } from "../content/experience";

export default function Experiencia() {
  return (
    <section id="honors" className="mt-4 text-white light:text-dark-500">
      <h1 className="text-2xl font-bold">Experience</h1>
      <p className="font-light text-gray-400 light:text-gray-600">
        I present to you my professional experience!
      </p>

      <div className="flex flex-col md:flex-row mt-4 gap-5">
        {experience.map((entry) => (
          <HonorCard key={`${entry.issued}-${entry.anoEntrada}`} {...entry} />
        ))}
      </div>
      <HrCurve />
    </section>
  );
}
