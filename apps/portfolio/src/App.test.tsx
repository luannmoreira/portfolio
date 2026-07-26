import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Home renders the hero, Now section, and projects teaser", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: "Building systems that scale." })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Now" })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Selected Engineering Work" })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "About me" })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Be in touch!" })
  ).not.toBeInTheDocument();
});

test("About page renders philosophy, skills, principles, and experience content", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("link", { name: "About" })[0]);

  expect(
    await screen.findByRole("heading", { name: /sustainable systems/ })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Technical Expertise" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Core Engineering Principles" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Experience" })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Building systems that scale." })
  ).not.toBeInTheDocument();
});

test("Contact page renders the contact section", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("link", { name: "Contact" })[0]);

  expect(
    await screen.findByRole("heading", {
      name: "Let's talk about engineering.",
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /luannmcurioso@gmail.com/ })
  ).toHaveAttribute("href", "mailto:luannmcurioso@gmail.com");
});
