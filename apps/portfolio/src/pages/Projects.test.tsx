import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Projects from "./Projects";

function renderProjects() {
  return render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>
  );
}

test("renders every real project entry", () => {
  renderProjects();

  expect(screen.getByRole("heading", { name: "ShellHub" })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "OS Systems" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "SEDEC / Invest MT" })
  ).toBeInTheDocument();
});

test("links out to Invest MT", () => {
  renderProjects();

  const link = screen.getByRole("link", { name: /SEDEC \/ Invest MT/ });
  expect(link).toHaveAttribute("href", "https://www.investmt.com.br/pt-br");
});
