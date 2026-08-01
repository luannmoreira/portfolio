import { pickLocale, resolveInitialLocale } from "./resolveInitialLocale";

afterEach(() => {
  localStorage.clear();
  history.replaceState(null, "", "/");
});

test("prefers the link param over everything else", () => {
  expect(
    pickLocale({
      fromLink: "pt-BR",
      stored: "en",
      navigatorLanguages: ["en-US"],
    })
  ).toBe("pt-BR");
});

test("falls back to the stored value when there is no link param", () => {
  expect(
    pickLocale({
      fromLink: null,
      stored: "pt-BR",
      navigatorLanguages: ["en-US"],
    })
  ).toBe("pt-BR");
});

test("falls back to a Portuguese navigator language when nothing is stored", () => {
  expect(
    pickLocale({
      fromLink: null,
      stored: null,
      navigatorLanguages: ["pt-BR", "en-US"],
    })
  ).toBe("pt-BR");
});

test("matches a bare pt navigator language too", () => {
  expect(
    pickLocale({
      fromLink: null,
      stored: null,
      navigatorLanguages: ["pt"],
    })
  ).toBe("pt-BR");
});

test("defaults to English when nothing matches", () => {
  expect(
    pickLocale({
      fromLink: null,
      stored: null,
      navigatorLanguages: ["en-US", "fr-FR"],
    })
  ).toBe("en");
});

test("ignores an unsupported link param or stored value", () => {
  expect(
    pickLocale({
      fromLink: "fr",
      stored: "de",
      navigatorLanguages: ["en-US"],
    })
  ).toBe("en");
});

test("resolveInitialLocale reads the ?lang= query param and persists it", () => {
  history.replaceState(null, "", "/?lang=pt-BR");

  expect(resolveInitialLocale()).toBe("pt-BR");
  expect(localStorage.getItem("locale")).toBe("pt-BR");
});

test("resolveInitialLocale falls back to localStorage without a link param", () => {
  localStorage.setItem("locale", "pt-BR");

  expect(resolveInitialLocale()).toBe("pt-BR");
});
