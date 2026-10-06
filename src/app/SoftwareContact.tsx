import CtaParallax from "./CtaParallax";
import styles from "./product-led.module.css";

export default function SoftwareContact() {
  return (
    <section className={`cta ${styles.contact}`} id="contact">
      <div className={`page-shell ${styles.contactInner}`}>
        <div className={styles.contactCopy}>
          <p className={styles.eyebrow}>Your next digital product</p>
          <h2>Let&apos;s build<br />what&apos;s next.</h2>
          <p>Tell us what you&apos;re building, what needs improving, or where you&apos;re stuck. We&apos;ll help you find the next step.</p>
          <div className={styles.actions}><a className="button" href="mailto:info@icetechdevelopment.com">Send us an email <span aria-hidden="true">→</span></a></div>
          <a className={`line-link ${styles.drawnLink} ${styles.contactEmail}`} href="mailto:info@icetechdevelopment.com">info@icetechdevelopment.com</a>
          <small>No forms — just a direct conversation.</small>
        </div>
        <CtaParallax className={styles.systemScene}>
          <svg viewBox="0 0 600 440" fill="none">
            <defs><pattern id="system-grid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#b9cde4" /></pattern></defs>
            <rect width="600" height="440" fill="url(#system-grid)" />
            <g stroke="#97b9e2" strokeWidth="1.5"><path d="M150 114H300V197M150 320H300V243M450 114H300M450 320H300" /><path d="M55 220H250M350 220H545" strokeDasharray="4 7" /></g>
            <g fill="#f9fcff" stroke="#b5cde7">
              <rect x="35" y="40" width="200" height="114" rx="8" /><rect x="365" y="40" width="200" height="114" rx="8" />
              <rect x="35" y="286" width="200" height="114" rx="8" /><rect x="365" y="286" width="200" height="114" rx="8" />
            </g>
            <g stroke="#2c83f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="57" y="60" width="36" height="27" rx="3" /><path d="M57 68H93M64 64h1m4 0h1m-6 12h9m-9 5h18" />
              <path d="m402 63-10 10 10 10m14-20 10 10-10 10m-6-23-7 27" />
              <ellipse cx="75" cy="313" rx="17" ry="6" /><path d="M58 313v17c0 8 34 8 34 0v-17M58 321c0 8 34 8 34 0" />
              <path d="M391 328h33m-28-3-5 3 5 3m23-27 5 3-5 3m-28-3h33" />
            </g>
            <g fill="#17304f" fontSize="16" fontWeight="600"><text x="57" y="118">Interface</text><text x="389" y="118">Application</text><text x="57" y="365">Data</text><text x="389" y="365">Integrations</text></g>
            <rect x="258" y="178" width="84" height="84" rx="20" fill="#07162d" />
            <path d="m279 236 15-29 10 16 8-11 14 24h-47Z" fill="#78b4ff" /><path d="m294 207 10 16-6-3-4 5-4-3 4-15Z" fill="#f4f9ff" />
            <g fill="#2c83f6"><circle cx="300" cy="114" r="4" /><circle cx="300" cy="320" r="4" /></g>
          </svg>
          <span className={styles.systemCaption}>Thoughtfully connected. Built to evolve.</span>
        </CtaParallax>
      </div>
    </section>
  );
}
