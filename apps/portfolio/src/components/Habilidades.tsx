import SkillCard from "./CardHabilidades";
import { skills, type SkillCategory } from "../content/skills";

const categories: { name: SkillCategory; icon: string }[] = [
  { name: "Languages", icon: "code" },
  { name: "Frameworks", icon: "layers" },
  { name: "Infrastructure", icon: "terminal" },
];

export default function Habilidades() {
  return (
    <section id="skills" className="mb-stack-lg">
      <h2 className="mb-stack-md font-headline-lg text-headline-lg">
        Technical Expertise
      </h2>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className="border border-outline-variant/30 bg-surface-container-lowest p-stack-sm transition-all duration-300 hover:border-primary"
          >
            <div className="mb-6 flex items-center gap-3">
              <span
                className="material-symbols-outlined text-primary"
                aria-hidden="true"
              >
                {category.icon}
              </span>
              <h3 className="font-headline-md text-headline-md">
                {category.name}
              </h3>
            </div>
            <ul className="space-y-4">
              {skills
                .filter((skill) => skill.category === category.name)
                .map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
