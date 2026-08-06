import type { CSSProperties } from "react";
import { useInView } from "./useInView";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export type RevealVariant =
  "fade-up" | "fade-left" | "fade-right" | "flip-right";

const hiddenTransforms: Record<RevealVariant, string> = {
  "fade-up": "translateY(2rem)",
  "fade-left": "translateX(2rem)",
  "fade-right": "translateX(-2rem)",
  "flip-right": "perspective(2500px) rotateY(-100deg)",
};

interface UseRevealOptions {
  variant?: RevealVariant;
  duration?: number;
  offset?: number;
  /** Skips waiting for the scroll-triggered reveal — for elements that
   * should show their final state immediately (e.g. a deep-linked target
   * that never gets a scroll gesture to trigger it). */
  forceVisible?: boolean;
}

// Shared by Reveal.tsx (wraps children in its own <div>) and TimelineItem.tsx
// (applies the same fade-up transform/timing straight to an <li>, since
// Reveal's wrapper element can't be inserted there without breaking list
// semantics) — one source of truth for the transform/timing values and the
// reduced-motion bailout both need.
export function useReveal<T extends HTMLElement>({
  variant = "fade-up",
  duration = 500,
  offset = 0,
  forceVisible = false,
}: UseRevealOptions = {}) {
  const { ref, isInView } = useInView<T>({ offset });
  const prefersReducedMotion = usePrefersReducedMotion();
  const visible = isInView || forceVisible;

  const style: CSSProperties = prefersReducedMotion
    ? { opacity: 1, transform: "none", transition: "none" }
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hiddenTransforms[variant],
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      };

  return { ref, isInView: visible, prefersReducedMotion, style };
}
