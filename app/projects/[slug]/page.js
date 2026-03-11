// app/projects/[slug]/page.js – English project detail (dynamic SEO + JSON-LD)
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL, getProjectMeta, PROJECT_SLUGS, OG_IMAGES } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getProjectSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'

export async function generateMetadata({ params }) {
  const slug = params?.slug
  const meta = getProjectMeta(slug)
  if (!meta) return { title: 'Project Not Found' }
  const { title, description } = meta.en
  const path = `/projects/${slug}`
  const og = buildOpenGraph({ locale: 'en', path, title, description, image: OG_IMAGES.en })
  const twitter = buildTwitterCard({ title, description, image: OG_IMAGES.en })
  return {
    title,
    description,
    alternates: { canonical: path, languages: { en: path, tr: `/tr${path}`, 'x-default': path } },
    openGraph: og,
    twitter,
  }
}

export default async function ProjectDetailEn({ params }) {
  const slug = params?.slug
  const meta = getProjectMeta(slug)
  if (!meta) notFound()
  const { title, description } = meta.en
  const projectUrl = `${SITE_URL}/projects/${slug}`
  const projectSchema = getProjectSchema({ name: title.split('|')[0].trim(), description, url: projectUrl })
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <JsonLd data={projectSchema} />
      <h1 className="text-3xl font-bold text-[#F8FAFC] mb-4">{title.split('|')[0].trim()}</h1>
      <p className="text-[#E2E8F0] mb-8">{description}</p>
      <p>
        <Link href="/projects" className="text-[#4F7CFF] hover:underline">
          ← All projects
        </Link>
        {' · '}
        <Link href="/" className="text-[#94A3B8] hover:text-[#F8FAFC]">
          Home
        </Link>
      </p>
    </div>
  )
}

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }))
}
