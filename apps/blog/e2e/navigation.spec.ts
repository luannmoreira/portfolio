import { test, expect } from "@playwright/test";

test("blog index lists posts and links to the post page", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();

  await page.getByRole("link", { name: "Hello, Blog" }).click();
  await expect(page).toHaveURL("/blog/hello-world");
  await expect(
    page.getByRole("heading", { name: "Hello, Blog" })
  ).toBeVisible();
});

test("an unknown route shows the not-found page", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByText(/page not found/i)).toBeVisible();
});

test("a heading's self-link navigates to its own anchor", async ({ page }) => {
  await page.goto("/blog/hello-world");

  const heading = page.getByRole("heading", { name: "Hello, Blog" });
  await heading.getByRole("link").click();

  await expect(page).toHaveURL("/blog/hello-world#hello-blog");
});

test("ADR index lists ADRs and links to the ADR page", async ({ page }) => {
  await page.goto("/adr");
  await expect(
    page.getByRole("heading", { name: "Architecture Decision Records" })
  ).toBeVisible();

  await page.getByRole("link", { name: "ADR Placeholder" }).click();
  await expect(page).toHaveURL("/adr/placeholder");
  await expect(
    page.getByRole("heading", { name: "ADR Placeholder" })
  ).toBeVisible();
});
