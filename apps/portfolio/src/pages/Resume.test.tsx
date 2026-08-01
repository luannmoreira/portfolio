import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { renderWithI18n } from "../test-i18n";
import Resume from "./Resume";

function renderResume() {
  return renderWithI18n(
    <MemoryRouter>
      <Resume />
    </MemoryRouter>
  );
}

test("renders each experience entry", () => {
  renderResume();

  expect(screen.getAllByText(/ShellHub/).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/OS Systems/).length).toBeGreaterThan(0);
});

test("renders each skill", () => {
  renderResume();

  expect(screen.getByText(/JavaScript/)).toBeInTheDocument();
  expect(screen.getByText(/Docker/)).toBeInTheDocument();
});

test("offers a print button", () => {
  renderResume();

  expect(screen.getByRole("button", { name: /print/i })).toBeInTheDocument();
});

test("clicking the print button calls window.print", async () => {
  const printSpy = vi.spyOn(window, "print").mockImplementation(() => {});
  const user = userEvent.setup();

  renderResume();
  await user.click(screen.getByRole("button", { name: /print/i }));

  expect(printSpy).toHaveBeenCalled();
});
