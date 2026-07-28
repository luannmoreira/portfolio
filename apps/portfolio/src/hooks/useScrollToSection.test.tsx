import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { useScrollToSection } from "./useScrollToSection";

beforeEach(() => {
  vi.clearAllMocks();
});

function Page() {
  useScrollToSection();
  return (
    <div>
      <div id="skills">Skills section</div>
    </div>
  );
}

test("scrolls to the element matching ?section= on mount", () => {
  render(
    <MemoryRouter initialEntries={["/about?section=skills"]}>
      <Page />
    </MemoryRouter>
  );

  expect(
    document.getElementById("skills")?.scrollIntoView
  ).toHaveBeenCalledWith({ behavior: "smooth" });
});

test("does nothing when there is no ?section= param", () => {
  render(
    <MemoryRouter initialEntries={["/about"]}>
      <Page />
    </MemoryRouter>
  );

  expect(
    document.getElementById("skills")?.scrollIntoView
  ).not.toHaveBeenCalled();
});

test("does nothing when the section id doesn't match any element", () => {
  render(
    <MemoryRouter initialEntries={["/about?section=missing"]}>
      <Page />
    </MemoryRouter>
  );

  expect(
    document.getElementById("skills")?.scrollIntoView
  ).not.toHaveBeenCalled();
});

test("jumps instantly instead of animating when the user prefers reduced motion", () => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  );

  render(
    <MemoryRouter initialEntries={["/about?section=skills"]}>
      <Page />
    </MemoryRouter>
  );

  expect(
    document.getElementById("skills")?.scrollIntoView
  ).toHaveBeenCalledWith({ behavior: "auto" });

  vi.unstubAllGlobals();
});
