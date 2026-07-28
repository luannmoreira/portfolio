import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import type { ReactNode } from "react";
import { useDocumentMeta } from "./useDocumentMeta";

function wrapper(path = "/resume") {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>;
  };
}

afterEach(() => {
  document.title = "";
  document
    .querySelectorAll(
      'meta[name="description"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]'
    )
    .forEach((el) => el.remove());
});

test("sets the document title", () => {
  renderHook(() => useDocumentMeta("Resume"), { wrapper: wrapper() });

  expect(document.title).toBe("Resume");
});

test("creates a meta description tag when none exists", () => {
  renderHook(() => useDocumentMeta("Resume", "My resume."), {
    wrapper: wrapper(),
  });

  const meta = document.querySelector('meta[name="description"]');
  expect(meta).toHaveAttribute("content", "My resume.");
});

test("updates an existing meta description tag's content", () => {
  const meta = document.createElement("meta");
  meta.name = "description";
  meta.content = "Old description.";
  document.head.appendChild(meta);

  renderHook(() => useDocumentMeta("Resume", "New description."), {
    wrapper: wrapper(),
  });

  expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
    "content",
    "New description."
  );
});

test("leaves the meta description untouched when none is given", () => {
  renderHook(() => useDocumentMeta("Resume"), { wrapper: wrapper() });

  expect(document.querySelector('meta[name="description"]')).toBeNull();
});

test("sets Open Graph and Twitter Card tags from title and description", () => {
  renderHook(() => useDocumentMeta("Resume — Luann Curioso", "My resume."), {
    wrapper: wrapper(),
  });

  expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Resume — Luann Curioso"
  );
  expect(
    document.querySelector('meta[property="og:description"]')
  ).toHaveAttribute("content", "My resume.");
  expect(document.querySelector('meta[name="twitter:title"]')).toHaveAttribute(
    "content",
    "Resume — Luann Curioso"
  );
  expect(
    document.querySelector('meta[name="twitter:description"]')
  ).toHaveAttribute("content", "My resume.");
  expect(
    document.querySelector('meta[name="twitter:card"]')
  ).toHaveAttribute("content", "summary_large_image");
});

test("sets a canonical link and og:url from the current route", () => {
  renderHook(() => useDocumentMeta("Resume — Luann Curioso"), {
    wrapper: wrapper("/resume"),
  });

  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://luanncurioso-portfolio.pages.dev/resume"
  );
  expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://luanncurioso-portfolio.pages.dev/resume"
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
