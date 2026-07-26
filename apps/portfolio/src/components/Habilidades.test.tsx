import { render, screen } from "@testing-library/react";
import Habilidades from "./Habilidades";
import { skills } from "../content/skills";

test("renders an anchor target and the section heading", () => {
  const { container } = render(<Habilidades />);

  expect(container.querySelector("#skills")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Technical Expertise" })
  ).toBeInTheDocument();
});

test("renders every category and every skill", () => {
  render(<Habilidades />);

  const categories = [...new Set(skills.map((skill) => skill.category))];
  for (const category of categories) {
    expect(screen.getByText(category)).toBeInTheDocument();
  }
  for (const skill of skills) {
    expect(screen.getByText(skill.name)).toBeInTheDocument();
  }
});
