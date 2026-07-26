import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import {
  parseFrontmatter,
  type ContentEntry,
  type ContentType,
} from "../content/schema";
import { estimateReadingTime } from "../content/readingTime";

// Runs at Vite-config/build time (Node), not through Vite's module graph —
// import.meta.glob only resolves inside files Vite itself transforms, which
// vite.config.js's own imports (and this module) aren't. Also the source
// content/content-index virtual module (content/contentIndexPlugin.ts) reads
// at runtime — both go through this same function.
// process.cwd() is apps/blog for every way this runs (vitest, vite build,
// pnpm --filter blog), same assumption vite.config.js itself already makes.
const CONTENT_ROOT = join(process.cwd(), "content");

const CONTENT_DIRS: Record<ContentType, string> = {
  post: "blog",
  project: "projects",
  adr: "adr",
};

export function readContentEntries(): ContentEntry[] {
  return (Object.keys(CONTENT_DIRS) as ContentType[]).flatMap((type) => {
    const dir = join(CONTENT_ROOT, CONTENT_DIRS[type]);
    return readdirSync(dir)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const raw = readFileSync(join(dir, file), "utf-8");
        const { data, content } = matter(raw);
        return {
          ...parseFrontmatter(data),
          slug: file.replace(/\.mdx$/, ""),
          type,
          readingTime: estimateReadingTime(content),
        };
      });
  });
}
