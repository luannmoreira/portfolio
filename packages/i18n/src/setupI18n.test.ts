import { setupI18n } from "./setupI18n";

afterEach(() => {
  localStorage.clear();
  history.replaceState(null, "", "/");
  document.documentElement.lang = "";
});

test("sets <html lang> to the resolved locale", () => {
  history.replaceState(null, "", "/?lang=pt-BR");

  setupI18n({ en: { translation: {} }, "pt-BR": { translation: {} } });

  expect(document.documentElement.lang).toBe("pt-BR");
});

test("initializes an i18next instance with the given resources", () => {
  const instance = setupI18n({
    en: { translation: { greeting: "hi" } },
    "pt-BR": { translation: { greeting: "oi" } },
  });

  expect(instance.getResource("en", "translation", "greeting")).toBe("hi");
});
