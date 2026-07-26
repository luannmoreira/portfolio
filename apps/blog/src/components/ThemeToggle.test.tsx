import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "./ThemeToggle";

afterEach(() => {
  document.documentElement.classList.remove("light");
  localStorage.clear();
});

test("labels itself for switching to light theme while dark is active", () => {
  render(<ThemeToggle />);

  expect(
    screen.getByRole("button", { name: /switch to light theme/i })
  ).toBeInTheDocument();
});

test("clicking switches the label and toggles the html class", async () => {
  const user = userEvent.setup();
  render(<ThemeToggle />);

  await user.click(
    screen.getByRole("button", { name: /switch to light theme/i })
  );

  expect(
    screen.getByRole("button", { name: /switch to dark theme/i })
  ).toBeInTheDocument();
  expect(document.documentElement.classList.contains("light")).toBe(true);
});
