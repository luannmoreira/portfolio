import { test, expect } from "@playwright/test";

test("homepage loads with the correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Luann Curioso");
});

test("Hero content renders fully below the fixed navbar", async ({
  page,
}) => {
  await page.goto("/");

  const navBox = await page.getByRole("navigation").boundingBox();
  const heroLabel = page.getByText("Software Engineer", { exact: true });
  await expect(heroLabel).toBeVisible();
  const heroBox = await heroLabel.boundingBox();

  expect(navBox).not.toBeNull();
  expect(heroBox).not.toBeNull();
  // The Hero's first line of text must start below the navbar's bottom
  // edge — regression test for the navbar (fixed, out of flow) painting
  // over the page's first heading when nothing reserves its height.
  expect(heroBox!.y).toBeGreaterThanOrEqual(navBox!.y + navBox!.height);
});
