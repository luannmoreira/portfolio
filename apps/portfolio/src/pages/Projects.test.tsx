import { render, screen } from "@testing-library/react";
import Projects from "./Projects";

test("renders every real project entry", () => {
  render(<Projects />);

  expect(screen.getByRole("heading", { name: "ShellHub" })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "OS Systems" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "SEDEC / Invest MT" })
  ).toBeInTheDocument();
});

test("links out to Invest MT", () => {
  render(<Projects />);

  const link = screen.getByRole("link", { name: /SEDEC \/ Invest MT/ });
  expect(link).toHaveAttribute("href", "https://www.investmt.com.br/pt-br");
});
