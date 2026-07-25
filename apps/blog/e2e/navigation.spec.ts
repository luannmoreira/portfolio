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
