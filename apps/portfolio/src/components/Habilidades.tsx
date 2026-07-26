import SkillCard from "./CardHabilidades";
import HrCurve from "./HrCurve";
import { skills } from "../content/skills";

export default function Habilidades() {
  return (
    <section id="skills" className="mt-4 text-white light:text-dark-500">
      <h1 className="text-2xl font-bold">Skills</h1>
      <p className="font-light text-gray-400 light:text-gray-600">
        Here are some of my tech skills!
      </p>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
      <HrCurve />
    </section>
  );
}
