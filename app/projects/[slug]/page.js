// app/projects/[slug]/page.js – English project detail (dynamic SEO + JSON-LD)
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL, getProjectMeta, getProjectDetailSections, PROJECT_SLUGS, OG_IMAGES, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getProjectSchema, getBreadcrumbListSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'

export async function generateMetadata({ params }) {
  const slug = params?.slug
  const meta = getProjectMeta(slug)
  if (!meta) return { title: 'Project Not Found' }
  const { title, description } = meta.en
  const path = `/projects/${slug}`
  const og = buildOpenGraph({ locale: 'en', path, title, description, image: OG_IMAGES.en })
  const twitter = buildTwitterCard({ locale: 'en', title, description, image: OG_IMAGES.en })
  return {
    title,
    description,
    keywords: GLOBAL_META.en.keywords,
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
  const detail = getProjectDetailSections(slug)
  const breadcrumbJson = getBreadcrumbListSchema([
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: title.split('|')[0].trim(), url: `/projects/${slug}` },
  ])

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <JsonLd data={[projectSchema, breadcrumbJson]} />
      <article>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-4">{title.split('|')[0].trim()}</h1>
        <p className="text-[#E2E8F0] mb-8 leading-relaxed">{description}</p>

        {detail?.en && (
          <div className="space-y-8 mb-10">
            <p className="text-[#CBD5E1] leading-relaxed">{detail.en.intro}</p>
            {detail.en.blocks?.map((block) => (
              <section key={block.heading}>
                <h2 className="text-xl font-semibold text-[#F8FAFC] mb-3">{block.heading}</h2>
                <p className="text-[#94A3B8] leading-relaxed">{block.text}</p>
              </section>
            ))}
          </div>
        )}

        <nav className="flex flex-wrap gap-3 text-sm border-t border-[rgba(248,250,252,0.12)] pt-8" aria-label="Related pages">
          <Link href="/services" className="text-[#4F7CFF] hover:underline">
            Services
          </Link>
          <span className="text-[#475569]">·</span>
          <Link href="/projects" className="text-[#4F7CFF] hover:underline">
            All projects
          </Link>
          <span className="text-[#475569]">·</span>
          <Link href="/vitrin" className="text-[#4F7CFF] hover:underline">
            Showcase
          </Link>
          <span className="text-[#475569]">·</span>
          <Link href="/contact" className="text-[#4F7CFF] hover:underline">
            Contact
          </Link>
        </nav>
      </article>
    </div>
  )
}

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }))
}
