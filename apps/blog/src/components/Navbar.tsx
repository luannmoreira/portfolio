import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Navbar as SharedNavbar, LanguageSwitcher } from "@portfolio/ui";
import { useLocale } from "@portfolio/i18n";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../hooks/useTheme";

interface PortfolioNavItem {
  labelKey: string;
  /** Portfolio-internal, root-relative path. A plain <a> (not react-router's
   * <Link>), since the portfolio is a separate SPA bundle served from "/"
   * on the same domain — a full page load, not a client-side transition.
   * Theme/locale need no query-param carrying here: same-origin means
   * localStorage is already shared with the target app. */
  to: string;
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
          className="font-headline-md text-headline-md font-bold text-on-background"
        >
          Luann Curioso
        </Link>
      }
      desktopNav={
        <ul className="hidden items-center gap-gutter md:flex">
          {portfolioNavItems.map((item) => (
            <li key={item.labelKey}>
              <a
                href={item.to}
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
              href={item.to}
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
