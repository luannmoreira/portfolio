import { test, expect } from "@playwright/test";

test.describe("anchor navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  const sections = [
    { link: "About", hash: "#home", sectionId: "home" },
    { link: "Skills", hash: "#skills", sectionId: "skills" },
    { link: "Experience", hash: "#honors", sectionId: "honors" },
    { link: "Certificates", hash: "#certs", sectionId: "certs" },
    { link: "Contact", hash: "#contact", sectionId: "contact" },
  ];

  for (const { link, hash, sectionId } of sections) {
    test(`"${link}" nav link scrolls to its section`, async ({ page }) => {
      await page
        .getByRole("navigation")
        .getByRole("link", { name: link })
        .click();
      await expect(page).toHaveURL(new RegExp(`${hash}$`));
      await expect(page.locator(`#${sectionId}`)).toBeInViewport();
    });
  }
});

test.describe("outbound links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("resume link opens the PDF in a new tab", async ({ page }) => {
    const resumeLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "Resume" });
    await expect(resumeLink).toHaveAttribute("href", /resume.*\.pdf$/);
    await expect(resumeLink).toHaveAttribute("target", "_blank");
    await expect(resumeLink).toHaveAttribute("rel", "noreferrer");
  });

  test("every GitHub link points to the same profile", async ({ page }) => {
    const links = page.getByRole("link", { name: "GitHub" });
    await expect(links).toHaveCount(2); // Hero + Contact
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute(
        "href",
        "https://github.com/luannmoreira"
      );
      await expect(link).toHaveAttribute("target", "_blank");
    }
  });

  test("every LinkedIn link points to the same profile", async ({ page }) => {
    const links = page.getByRole("link", { name: "LinkedIn" });
    await expect(links).toHaveCount(2); // Hero + Contact
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute(
        "href",
        "https://linkedin.com/in/luanncurioso"
      );
      await expect(link).toHaveAttribute("target", "_blank");
    }
  });

  test("WhatsApp link opens the right chat", async ({ page }) => {
    const link = page.getByRole("link", { name: "WhatsApp" });
    await expect(link).toHaveAttribute("href", /wa\.me\/5565999722455/);
    await expect(link).toHaveAttribute("target", "_blank");
  });
});
