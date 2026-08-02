import { useEffect } from "react";
import { useLocation } from "react-router";

// This app's own production URL — the custom domain both apps share
// (portfolio at "/", blog under "/blog").
const SITE_URL = "https://luanncurioso.dev";
// A public/ asset (stable, unhashed path), not a src/assets import — the
// same URL index.html's static <meta property="og:image"> uses, so the
// runtime-updated tags stay consistent with the pre-JS baseline social
// crawlers actually see.
const DEFAULT_OG_IMAGE = `${SITE_URL}/apple-touch-icon.png`;

function setMetaByAttr(
  attr: "name" | "property",
  key: string,
  content: string
) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function setCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

export function useDocumentMeta(title: string, description?: string) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;
    setMetaByAttr("property", "og:title", title);
    setMetaByAttr("name", "twitter:title", title);
  }, [title]);

  useEffect(() => {
    // Every current page passes a description, but a future route that
    // doesn't shouldn't keep showing the *previous* route's description —
    // clear all three tags rather than silently leaving stale content.
    if (!description) {
      document.querySelector('meta[name="description"]')?.remove();
      document.querySelector('meta[property="og:description"]')?.remove();
      document.querySelector('meta[name="twitter:description"]')?.remove();
      return;
    }

    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    setMetaByAttr("property", "og:description", description);
    setMetaByAttr("name", "twitter:description", description);
  }, [description]);

  useEffect(() => {
    const url = `${SITE_URL}${pathname}`;
    setCanonical(url);
    setMetaByAttr("property", "og:url", url);
    setMetaByAttr("property", "og:type", "website");
    setMetaByAttr("property", "og:image", DEFAULT_OG_IMAGE);
    // "summary", not "summary_large_image" — matches index.html's static
    // baseline tags: DEFAULT_OG_IMAGE is a 180x180 icon, below Twitter's
    // large-image card minimum (300x157) but well above summary's (144x144).
    setMetaByAttr("name", "twitter:card", "summary");
    setMetaByAttr("name", "twitter:image", DEFAULT_OG_IMAGE);
  }, [pathname]);
}
