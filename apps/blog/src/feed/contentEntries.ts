import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { ContentType } from "../content/loader";
import { parseFrontmatter, type Frontmatter } from "../content/schema";

export interface FeedEntry extends Frontmatter {
  slug: string;
  type: ContentType;
}

// Runs at Vite-config/build time (Node), not through Vite's module graph —
// import.meta.glob (content/loader.ts's approach) only resolves inside
// files Vite itself transforms, which vite.config.js's own imports aren't.
// process.cwd() is apps/blog for every way this runs (vitest, vite build,
// pnpm --filter blog), same assumption vite.config.js itself already makes.
const CONTENT_ROOT = join(process.cwd(), "content");

const CONTENT_DIRS: Record<ContentType, string> = {
  post: "blog",
  project: "projects",
  adr: "adr",
};

export function readContentEntries(): FeedEntry[] {
  return (Object.keys(CONTENT_DIRS) as ContentType[]).flatMap((type) => {
    const dir = join(CONTENT_ROOT, CONTENT_DIRS[type]);
    return readdirSync(dir)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const raw = readFileSync(join(dir, file), "utf-8");
        const { data } = matter(raw);
        return {
          ...parseFrontmatter(data),
          slug: file.replace(/\.mdx$/, ""),
          type,
        };
      });
  });
}
