import TechIcon from "./TechIcon";
import { skills, type SkillCategory } from "../content/skills";

const categoryOrder: SkillCategory[] = [
  "Languages",
  "Front-end",
  "Testing",
  "Platform",
];

export default function EcosystemSection() {
  return (
    <div className="flex flex-col gap-4">
      {categoryOrder.map((category) => (
        <div key={category} className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-on-surface px-3 py-1.5 font-label-mono text-label-mono uppercase text-surface">
            {category}
          </span>
          {skills
            .filter((skill) => skill.category === category)
            .map((skill) => (
              <span
                key={skill.name}
                className="flex items-center gap-1.5 rounded border border-outline-variant/50 bg-surface-container-lowest px-3 py-1.5 font-label-mono text-label-mono text-secondary"
              >
                {skill.iconPath && (
                  <TechIcon path={skill.iconPath} className="h-3.5 w-3.5" />
                )}
                {skill.name}
                {skill.experience && (
                  <span className="rounded bg-surface-container-high px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">
                    {skill.experience}
                  </span>
                )}
              </span>
            ))}
        </div>
      ))}
    </div>
  );
}
