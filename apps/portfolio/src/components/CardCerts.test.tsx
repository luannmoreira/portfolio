import { render, screen } from "@testing-library/react";
import CardCerts from "./CardCerts";

test("renders course details and links out correctly", () => {
  render(
    <CardCerts
      name="Intro to Testing"
      desc="Learned the basics."
      img="/course.jpg"
      issued="Test University"
      date="Jan 2024"
      linkCurso="https://example.com/course"
    />
  );

  expect(
    screen.getByRole("heading", { name: "Intro to Testing" })
  ).toBeInTheDocument();
  expect(screen.getByText("by Test University")).toBeInTheDocument();
  expect(screen.getByText("Learned the basics.")).toBeInTheDocument();
  expect(screen.getByText("Jan 2024")).toBeInTheDocument();

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "https://example.com/course");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noreferrer");
});
