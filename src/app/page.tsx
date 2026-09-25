import Image from "next/image";

const services = [
  {
    number: "01",
    title: "Web development",
    description:
      "Fast, accessible websites and web applications engineered around real business goals.",
    tags: "Next.js / React / APIs / CMS",
  },
  {
    number: "02",
    title: "Software development",
    description:
      "Custom systems that simplify operations, connect data, and scale as your company grows.",
    tags: "Architecture / Backend / Databases",
  },
  {
    number: "03",
    title: "Digital products",
    description:
      "A complete path from an early idea to a polished, production-ready digital product.",
    tags: "Strategy / UX / Build / Launch",
  },
];

const principles = [
  "Clear architecture",
  "Speed by default",
  "Built to maintain",
  "Designed to scale",
  "Human experience",
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function MountainMark() {
  return (
    <span className="mountain-mark" aria-hidden="true">
      <i />
      <b />
    </span>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ICE TECH DEVELOPMENT home">
          <MountainMark />
          <span>
            ICE TECH
            <small>DEVELOPMENT</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="button button-small header-cta" href="mailto:hello@icetechdevelopment.com">
          Start a project <span aria-hidden="true">↗</span>
        </a>

        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </details>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Web &amp; software development
          </p>
          <h1>
            Digital products.
            <br />
            <span>Thoughtfully engineered.</span>
          </h1>
          <p className="hero-description">
            We turn complex ideas into precise, scalable digital experiences — built for performance,
            clarity, and long-term growth.
          </p>
          <div className="hero-actions">
            <a className="button" href="mailto:hello@icetechdevelopment.com">
              Start a project <Arrow />
            </a>
            <a className="text-link" href="#work">
              Explore our work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="ICE TECH brand visual">
          <div className="visual-grid" />
          <div className="ice-orbit ice-orbit-one" />
          <div className="ice-orbit ice-orbit-two" />
          <div className="mountain-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <Image
            className="samoyed-watermark"
            src="/samoyed-watermark.png"
            alt=""
            width={1145}
            height={1374}
            priority
          />
          <div className="system-label system-label-top">
            <span>ICE / SYSTEM 01</span>
            <i />
          </div>
          <div className="system-label system-label-bottom">
            <span>PRECISION</span>
            <span>PERFORMANCE</span>
            <span>CLARITY</span>
          </div>
          <div className="hero-visual-caption">
            <span>Belgrade / Serbia</span>
            <span>Working worldwide</span>
          </div>
        </div>

        <div className="hero-meta">
          <span>EST. 2026</span>
          <span>44.7866° N / 20.4489° E</span>
          <span>SCROLL TO DISCOVER</span>
        </div>
      </section>

      <section className="trust-bar" aria-label="Studio qualities">
        <div className="section-shell trust-inner">
          <p>We build for</p>
          <span>Startups</span>
          <i />
          <span>Growing companies</span>
          <i />
          <span>Ambitious teams</span>
        </div>
      </section>

      <section className="section-shell section-pad services" id="services">
        <div className="section-heading">
          <p className="eyebrow">Capabilities / 01</p>
          <div>
            <h2>Built around the problem.</h2>
            <p>Not around a template.</p>
          </div>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <article className="service-row" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <div className="service-detail">
                <p>{service.description}</p>
                <span>{service.tags}</span>
              </div>
              <Arrow />
            </article>
          ))}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-shell section-pad">
          <div className="section-heading work-heading">
            <p className="eyebrow">Selected work / 02</p>
            <div>
              <h2>A few things</h2>
              <p>we&apos;ve built.</p>
            </div>
          </div>

          <div className="project-grid">
            <article className="project project-large project-blue">
              <div className="project-visual commerce-visual">
                <span className="mock-pill">Live overview</span>
                <div className="commerce-card">
                  <div>
                    <small>Monthly revenue</small>
                    <strong>€184,290</strong>
                    <span>+24.8%</span>
                  </div>
                  <div className="mini-chart">
                    {[34, 46, 42, 61, 56, 78, 72, 90].map((height, index) => (
                      <i key={index} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="project-info">
                <div>
                  <p>Commerce operations platform</p>
                  <span>Product design / Web application</span>
                </div>
                <span>2026 <Arrow /></span>
              </div>
            </article>

            <article className="project project-small project-navy">
              <div className="project-visual mobile-visual">
                <div className="phone-shell">
                  <div className="phone-top"><span /> <span /></div>
                  <p>Good morning</p>
                  <h4>Your week</h4>
                  <div className="phone-score">82<small>/100</small></div>
                  <div className="phone-lines"><i /><i /><i /></div>
                </div>
              </div>
              <div className="project-info">
                <div>
                  <p>Wellness companion</p>
                  <span>Mobile product / API</span>
                </div>
                <span>2026 <Arrow /></span>
              </div>
            </article>

            <article className="project project-small project-ice">
              <div className="project-visual architecture-visual">
                <div className="architecture-card">
                  <span>System status</span>
                  <strong>All services operational</strong>
                  <div className="status-row"><i /> Gateway <b>99.99%</b></div>
                  <div className="status-row"><i /> Core API <b>99.98%</b></div>
                  <div className="status-row"><i /> Data layer <b>100%</b></div>
                </div>
              </div>
              <div className="project-info">
                <div>
                  <p>Cloud infrastructure suite</p>
                  <span>Architecture / Platform</span>
                </div>
                <span>2025 <Arrow /></span>
              </div>
            </article>

            <article className="project project-large project-mist">
              <div className="project-visual booking-visual">
                <div className="booking-sidebar">
                  <b>nord.</b>
                  <span>Explore</span>
                  <span>Journeys</span>
                  <span>Account</span>
                </div>
                <div className="booking-main">
                  <small>Curated journeys</small>
                  <strong>Far north,<br />made simple.</strong>
                  <button>Find a journey</button>
                </div>
              </div>
              <div className="project-info">
                <div>
                  <p>Curated travel experience</p>
                  <span>Brand platform / Booking</span>
                </div>
                <span>2025 <Arrow /></span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="technology section-shell section-pad">
        <div className="technology-intro">
          <p className="eyebrow">Technology / 03</p>
          <h2>Modern tools.<br />Sensible choices.</h2>
          <p>
            We choose technology based on the product, the team, and what needs to last — not what is
            fashionable this week.
          </p>
        </div>
        <div className="technology-grid">
          <div>
            <span>Frontend</span>
            <p>React</p><p>Next.js</p><p>TypeScript</p><p>Modern CSS</p>
          </div>
          <div>
            <span>Backend</span>
            <p>Node.js</p><p>REST APIs</p><p>PHP / Laravel</p><p>Integrations</p>
          </div>
          <div>
            <span>Data &amp; cloud</span>
            <p>PostgreSQL</p><p>Redis</p><p>Docker</p><p>CI / CD</p>
          </div>
        </div>
      </section>

      <section className="philosophy" id="about">
        <div className="section-shell philosophy-inner">
          <div className="philosophy-statement">
            <p className="eyebrow">Our approach / 04</p>
            <h2>Good software<br />should feel simple.</h2>
            <p>
              Behind that simplicity is careful engineering, honest collaboration, and obsessive
              attention to the details people actually notice.
            </p>
          </div>
          <ol className="principle-list">
            {principles.map((principle, index) => (
              <li key={principle}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{principle}</p>
                <Arrow />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-panel">
          <div className="contact-grid" />
          <div className="contact-copy">
            <p className="eyebrow light">Have an idea?</p>
            <h2>Let&apos;s build<br />what&apos;s next.</h2>
          </div>
          <div className="contact-action">
            <p>Tell us what you&apos;re working on. We&apos;ll get back to you with clear next steps.</p>
            <a className="button button-light" href="mailto:hello@icetechdevelopment.com">
              Start a conversation <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <div className="footer-brand">
          <a className="brand" href="#top">
            <MountainMark />
            <span>ICE TECH<small>DEVELOPMENT</small></span>
          </a>
          <p>Web development / Software development / Digital products</p>
        </div>
        <div className="footer-column">
          <span>Location</span>
          <p>Belgrade / Serbia</p>
          <p>Working worldwide</p>
        </div>
        <div className="footer-column">
          <span>Contact</span>
          <a href="mailto:hello@icetechdevelopment.com">hello@icetechdevelopment.com</a>
          <a href="#top">LinkedIn ↗</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ICE TECH DEVELOPMENT</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
