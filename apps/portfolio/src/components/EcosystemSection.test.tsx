import { screen } from "@testing-library/react";
import { renderWithI18n } from "../test-i18n";
import EcosystemSection from "./EcosystemSection";
import { skills } from "../content/skills";

test("renders every category and every skill name, grouped correctly", () => {
  renderWithI18n(<EcosystemSection />);

  const categories = [...new Set(skills.map((skill) => skill.category))];
  for (const category of categories) {
    expect(screen.getByText(category)).toBeInTheDocument();
  }
  for (const skill of skills) {
    expect(screen.getByText(skill.name)).toBeInTheDocument();
  }
});

test("does not render per-skill duration badges", () => {
  renderWithI18n(<EcosystemSection />);

  expect(screen.queryByText(/year/i)).not.toBeInTheDocument();
});
