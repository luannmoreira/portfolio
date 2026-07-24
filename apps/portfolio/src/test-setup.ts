import "@testing-library/jest-dom";

// jsdom doesn't implement matchMedia, and react-slick's responsive-breakpoint
// handling (via enquire.js) requires it just to mount. Remove this once
// Phase 5 replaces react-slick with a plain CSS grid.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

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
