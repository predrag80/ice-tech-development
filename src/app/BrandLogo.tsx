import Image from "next/image";

export default function BrandLogo() {
  return <Image className="brand" src="/ice-tech-logo.svg?v=2" alt="ICE TECH DEVELOPMENT" width={206} height={38} loading="eager" unoptimized />;
}
