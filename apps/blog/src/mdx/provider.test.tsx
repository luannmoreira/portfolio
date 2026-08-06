import { render, screen } from "@testing-library/react";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "../components/mdx/mdxComponents";
import ProviderFixture from "./provider-fixture.mdx";

// Proves the registry actually reaches compiled MDX content, not just that
// each component works in isolation (already covered by 9.1-9.6's own
// tests). Without MDXProvider, MDX throws a "component not defined" error
// for an unregistered custom tag like <Decision>.
test("custom MDX components are reachable through MDXProvider", () => {
  render(
    <MDXProvider components={mdxComponents}>
      <ProviderFixture />
    </MDXProvider>
  );

  expect(screen.getByText("Use MDXProvider")).toBeInTheDocument();
  expect(
    screen.getByText(
      "Custom MDX components must be reachable from compiled content."
    )
  ).toBeInTheDocument();
  expect(screen.getByRole("note")).toBeInTheDocument();
});
