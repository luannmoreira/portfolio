import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Timeline from "./Timeline";
import { timelineMilestones } from "../content/timeline";

beforeEach(() => {
  vi.clearAllMocks();
});

function renderTimeline(initialEntry = "/") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Timeline />
    </MemoryRouter>
  );
}

test("renders an anchor target for cross-page nav", () => {
  const { container } = renderTimeline();
  expect(container.querySelector("#timeline")).toBeInTheDocument();
});

test("renders every milestone's title and summary", () => {
  renderTimeline();

  for (const milestone of timelineMilestones) {
    expect(
      screen.getByRole("heading", { name: milestone.title })
    ).toBeInTheDocument();
    expect(screen.getByText(milestone.summary)).toBeInTheDocument();
  }
});

test("renders every milestone's own year label (no shared group heading)", () => {
  const { container } = renderTimeline();

  for (const milestone of timelineMilestones) {
    const item = container.querySelector(`#${milestone.id}`) as HTMLElement;
    expect(item).not.toBeNull();
    expect(item.textContent).toContain(milestone.year);
  }
});

test("scrolls to and reveals the milestone matching a URL hash", () => {
  renderTimeline("/#shellhub");

  expect(
    document.getElementById("shellhub")?.scrollIntoView
  ).toHaveBeenCalledWith({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });
  expect(document.getElementById("shellhub")?.style.opacity).toBe("1");
});

test("auto-expands the milestone matching a URL hash", () => {
  renderTimeline("/#shellhub");

  // ShellHub has a real link in its content — only visible once expanded.
  expect(screen.getByRole("link", { name: "shellhub.io" })).toBeVisible();
});

test("does nothing when there is no matching hash", () => {
  renderTimeline("/");

  expect(
    document.getElementById("shellhub")?.scrollIntoView
  ).not.toHaveBeenCalled();
});

function stubHorizontalBreakpoint(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: query === "(min-width: 768px)" ? matches : false,
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

test("translates vertical wheel scroll into horizontal scroll on the track, at the horizontal breakpoint", () => {
  stubHorizontalBreakpoint(true);
  const { container } = renderTimeline();

  const track = container.querySelector("#timeline ol") as HTMLElement;
  track.scrollLeft = 0;
  track.dispatchEvent(
    new WheelEvent("wheel", { deltaY: 100, bubbles: true, cancelable: true })
  );

  expect(track.scrollLeft).toBe(100);
});

test("does not hijack vertical wheel scroll below the horizontal breakpoint", () => {
  stubHorizontalBreakpoint(false);
  const { container } = renderTimeline();

  const track = container.querySelector("#timeline ol") as HTMLElement;
  track.scrollLeft = 0;
  track.dispatchEvent(
    new WheelEvent("wheel", { deltaY: 100, bubbles: true, cancelable: true })
  );

  expect(track.scrollLeft).toBe(0);
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

  renderTimeline("/#shellhub");

  expect(
    document.getElementById("shellhub")?.scrollIntoView
  ).toHaveBeenCalledWith({
    behavior: "auto",
    block: "nearest",
    inline: "center",
  });

  vi.unstubAllGlobals();
});
