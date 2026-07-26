import { test, expect } from "@playwright/test";

test.describe("page navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  const pages = [
    {
      link: "About",
      hash: "#/about",
      heading: /solving problems and building/,
    },
    { link: "Resume", hash: "#/resume", heading: "Luann Curioso" },
    {
      link: "Contact",
      hash: "#/contact",
      heading: "Let's talk about engineering.",
    },
  ];

  for (const { link, hash, heading } of pages) {
    test(`"${link}" nav link navigates to its page`, async ({ page }) => {
      await page
        .getByRole("navigation")
        .getByRole("link", { name: link })
        .click();
      await expect(page).toHaveURL(new RegExp(`${hash}$`));
      await expect(
        page.getByRole("heading", { name: heading, level: 1 })
      ).toBeVisible();
    });
  }

  // Uses and Now are anchor sections (?section=id) on About/Home, not their
  // own routes, so they don't fit the generic h1-per-route loop above.
  test('"Uses" nav link navigates to its section', async ({ page }) => {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Uses" })
      .click();
    await expect(page).toHaveURL(/#\/about\?section=uses$/);
    await expect(
      page.getByRole("heading", { name: "Hardware & Software", level: 2 })
    ).toBeVisible();
  });

  test('"Now" nav link navigates to its section', async ({ page }) => {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Now" })
      .click();
    await expect(page).toHaveURL(/#\/\?section=now$/);
    await expect(
      page.getByRole("heading", { name: "Now", level: 2 })
    ).toBeVisible();
  });

  test("Resume page renders real experience content and a print button", async ({
    page,
  }) => {
    await page.goto("/#/resume");
    await expect(page.getByText(/ShellHub/).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /print/i })).toBeVisible();
  });

  test("Projects page renders real project entries and links out", async ({
    page,
  }) => {
    await page.goto("/#/projects");
    await expect(page.getByRole("heading", { name: "ShellHub" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /SEDEC \/ Invest MT/ })
    ).toHaveAttribute("href", "https://www.investmt.com.br/pt-br");
  });

  test("Uses section renders the real setup", async ({ page }) => {
    await page.goto("/#/about");
    await expect(page.getByText("VS Code", { exact: true })).toBeVisible();
    await expect(page.getByText("Two monitors")).toBeVisible();
  });

  test("Now section renders the real current focus", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("Rebranding as a software engineer")
    ).toBeVisible();
    await expect(
      page.getByText('"The Most Boring Project Ever"')
    ).toBeVisible();
  });
});

test.describe("outbound links", () => {
  // Footer renders GitHub/LinkedIn/WhatsApp icon links (exact accessible
  // name) on every page; Contact additionally has named channel cards for
  // the same profiles ("Development GitHub", etc.), so match on exact name
  // to avoid ambiguity between the two.
  test("every GitHub link points to the same profile", async ({ page }) => {
    for (const path of ["/", "/#/contact"]) {
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
    for (const path of ["/", "/#/contact"]) {
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
    await page.goto("/#/contact");
    const link = page.getByRole("link", { name: "WhatsApp", exact: true });
    await expect(link).toHaveAttribute("href", /wa\.me\/5565999722455/);
    await expect(link).toHaveAttribute("target", "_blank");
  });
});
