import { buildRss, buildSitemap } from "./generate";
import type { ContentEntry } from "../content/schema";

const post: ContentEntry = {
  slug: "hello-world",
  type: "post",
  title: "Hello, Blog",
  date: "2026-07-20",
  tags: ["meta"],
  excerpt: "Placeholder entry.",
  draft: false,
  readingMinutes: 1,
};

const adr: ContentEntry = {
  slug: "0001-record",
  type: "adr",
  title: "First Decision",
  date: "2026-07-21",
  tags: [],
  excerpt: "A decision record.",
  draft: false,
  readingMinutes: 1,
};

const project: ContentEntry = {
  slug: "some-project",
  type: "project",
  title: "Some Project",
  date: "2026-07-22",
  tags: [],
  excerpt: "A project writeup.",
  draft: false,
  readingMinutes: 1,
};

const draftPost: ContentEntry = {
  ...post,
  slug: "draft-post",
  title: "Draft",
  draft: true,
};

describe("buildSitemap", () => {
  test("includes the static home, blog index, and adr index routes", () => {
    const xml = buildSitemap([], "https://example.com");

    expect(xml).toContain("<loc>https://example.com/</loc>");
    expect(xml).toContain("<loc>https://example.com/blog</loc>");
    expect(xml).toContain("<loc>https://example.com/adr</loc>");
  });

  test("includes a URL for each post and adr entry", () => {
    const xml = buildSitemap([post, adr], "https://example.com");

    expect(xml).toContain("<loc>https://example.com/blog/hello-world</loc>");
    expect(xml).toContain("<loc>https://example.com/adr/0001-record</loc>");
  });

  test("excludes project entries, since blog has no route rendering them", () => {
    const xml = buildSitemap([project], "https://example.com");

    expect(xml).not.toContain("some-project");
  });

  test("excludes draft entries", () => {
    const xml = buildSitemap([draftPost], "https://example.com");

    expect(xml).not.toContain("draft-post");
  });

  test("strips a trailing slash from the site URL before joining paths", () => {
    const xml = buildSitemap([post], "https://example.com/");

    expect(xml).toContain("<loc>https://example.com/blog/hello-world</loc>");
    expect(xml).not.toContain("https://example.com//blog");
  });
});

describe("buildRss", () => {
  test("includes an item for each non-draft post", () => {
    const xml = buildRss([post, draftPost], "https://example.com");

    expect(xml).toContain("<title>Hello, Blog</title>");
    expect(xml).toContain("<link>https://example.com/blog/hello-world</link>");
    expect(xml).not.toContain("Draft");
  });

  test("excludes adr and project entries", () => {
    const xml = buildRss([post, adr, project], "https://example.com");

    expect(xml).not.toContain("First Decision");
    expect(xml).not.toContain("Some Project");
  });

  test("escapes XML-sensitive characters in title and description", () => {
    const entry: ContentEntry = {
      ...post,
      title: 'A "quoted" & <tricky> title',
      excerpt: "Tom & Jerry's <excerpt>",
    };

    const xml = buildRss([entry], "https://example.com");

    expect(xml).toContain("A &quot;quoted&quot; &amp; &lt;tricky&gt; title");
    expect(xml).toContain("Tom &amp; Jerry&apos;s &lt;excerpt&gt;");
  });

  test("orders items newest first", () => {
    const older: ContentEntry = { ...post, slug: "older", date: "2026-01-01" };
    const newer: ContentEntry = { ...post, slug: "newer", date: "2026-06-01" };

    const xml = buildRss([older, newer], "https://example.com");

    expect(xml.indexOf("newer")).toBeLessThan(xml.indexOf("older"));
  });
});
