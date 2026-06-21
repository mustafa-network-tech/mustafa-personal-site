// app/projects/[slug]/page.js – Premium project detail page (EN)
import { notFound } from 'next/navigation'
import { SITE_URL, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getProjectSchema, getBreadcrumbListSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'
import ProjectDetailContent from '@/components/projects/ProjectDetailContent'
import { getProjectBySlug, getRelatedProjects, ALL_SLUGS } from '@/lib/projects/projectsData'

export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params?.slug)
  if (!project) return { title: 'Project Not Found' }
  const { metaTitle, metaDesc } = project.en
  const path = `/projects/${project.slug}`
  return {
    title: metaTitle,
    description: metaDesc,
    keywords: GLOBAL_META.en.keywords,
    alternates: {
      canonical: path,
      languages: { en: path, tr: `/tr/projects/${project.slug}`, 'x-default': `/tr/projects/${project.slug}` },
    },
    openGraph: buildOpenGraph({ locale: 'en', path, title: metaTitle, description: metaDesc }),
    twitter: buildTwitterCard({ locale: 'en', title: metaTitle, description: metaDesc }),
  }
}

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }))
}

export default function ProjectDetailEn({ params }) {
  const project = getProjectBySlug(params?.slug)
  if (!project) notFound()

  const related = getRelatedProjects(project.slug, 3)
  const path = `/projects/${project.slug}`

  const projectSchema = getProjectSchema({
    name: project.en.title,
    description: project.en.metaDesc,
    url: `${SITE_URL}${path}`,
  })
  const breadcrumbJson = getBreadcrumbListSchema([
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: project.en.title, url: path },
  ])

  return (
    <>
      <JsonLd data={[projectSchema, breadcrumbJson]} />
      <ProjectDetailContent project={project} locale="en" related={related} />
    </>
  )
}
