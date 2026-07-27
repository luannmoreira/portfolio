import { render, screen } from "@testing-library/react";
import App from "./App";

// Integration-level check that App wires up routing correctly — detailed
// content assertions live in each page's own test file.
test("redirects / to the blog archive", async () => {
  render(<App />);
  expect(
    await screen.findByRole("heading", { name: "Writing", level: 1 })
  ).toBeInTheDocument();
});
