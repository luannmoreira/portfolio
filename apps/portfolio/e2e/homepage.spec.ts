import { test, expect } from "@playwright/test";

test("homepage loads with the correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Luann Curioso");
});
