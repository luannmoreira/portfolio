import { screen } from "@testing-library/react";
import { renderWithI18n } from "../../test-i18n";
import Callout, { type CalloutVariant } from "./Callout";

test("renders its children", () => {
  renderWithI18n(<Callout variant="note">Some content</Callout>);
  expect(screen.getByText("Some content")).toBeInTheDocument();
});

test.each<[CalloutVariant, string]>([
  ["decision", "Decision"],
  ["tradeoff", "Trade-off"],
  ["warning", "Warning"],
  ["tip", "Tip"],
  ["note", "Note"],
])("defaults the title to %s's label", (variant, expectedLabel) => {
  renderWithI18n(<Callout variant={variant}>content</Callout>);
  expect(screen.getByText(expectedLabel)).toBeInTheDocument();
});

test("uses a custom title when provided, instead of the variant default", () => {
  renderWithI18n(
    <Callout variant="decision" title="Use pnpm workspaces">
      content
    </Callout>
  );
  expect(screen.getByText("Use pnpm workspaces")).toBeInTheDocument();
  expect(screen.queryByText("Decision")).not.toBeInTheDocument();
});

test("renders an icon for every variant", () => {
  const variants: CalloutVariant[] = [
    "decision",
    "tradeoff",
    "warning",
    "tip",
    "note",
  ];

  variants.forEach((variant) => {
    const { container, unmount } = renderWithI18n(
      <Callout variant={variant}>content</Callout>
    );
    expect(container.querySelector("svg")).not.toBeNull();
    unmount();
  });
});

test("exposes an accessible note role for assistive tech", () => {
  renderWithI18n(<Callout variant="tip">content</Callout>);
  expect(screen.getByRole("note")).toBeInTheDocument();
});
