import { render, screen } from "@testing-library/react";
import CardProjects from "./CardProjects";

test("renders project details and tech stack", () => {
  render(
    <CardProjects
      name="Example Project"
      description="A project that does example things."
      tech={["React", "TypeScript"]}
    />
  );

  expect(
    screen.getByRole("heading", { name: "Example Project" })
  ).toBeInTheDocument();
  expect(
    screen.getByText("A project that does example things.")
  ).toBeInTheDocument();
  expect(screen.getByText("React")).toBeInTheDocument();
  expect(screen.getByText("TypeScript")).toBeInTheDocument();
});

test("does not render a link when none is given", () => {
  render(<CardProjects name="No Link" description="desc" tech={["Go"]} />);

  expect(screen.queryByRole("link")).not.toBeInTheDocument();
});

test("links out correctly when a link is given", () => {
  render(
    <CardProjects
      name="Linked Project"
      description="desc"
      tech={["Vue"]}
      link="https://example.com"
    />
  );

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "https://example.com");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noreferrer");
});
