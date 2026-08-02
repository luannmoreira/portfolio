import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { renderWithI18n } from "../test-i18n";
import Navbar from "./Navbar";

function renderNavbar() {
  return renderWithI18n(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
}

test("renders portfolio anchor links and the internal Blog link", () => {
  renderNavbar();

  const expectedLinks: [string, string][] = [
    ["Home", "/"],
    ["About", "/about"],
    ["Contact", "/contact"],
    ["Blog", "/blog"],
  ];

  // Each item now renders twice — once in the desktop <ul>, once in the
  // mobile overlay — so assert every rendered instance agrees.
  for (const [name, href] of expectedLinks) {
    const links = screen.getAllByRole("link", { name });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute("href", href);
    }
  }
});

test("renders a mobile menu toggle", () => {
  renderNavbar();

  expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
});

test("renders the theme toggle", () => {
  renderNavbar();

  expect(
    screen.getByRole("button", { name: /switch to (light|dark) theme/i })
  ).toBeInTheDocument();
});

test("renders the language switcher and switches the active locale", async () => {
  const user = userEvent.setup();
  renderNavbar();

  expect(screen.getByRole("group", { name: "Language" })).toBeInTheDocument();
  const ptButton = screen.getByRole("button", { name: "PT" });

  await user.click(ptButton);

  expect(ptButton).toHaveAttribute("aria-current", "true");
  expect(screen.getAllByRole("link", { name: "Sobre" }).length).toBeGreaterThan(
    0
  );
});
