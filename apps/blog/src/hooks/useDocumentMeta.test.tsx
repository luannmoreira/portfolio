import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import type { ReactNode } from "react";
import { useDocumentMeta } from "./useDocumentMeta";

function wrapper(path = "/blog") {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>;
  };
}

afterEach(() => {
  document.title = "";
  document
    .querySelectorAll(
      'meta[name="description"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], link[rel="alternate"]'
    )
    .forEach((el) => el.remove());
});

test("sets the document title", () => {
  renderHook(() => useDocumentMeta("Blog"), { wrapper: wrapper() });

  expect(document.title).toBe("Blog");
});

test("creates a meta description tag when none exists", () => {
  renderHook(() => useDocumentMeta("Blog", "Long-form engineering writing."), {
    wrapper: wrapper(),
  });

  const meta = document.querySelector('meta[name="description"]');
  expect(meta).toHaveAttribute("content", "Long-form engineering writing.");
});

test("updates an existing meta description tag's content", () => {
  const meta = document.createElement("meta");
  meta.name = "description";
  meta.content = "Old description.";
  document.head.appendChild(meta);

  renderHook(() => useDocumentMeta("Blog", "New description."), {
    wrapper: wrapper(),
  });

  expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
    "content",
    "New description."
  );
});

test("leaves the meta description absent when none is given and none existed", () => {
  renderHook(() => useDocumentMeta("Blog"), { wrapper: wrapper() });

  expect(document.querySelector('meta[name="description"]')).toBeNull();
});

test("clears a stale description (and its og/twitter mirrors) when a later render omits it", () => {
  const { rerender } = renderHook(
    ({ description }: { description: string | undefined }) =>
      useDocumentMeta("Blog", description),
    {
      wrapper: wrapper(),
      initialProps: { description: "Old description." as string | undefined },
    }
  );

  expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
    "content",
    "Old description."
  );

  rerender({ description: undefined });

  expect(document.querySelector('meta[name="description"]')).toBeNull();
  expect(document.querySelector('meta[property="og:description"]')).toBeNull();
  expect(document.querySelector('meta[name="twitter:description"]')).toBeNull();
});

test("sets Open Graph and Twitter Card tags from title and description", () => {
  renderHook(() => useDocumentMeta("Hello World — Blog", "A first post."), {
    wrapper: wrapper(),
  });

  expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Hello World — Blog"
  );
  expect(
    document.querySelector('meta[property="og:description"]')
  ).toHaveAttribute("content", "A first post.");
  expect(document.querySelector('meta[name="twitter:title"]')).toHaveAttribute(
    "content",
    "Hello World — Blog"
  );
  expect(
    document.querySelector('meta[name="twitter:description"]')
  ).toHaveAttribute("content", "A first post.");
  expect(document.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary"
  );
});

test("sets a canonical link and og:url from the current route", () => {
  renderHook(() => useDocumentMeta("Hello World — Blog"), {
    wrapper: wrapper("/blog/hello-world"),
  });

  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://luanncurioso.dev/blog/hello-world"
  );
  expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://luanncurioso.dev/blog/hello-world"
  );
});

test("reuses a single canonical link and og/twitter meta tags across re-renders instead of duplicating them", () => {
  const { rerender } = renderHook(
    ({ title }: { title: string }) => useDocumentMeta(title, "desc"),
    { wrapper: wrapper(), initialProps: { title: "First" } }
  );

  rerender({ title: "Second" });

  expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  expect(document.querySelectorAll('meta[property="og:title"]')).toHaveLength(
    1
  );
  expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Second"
  );
});

test("sets hreflang alternate links for both locales plus x-default, from the current route", () => {
  renderHook(() => useDocumentMeta("Hello World — Blog"), {
    wrapper: wrapper("/blog/hello-world"),
  });

  const en = document.querySelector('link[rel="alternate"][hreflang="en"]');
  const ptBR = document.querySelector(
    'link[rel="alternate"][hreflang="pt-BR"]'
  );
  const xDefault = document.querySelector(
    'link[rel="alternate"][hreflang="x-default"]'
  );

  expect(en).toHaveAttribute(
    "href",
    "https://luanncurioso.dev/blog/hello-world?lang=en"
  );
  expect(ptBR).toHaveAttribute(
    "href",
    "https://luanncurioso.dev/blog/hello-world?lang=pt-BR"
  );
  expect(xDefault).toHaveAttribute(
    "href",
    "https://luanncurioso.dev/blog/hello-world"
  );
});

test("reuses the same 3 alternate links across re-renders instead of duplicating them", () => {
  const { rerender } = renderHook(
    ({ title }: { title: string }) => useDocumentMeta(title),
    { wrapper: wrapper(), initialProps: { title: "First" } }
  );

  rerender({ title: "Second" });

  expect(document.querySelectorAll('link[rel="alternate"]')).toHaveLength(3);
});
