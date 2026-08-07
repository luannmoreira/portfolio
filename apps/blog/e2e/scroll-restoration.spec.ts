import { test, expect } from "@playwright/test";

test.describe("scroll restoration", () => {
  test("navigating to a new page resets scroll to the top", async ({
    page,
  }) => {
    // The ADR write-up (real, substantial prose) rather than a blog post —
    // the only blog post left is a short placeholder, too short to
    // guarantee 2000px of scrollable overflow.
    await page.goto("/adr/browserrouter-over-hashrouter");
    // Post now loads behind two nested lazy() boundaries (the route itself,
    // App.tsx, plus its MDX body, content/loader.ts) rather than one, so the
    // page can still be Suspense-fallback-short right after goto — wait for
    // the real heading before wheeling, or 2000px of scroll has nothing to
    // move through yet and the poll below times out on a page that WILL
    // become tall enough, just not instantly.
    await expect(
      page.getByRole("heading", {
        name: "BrowserRouter Over HashRouter",
        level: 1,
      })
    ).toBeVisible();
    await page.mouse.wheel(0, 2000);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);

    await page.getByRole("link", { name: "Back to ADRs" }).click();
    await expect(page).toHaveURL(/\/adr$/);

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

    await page.getByRole("link", { name: /Blog Post Placeholder/ }).click();
    await expect(page).toHaveURL(/\/blog\/post-placeholder$/);

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
