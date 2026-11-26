import type { ProjectSlug } from "./projects/projectSummaries";

// One shared service list for the homepage and the services page.
// `proof` names the case studies that show the service in delivered work.
export type ServiceIconKind = "apps" | "ai" | "platform";

export const services: readonly {
  number: string;
  icon: ServiceIconKind;
  title: string;
  summary: string;
  description: string;
  tags: readonly string[];
  deliverables: readonly string[];
  proof: readonly ProjectSlug[];
}[] = [
  {
    number: "01",
    icon: "apps",
    title: "Web Apps & MVPs",
    summary: "From an idea to a production web app, on a deadline that matters.",
    description: "Product architecture, interface and full-stack engineering for web applications that have to launch on a fixed date and hold up under real use: user accounts, game and scoring logic, multilingual delivery and admin tools.",
    tags: ["Product architecture", "PWA", "Full-stack"],
    deliverables: ["Product architecture and UX", "Progressive web apps", "Accounts, roles and admin tools", "SaaS foundations and payments"],
    proof: ["smoki-navijaj"],
  },
  {
    number: "02",
    icon: "ai",
    title: "AI Integration & Automation",
    summary: "AI-generated media, content workflows and automation inside your product.",
    description: "We add AI where it does useful work inside a product, from AI-assisted media generation to automated content and data workflows, built on queues and storage that hold up under real use.",
    tags: ["AI media", "Generation pipelines", "Automation"],
    deliverables: ["AI image and content generation", "Generation queues and media storage", "Workflow and data automation", "Model and API integration"],
    proof: ["smoki-navijaj", "99bitcoins"],
  },
  {
    number: "03",
    icon: "platform",
    title: "Platform Integrations",
    summary: "Extend the platform you already run instead of rebuilding it.",
    description: "Custom plugins, headless front ends and API integrations that add new capability to existing CMS, commerce and data platforms without starting from scratch.",
    tags: ["Headless CMS", "Custom plugins", "APIs & data"],
    deliverables: ["Headless CMS and e-commerce", "Custom WordPress plugins", "API and data integrations", "Modernising existing platforms"],
    proof: ["99bitcoins", "hse-training", "nwd-agency"],
  },
];

// Fixed-scope ways to start working together. `price: null` is still to be decided:
// it shows as a marked gap in `next dev` and is left out of production builds.
export const entryOffers: readonly {
  title: string;
  duration: string;
  price: string | null;
  summary: string;
  outputs: readonly string[];
}[] = [
  {
    title: "Scope Sprint",
    duration: "1–2 weeks",
    price: null, // TODO: fixed price, e.g. "€X"
    summary: "Turn an idea or a brief into a plan that is ready to build.",
    outputs: ["Prioritised scope", "Technical direction", "Estimate and delivery plan"],
  },
  {
    title: "AI Audit",
    duration: "2 weeks",
    price: null, // TODO: fixed price
    summary: "Find where AI does useful work in your product or process, and test the strongest idea.",
    outputs: ["AI opportunity map", "Working prototype", "Cost and risk notes"],
  },
  {
    title: "Platform Audit",
    duration: "1 week",
    price: null, // TODO: fixed price
    summary: "Review an existing website or platform before you extend or rebuild it.",
    outputs: ["Performance and plugin review", "Integration options", "Modernisation plan"],
  },
];
