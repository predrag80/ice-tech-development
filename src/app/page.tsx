import Image from "next/image";

const services = [
  { number: "01", title: "Web Development", text: "High-performance websites and web applications built with modern technologies.", tags: "React / Next.js / WordPress / APIs" },
  { number: "02", title: "Software Development", text: "Custom software designed around your business requirements.", tags: "Architecture / Backend / Databases / APIs" },
  { number: "03", title: "Digital Products", text: "From an idea to a production-ready digital product.", tags: "Strategy / UX / Development / Deployment" },
];

const process = [
  ["01", "Understand", "We explore your goals, users and challenges."],
  ["02", "Design", "We create practical, user-centered solutions."],
  ["03", "Build", "We engineer scalable, maintainable software."],
  ["04", "Launch", "We ensure a smooth and successful release."],
  ["05", "Grow", "We keep improving based on real-world data."],
];

const technologies = [
  ["⚛", "React"], ["N▴", "Next.js"], ["TS", "TypeScript"], ["php", "PHP"],
  ["L", "Laravel"], ["JS", "Node.js"], ["PG", "PostgreSQL"], ["My", "MySQL"],
  ["◆", "Docker"], ["aws", "AWS"], ["▲", "Vercel"],
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

function MountainMark() {
  return <span className="mountain-mark" aria-hidden="true"><i /><b /></span>;
}

function Brand() {
  return <span className="brand"><MountainMark /><span>ICE TECH<small>DEVELOPMENT</small></span></span>;
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header page-shell">
        <a href="#top" aria-label="ICE TECH DEVELOPMENT home"><Brand /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
        </nav>
        <a className="button button-compact header-action" href="mailto:hello@icetechdevelopment.com">Start a project <span>→</span></a>
        <details className="mobile-menu"><summary>Menu</summary><nav><a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav></details>
      </header>

      <section className="hero page-shell">
        <div className="hero-copy">
          <p className="microcopy">Software development / Web solutions / Digital products</p>
          <h1>Ideas.<br /><span>Engineered.</span></h1>
          <p className="hero-lead">We design and build modern web applications and software that help businesses grow.</p>
          <div className="hero-actions"><a className="button" href="mailto:hello@icetechdevelopment.com">Start a project <span>→</span></a><a className="line-link" href="#work">See our work</a></div>
        </div>
        <div className="hero-manifesto"><i /><span>People</span><span>Technology</span><span>A brighter</span><span>Tomorrow</span></div>
        <Image className="hero-mountains" src="/ice-mountains.png" alt="" width={2161} height={728} priority />
        <Image className="hero-dog" src="/samoyed-watermark.png" alt="" width={1145} height={1374} priority />
        <div className="hero-pager"><i /><span>01 / 04</span><div><button aria-label="Previous slide">‹</button><button aria-label="Next slide">›</button></div></div>
        <p className="balance-note">Built in balance.</p>
      </section>

      <section className="trusted page-shell" aria-label="Trusted technology partners">
        <span>Trusted by</span><strong>stripe</strong><strong>shopify</strong><strong>Google</strong><strong>▦ Microsoft</strong><strong>aws</strong><strong>▲ Vercel</strong><strong>▣ Notion</strong>
      </section>

      <section className="section page-shell" id="services">
        <div className="section-intro services-intro">
          <div><p className="kicker">/ Services</p><h2>What we do</h2></div>
          <p>We combine strategy, design and engineering to build digital products that create real value.</p>
          <a className="line-link" href="#contact">All services →</a>
        </div>
        <div className="services-grid">
          {services.map((service) => <article key={service.number}><div className="service-top"><span>{service.number}</span><Arrow /></div><h3>{service.title}</h3><p>{service.text}</p><small>{service.tags}</small></article>)}
        </div>
      </section>

      <section className="section projects-section" id="work">
        <div className="page-shell">
          <div className="section-intro projects-intro"><div><p className="kicker">/ Featured work</p><h2>Selected projects</h2></div><a className="line-link" href="#contact">View all projects →</a></div>
          <div className="projects-grid">
            <article className="project-card">
              <div className="project-thumb northwind-thumb"><div className="browser-frame"><div className="browser-bar"><i /><i /><i /></div><div className="northwind-copy"><small>Energy for tomorrow</small><b>A cleaner<br />energy future.</b><button>Explore</button></div><Image src="/ice-mountains.png" alt="" width={2161} height={728} /></div></div>
              <div className="project-type">Web application</div><div className="project-title"><h3>Northwind</h3><Arrow /></div><p>Sustainability platform for a cleaner tomorrow.</p>
            </article>
            <article className="project-card">
              <div className="project-thumb dataflow-thumb"><div className="dashboard"><div className="dash-nav"><b>●</b><i /><i /><i /><i /></div><div className="dash-main"><small>Analytics overview</small><h4>Make smarter<br />decisions.</h4><div className="chart"><span /><span /><span /><span /><span /><span /><span /></div><div className="dash-stats"><i /><i /><i /></div></div></div></div>
              <div className="project-type">Software development</div><div className="project-title"><h3>DataFlow</h3><Arrow /></div><p>Analytics platform for growing businesses.</p>
            </article>
            <article className="project-card">
              <div className="project-thumb moveapp-thumb"><div className="phone phone-one"><small>Welcome back</small><b>Move<br />Forward</b><Image src="/ice-mountains.png" alt="" width={2161} height={728} /></div><div className="phone phone-two"><small>Overview</small><div className="phone-map"/><div className="phone-row"><i/><i/><i/></div></div></div>
              <div className="project-type">Digital product</div><div className="project-title"><h3>MoveApp</h3><Arrow /></div><p>Mobile app for a healthier lifestyle.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section page-shell approach" id="about">
        <div className="approach-copy"><p className="kicker">/ Our approach</p><h2>From idea<br />to impact.</h2><p>We work as a true partner — combining technical expertise with a deep understanding of business goals.</p><a className="outline-button" href="#contact">Learn more about our process</a></div>
        <ol className="process-list">{process.map(([number, title, description]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{description}</p></li>)}</ol>
      </section>

      <section className="technology page-shell">
        <div className="technology-heading"><div><p className="kicker">/ Technology</p><h2>Built with<br />modern technology</h2></div><p>We choose the right tools for the problem, not because they&apos;re fashionable. The right technology helps us build better, faster and more reliable solutions.</p></div>
        <div className="technology-row">{technologies.map(([mark, name]) => <div key={name}><b>{mark}</b><span>{name}</span></div>)}</div>
      </section>

      <section className="cta" id="contact"><div className="page-shell cta-inner">
        <div className="cta-copy"><h2>Let&apos;s build<br />what&apos;s next.</h2><p>Have a project in mind? We&apos;d love to hear about it.</p><div><a className="button" href="mailto:hello@icetechdevelopment.com">Start a project <span>→</span></a><a className="line-link" href="mailto:hello@icetechdevelopment.com">Get in touch</a></div></div>
        <div className="cta-manifesto"><i/><span>Same</span><span>Curiosity</span><span>A brighter</span><span>Tomorrow</span></div>
        <Image className="cta-mountains" src="/ice-mountains.png" alt="" width={2161} height={728} /><Image className="cta-dog" src="/samoyed-watermark.png" alt="" width={1145} height={1374} />
      </div></section>

      <footer className="site-footer page-shell">
        <div><a href="#top"><Brand /></a><small>© 2026 ICE TECH DEVELOPMENT. All rights reserved.</small></div>
        <nav><a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
        <div className="footer-contact"><p>Belgrade / Serbia<br/>Working worldwide</p><div><a href="#top">in</a><a href="#top">●</a><a href="mailto:hello@icetechdevelopment.com">✉</a></div><small>Ideas / Engineering / Impact</small></div>
      </footer>
    </main>
  );
}
