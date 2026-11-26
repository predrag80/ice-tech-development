import BrandLogo from "../BrandLogo";
import SiteHeader from "../SiteHeader";
import Link from "../StaticLink";
import ScrollToTop from "../ScrollToTop";
import ProjectGallery from "./ProjectGallery";
import styles from "./project.module.css";
import { projectCount } from "./projectSummaries";
import { showPlaceholders } from "../site";

// `value: null` is a figure still to be supplied: marked in `next dev`, omitted in production.
// Figures about a client's users or sales need the client's permission before they are published.
type ProjectResult = { value: string | null; label: string };

type ProjectCaseStudyData = {
  name: string;
  index: string;
  category: string;
  tagline: string;
  industry: string;
  expertise: string;
  platform: string;
  delivery: string;
  projectType: "Live project" | "Archived campaign";
  website?: string;
  overviewTitle: [string, string];
  overview: string;
  problem: string;
  contribution: string;
  outcome: string;
  deliverables: string[];
  technologies: [string, string][];
  results: ProjectResult[];
  resultsLabel?: string;
  resultsSource?: { label: string; href: string };
  partner?: { label: string; name: string; href: string };
  preview: "smoki" | "hse" | "bitcoins" | "nwd";
  nextProject: string;
  nextHref: string;
};

export const projectCaseStudies = {
  "smoki-navijaj": {
    name: "Smoki Navijaj",
    index: "01",
    category: "Interactive web application",
    tagline: "A high-energy fan platform that turns every match into a social, rewarding digital experience.",
    industry: "FMCG / Sports engagement",
    expertise: "Product / Full-stack / AI integration",
    platform: "Multilingual progressive web app",
    delivery: "Completed campaign · no longer available",
    projectType: "Archived campaign",
    overviewTitle: ["Made for", "match day."],
    overview: "Smoki Navijaj connects football predictions, personalized fan avatars, leagues and rewards in one campaign platform.",
    problem: "The campaign needed one mobile-first experience for fan participation, personalized avatars and competition throughout a football tournament.",
    contribution: "We developed the fan application and its backend features: onboarding, AI-assisted avatar creation, match predictions, leagues and scoring, with multilingual delivery.",
    outcome: "Fans created avatars, made predictions and followed their league standings throughout the tournament. The campaign has ended and the application is no longer available.",
    deliverables: ["Product architecture", "Responsive PWA", "Competition engine", "AI avatar workflow"],
    technologies: [
      ["Next.js", "Fast multilingual fan experience"],
      ["React", "Interactive application interface"],
      ["TypeScript", "Shared front-end and API contracts"],
      ["Fastify", "High-performance backend services"],
      ["PostgreSQL / Prisma", "Users, matches, leagues and scoring"],
      ["Redis / S3", "Queues, caching and generated media"],
    ],
    results: [
      { value: "11", label: "Markets activated" },
      { value: "16.1K", label: "Registered users" },
      { value: "95.9%", label: "Participation rate" },
    ],
    resultsSource: { label: "Campaign results as reported by NWD Agency", href: "https://nwdagency.com/projects/smoki" },
    partner: { label: "Delivered with", name: "NWD Agency", href: "https://nwdagency.com/projects/smoki" },
    preview: "smoki",
    nextProject: "HSE Training",
    nextHref: "/projects/hse-training",
  },
  "hse-training": {
    name: "HSE Training",
    index: "02",
    category: "Web platform & virtual agent",
    tagline: "A clear, credible bilingual platform for internationally recognised safety training, with a virtual agent that guides visitors through courses and checkout.",
    industry: "Health, safety and education",
    expertise: "Strategy / Web development / Integrations",
    platform: "Bilingual content and commerce platform",
    delivery: "Website delivery",
    projectType: "Live project",
    website: "https://hsetraining.rs",
    overviewTitle: ["Trust built", "into every page."],
    overview: "HSE Training brings courses, professional expertise, resources and online enquiries into one structured bilingual experience.",
    problem: "A broad training offer and specialist credentials needed a clearer structure for regional and international audiences.",
    contribution: "We designed and developed the bilingual website, connected the Astro front end to WordPress content, integrated WooCommerce course checkout through APIs and added a virtual agent that guides visitors through the site and answers questions about courses, offers and payment.",
    outcome: "Visitors can explore courses, get answers from the virtual agent and reach checkout in a structured bilingual website, while the content team manages publishing through the CMS.",
    deliverables: ["Information architecture", "Bilingual website", "CMS and commerce integration", "Virtual agent"],
    technologies: [
      ["Astro", "Fast content-first front end"],
      ["TypeScript", "Maintainable interactive features"],
      ["WordPress", "Structured editorial CMS"],
      ["WooCommerce", "Course checkout and localized card payments"],
      ["REST APIs", "Front-end and CMS integration"],
      ["Virtual agent", "Site guide for courses, offers and payment"],
    ],
    results: [
      { value: "2", label: "Languages" },
      { value: null, label: "Training courses online" }, // TODO
      { value: null, label: "Virtual agent conversations" }, // TODO
    ],
    preview: "hse",
    nextProject: "99Bitcoins",
    nextHref: "/projects/99bitcoins",
  },
  "99bitcoins": {
    name: "99Bitcoins",
    index: "03",
    category: "Content platform",
    tagline: "One of the top five crypto websites worldwide, with around 100,000 visits a day, extended with custom plugins and aggregated market data.",
    industry: "Crypto education and publishing",
    expertise: "Web development / Plugin engineering / Data aggregation",
    platform: "Global editorial website",
    delivery: "Ongoing platform",
    projectType: "Live project",
    website: "https://99bitcoins.com",
    overviewTitle: ["Crypto knowledge", "made accessible."],
    overview: "99Bitcoins is one of the top five crypto websites worldwide. It combines editorial content with custom crypto functionality, including a data aggregator that collects and normalizes information from external market sources.",
    problem: "At around 100,000 visits a day, the platform needed reliable, fast crypto data inside WordPress, while editors also required specialized tools that standard plugins could not provide.",
    contribution: "Our work focused on custom WordPress plugins, including a crypto data aggregator that collects, normalizes and synchronizes information from external APIs, plus crypto-specific displays and editorial tools.",
    outcome: "The platform can bring external crypto data into its publishing workflows and present it through reusable frontend components, alongside its editorial content.",
    deliverables: ["Crypto data aggregator", "Custom WordPress plugins", "External API integrations", "Editorial tools"],
    technologies: [
      ["WordPress", "Flexible editorial publishing"],
      ["PHP", "Custom WordPress plugin development"],
      ["Crypto APIs", "External market and asset data"],
      ["Data aggregator", "Collection, normalization and synchronization"],
      ["Custom plugins", "Crypto-specific publishing features"],
      ["Caching", "Efficient and reliable data delivery"],
    ],
    results: [
      { value: "Top 5", label: "Crypto websites worldwide" },
      { value: "100K", label: "Visits a day, approx." },
      { value: null, label: "External data sources" }, // TODO
    ],
    resultsLabel: "Platform scale",
    preview: "bitcoins",
    nextProject: "NWD Agency",
    nextHref: "/projects/nwd-agency",
  },
  "nwd-agency": {
    name: "NWD Agency",
    index: "04",
    category: "Agency website",
    tagline: "A direct, structured website for a brand strategy agency: positioning, programs and case studies leading to one clear enquiry.",
    industry: "Brand strategy and marketing",
    expertise: "Front-end development / Interaction / Lead capture",
    platform: "Next.js marketing website",
    delivery: "Website delivery",
    projectType: "Live project",
    website: "https://nwdagency.com",
    overviewTitle: ["Direction,", "made visible."],
    overview: "The NWD Agency website presents the agency's positioning, seven brand growth programs, selected case studies and senior team, and closes with a structured enquiry form.",
    problem: "The agency needed a website that explains a structured offer, seven programs within one brand growth system, as clearly as the strategy work it sells, and turns interest into qualified enquiries.",
    // TODO: confirm the scope of our work on the site (development only, or design as well).
    contribution: "We developed the website in Next.js: the programs overview with expandable details, the selected-work carousel, case-study pages with video, team profiles and an enquiry form that captures the challenge and the preferred type of engagement.",
    outcome: "The agency presents its programs and work in one consistent site, and enquiries arrive with the context needed for a first conversation. We also work with NWD on campaign technology, including Smoki Navijaj.",
    deliverables: ["Next.js development", "Programs and case-study pages", "Selected-work carousel", "Structured enquiry form"],
    technologies: [
      ["Next.js", "App framework and routing"],
      ["React", "Interactive programs and carousel"],
      ["Prerendering", "Pages served ready from cache"],
      ["Cloudflare", "Edge delivery and protection"],
      ["Video", "Case-study media in the page"],
      ["Enquiry form", "Challenge and engagement captured up front"],
    ],
    results: [
      { value: null, label: "Lighthouse performance score" }, // TODO
      { value: null, label: "Largest Contentful Paint" }, // TODO
      { value: null, label: "Enquiries through the form" }, // TODO: only with NWD's permission
    ],
    preview: "nwd",
    nextProject: "Smoki Navijaj",
    nextHref: "/projects/smoki-navijaj",
  },
} satisfies Record<string, ProjectCaseStudyData>;

const projectGalleries = {
  smoki: {
    domain: "app.smoki.rs",
    label: "APP / AVATARS / FAN EXPERIENCE",
    // Actual UI frames from https://nwdagency.com/assets/video/smoki/SmokiMobile.mp4
    // Homepage and avatar setup: 2.0s; cheering screen: 3.1s.
    slides: [
      {
        src: "/project-smoki-homepage-screen.webp",
        alt: "Smoki Navijaj app homepage with the campaign introduction and Create your fan button",
        caption: "App homepage",
      },
      {
        src: "/project-smoki-avatar-screen.webp",
        alt: "Smoki Navijaj avatar creation page with progress steps and national team selection",
        caption: "Create your fan avatar",
      },
      {
        src: "/project-smoki-cheering-screen.webp",
        alt: "Smoki Navijaj cheering page with a personalized fan, sharing options and the Navijaj button",
        caption: "Ready to cheer",
      },
    ],
  },
  hse: {
    domain: "hsetraining.rs",
    label: "TRAINING / CONSULTANCY / COURSES",
    slides: [
      {
        src: "/project-hse-agent.jpg",
        alt: "HSE Training website with the site assistant open, answering a question about buying a course and access",
        caption: "Virtual agent: site guide",
        objectPosition: "right center",
      },
      {
        src: "/project-hse-training.webp",
        alt: "Practical workplace fire safety training",
        caption: "Practical safety training",
        objectPosition: "58% center",
      },
      {
        src: "/project-hse-coaching.webp",
        alt: "HSE coaching and mentoring session",
        caption: "Coaching & mentoring",
        objectPosition: "44% center",
      },
      {
        src: "/project-hse-team.webp",
        alt: "Safety culture team discussing protective equipment",
        caption: "Safety culture teams",
        objectPosition: "50% 60%",
      },
    ],
  },
  bitcoins: {
    domain: "99bitcoins.com",
    label: "PLUGINS / AGGREGATION / CRYPTO DATA",
    slides: [
      {
        src: "/project-99bitcoins-indices.jpg",
        alt: "99Bitcoins market indices frontend powered by aggregated crypto data",
        caption: "Market indices plugin",
      },
      {
        src: "/project-99bitcoins-bitcoin.jpg",
        alt: "99Bitcoins Bitcoin price and market data frontend",
        caption: "Live asset data",
      },
      {
        src: "/project-99bitcoins-dex.jpg",
        alt: "99Bitcoins DEX screener frontend with liquidity and volume data",
        caption: "DEX screener plugin",
      },
    ],
  },
  nwd: {
    domain: "nwdagency.com",
    label: "STRATEGY / PROGRAMS / CASE STUDIES",
    slides: [
      {
        src: "/project-nwd-home.jpg",
        alt: "NWD Agency homepage with the headline Strategic clarity for growing brands",
        caption: "Homepage",
      },
      {
        src: "/project-nwd-programs.jpg",
        alt: "NWD Agency programs section introducing seven programs designed to build modern brands",
        caption: "Seven programs",
      },
      {
        src: "/project-nwd-work.jpg",
        alt: "NWD Agency selected work carousel with the Smoki, Marsh and Capone case studies",
        caption: "Selected work",
      },
      {
        src: "/project-nwd-case-study.jpg",
        alt: "NWD Agency Smoki case study page titled Turning attention into participation",
        caption: "Case study page",
      },
    ],
  },
} as const;

function ProjectResults({ results, label = "Results", source }: { results: ProjectResult[]; label?: string; source?: ProjectCaseStudyData["resultsSource"] }) {
  const visible = results.filter((result) => result.value !== null || showPlaceholders);
  // A single figure reads as an afterthought; the band appears once at least two are known.
  if (visible.length < 2) return null;

  return (
    <div className={styles.results} data-reveal>
      <p className={styles.sectionLabel}>/ {label}</p>
      <dl>
        {visible.map(({ value, label }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd className={value === null ? "placeholder-value" : undefined} title={value === null ? "Figure still to be supplied" : undefined}>{value ?? "—"}</dd>
          </div>
        ))}
      </dl>
      {source ? <p className={styles.resultsSource}>Source: <a href={source.href} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a></p> : null}
    </div>
  );
}

export default function ProjectCaseStudy({ project }: { project: ProjectCaseStudyData }) {
  return (
    <main className={styles.projectPage} id="top">
      <SiteHeader active="work" />

      <section id="main-content" tabIndex={-1} className={styles.hero}>
        <div className={`${styles.heroInner} page-shell`}>
          <div className={styles.heroCopy} data-intro>
            <Link className={styles.backLink} href="/projects">← Back to projects</Link>
            <p className={styles.eyebrow}>{project.index} / {project.category} / {project.projectType}</p>
            <h1>{project.name}<span>.</span></h1>
            <p className={styles.heroLead}>{project.tagline}</p>
            <dl className={styles.projectMeta}>
              <div><dt>Industry</dt><dd>{project.industry}</dd></div>
              <div><dt>Expertise</dt><dd>{project.expertise}</dd></div>
              <div><dt>Platform</dt><dd>{project.platform}</dd></div>
              <div><dt>Delivery</dt><dd>{project.delivery}</dd></div>
            </dl>
            {project.website || project.partner ? (
              <div className={styles.heroLinks}>
                {project.website ? <a className={styles.liveLink} href={project.website} target="_blank" rel="noreferrer">Visit live website <span>↗</span></a> : null}
                {project.partner ? <a className={styles.liveLink} href={project.partner.href} target="_blank" rel="noreferrer">{project.partner.label} {project.partner.name} <span>↗</span></a> : null}
              </div>
            ) : null}
          </div>
          <ProjectGallery tone={project.preview} {...projectGalleries[project.preview]} />
          <p className={styles.heroIndex}>{project.index}<br />/<br />{projectCount}</p>
        </div>
      </section>

      <section className={`${styles.overview} page-shell`}>
        <p className={styles.sectionLabel}>/ Project snapshot</p>
        <div className={styles.overviewGrid}>
          <div className={styles.overviewTitle} data-reveal><h2>{project.overviewTitle[0]}<br />{project.overviewTitle[1]}</h2><p>{project.overview}</p></div>
          <div className={styles.overviewCopy}>
            <article data-reveal><span>01</span><div><h3>The challenge</h3><p>{project.problem}</p></div></article>
            <article data-reveal><span>02</span><div><h3>Our contribution</h3><p>{project.contribution}</p></div></article>
            <article data-reveal><span>03</span><div><h3>The result</h3><p>{project.outcome}</p></div></article>
          </div>
          <aside className={styles.scope} data-reveal><p>Our scope</p><ul>{project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></aside>
        </div>
        <ProjectResults results={project.results} label={project.resultsLabel} source={project.resultsSource} />
      </section>

      <section className={styles.technology}>
        <div className={`${styles.technologyInner} page-shell`}>
          <div className={styles.sectionHeading} data-reveal><div><p className={styles.sectionLabel}>/ Technology</p><h2>Core stack.</h2></div><p>A focused technical foundation selected for performance, maintainability and growth.</p></div>
          <div className={styles.techGrid}>{project.technologies.map(([name, description], index) => <article key={name} data-reveal="soft"><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{name}</h3><p>{description}</p></div></article>)}</div>
        </div>
      </section>

      <section className={styles.projectCta} id="contact">
        <div className={`${styles.projectCtaInner} page-shell`} data-reveal>
          <p className={styles.sectionLabel}>/ Start a conversation</p>
          <h2>Have a project<br />with similar ambition?</h2>
          <p>Tell us about your goals, context and timeline by email.</p>
          <div><a className="button" href="mailto:info@icetechdevelopment.com">Send us an email <span>→</span></a><a href="mailto:info@icetechdevelopment.com">info@icetechdevelopment.com</a></div>
          <small>No forms — just a direct conversation.</small>
        </div>
      </section>

      <footer className={`${styles.footer} page-shell`}>
        <div><Link href="/"><BrandLogo /></Link><small>© 2026 ICE TECH DEVELOPMENT</small></div>
        <Link className={styles.nextProject} href={project.nextHref}><span>Next project</span><strong>{project.nextProject}&nbsp; ↗</strong></Link>
        <div className={styles.footerContact}><span>Belgrade / Serbia<br />Working worldwide</span><a href="mailto:info@icetechdevelopment.com">info@icetechdevelopment.com</a></div>
      </footer>
      <ScrollToTop />
    </main>
  );
}
