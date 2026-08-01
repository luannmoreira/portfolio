import { createI18n, resolveInitialLocale } from "@portfolio/i18n";
import en from "./locales/en/translation.json";
import ptBR from "./locales/pt-BR/translation.json";

const locale = resolveInitialLocale();
document.documentElement.lang = locale;

export const i18n = createI18n({
  locale,
  resources: {
    en: { translation: en },
    "pt-BR": { translation: ptBR },
  },
});
