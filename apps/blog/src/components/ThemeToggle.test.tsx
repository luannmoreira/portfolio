import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import ThemeToggle from "./ThemeToggle";

test("labels itself for switching to light theme while dark is active", () => {
  render(<ThemeToggle theme="dark" toggleTheme={() => {}} />);

  expect(
    screen.getByRole("button", { name: /switch to light theme/i })
  ).toBeInTheDocument();
});

test("labels itself for switching to dark theme while light is active", () => {
  render(<ThemeToggle theme="light" toggleTheme={() => {}} />);

  expect(
    screen.getByRole("button", { name: /switch to dark theme/i })
  ).toBeInTheDocument();
});

test("clicking calls toggleTheme", async () => {
  const user = userEvent.setup();
  const toggleTheme = vi.fn();
  render(<ThemeToggle theme="dark" toggleTheme={toggleTheme} />);

  await user.click(
    screen.getByRole("button", { name: /switch to light theme/i })
  );

  expect(toggleTheme).toHaveBeenCalledOnce();
});
