// Keep native hrefs for crawlers, new tabs and browsers without JavaScript.
// Only regular, same-origin section navigation gets a clean address bar.
export const sectionStorageKey = "ice-tech:section-navigation";
const pendingLifetime = 30_000;

export function sectionDestination(href: string, currentHref: string) {
  const current = new URL(currentHref);
  const destination = new URL(href, current);
  if (destination.origin !== current.origin || !destination.hash) return null;
  let id: string;
  try {
    id = decodeURIComponent(destination.hash.slice(1));
  } catch {
    return null;
  }
  // Leave text fragments and other browser-owned fragments alone.
  if (!id || id.includes(":~:")) return null;
  const path = destination.pathname + destination.search;
  return { id, path, sameDocument: path === current.pathname + current.search };
}

export function pendingSection(raw: string | null, path: string, now = Date.now()): string | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (value?.path === path && typeof value.id === "string" && value.id &&
      typeof value.createdAt === "number" && now >= value.createdAt &&
      now - value.createdAt < pendingLifetime) return value.id;
  } catch {
    // A stale or invalid tab-local entry must never interrupt navigation.
  }
  return null;
}
