import { render } from "@testing-library/react";
import Mermaid from "./mermaid.mdx";

// Proves the build-time Mermaid rendering strategy (open question #2,
// resolved: rehype-mermaid, inline-svg, backed by Playwright — already a
// dependency for e2e, so no new browser-automation toolchain). A
// ```mermaid fenced block must compile to a real inline <svg>, not a raw
// code block, and the plugin must run before rehype-pretty-code so it sees
// the mermaid block before syntax highlighting would otherwise claim it.
test("compiles a mermaid code block to an inline SVG diagram", () => {
  const { container } = render(<Mermaid />);

  const svg = container.querySelector("svg");
  expect(svg).not.toBeNull();
  expect(svg?.querySelectorAll("*").length).toBeGreaterThan(0);
  expect(container.textContent).not.toContain("graph TD");
}, 30_000);

// Diagrams sit on a fixed #0a0d11 card (index.css, svg.flowchart) — edges
// need WCAG's 3:1 non-text contrast against it or the arrows disappear.
test("draws diagram edges with at least 3:1 contrast on the dark card", () => {
  const { container } = render(<Mermaid />);

  const css = container.querySelector("svg style")?.textContent ?? "";
  const stroke = css.match(/\.flowchart-link\{stroke:(#[0-9a-f]{6})/i)?.[1];
  expect(stroke).toBeDefined();

  const luminance = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrast = (luminance(stroke!) + 0.05) / (luminance("#0a0d11") + 0.05);
  expect(contrast).toBeGreaterThanOrEqual(3);
}, 30_000);
