"use client";

import { useEffect, useRef } from "react";

const MAX_VERTICAL_OFFSET = 96;
const MAX_HORIZONTAL_OFFSET = 32;

export default function CtaParallax() {
  const linesRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const lines = linesRef.current;
    const section = lines?.closest<HTMLElement>(".cta");

    if (!lines || !section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationFrame = 0;

    const updatePosition = () => {
      animationFrame = 0;

      const rect = section.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const centeredProgress = Math.min(1, Math.max(0, progress)) - 0.5;

      lines.style.setProperty("--cta-parallax-y", `${centeredProgress * MAX_VERTICAL_OFFSET}px`);
      lines.style.setProperty("--cta-parallax-x", `${centeredProgress * -MAX_HORIZONTAL_OFFSET}px`);
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <span ref={linesRef} className="cta-parallax-lines" aria-hidden="true" />;
}
