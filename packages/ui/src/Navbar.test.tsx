import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect } from "vitest";
import Navbar from "./Navbar";

function renderNavbar() {
  return render(
    <Navbar
      brand={<a href="/">Brand</a>}
      desktopNav={
        <ul className="hidden md:flex">
          <li>
            <a href="/about">Desktop About</a>
          </li>
        </ul>
      }
      mobileNav={
        <div>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      }
      themeToggle={<button type="button">Toggle theme</button>}
      desktopCta={<a href="/resume">Resume</a>}
    />
  );
}

test("hamburger toggle flips aria-expanded and the overlay's active class", async () => {
  const user = userEvent.setup();
  renderNavbar();

  const toggle = screen.getByRole("button", { name: "Open menu" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");

  const overlay = document.getElementById("mobile-nav");
  expect(overlay).not.toHaveClass("active");

  await user.click(toggle);

  expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
    "aria-expanded",
    "true"
  );
  expect(overlay).toHaveClass("active");
});

test("overlay is inert while closed, so its links are never keyboard-reachable", () => {
  renderNavbar();
  const overlay = document.getElementById("mobile-nav");
  expect(overlay).toHaveAttribute("inert");
});

test("overlay is not inert while open", async () => {
  const user = userEvent.setup();
  renderNavbar();
  await user.click(screen.getByRole("button", { name: "Open menu" }));
  const overlay = document.getElementById("mobile-nav");
  expect(overlay).not.toHaveAttribute("inert");
});

test("clicking a link inside the overlay closes it", async () => {
  const user = userEvent.setup();
  renderNavbar();
  await user.click(screen.getByRole("button", { name: "Open menu" }));

  const overlay = document.getElementById("mobile-nav")!;
  await user.click(within(overlay).getByRole("link", { name: "About" }));

  expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
    "aria-expanded",
    "false"
  );
});

test("Escape closes the overlay", async () => {
  const user = userEvent.setup();
  renderNavbar();
  await user.click(screen.getByRole("button", { name: "Open menu" }));
  expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
    "aria-expanded",
    "true"
  );

  await user.keyboard("{Escape}");

  expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
    "aria-expanded",
    "false"
  );
});

test("focus moves into the overlay on open and back to the hamburger on close", async () => {
  const user = userEvent.setup();
  renderNavbar();
  const toggle = screen.getByRole("button", { name: "Open menu" });

  await user.click(toggle);
  const overlay = document.getElementById("mobile-nav")!;
  expect(within(overlay).getByRole("link", { name: "About" })).toHaveFocus();

  await user.keyboard("{Escape}");
  expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
});

test("Tab cycles only within the overlay while it is open", async () => {
  const user = userEvent.setup();
  renderNavbar();
  await user.click(screen.getByRole("button", { name: "Open menu" }));

  const overlay = document.getElementById("mobile-nav")!;
  const aboutLink = within(overlay).getByRole("link", { name: "About" });
  const contactLink = within(overlay).getByRole("link", { name: "Contact" });

  expect(aboutLink).toHaveFocus();
  await user.tab();
  expect(contactLink).toHaveFocus();
  await user.tab();
  expect(aboutLink).toHaveFocus();
  await user.tab({ shift: true });
  expect(contactLink).toHaveFocus();
});
