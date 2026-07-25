import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Home renders Hero and Certs, not the migrated sections", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: "Luann Curioso" })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Courses" })).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "About me" })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Skills" })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Experience" })
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

  expect(screen.getByRole("heading", { name: "About me" })).toBeInTheDocument();
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
    screen.getByRole("heading", { name: "Be in touch!" })
  ).toBeInTheDocument();
});
