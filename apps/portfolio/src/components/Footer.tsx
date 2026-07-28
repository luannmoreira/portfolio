import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import WhatsappIcon from "./icons/WhatsappIcon";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/30 bg-surface py-stack-md print:hidden">
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-4 px-margin-mobile md:flex-row lg:px-gutter">
        <p className="font-label-mono text-label-mono uppercase tracking-widest text-secondary">
          Luann Curioso
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a
              href="https://github.com/luannmoreira"
              rel="noreferrer"
              target="_blank"
              aria-label="GitHub"
              className="inline-flex items-center justify-center p-2.5 text-on-surface-variant opacity-80 transition-opacity hover:text-primary hover:opacity-100"
            >
              <GithubIcon className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/luanncurioso"
              rel="noreferrer"
              target="_blank"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center p-2.5 text-on-surface-variant opacity-80 transition-opacity hover:text-primary hover:opacity-100"
            >
              <LinkedinIcon className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/5565999722455?text=Ol%C3%A1%2C%20Luann!"
              rel="noreferrer"
              target="_blank"
              aria-label="WhatsApp"
              className="inline-flex items-center justify-center p-2.5 text-on-surface-variant opacity-80 transition-opacity hover:text-primary hover:opacity-100"
            >
              <WhatsappIcon className="h-6 w-6" />
            </a>
          </li>
        </ul>
        <p className="font-caption text-caption text-secondary">
          © {year} Luann Curioso. Built with precision.
        </p>
      </div>
    </footer>
  );
}
