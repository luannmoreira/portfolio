import { test, expect } from "@playwright/test";

test("blog index lists posts and links to the post page", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: "Writing" })).toBeVisible();

  await page.getByRole("link", { name: /Blog Post Placeholder/ }).click();
  await expect(page).toHaveURL("/blog/post-placeholder");
  await expect(
    page.getByRole("heading", { name: "Blog Post Placeholder", level: 1 })
  ).toBeVisible();
});

test("an unknown route shows the not-found page", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByText(/page not found/i)).toBeVisible();
});

test("a heading's self-link navigates to its own anchor", async ({ page }) => {
  await page.goto("/blog/post-placeholder");

  // level: 2 — the MDX content's own heading (autolinked by
  // rehype-autolink-headings), distinct from Post.tsx's page-title <h1>,
  // which isn't part of the MDX content and has no self-link.
  const heading = page.getByRole("heading", {
    name: "Blog Post Placeholder",
    level: 2,
  });
  await heading.getByRole("link").click();

  await expect(page).toHaveURL("/blog/post-placeholder#blog-post-placeholder");
});

test("ADR index lists ADRs and links to the ADR page", async ({ page }) => {
  await page.goto("/adr");
  await expect(
    page.getByRole("heading", { name: "Architecture Decision Records" })
  ).toBeVisible();

  await page
    .getByRole("link", { name: /BrowserRouter Over HashRouter/ })
    .click();
  await expect(page).toHaveURL("/adr/browserrouter-over-hashrouter");
  await expect(
    page.getByRole("heading", {
      name: "BrowserRouter Over HashRouter",
      level: 1,
    })
  ).toBeVisible();
});
