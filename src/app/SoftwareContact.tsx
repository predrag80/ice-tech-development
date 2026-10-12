import CtaParallax from "./CtaParallax";
import SystemGraph from "./SystemGraph";
import styles from "./product-led.module.css";

export default function SoftwareContact() {
  return (
    <section className={`cta ${styles.contact}`} id="contact">
      <div className={`page-shell ${styles.contactInner}`}>
        <div className={styles.contactCopy} data-reveal>
          <p className={styles.eyebrow}>Your next digital product</p>
          <h2>Let&apos;s build<br />what&apos;s next.</h2>
          <p>Tell us what you&apos;re building, what needs improving, or where you&apos;re stuck. We&apos;ll help you find the next step.</p>
          <div className={styles.actions}><a className="button" href="mailto:info@icetechdevelopment.com">Send us an email <span aria-hidden="true">→</span></a></div>
          <a className={`line-link ${styles.drawnLink} ${styles.contactEmail}`} href="mailto:info@icetechdevelopment.com">info@icetechdevelopment.com</a>
          <small>No forms — just a direct conversation.</small>
        </div>
        <CtaParallax className={styles.systemScene}>
          <SystemGraph />
          <span className={styles.systemCaption}>Thoughtfully connected. Built to evolve.<em className={styles.systemHint}>Drag any block — the connections follow.</em></span>
        </CtaParallax>
      </div>
    </section>
  );
}
