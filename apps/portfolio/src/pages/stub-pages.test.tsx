import { render, screen } from "@testing-library/react";
import Now from "./Now";

// About, Contact (10.2), Resume (10.3), Projects (10.4), and Uses (10.5)
// have real content now, tested via their own dedicated test files.
// Remaining stub: Now.

test("Now renders its placeholder heading", () => {
  render(<Now />);
  expect(screen.getByRole("heading", { name: "Now" })).toBeInTheDocument();
});
