import { lazy, type ComponentType } from "react";
import { parseFrontmatter, type Frontmatter } from "./schema";

export type ContentType = "post" | "project" | "adr";

export interface ContentEntry extends Frontmatter {
  slug: string;
  type: ContentType;
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

// Metadata-only glob: `import: "frontmatter"` pulls just that named export
// per file. Intent is to avoid bundling every post's full compiled component
// into the index page's JS — but because the same files are also lazily
// imported below, Rollup currently keeps them in the main chunk anyway
// (logs an INEFFECTIVE_DYNAMIC_IMPORT warning at build time). Harmless at
// today's content volume; real code-splitting is deferred to ROADMAP.md's
// Phase 12.3 ("code-split routes"), which exists for exactly this.
const modules = import.meta.glob("/content/{blog,projects,adr}/*.mdx", {
  eager: true,
  import: "frontmatter",
}) as Record<string, unknown>;

export function loadContent(): ContentEntry[] {
  return Object.entries(modules)
    .map(([path, frontmatter]) => ({
      ...parseFrontmatter(frontmatter),
      slug: deriveSlug(path),
      type: deriveType(path),
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
