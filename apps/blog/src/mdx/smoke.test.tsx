import { render } from "@testing-library/react";
import Smoke from "./smoke.mdx";

// Proves the compiled pipeline (remark-gfm, rehype-slug,
// rehype-autolink-headings, rehype-pretty-code/Shiki), not real content —
// none of this markup renders unless every plugin listed in ROADMAP.md's
// 8.2 is actually wired into vite.config.js.

test("gives the heading a slug id, from rehype-slug", () => {
  const { container } = render(<Smoke />);
  const heading = container.querySelector("h2");

  expect(heading?.id).toBe("heading-with-anchor");
});

test("wraps the heading in an anchor link, from rehype-autolink-headings", () => {
  const { container } = render(<Smoke />);
  const heading = container.querySelector("h2");

  expect(
    heading?.querySelector("a[href='#heading-with-anchor']")
  ).not.toBeNull();
});

test("renders GFM strikethrough as <del>, from remark-gfm", () => {
  const { container } = render(<Smoke />);

  expect(container.querySelector("del")).not.toBeNull();
});

test("syntax-highlights the code block, from rehype-pretty-code/Shiki", () => {
  const { container } = render(<Smoke />);
  const pre = container.querySelector("pre");

  expect(pre).not.toBeNull();
  expect(pre?.querySelector("span[style]")).not.toBeNull();
});
