import Image from "next/image";
import type { ProjectVisualType } from "./projectSummaries";
import styles from "./projects.module.css";

export default function ProjectCover({ type, className = "" }: { type: ProjectVisualType; className?: string }) {
  const coverClass = `${styles.visual} ${styles.imageVisual} ${className}`;

  if (type === "smoki") {
    return (
      <div className={`${coverClass} ${styles.smokiVisual}`}>
        <div className={styles.browserBar}><i /><i /><i /><small>app.smoki.rs</small></div>
        <Image src="/project-smoki-cover.jpg" alt="Smoki Navijaj football campaign application" sizes="(max-width: 620px) 90vw, (max-width: 1000px) 43vw, 28vw" width={1673} height={1513} />
      </div>
    );
  }

  if (type === "hse") {
    return (
      <div className={`${coverClass} ${styles.hseVisual}`}>
        <div className={styles.browserBar}><i /><i /><i /><small>hsetraining.rs</small></div>
        <Image src="/project-hse-hero.webp" alt="HSE Training website for health and safety education" sizes="(max-width: 620px) 90vw, (max-width: 1000px) 43vw, 28vw" width={1920} height={1080} />
        <span className={styles.hseCoverCopy}>Your first step<br />into HSE.</span>
      </div>
    );
  }

  return (
    <div className={`${coverClass} ${styles.bitcoinsVisual}`}>
      <div className={styles.browserBar}><i /><i /><i /><small>99bitcoins.com</small></div>
      <div className={styles.cryptoGrid} aria-hidden="true"><i>₿</i><span /><span /><span /></div>
      <Image src="/project-99bitcoins-cover.png" alt="99Bitcoins cryptocurrency education platform" sizes="(max-width: 620px) 70vw, 25vw" width={1200} height={628} />
    </div>
  );
}
