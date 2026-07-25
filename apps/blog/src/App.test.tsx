import { render, screen } from "@testing-library/react";
import App from "./App";

// Scaffold-proving smoke test only — asserts the toolchain (Vitest, JSX,
// Tailwind class application) actually works. Replaced once real Home page
// content lands test-first in a later milestone.
test("renders without crashing", () => {
  render(<App />);
  expect(
    screen.getByText("Blog scaffold — content lands in a later milestone.")
  ).toBeInTheDocument();
});
