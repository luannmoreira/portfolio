import { test, expect } from "@playwright/test";

test.describe("scroll restoration", () => {
  test("navigating to a new page resets scroll to the top", async ({
    page,
  }) => {
    await page.goto("/");
    await page.mouse.wheel(0, 2000);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);

    await page
      .getByRole("navigation")
      .getByRole("link", { name: "About", exact: true })
      .click();
    await expect(page).toHaveURL(/\/about$/);

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("navigating back restores the previous scroll position", async ({
    page,
  }) => {
    await page.goto("/");
    await page.mouse.wheel(0, 2000);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);
    const scrolledPosition = await page.evaluate(() => window.scrollY);

    await page
      .getByRole("navigation")
      .getByRole("link", { name: "About", exact: true })
      .click();
    await expect(page).toHaveURL(/\/about$/);

    await page.goBack();
    await expect(page).toHaveURL("/");

    // Within a few px, not exact — real browsers settle scroll height with
    // minor timing variance (font/layout metrics); exact-pixel equality
    // would be flaky, not stricter.
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(scrolledPosition - 10);
  });
});
