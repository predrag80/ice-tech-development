import type { Metadata } from "next";
import { pageMetadata } from "../../site";
import { notFound } from "next/navigation";
import ProjectCaseStudy, { projectCaseStudies } from "../ProjectCaseStudy";

type ProjectSlug = keyof typeof projectCaseStudies;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(projectCaseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectCaseStudies[slug as ProjectSlug];

  if (!project) return {};

  return pageMetadata(`/projects/${slug}`, `${project.name} — ${project.category} | ICE TECH DEVELOPMENT`, project.tagline);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectCaseStudies[slug as ProjectSlug];

  if (!project) notFound();

  return <ProjectCaseStudy project={project} />;
}
