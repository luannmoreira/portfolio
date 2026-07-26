import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Footer from "./Footer";

test("renders real social links and the copyright line", () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/luannmoreira"
  );
  expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://linkedin.com/in/luanncurioso"
  );
  expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
    "href",
    "https://wa.me/5565999722455?text=Ol%C3%A1%2C%20Luann!"
  );

  expect(
    screen.getByText(new RegExp(`${new Date().getFullYear()}`))
  ).toBeInTheDocument();
});
