import { render, screen } from "@testing-library/react";
import CardHabilidades from "./CardHabilidades";

test("renders the skill name and experience as a compact row", () => {
  render(
    <CardHabilidades name="TypeScript" experience="2 years" img="/ts.svg" />
  );

  expect(screen.getByText("TypeScript")).toBeInTheDocument();
  expect(screen.getByText("2 years")).toBeInTheDocument();
});

test("renders the icon as decorative, not duplicating the visible name for screen readers", () => {
  render(
    <CardHabilidades name="TypeScript" experience="2 years" img="/ts.svg" />
  );

  // The name is already visible as text right next to the icon — giving
  // the icon its own accessible name too would announce it twice.
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});
