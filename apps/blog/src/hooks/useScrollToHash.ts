import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

// <ScrollRestoration/> (App.tsx's Layout) already tries to scroll to
// location.hash, but its effect fires when Layout mounts — before Post's
// lazy MDX body (and the heading ids rehype-slug gives it) exists in the
// DOM, so a hard load of a URL like /blog/some-post#a-heading silently
// falls back to the top of the page. Mounted as a sibling to the lazy post
// body inside its own <Suspense>, this hook's effect only runs once that
// content — and the heading it targets — actually exists.
export function useScrollToHash() {
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) return;
    document
      .getElementById(decodeURIComponent(hash.slice(1)))
      ?.scrollIntoView();
  }, [hash]);
}
