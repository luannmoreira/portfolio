import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("renders the blog's placeholder heading and description", () => {
  render(<Home />);

  expect(screen.getByRole("heading", { name: "Blog" })).toBeInTheDocument();
  expect(
    screen.getByText(/long-form engineering writing lands here soon/i)
  ).toBeInTheDocument();
});
