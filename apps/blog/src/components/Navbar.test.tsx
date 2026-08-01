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

  const expectedAnchorHrefFragments: [string, string][] = [
    ["Home", "/?lang=en&theme="],
    ["About", "/about?lang=en&theme="],
    ["Contact", "/contact?lang=en&theme="],
  ];

  // Each item now renders twice — once in the desktop <ul>, once in the
  // mobile overlay — so assert every rendered instance agrees.
  for (const [name, hrefFragment] of expectedAnchorHrefFragments) {
    const links = screen.getAllByRole("link", { name });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.getAttribute("href")).toContain(hrefFragment);
    }
  }

  const blogLinks = screen.getAllByRole("link", { name: "Blog" });
  expect(blogLinks.length).toBeGreaterThan(0);
  for (const link of blogLinks) {
    expect(link).toHaveAttribute("href", "/blog");
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

test("renders the language switcher and carries the choice on cross-app links", async () => {
  const user = userEvent.setup();
  renderNavbar();

  expect(screen.getByRole("group", { name: "Language" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "PT" }));

  const links = screen.getAllByRole("link", { name: "Sobre" });
  expect(links.length).toBeGreaterThan(0);
  for (const link of links) {
    expect(link.getAttribute("href")).toContain("lang=pt-BR");
  }
});
