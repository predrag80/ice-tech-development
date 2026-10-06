import Image from "next/image";
import type { ProjectVisualType } from "./projectSummaries";
import styles from "./project-cover.module.css";

function BrowserBar({ domain }: { domain: string }) {
  return <div className={styles.browserBar}><span><i /><i /><i /></span><small>{domain}</small><span aria-hidden="true">↗</span></div>;
}

export default function ProjectCover({ type, className = "" }: { type: ProjectVisualType; className?: string }) {
  if (type === "smoki") {
    return (
      <div className={`${styles.cover} ${styles.smoki} ${className}`}>
        <span className={styles.label}>A campaign. An experience.</span>
        <div className={styles.phones}>
          <Image src="/project-smoki-homepage-screen.webp" alt="Smoki Navijaj application home screen" width={228} height={494} sizes="(max-width: 620px) 38vw, 15vw" />
          <Image src="/project-smoki-avatar-screen.webp" alt="Smoki application avatar creation interface" width={228} height={494} sizes="(max-width: 620px) 38vw, 15vw" />
        </div>
      </div>
    );
  }

  if (type === "hse") {
    return (
      <div className={`${styles.cover} ${styles.hse} ${className}`}>
        <span className={styles.label}>Knowledge, made accessible.</span>
        <div className={styles.browser}>
          <BrowserBar domain="hsetraining.rs" />
          {/* A compact HTML reconstruction of the live site's interface, not a screenshot. */}
          <div className={styles.hseInterface} role="img" aria-label="HSE Training website layout preview, with navigation, training introduction and course call to action">
            <Image src="/project-hse-hero.webp" alt="" width={1920} height={1080} sizes="(max-width: 620px) 86vw, 28vw" />
            <div className={styles.hseNav}><b>HSE <small>TRAINING</small></b><span>Company &nbsp; Training &nbsp; Contact</span><span>EN / SR</span></div>
            <div className={styles.hseIntro}><strong>Your First Step<br />Into HSE.</strong><span>Get Qualified. Get Ahead.</span><small>Request a free consultation</small></div>
          </div>
          <div className={styles.hseCourses}><span>Professional training</span><span>HSE management</span><span>On-site consultancy</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.cover} ${styles.bitcoins} ${className}`}>
      <span className={styles.label}>Market data, connected.</span>
      <div className={styles.browser}>
        <BrowserBar domain="99bitcoins.com" />
        <div className={styles.marketViewport}><Image className={styles.market} src="/project-99bitcoins-bitcoin.jpg" alt="99Bitcoins crypto interface with Bitcoin price and market data widgets" width={1200} height={700} sizes="(max-width: 620px) 86vw, (max-width: 1000px) 42vw, 28vw" /></div>
        <div className={styles.integration}><span>External data</span><i aria-hidden="true">→</i><span>Custom plugins</span><i aria-hidden="true">→</i><span>Market insights</span></div>
      </div>
    </div>
  );
}
