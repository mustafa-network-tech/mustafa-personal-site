// app/tr/projects/[slug]/page.js – Premium proje detay sayfası (TR)
import { notFound } from 'next/navigation'
import { SITE_URL, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getProjectSchema, getBreadcrumbListSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'
import ProjectDetailContent from '@/components/projects/ProjectDetailContent'
import { getProjectBySlug, getRelatedProjects, ALL_SLUGS } from '@/lib/projects/projectsData'

export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params?.slug)
  if (!project) return { title: 'Proje Bulunamadı' }
  const { metaTitle, metaDesc } = project.tr
  const path = `/tr/projects/${project.slug}`
  return {
    title: metaTitle,
    description: metaDesc,
    keywords: GLOBAL_META.tr.keywords,
    alternates: {
      canonical: path,
      languages: { tr: path, en: `/projects/${project.slug}`, 'x-default': path },
    },
    openGraph: buildOpenGraph({ locale: 'tr', path, title: metaTitle, description: metaDesc }),
    twitter: buildTwitterCard({ locale: 'tr', title: metaTitle, description: metaDesc }),
  }
}

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }))
}

export default function ProjectDetailTr({ params }) {
  const project = getProjectBySlug(params?.slug)
  if (!project) notFound()

  const related = getRelatedProjects(project.slug, 3)
  const path = `/tr/projects/${project.slug}`

  const projectSchema = getProjectSchema({
    name: project.tr.title,
    description: project.tr.metaDesc,
    url: `${SITE_URL}${path}`,
  })
  const breadcrumbJson = getBreadcrumbListSchema([
    { name: 'Ana sayfa', url: '/tr' },
    { name: 'Projeler', url: '/tr/projects' },
    { name: project.tr.title, url: path },
  ])

  return (
    <>
      <JsonLd data={[projectSchema, breadcrumbJson]} />
      <ProjectDetailContent project={project} locale="tr" related={related} />
    </>
  )
}
