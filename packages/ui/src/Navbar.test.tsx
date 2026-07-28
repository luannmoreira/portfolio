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

test("overlay renders a blurred, translucent backdrop separating it from page content", () => {
  renderNavbar();
  const overlay = document.getElementById("mobile-nav");

  expect(overlay?.className).toMatch(/backdrop-blur/);
  // Fully opaque (no alpha channel, e.g. bg-surface/100) would mean no
  // page content shows through at all — /\d{1,2}(?!\d)/ excludes that,
  // matching only a genuine 1-99% alpha value.
  expect(overlay?.className).toMatch(/bg-surface\/\d{1,2}(?!\d)/);
});

test("header row stacks above the overlay so it stays visible and clickable while open", () => {
  renderNavbar();
  const toggle = screen.getByRole("button", { name: "Open menu" });
  const headerRow = toggle.parentElement;
  const overlay = document.getElementById("mobile-nav");

  const headerZ = Number(headerRow?.className.match(/\bz-\[(\d+)\]/)?.[1]);
  const overlayZ = Number(overlay?.className.match(/\bz-\[(\d+)\]/)?.[1]);

  expect(Number.isNaN(headerZ)).toBe(false);
  expect(Number.isNaN(overlayZ)).toBe(false);
  expect(headerZ).toBeGreaterThan(overlayZ);
});

test("overlay is a labeled dialog for assistive tech", () => {
  renderNavbar();
  const overlay = document.getElementById("mobile-nav");

  expect(overlay).toHaveAttribute("role", "dialog");
  expect(overlay).toHaveAccessibleName();
});

test("aria-modal is only set while the overlay is actually open", async () => {
  const user = userEvent.setup();
  renderNavbar();
  const overlay = document.getElementById("mobile-nav");

  // Closed: role="dialog" alone (no aria-modal) plus `inert` (asserted
  // elsewhere) is the correct closed state — aria-modal="true" while
  // closed would tell AT to treat the rest of the page as unreachable
  // even though `inert` hasn't excluded this element from the tree yet.
  expect(overlay).not.toHaveAttribute("aria-modal");

  await user.click(screen.getByRole("button", { name: "Open menu" }));
  expect(overlay).toHaveAttribute("aria-modal", "true");
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
