import BrandLogo from "../BrandLogo";
import SiteHeader from "../SiteHeader";
import { pageMetadata } from "../site";
import Link from "../StaticLink";
import ScrollToTop from "../ScrollToTop";
import styles from "./projects.module.css";
import ProjectCover from "./ProjectCover";
import { projects, projectCount } from "./projectSummaries";

export const metadata = pageMetadata("/projects", "Selected Projects | ICE TECH DEVELOPMENT", "A selection of web applications, software platforms and digital products designed and engineered by ICE TECH DEVELOPMENT.");

export default function ProjectsPage() {
  return (
    <main className={styles.projectsPage} id="top">
      <SiteHeader active="work" />

      <section id="main-content" tabIndex={-1} className={`${styles.intro} page-shell`} data-intro>
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
            <article className={styles.projectCard} data-reveal>
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
        <div className={`${styles.ctaInner} page-shell`} data-reveal>
          <p>/ Start a conversation</p>
          <h2>Have a project<br />in mind?</h2>
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
