import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Reveal from "./Reveal";

// Not vi.unstubAllGlobals() in an afterEach here — that would also wipe
// the IntersectionObserver stub test-setup.ts registers once per file via
// the same stub registry, breaking every test after the first one in this
// file. Each test just re-stubs matchMedia directly, which overwrites the
// prior stub on its own.
function stubReducedMotion(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  );
}

test("animates in normally when the user has no motion preference", () => {
  stubReducedMotion(false);
  render(
    <Reveal variant="fade-up">
      <p>Content</p>
    </Reveal>
  );

  const wrapper = screen.getByText("Content").parentElement!;
  // Starts hidden/offset before intersecting — the whole point of the
  // reveal effect when motion isn't reduced.
  expect(wrapper.style.opacity).toBe("0");
  expect(wrapper.style.transform).not.toBe("none");
});

test("renders content immediately, with no transition, when the user prefers reduced motion", () => {
  stubReducedMotion(true);
  render(
    <Reveal variant="fade-up">
      <p>Content</p>
    </Reveal>
  );

  const wrapper = screen.getByText("Content").parentElement!;
  expect(wrapper.style.opacity).toBe("1");
  expect(wrapper.style.transform).toBe("none");
  expect(wrapper.style.transition).toBe("none");
});
