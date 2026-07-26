import { render, screen } from "@testing-library/react";
import CardCerts from "./CardCerts";

test("renders the cert name, issuer, date, and description; links out to the course", () => {
  render(
    <CardCerts
      name="Harvard CS50"
      desc={"Data structures\nAlgorithms"}
      img="/badge.webp"
      issued="freeCodeCamp.org"
      date="Set 2022"
      linkCurso="https://example.com/cs50"
    />
  );

  expect(
    screen.getByRole("heading", { name: "Harvard CS50" })
  ).toBeInTheDocument();
  expect(screen.getByText(/freeCodeCamp.org/)).toBeInTheDocument();
  expect(screen.getByText(/Set 2022/)).toBeInTheDocument();
  expect(screen.getByText(/Data structures/)).toBeInTheDocument();

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "https://example.com/cs50");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noreferrer");
});
