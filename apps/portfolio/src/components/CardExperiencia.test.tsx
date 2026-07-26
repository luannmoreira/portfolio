import { render, screen } from "@testing-library/react";
import CardExperiencia from "./CardExperiencia";

test("renders role, company, dates, and description", () => {
  render(
    <CardExperiencia
      name="Front-end Developer"
      issued="Acme Corp"
      desc="Built things."
      anoEntrada="Jan 2020"
      anoSaida="Present"
    />
  );

  expect(
    screen.getByRole("heading", { name: "Front-end Developer" })
  ).toBeInTheDocument();
  expect(screen.getByText("Acme Corp")).toBeInTheDocument();
  expect(screen.getByText("Jan 2020 — Present")).toBeInTheDocument();
  expect(screen.getByText("Built things.")).toBeInTheDocument();
});
