// app/tr/projects/[slug]/page.js – Turkish project detail (dynamic SEO + JSON-LD)
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL, getProjectMeta, getProjectDetailSections, PROJECT_SLUGS, OG_IMAGES, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getProjectSchema, getBreadcrumbListSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'

export async function generateMetadata({ params }) {
  const slug = params?.slug
  const meta = getProjectMeta(slug)
  if (!meta) return { title: 'Proje Bulunamadı' }
  const { title, description } = meta.tr
  const path = `/tr/projects/${slug}`
  const og = buildOpenGraph({ locale: 'tr', path, title, description, image: OG_IMAGES.tr })
  const twitter = buildTwitterCard({ locale: 'tr', title, description, image: OG_IMAGES.tr })
  return {
    title,
    description,
    keywords: GLOBAL_META.tr.keywords,
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
  const detail = getProjectDetailSections(slug)
  const breadcrumbJson = getBreadcrumbListSchema([
    { name: 'Ana sayfa', url: '/tr' },
    { name: 'Projeler', url: '/tr/projects' },
    { name: title.split('|')[0].trim(), url: `/tr/projects/${slug}` },
  ])

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <JsonLd data={[projectSchema, breadcrumbJson]} />
      <article>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-4">{title.split('|')[0].trim()}</h1>
        <p className="text-[#E2E8F0] mb-8 leading-relaxed">{description}</p>

        {detail?.tr && (
          <div className="space-y-8 mb-10">
            <p className="text-[#CBD5E1] leading-relaxed">{detail.tr.intro}</p>
            {detail.tr.blocks?.map((block) => (
              <section key={block.heading}>
                <h2 className="text-xl font-semibold text-[#F8FAFC] mb-3">{block.heading}</h2>
                <p className="text-[#94A3B8] leading-relaxed">{block.text}</p>
              </section>
            ))}
          </div>
        )}

        <nav className="flex flex-wrap gap-3 text-sm border-t border-[rgba(248,250,252,0.12)] pt-8" aria-label="İlgili sayfalar">
          <Link href="/tr/services" className="text-[#4F7CFF] hover:underline">
            Hizmetler
          </Link>
          <span className="text-[#475569]">·</span>
          <Link href="/tr/projects" className="text-[#4F7CFF] hover:underline">
            Tüm projeler
          </Link>
          <span className="text-[#475569]">·</span>
          <Link href="/tr/vitrin" className="text-[#4F7CFF] hover:underline">
            Vitrin
          </Link>
          <span className="text-[#475569]">·</span>
          <Link href="/tr/contact" className="text-[#4F7CFF] hover:underline">
            İletişim
          </Link>
        </nav>
      </article>
    </div>
  )
}

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }))
}
