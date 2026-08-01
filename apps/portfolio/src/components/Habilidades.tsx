import { useTranslation } from "react-i18next";
import EcosystemSection from "./EcosystemSection";

export default function Habilidades() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="mb-stack-lg scroll-mt-32">
      <h2 className="mb-2 font-headline-lg text-headline-lg">
        {t("skills.heading")}
      </h2>
      <p className="mb-stack-md font-body-md text-body-md text-on-surface-variant">
        {t("skills.subtitle")}
      </p>
      <EcosystemSection />
    </section>
  );
}
