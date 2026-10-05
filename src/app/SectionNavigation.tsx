"use client";

import { useEffect } from "react";
import { pendingSection, sectionDestination, sectionStorageKey } from "../lib/section-links";

export default function SectionNavigation() {
  useEffect(() => {
    let cancelled = false;
    let frame = 0;

    function reveal(id: string, smooth: boolean) {
      const target = document.getElementById(id);
      if (!target) return false;
      // Match native fragment navigation for keyboard/screen-reader users.
      if (!target.hasAttribute("tabindex") && !target.matches("a[href], button, input, select, textarea, summary")) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      }
      target.focus({ preventScroll: true });
      target.scrollIntoView({
        block: "start",
        behavior: smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant",
      });
      if (window.location.hash) {
        window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
      }
      return true;
    }

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const destination = sectionDestination(anchor.href, window.location.href);
      if (!destination) return;
      if (destination.sameDocument) {
        if (reveal(destination.id, true)) event.preventDefault();
        return;
      }
      try {
        // Full document navigation remains intentional on our static hosting.
        // The destination consumes this one-shot target without a URL fragment.
        window.sessionStorage.setItem(sectionStorageKey, JSON.stringify({ ...destination, createdAt: Date.now() }));
      } catch {
        // Storage blocked: native navigation still works; arrival cleans the hash.
        return;
      }
      event.preventDefault();
      window.location.assign(destination.path);
    }

    function onHashChange() {
      const destination = sectionDestination(window.location.href, window.location.href);
      if (destination) reveal(destination.id, false);
    }

    let pending: string | null = null;
    try {
      pending = pendingSection(window.sessionStorage.getItem(sectionStorageKey), window.location.pathname + window.location.search);
      if (!pending) window.sessionStorage.removeItem(sectionStorageKey);
    } catch { /* Native hash fallback also works when storage is unavailable. */ }
    const initial = sectionDestination(window.location.href, window.location.href)?.id ?? pending;
    if (initial) {
      // Fonts can move sections during first load. Wait before restoring the target.
      void document.fonts.ready.then(() => {
        if (!cancelled) frame = window.requestAnimationFrame(() => {
          reveal(initial, false);
          try {
            window.sessionStorage.removeItem(sectionStorageKey);
          } catch { /* Storage is optional. */ }
        });
      });
    }

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
