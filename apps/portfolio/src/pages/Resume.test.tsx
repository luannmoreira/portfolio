import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Resume from "./Resume";

test("renders each experience entry", () => {
  render(<Resume />);

  expect(screen.getByText(/ShellHub/)).toBeInTheDocument();
  expect(screen.getByText(/OS Systems/)).toBeInTheDocument();
});

test("renders each skill", () => {
  render(<Resume />);

  expect(screen.getByText(/JavaScript/)).toBeInTheDocument();
  expect(screen.getByText(/Docker/)).toBeInTheDocument();
});

test("renders each certification", () => {
  render(<Resume />);

  expect(screen.getByText(/Harvard CS50/)).toBeInTheDocument();
});

test("offers a print button", () => {
  render(<Resume />);

  expect(screen.getByRole("button", { name: /print/i })).toBeInTheDocument();
});

test("clicking the print button calls window.print", async () => {
  const printSpy = vi.spyOn(window, "print").mockImplementation(() => {});
  const user = userEvent.setup();

  render(<Resume />);
  await user.click(screen.getByRole("button", { name: /print/i }));

  expect(printSpy).toHaveBeenCalled();
});
