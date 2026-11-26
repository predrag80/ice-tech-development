export const projects = [
  {
    number: "01",
    slug: "smoki-navijaj",
    category: "Interactive web application",
    name: "Smoki Navijaj",
    description: "A fan engagement platform built around predictions, AI-assisted avatars, leagues and live competition.",
    shortDescription: "Fan onboarding, AI-assisted avatars and competition features.",
    stack: "Next.js / Fastify / PostgreSQL",
    visual: "smoki",
    featured: true,
  },
  {
    number: "02",
    slug: "hse-training",
    category: "Web platform & virtual agent",
    name: "HSE Training",
    description: "A bilingual training platform with a headless CMS, course checkout and a virtual agent that guides visitors.",
    shortDescription: "Bilingual headless website, course checkout and a virtual agent.",
    stack: "Astro / WordPress / WooCommerce",
    visual: "hse",
    featured: true,
  },
  {
    number: "03",
    slug: "99bitcoins",
    category: "Content platform",
    name: "99Bitcoins",
    description: "A crypto publishing platform extended with custom plugins and an external-data aggregation system.",
    shortDescription: "Crypto publishing, custom plugins and market data aggregation.",
    stack: "WordPress / PHP / Crypto APIs",
    visual: "bitcoins",
    featured: true,
  },
  {
    number: "04",
    slug: "nwd-agency",
    category: "Agency website",
    name: "NWD Agency",
    description: "A brand strategy agency website presenting seven programs, selected case studies and a structured enquiry flow.",
    shortDescription: "Agency website with programs, case studies and lead capture.",
    stack: "Next.js / React / Cloudflare",
    visual: "nwd",
    featured: false,
  },
] as const;

export type ProjectSlug = (typeof projects)[number]["slug"];
export type ProjectVisualType = (typeof projects)[number]["visual"];
export const projectCount = String(projects.length).padStart(2, "0");
export const projectName = (slug: ProjectSlug) => projects.find((project) => project.slug === slug)!.name;
