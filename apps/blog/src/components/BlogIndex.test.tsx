import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import BlogIndex from "./BlogIndex";

function renderBlogIndex() {
  return render(
    <MemoryRouter>
      <BlogIndex />
    </MemoryRouter>
  );
}

test("lists published posts, excluding other content types", () => {
  renderBlogIndex();

  expect(screen.getByRole("link", { name: "Hello, Blog" })).toBeInTheDocument();
  expect(
    screen.queryByText("Project Write-Up Placeholder")
  ).not.toBeInTheDocument();
  expect(screen.queryByText("ADR Placeholder")).not.toBeInTheDocument();
});

test("links to the post's /blog/:slug route", () => {
  renderBlogIndex();

  expect(screen.getByRole("link", { name: "Hello, Blog" })).toHaveAttribute(
    "href",
    "/blog/hello-world"
  );
});
