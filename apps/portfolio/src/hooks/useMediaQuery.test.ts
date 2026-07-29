import { renderHook } from "@testing-library/react";
import { useMediaQuery } from "./useMediaQuery";

function stubMatchMedia(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  );
}

test("reflects a matching query", () => {
  stubMatchMedia(true);
  const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
  expect(result.current).toBe(true);
});

test("reflects a non-matching query", () => {
  stubMatchMedia(false);
  const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
  expect(result.current).toBe(false);
});
