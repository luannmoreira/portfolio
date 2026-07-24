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
