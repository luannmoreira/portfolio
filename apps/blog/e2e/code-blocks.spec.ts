import { test, expect } from "@playwright/test";

// A post with both a highlighted code block and a <Terminal>, each with a
// long first line — the case where an overlaid copy button hides code.
const POST = "/blog/how-did-i-use-ai-skill-core-principles-to-base-a-big-app";

test("the copy button never covers the first line of code", async ({
  page,
}) => {
  await page.goto(POST);

  const blocks = page.locator(".prose pre");
  await expect(blocks.first()).toBeVisible();

  const overlaps = await blocks.evaluateAll((pres) =>
    pres.map((pre) => {
      const button = pre.parentElement!.querySelector("button")!;
      const range = document.createRange();
      range.selectNodeContents(pre);
      const line = range.getClientRects()[0];
      const box = button.getBoundingClientRect();
      return (
        box.left < line.right &&
        box.right > line.left &&
        box.top < line.bottom &&
        box.bottom > line.top
      );
    })
  );

  expect(overlaps.length).toBeGreaterThan(0);
  expect(overlaps).not.toContain(true);
});
