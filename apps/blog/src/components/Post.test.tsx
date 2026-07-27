import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import Post from "./Post";

function renderAtSlug(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<Post basePath="/blog" />} />
      </Routes>
    </MemoryRouter>
  );
}

test("renders the matching post's compiled MDX content", async () => {
  renderAtSlug("hello-world");

  expect(
    await screen.findByRole("heading", { name: "Hello, Blog", level: 1 })
  ).toBeInTheDocument();
});

test("shows a not-found message for an unknown slug", () => {
  renderAtSlug("does-not-exist");

  expect(screen.getByText(/page not found/i)).toBeInTheDocument();
});

test("shows the post's reading time", async () => {
  renderAtSlug("hello-world");

  // Scoped to the article — the page-level "More Entries" section below it
  // also renders link text ending in "Read", ambiguous for an unscoped query.
  const article = await screen.findByRole("article");
  expect(within(article).getByText(/read$/i)).toBeInTheDocument();
});
