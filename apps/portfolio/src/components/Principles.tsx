import { useTranslation } from "react-i18next";
import { principles } from "../content/principles";

export default function Principles() {
  const { t } = useTranslation();

  return (
    <section className="mb-stack-lg border border-outline-variant/20 bg-surface-container-low p-stack-md light:border-outline-variant/60 light:shadow-sm">
      <div className="flex flex-col gap-gutter md:flex-row">
        <div className="md:w-1/3">
          <h2 className="mb-4 font-headline-lg text-headline-lg leading-tight">
            {t("principles.heading")}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {t("principles.intro")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:w-2/3">
          {principles.map((principle, index) => (
            <div key={principle.id}>
              <div className="mb-2 font-label-mono text-label-mono text-primary">
                {`${String(index + 1).padStart(2, "0")}. ${t(`principles.items.${principle.id}.title`)}`}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t(`principles.items.${principle.id}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
