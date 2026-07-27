import { Link, useLocation } from "react-router";
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

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-outline-variant/30 bg-surface/80 px-margin-mobile py-4 backdrop-blur-md lg:px-gutter print:hidden">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between text-on-surface">
        <Link to="/" aria-label="Luann Curioso">
          <img
            src={logo}
            className="App-logo w-12 rounded-full"
            alt="logo"
            width={503}
            height={414}
          />
        </Link>
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
                    item.activePath && pathname === item.activePath
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
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <Link
            to="/resume"
            className="rounded-lg bg-primary px-6 py-2 font-bold text-on-primary transition-opacity hover:opacity-90"
          >
            Resume
          </Link>
        </div>
      </div>
    </nav>
  );
}
