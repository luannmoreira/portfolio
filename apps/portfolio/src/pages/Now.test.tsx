import { render, screen } from "@testing-library/react";
import Now from "./Now";

test("renders every current focus item", () => {
  render(<Now />);

  expect(
    screen.getByText("Rebranding as a software engineer")
  ).toBeInTheDocument();
  expect(
    screen.getByText("Studying for the Kubernetes CKA")
  ).toBeInTheDocument();
  expect(
    screen.getByText("Studying for the AWS Developer certification")
  ).toBeInTheDocument();
  expect(screen.getByText("Writing for this blog")).toBeInTheDocument();
  expect(
    screen.getByText('"The Most Boring Project Ever"')
  ).toBeInTheDocument();
});

test("renders a last-updated note", () => {
  render(<Now />);

  expect(screen.getByText(/July 2026/)).toBeInTheDocument();
});
