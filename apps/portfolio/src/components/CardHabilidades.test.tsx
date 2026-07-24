import { render, screen } from "@testing-library/react";
import CardHabilidades from "./CardHabilidades";

test("renders name, experience, and image", () => {
  render(
    <CardHabilidades name="TypeScript" experience="2 years" img="/ts.svg" />
  );

  expect(
    screen.getByRole("heading", { name: "TypeScript" })
  ).toBeInTheDocument();
  expect(screen.getByText("2 years of experience")).toBeInTheDocument();
  const image = screen.getByRole("img", { name: "TypeScript" });
  expect(image).toHaveAttribute("src", "/ts.svg");
});
