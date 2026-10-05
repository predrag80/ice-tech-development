import SiteHeader from "../SiteHeader";
import { pageMetadata } from "../site";
import Link from "../StaticLink";
import ScrollToTop from "../ScrollToTop";
import styles from "./process.module.css";

export const metadata = pageMetadata("/process", "Our Process | ICE TECH DEVELOPMENT", "A clear, collaborative product process—from shared context and early prototypes to reliable software and continuous improvement.");

const principles = [
  {
    number: "01",
    title: "One integrated team",
    text: "Strategy, design and engineering work together from the first conversation—not in separate handoffs.",
  },
  {
    number: "02",
    title: "Progress you can see",
    text: "We share working flows, prototypes and software early, so decisions are based on something tangible.",
  },
  {
    number: "03",
    title: "Outcomes over output",
    text: "Priorities stay connected to business goals, user needs and measurable signs of success.",
  },
];

const phases = [
  {
    number: "01",
    title: "Understand",
    label: "Context before code",
    text: "We align on the problem, the people using the product and the business context. This gives the whole team one clear starting point.",
    outputs: ["Project brief", "Success criteria", "Risk map"],
  },
  {
    number: "02",
    title: "Define",
    label: "Focus the opportunity",
    text: "We turn shared context into a realistic scope, delivery plan and technical direction—removing uncertainty before it becomes expensive.",
    outputs: ["Prioritized scope", "Delivery roadmap", "Technical direction"],
  },
  {
    number: "03",
    title: "Design",
    label: "Make ideas tangible",
    text: "Flows, interfaces and prototypes make the experience visible early. We validate the important decisions before full production begins.",
    outputs: ["User flows", "Interactive prototype", "Design foundation"],
  },
  {
    number: "04",
    title: "Build",
    label: "Engineering from day one",
    text: "Design and development move together in focused increments. You review real progress regularly, with quality built into every release.",
    outputs: ["Production code", "Integrations", "Quality assurance"],
  },
  {
    number: "05",
    title: "Launch & evolve",
    label: "Release, learn, improve",
    text: "We launch carefully, monitor what matters and use real-world feedback to guide the next useful improvement.",
    outputs: ["Deployment", "Monitoring", "Iteration roadmap"],
  },
];

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

function ProcessDiagram() {
  return (
    <div className={styles.heroDiagram} aria-label="Five phases of our process">
      <svg viewBox="0 0 700 330" preserveAspectRatio="none" aria-hidden="true">
        <path d="M45 244C115 244 124 91 216 91S293 208 367 208 448 70 524 70 582 175 658 175" />
      </svg>
      <ol>
        <li><span>01</span><small>Understand</small></li>
        <li><span>02</span><small>Define</small></li>
        <li><span>03</span><small>Design</small></li>
        <li><span>04</span><small>Build</small></li>
        <li><span>05</span><small>Evolve</small></li>
      </ol>
    </div>
  );
}

export default function ProcessPage() {
  return (
    <main className={styles.processPage} id="top">
      <SiteHeader active="process" />

      <section id="main-content" tabIndex={-1} className={styles.hero}>
        <div className={`${styles.heroInner} page-shell`}>
          <div className={styles.heroCopy}>
            <Link className={styles.backLink} href="/#about">← Back to our approach</Link>
            <p>/ Our process</p>
            <h1>How ideas become<br /><span>products.</span></h1>
            <p className={styles.heroLead}>A collaborative path from shared context to reliable software—with visible progress and fewer surprises.</p>
          </div>
          <ProcessDiagram />
          <strong className={styles.heroIndex}>05<br /><small>Phases</small></strong>
        </div>
      </section>

      <section className={`${styles.principles} page-shell`}>
        <div className={styles.sectionHeading}>
          <div><p>/ Working principles</p><h2>Clear by design.<br />Flexible in practice.</h2></div>
          <p>Good product work needs structure, but every project has different risks. We keep the process focused and adapt the depth of each phase to the problem.</p>
        </div>
        <div className={styles.principleGrid}>
          {principles.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.phasesSection}>
        <div className={`${styles.phasesInner} page-shell`}>
          <div className={styles.phasesHeading}>
            <div><p>/ From context to launch</p><h2>Five connected<br />phases.</h2></div>
            <p>We do not disappear behind a big reveal. Each phase creates useful evidence for the next one, and you stay close to the work throughout.</p>
          </div>
          <ol className={styles.phaseList}>
            {phases.map((phase) => (
              <li key={phase.number}>
                <div className={styles.phaseTitle}><span>{phase.number}</span><div><small>{phase.label}</small><h3>{phase.title}</h3></div></div>
                <p>{phase.text}</p>
                <div className={styles.outputs} aria-label={`${phase.title} outputs`}>{phase.outputs.map((output) => <span key={output}>{output}</span>)}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.expectations} page-shell`}>
        <div><p>/ What you can expect</p><h2>One team.<br />No black box.</h2></div>
        <div className={styles.expectationGrid}>
          <article><strong>Weekly</strong><span>Working sessions and product reviews</span></article>
          <article><strong>Early</strong><span>Prototypes and technical validation</span></article>
          <article><strong>Always</strong><span>Transparent priorities and next steps</span></article>
        </div>
      </section>

      <section className={styles.cta} id="contact">
        <div className={`${styles.ctaInner} page-shell`}>
          <p>/ Start with context</p>
          <h2>Tell us what you are<br />trying to change.</h2>
          <div><span>A useful first conversation starts with your goals, constraints and timeline.</span><a className="button" href="mailto:info@icetechdevelopment.com">Send us an email <b>→</b></a></div>
        </div>
      </section>

      <footer className={`${styles.footer} page-shell`}>
        <div><Link href="/"><Brand /></Link><small>© 2026 ICE TECH DEVELOPMENT</small></div>
        <nav><Link href="/services">Services</Link><Link href="/projects">Work</Link><Link href="/#about">About</Link><Link href="/process">Process</Link><Link href="/#contact">Contact</Link></nav>
        <div><span>Belgrade / Serbia<br />Working worldwide</span><a href="mailto:info@icetechdevelopment.com">info@icetechdevelopment.com</a></div>
      </footer>
      <ScrollToTop />
    </main>
  );
}
