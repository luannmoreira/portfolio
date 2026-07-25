import { loadContent } from "./loader";

// Exercised against the real placeholder files in content/{blog,projects,adr}/
// — import.meta.glob resolves patterns against the actual filesystem at
// build time, so there's no isolated-fixture equivalent here.

test("discovers content across all three directories", () => {
  const types = loadContent().map((entry) => entry.type);

  expect(types).toContain("post");
  expect(types).toContain("project");
  expect(types).toContain("adr");
});

test("derives slug from filename", () => {
  const helloWorld = loadContent().find(
    (entry) => entry.title === "Hello, Blog"
  );

  expect(helloWorld?.slug).toBe("hello-world");
});

test("validates every entry's frontmatter against the schema", () => {
  const entries = loadContent();

  expect(entries.length).toBeGreaterThan(0);
  entries.forEach((entry) => {
    expect(typeof entry.title).toBe("string");
    expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Array.isArray(entry.tags)).toBe(true);
    expect(typeof entry.excerpt).toBe("string");
    expect(typeof entry.draft).toBe("boolean");
  });
});

test("sorts entries by date, newest first", () => {
  const dates = loadContent().map((entry) => entry.date);
  const expectedOrder = [...dates].sort().reverse();

  expect(dates).toEqual(expectedOrder);
});
