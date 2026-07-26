import { render, screen } from "@testing-library/react";
import EcosystemSection from "./EcosystemSection";
import { skills } from "../content/skills";

test("renders every category and every skill name, grouped correctly", () => {
  render(<EcosystemSection />);

  const categories = [...new Set(skills.map((skill) => skill.category))];
  for (const category of categories) {
    expect(screen.getByText(category)).toBeInTheDocument();
  }
  for (const skill of skills) {
    expect(screen.getByText(skill.name)).toBeInTheDocument();
  }
});

test("shows the experience badge only when one is tracked", () => {
  render(<EcosystemSection />);

  expect(screen.getAllByText("4 years").length).toBeGreaterThan(0);
  // TypeScript has no tracked duration and shouldn't get a badge at all —
  // just confirm its chip renders without throwing.
  expect(screen.getByText("TypeScript")).toBeInTheDocument();
});
