import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders every section's heading", () => {
  render(<App />);

  // getByRole, not getByText — several of these strings also appear as nav
  // links (Navbar/Footer) or elsewhere in prose, so only the <h1> match is
  // unambiguous.
  expect(
    screen.getByRole("heading", { name: "Luann Curioso" })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "About me" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Experience" })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Courses" })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Be in touch!" })
  ).toBeInTheDocument();
});

test("navigating to a real route renders that page, not Home", async () => {
  const user = userEvent.setup();
  render(<App />);

  // Both Navbar and Footer render an "About" link (both are always
  // rendered, above/below the routed page) — the first is Navbar's.
  await user.click(screen.getAllByRole("link", { name: "About" })[0]);

  expect(
    screen.getByRole("heading", { name: "About", level: 1 })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Luann Curioso" })
  ).not.toBeInTheDocument();
});
