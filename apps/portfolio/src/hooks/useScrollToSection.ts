import { useEffect } from "react";
import { useSearchParams } from "react-router";

// Cross-page anchor nav (e.g. the "Skills"/"Uses"/"Now" nav items) carries a
// `?section=id` query param instead of a real `#hash`, since react-router
// doesn't scroll to hash fragments on navigation by default — the target
// page scrolls to the matching element itself on mount/param change.
export function useScrollToSection() {
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");

  useEffect(() => {
    if (!section) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";
    document.getElementById(section)?.scrollIntoView({ behavior });
  }, [section]);
}
