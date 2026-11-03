import BrandLogo from "./BrandLogo";
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
      <Link href="/" aria-label="ICE TECH DEVELOPMENT home"><BrandLogo /></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{navigation}</nav>
      <a className="button button-compact header-action" href="mailto:info@icetechdevelopment.com">Send us email <span aria-hidden="true">→</span></a>
      <MobileMenu><Link href="/">Home</Link>{navigation}<a href="mailto:info@icetechdevelopment.com">Send us email</a></MobileMenu>
    </header>
  );
}
