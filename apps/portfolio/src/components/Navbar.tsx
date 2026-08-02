import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Navbar as SharedNavbar, LanguageSwitcher } from "@portfolio/ui";
import { useLocale, withLocale } from "@portfolio/i18n";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../hooks/useTheme";
import type { Theme } from "../hooks/useTheme";

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

// Blog's deploy target is deliberately undecided (apps/blog/vite.config.js)
// — this app is built/deployed independently, so it isn't hardcoded here.
// Mirrors apps/blog/src/feed/plugin.ts's SITE_URL placeholder-until-decided
// pattern: falls back to an obvious placeholder, set VITE_BLOG_URL once
// both apps share a real deploy story.
const BLOG_URL = import.meta.env.VITE_BLOG_URL ?? "https://example.com/blog/";

interface NavItem {
  labelKey: string;
  to: string;
  /** Route this item is considered "active" for (anchor items share their
   * parent route's pathname, so they don't get their own active state). */
  activePath?: string;
  /** True for links that leave this app (the blog is a separate deploy). */
  external?: boolean;
}

// Primary nav per prompt.MD's PRD (section 5.1, "Navigation (Standardized)")
// and the Stitch source design: Home, About, Contact, Blog. Skills/Uses stay
// reachable as in-page anchors on About/Home, just not as top-level nav
// items; the Engineering Timeline on Home has its own per-milestone hash
// deep links (see Timeline.tsx) rather than a single top-level nav entry.
const navItems: NavItem[] = [
  { labelKey: "nav.home", to: "/", activePath: "/" },
  { labelKey: "nav.about", to: "/about", activePath: "/about" },
  { labelKey: "nav.contact", to: "/contact", activePath: "/contact" },
  { labelKey: "nav.blog", to: BLOG_URL, external: true },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [theme, toggleTheme] = useTheme();
  const [locale, setLocale] = useLocale();

  function isActive(item: NavItem) {
    return Boolean(item.activePath && pathname === item.activePath);
  }

  function crossAppHref(to: string) {
    return withTheme(withLocale(to, locale), theme);
  }

  return (
    <SharedNavbar
      openMenuLabel={t("nav.openMenu")}
      closeMenuLabel={t("nav.closeMenu")}
      dialogLabel={t("nav.mainMenu")}
      brand={
        <Link
          to="/"
          className="font-headline-md text-headline-md font-bold text-on-background"
        >
          Luann Curioso
        </Link>
      }
      desktopNav={
        <ul className="hidden items-center gap-gutter md:flex">
          {navItems.map((item) =>
            item.external ? (
              <li key={item.labelKey}>
                <a
                  href={crossAppHref(item.to)}
                  className="text-on-surface-variant transition-colors duration-200 hover:text-primary"
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ) : (
              <li key={item.labelKey}>
                <Link
                  to={item.to}
                  className={
                    isActive(item)
                      ? "border-b-2 border-primary pb-1 font-bold text-primary"
                      : "text-on-surface-variant transition-colors duration-200 hover:text-primary"
                  }
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            )
          )}
        </ul>
      }
      mobileNav={
        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.labelKey}
                href={crossAppHref(item.to)}
                className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface-variant hover:text-primary"
              >
                {t(item.labelKey)}
              </a>
            ) : (
              <Link
                key={item.labelKey}
                to={item.to}
                className={
                  isActive(item)
                    ? "font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary"
                    : "font-headline-lg-mobile text-headline-lg-mobile text-on-surface-variant hover:text-primary"
                }
              >
                {t(item.labelKey)}
              </Link>
            )
          )}
          <div className="my-4 h-px w-full bg-outline-variant/30" />
          <Link
            to="/resume"
            className="w-full rounded-lg bg-button py-4 text-center font-bold uppercase tracking-widest text-on-button transition-opacity hover:opacity-90"
          >
            {t("nav.resume")}
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
      desktopCta={
        <Link
          to="/resume"
          className="rounded-lg bg-button px-6 py-2 font-bold text-on-button transition-opacity hover:opacity-90"
        >
          {t("nav.resume")}
        </Link>
      }
    />
  );
}
