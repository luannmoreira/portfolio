import { render, screen } from "@testing-library/react";
import ExperienceCard from "./ExperienceCard";

test("renders role, company, dates, and description", () => {
  render(
    <ExperienceCard
      name="Front-end Developer"
      issued="Acme Corp"
      desc="Built things."
      startDate="Jan 2020"
      endDate="Present"
    />
  );

  expect(
    screen.getByRole("heading", { name: "Front-end Developer" })
  ).toBeInTheDocument();
  expect(screen.getByText("Acme Corp")).toBeInTheDocument();
  expect(screen.getByText("Jan 2020 — Present")).toBeInTheDocument();
  expect(screen.getByText("Built things.")).toBeInTheDocument();
});
