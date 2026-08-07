import "@testing-library/jest-dom";

// jsdom doesn't implement scrollIntoView — needed by useScrollToHash and
// any test that renders a page using it.
Element.prototype.scrollIntoView = vi.fn();
