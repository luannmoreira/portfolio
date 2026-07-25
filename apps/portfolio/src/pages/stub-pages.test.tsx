import { render, screen } from "@testing-library/react";
import Uses from "./Uses";
import Now from "./Now";

// About, Contact (10.2), Resume (10.3), and Projects (10.4) have real
// content now, tested via their own dedicated test files. Remaining
// stubs: Uses, Now.

test("Uses renders its placeholder heading", () => {
  render(<Uses />);
  expect(screen.getByRole("heading", { name: "Uses" })).toBeInTheDocument();
});

test("Now renders its placeholder heading", () => {
  render(<Now />);
  expect(screen.getByRole("heading", { name: "Now" })).toBeInTheDocument();
});
