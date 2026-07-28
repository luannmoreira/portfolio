import { Link } from "react-router";
import { Navbar as SharedNavbar } from "@portfolio/ui";
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

// Portfolio's deploy target under GH Pages base /portfolio/ isn't
// hardcoded here — this app is built/deployed independently. Mirrors
// apps/blog/src/feed/plugin.ts's SITE_URL placeholder-until-decided
// pattern: falls back to an obvious placeholder, set VITE_PORTFOLIO_URL
// once both apps share a real deploy story.
const PORTFOLIO_URL =
  import.meta.env.VITE_PORTFOLIO_URL ?? "https://example.com/portfolio/";

interface PortfolioNavItem {
  label: string;
  /** Portfolio-internal path, resolved against its HashRouter. */
  to: string;
}

// Kept in sync by hand with apps/portfolio/src/components/Navbar.tsx's own
// navItems — the two apps aren't part of the same build, so this list
// can't be imported directly.
const portfolioNavItems: PortfolioNavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/about?section=skills" },
  { label: "Uses", to: "/about?section=uses" },
  { label: "Now", to: "/?section=now" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [theme, toggleTheme] = useTheme();

  return (
    <SharedNavbar
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
            <li key={item.label}>
              <a
                href={`${withTheme(PORTFOLIO_URL, theme)}#${item.to}`}
                className="text-on-surface-variant transition-colors duration-200 hover:text-primary"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/blog"
              className="border-b-2 border-primary pb-1 font-bold text-primary"
            >
              Blog
            </Link>
          </li>
        </ul>
      }
      mobileNav={
        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
          {portfolioNavItems.map((item) => (
            <a
              key={item.label}
              href={`${withTheme(PORTFOLIO_URL, theme)}#${item.to}`}
              className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface-variant hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/blog"
            className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary"
          >
            Blog
          </Link>
        </div>
      }
      themeToggle={<ThemeToggle theme={theme} toggleTheme={toggleTheme} />}
    />
  );
}
