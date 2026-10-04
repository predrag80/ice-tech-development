"use client";

import { useRef, type ReactNode } from "react";

export default function MobileMenu({ children }: { children: ReactNode }) {
  const details = useRef<HTMLDetailsElement>(null);
  return (
    <details ref={details} className="mobile-menu" onKeyDown={(event) => {
      if (event.key === "Escape" && details.current) {
        details.current.open = false;
        details.current.querySelector("summary")?.focus();
      }
    }}>
      <summary aria-label="Navigation menu">
        <span className="mobile-menu-icon" aria-hidden="true"><span /><span /><span /></span>
      </summary>
      <nav aria-label="Mobile navigation" onClick={(event) => {
        if ((event.target as HTMLElement).closest("a") && details.current) details.current.open = false;
      }}>{children}</nav>
    </details>
  );
}
