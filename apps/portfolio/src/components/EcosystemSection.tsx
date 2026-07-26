import TechIcon from "./TechIcon";
import { ecosystem } from "../content/ecosystem";

export default function EcosystemSection() {
  return (
    <div className="flex flex-col gap-4">
      {ecosystem.map((category) => (
        <div
          key={category.label}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="rounded bg-on-surface px-3 py-1.5 font-label-mono text-label-mono uppercase text-surface">
            {category.label}
          </span>
          {category.items.map((item) => (
            <span
              key={item.name}
              className="flex items-center gap-1.5 rounded border border-outline-variant/50 bg-surface-container-lowest px-3 py-1.5 font-label-mono text-label-mono text-secondary"
            >
              {item.iconPath && (
                <TechIcon path={item.iconPath} className="h-3.5 w-3.5" />
              )}
              {item.name}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
