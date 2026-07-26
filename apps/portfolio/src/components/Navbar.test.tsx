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
    ["Skills", "/about?section=skills"],
    ["Certifications", "/certifications"],
    ["Uses", "/certifications?section=uses"],
    ["Now", "/?section=now"],
    ["Contact", "/contact"],
    ["Resume", "/resume"],
  ];

  for (const [name, href] of expectedLinks) {
    expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
  }
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
