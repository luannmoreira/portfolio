import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import Post from "./Post";

function renderAtSlug(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<Post />} />
      </Routes>
    </MemoryRouter>
  );
}

test("renders the matching post's compiled MDX content", async () => {
  renderAtSlug("hello-world");

  expect(
    await screen.findByRole("heading", { name: "Hello, Blog" })
  ).toBeInTheDocument();
});

test("shows a not-found message for an unknown slug", () => {
  renderAtSlug("does-not-exist");

  expect(screen.getByText(/page not found/i)).toBeInTheDocument();
});
