import { render, screen } from "@testing-library/react";
import About from "./About";
import Resume from "./Resume";
import Projects from "./Projects";
import Uses from "./Uses";
import Now from "./Now";
import Contact from "./Contact";

test("About renders its placeholder heading", () => {
  render(<About />);
  expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
});

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

test("Contact page renders its placeholder heading", () => {
  render(<Contact />);
  expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument();
});
