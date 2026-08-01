import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { i18n } from "./i18n";

// Wraps a standalone component (one not rendered through <App />, which
// already provides this) with the app's real i18n instance — seeded with
// the actual translation JSON, not a mock, so a typo'd or missing key
// fails the test instead of silently rendering the raw key.
export function renderWithI18n(ui: ReactElement, options?: RenderOptions) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>, options);
}
