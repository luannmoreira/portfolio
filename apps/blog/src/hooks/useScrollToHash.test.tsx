import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { useScrollToHash } from "./useScrollToHash";

beforeEach(() => {
  vi.clearAllMocks();
});

function Page() {
  useScrollToHash();
  return (
    <div>
      <h2 id="the-compile-pipeline">The Compile Pipeline</h2>
    </div>
  );
}

test("scrolls to the element matching the URL's #hash on mount", () => {
  render(
    <MemoryRouter initialEntries={["/blog/some-post#the-compile-pipeline"]}>
      <Page />
    </MemoryRouter>
  );

  expect(
    document.getElementById("the-compile-pipeline")?.scrollIntoView
  ).toHaveBeenCalled();
});

test("does nothing when there is no #hash", () => {
  render(
    <MemoryRouter initialEntries={["/blog/some-post"]}>
      <Page />
    </MemoryRouter>
  );

  expect(
    document.getElementById("the-compile-pipeline")?.scrollIntoView
  ).not.toHaveBeenCalled();
});

test("does nothing when the hash doesn't match any element id", () => {
  render(
    <MemoryRouter initialEntries={["/blog/some-post#missing"]}>
      <Page />
    </MemoryRouter>
  );

  expect(
    document.getElementById("the-compile-pipeline")?.scrollIntoView
  ).not.toHaveBeenCalled();
});
