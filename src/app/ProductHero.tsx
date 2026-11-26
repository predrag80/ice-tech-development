import Image from "next/image";
import HeroConcept from "./HeroConcept";
import styles from "./product-led.module.css";

export default function ProductHero() {
  return (
    <section id="main-content" tabIndex={-1} className={styles.hero}>
      <Image className={styles.mountains} src="/hero-blue-clouds-v2.webp" alt="" width={1860} height={846} sizes="100vw" loading="eager" />
      <div className={`page-shell ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> AI & web development</p>
          <h1>Ideas.<br /><span>Engineered.</span></h1>
          <p className={styles.lead}>We build AI-powered web applications and connect them to the platforms your business already runs on.</p>
          <div className={styles.actions}>
            <a className="button" href="mailto:info@icetechdevelopment.com">Start a project <span aria-hidden="true">→</span></a>
            <a className={`line-link ${styles.drawnLink}`} href="#work">See our work</a>
          </div>
          <p className={styles.emailNote}>An idea, a challenge, an existing product. Let&apos;s talk.</p>
        </div>

        <HeroConcept />

        <div className={styles.heroFooter}>
          <p>Built in balance.<br /><span>People. Technology. Possibility.</span></p>
          <ul aria-label="Our expertise"><li><span>01</span> Web apps & MVPs</li><li><span>02</span> AI integration</li><li><span>03</span> Platform integrations</li></ul>
        </div>
      </div>
    </section>
  );
}
