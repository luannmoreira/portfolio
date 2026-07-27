import DotCanvas from "./DotCanvas";
import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import WhatsappIcon from "./icons/WhatsappIcon";

export default function Contact() {
  return (
    <DotCanvas className="flex-1 pb-stack-lg pt-32">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-gutter">
        <section className="mb-stack-lg">
          <h1 className="mb-stack-sm max-w-2xl font-display text-display">
            <span className="text-plate">Let's talk about engineering.</span>
          </h1>
          <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant">
            <span className="text-plate">
              Always open to discussing technical architecture, software
              performance, or potential collaborations on complex systems. Reach
              out via the channels below.
            </span>
          </p>
        </section>

        <section className="grid grid-cols-1 gap-stack-sm md:grid-cols-2">
          <a
            href="mailto:luannmcurioso@gmail.com"
            className="group relative flex flex-col justify-between overflow-hidden border border-outline-variant/30 bg-surface/60 p-stack-md backdrop-blur-md transition-all duration-300 hover:border-primary"
          >
            <div className="mb-stack-md">
              <span className="mb-2 block font-label-mono text-label-mono uppercase text-secondary">
                Primary Channel
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary">
                Email
              </h2>
              <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                Direct communication for inquiries and technical discussions.
              </p>
            </div>
            <div className="flex items-center gap-2 font-bold text-primary transition-transform duration-300 group-hover:translate-x-2">
              <span className="font-body-md text-body-md">
                luannmcurioso@gmail.com
              </span>
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </div>
          </a>

          <div className="grid grid-cols-1 gap-stack-sm">
            <a
              href="https://linkedin.com/in/luanncurioso"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border border-outline-variant/30 bg-surface/60 p-stack-sm backdrop-blur-md transition-all duration-300 hover:border-primary"
            >
              <div className="flex items-center gap-stack-sm">
                <div className="rounded-lg bg-secondary-container/30 p-4">
                  <LinkedinIcon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <span className="block font-label-mono text-label-mono uppercase text-secondary">
                    Professional
                  </span>
                  <h3 className="font-headline-md text-headline-md text-primary">
                    LinkedIn
                  </h3>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-outline transition-colors group-hover:text-primary"
                aria-hidden="true"
              >
                open_in_new
              </span>
            </a>

            <a
              href="https://github.com/luannmoreira"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border border-outline-variant/30 bg-surface/60 p-stack-sm backdrop-blur-md transition-all duration-300 hover:border-primary"
            >
              <div className="flex items-center gap-stack-sm">
                <div className="rounded-lg bg-surface-container-high p-4">
                  <GithubIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="block font-label-mono text-label-mono uppercase text-secondary">
                    Development
                  </span>
                  <h3 className="font-headline-md text-headline-md text-primary">
                    GitHub
                  </h3>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-outline transition-colors group-hover:text-primary"
                aria-hidden="true"
              >
                open_in_new
              </span>
            </a>

            <a
              href="https://wa.me/5565999722455?text=Ol%C3%A1%2C%20Luann!"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border border-outline-variant/30 bg-surface/60 p-stack-sm backdrop-blur-md transition-all duration-300 hover:border-primary"
            >
              <div className="flex items-center gap-stack-sm">
                <div className="rounded-lg bg-surface-container-high p-4">
                  <WhatsappIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="block font-label-mono text-label-mono uppercase text-secondary">
                    Direct
                  </span>
                  <h3 className="font-headline-md text-headline-md text-primary">
                    WhatsApp
                  </h3>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-outline transition-colors group-hover:text-primary"
                aria-hidden="true"
              >
                open_in_new
              </span>
            </a>
          </div>
        </section>
      </div>
    </DotCanvas>
  );
}
