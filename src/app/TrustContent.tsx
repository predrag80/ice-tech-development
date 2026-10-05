import Link from "./StaticLink";
import styles from "./trust-content.module.css";

export function StudioIntro() {
  return (
    <section id="about" aria-labelledby="about-title" className={`${styles.about} page-shell`}>
      <div>
        <p className={styles.eyebrow}>/ Who we are</p>
        <h2 id="about-title">Development with<br />a clear purpose.</h2>
        <Link className="line-link" href="/projects/">Explore our work</Link>
        <div className={styles.leadership}>
          <p>Leadership</p>
          <h3>Founder &amp; Lead Developer</h3>
          <span>Project Manager</span>
        </div>
      </div>
      <div className={styles.aboutCopy}>
        <p>ICE TECH DEVELOPMENT is a founder-led development team based in Belgrade, Serbia. We design and build websites, web applications and custom software for clients worldwide.</p>
        <p>Our work spans interactive fan experiences, corporate websites and content platforms with custom integrations. The selected projects show the features we developed and the technology behind them.</p>
        <dl className={styles.facts}>
          <div><dt>Based in</dt><dd>Belgrade, Serbia</dd></div>
          <div><dt>Working with</dt><dd>Clients worldwide</dd></div>
          <div><dt>Focus</dt><dd>Web, software &amp; integrations</dd></div>
        </dl>
      </div>
    </section>
  );
}

const questions = [
  {
    question: "What should I include in my first email?",
    answer: "A short description of your business, the problem you want to solve and your preferred timeline is enough to start. If you have an existing website, references or a budget range, include those too. Please do not send passwords or other sensitive access details.",
  },
  {
    question: "Do I need a finished brief or design?",
    answer: "No. You can start with a business goal or an early idea. The Understand and Define phases help turn that context into priorities, a scope and a technical direction before development begins.",
  },
  {
    question: "How are the price and timeline defined?",
    answer: "They depend on the scope, integrations, available content and technical requirements. We review these together and agree the deliverables, estimate and delivery plan before starting the work. There is no one-size-fits-all package.",
  },
  {
    question: "Can we discuss an existing website or application?",
    answer: "Yes—share a link and describe what needs to change. Our work includes custom plugins and API integrations for existing platforms. The first step is to understand the current setup and assess the proposed work.",
  },
  {
    question: "Can we work together remotely?",
    answer: "We are based in Belgrade, Serbia, and work with clients worldwide. We agree communication channels, review sessions and working-hour overlap at the start of the project.",
  },
  {
    question: "What about hosting and support after launch?",
    answer: "We plan deployment as part of the launch process and agree the hosting setup and responsibilities with you. Maintenance, fixes and further development can be discussed as a separate scope. Hosting fees, support availability and any ongoing costs are confirmed in the proposal, not assumed to be included.",
  },
  {
    question: "How are source code and access handed over?",
    answer: "We agree a handover plan covering the relevant repositories, documentation, accounts and services. Ownership and licensing are defined in the project agreement, including any third-party components. Access is transferred through agreed secure channels, not by sending passwords in ordinary email.",
  },
];

export function ProjectFaq() {
  return (
    <section id="project-faq" aria-labelledby="faq-title" className={`${styles.faq} page-shell`}>
      <div className={styles.faqIntro}>
        <p className={styles.eyebrow}>/ Before we start</p>
        <h2 id="faq-title">A few useful<br />answers.</h2>
        <p className={styles.nextLabel}>After your email</p>
        <ol className={styles.nextSteps} aria-label="What happens after your email">
          <li><span aria-hidden="true">01</span><div><strong>Review your brief</strong><p>We read the context and identify what needs clarifying.</p></div></li>
          <li><span aria-hidden="true">02</span><div><strong>Discuss the fit</strong><p>We talk through your goals, requirements and constraints.</p></div></li>
          <li><span aria-hidden="true">03</span><div><strong>Agree the next step</strong><p>We define the scope, estimate and delivery plan together.</p></div></li>
        </ol>
      </div>
      <div className={styles.questions}>
        {questions.map(({ question, answer }) => (
          <details key={question}>
            <summary>{question}<span className={styles.toggle} aria-hidden="true" /></summary>
            <p>{answer}</p>
          </details>
        ))}
        <p className={styles.faqContact}>Something else in mind? <a href="mailto:info@icetechdevelopment.com">Ask us by email <span aria-hidden="true">↗</span></a></p>
      </div>
    </section>
  );
}
