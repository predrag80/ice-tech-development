import Image from "next/image";

export default function BrandLogo() {
  return <Image className="brand" src="/ice-tech-logo.svg" alt="ICE TECH DEVELOPMENT" width={221} height={38} loading="eager" unoptimized />;
}
