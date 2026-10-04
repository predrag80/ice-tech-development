"use client";

import { useEffect, useState } from "react";

const VISIBILITY_OFFSET = 150;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > VISIBILITY_OFFSET);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top${isVisible ? " is-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <svg viewBox="0 0 48 72" aria-hidden="true">
        <path className="scroll-rail" d="M24 2v68" />
        <circle className="scroll-node" cx="24" cy="25" r="17" />
        <path className="scroll-arrow" d="m17 27 7-7 7 7M24 20v16" />
        <circle className="scroll-dot" cx="24" cy="68" r="2.75" />
      </svg>
    </button>
  );
}
