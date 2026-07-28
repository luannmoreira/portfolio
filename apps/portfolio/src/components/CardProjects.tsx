import type { ReactNode } from "react";
import Reveal from "./Reveal";

export interface CardProjectsProps {
  name: string;
  description: string;
  tech: string[];
  link?: string;
  /** Skip the scroll-reveal wrapper — used where the card already renders
   * in view (e.g. the Home teaser, right below the hero). */
  animate?: boolean;
}

export default function CardProjects({
  name,
  description,
  tech,
  link,
  animate = true,
}: CardProjectsProps) {
  // Hover affordances (shadow lift, title color shift) only make sense
  // when the card is actually a link — applying them unconditionally made
  // non-interactive cards (no external `link`, e.g. OS Systems) look
  // clickable when they weren't.
  const content = (
    <div
      className={`flex h-full flex-col gap-4 rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-stack-sm transition-shadow ${
        link ? "hover:shadow-xl" : ""
      }`}
    >
      <h3
        className={`font-headline-md text-headline-md text-on-background transition-colors ${
          link ? "group-hover:text-primary" : ""
        }`}
      >
        {name}
      </h3>
      <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
        {description}
      </p>
      <ul className="mt-auto flex flex-wrap gap-2">
        {tech.map((item) => (
          <li
            key={item}
            className="rounded bg-surface-container px-3 py-1 font-label-mono text-label-mono text-on-surface-variant"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const card: ReactNode = animate ? (
    <Reveal variant="fade-up" duration={500} offset={100} className="h-full">
      {content}
    </Reveal>
  ) : (
    content
  );

  if (!link) {
    return <div className="h-full">{card}</div>;
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group block h-full"
    >
      {card}
    </a>
  );
}
