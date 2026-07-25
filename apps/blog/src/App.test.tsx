import { render, screen } from "@testing-library/react";
import App from "./App";

// Integration-level check that App wires up routing correctly — detailed
// content assertions live in each page's own test file.
test("renders the Home page at /", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: "Blog" })).toBeInTheDocument();
  expect(
    screen.getByText("Long-form engineering writing lands here soon.")
  ).toBeInTheDocument();
});
