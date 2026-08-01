import { screen } from "@testing-library/react";
import { renderWithI18n } from "../test-i18n";
import Principles from "./Principles";

test("renders the section heading and all four principles", () => {
  renderWithI18n(<Principles />);

  expect(
    screen.getByRole("heading", { name: "Core Engineering Principles" })
  ).toBeInTheDocument();

  for (const title of [
    "01. Reliability First",
    "02. Decoupled Architecture",
    "03. Performance Budgeting",
    "04. Self-Documenting Code",
  ]) {
    expect(screen.getByText(title)).toBeInTheDocument();
  }
});
