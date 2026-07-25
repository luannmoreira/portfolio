import { z } from "zod";

// Validates only what authors actually write in an .mdx file's frontmatter
// block. `type` is deliberately excluded here — it's derived from which
// content directory a file lives in (content/blog/, content/projects/,
// content/adr/), not hand-typed, so a file can never claim a type that
// disagrees with its own location.
const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().date(),
  tags: z.array(z.string()),
  excerpt: z.string().min(1),
  draft: z.boolean().default(false),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export function parseFrontmatter(data: unknown): Frontmatter {
  return frontmatterSchema.parse(data);
}
