import { render, screen } from "@testing-library/react";
import Terminal from "./Terminal";

test("renders its content", () => {
  render(<Terminal>$ pnpm install</Terminal>);
  expect(screen.getByText("$ pnpm install")).toBeInTheDocument();
});

test("reuses Pre for its content pane, getting the copy button for free", () => {
  render(<Terminal>$ pnpm install</Terminal>);
  expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
});
