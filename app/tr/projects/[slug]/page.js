// app/tr/projects/[slug]/page.js – Turkish project detail (dynamic SEO + JSON-LD)
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL, getProjectMeta, PROJECT_SLUGS, OG_IMAGES } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getProjectSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'

export async function generateMetadata({ params }) {
  const slug = params?.slug
  const meta = getProjectMeta(slug)
  if (!meta) return { title: 'Proje Bulunamadı' }
  const { title, description } = meta.tr
  const path = `/tr/projects/${slug}`
  const og = buildOpenGraph({ locale: 'tr', path, title, description, image: OG_IMAGES.tr })
  const twitter = buildTwitterCard({ title, description, image: OG_IMAGES.tr })
  return {
    title,
    description,
    alternates: { canonical: path, languages: { tr: path, en: `/projects/${slug}`, 'x-default': `/projects/${slug}` } },
    openGraph: og,
    twitter,
  }
}

export default async function ProjectDetailTr({ params }) {
  const slug = params?.slug
  const meta = getProjectMeta(slug)
  if (!meta) notFound()
  const { title, description } = meta.tr
  const projectUrl = `${SITE_URL}/tr/projects/${slug}`
  const projectSchema = getProjectSchema({ name: title.split('|')[0].trim(), description, url: projectUrl })
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <JsonLd data={projectSchema} />
      <h1 className="text-3xl font-bold text-[#F8FAFC] mb-4">{title.split('|')[0].trim()}</h1>
      <p className="text-[#E2E8F0] mb-8">{description}</p>
      <p>
        <Link href="/tr/projects" className="text-[#4F7CFF] hover:underline">
          ← Tüm projeler
        </Link>
        {' · '}
        <Link href="/tr" className="text-[#94A3B8] hover:text-[#F8FAFC]">
          Ana sayfa
        </Link>
      </p>
    </div>
  )
}

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }))
}
