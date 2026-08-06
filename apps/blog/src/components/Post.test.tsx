import { screen, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { renderWithI18n } from "../test-i18n";
import Post from "./Post";

function renderAtSlug(slug: string) {
  return renderWithI18n(
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

test("renders a BlogPosting JSON-LD script tag with the post's real data", async () => {
  const { container } = renderAtSlug("hello-world");
  await screen.findByRole("heading", { name: "Hello, Blog", level: 1 });

  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).not.toBeNull();
  const json = JSON.parse(script!.textContent!);

  expect(json).toMatchObject({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Hello, Blog",
    url: "https://luanncurioso.dev/blog/hello-world",
    author: { "@type": "Person", name: "Luann Curioso" },
  });
});

test("omits the JSON-LD script tags for an unknown slug", () => {
  const { container } = renderAtSlug("does-not-exist");

  expect(
    container.querySelectorAll('script[type="application/ld+json"]')
  ).toHaveLength(0);
});

test("renders a BreadcrumbList JSON-LD script tag alongside BlogPosting", async () => {
  const { container } = renderAtSlug("hello-world");
  await screen.findByRole("heading", { name: "Hello, Blog", level: 1 });

  const scripts = container.querySelectorAll(
    'script[type="application/ld+json"]'
  );
  expect(scripts).toHaveLength(2);
  const json = JSON.parse(scripts[1].textContent!);

  expect(json).toMatchObject({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: "https://luanncurioso.dev/blog",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hello, Blog",
        item: "https://luanncurioso.dev/blog/hello-world",
      },
    ],
  });
});
