import SiteHeader from "../SiteHeader";
import Link from "../StaticLink";
import ScrollToTop from "../ScrollToTop";
import ProjectGallery from "./ProjectGallery";
import styles from "./project.module.css";
import { projectCount } from "./projectSummaries";

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
  approach: string;
  outcome: string;
  deliverables: string[];
  technologies: [string, string][];
  preview: "smoki" | "hse" | "bitcoins";
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
    expertise: "Product / UX / Full-stack development",
    platform: "Multilingual progressive web app",
    delivery: "Completed campaign · no longer available",
    projectType: "Archived campaign",
    overviewTitle: ["Made for", "match day."],
    overview: "Smoki Navijaj connects football predictions, personalized fan avatars, leagues and rewards in one campaign platform.",
    problem: "A large regional campaign needed to keep thousands of fans engaged throughout a fast-moving tournament.",
    approach: "We combined onboarding, match data, predictions, boosters, private leagues and AI-assisted avatars in a mobile-first flow.",
    outcome: "A scalable campaign product with real-time scoring, multilingual delivery and a clear path from participation to reward.",
    deliverables: ["Product architecture", "Responsive PWA", "Competition engine", "AI avatar workflow"],
    technologies: [
      ["Next.js", "Fast multilingual fan experience"],
      ["React", "Interactive application interface"],
      ["TypeScript", "Shared front-end and API contracts"],
      ["Fastify", "High-performance backend services"],
      ["PostgreSQL / Prisma", "Users, matches, leagues and scoring"],
      ["Redis / S3", "Queues, caching and generated media"],
    ],
    preview: "smoki",
    nextProject: "HSE Training",
    nextHref: "/projects/hse-training",
  },
  "hse-training": {
    name: "HSE Training",
    index: "02",
    category: "Corporate website",
    tagline: "A clear, credible digital platform for internationally recognised safety training and consultancy.",
    industry: "Health, safety and education",
    expertise: "Strategy / Web design / Development",
    platform: "Bilingual content and commerce website",
    delivery: "Website delivery",
    projectType: "Live project",
    website: "https://hsetraining.rs",
    overviewTitle: ["Trust built", "into every page."],
    overview: "HSE Training brings courses, professional expertise, resources and online enquiries into one structured bilingual experience.",
    problem: "A broad training offer and specialist credentials needed a clearer structure for regional and international audiences.",
    approach: "We shaped a content-led website with focused course discovery, multilingual navigation and a connected checkout journey.",
    outcome: "A faster, more credible platform that supports discovery, course enquiries, payments and ongoing content publishing.",
    deliverables: ["Information architecture", "Responsive website", "Bilingual experience", "CMS and commerce integration"],
    technologies: [
      ["Astro", "Fast content-first front end"],
      ["TypeScript", "Maintainable interactive features"],
      ["WordPress", "Structured editorial CMS"],
      ["WooCommerce", "Course checkout workflows"],
      ["REST APIs", "Front-end and CMS integration"],
      ["Secure payments", "Localized card payment journey"],
    ],
    preview: "hse",
    nextProject: "99Bitcoins",
    nextHref: "/projects/99bitcoins",
  },
  "99bitcoins": {
    name: "99Bitcoins",
    index: "03",
    category: "Content platform",
    tagline: "A content-rich crypto platform enhanced with custom plugins and aggregated market data from external sources.",
    industry: "Crypto education and publishing",
    expertise: "Web development / Plugin engineering / Data aggregation",
    platform: "Global editorial website",
    delivery: "Ongoing platform",
    projectType: "Live project",
    website: "https://99bitcoins.com",
    overviewTitle: ["Crypto knowledge", "made accessible."],
    overview: "99Bitcoins combines editorial content with custom crypto functionality, including a data aggregator that collects and normalizes information from external market sources.",
    problem: "The platform needed reliable crypto data inside WordPress, while editors also required specialized tools that standard plugins could not provide.",
    approach: "We developed a custom aggregation plugin for external crypto data and additional purpose-built plugins for crypto content, reusable data displays and editorial workflows.",
    outcome: "A more capable publishing platform with automated data collection, consistent crypto information and tools tailored to the editorial team.",
    deliverables: ["Crypto data aggregator", "Custom WordPress plugins", "External API integrations", "Editorial tools"],
    technologies: [
      ["WordPress", "Flexible editorial publishing"],
      ["PHP", "Custom WordPress plugin development"],
      ["Crypto APIs", "External market and asset data"],
      ["Data aggregator", "Collection, normalization and synchronization"],
      ["Custom plugins", "Crypto-specific publishing features"],
      ["Caching", "Efficient and reliable data delivery"],
    ],
    preview: "bitcoins",
    nextProject: "Smoki Navijaj",
    nextHref: "/projects/smoki-navijaj",
  },
} satisfies Record<string, ProjectCaseStudyData>;

function MountainMark() {
  return (
    <svg className="mountain-mark" viewBox="0 0 72 52" aria-hidden="true">
      <path fill="#73A9FA" d="M0 48 26.5 6 39 48H0Z" />
      <path fill="#163965" d="M17 48 41 0l25 48H17Z" />
      <path fill="#A9C8ED" d="m38 48 14-27 20 27H38Z" />
      <path fill="#EEF6FF" d="m26.5 6 6.6 13.2-6.1-3.8-7.8 12.2L26.5 6Z" />
      <path fill="#F8FBFF" d="m41 0 8.7 18.1-8-5-7.9 13.2L41 0Z" />
      <path fill="#DCEBFA" d="m52 21 6.2 8.4-5.3-2.6-5.3 8.6L52 21Z" />
    </svg>
  );
}

function Brand() {
  return <span className="brand"><MountainMark /><span>ICE TECH<small>DEVELOPMENT</small></span></span>;
}

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
} as const;

export default function ProjectCaseStudy({ project }: { project: ProjectCaseStudyData }) {
  return (
    <main className={styles.projectPage} id="top">
      <SiteHeader active="work" />

      <section id="main-content" tabIndex={-1} className={styles.hero}>
        <div className={`${styles.heroInner} page-shell`}>
          <div className={styles.heroCopy}>
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
            {project.website ? <a className={styles.liveLink} href={project.website} target="_blank" rel="noreferrer">Visit live website <span>↗</span></a> : null}
          </div>
          <ProjectGallery tone={project.preview} {...projectGalleries[project.preview]} />
          <p className={styles.heroIndex}>{project.index}<br />/<br />{projectCount}</p>
        </div>
      </section>

      <section className={`${styles.overview} page-shell`}>
        <p className={styles.sectionLabel}>/ Project snapshot</p>
        <div className={styles.overviewGrid}>
          <div className={styles.overviewTitle}><h2>{project.overviewTitle[0]}<br />{project.overviewTitle[1]}</h2><p>{project.overview}</p></div>
          <div className={styles.overviewCopy}>
            <article><span>01</span><div><h3>Problem</h3><p>{project.problem}</p></div></article>
            <article><span>02</span><div><h3>Approach</h3><p>{project.approach}</p></div></article>
            <article><span>03</span><div><h3>Outcome</h3><p>{project.outcome}</p></div></article>
          </div>
          <aside className={styles.scope}><p>What we delivered</p><ul>{project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></aside>
        </div>
      </section>

      <section className={styles.technology}>
        <div className={`${styles.technologyInner} page-shell`}>
          <div className={styles.sectionHeading}><div><p className={styles.sectionLabel}>/ Technology</p><h2>Core stack.</h2></div><p>A focused technical foundation selected for performance, maintainability and growth.</p></div>
          <div className={styles.techGrid}>{project.technologies.map(([name, description], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{name}</h3><p>{description}</p></div></article>)}</div>
        </div>
      </section>

      <section className={styles.projectCta} id="contact">
        <div className={`${styles.projectCtaInner} page-shell`}>
          <p className={styles.sectionLabel}>/ Start a conversation</p>
          <h2>Have a project<br />with similar ambition?</h2>
          <p>Tell us about your goals, context and timeline by email.</p>
          <div><a className="button" href="mailto:hello@icetechdevelopment.com">Send us an email <span>→</span></a><a href="mailto:hello@icetechdevelopment.com">hello@icetechdevelopment.com</a></div>
          <small>No forms — just a direct conversation.</small>
        </div>
      </section>

      <footer className={`${styles.footer} page-shell`}>
        <div><Link href="/"><Brand /></Link><small>© 2026 ICE TECH DEVELOPMENT</small></div>
        <Link className={styles.nextProject} href={project.nextHref}><span>Next project</span><strong>{project.nextProject}&nbsp; ↗</strong></Link>
        <div className={styles.footerContact}><span>Belgrade / Serbia<br />Working worldwide</span><a href="mailto:hello@icetechdevelopment.com">hello@icetechdevelopment.com</a></div>
      </footer>
      <ScrollToTop />
    </main>
  );
}
