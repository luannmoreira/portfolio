import { useTranslation } from "react-i18next";
import TechIcon from "./TechIcon";
import { skills, type SkillCategory } from "../content/skills";

const categoryOrder: SkillCategory[] = [
  "Languages",
  "Front-end",
  "Testing",
  "Platform",
];

// Translation key segments for each category — kept separate from the
// SkillCategory union itself (which stays English and is only ever used
// for filtering/grouping, never rendered directly).
const categoryKey: Record<SkillCategory, string> = {
  Languages: "languages",
  "Front-end": "frontEnd",
  Testing: "testing",
  Platform: "platform",
};

export default function EcosystemSection() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      {categoryOrder.map((category) => (
        <div key={category} className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-on-surface px-3 py-1.5 font-label-mono text-label-mono uppercase text-surface">
            {t(`skills.category.${categoryKey[category]}`)}
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
              </span>
            ))}
        </div>
      ))}
    </div>
  );
}
