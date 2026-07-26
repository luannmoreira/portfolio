import { render, screen } from "@testing-library/react";
import Habilidades from "./Habilidades";
import { skills } from "../content/skills";

test("renders an anchor target and every category heading", () => {
  const { container } = render(<Habilidades />);

  expect(container.querySelector("#skills")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Languages" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Frameworks" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Infrastructure" })
  ).toBeInTheDocument();
});

test("renders every skill under its category", () => {
  render(<Habilidades />);

  for (const skill of skills) {
    expect(screen.getByText(skill.name)).toBeInTheDocument();
  }
});
