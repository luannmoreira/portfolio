import { loadContent, loadPostBody, getPostComponent } from "./loader";

// Exercised against the real placeholder files in
// content/{blog,projects,adr}/en/ — import.meta.glob resolves patterns
// against the actual filesystem at build time, so there's no isolated-
// fixture equivalent here. No pt-BR translations exist yet, so every
// locale-fallback test below is exercised by requesting "pt-BR" and
// observing the en content come back with isFallback: true.

const helloWorldLocation = {
  type: "post" as const,
  locale: "en" as const,
  slug: "hello-world",
};

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

test("derives locale from the containing locale subdirectory", () => {
  const helloWorld = loadContent().find(
    (entry) => entry.title === "Hello, Blog"
  );

  expect(helloWorld?.locale).toBe("en");
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

test("defaults to en and marks entries as not a fallback", () => {
  const helloWorld = loadContent().find(
    (entry) => entry.slug === "hello-world"
  );

  expect(helloWorld?.isFallback).toBe(false);
});

test("falls back to the en entry, flagged, when the requested locale has no translation", () => {
  const helloWorld = loadContent("pt-BR").find(
    (entry) => entry.slug === "hello-world"
  );

  expect(helloWorld?.locale).toBe("en");
  expect(helloWorld?.isFallback).toBe(true);
});

test("returns one entry per slug even across locale-fallback resolution", () => {
  const slugs = loadContent("pt-BR")
    .filter((entry) => entry.slug === "hello-world")
    .map((entry) => entry.slug);

  expect(slugs).toHaveLength(1);
});

test("loadPostBody returns a lazy loader resolving to the matching MDX component", async () => {
  const loader = loadPostBody(helloWorldLocation);
  expect(loader).toBeTypeOf("function");

  const mod = await loader!();
  expect(mod.default).toBeTypeOf("function");
});

test("loadPostBody returns undefined for an unknown slug", () => {
  expect(
    loadPostBody({ ...helloWorldLocation, slug: "does-not-exist" })
  ).toBeUndefined();
});

test("loadPostBody returns undefined for a locale the post isn't translated into", () => {
  expect(
    loadPostBody({ ...helloWorldLocation, locale: "pt-BR" })
  ).toBeUndefined();
});

test("getPostComponent returns the same component reference on repeated calls", () => {
  // Same reference matters: a React component created fresh each call would
  // reset its Suspense boundary's state every render.
  expect(getPostComponent(helloWorldLocation)).toBe(
    getPostComponent(helloWorldLocation)
  );
});

test("getPostComponent returns undefined for an unknown slug", () => {
  expect(
    getPostComponent({ ...helloWorldLocation, slug: "does-not-exist" })
  ).toBeUndefined();
});
