import Link from "./StaticLink";
import styles from "./trust-content.module.css";

export function StudioIntro() {
  return (
    <section id="about" aria-labelledby="about-title" className={`${styles.about} page-shell`}>
      <div data-reveal>
        <p className={styles.eyebrow}>/ Who we are</p>
        <h2 id="about-title">Development with<br />a clear purpose.</h2>
        <Link className="line-link" href="/projects/">Explore our work</Link>
      </div>
      <div className={styles.aboutCopy} data-reveal>
        <p>ICE TECH DEVELOPMENT is a development team based in Belgrade, Serbia. We build web applications, AI features and platform integrations for clients worldwide.</p>
        <p>Our work spans a virtual agent for a training platform, an interactive fan experience, an agency website and a content platform with custom data integrations. The selected projects show the features we developed and the technology behind them.</p>
        <dl className={styles.facts}>
          <div><dt>Based in</dt><dd>Belgrade, Serbia</dd></div>
          <div><dt>Working with</dt><dd>Clients worldwide</dd></div>
          <div><dt>Focus</dt><dd>Web apps, AI &amp; integrations</dd></div>
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
    answer: "Most projects start with a fixed-price Scope Sprint of one to two weeks. It ends with a prioritised scope, a technical direction and an estimate, so the price and timeline of the build are agreed before it starts. For AI ideas or an existing platform, a fixed-price AI Audit or Platform Audit is the first step.",
  },
  {
    question: "Can we discuss an existing website or application?",
    answer: "Yes—share a link and describe what needs to change. Our work includes custom plugins, headless front ends and API integrations for existing platforms. A one-week Platform Audit is a good first step when the current setup needs assessing.",
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
      <div className={styles.faqIntro} data-reveal>
        <p className={styles.eyebrow}>/ Before we start</p>
        <h2 id="faq-title">A few useful<br />answers.</h2>
        <p className={styles.nextLabel}>After your email</p>
        <ol className={styles.nextSteps} aria-label="What happens after your email">
          <li><span aria-hidden="true">01</span><div><strong>Review your brief</strong><p>We read the context and identify what needs clarifying.</p></div></li>
          <li><span aria-hidden="true">02</span><div><strong>Discuss the fit</strong><p>We talk through your goals, requirements and constraints.</p></div></li>
          <li><span aria-hidden="true">03</span><div><strong>Agree the next step</strong><p>We define the scope, estimate and delivery plan together.</p></div></li>
        </ol>
      </div>
      <div className={styles.questions} data-reveal>
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
