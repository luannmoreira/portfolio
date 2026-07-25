import { render, screen } from "@testing-library/react";
import App from "./App";

// Integration-level check that App actually wires up Home — detailed
// content assertions live in Home.test.tsx.
test("renders the Home page", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: "Blog" })).toBeInTheDocument();
});
