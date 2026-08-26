import { z } from "zod";
import type { Locale } from "@portfolio/i18n";

// Validates only what authors actually write in an .mdx file's frontmatter
// block. `type` is deliberately excluded here — it's derived from which
// content directory a file lives in (content/blog/, content/projects/,
// content/adr/), not hand-typed, so a file can never claim a type that
// disagrees with its own location. `locale` is excluded for the same
// reason — it's derived from the locale subdirectory a file lives in
// (content/blog/en/, content/blog/pt-BR/), not hand-typed.
const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().date(),
  tags: z.array(z.string()),
  excerpt: z.string().min(1),
  draft: z.boolean().default(false),
  /** Absolute path into apps/blog/public/content/<type>/<locale>/<slug>/,
   * e.g. "/content/blog/en/my-post/cover.png" — a plain static asset, not
   * a build-time-processed import. Optional: most posts have none. */
  coverImage: z.string().optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export function parseFrontmatter(data: unknown): Frontmatter {
  return frontmatterSchema.parse(data);
}

export type ContentType = "post" | "project" | "adr";

export interface ContentEntry extends Frontmatter {
  slug: string;
  type: ContentType;
  /** The real language this specific file is written in — derived from its
   * locale subdirectory, always accurate for the file it came from. Not to
   * be confused with a requested-but-unavailable locale: loader.ts's
   * loadContent() resolves those against this field and flags the result
   * with isFallback instead of ever faking this value. */
  locale: Locale;
  /** Minutes, not a pre-formatted string — "N min read" is locale-dependent
   * phrasing, rendered at display time via t("post.readingTime", { count }). */
  readingMinutes: number;
}
