import { screen } from "@testing-library/react";
import { renderWithI18n } from "../../test-i18n";
import Terminal from "./Terminal";

test("renders its content", () => {
  renderWithI18n(<Terminal>$ pnpm install</Terminal>);
  expect(screen.getByText("$ pnpm install")).toBeInTheDocument();
});

test("reuses Pre for its content pane, getting the copy button for free", () => {
  renderWithI18n(<Terminal>$ pnpm install</Terminal>);
  expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
});
