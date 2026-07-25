import { test, expect } from "@playwright/test";

test.describe("page navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  const pages = [
    { link: "About", hash: "#/about", heading: "About me" },
    { link: "Resume", hash: "#/resume", heading: "Luann Curioso" },
    { link: "Projects", hash: "#/projects", heading: "Projects" },
    { link: "Uses", hash: "#/uses", heading: "Uses" },
    { link: "Now", hash: "#/now", heading: "Now" },
    { link: "Contact", hash: "#/contact", heading: "Be in touch!" },
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

  test("Resume page renders real experience content and a print button", async ({
    page,
  }) => {
    await page.goto("/#/resume");
    await expect(page.getByText(/ShellHub/)).toBeVisible();
    await expect(page.getByRole("button", { name: /print/i })).toBeVisible();
  });
});

test.describe("outbound links", () => {
  // GitHub/LinkedIn appear once on Home (Hero) and once on the Contact
  // page (its own route since 10.2) — not both on the same page anymore.
  test("every GitHub link points to the same profile", async ({ page }) => {
    for (const path of ["/", "/#/contact"]) {
      await page.goto(path);
      const link = page.getByRole("link", { name: "GitHub" });
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
      const link = page.getByRole("link", { name: "LinkedIn" });
      await expect(link).toHaveAttribute(
        "href",
        "https://linkedin.com/in/luanncurioso"
      );
      await expect(link).toHaveAttribute("target", "_blank");
    }
  });

  test("WhatsApp link opens the right chat", async ({ page }) => {
    await page.goto("/#/contact");
    const link = page.getByRole("link", { name: "WhatsApp" });
    await expect(link).toHaveAttribute("href", /wa\.me\/5565999722455/);
    await expect(link).toHaveAttribute("target", "_blank");
  });
});
