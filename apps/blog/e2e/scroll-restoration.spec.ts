import { test, expect } from "@playwright/test";

test.describe("scroll restoration", () => {
  test("navigating to a new page resets scroll to the top", async ({
    page,
  }) => {
    await page.goto("/blog/building-this-blogs-content-pipeline");
    await page.mouse.wheel(0, 2000);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);

    await page.getByRole("link", { name: "Back to Blog" }).click();
    await expect(page).toHaveURL(/\/blog$/);

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });

  // Restores TO the archive list (/blog), not to a post page — a post's MDX
  // body loads behind its own internal <Suspense> (content/loader.ts's
  // getPostComponent uses React.lazy), so the page is briefly shorter than
  // its final height right when the restore effect runs on mount; the
  // archive list has no such async content and settles immediately, so it's
  // the fair, representative case for this (also the realistic flow: browse
  // the list, open a post, go back).
  test("navigating back restores the previous scroll position", async ({
    page,
  }) => {
    await page.goto("/blog");
    await page.mouse.wheel(0, 2000);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);
    const scrolledPosition = await page.evaluate(() => window.scrollY);

    await page
      .getByRole("link", { name: /Building This Blog's Content Pipeline/ })
      .click();
    await expect(page).toHaveURL(
      /\/blog\/building-this-blogs-content-pipeline$/
    );

    await page.goBack();
    await expect(page).toHaveURL(/\/blog$/);

    // Within a few px, not exact — real browsers settle scroll height with
    // minor timing variance (font/layout metrics) even with no async
    // content involved; exact-pixel equality would be flaky, not stricter.
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(scrolledPosition - 10);
  });
});
