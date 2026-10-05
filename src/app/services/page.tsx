import SiteHeader from "../SiteHeader";
import { pageMetadata } from "../site";
import Link from "../StaticLink";
import ScrollToTop from "../ScrollToTop";
import styles from "./services.module.css";

export const metadata = pageMetadata("/services", "Services | ICE TECH DEVELOPMENT", "Web development, custom software and digital product services from ICE TECH DEVELOPMENT.");

const services = [
  {
    number: "01",
    title: "Web Development",
    description: "High-performance websites and web applications engineered for speed, clarity and long-term maintainability.",
    deliverables: ["Frontend development", "CMS and e-commerce", "API integrations", "Performance optimization"],
  },
  {
    number: "02",
    title: "Software Development",
    description: "Custom software shaped around real business requirements, workflows and opportunities for growth.",
    deliverables: ["Software architecture", "Backend systems", "Databases and APIs", "Workflow automation"],
  },
  {
    number: "03",
    title: "Digital Products",
    description: "Focused product strategy, design and engineering—from an early idea to a reliable production release.",
    deliverables: ["Product strategy", "UX and interface design", "Rapid prototyping", "Product delivery"],
  },
];

const process = [
  ["01", "Understand", "Goals, users and context"],
  ["02", "Design", "Structure and interaction"],
  ["03", "Build", "Reliable production code"],
  ["04", "Evolve", "Measure and improve"],
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

function ServiceIcon({ index }: { index: number }) {
  if (index === 0) {
    return <svg viewBox="0 0 180 110" aria-hidden="true"><rect x="6" y="7" width="168" height="96" rx="5"/><path d="M6 25h168M21 16h2m8 0h2m8 0h2M26 42h58v39H26zm0 47h24m9 0h25M102 42h51v45h-51z"/><path className={styles.iconAccent} d="m120 51-11 11 11 11m16-22 11 11-11 11m-8-25-9 30"/></svg>;
  }

  if (index === 1) {
    return <svg viewBox="0 0 180 110" aria-hidden="true"><rect x="7" y="9" width="79" height="22" rx="4"/><rect x="7" y="44" width="79" height="22" rx="4"/><rect x="7" y="79" width="79" height="22" rx="4"/><path d="M20 20h38m15 0h3M20 55h38m15 0h3M20 90h38m15 0h3M86 20h22v70H86m22-35h19"/><rect className={styles.iconAccent} x="127" y="34" width="46" height="22" rx="3"/><rect className={styles.iconAccent} x="127" y="72" width="46" height="22" rx="3"/></svg>;
  }

  return <svg viewBox="0 0 180 110" aria-hidden="true"><rect x="7" y="6" width="52" height="98" rx="8"/><path d="M25 16h16m-10 78h5M59 55h22"/><circle cx="33" cy="90" r="3"/><rect x="81" y="6" width="92" height="98" rx="4"/><path d="M94 90h66M94 80h66"/><path className={styles.iconAccent} d="m96 69 18-18 14 11 29-34m0 0v16m0-16h-16"/></svg>;
}

export default function ServicesPage() {
  return (
    <main className={styles.servicesPage} id="top">
      <SiteHeader active="services" />

      <section id="main-content" tabIndex={-1} className={`${styles.intro} page-shell`}>
        <div>
          <Link className={styles.backLink} href="/#services">← Back to services</Link>
          <p>/ Capabilities</p>
          <h1>Services<span>.</span></h1>
        </div>
        <p>Strategy, design and engineering brought together to create useful digital products and dependable software.</p>
        <strong>03<br /><small>Services</small></strong>
      </section>

      <section className={`${styles.serviceList} page-shell`} aria-label="All services">
        {services.map((service, index) => (
          <article className={styles.service} key={service.number}>
            <span className={styles.serviceNumber}>{service.number}</span>
            <div className={styles.serviceIcon}><ServiceIcon index={index} /></div>
            <div className={styles.serviceCopy}><h2>{service.title}</h2><p>{service.description}</p><a href="mailto:info@icetechdevelopment.com">Discuss a project <b>→</b></a></div>
            <ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className={styles.processSection}>
        <div className={`${styles.processInner} page-shell`}>
          <div className={styles.processHeading}><div><p>/ How we work</p><h2>From context<br />to launch.</h2></div><p>A focused process keeps business, design and engineering aligned from the first decision.</p></div>
          <ol>{process.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        </div>
      </section>

      <section className={styles.cta} id="contact">
        <div className={`${styles.ctaInner} page-shell`}>
          <p>/ Start a conversation</p>
          <h2>What can we build<br />together?</h2>
          <div><span>Tell us about your goals and timeline by email.</span><a className="button" href="mailto:info@icetechdevelopment.com">Send us an email <b>→</b></a></div>
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
