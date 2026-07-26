import { useEffect } from "react";
import { useSearchParams } from "react-router";

// Cross-page anchor nav (e.g. the "Skills"/"Uses"/"Now" nav items) can't use
// a real URL hash fragment — HashRouter already owns `#` for the route
// itself — so anchor links carry a `?section=id` query param instead, and
// the target page scrolls to the matching element on mount/param change.
export function useScrollToSection() {
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");

  useEffect(() => {
    if (!section) return;
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  }, [section]);
}
