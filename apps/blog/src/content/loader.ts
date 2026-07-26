import { lazy, type ComponentType } from "react";
import contentIndex from "virtual:content-index";
import type { ContentEntry } from "./schema";

export type { ContentType, ContentEntry } from "./schema";

function deriveSlug(path: string): string {
  return path
    .split("/")
    .pop()!
    .replace(/\.mdx$/, "");
}

export function loadContent(): ContentEntry[] {
  return [...contentIndex].sort((a, b) => b.date.localeCompare(a.date));
}

interface MdxModule {
  default: ComponentType;
}

// Nothing eagerly imports these same files anymore (metadata now comes from
// the virtual:content-index module, see contentIndexPlugin.ts) — so this
// lazy glob finally achieves real per-post code-splitting.
const lazyModules = import.meta.glob<MdxModule>(
  "/content/{blog,projects,adr}/*.mdx"
);

export function loadPostBody(
  slug: string
): (() => Promise<MdxModule>) | undefined {
  const match = Object.entries(lazyModules).find(
    ([path]) => deriveSlug(path) === slug
  );
  return match?.[1];
}

// Cached at module scope, not inside a component — React requires lazy()
// components to have a stable identity across renders (creating one fresh
// per render resets its Suspense state every time).
const componentCache = new Map<string, ComponentType>();

export function getPostComponent(slug: string): ComponentType | undefined {
  if (componentCache.has(slug)) {
    return componentCache.get(slug);
  }

  const loader = loadPostBody(slug);
  if (!loader) return undefined;

  const Component = lazy(loader);
  componentCache.set(slug, Component);
  return Component;
}
