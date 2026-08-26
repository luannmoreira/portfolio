import { screen, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { renderWithI18n } from "../test-i18n";
import { i18n } from "../i18n";
import Post from "./Post";

afterEach(async () => {
  await i18n.changeLanguage("en");
});

function renderAtSlug(slug: string, hash = "") {
  return renderWithI18n(
    <MemoryRouter initialEntries={[`/blog/${slug}${hash}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<Post basePath="/blog" />} />
      </Routes>
    </MemoryRouter>
  );
}

test("renders the matching post's compiled MDX content", async () => {
  renderAtSlug("post-placeholder");

  expect(
    await screen.findByRole("heading", {
      name: "Blog Post Placeholder",
      level: 1,
    })
  ).toBeInTheDocument();
});

test("scrolls to the heading matching the URL's #hash once the lazy post body has loaded", async () => {
  renderAtSlug("post-placeholder", "#blog-post-placeholder");

  const heading = await screen.findByRole("heading", {
    name: "Blog Post Placeholder",
    level: 2,
  });
  expect(heading.scrollIntoView).toHaveBeenCalled();
});

test("shows a not-translated notice when the requested locale has no translation for this post", async () => {
  await i18n.changeLanguage("pt-BR");
  renderAtSlug("post-placeholder");

  await screen.findByRole("heading", {
    name: "Blog Post Placeholder",
    level: 1,
  });
  expect(
    screen.getByText(
      "Este post ainda não foi traduzido. Mostrando a versão em inglês."
    )
  ).toBeInTheDocument();
});

test("does not show the not-translated notice when the post exists in the requested locale", async () => {
  renderAtSlug("post-placeholder");

  await screen.findByRole("heading", {
    name: "Blog Post Placeholder",
    level: 1,
  });
  expect(
    screen.queryByText(/hasn't been translated yet/i)
  ).not.toBeInTheDocument();
});

test("shows a not-found message for an unknown slug", () => {
  renderAtSlug("does-not-exist");

  expect(screen.getByText(/page not found/i)).toBeInTheDocument();
});

test("renders the post's cover image as a hero when present", async () => {
  renderAtSlug("post-placeholder");
  await screen.findByRole("heading", {
    name: "Blog Post Placeholder",
    level: 1,
  });

  const hero = screen.getByRole("img", { name: "Blog Post Placeholder" });
  expect(hero).toHaveAttribute(
    "src",
    "/content/blog/en/post-placeholder/cover.png"
  );
});

test("omits the hero image when the post has no coverImage", async () => {
  renderAtSlug("shipped-documented-never-called");
  await screen.findByRole("heading", {
    name: "Shipped, Documented, Never Called",
    level: 1,
  });

  expect(
    screen.queryByRole("img", { name: "Shipped, Documented, Never Called" })
  ).not.toBeInTheDocument();
});

test("shows the post's reading time", async () => {
  renderAtSlug("post-placeholder");

  // Scoped to the article — the page-level "More Entries" section below it
  // also renders link text ending in "Read", ambiguous for an unscoped query.
  const article = await screen.findByRole("article");
  expect(within(article).getByText(/read$/i)).toBeInTheDocument();
});

test("renders a BlogPosting JSON-LD script tag with the post's real data", async () => {
  const { container } = renderAtSlug("post-placeholder");
  await screen.findByRole("heading", {
    name: "Blog Post Placeholder",
    level: 1,
  });

  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).not.toBeNull();
  const json = JSON.parse(script!.textContent!);

  expect(json).toMatchObject({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Blog Post Placeholder",
    url: "https://luanncurioso.dev/blog/post-placeholder",
    author: { "@type": "Person", name: "Luann Curioso" },
  });
});

test("includes an absolute image URL in the JSON-LD when the post has a coverImage", async () => {
  const { container } = renderAtSlug("post-placeholder");
  await screen.findByRole("heading", {
    name: "Blog Post Placeholder",
    level: 1,
  });

  const script = container.querySelector('script[type="application/ld+json"]');
  const json = JSON.parse(script!.textContent!);

  expect(json.image).toBe(
    "https://luanncurioso.dev/content/blog/en/post-placeholder/cover.png"
  );
});

test("omits the JSON-LD image field when the post has no coverImage", async () => {
  const { container } = renderAtSlug("shipped-documented-never-called");
  await screen.findByRole("heading", {
    name: "Shipped, Documented, Never Called",
    level: 1,
  });

  const script = container.querySelector('script[type="application/ld+json"]');
  const json = JSON.parse(script!.textContent!);

  expect(json.image).toBeUndefined();
});

test("omits the JSON-LD script tags for an unknown slug", () => {
  const { container } = renderAtSlug("does-not-exist");

  expect(
    container.querySelectorAll('script[type="application/ld+json"]')
  ).toHaveLength(0);
});

test("renders a BreadcrumbList JSON-LD script tag alongside BlogPosting", async () => {
  const { container } = renderAtSlug("post-placeholder");
  await screen.findByRole("heading", {
    name: "Blog Post Placeholder",
    level: 1,
  });

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
        name: "Blog Post Placeholder",
        item: "https://luanncurioso.dev/blog/post-placeholder",
      },
    ],
  });
});
