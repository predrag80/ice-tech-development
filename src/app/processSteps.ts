// One shared process for the homepage, services and detailed process page.
export const processSteps = [
  {
    number: "01",
    title: "Understand",
    summary: "Goals, users and context.",
    label: "Context before code",
    text: "We align on the problem, the people using the product and the business context. This gives the whole team one clear starting point.",
    outputs: ["Project brief", "Success criteria", "Risk map"],
  },
  {
    number: "02",
    title: "Define",
    summary: "Scope, priorities and a delivery plan.",
    label: "Focus the opportunity",
    text: "We turn shared context into a realistic scope, delivery plan and technical direction—removing uncertainty before it becomes expensive.",
    outputs: ["Prioritized scope", "Delivery roadmap", "Technical direction"],
  },
  {
    number: "03",
    title: "Design",
    summary: "User flows, interfaces and prototypes.",
    label: "Make ideas tangible",
    text: "Flows, interfaces and prototypes make the experience visible early. We validate the important decisions before full production begins.",
    outputs: ["User flows", "Interactive prototype", "Design foundation"],
  },
  {
    number: "04",
    title: "Build",
    summary: "Development, integrations and testing.",
    label: "Engineering from day one",
    text: "Design and development move together in focused increments. You review real progress regularly, with quality built into every release.",
    outputs: ["Production code", "Integrations", "Quality assurance"],
  },
  {
    number: "05",
    title: "Launch & evolve",
    summary: "Release, feedback and next steps.",
    label: "Release, learn, improve",
    text: "We prepare the release, agree the handover and identify useful next steps. Any ongoing support or development is scoped together.",
    outputs: ["Deployment", "Handover", "Next-step roadmap"],
  },
] as const;
