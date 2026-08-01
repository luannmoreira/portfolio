import { loadContent, loadPostBody, getPostComponent } from "./loader";

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

test("computes a reading time estimate for every entry", () => {
  const entries = loadContent();

  expect(entries.length).toBeGreaterThan(0);
  entries.forEach((entry) => {
    expect(entry.readingMinutes).toBeGreaterThanOrEqual(1);
  });
});

test("loadPostBody returns a lazy loader resolving to the matching MDX component", async () => {
  const loader = loadPostBody("hello-world");
  expect(loader).toBeTypeOf("function");

  const mod = await loader!();
  expect(mod.default).toBeTypeOf("function");
});

test("loadPostBody returns undefined for an unknown slug", () => {
  expect(loadPostBody("does-not-exist")).toBeUndefined();
});

test("getPostComponent returns the same component reference on repeated calls", () => {
  // Same reference matters: a React component created fresh each call would
  // reset its Suspense boundary's state every render.
  expect(getPostComponent("hello-world")).toBe(getPostComponent("hello-world"));
});

test("getPostComponent returns undefined for an unknown slug", () => {
  expect(getPostComponent("does-not-exist")).toBeUndefined();
});
