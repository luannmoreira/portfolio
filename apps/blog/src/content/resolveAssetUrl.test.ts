import { resolveAssetUrl } from "./resolveAssetUrl";

test("prefixes a content-asset path with the given base", () => {
  expect(resolveAssetUrl("/content/blog/en/my-post/cover.png", "/blog/")).toBe(
    "/blog/content/blog/en/my-post/cover.png"
  );
});

test("leaves the path unprefixed when base is the site root", () => {
  expect(resolveAssetUrl("/content/blog/en/my-post/cover.png", "/")).toBe(
    "/content/blog/en/my-post/cover.png"
  );
});

test("defaults to import.meta.env.BASE_URL when no base is passed", () => {
  expect(resolveAssetUrl("/content/blog/en/my-post/cover.png")).toBe(
    `${import.meta.env.BASE_URL}content/blog/en/my-post/cover.png`
  );
});
