import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import type { ReactElement } from "react";
import { renderWithI18n } from "../test-i18n";
import TimelineItem from "./TimelineItem";
import type { TimelineMilestone } from "../content/timeline";

// TimelineItem itself renders whatever strings it's handed (Timeline.tsx is
// what resolves translation keys) — the only i18n concern here is the
// component's own status labels/"Details" toggle, which do need a provider.
function render(ui: ReactElement) {
  return renderWithI18n(ui);
}

// Mirrors Reveal.test.tsx's helper — no shared test util exists for this yet,
// and it's a two-line stub, not worth extracting for one more caller.
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

const milestone: TimelineMilestone = {
  id: "example-co",
  year: "2021",
  status: "completed",
  title: "Example Co",
  subtitle: "Engineer",
  summary: "Did the thing.",
};

const milestoneWithDetails: TimelineMilestone = {
  id: "detailed-co",
  year: "2022",
  status: "in-progress",
  title: "Detailed Co",
  summary: "Short summary.",
  details: "Longer explanation of the work.",
  technologies: ["React", "TypeScript"],
  links: [{ label: "detailed.dev", href: "https://detailed.dev" }],
};

const milestoneWithoutDetailsCopy: TimelineMilestone = {
  id: "tech-only-co",
  year: "2023",
  status: "completed",
  title: "Tech Only Co",
  summary: "Only a summary, no separate details.",
  technologies: ["Vue"],
};

test("renders an id target, year, title, subtitle, and summary", () => {
  const { container } = render(
    <ol>
      <TimelineItem milestone={milestone} />
    </ol>
  );

  expect(container.querySelector("#example-co")).toBeInTheDocument();
  expect(screen.getByText("2021")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Example Co" })
  ).toBeInTheDocument();
  expect(screen.getByText("Engineer")).toBeInTheDocument();
  expect(screen.getByText("Did the thing.")).toBeInTheDocument();
});

test.each([
  ["completed", "Completed"],
  ["in-progress", "In progress"],
  ["planned", "Planned"],
] as const)(
  "renders a %s status as a visible text label, not just a color",
  (status, label) => {
    render(
      <ol>
        <TimelineItem milestone={{ ...milestone, status }} />
      </ol>
    );
    expect(screen.getByText(label)).toBeInTheDocument();
  }
);

test("does not render a details toggle when there is nothing extra to show", () => {
  render(
    <ol>
      <TimelineItem milestone={milestone} />
    </ol>
  );

  expect(
    screen.queryByRole("button", { name: /details/i })
  ).not.toBeInTheDocument();
});

test("keeps expandable content collapsed by default", () => {
  const { container } = render(
    <ol>
      <TimelineItem milestone={milestoneWithDetails} />
    </ol>
  );

  // Present in the DOM (needed so the open transition has something to
  // animate) but collapsed to zero height/opacity, and hidden from
  // assistive tech. Asserted on the details wrapper's own style/attribute
  // rather than an ancestor-aware visibility check, since the outer <li>'s
  // separate scroll-reveal opacity (see below) would make everything
  // "invisible" by that measure regardless of the accordion's own state.
  expect(
    screen.getByText("Longer explanation of the work.")
  ).toBeInTheDocument();
  const detailsRegion = container.querySelector(
    `#${milestoneWithDetails.id}-details`
  );
  expect(detailsRegion).toHaveAttribute("aria-hidden", "true");
  expect(detailsRegion).toHaveStyle({ gridTemplateRows: "0fr", opacity: "0" });
  expect(screen.getByRole("button", { name: /details/i })).toHaveAttribute(
    "aria-expanded",
    "false"
  );
});

test("reveals details, technologies, and links when expanded, and collapses again on toggle", async () => {
  const user = userEvent.setup();
  const { container } = render(
    <ol>
      <TimelineItem milestone={milestoneWithDetails} />
    </ol>
  );

  const detailsRegion = () =>
    container.querySelector(`#${milestoneWithDetails.id}-details`);
  const toggle = screen.getByRole("button", { name: /details/i });
  await user.click(toggle);

  expect(toggle).toHaveAttribute("aria-expanded", "true");
  expect(detailsRegion()).toHaveAttribute("aria-hidden", "false");
  expect(detailsRegion()).toHaveStyle({
    gridTemplateRows: "1fr",
    opacity: "1",
  });
  expect(
    screen.getByText("Longer explanation of the work.")
  ).toBeInTheDocument();
  expect(screen.getByText("React")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "detailed.dev" })).toHaveAttribute(
    "href",
    "https://detailed.dev"
  );

  await user.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(detailsRegion()).toHaveAttribute("aria-hidden", "true");
  expect(detailsRegion()).toHaveStyle({
    gridTemplateRows: "0fr",
    opacity: "0",
  });
});

test("does not repeat the summary in the expanded panel when there is no separate details copy", async () => {
  const user = userEvent.setup();
  render(
    <ol>
      <TimelineItem milestone={milestoneWithoutDetailsCopy} />
    </ol>
  );

  await user.click(screen.getByRole("button", { name: /details/i }));

  expect(
    screen.getAllByText("Only a summary, no separate details.")
  ).toHaveLength(1);
  expect(screen.getByText("Vue")).toBeInTheDocument();
});

test("the details toggle is keyboard operable", async () => {
  const user = userEvent.setup();
  render(
    <ol>
      <TimelineItem milestone={milestoneWithDetails} />
    </ol>
  );

  await user.tab();
  const toggle = screen.getByRole("button", { name: /details/i });
  expect(toggle).toHaveFocus();

  await user.keyboard("{Enter}");
  expect(toggle).toHaveAttribute("aria-expanded", "true");
});

test("starts hidden/offset, ready to scroll-reveal, when the user has no motion preference", () => {
  stubReducedMotion(false);
  const { container } = render(
    <ol>
      <TimelineItem milestone={milestone} />
    </ol>
  );

  const item = container.querySelector(`#${milestone.id}`) as HTMLElement;
  expect(item.style.opacity).toBe("0");
  expect(item.style.transform).not.toBe("none");
});

test("renders immediately, with no transition, when the user prefers reduced motion", () => {
  stubReducedMotion(true);
  const { container } = render(
    <ol>
      <TimelineItem milestone={milestone} />
    </ol>
  );

  const item = container.querySelector(`#${milestone.id}`) as HTMLElement;
  expect(item.style.opacity).toBe("1");
  expect(item.style.transform).toBe("none");
  expect(item.style.transition).toBe("none");
});

test("renders visible immediately when forceVisible is set, bypassing the scroll-triggered reveal", () => {
  stubReducedMotion(false);
  const { container } = render(
    <ol>
      <TimelineItem milestone={milestone} forceVisible />
    </ol>
  );

  const item = container.querySelector(`#${milestone.id}`) as HTMLElement;
  expect(item.style.opacity).toBe("1");
});

test("starts expanded when forceExpanded is set, without requiring a click", () => {
  render(
    <ol>
      <TimelineItem milestone={milestoneWithDetails} forceExpanded />
    </ol>
  );

  expect(
    screen.getByText("Longer explanation of the work.")
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /details/i })).toHaveAttribute(
    "aria-expanded",
    "true"
  );
});

test("pulses the in-progress indicator when the user has no motion preference", () => {
  stubReducedMotion(false);
  const { container } = render(
    <ol>
      <TimelineItem milestone={{ ...milestone, status: "in-progress" }} />
    </ol>
  );

  const pulse = container.querySelector('[data-pulse="true"]');
  expect(pulse).not.toBeNull();
  expect(pulse).toHaveClass("animate-pulse");
});

test("does not animate the in-progress indicator when the user prefers reduced motion", () => {
  stubReducedMotion(true);
  const { container } = render(
    <ol>
      <TimelineItem milestone={{ ...milestone, status: "in-progress" }} />
    </ol>
  );

  const pulse = container.querySelector('[data-pulse="true"]');
  expect(pulse).not.toBeNull();
  expect(pulse).not.toHaveClass("animate-pulse");
});

test("does not render a pulse indicator for completed or planned milestones", () => {
  const { container } = render(
    <ol>
      <TimelineItem milestone={{ ...milestone, status: "completed" }} />
    </ol>
  );

  expect(container.querySelector('[data-pulse="true"]')).toBeNull();
});

test("marks itself as the current item via aria-current when isActive is set", () => {
  const { container, rerender } = render(
    <ol>
      <TimelineItem milestone={milestone} />
    </ol>
  );
  const item = () => container.querySelector(`#${milestone.id}`) as HTMLElement;
  expect(item()).not.toHaveAttribute("aria-current");

  rerender(
    <ol>
      <TimelineItem milestone={milestone} isActive />
    </ol>
  );
  expect(item()).toHaveAttribute("aria-current", "true");
});
