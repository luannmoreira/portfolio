import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import type { TimelineMilestone, TimelineStatus } from "../content/timeline";

// Glyph shape (not just color) carries the status so it doesn't rely on
// color perception alone — matches the ✓ / ● / ○ states from the brief.
const statusGlyph: Record<TimelineStatus, string> = {
  completed: "✓",
  "in-progress": "●",
  planned: "○",
};

const statusLabel: Record<TimelineStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Planned",
};

// completed: subtle/faded. in-progress: the one accent color, visually
// emphasized. planned: muted, further faded than completed — matches
// prompt.md's "Subtle, slightly faded / Active, emphasized / Muted".
const statusColor: Record<TimelineStatus, string> = {
  completed: "text-on-surface-variant/70",
  "in-progress": "text-primary",
  planned: "text-outline/70",
};

// Card-level treatment per status, applied to the content wrapper below
// the status/year header row.
const cardStyle: Record<TimelineStatus, string> = {
  completed:
    "rounded-xl border border-outline-variant/30 bg-surface p-stack-sm transition-colors hover:border-primary/30",
  "in-progress":
    "rounded-xl border-2 border-primary bg-surface p-stack-sm shadow-lg",
  planned:
    "rounded-xl border border-dashed border-outline-variant/60 bg-surface-container/50 p-stack-sm text-secondary",
};

// The node sitting directly on the timeline itself (the vertical line on
// mobile, the horizontal one on desktop) — filled for completed/in-progress,
// a hollow ring for planned. border-background "cuts out" a ring around the
// dot from the line/page behind it, a common timeline-node treatment.
const dotStyle: Record<TimelineStatus, string> = {
  completed: "border-2 border-background bg-on-surface-variant",
  "in-progress": "border-2 border-background bg-primary",
  planned: "border-2 border-outline bg-background",
};

interface TimelineItemProps {
  milestone: TimelineMilestone;
  /** Currently nearest the viewport center, per the scrollspy hook. */
  isActive?: boolean;
  /** Set when a hash deep link targets this milestone — skips waiting for
   * the scroll-triggered reveal, since the item never gets a scroll
   * gesture to trigger it when the page lands directly on it. */
  forceVisible?: boolean;
  /** Set alongside forceVisible so a deep-linked milestone shows its full
   * content immediately, not just the collapsed summary. */
  forceExpanded?: boolean;
}

export default function TimelineItem({
  milestone,
  isActive = false,
  forceVisible = false,
  forceExpanded = false,
}: TimelineItemProps) {
  // Adjust `expanded` when `forceExpanded` newly turns true (the hash
  // target resolves after Timeline's own effect, on a later render of this
  // same instance) — done during render, not in an effect, per React's
  // "adjusting state when a prop changes" pattern: no extra render-and-
  // discard cascade, and it still lets the user collapse it again after.
  const [expanded, setExpanded] = useState(forceExpanded);
  const [prevForceExpanded, setPrevForceExpanded] = useState(forceExpanded);
  if (forceExpanded !== prevForceExpanded) {
    setPrevForceExpanded(forceExpanded);
    if (forceExpanded) setExpanded(true);
  }

  const hasExpandableContent = Boolean(
    milestone.details ||
    milestone.technologies?.length ||
    milestone.links?.length
  );
  const detailsId = `${milestone.id}-details`;

  // Reveal's own wrapper (a <div>) can't be used directly here — inserting
  // one between the <ol> and this <li> would break list semantics — so the
  // same fade-up transform/timing it uses is applied straight to the <li>,
  // driven by the same useInView/usePrefersReducedMotion hooks.
  const { ref, isInView } = useInView<HTMLLIElement>();
  const prefersReducedMotion = usePrefersReducedMotion();
  const visible = isInView || forceVisible;
  const revealStyle = prefersReducedMotion
    ? { opacity: 1, transform: "none", transition: "none" }
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(2rem)",
        transition: "opacity 500ms ease-out, transform 500ms ease-out",
      };

  return (
    <li
      ref={ref}
      id={milestone.id}
      style={revealStyle}
      aria-current={isActive ? "true" : undefined}
      className="relative border-l-2 border-outline-variant/30 pb-stack-sm pl-6 pt-0 md:w-72 md:flex-shrink-0 md:snap-start md:border-l-0 md:px-3 md:pb-10 md:pt-0"
    >
      {/* Node on the vertical line — mobile only; the line itself is each
          item's own border-l-2, which already reads as continuous since
          stacked items' left borders share the same x position. */}
      <span
        aria-hidden="true"
        data-pulse={milestone.status === "in-progress" ? "true" : undefined}
        className={`absolute left-0 top-1 h-3 w-3 -translate-x-1/2 rounded-full md:hidden ${
          dotStyle[milestone.status]
        } ${
          milestone.status === "in-progress" && !prefersReducedMotion
            ? "animate-pulse"
            : ""
        }`}
      />
      <div
        className={`mb-2 flex items-center gap-2 font-label-mono text-label-mono uppercase tracking-widest ${statusColor[milestone.status]}`}
      >
        <span aria-hidden="true">{statusGlyph[milestone.status]}</span>
        <span>{milestone.year}</span>
        <span>{statusLabel[milestone.status]}</span>
      </div>
      <div className={cardStyle[milestone.status]}>
        <h3 className="font-headline-md text-headline-md">{milestone.title}</h3>
        {milestone.subtitle && (
          <p className="font-body-md text-body-md text-on-surface-variant">
            {milestone.subtitle}
          </p>
        )}
        <p className="mt-2 font-body-md text-body-md leading-relaxed text-on-surface-variant">
          {milestone.summary}
        </p>
        {hasExpandableContent && (
          <>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={detailsId}
              onClick={() => setExpanded((value) => !value)}
              className="mt-2 flex items-center gap-1 font-label-mono text-label-mono uppercase tracking-widest text-primary"
            >
              <span aria-hidden="true">{expanded ? "▾" : "▸"}</span>
              Details
            </button>
            {expanded && (
              <div id={detailsId} className="mt-2">
                <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
                  {milestone.details ?? milestone.summary}
                </p>
                {milestone.technologies &&
                  milestone.technologies.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {milestone.technologies.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-full border border-outline-variant/30 px-3 py-1 font-label-mono text-label-mono text-on-surface-variant"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  )}
                {milestone.links && milestone.links.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-4">
                    {milestone.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-body-md text-body-md text-primary underline"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </div>
      {/* Stem + node on the horizontal line — desktop only. The line itself
          is this strip's own border-top, deliberately spanning the item's
          full outer width (md:-mx-3 cancels the item's own md:px-3) so
          adjacent items' strips touch edge-to-edge with zero gap, reading
          as one continuous line the whole row's width — no absolute
          overlay or scroll-width math needed. items-end on the track (see
          Timeline.tsx) aligns every item's bottom edge, and this strip is
          the last thing in the item, so the line lands at the same height
          for every card regardless of how tall its own content is. */}
      <div
        aria-hidden="true"
        className="mt-4 hidden md:flex md:flex-col md:items-center"
      >
        <span className="h-4 w-px bg-outline-variant/40" />
      </div>
      <div className="relative hidden md:block md:-mx-3 md:border-t-2 md:border-outline-variant/30">
        <span
          aria-hidden="true"
          data-pulse={milestone.status === "in-progress" ? "true" : undefined}
          className={`absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            dotStyle[milestone.status]
          } ${
            milestone.status === "in-progress" && !prefersReducedMotion
              ? "animate-pulse"
              : ""
          }`}
        />
      </div>
    </li>
  );
}
