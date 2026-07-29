import { test, expect } from "@playwright/test";

test.describe("page navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  const pages = [
    {
      link: "About",
      path: "/about",
      heading: /solving problems and building/,
    },
    { link: "Resume", path: "/resume", heading: "Luann Curioso" },
    {
      link: "Contact",
      path: "/contact",
      heading: "Let's talk about engineering.",
    },
  ];

  for (const { link, path, heading } of pages) {
    test(`"${link}" nav link navigates to its page`, async ({ page }) => {
      await page
        .getByRole("navigation")
        .getByRole("link", { name: link })
        .click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(
        page.getByRole("heading", { name: heading, level: 1 })
      ).toBeVisible();
    });
  }

  // Uses is an anchor section (?section=id) on About, not its own route or
  // top-level nav item (see Navbar.tsx), so it's reached via direct deep
  // link rather than the generic h1-per-route loop above.
  test('"?section=uses" deep link scrolls to the Uses section', async ({
    page,
  }) => {
    await page.goto("/about?section=uses");
    await expect(
      page.getByRole("heading", { name: "Hardware & Software", level: 2 })
    ).toBeInViewport();
  });

  // The Engineering Timeline (Home) deep-links per milestone via a real
  // #hash rather than a single top-level nav item — see Timeline.tsx.
  test("a milestone hash deep link scrolls to and expands that milestone", async ({
    page,
  }) => {
    await page.goto("/#shellhub");

    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);
    await expect(
      page.locator("#shellhub").getByRole("heading", { name: "ShellHub" })
    ).toBeInViewport();
    // Only visible once the deep-linked milestone auto-expands.
    await expect(page.getByRole("link", { name: "shellhub.io" })).toBeVisible();
  });

  test("Resume page renders real experience content and a print button", async ({
    page,
  }) => {
    await page.goto("/resume");
    await expect(page.getByText(/ShellHub/).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /print/i })).toBeVisible();
  });

  test("Projects page renders real project entries and links out", async ({
    page,
  }) => {
    await page.goto("/projects");
    await expect(page.getByRole("heading", { name: "ShellHub" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /SEDEC \/ Invest MT/ })
    ).toHaveAttribute("href", "https://www.investmt.com.br/pt-br");
  });

  test("Uses section renders the real setup", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("VS Code", { exact: true })).toBeVisible();
    await expect(page.getByText("Two monitors")).toBeVisible();
  });

  test("Engineering Timeline renders real milestones across past, present, and future", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Videplast" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "The Most Boring Project Ever" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Conference Talks" })
    ).toBeVisible();
  });
});

test.describe("outbound links", () => {
  // Footer renders GitHub/LinkedIn/WhatsApp icon links (exact accessible
  // name) on every page; Contact additionally has named channel cards for
  // the same profiles ("Development GitHub", etc.), so match on exact name
  // to avoid ambiguity between the two.
  test("every GitHub link points to the same profile", async ({ page }) => {
    for (const path of ["/", "/contact"]) {
      await page.goto(path);
      const link = page.getByRole("link", { name: "GitHub", exact: true });
      await expect(link).toHaveAttribute(
        "href",
        "https://github.com/luannmoreira"
      );
      await expect(link).toHaveAttribute("target", "_blank");
    }
  });

  test("every LinkedIn link points to the same profile", async ({ page }) => {
    for (const path of ["/", "/contact"]) {
      await page.goto(path);
      const link = page.getByRole("link", { name: "LinkedIn", exact: true });
      await expect(link).toHaveAttribute(
        "href",
        "https://linkedin.com/in/luanncurioso"
      );
      await expect(link).toHaveAttribute("target", "_blank");
    }
  });

  test("WhatsApp link opens the right chat", async ({ page }) => {
    await page.goto("/contact");
    const link = page.getByRole("link", { name: "WhatsApp", exact: true });
    await expect(link).toHaveAttribute("href", /wa\.me\/5565999722455/);
    await expect(link).toHaveAttribute("target", "_blank");
  });
});
