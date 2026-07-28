import { nowItems, nowLastUpdated } from "../content/now";
import MaterialIcon from "./icons/MaterialIcon";
import type { MaterialIconName } from "./icons/MaterialIcon";

// https://nownownow.com convention. First item spans 2 columns — it's the
// meta one (why this site/rewrite exists), the rest are equal-weight.
const icons: MaterialIconName[] = [
  "engineering",
  "hub",
  "cloud",
  "edit_note",
  "science",
];

export default function Now() {
  return (
    <section
      id="now"
      className="scroll-mt-32 bg-surface-container-lowest py-stack-lg"
    >
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-gutter">
        <div className="mb-stack-md flex flex-col items-end justify-between gap-4 md:flex-row">
          <div>
            <span className="mb-2 block font-label-mono text-label-mono uppercase tracking-widest text-secondary">
              Current Focus
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-background">
              Now
            </h2>
          </div>
          <div className="border-l-2 border-outline-variant pl-4 font-body-md text-body-md italic text-on-surface-variant">
            Last updated: {nowLastUpdated}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {nowItems.map((item, index) => (
            <div
              key={item.title}
              className={`rounded-xl border border-outline-variant/30 bg-surface p-stack-sm ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="mb-stack-sm flex items-center gap-3">
                <MaterialIcon
                  name={icons[index] ?? "circle"}
                  className="h-5 w-5 text-primary"
                />
                <h3 className="font-headline-md text-headline-md">
                  {item.title}
                </h3>
              </div>
              <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
