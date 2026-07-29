import { useEffect, useState } from "react";
import type { RefObject } from "react";

interface UseActiveTimelineItemOptions {
  /** The horizontally-scrolling ancestor to measure against instead of the
   * page viewport — only read (via .current, inside the effect below,
   * never during render) when axis is "x". Its identity must stay stable
   * across renders, e.g. from useRef, so the effect doesn't reattach on
   * every render. */
  trackRef?: RefObject<Element | null>;
  rootMargin?: string;
  /** Which edge of each entry's bounding rect decides "closest to center":
   * top for a vertically stacked list, left for a horizontal track. */
  axis?: "x" | "y";
}

// Unlike useInView (fires once per element, then disconnects), this stays
// live for the page's lifetime — it's a scrollspy, tracking whichever
// milestone is currently nearest the viewport center as the user scrolls.
//
// `ids` must be referentially stable across renders (e.g. derived once at
// module scope, not a new array literal per render) — its identity is the
// effect's dependency.
export function useActiveTimelineItem(
  ids: string[],
  {
    trackRef,
    rootMargin = "-45% 0px -45% 0px",
    axis = "y",
  }: UseActiveTimelineItemOptions = {}
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const root = axis === "x" ? (trackRef?.current ?? null) : null;
    const edge = (rect: DOMRectReadOnly | { top: number; left: number }) =>
      axis === "x" ? rect.left : rect.top;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length === 0) return;

        const closestToCenter = intersecting.reduce((closest, entry) =>
          edge(entry.boundingClientRect) < edge(closest.boundingClientRect)
            ? entry
            : closest
        );
        setActiveId(closestToCenter.target.id);
      },
      { root, rootMargin, threshold: 0 }
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [ids, trackRef, rootMargin, axis]);

  return activeId;
}
