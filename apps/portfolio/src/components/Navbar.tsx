import { Link, useLocation } from "react-router";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  label: string;
  to: string;
  /** Route this item is considered "active" for (anchor items share their
   * parent route's pathname, so they don't get their own active state). */
  activePath?: string;
}

const navItems: NavItem[] = [
  { label: "Home", to: "/", activePath: "/" },
  { label: "About", to: "/about", activePath: "/about" },
  { label: "Skills", to: "/about?section=skills" },
  {
    label: "Certifications",
    to: "/certifications",
    activePath: "/certifications",
  },
  { label: "Uses", to: "/certifications?section=uses" },
  { label: "Now", to: "/?section=now" },
  { label: "Contact", to: "/contact", activePath: "/contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();

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
          {navItems.map((item) => (
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
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
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
