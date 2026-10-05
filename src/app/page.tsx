import SiteHeader from "./SiteHeader";
import Image from "next/image";
import Link from "./StaticLink";
import CtaParallax from "./CtaParallax";
import ScrollToTop from "./ScrollToTop";
import ProjectCover from "./projects/ProjectCover";
import { projects } from "./projects/projectSummaries";

const services = [
  { number: "01", title: "Web Development", text: "High-performance websites and web applications built with modern technologies.", tags: ["React", "Next.js", "WordPress", "APIs"] },
  { number: "02", title: "Software Development", text: "Custom software designed around your business requirements.", tags: ["Architecture", "Backend", "Databases", "APIs"] },
  { number: "03", title: "Digital Products", text: "From an idea to a production-ready digital product.", tags: ["Strategy", "UX", "Development", "Deployment"] },
];

const process = [
  ["01", "Understand", "We explore your goals, users and challenges."],
  ["02", "Design", "We create practical, user-centered solutions."],
  ["03", "Build", "We engineer scalable, maintainable software."],
  ["04", "Launch", "We ensure a smooth and successful release."],
  ["05", "Grow", "We keep improving based on real-world data."],
];

const technologies = ["React", "Next.js", "TypeScript", "PHP", "Laravel", "Node.js", "PostgreSQL", "MySQL", "Docker", "AWS", "Vercel"];

function CodePanel() {
  return (
    <div className="code-panel" aria-label="Code editor preview">
      <div className="code-panel-bar"><span className="code-workspace">◈ ICE TECH</span><span className="code-tab">◉ app.tsx&nbsp; ×</span></div>
      <div className="code-panel-body">
        <aside className="code-tree" aria-hidden="true"><b>▾ src</b><span>› components</span><span>› pages</span><span>› lib</span><span>› styles</span><span>› types</span><span>› utils</span></aside>
        <ol aria-hidden="true"><li>1</li><li>2</li><li>3</li><li>6</li><li>9</li><li>15</li></ol>
        <pre><code><span className="code-purple">export default</span> <span className="code-blue">function</span> Home() {`{`}{"\n"}  <span className="code-purple">return</span> ({"\n"}    &lt;<span className="code-blue">main</span>&gt;{"\n"}      &lt;<span className="code-blue">Hero</span> /&gt;{"\n"}      &lt;<span className="code-blue">Services</span> /&gt;{"\n"}      &lt;<span className="code-blue">Projects</span> /&gt;{"\n"}    &lt;/<span className="code-blue">main</span>&gt;{"\n"}  ){"\n"}{`}`}</code></pre>
      </div>
      <div className="code-panel-status"><span>main*</span><span>✓ deployed</span><span>100% typed</span></div>
    </div>
  );
}

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

function ServiceIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg className="service-icon" viewBox="0 0 160 96" aria-hidden="true">
        <rect className="service-icon-frame" x="5" y="7" width="150" height="82" rx="4" />
        <path d="M5 22h150" />
        <circle cx="14" cy="14.5" r="1.6" /><circle cx="21" cy="14.5" r="1.6" /><circle cx="28" cy="14.5" r="1.6" />
        <path className="service-icon-soft" d="M139 14.5h8M18 34h54v35H18zm0 42h22m6 0h26M84 34h53v43H84z" />
        <path d="m105 43-10 10 10 10m14-20 10 10-10 10m-7-23-8 27" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg className="service-icon" viewBox="0 0 160 96" aria-hidden="true">
        <rect className="service-icon-frame" x="5" y="9" width="72" height="18" rx="4" />
        <rect className="service-icon-frame" x="5" y="36" width="72" height="18" rx="4" />
        <rect className="service-icon-frame" x="5" y="63" width="72" height="18" rx="4" />
        <path className="service-icon-soft" d="M15 18h35m17 0h2M15 45h35m17 0h2M15 72h35m17 0h2M41 81v9m-15 0h30" />
        <path d="M77 18h17v54H77m17-27h16" />
        <rect className="service-icon-frame" x="110" y="25" width="45" height="19" rx="3" />
        <rect className="service-icon-frame" x="110" y="56" width="45" height="19" rx="3" />
      </svg>
    );
  }

  return (
    <svg className="service-icon" viewBox="0 0 160 96" aria-hidden="true">
      <rect className="service-icon-frame" x="5" y="6" width="46" height="84" rx="7" />
      <path className="service-icon-soft" d="M20 13h16m-10 69h5M51 48h19" />
      <circle cx="28" cy="77" r="3" />
      <rect className="service-icon-frame" x="70" y="6" width="85" height="84" rx="4" />
      <path className="service-icon-soft" d="M80 78h65M80 69h65" />
      <path d="m82 61 17-17 13 10 27-31m0 0v15m0-15h-15" />
    </svg>
  );
}

function TechIcon({ name }: { name: string }) {
  const common = { className: "tech-icon", viewBox: "0 0 48 48", "aria-hidden": true } as const;
  if (name === "React") return <svg {...common}><circle cx="24" cy="24" r="3" fill="currentColor"/><ellipse cx="24" cy="24" rx="20" ry="8"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)"/></svg>;
  if (name === "Next.js") return <svg {...common}><circle cx="24" cy="24" r="19"/><path d="M16 32V16l17 20M31 16v13"/></svg>;
  if (name === "TypeScript") return <svg {...common}><rect x="6" y="6" width="36" height="36" rx="2" fill="currentColor" stroke="none"/><path d="M13 18h17m-8.5 0v18m11.5-13c-5-3-8 0-6 3 2 2 8 1 8 6 0 4-6 6-10 2" stroke="white"/></svg>;
  if (name === "PHP") return <svg {...common}><ellipse cx="24" cy="24" rx="21" ry="13"/><text x="24" y="28" textAnchor="middle">php</text></svg>;
  if (name === "Laravel") return <svg {...common}><path d="M7 9l13 5v16L7 25V9Zm13 5 12-5 9 5-12 5-9-5Zm0 16 9 5V19m0 16 12-6V14M7 25l13-6"/></svg>;
  if (name === "Node.js") return <svg {...common}><path d="m24 3 18 10v22L24 45 6 35V13L24 3Z"/><text x="24" y="29" textAnchor="middle">JS</text></svg>;
  if (name === "PostgreSQL") return <svg {...common}><path d="M14 37c-4-9-5-22 1-28 6-5 19-2 20 7 1 8-3 15-8 17-2 1-5-1-4-4 2-5 9-6 13-3M20 12c1 9 2 18 8 25 2 2 4 1 4-2"/></svg>;
  if (name === "MySQL") return <svg {...common}><path d="M5 31c8-1 17-3 24-9 4-3 7-2 14 1-5 0-8 2-11 6M10 18c7 1 14 5 21 15"/><text x="24" y="44" textAnchor="middle">MySQL</text></svg>;
  if (name === "Docker") return <svg {...common}><path d="M5 27h37c-2 10-10 15-21 15S7 35 5 27Zm3-8h7v7H8zm8 0h7v7h-7zm8 0h7v7h-7zm-8-8h7v7h-7zm8 0h7v7h-7zm8 8h7v7h-7M38 22c3-5 6-4 8-3"/></svg>;
  if (name === "AWS") return <svg {...common}><text x="24" y="25" textAnchor="middle">aws</text><path d="M8 31c10 6 21 7 32 0m-4 0 4 0-2 4"/></svg>;
  return <svg {...common}><path d="M24 6 43 39H5L24 6Z" fill="currentColor" stroke="none"/></svg>;
}

function Brand() {
  return <span className="brand"><MountainMark /><span>ICE TECH<small>DEVELOPMENT</small></span></span>;
}

function SocialIcon({ name }: { name: "linkedin" | "github" | "mail" }) {
  if (name === "linkedin") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.4H2V22h3.2V8.4ZM3.6 2A1.9 1.9 0 1 0 3.6 5.8 1.9 1.9 0 0 0 3.6 2ZM12 8.4H8.8V22H12v-7.1c0-1.9.4-3.7 2.7-3.7 2.3 0 2.3 2.1 2.3 3.8v7h3.2v-7.9c0-3.9-.8-6.8-5.3-6.8-2.1 0-3.5 1.2-4.1 2.3h-.1V8.4H12Z" /></svg>;
  }

  if (name === "github") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.3-2.3-.3-4.7-1.1-4.7-5A3.9 3.9 0 0 1 6.8 8.7c-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.8 1.1A9.4 9.4 0 0 1 12 6.8a9.4 9.4 0 0 1 2.5.3c1.9-1.4 2.8-1.1 2.8-1.1.5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" /></svg>;
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h18v13H3v-13Zm1.6 1.4 7.4 5.7 7.4-5.7H4.6Zm14.8 10.2V9l-7.4 5.6L4.6 9v8.1h14.8Z" /></svg>;
}

export default function Home() {
  return (
    <main id="top">
      <SiteHeader home />

      <section id="main-content" tabIndex={-1} className="hero">
        <div className="hero-knife-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="hero-inner page-shell">
        <svg className="hero-tech-line" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true"><path d="M320 120H520Q568 120 568 163V228Q568 264 606 264H910" /><circle cx="365" cy="120" r="2.5" /><circle cx="403" cy="120" r="2.5" /><circle cx="460" cy="120" r="5" /><circle cx="568" cy="228" r="4" /><circle cx="910" cy="264" r="5" /></svg>
        <div className="hero-copy">
          <p className="microcopy">Web / Software / Digital products</p>
          <h1>Ideas.<br /><span>Engineered.</span></h1>
          <p className="hero-lead">We design and build modern web applications and software that help businesses grow.</p>
          <div className="hero-actions"><span className="hero-primary-action"><a className="button" href="mailto:info@icetechdevelopment.com">Start a project <span>→</span></a><small className="hero-email-note">Starts with an email</small></span><a className="line-link" href="#work">See our work</a></div>
        </div>
        <div className="hero-manifesto"><i /><span>Scalable</span><span>Secure</span><span>Impactful</span><span>Software</span></div>
        <Image className="hero-mountains" src="/hero-blue-clouds-v2.webp" alt="" width={1860} height={846} sizes="100vw" loading="eager" fetchPriority="high" />
        <div className="hero-right-texture" aria-hidden="true" />
        <div className="code-paper-tear" aria-hidden="true" />
        <div className="code-panel-overhang" aria-hidden="true" />
        <CodePanel />
        <p className="hero-note">High<br />Performance<br />Web Applications</p>
        <p className="hero-coordinates">43.8103° N<br />7.1128° E</p>
        <i className="hero-data-rail" aria-hidden="true" />
        <p className="balance-note">Built in balance.</p>
        <div className="hero-values"><span>People</span><span>Technology</span><span>A brighter tomorrow</span></div>
        </div>
      </section>

      <section className="section page-shell" id="services">
        <div className="section-intro services-intro">
          <div><p className="kicker">/ Services</p><h2>What we do</h2></div>
          <p>We combine strategy, design and engineering to build digital products that create real value.</p>
          <Link className="line-link" href="/services">All services →</Link>
        </div>
        <div className="services-grid">
          {services.map((service, index) => <article key={service.number}><div className="service-top"><span>{service.number}</span><span className="service-arrow" aria-hidden="true" /></div><div className="service-diagram"><ServiceIcon index={index} /><i /><i /><i /></div><h3>{service.title}</h3><p>{service.text}</p><ul className="service-tags" aria-label={`${service.title} technologies`}>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></article>)}
        </div>
      </section>

      <section className="section projects-section" id="work">
        <div className="page-shell">
          <div className="section-intro projects-intro"><div><p className="kicker">/ Featured work</p><h2>Selected projects</h2></div><p className="projects-proof">Real products.<br />Real results.</p><Link className="line-link" href="/projects">View all projects →</Link></div>
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.slug}>
                <Link className="project-thumb-link" href={`/projects/${project.slug}`} aria-label={`View the ${project.name} project case study`}>
                  <ProjectCover type={project.visual} className="project-thumb" />
                </Link>
                <div className="project-type">{project.number} / {project.category}</div>
                <div className="project-title"><h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3><Link className="project-title-link" href={`/projects/${project.slug}`}>View project <b aria-hidden="true">↗</b></Link></div>
                <p>{project.shortDescription}</p>
                <small className="project-stack">{project.stack}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section approach-section" id="about">
        <div className="page-shell approach">
          <div className="approach-copy"><p className="kicker">/ Our approach</p><h2>From idea<br />to impact.</h2><p>We work as a true partner — combining technical expertise with a deep understanding of business goals.</p><div className="approach-tags" aria-label="Our disciplines"><span>Strategy</span><span>Design</span><span>Engineering</span></div><Link className="outline-button" href="/process">Learn more about our process</Link></div>
          <div className="process-canvas"><Image src="/hero-mountain-editorial-v2.png" alt="" width={1672} height={941} sizes="(max-width: 900px) 100vw, 65vw" /><svg className="process-route" viewBox="0 0 760 330" preserveAspectRatio="none" aria-hidden="true"><path d="M42 65C130 25 130 150 230 135S320 55 390 100 440 240 520 210 650 130 720 170" /></svg><ol className="process-list">{process.map(([number, title, description]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{description}</p></div></li>)}</ol></div>
        </div>
      </section>

      <section className="technology page-shell">
        <div className="technology-heading"><div><p className="kicker">/ Technology</p><h2>Built with<br />modern technology</h2></div><p>We choose the right tools for the problem, not because they&apos;re fashionable. The right technology helps us build better, faster and more reliable solutions.</p></div>
        <div className="technology-row">{technologies.map((name) => <div key={name}><b><TechIcon name={name} /></b><span>{name}</span></div>)}</div>
      </section>

      <section className="cta" id="contact"><div className="page-shell cta-inner">
        <CtaParallax />
        <div className="cta-copy"><p className="cta-eyebrow">Same curiosity.<br />A brighter tomorrow.</p><h2>Let&apos;s build<br />what&apos;s next.</h2><p>Tell us about your project, goals and timeline by email.</p><div><a className="button" href="mailto:info@icetechdevelopment.com">Send us an email <span>→</span></a><a className="line-link" href="mailto:info@icetechdevelopment.com">info@icetechdevelopment.com</a></div><small className="cta-email-note">No forms — just a direct conversation.</small></div>
        <div className="cta-manifesto"><i/><span>Ideas</span><span>Engineering</span><span>Impact</span></div>
        <Image className="cta-mountains" src="/cta-architectural-blueprint-v3.png" alt="" width={1672} height={941} sizes="100vw" />
      </div></section>

      <footer className="site-footer page-shell">
        <div><a href="#top"><Brand /></a><small>© 2026 ICE TECH DEVELOPMENT. All rights reserved.</small></div>
        <nav><a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a><Link href="/process">Process</Link><a href="#contact">Contact</a></nav>
        <div className="footer-contact"><p>Belgrade / Serbia<br/>Working worldwide<a className="footer-email" href="mailto:info@icetechdevelopment.com">info@icetechdevelopment.com</a></p><div><a href="mailto:info@icetechdevelopment.com" aria-label="Email"><SocialIcon name="mail" /></a></div><small>Ideas / Engineering / Impact</small></div>
      </footer>
      <ScrollToTop />
    </main>
  );
}
