import { act, renderHook } from "@testing-library/react";
import { I18nextProvider, type I18nextProviderProps } from "react-i18next";
import type { ReactNode } from "react";
import { createI18n } from "./createI18n";
import { useLocale } from "./useLocale";

function makeI18n() {
  return createI18n({
    locale: "en",
    resources: {
      en: { translation: {} },
      "pt-BR": { translation: {} },
    },
  });
}

function wrapper({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={makeI18n()}>{children}</I18nextProvider>;
}

// For the cross-instance test: both renderHook calls must share the exact
// same i18n instance (not two independently-created ones), the same way two
// real components under one <I18nextProvider> would.
function sharedWrapper(i18n: I18nextProviderProps["i18n"]) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
  };
}

afterEach(() => {
  localStorage.clear();
  document.documentElement.lang = "";
});

test("reports the active i18n language", () => {
  const { result } = renderHook(() => useLocale(), { wrapper });

  expect(result.current[0]).toBe("en");
});

test("setLocale switches the active language, updates <html lang>, and persists the choice", () => {
  const { result } = renderHook(() => useLocale(), { wrapper });

  act(() => result.current[1]("pt-BR"));

  expect(result.current[0]).toBe("pt-BR");
  expect(document.documentElement.lang).toBe("pt-BR");
  expect(localStorage.getItem("locale")).toBe("pt-BR");
});

test("setLocale is a no-op when the requested locale is already active", () => {
  const { result } = renderHook(() => useLocale(), { wrapper });

  act(() => result.current[1]("en"));

  expect(localStorage.getItem("locale")).toBeNull();
});

test("a second, independent useLocale() instance sees a locale change made by the first", () => {
  const i18n = makeI18n();
  const shared = sharedWrapper(i18n);

  const first = renderHook(() => useLocale(), { wrapper: shared });
  const second = renderHook(() => useLocale(), { wrapper: shared });

  expect(second.result.current[0]).toBe("en");

  act(() => first.result.current[1]("pt-BR"));

  expect(second.result.current[0]).toBe("pt-BR");
});
