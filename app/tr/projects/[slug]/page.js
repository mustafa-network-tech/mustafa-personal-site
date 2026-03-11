// app/tr/projects/[slug]/page.js – Turkish project detail (dynamic SEO)
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL, getProjectMeta, PROJECT_SLUGS } from '@/lib/seo'

export async function generateMetadata({ params }) {
  const slug = params?.slug
  const meta = getProjectMeta(slug)
  if (!meta) return { title: 'Proje Bulunamadı' }
  const { title, description } = meta.tr
  return {
    title,
    description,
    alternates: {
      canonical: `/tr/projects/${slug}`,
      languages: {
        tr: `/tr/projects/${slug}`,
        en: `/projects/${slug}`,
        'x-default': `/projects/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/tr/projects/${slug}`,
    },
  }
}

export default async function ProjectDetailTr({ params }) {
  const slug = params?.slug
  const meta = getProjectMeta(slug)
  if (!meta) notFound()
  const { title, description } = meta.tr
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
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
