import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from "./Navbar";

test("renders portfolio anchor links and the internal Blog link", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const expectedAnchorHrefFragments: [string, string][] = [
    ["Home", "#/"],
    ["About", "#/about"],
    ["Skills", "#/about?section=skills"],
    ["Uses", "#/about?section=uses"],
    ["Now", "#/?section=now"],
    ["Contact", "#/contact"],
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
