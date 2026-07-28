import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { useFocusTrap } from "./useFocusTrap";

export interface NavbarProps {
  /** Logo/brand link, rendered first in the desktop row (after the
   * mobile-only hamburger). */
  brand: ReactNode;
  /** The app's existing `<ul className="hidden ... md:flex">` nav list,
   * moved here verbatim — unchanged on desktop, hidden below `md` exactly
   * as it is today. */
  desktopNav: ReactNode;
  /** Stacked link list (plus any CTA) rendered inside the mobile overlay. */
  mobileNav: ReactNode;
  themeToggle: ReactNode;
  /** Persistent desktop CTA (e.g. portfolio's Resume button) — hidden
   * below `md`; render the mobile equivalent inside `mobileNav` instead. */
  desktopCta?: ReactNode;
  /** Overlay id, for `aria-controls`. */
  id?: string;
}

export default function Navbar({
  brand,
  desktopNav,
  mobileNav,
  themeToggle,
  desktopCta,
  id = "mobile-nav",
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useFocusTrap(overlayRef, isOpen, toggleRef);

  // `inert` set imperatively, not as a JSX prop: @types/react (18.3.x, this
  // repo's pinned version) doesn't yet type `inert` on HTMLAttributes even
  // though every evergreen browser and TS's own DOM lib support the
  // property. `clip-path: circle(0%)` (navbar.css) only hides paint/hit-
  // testing, not the DOM subtree — without this, the overlay's links stay
  // keyboard-Tab-reachable while invisible.
  useEffect(() => {
    overlayRef.current?.toggleAttribute("inert", !isOpen);
  }, [isOpen]);

  // Lock background scroll while the overlay covers the viewport; restore
  // whatever was there before (not a hardcoded ""), in case anything else
  // ever sets body overflow.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function handleOverlayClick(event: ReactMouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a")) {
      setIsOpen(false);
    }
  }

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-outline-variant/30 bg-surface/80 px-margin-mobile py-4 backdrop-blur-md lg:px-gutter print:hidden">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between text-on-surface">
        <button
          ref={toggleRef}
          type="button"
          className="-ml-2 p-2 text-on-surface md:hidden"
          aria-expanded={isOpen}
          aria-controls={id}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
        {brand}
        {desktopNav}
        <div className="flex items-center gap-2">
          {themeToggle}
          {desktopCta ? (
            <span className="hidden md:inline-flex">{desktopCta}</span>
          ) : null}
        </div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- this div isn't itself interactive; it only delegates bubbled clicks from its child <a> links (already natively keyboard-operable) to close the overlay. The dialog role is for AT semantics, not for direct interaction. */}
      <div
        id={id}
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={`nav-overlay fixed inset-0 z-[90] flex flex-col bg-surface/95 px-margin-mobile pt-24 backdrop-blur-lg md:hidden ${
          isOpen ? "active" : ""
        }`}
        onClick={handleOverlayClick}
      >
        {mobileNav}
      </div>
    </nav>
  );
}
