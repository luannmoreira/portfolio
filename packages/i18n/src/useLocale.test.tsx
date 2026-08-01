import { act, renderHook } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import type { ReactNode } from "react";
import { createI18n } from "./createI18n";
import { useLocale } from "./useLocale";

function wrapper({ children }: { children: ReactNode }) {
  const i18n = createI18n({
    locale: "en",
    resources: {
      en: { translation: {} },
      "pt-BR": { translation: {} },
    },
  });
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
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
