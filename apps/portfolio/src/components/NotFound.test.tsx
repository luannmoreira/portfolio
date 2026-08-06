import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { renderWithI18n } from "../test-i18n";
import NotFound from "./NotFound";

function renderNotFound() {
  return renderWithI18n(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
}

test("renders a heading announcing the page wasn't found", () => {
  renderNotFound();

  expect(
    screen.getByRole("heading", { name: /not found/i })
  ).toBeInTheDocument();
});

test("links back to the home page", () => {
  renderNotFound();

  expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
    "href",
    "/"
  );
});
