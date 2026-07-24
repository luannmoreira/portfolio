import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Pixels of extra margin before the element's bottom-viewport crossing
   * point triggers — mirrors AOS's data-aos-offset. */
  offset?: number;
}

export function useInView<T extends HTMLElement>({
  offset = 0,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Animate once — don't reset and replay on scroll-out.
          observer.disconnect();
        }
      },
      { rootMargin: `0px 0px -${offset}px 0px`, threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [offset]);

  return { ref, isInView };
}
