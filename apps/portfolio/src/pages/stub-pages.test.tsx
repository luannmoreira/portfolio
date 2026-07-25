import { render, screen } from "@testing-library/react";
import Resume from "./Resume";
import Projects from "./Projects";
import Uses from "./Uses";
import Now from "./Now";

// About and Contact were migrated in 10.2 (real content, tested via
// App.test.tsx). Remaining stubs: Resume, Projects, Uses, Now.

test("Resume renders its placeholder heading", () => {
  render(<Resume />);
  expect(screen.getByRole("heading", { name: "Resume" })).toBeInTheDocument();
});

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
