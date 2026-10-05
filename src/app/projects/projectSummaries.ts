export const projects = [
  {
    number: "01",
    slug: "smoki-navijaj",
    category: "Interactive web application",
    name: "Smoki Navijaj",
    description: "A fan engagement platform built around predictions, avatars, leagues and live competition.",
    shortDescription: "Fan onboarding, personalized avatars and competition features.",
    stack: "Next.js / Fastify / PostgreSQL",
    visual: "smoki",
  },
  {
    number: "02",
    slug: "hse-training",
    category: "Corporate website",
    name: "HSE Training",
    description: "A bilingual training and consultancy platform designed for clarity, trust and conversion.",
    shortDescription: "Bilingual web development with a CMS and course checkout.",
    stack: "Astro / WordPress / WooCommerce",
    visual: "hse",
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
  },
] as const;

export type ProjectVisualType = (typeof projects)[number]["visual"];
export const projectCount = String(projects.length).padStart(2, "0");
