import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ContentIndex from "./ContentIndex";

function renderBlogIndex() {
  return render(
    <MemoryRouter>
      <ContentIndex type="post" basePath="/blog" heading="Blog" />
    </MemoryRouter>
  );
}

test("lists published entries of the given type, excluding other types", () => {
  renderBlogIndex();

  expect(screen.getByRole("link", { name: "Hello, Blog" })).toBeInTheDocument();
  expect(
    screen.queryByText("Project Write-Up Placeholder")
  ).not.toBeInTheDocument();
  expect(screen.queryByText("ADR Placeholder")).not.toBeInTheDocument();
});

test("links to the entry's basePath/:slug route", () => {
  renderBlogIndex();

  expect(screen.getByRole("link", { name: "Hello, Blog" })).toHaveAttribute(
    "href",
    "/blog/hello-world"
  );
});

test("shows each entry's reading time", () => {
  renderBlogIndex();

  expect(screen.getAllByText(/read$/i).length).toBeGreaterThan(0);
});

test("renders the given heading", () => {
  renderBlogIndex();

  expect(screen.getByRole("heading", { name: "Blog" })).toBeInTheDocument();
});

test("works for a second content type (ADR), proving the generalization", () => {
  render(
    <MemoryRouter>
      <ContentIndex
        type="adr"
        basePath="/adr"
        heading="Architecture Decision Records"
      />
    </MemoryRouter>
  );

  expect(screen.getByRole("link", { name: "ADR Placeholder" })).toHaveAttribute(
    "href",
    "/adr/placeholder"
  );
  expect(screen.queryByText("Hello, Blog")).not.toBeInTheDocument();
});
