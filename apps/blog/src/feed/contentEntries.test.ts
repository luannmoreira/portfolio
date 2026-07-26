import { readContentEntries } from "./contentEntries";

// Exercised against the real placeholder files in content/{blog,projects,adr}/
// — same convention as content/loader.test.ts, since these read the same
// directories (via Node fs here rather than import.meta.glob, since this
// runs at Vite-config time, outside the browser module graph).

test("discovers content across all three directories", () => {
  const types = readContentEntries().map((entry) => entry.type);

  expect(types).toContain("post");
  expect(types).toContain("project");
  expect(types).toContain("adr");
});

test("derives slug from filename", () => {
  const helloWorld = readContentEntries().find(
    (entry) => entry.title === "Hello, Blog"
  );

  expect(helloWorld?.slug).toBe("hello-world");
});

test("validates every entry's frontmatter against the schema", () => {
  const entries = readContentEntries();

  expect(entries.length).toBeGreaterThan(0);
  entries.forEach((entry) => {
    expect(typeof entry.title).toBe("string");
    expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Array.isArray(entry.tags)).toBe(true);
    expect(typeof entry.excerpt).toBe("string");
    expect(typeof entry.draft).toBe("boolean");
  });
});
