import { Link, useLocation } from "react-router";
import { Navbar as SharedNavbar } from "@portfolio/ui";
import logo from "../assets/logo.png";
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
  label: string;
  to: string;
  /** Route this item is considered "active" for (anchor items share their
   * parent route's pathname, so they don't get their own active state). */
  activePath?: string;
  /** True for links that leave this app (the blog is a separate deploy). */
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", to: "/", activePath: "/" },
  { label: "About", to: "/about", activePath: "/about" },
  { label: "Skills", to: "/about?section=skills" },
  { label: "Courses", to: "/about?section=courses" },
  { label: "Uses", to: "/about?section=uses" },
  { label: "Now", to: "/?section=now" },
  { label: "Contact", to: "/contact", activePath: "/contact" },
  { label: "Blog", to: BLOG_URL, external: true },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [theme, toggleTheme] = useTheme();

  function isActive(item: NavItem) {
    return Boolean(item.activePath && pathname === item.activePath);
  }

  return (
    <SharedNavbar
      brand={
        <Link to="/" aria-label="Luann Curioso">
          <img
            src={logo}
            className="App-logo w-12 rounded-full"
            alt="logo"
            width={503}
            height={414}
          />
        </Link>
      }
      desktopNav={
        <ul className="hidden items-center gap-gutter md:flex">
          {navItems.map((item) =>
            item.external ? (
              <li key={item.label}>
                <a
                  href={withTheme(item.to, theme)}
                  className="text-on-surface-variant transition-colors duration-200 hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className={
                    isActive(item)
                      ? "border-b-2 border-primary pb-1 font-bold text-primary"
                      : "text-on-surface-variant transition-colors duration-200 hover:text-primary"
                  }
                >
                  {item.label}
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
                key={item.label}
                href={withTheme(item.to, theme)}
                className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface-variant hover:text-primary"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className={
                  isActive(item)
                    ? "font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary"
                    : "font-headline-lg-mobile text-headline-lg-mobile text-on-surface-variant hover:text-primary"
                }
              >
                {item.label}
              </Link>
            )
          )}
          <div className="my-4 h-px w-full bg-outline-variant/30" />
          <Link
            to="/resume"
            className="w-full rounded-lg bg-primary py-4 text-center font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-90"
          >
            Resume
          </Link>
        </div>
      }
      themeToggle={<ThemeToggle theme={theme} toggleTheme={toggleTheme} />}
      desktopCta={
        <Link
          to="/resume"
          className="rounded-lg bg-primary px-6 py-2 font-bold text-on-primary transition-opacity hover:opacity-90"
        >
          Resume
        </Link>
      }
    />
  );
}
