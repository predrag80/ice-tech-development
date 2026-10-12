"use client";

import { useEffect } from "react";

const STAGGER_MS = 80;
const MAX_STAGGER_MS = 480;

const documentOrder = (a: Element, b: Element) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);

/**
 * Animates `[data-reveal]` blocks as they scroll into view. Only blocks that start below the fold are
 * hidden, so content that is already visible, or rendered without JavaScript, never disappears.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
      .filter((element) => element.getBoundingClientRect().top >= window.innerHeight);
    if (!pending.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target as HTMLElement)
        .sort(documentOrder)
        .forEach((element, index) => {
          element.style.setProperty("--reveal-delay", `${Math.min(index * STAGGER_MS, MAX_STAGGER_MS)}ms`);
          element.dataset.revealed = "true";
          observer.unobserve(element);
        });
    }, { rootMargin: "0px 0px -8% 0px" });

    for (const element of pending) {
      element.dataset.revealed = "false";
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
