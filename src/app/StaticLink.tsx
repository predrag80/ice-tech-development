import type { ComponentPropsWithoutRef } from "react";

// This site is a document-based static export, not an application server.
// Native navigation avoids partial RSC/prefetch failures on static hosts,
// resets project-gallery state, and works even before JavaScript hydrates.
export default function StaticLink(props: ComponentPropsWithoutRef<"a">) {
  return <a {...props} />;
}
