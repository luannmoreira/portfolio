import { lazy, type ComponentType } from "react";
import contentIndex from "virtual:content-index";
import { DEFAULT_LOCALE, type Locale } from "@portfolio/i18n";
import type { ContentEntry, ContentType } from "./schema";
import { CONTENT_DIRS } from "./contentDirs";

export type { ContentType, ContentEntry } from "./schema";

export interface ResolvedContentEntry extends ContentEntry {
  /** True when the requested locale had no translation for this slug, so
   * this is the DEFAULT_LOCALE content instead — drives Post's "not
   * translated yet" notice. */
  isFallback: boolean;
}

// Groups the raw, per-locale entries (virtual:content-index carries every
// locale's files flattened together) by type+slug, then picks the exact
// locale match if one exists, else falls back to DEFAULT_LOCALE — a post
// always renders, in whatever language is actually available.
export function loadContent(
  locale: Locale = DEFAULT_LOCALE
): ResolvedContentEntry[] {
  const byKey = new Map<string, ContentEntry[]>();
  for (const entry of contentIndex as ContentEntry[]) {
    const key = `${entry.type}/${entry.slug}`;
    const group = byKey.get(key);
    if (group) group.push(entry);
    else byKey.set(key, [entry]);
  }

  const resolved = [...byKey.values()].map((group) => {
    const exact = group.find((entry) => entry.locale === locale);
    const chosen =
      exact ??
      group.find((entry) => entry.locale === DEFAULT_LOCALE) ??
      group[0];
    return { ...chosen, isFallback: chosen !== exact };
  });

  return resolved.sort((a, b) => b.date.localeCompare(a.date));
}

interface MdxModule {
  default: ComponentType;
}

export interface ContentLocation {
  type: ContentType;
  locale: Locale;
  slug: string;
}

function pathFor({ type, locale, slug }: ContentLocation): string {
  return `/content/${CONTENT_DIRS[type]}/${locale}/${slug}.mdx`;
}

// Nothing eagerly imports these same files anymore (metadata now comes from
// the virtual:content-index module, see contentIndexPlugin.ts) — so this
// lazy glob finally achieves real per-post code-splitting. The locale
// segment is spelled out statically ({en,pt-BR}) rather than built from
// SUPPORTED_LOCALES — import.meta.glob requires a literal pattern it can
// analyze at build time, so this must be kept in sync with locale.ts by
// hand.
const lazyModules = import.meta.glob<MdxModule>(
  "/content/{blog,projects,adr}/{en,pt-BR}/*.mdx"
);

export function loadPostBody(
  location: ContentLocation
): (() => Promise<MdxModule>) | undefined {
  return lazyModules[pathFor(location)];
}

// Cached at module scope, not inside a component — React requires lazy()
// components to have a stable identity across renders (creating one fresh
// per render resets its Suspense state every time).
const componentCache = new Map<string, ComponentType>();

export function getPostComponent(
  location: ContentLocation
): ComponentType | undefined {
  const key = pathFor(location);
  if (componentCache.has(key)) {
    return componentCache.get(key);
  }

  const loader = loadPostBody(location);
  if (!loader) return undefined;

  const Component = lazy(loader);
  componentCache.set(key, Component);
  return Component;
}
