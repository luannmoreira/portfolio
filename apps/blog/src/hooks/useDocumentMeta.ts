import { useEffect } from "react";
import { useLocation } from "react-router";

// This app's own production URL — the custom domain both apps share
// (portfolio at "/", blog under "/blog"). Routes here are already absolute
// ("/blog", "/adr", ...), so pathname needs no extra prefix.
const SITE_URL = "https://luanncurioso.dev";
// Reuses the portfolio's icon — same origin, and the blog ships no
// OG-sized image of its own yet (only favicons).
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

function setAlternate(hreflang: string, href: string) {
  let link = document.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${hreflang}"]`
  );
  if (!link) {
    link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = hreflang;
    document.head.appendChild(link);
  }
  link.href = href;
}

export function useDocumentMeta(
  title: string,
  description?: string,
  image?: string
) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;
    setMetaByAttr("property", "og:title", title);
    setMetaByAttr("name", "twitter:title", title);
  }, [title]);

  useEffect(() => {
    // A future route that doesn't pass a description shouldn't keep
    // showing the *previous* route's — clear all three tags rather than
    // silently leaving stale content.
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

    // A post's own coverImage (already SITE_URL-relative, see schema.ts)
    // beats the site-wide default icon — "summary_large_image" only once
    // there's a real image big enough to warrant it; DEFAULT_OG_IMAGE is a
    // 180x180 icon, below the large-image minimum, so every other route
    // keeps "summary".
    const resolvedImage = image ? `${SITE_URL}${image}` : DEFAULT_OG_IMAGE;
    setMetaByAttr("property", "og:image", resolvedImage);
    setMetaByAttr(
      "name",
      "twitter:card",
      image ? "summary_large_image" : "summary"
    );
    setMetaByAttr("name", "twitter:image", resolvedImage);
  }, [pathname, image]);

  useEffect(() => {
    // Both locales render from the same path (resolveInitialLocale reads
    // ?lang= or localStorage, there's no per-locale route), so ?lang= is
    // the one addressable URL per language this site actually has — the
    // same query param the e2e a11y specs already use to force each
    // locale. x-default covers the un-suffixed URL a crawler with no
    // language preference lands on.
    const url = `${SITE_URL}${pathname}`;
    setAlternate("en", `${url}?lang=en`);
    setAlternate("pt-BR", `${url}?lang=pt-BR`);
    setAlternate("x-default", url);
  }, [pathname]);
}
