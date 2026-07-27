import { test, expect } from "@playwright/test";

test("/ redirects to the blog archive", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/blog$/);
  await expect(page).toHaveTitle("Writing — Blog");
  await expect(
    page.getByRole("heading", { name: "Writing", level: 1 })
  ).toBeVisible();
});
