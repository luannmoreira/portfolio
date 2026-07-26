import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Home renders the hero, Now section, and projects teaser", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: "Building systems that scale." })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Now" })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Selected Engineering Work" })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "About me" })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Be in touch!" })
  ).not.toBeInTheDocument();
});

test("About page renders About, Skills, and Experience content", async () => {
  const user = userEvent.setup();
  render(<App />);

  // Both Navbar and Footer render an "About" link (both are always
  // rendered, above/below the routed page) — the first is Navbar's.
  await user.click(screen.getAllByRole("link", { name: "About" })[0]);

  expect(
    await screen.findByRole("heading", { name: "About me" })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Experience" })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Luann Curioso" })
  ).not.toBeInTheDocument();
});

test("Contact page renders the contact section", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("link", { name: "Contact" })[0]);

  expect(
    await screen.findByRole("heading", { name: "Be in touch!" })
  ).toBeInTheDocument();
});
