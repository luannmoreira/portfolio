import { Link } from "react-router";

import DotCanvas from "./DotCanvas";

export default function Hero() {
  return (
    <DotCanvas
      as="section"
      className="flex min-h-[70vh] items-center py-stack-lg"
    >
      <div className="mx-auto w-full max-w-container-max px-margin-mobile md:px-gutter">
        <div className="max-w-3xl">
          <p className="mb-stack-sm font-label-mono text-label-mono uppercase tracking-widest text-secondary">
            <span className="text-plate">Software Engineer</span>
          </p>
          <h1 className="mb-stack-sm font-display text-display leading-[1.1] text-on-background">
            <span className="text-plate">Building systems that scale.</span>
          </h1>
          <p className="mb-stack-md max-w-2xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
            <span className="text-plate">
              I'm a Software Engineer with production experience across
              front-end and infrastructure — from remote device management at
              ShellHub to government platforms, and the servers underneath them
              before that. I care about architecture, testing, and code that
              lasts, not just how it looks.
            </span>
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="rounded-lg bg-primary px-6 py-3 font-headline-md text-on-primary transition-colors hover:opacity-90"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="rounded-lg border border-outline bg-surface/60 px-6 py-3 font-headline-md text-primary backdrop-blur-md transition-colors hover:bg-surface-container"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute right-0 top-1/2 hidden h-full w-1/3 -translate-y-1/2 opacity-5 lg:block"
        aria-hidden="true"
      >
        <div className="h-full w-full border-l border-t border-primary" />
        <div className="absolute left-1/4 top-1/4 h-1/2 w-1/2 border-l border-t border-primary" />
      </div>
    </DotCanvas>
  );
}
