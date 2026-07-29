import { renderHook, act } from "@testing-library/react";
import { useActiveTimelineItem } from "./useActiveTimelineItem";

class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  observed: Element[] = [];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.callback = callback;
    this.options = options;
    FakeIntersectionObserver.instances.push(this);
  }
  observe(el: Element) {
    this.observed.push(el);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

function makeEntry(
  id: string,
  isIntersecting: boolean,
  rect: { top: number; left: number }
) {
  return {
    target: document.getElementById(id)!,
    isIntersecting,
    boundingClientRect: rect,
  } as unknown as IntersectionObserverEntry;
}

beforeEach(() => {
  FakeIntersectionObserver.instances = [];
  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
  document.body.innerHTML = '<div id="a"></div><div id="b"></div>';
});

test("starts with no active item until something intersects", () => {
  const { result } = renderHook(() => useActiveTimelineItem(["a", "b"]));
  expect(result.current).toBeNull();
});

test("tracks the id of the intersecting entry closest to the viewport center, on the vertical axis by default", () => {
  const { result } = renderHook(() => useActiveTimelineItem(["a", "b"]));
  const observer = FakeIntersectionObserver.instances[0];

  act(() => {
    observer.callback(
      [
        makeEntry("a", true, { top: 50, left: 10 }),
        makeEntry("b", true, { top: 10, left: 50 }),
      ],
      observer as unknown as IntersectionObserver
    );
  });

  expect(result.current).toBe("b");
});

test("ignores non-intersecting entries", () => {
  const { result } = renderHook(() => useActiveTimelineItem(["a", "b"]));
  const observer = FakeIntersectionObserver.instances[0];

  act(() => {
    observer.callback(
      [makeEntry("a", false, { top: 0, left: 0 })],
      observer as unknown as IntersectionObserver
    );
  });

  expect(result.current).toBeNull();
});

test("uses the left edge instead of top when axis is horizontal", () => {
  const { result } = renderHook(() =>
    useActiveTimelineItem(["a", "b"], { axis: "x" })
  );
  const observer = FakeIntersectionObserver.instances[0];

  act(() => {
    observer.callback(
      [
        makeEntry("a", true, { top: 10, left: 50 }),
        makeEntry("b", true, { top: 50, left: 10 }),
      ],
      observer as unknown as IntersectionObserver
    );
  });

  // "a" has the smaller top (would win on the default y axis), but "b" has
  // the smaller left — proving axis: "x" actually switched the comparison.
  expect(result.current).toBe("b");
});

test("resolves trackRef.current as root, and passes rootMargin through, only on the horizontal axis", () => {
  const trackRef = { current: document.createElement("div") };
  renderHook(() =>
    useActiveTimelineItem(["a", "b"], {
      trackRef,
      rootMargin: "0px -45% 0px -45%",
      axis: "x",
    })
  );

  const observer = FakeIntersectionObserver.instances[0];
  expect(observer.options?.root).toBe(trackRef.current);
  expect(observer.options?.rootMargin).toBe("0px -45% 0px -45%");
});

test("ignores trackRef and uses the page viewport as root on the vertical axis", () => {
  const trackRef = { current: document.createElement("div") };
  renderHook(() => useActiveTimelineItem(["a", "b"], { trackRef, axis: "y" }));

  const observer = FakeIntersectionObserver.instances[0];
  expect(observer.options?.root).toBeNull();
});
