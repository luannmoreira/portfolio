import { renderHook } from "@testing-library/react";
import { useDocumentMeta } from "./useDocumentMeta";

afterEach(() => {
  document.title = "";
  document
    .querySelectorAll('meta[name="description"]')
    .forEach((meta) => meta.remove());
});

test("sets the document title", () => {
  renderHook(() => useDocumentMeta("Resume"));

  expect(document.title).toBe("Resume");
});

test("creates a meta description tag when none exists", () => {
  renderHook(() => useDocumentMeta("Resume", "My resume."));

  const meta = document.querySelector('meta[name="description"]');
  expect(meta).toHaveAttribute("content", "My resume.");
});

test("updates an existing meta description tag's content", () => {
  const meta = document.createElement("meta");
  meta.name = "description";
  meta.content = "Old description.";
  document.head.appendChild(meta);

  renderHook(() => useDocumentMeta("Resume", "New description."));

  expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
    "content",
    "New description."
  );
});

test("leaves the meta description untouched when none is given", () => {
  renderHook(() => useDocumentMeta("Resume"));

  expect(document.querySelector('meta[name="description"]')).toBeNull();
});
