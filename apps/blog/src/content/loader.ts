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
// per file, without bundling each post's full compiled component into the
// index page's JS. Full-content loading (code-split per post) is 8.4's job.
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
