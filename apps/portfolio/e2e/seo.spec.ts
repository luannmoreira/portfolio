import { test, expect } from "@playwright/test";

test.describe("SEO metadata", () => {
  test("homepage has a canonical link, OG tags, and JSON-LD Person data", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://luanncurioso-portfolio.pages.dev/"
    );
    await expect(
      page.locator('meta[property="og:title"]')
    ).toHaveAttribute("content", "Luann Curioso");
    await expect(
      page.locator('meta[property="og:type"]')
    ).toHaveAttribute("content", "website");
    await expect(
      page.locator('meta[name="twitter:card"]')
    ).toHaveAttribute("content", "summary_large_image");

    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const data = JSON.parse(jsonLd ?? "{}");
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Luann Curioso");
  });

  test("canonical and og:url update to match the current route", async ({
    page,
  }) => {
    await page.goto("/about");

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://luanncurioso-portfolio.pages.dev/about"
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      "https://luanncurioso-portfolio.pages.dev/about"
    );
    // Exactly one of each — a stale duplicate left behind by a prior route
    // would silently confuse crawlers about which URL is canonical.
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });

  test("sitemap.xml and robots.txt are served", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).toContain("<urlset");

    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBe(true);
    expect(await robots.text()).toContain("Sitemap:");
  });
});
