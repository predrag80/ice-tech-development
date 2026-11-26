import BrandLogo from "../BrandLogo";
import SiteHeader from "../SiteHeader";
import { pageMetadata, showPlaceholders } from "../site";
import Link from "../StaticLink";
import ScrollToTop from "../ScrollToTop";
import styles from "./services.module.css";
import { processSteps } from "../processSteps";
import { entryOffers, services, type ServiceIconKind } from "../serviceOfferings";
import { projectName } from "../projects/projectSummaries";

export const metadata = pageMetadata("/services", "Services | ICE TECH DEVELOPMENT", "Web apps and MVPs, AI integration and automation, and platform integrations from ICE TECH DEVELOPMENT.");

function ServiceIcon({ kind }: { kind: ServiceIconKind }) {
  if (kind === "ai") {
    return <svg viewBox="0 0 180 110" aria-hidden="true"><rect x="6" y="12" width="86" height="62" rx="6"/><path d="M19 29h44M19 41h58M19 53h30M22 74v16l16-16M92 43h24"/><circle cx="145" cy="43" r="28"/><path className={styles.iconAccent} d="M145 24c2 12 7 17 19 19-12 2-17 7-19 19-2-12-7-17-19-19 12-2 17-7 19-19Z"/><path className={styles.iconAccent} d="M168 80c1 5 3 7 8 8-5 1-7 3-8 8-1-5-3-7-8-8 5-1 7-3 8-8Z"/></svg>;
  }

  if (kind === "apps") {
    return <svg viewBox="0 0 180 110" aria-hidden="true"><rect x="7" y="6" width="52" height="98" rx="8"/><path d="M25 16h16m-10 78h5M59 55h22"/><circle cx="33" cy="90" r="3"/><rect x="81" y="6" width="92" height="98" rx="4"/><path d="M94 90h66M94 80h66"/><path className={styles.iconAccent} d="m96 69 18-18 14 11 29-34m0 0v16m0-16h-16"/></svg>;
  }

  return <svg viewBox="0 0 180 110" aria-hidden="true"><rect x="7" y="9" width="79" height="22" rx="4"/><rect x="7" y="44" width="79" height="22" rx="4"/><rect x="7" y="79" width="79" height="22" rx="4"/><path d="M20 20h38m15 0h3M20 55h38m15 0h3M20 90h38m15 0h3M86 20h22v70H86m22-35h19"/><rect className={styles.iconAccent} x="127" y="34" width="46" height="22" rx="3"/><rect className={styles.iconAccent} x="127" y="72" width="46" height="22" rx="3"/></svg>;
}

export default function ServicesPage() {
  return (
    <main className={styles.servicesPage} id="top">
      <SiteHeader active="services" />

      <section id="main-content" tabIndex={-1} className={`${styles.intro} page-shell`} data-intro>
        <div>
          <Link className={styles.backLink} href="/#services">← Back to services</Link>
          <p>/ Capabilities</p>
          <h1>Services<span>.</span></h1>
        </div>
        <p>Web applications, AI features and platform integrations. Each service links to the case studies where we delivered it.</p>
        <strong>{String(services.length).padStart(2, "0")}<br /><small>Services</small></strong>
      </section>

      <section className={`${styles.serviceList} page-shell`} aria-label="All services">
        {services.map((service) => (
          <article className={styles.service} key={service.number} data-reveal>
            <span className={styles.serviceNumber}>{service.number}</span>
            <div className={styles.serviceIcon}><ServiceIcon kind={service.icon} /></div>
            <div className={styles.serviceCopy}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <p className={styles.proof}><span>Proof</span>{service.proof.map((slug) => <Link key={slug} href={`/projects/${slug}`}>{projectName(slug)} <b aria-hidden="true">↗</b></Link>)}</p>
              <a href="mailto:info@icetechdevelopment.com">Discuss a project <b>→</b></a>
            </div>
            <ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className={`${styles.offers} page-shell`} id="start" aria-labelledby="offers-title">
        <div className={styles.offersHeading} data-reveal>
          <div><p>/ Fixed-scope starting points</p><h2 id="offers-title">Start small,<br />decide with facts.</h2></div>
          <p>Each engagement has a fixed scope, duration and price, and ends with something you can act on, whether or not we continue together.</p>
        </div>
        <ol className={styles.offerGrid} aria-label="Fixed-scope starting points">
          {entryOffers.map((offer) => (
            <li className={styles.offer} key={offer.title} data-reveal="soft">
              <span className={styles.offerMeta}>Fixed price / {offer.duration}</span>
              <h3>{offer.title}</h3>
              <p>{offer.summary}</p>
              <ul>{offer.outputs.map((output) => <li key={output}>{output}</li>)}</ul>
              <div className={styles.offerFooter}>
                {offer.price ? <strong>{offer.price}</strong> : showPlaceholders ? <strong className="placeholder-value" title="Price still to be set">€ —</strong> : null}
                <a href="mailto:info@icetechdevelopment.com">Ask about {offer.title} <b aria-hidden="true">→</b></a>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.processSection}>
        <div className={`${styles.processInner} page-shell`}>
          <div className={styles.processHeading} data-reveal><div><p>/ How we work</p><h2>From context<br />to launch.</h2></div><p>A focused process keeps business, design and engineering aligned from the first decision.</p></div>
          <ol aria-label="Our five-phase process">{processSteps.map(({ number, title, summary }) => <li key={number} data-reveal="soft"><span>{number}</span><div><h3>{title}</h3><p>{summary}</p></div></li>)}</ol>
        </div>
      </section>

      <section className={styles.cta} id="contact">
        <div className={`${styles.ctaInner} page-shell`} data-reveal>
          <p>/ Start a conversation</p>
          <h2>What can we build<br />together?</h2>
          <div><span>Tell us about your goals and timeline by email.</span><a className="button" href="mailto:info@icetechdevelopment.com">Send us an email <b>→</b></a></div>
        </div>
      </section>

      <footer className={`${styles.footer} page-shell`}>
        <div><Link href="/"><BrandLogo /></Link><small>© 2026 ICE TECH DEVELOPMENT</small></div>
        <nav><Link href="/services">Services</Link><Link href="/projects">Work</Link><Link href="/#about">About</Link><Link href="/process">Process</Link><Link href="/#contact">Contact</Link></nav>
        <div><span>Belgrade / Serbia<br />Working worldwide</span><a href="mailto:info@icetechdevelopment.com">info@icetechdevelopment.com</a></div>
      </footer>
      <ScrollToTop />
    </main>
  );
}
