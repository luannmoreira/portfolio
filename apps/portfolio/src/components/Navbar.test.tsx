import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from "./Navbar";

test("renders route and anchor nav links with the expected destinations", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const expectedLinks: [string, string][] = [
    ["Home", "/"],
    ["About", "/about"],
    ["Contact", "/contact"],
    ["Resume", "/resume"],
  ];

  // Each nav item now renders twice — once in the desktop <ul>, once in the
  // mobile overlay — so assert every rendered instance agrees on the href.
  for (const [name, href] of expectedLinks) {
    const links = screen.getAllByRole("link", { name });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute("href", href);
    }
  }
});

test("renders a mobile menu toggle", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
});

test("renders the theme toggle", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("button", { name: /switch to (light|dark) theme/i })
  ).toBeInTheDocument();
});
