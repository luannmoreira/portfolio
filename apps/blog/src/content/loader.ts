import { lazy, type ComponentType } from "react";
import { parseFrontmatter, type Frontmatter } from "./schema";

export type ContentType = "post" | "project" | "adr";

export interface ContentEntry extends Frontmatter {
  slug: string;
  type: ContentType;
  readingTime: string;
}

function deriveType(path: string): ContentType {
  if (path.includes("/content/blog/")) return "post";
  if (path.includes("/content/projects/")) return "project";
  if (path.includes("/content/adr/")) return "adr";
  throw new Error(`Unrecognized content directory for path: ${path}`);
}

function deriveSlug(path: string): string {
  return path
    .split("/")
    .pop()!
    .replace(/\.mdx$/, "");
}

// Metadata-only globs: `import: "<name>"` pulls just that named export per
// file, without bundling each post's full compiled component into the index
// page's JS. Two separate globs (not one unfiltered eager glob) — intent is
// to avoid bundling every post's entire compiled component just to list
// titles, though see the note above the lazy glob below: that's not fully
// achieved yet. `readingTime` is computed at compile time by
// remark-reading-time.js (wired into vite.config.js) — it can't be read via
// a `?raw` import of the same file, since @mdx-js/rollup's transform filter
// strips query strings before matching, so that path gets compiled as MDX
// too rather than served as plain text.
const frontmatterModules = import.meta.glob(
  "/content/{blog,projects,adr}/*.mdx",
  { eager: true, import: "frontmatter" }
) as Record<string, unknown>;

const readingTimeModules = import.meta.glob(
  "/content/{blog,projects,adr}/*.mdx",
  { eager: true, import: "readingTime" }
) as Record<string, string>;

export function loadContent(): ContentEntry[] {
  return Object.entries(frontmatterModules)
    .map(([path, frontmatter]) => ({
      ...parseFrontmatter(frontmatter),
      slug: deriveSlug(path),
      type: deriveType(path),
      readingTime: readingTimeModules[path],
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

interface MdxModule {
  default: ComponentType;
}

// Lazy (not eager) — the intent is per-post code splitting, though see the
// note above the eager glob: that's not fully achieved yet.
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
