import { renderHook } from "@testing-library/react";
import { useDocumentMeta } from "./useDocumentMeta";

afterEach(() => {
  document.title = "";
  document
    .querySelectorAll('meta[name="description"]')
    .forEach((meta) => meta.remove());
});

test("sets the document title", () => {
  renderHook(() => useDocumentMeta("Blog"));

  expect(document.title).toBe("Blog");
});

test("creates a meta description tag when none exists", () => {
  renderHook(() => useDocumentMeta("Blog", "Long-form engineering writing."));

  const meta = document.querySelector('meta[name="description"]');
  expect(meta).toHaveAttribute("content", "Long-form engineering writing.");
});

test("updates an existing meta description tag's content", () => {
  const meta = document.createElement("meta");
  meta.name = "description";
  meta.content = "Old description.";
  document.head.appendChild(meta);

  renderHook(() => useDocumentMeta("Blog", "New description."));

  expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
    "content",
    "New description."
  );
});

test("leaves the meta description untouched when none is given", () => {
  renderHook(() => useDocumentMeta("Blog"));

  expect(document.querySelector('meta[name="description"]')).toBeNull();
});
