import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { renderWithI18n } from "../test-i18n";
import ContentIndex from "./ContentIndex";
import * as loader from "../content/loader";

// Defaults to the real implementation (spread below) — only the one test
// exercising the empty state overrides it, via mockReturnValueOnce, so
// every other test in this file keeps reading real content fixtures.
vi.mock("../content/loader", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../content/loader")>();
  return { ...actual, loadContent: vi.fn(actual.loadContent) };
});

function renderBlogIndex() {
  return renderWithI18n(
    <MemoryRouter>
      <ContentIndex type="post" basePath="/blog" />
    </MemoryRouter>
  );
}

test("lists published entries of the given type, excluding other types", () => {
  renderBlogIndex();

  expect(screen.getByRole("link", { name: /Hello, Blog/ })).toBeInTheDocument();
  expect(
    screen.queryByText("Project Write-Up Placeholder")
  ).not.toBeInTheDocument();
  expect(screen.queryByText("ADR Placeholder")).not.toBeInTheDocument();
});

test("links to the entry's basePath/:slug route", () => {
  renderBlogIndex();

  expect(screen.getByRole("link", { name: /Hello, Blog/ })).toHaveAttribute(
    "href",
    "/blog/hello-world"
  );
});

test("shows each entry's reading time", () => {
  renderBlogIndex();

  expect(screen.getAllByText(/read$/i).length).toBeGreaterThan(0);
});

test("renders the type's translated heading", () => {
  renderBlogIndex();

  expect(screen.getByRole("heading", { name: "Writing" })).toBeInTheDocument();
});

test("works for a second content type (ADR), proving the generalization", () => {
  renderWithI18n(
    <MemoryRouter>
      <ContentIndex type="adr" basePath="/adr" />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: "Architecture Decision Records" })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /ADR Placeholder/ })).toHaveAttribute(
    "href",
    "/adr/placeholder"
  );
  expect(screen.queryByText("Hello, Blog")).not.toBeInTheDocument();
});

test("announces the empty-state message to assistive tech via a live region", () => {
  vi.mocked(loader.loadContent).mockReturnValueOnce([]);

  renderBlogIndex();

  expect(screen.getByRole("status")).toHaveTextContent(/nothing here yet/i);
});
