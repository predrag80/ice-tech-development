import SiteHeader from "../SiteHeader";
import { pageMetadata } from "../site";
import Link from "../StaticLink";
import ScrollToTop from "../ScrollToTop";
import styles from "./projects.module.css";
import ProjectCover from "./ProjectCover";
import { projects, projectCount } from "./projectSummaries";

export const metadata = pageMetadata("/projects", "Selected Projects | ICE TECH DEVELOPMENT", "A selection of web applications, software platforms and digital products designed and engineered by ICE TECH DEVELOPMENT.");

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

export default function ProjectsPage() {
  return (
    <main className={styles.projectsPage} id="top">
      <SiteHeader active="work" />

      <section id="main-content" tabIndex={-1} className={`${styles.intro} page-shell`}>
        <div>
          <Link className={styles.backLink} href="/#work">← Back to projects</Link>
          <p>/ Selected work</p>
          <h1>Projects<span>.</span></h1>
        </div>
        <p>Digital products shaped by strategy, design and engineering—built to be clear, useful and ready to grow.</p>
        <strong>{projectCount}<br /><small>Projects</small></strong>
      </section>

      <section className={`${styles.projectGrid} page-shell`} aria-label="All projects">
        {projects.map((project) => (
          <Link className={styles.projectLink} href={`/projects/${project.slug}`} key={project.slug} aria-label={`View the ${project.name} project case study`}>
            <article className={styles.projectCard}>
              <ProjectCover type={project.visual} />
              <div className={styles.projectMeta}><span>{project.number} / {project.category}</span><i>↗</i></div>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <div className={styles.cardFooter}><small>{project.stack}</small><b>View project →</b></div>
            </article>
          </Link>
        ))}
      </section>

      <section className={styles.cta} id="contact">
        <div className={`${styles.ctaInner} page-shell`}>
          <p>/ Start a conversation</p>
          <h2>Have a project<br />in mind?</h2>
          <div><span>Tell us about your goals and timeline by email.</span><a className="button" href="mailto:hello@icetechdevelopment.com">Send us an email <b>→</b></a></div>
        </div>
      </section>

      <footer className={`${styles.footer} page-shell`}>
        <div><Link href="/"><Brand /></Link><small>© 2026 ICE TECH DEVELOPMENT</small></div>
        <nav><Link href="/services">Services</Link><Link href="/projects">Work</Link><Link href="/#about">About</Link><Link href="/process">Process</Link><Link href="/#contact">Contact</Link></nav>
        <div><span>Belgrade / Serbia<br />Working worldwide</span><a href="mailto:hello@icetechdevelopment.com">hello@icetechdevelopment.com</a></div>
      </footer>
      <ScrollToTop />
    </main>
  );
}
