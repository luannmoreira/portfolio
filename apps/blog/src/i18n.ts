import { setupI18n } from "@portfolio/i18n";
import en from "./locales/en/translation.json";
import ptBR from "./locales/pt-BR/translation.json";

export const i18n = setupI18n({
  en: { translation: en },
  "pt-BR": { translation: ptBR },
});
