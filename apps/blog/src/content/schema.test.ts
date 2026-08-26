import { parseFrontmatter } from "./schema";

const validFrontmatter = {
  title: "Why We Migrated to pnpm Workspaces",
  date: "2026-07-25",
  tags: ["monorepo", "tooling"],
  excerpt: "A short summary of the migration.",
};

test("parses valid frontmatter", () => {
  const result = parseFrontmatter(validFrontmatter);

  expect(result).toEqual({ ...validFrontmatter, draft: false });
});

test("defaults draft to false when omitted", () => {
  const result = parseFrontmatter(validFrontmatter);

  expect(result.draft).toBe(false);
});

test("respects an explicit draft: true", () => {
  const result = parseFrontmatter({ ...validFrontmatter, draft: true });

  expect(result.draft).toBe(true);
});

test("coverImage is absent by default", () => {
  const result = parseFrontmatter(validFrontmatter);

  expect(result.coverImage).toBeUndefined();
});

test("passes through an explicit coverImage", () => {
  const result = parseFrontmatter({
    ...validFrontmatter,
    coverImage: "/content/blog/en/my-post/cover.png",
  });

  expect(result.coverImage).toBe("/content/blog/en/my-post/cover.png");
});

test("throws when a required field is missing", () => {
  const withoutTitle = {
    date: validFrontmatter.date,
    tags: validFrontmatter.tags,
    excerpt: validFrontmatter.excerpt,
  };

  expect(() => parseFrontmatter(withoutTitle)).toThrow();
});

test("throws when date isn't in YYYY-MM-DD format", () => {
  expect(() =>
    parseFrontmatter({ ...validFrontmatter, date: "July 25th, 2026" })
  ).toThrow();
});

test("throws when tags isn't an array of strings", () => {
  expect(() =>
    parseFrontmatter({ ...validFrontmatter, tags: "monorepo" })
  ).toThrow();
});
