import { render, screen } from "@testing-library/react";
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
