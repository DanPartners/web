"use client";

import { useEffect } from "react";

/**
 * Fades sections in as they scroll into view. It only hides things once it is
 * running (the js-motion class), and the CSS only hides them when the visitor
 * has not asked for reduced motion.
 */
export function Motion() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .split"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    root.classList.add("js-motion");
    return () => {
      io.disconnect();
      root.classList.remove("js-motion");
    };
  }, []);
  return null;
}
