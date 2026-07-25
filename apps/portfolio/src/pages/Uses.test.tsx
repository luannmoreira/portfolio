import { render, screen } from "@testing-library/react";
import Uses from "./Uses";

test("renders every uses entry", () => {
  render(<Uses />);

  expect(screen.getByText("VS Code")).toBeInTheDocument();
  expect(screen.getByText("Konsole")).toBeInTheDocument();
  expect(screen.getByText("Garuda Linux")).toBeInTheDocument();
  expect(screen.getByText("Notion")).toBeInTheDocument();
  expect(screen.getByText("Claude")).toBeInTheDocument();
  expect(screen.getByText("Two monitors")).toBeInTheDocument();
});

test("renders each entry's category", () => {
  render(<Uses />);

  expect(screen.getByText("Editor")).toBeInTheDocument();
  expect(screen.getByText("Hardware")).toBeInTheDocument();
});
