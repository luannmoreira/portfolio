import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { useFocusTrap } from "./useFocusTrap";
import MenuIcon from "./MenuIcon";

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
    <nav className="fixed top-0 left-0 z-50 w-full print:hidden">
      {/* backdrop-blur-md lives on this wrapper, not <nav> itself: backdrop-filter
          makes its element the containing block for any position:fixed descendant
          (same category as transform/filter/perspective/contain) — with it on
          <nav>, the overlay below (also fixed, inset-0) was resolving "full
          viewport" against <nav>'s own ~96px content height instead of the real
          viewport, collapsing it to a sliver hidden behind this header row.
          Confirmed by measuring overlay.getBoundingClientRect().height: 97px
          with the blur on <nav>, 664px (real viewport) with it removed.

          z-[95] has to live on THIS SAME element, not a nested child: backdrop-
          filter also creates a new stacking context, so a z-index set only on a
          descendant is scoped inside that context and never actually competes
          with the overlay's z-[90] sibling at the <nav> level — the header would
          still paint under the overlay once open, despite its own z-index
          reading "95". (Stitch source: header z-100 > overlay z-90.) */}
      <div className="relative z-[95] border-b border-outline-variant/30 bg-surface-container/80 px-margin-mobile py-4 backdrop-blur-md lg:px-gutter">
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
            <MenuIcon open={isOpen} className="h-6 w-6" />
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
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- this div isn't itself interactive; it only delegates bubbled clicks from its child <a> links (already natively keyboard-operable) to close the overlay. The dialog role is for AT semantics, not for direct interaction. */}
      <div
        id={id}
        ref={overlayRef}
        role="dialog"
        aria-modal={isOpen || undefined}
        aria-label="Main menu"
        className={`nav-overlay fixed inset-0 z-[90] flex flex-col border-t border-outline-variant/30 bg-surface-container/95 px-margin-mobile pt-24 backdrop-blur-lg md:hidden ${
          isOpen ? "active" : ""
        }`}
        onClick={handleOverlayClick}
      >
        {mobileNav}
      </div>
    </nav>
  );
}
