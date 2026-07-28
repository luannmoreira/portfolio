import "@testing-library/jest-dom";

// jsdom doesn't implement IntersectionObserver, which useInView (Reveal)
// needs just to mount. Tests don't need it to actually fire — content is
// still rendered regardless of the reveal animation's in-view state.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly scrollMargin = "";
  readonly thresholds = [];
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = () => [];
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

// jsdom doesn't implement scrollIntoView either — needed by
// useScrollToSection (anchor nav links) and any test that renders a page
// using it.
Element.prototype.scrollIntoView = vi.fn();

// jsdom doesn't implement matchMedia — needed by usePrefersReducedMotion
// (Reveal) and any test that mounts a component using it. Defaults to "no
// preference" (matches: false); individual tests override via
// vi.stubGlobal when they need the reduced-motion branch.
window.matchMedia =
  window.matchMedia ||
  ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));
