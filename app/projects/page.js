// app/projects/page.js – Premium portfolio gallery (EN)
import { PAGE_META, OG_IMAGES, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getBreadcrumbListSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'
import PortfolioCard from '@/components/projects/PortfolioCard'
import { ALL_PROJECTS } from '@/lib/projects/projectsData'

const meta = PAGE_META.projects.en
const og = buildOpenGraph({ locale: 'en', path: '/projects', title: meta.title, description: meta.description, image: OG_IMAGES.en })
const twitter = buildTwitterCard({ locale: 'en', title: meta.title, description: meta.description, image: OG_IMAGES.en })

const breadcrumbJson = getBreadcrumbListSchema([
  { name: 'Home', url: '/' },
  { name: 'Projects', url: '/projects' },
])

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: GLOBAL_META.en.keywords,
  alternates: {
    canonical: '/projects',
    languages: { en: '/projects', tr: '/tr/projects', 'x-default': '/tr/projects' },
  },
  openGraph: og,
  twitter,
}

export default function ProjectsEn() {
  return (
    <>
      <JsonLd data={breadcrumbJson} />

      <div className="min-h-screen bg-[#F8FAFC]">
        {/* ── Page header ── */}
        <div className="bg-white border-b border-[#E2E8F0]">
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-14">
            <span className="inline-block text-[12px] font-semibold tracking-widest text-[#4F46E5] uppercase mb-4">
              Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] leading-tight mb-4">
              Projects
            </h1>
            <p className="text-lg text-[#475569] max-w-2xl leading-relaxed">
              {meta.description}
            </p>
          </div>
        </div>

        {/* ── Project grid ── */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_PROJECTS.map((project) => (
              <PortfolioCard
                key={project.slug}
                project={project}
                locale="en"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
