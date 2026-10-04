import type { MetadataRoute } from "next";
import { projects } from "./projects/projectSummaries";
import { siteUrl } from "./site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/services/", "/projects/", "/process/", ...projects.map(({ slug }) => `/projects/${slug}/`)]
    .map((path) => ({ url: `${siteUrl}${path}` }));
}
