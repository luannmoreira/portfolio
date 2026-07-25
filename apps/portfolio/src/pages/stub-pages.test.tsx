import { render, screen } from "@testing-library/react";
import Projects from "./Projects";
import Uses from "./Uses";
import Now from "./Now";

// About, Contact (10.2), and Resume (10.3) have real content now, tested
// via their own dedicated test files. Remaining stubs: Projects, Uses, Now.

test("Projects renders its placeholder heading", () => {
  render(<Projects />);
  expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
});

test("Uses renders its placeholder heading", () => {
  render(<Uses />);
  expect(screen.getByRole("heading", { name: "Uses" })).toBeInTheDocument();
});

test("Now renders its placeholder heading", () => {
  render(<Now />);
  expect(screen.getByRole("heading", { name: "Now" })).toBeInTheDocument();
});
