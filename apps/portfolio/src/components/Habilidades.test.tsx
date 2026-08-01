import { screen } from "@testing-library/react";
import { renderWithI18n } from "../test-i18n";
import Habilidades from "./Habilidades";
import { skills } from "../content/skills";

test("renders an anchor target and the section heading", () => {
  const { container } = renderWithI18n(<Habilidades />);

  expect(container.querySelector("#skills")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Technical Expertise" })
  ).toBeInTheDocument();
  expect(
    screen.getByText("Technologies I use in production.")
  ).toBeInTheDocument();
});

test("renders every category and every skill", () => {
  renderWithI18n(<Habilidades />);

  const categories = [...new Set(skills.map((skill) => skill.category))];
  for (const category of categories) {
    expect(screen.getByText(category)).toBeInTheDocument();
  }
  for (const skill of skills) {
    expect(screen.getByText(skill.name)).toBeInTheDocument();
  }
});
