import { useEffect } from "react";
import type { RefObject } from "react";

const FOCUSABLE_SELECTOR = "a[href], button:not([disabled])";

/** Traps Tab/Shift+Tab within `containerRef` while `isOpen`, focusing its
 * first focusable descendant on open and returning focus to
 * `returnFocusRef` on close — so a keyboard user opening the mobile nav
 * overlay never tabs out into content behind it, and never loses their
 * place when they close it. */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  returnFocusRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!isOpen) return;
    const container = containerRef.current;
    if (!container) return;

    const focusables = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    );
    focusables[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    const returnFocusElement = returnFocusRef.current;
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      returnFocusElement?.focus();
    };
  }, [isOpen, containerRef, returnFocusRef]);
}
