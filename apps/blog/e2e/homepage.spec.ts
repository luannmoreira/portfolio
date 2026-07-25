import { test, expect } from "@playwright/test";

// Scaffold-proving smoke test only — confirms the build/preview pipeline
// actually serves the app. Replaced/extended once real Home page content
// lands test-first in a later milestone.
test("homepage loads with the correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Blog");
});
