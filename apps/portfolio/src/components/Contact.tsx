import { useTranslation } from "react-i18next";
import DotCanvas from "./DotCanvas";
import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import WhatsappIcon from "./icons/WhatsappIcon";
import MaterialIcon from "./icons/MaterialIcon";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <DotCanvas className="-mt-8 flex-1 pb-stack-lg pt-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-gutter">
        <section className="mb-stack-lg">
          <h1 className="mb-stack-sm max-w-2xl font-display text-display">
            <span className="text-plate">{t("contact.heading")}</span>
          </h1>
          <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant">
            <span className="text-plate">{t("contact.body")}</span>
          </p>
        </section>

        <section className="grid grid-cols-1 gap-stack-sm md:grid-cols-2">
          <a
            href="mailto:luannmcurioso@gmail.com"
            className="group relative flex flex-col justify-between overflow-hidden border border-outline-variant/30 bg-surface/60 p-stack-md backdrop-blur-md transition-all duration-300 hover:border-primary light:border-outline-variant/70"
          >
            <div className="mb-stack-md">
              <span className="mb-2 block font-label-mono text-label-mono uppercase text-primary">
                {t("contact.primaryChannel")}
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary">
                {t("contact.emailHeading")}
              </h2>
              <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                {t("contact.emailDesc")}
              </p>
            </div>
            <div className="flex items-center gap-2 font-bold text-primary transition-transform duration-300 group-hover:translate-x-2">
              <span className="font-body-md text-body-md">
                luannmcurioso@gmail.com
              </span>
              <MaterialIcon name="arrow_forward" className="h-5 w-5" />
            </div>
          </a>

          <div className="grid grid-cols-1 gap-stack-sm">
            <a
              href="https://linkedin.com/in/luanncurioso"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border border-outline-variant/30 bg-surface/60 p-stack-sm backdrop-blur-md transition-all duration-300 hover:border-primary light:border-outline-variant/70"
            >
              <div className="flex items-center gap-stack-sm">
                <div className="rounded-lg bg-secondary-container/30 p-4">
                  <LinkedinIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="block font-label-mono text-label-mono uppercase text-primary">
                    {t("contact.professional")}
                  </span>
                  <h2 className="font-headline-md text-headline-md text-primary">
                    LinkedIn
                  </h2>
                </div>
              </div>
              <MaterialIcon
                name="open_in_new"
                className="h-5 w-5 text-outline transition-colors group-hover:text-primary"
              />
            </a>

            <a
              href="https://github.com/luannmoreira"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border border-outline-variant/30 bg-surface/60 p-stack-sm backdrop-blur-md transition-all duration-300 hover:border-primary light:border-outline-variant/70"
            >
              <div className="flex items-center gap-stack-sm">
                <div className="rounded-lg bg-surface-container-high p-4">
                  <GithubIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="block font-label-mono text-label-mono uppercase text-primary">
                    {t("contact.development")}
                  </span>
                  <h2 className="font-headline-md text-headline-md text-primary">
                    GitHub
                  </h2>
                </div>
              </div>
              <MaterialIcon
                name="open_in_new"
                className="h-5 w-5 text-outline transition-colors group-hover:text-primary"
              />
            </a>

            <a
              href="https://wa.me/5565999722455?text=Ol%C3%A1%2C%20Luann!"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border border-outline-variant/30 bg-surface/60 p-stack-sm backdrop-blur-md transition-all duration-300 hover:border-primary light:border-outline-variant/70"
            >
              <div className="flex items-center gap-stack-sm">
                <div className="rounded-lg bg-surface-container-high p-4">
                  <WhatsappIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="block font-label-mono text-label-mono uppercase text-primary">
                    {t("contact.direct")}
                  </span>
                  <h2 className="font-headline-md text-headline-md text-primary">
                    WhatsApp
                  </h2>
                </div>
              </div>
              <MaterialIcon
                name="open_in_new"
                className="h-5 w-5 text-outline transition-colors group-hover:text-primary"
              />
            </a>
          </div>
        </section>
      </div>
    </DotCanvas>
  );
}
