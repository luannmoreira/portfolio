import { useTranslation } from "react-i18next";
import { usesItems } from "../content/uses";

export default function Uses() {
  const { t, i18n } = useTranslation();

  return (
    <section id="uses" className="scroll-mt-32">
      <div className="mb-stack-sm flex items-center gap-4">
        <h2 className="font-headline-lg text-headline-lg">
          {t("uses.heading")}
        </h2>
        <div className="h-px flex-grow bg-outline-variant/30" />
      </div>
      <dl className="grid grid-cols-1 gap-stack-sm sm:grid-cols-2">
        {usesItems.map((item) => {
          const nameKey = `uses.items.${item.id}.name`;
          const noteKey = `uses.items.${item.id}.note`;
          const name = i18n.exists(nameKey) ? t(nameKey) : item.name;
          const note = i18n.exists(noteKey) ? t(noteKey) : undefined;

          return (
            <div key={item.id}>
              <dt className="mb-1 font-label-mono text-label-mono uppercase tracking-widest text-primary">
                {t(`uses.items.${item.id}.category`)}
              </dt>
              <dd className="font-headline-md text-[16px] font-semibold">
                {name}
              </dd>
              {note && (
                <dd className="text-sm text-on-surface-variant">{note}</dd>
              )}
            </div>
          );
        })}
      </dl>
    </section>
  );
}
