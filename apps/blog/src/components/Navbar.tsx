import { Link } from "react-router";
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
  { label: "Courses", to: "/about?section=courses" },
  { label: "Uses", to: "/about?section=uses" },
  { label: "Now", to: "/?section=now" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [theme, toggleTheme] = useTheme();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-outline-variant/30 bg-surface/80 px-margin-mobile py-4 backdrop-blur-md lg:px-gutter print:hidden">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between text-on-surface">
        <Link
          to="/blog"
          className="font-headline-md text-headline-md font-bold text-primary"
        >
          Luann Curioso
        </Link>
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
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </nav>
  );
}
