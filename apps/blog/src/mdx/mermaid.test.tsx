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
