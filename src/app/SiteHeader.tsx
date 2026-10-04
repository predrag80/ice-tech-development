import Link from "./StaticLink";
import MobileMenu from "./MobileMenu";

export default function SiteHeader({ active, home = false }: { active?: "services" | "work" | "process"; home?: boolean }) {
  const links = [
    { key: "services", title: "Services", href: home ? "#services" : "/services/" },
    { key: "work", title: "Work", href: home ? "#work" : "/projects/" },
    { key: "about", title: "About", href: home ? "#about" : "/#about" },
    { key: "process", title: "Process", href: "/process/" },
    { key: "contact", title: "Contact", href: home ? "#contact" : "/#contact" },
  ];
  const navigation = links.map(({ key, title, href }) => <Link key={key} href={href} aria-current={active === key ? "page" : undefined}>{title}</Link>);
  return (
    <header className={`site-header page-shell${home ? "" : " site-header-inner"}`}>
      <Link href="/" aria-label="ICE TECH DEVELOPMENT home"><span className="brand">
        <svg className="mountain-mark" viewBox="0 0 72 52" aria-hidden="true">
          <path fill="#73A9FA" d="M0 48 26.5 6 39 48H0Z" /><path fill="#163965" d="M17 48 41 0l25 48H17Z" /><path fill="#A9C8ED" d="m38 48 14-27 20 27H38Z" />
          <path fill="#EEF6FF" d="m26.5 6 6.6 13.2-6.1-3.8-7.8 12.2L26.5 6Z" /><path fill="#F8FBFF" d="m41 0 8.7 18.1-8-5-7.9 13.2L41 0Z" /><path fill="#DCEBFA" d="m52 21 6.2 8.4-5.3-2.6-5.3 8.6L52 21Z" />
        </svg><span>ICE TECH<small>DEVELOPMENT</small></span>
      </span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{navigation}</nav>
      <a className="button button-compact header-action" href="mailto:hello@icetechdevelopment.com">Send us email <span aria-hidden="true">→</span></a>
      <MobileMenu><Link href="/">Home</Link>{navigation}<a href="mailto:hello@icetechdevelopment.com">Send us email</a></MobileMenu>
    </header>
  );
}
