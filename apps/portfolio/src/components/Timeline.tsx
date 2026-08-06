import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import TimelineItem from "./TimelineItem";
import { useActiveTimelineItem } from "../hooks/useActiveTimelineItem";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { timelineMilestones } from "../content/timeline";
import type { TimelineMilestone } from "../content/timeline";

// Module scope, not per-render — useActiveTimelineItem depends on this
// array's identity staying stable across renders.
const milestoneIds = timelineMilestones.map((milestone) => milestone.id);
const milestoneIdSet = new Set(milestoneIds);

// Matches Tailwind's default `md` breakpoint — the track switches from a
// vertical stack to a horizontally-scrolling row here, per prompt.md.
const HORIZONTAL_BREAKPOINT = "(min-width: 768px)";

const REAL_YEAR = /^\d{4}$/;

// Below the horizontal breakpoint the track stacks vertically, so the full
// 18-milestone history is a long scroll before reaching the page footer —
// this caps the initial view, with a button to reveal the rest.
const MOBILE_VISIBLE_COUNT = 4;

export default function Timeline() {
  const { t, i18n } = useTranslation();
  const trackRef = useRef<HTMLOListElement>(null);
  const isHorizontal = useMediaQuery(HORIZONTAL_BREAKPOINT);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const resolvedMilestones: TimelineMilestone[] = timelineMilestones.map(
    (source) => {
      const subtitleKey = `timeline.milestones.${source.id}.subtitle`;
      const detailsKey = `timeline.milestones.${source.id}.details`;
      return {
        ...source,
        year: REAL_YEAR.test(source.year)
          ? source.year
          : t(`timeline.year.${source.year.toLowerCase()}`),
        title: t(`timeline.milestones.${source.id}.title`),
        subtitle: i18n.exists(subtitleKey) ? t(subtitleKey) : undefined,
        summary: t(`timeline.milestones.${source.id}.summary`),
        details: i18n.exists(detailsKey) ? t(detailsKey) : undefined,
      };
    }
  );

  // The scrollspy needs to measure against whichever axis is actually
  // scrolling: the page itself when stacked vertically on mobile, or the
  // track's own horizontal scroll on desktop/tablet (root: null would keep
  // measuring vertical viewport position, which never changes as the user
  // scrolls the row horizontally).
  const activeId = useActiveTimelineItem(milestoneIds, {
    trackRef,
    rootMargin: isHorizontal ? "0px -45% 0px -45%" : "-45% 0px -45% 0px",
    axis: isHorizontal ? "x" : "y",
  });

  // Derived straight from the URL on every render — no state needed, since
  // it's a pure function of location.hash. Only the scroll itself (an
  // external-system side effect) belongs in an effect.
  const location = useLocation();
  const rawHash = location.hash.replace(/^#/, "");
  const hashTarget = milestoneIdSet.has(rawHash) ? rawHash : null;

  // A hash deep link always needs its target present in the DOM to scroll
  // to, so it forces the full list open rather than requiring a click.
  const isMobileCollapsed =
    !isHorizontal &&
    !showAllMobile &&
    !hashTarget &&
    resolvedMilestones.length > MOBILE_VISIBLE_COUNT;
  const visibleMilestones = isMobileCollapsed
    ? resolvedMilestones.slice(0, MOBILE_VISIBLE_COUNT)
    : resolvedMilestones;

  useEffect(() => {
    if (!hashTarget) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";
    document
      .getElementById(hashTarget)
      ?.scrollIntoView({ behavior, block: "nearest", inline: "center" });
  }, [hashTarget]);

  // prompt.md: desktop supports wheel-to-horizontal scrolling on the track,
  // on top of the native trackpad/touch horizontal gestures overflow-x
  // already gives for free. Only active at the horizontal breakpoint — a
  // narrow window or a mouse on a tablet must keep normal page scrolling.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isHorizontal) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;
      track.scrollLeft += event.deltaY;
      event.preventDefault();
    };
    track.addEventListener("wheel", handleWheel, { passive: false });
    return () => track.removeEventListener("wheel", handleWheel);
  }, [isHorizontal]);

  return (
    <section
      id="timeline"
      className="scroll-mt-32 overflow-hidden bg-surface-container-lowest py-stack-lg"
    >
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-gutter">
        <div className="mb-stack-md">
          <span className="mb-2 block font-label-mono text-label-mono uppercase tracking-widest text-primary">
            {t("timeline.journeyLabel")}
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-background">
            {t("timeline.heading")}
          </h2>
        </div>
        <ol
          ref={trackRef}
          aria-label={t("timeline.trackLabel")}
          className="scrollbar-hide flex flex-col md:flex-row md:items-end md:overflow-x-auto md:snap-x md:snap-mandatory md:pb-4"
        >
          {visibleMilestones.map((milestone) => (
            <TimelineItem
              key={milestone.id}
              milestone={milestone}
              isActive={activeId === milestone.id}
              forceVisible={hashTarget === milestone.id}
              forceExpanded={hashTarget === milestone.id}
            />
          ))}
        </ol>
        {isMobileCollapsed && (
          <button
            type="button"
            onClick={() => setShowAllMobile(true)}
            className="mt-4 py-1 font-label-mono text-label-mono uppercase tracking-widest text-primary"
          >
            {t("timeline.showAll", {
              count: resolvedMilestones.length - MOBILE_VISIBLE_COUNT,
            })}
          </button>
        )}
      </div>
    </section>
  );
}
