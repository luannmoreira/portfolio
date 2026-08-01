import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Navbar as SharedNavbar, LanguageSwitcher } from "@portfolio/ui";
import { useLocale, withLocale } from "@portfolio/i18n";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../hooks/useTheme";
import type { Theme } from "../hooks/useTheme";
import type { Locale } from "@portfolio/i18n";

// localStorage can't cross origins, and the portfolio/blog are two separate
// Cloudflare Pages deploys — so the theme choice can't just be "shared
// storage". Carrying it in the URL on the way out (read back by the other
// app's pre-paint script, see index.html) is the practical middle ground:
// clicking between the two sites keeps them in sync without needing a
// custom domain to unify their origins.
function withTheme(url: string, theme: Theme): string {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}theme=${theme}`;
}

// Portfolio's deploy target isn't hardcoded here — this app is
// built/deployed independently. Mirrors apps/blog/src/feed/plugin.ts's
// SITE_URL placeholder-until-decided pattern: falls back to an obvious
// placeholder in dev, set for real via .env.production's VITE_PORTFOLIO_URL.
const PORTFOLIO_URL =
  import.meta.env.VITE_PORTFOLIO_URL ?? "https://example.com/portfolio/";

interface PortfolioNavItem {
  labelKey: string;
  /** Portfolio-internal path — a real route since the portfolio moved from
   * HashRouter to BrowserRouter. */
  to: string;
}

// Resolves a portfolio-internal path against PORTFOLIO_URL's origin (e.g.
// "/about?section=skills" -> "https://…pages.dev/about?section=skills"),
// then layers the cross-app theme/locale params on top — done in steps so
// withLocale/withTheme's "append ?/& correctly" logic runs against the
// real query string a path like "/about?section=skills" already carries,
// rather than duplicating that logic here.
function resolvePortfolioLink(to: string, theme: Theme, locale: Locale) {
  return withTheme(
    withLocale(new URL(to, PORTFOLIO_URL).toString(), locale),
    theme
  );
}

// Kept in sync by hand with apps/portfolio/src/components/Navbar.tsx's own
// navItems — the two apps aren't part of the same build, so this list
// can't be imported directly. Primary nav per prompt.MD's PRD (section 5.1):
// Home, About, Contact, Blog (Blog is appended separately below).
const portfolioNavItems: PortfolioNavItem[] = [
  { labelKey: "nav.home", to: "/" },
  { labelKey: "nav.about", to: "/about" },
  { labelKey: "nav.contact", to: "/contact" },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [theme, toggleTheme] = useTheme();
  const [locale, setLocale] = useLocale();

  return (
    <SharedNavbar
      openMenuLabel={t("nav.openMenu")}
      closeMenuLabel={t("nav.closeMenu")}
      dialogLabel={t("nav.mainMenu")}
      brand={
        <Link
          to="/blog"
          className="font-headline-md text-headline-md font-bold text-primary"
        >
          Luann Curioso
        </Link>
      }
      desktopNav={
        <ul className="hidden items-center gap-gutter md:flex">
          {portfolioNavItems.map((item) => (
            <li key={item.labelKey}>
              <a
                href={resolvePortfolioLink(item.to, theme, locale)}
                className="text-on-surface-variant transition-colors duration-200 hover:text-primary"
              >
                {t(item.labelKey)}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/blog"
              className="border-b-2 border-primary pb-1 font-bold text-primary"
            >
              {t("nav.blog")}
            </Link>
          </li>
        </ul>
      }
      mobileNav={
        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
          {portfolioNavItems.map((item) => (
            <a
              key={item.labelKey}
              href={resolvePortfolioLink(item.to, theme, locale)}
              className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface-variant hover:text-primary"
            >
              {t(item.labelKey)}
            </a>
          ))}
          <Link
            to="/blog"
            className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary"
          >
            {t("nav.blog")}
          </Link>
        </div>
      }
      themeToggle={<ThemeToggle theme={theme} toggleTheme={toggleTheme} />}
      languageSwitcher={
        <LanguageSwitcher
          locale={locale}
          onChange={setLocale}
          label={t("languageSwitcher.groupLabel")}
        />
      }
    />
  );
}
