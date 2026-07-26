import { act, renderHook } from "@testing-library/react";
import { useTheme } from "./useTheme";

afterEach(() => {
  document.documentElement.classList.remove("light");
  localStorage.clear();
});

test("reports dark when the html element has no light class", () => {
  const { result } = renderHook(() => useTheme());

  expect(result.current[0]).toBe("dark");
});

test("reports light when the html element already has the light class", () => {
  document.documentElement.classList.add("light");

  const { result } = renderHook(() => useTheme());

  expect(result.current[0]).toBe("light");
});

test("toggling from dark adds the light class and persists the choice", () => {
  const { result } = renderHook(() => useTheme());

  act(() => result.current[1]());

  expect(result.current[0]).toBe("light");
  expect(document.documentElement.classList.contains("light")).toBe(true);
  expect(localStorage.getItem("theme")).toBe("light");
});

test("toggling from light removes the light class and persists the choice", () => {
  document.documentElement.classList.add("light");
  const { result } = renderHook(() => useTheme());

  act(() => result.current[1]());

  expect(result.current[0]).toBe("dark");
  expect(document.documentElement.classList.contains("light")).toBe(false);
  expect(localStorage.getItem("theme")).toBe("dark");
});
