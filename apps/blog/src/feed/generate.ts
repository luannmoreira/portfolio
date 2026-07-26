import type { FeedEntry } from "./contentEntries";

// Only "post" and "adr" get a route that actually renders them
// (App.tsx: /blog/:slug, /adr/:slug). "project" content exists in the
// schema/loader for future use but has no route yet, so a sitemap/feed
// entry for it would point at a URL nothing serves.
type RoutableType = "post" | "adr";

const ROUTE_BASE: Record<RoutableType, string> = {
  post: "/blog",
  adr: "/adr",
};

function isRoutable(
  entry: FeedEntry
): entry is FeedEntry & { type: RoutableType } {
  return !entry.draft && (entry.type === "post" || entry.type === "adr");
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildSitemap(entries: FeedEntry[], siteUrl: string): string {
  const base = stripTrailingSlash(siteUrl);
  const paths = [
    "/",
    "/blog",
    "/adr",
    ...entries
      .filter(isRoutable)
      .map((entry) => `${ROUTE_BASE[entry.type]}/${entry.slug}`),
  ];

  const body = paths
    .map((path) => `  <url><loc>${base}${path}</loc></url>`)
    .join("\n");

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `${body}\n` +
    "</urlset>\n"
  );
}

export function buildRss(entries: FeedEntry[], siteUrl: string): string {
  const base = stripTrailingSlash(siteUrl);
  const posts = entries
    .filter((entry) => entry.type === "post" && !entry.draft)
    .sort((a, b) => b.date.localeCompare(a.date));

  const items = posts
    .map((post) => {
      const link = `${base}/blog/${post.slug}`;
      return [
        "  <item>",
        `    <title>${escapeXml(post.title)}</title>`,
        `    <link>${link}</link>`,
        `    <guid>${link}</guid>`,
        `    <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `    <description>${escapeXml(post.excerpt)}</description>`,
        "  </item>",
      ].join("\n");
    })
    .join("\n");

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0"><channel>\n' +
    "  <title>Blog</title>\n" +
    `  <link>${base}/blog</link>\n` +
    "  <description>Long-form engineering writing.</description>\n" +
    `${items}\n` +
    "</channel></rss>\n"
  );
}
