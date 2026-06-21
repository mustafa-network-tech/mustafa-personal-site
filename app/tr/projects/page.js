// app/tr/projects/page.js – Premium portfolio galerisi (TR)
import { PAGE_META, OG_IMAGES, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getBreadcrumbListSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'
import PortfolioCard from '@/components/projects/PortfolioCard'
import { ALL_PROJECTS } from '@/lib/projects/projectsData'

const meta = PAGE_META.projects.tr
const og = buildOpenGraph({ locale: 'tr', path: '/tr/projects', title: meta.title, description: meta.description, image: OG_IMAGES.tr })
const twitter = buildTwitterCard({ locale: 'tr', title: meta.title, description: meta.description, image: OG_IMAGES.tr })

const breadcrumbJson = getBreadcrumbListSchema([
  { name: 'Ana sayfa', url: '/tr' },
  { name: 'Projeler', url: '/tr/projects' },
])

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: GLOBAL_META.tr.keywords,
  alternates: {
    canonical: '/tr/projects',
    languages: { tr: '/tr/projects', en: '/projects', 'x-default': '/tr/projects' },
  },
  openGraph: og,
  twitter,
}

export default function ProjectsTr() {
  return (
    <>
      <JsonLd data={breadcrumbJson} />

      <div className="min-h-screen bg-[#F8FAFC]">
        {/* ── Sayfa başlığı ── */}
        <div className="bg-white border-b border-[#E2E8F0]">
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-14">
            <span className="inline-block text-[12px] font-semibold tracking-widest text-[#4F46E5] uppercase mb-4">
              Portföy
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] leading-tight mb-4">
              Projeler
            </h1>
            <p className="text-lg text-[#475569] max-w-2xl leading-relaxed">
              {meta.description}
            </p>
          </div>
        </div>

        {/* ── Proje grid ── */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_PROJECTS.map((project) => (
              <PortfolioCard
                key={project.slug}
                project={project}
                locale="tr"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
