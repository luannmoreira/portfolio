import { useEffect } from "react";
import { useLocation } from "react-router";

// This app's own production URL — unlike the blog (whose deploy target is
// still undecided, see apps/blog/src/feed/plugin.ts's PLACEHOLDER_SITE_URL),
// the portfolio's Cloudflare Pages URL is already fixed and is exactly what
// apps/blog/.env.production's VITE_PORTFOLIO_URL points back at.
const SITE_URL = "https://luanncurioso-portfolio.pages.dev";
// A public/ asset (stable, unhashed path), not a src/assets import — the
// same URL index.html's static <meta property="og:image"> uses, so the
// runtime-updated tags stay consistent with the pre-JS baseline social
// crawlers actually see.
const DEFAULT_OG_IMAGE = `${SITE_URL}/apple-touch-icon.png`;

function setMetaByAttr(attr: "name" | "property", key: string, content: string) {
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
    if (!description) return;

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
    setMetaByAttr("name", "twitter:card", "summary_large_image");
    setMetaByAttr("name", "twitter:image", DEFAULT_OG_IMAGE);
  }, [pathname]);
}
