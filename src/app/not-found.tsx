import Link from "./StaticLink";
import SiteHeader from "./SiteHeader";

export default function NotFound() {
  return <main id="top"><SiteHeader /><section className="not-found page-shell" id="main-content" tabIndex={-1}>
    <p className="kicker">404 / Off the trail</p><h1>This page isn&apos;t here.</h1>
    <p>The link may have changed. Explore our work or head back to the start.</p>
    <div><Link className="button" href="/">Back to home <span aria-hidden="true">→</span></Link><Link className="line-link" href="/projects/">Explore projects</Link></div>
  </section></main>;
}
