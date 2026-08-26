// Content-authored asset paths (coverImage, inline MDX images) are written
// as absolute paths anchored at this app's own root, e.g.
// "/content/blog/en/my-post/cover.png" (see schema.ts's coverImage doc).
// In production this app is merged under the portfolio's dist/blog/ (see
// the root "build:site" script) and served from that subpath — vite.config.js
// sets `base` to BASE_PATH ("/blog/") for that build, exposed at runtime as
// import.meta.env.BASE_URL. A literal "/content/..." string skips that
// prefix entirely, so every content-asset path needs to be resolved through
// this before use.
export function resolveAssetUrl(
  path: string,
  base: string = import.meta.env.BASE_URL
): string {
  return `${base}${path.replace(/^\//, "")}`;
}
