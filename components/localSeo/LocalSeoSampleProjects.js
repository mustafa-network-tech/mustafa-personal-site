'use client'

import Link from 'next/link'
import DemoProjectCard from '@/components/DemoProjectCard'
import { pickProjectsForSlug } from '@/lib/localSeo/projectPool'
import { useLanguage } from '@/contexts/LanguageContext'

const SHOWCASE_HREF = '/vitrin'

/**
 * @param {{ slug: string, sectionTitle?: string }} props
 */
export default function LocalSeoSampleProjects({ slug, sectionTitle = 'Örnek çalışmalar' }) {
  const { t } = useLanguage()
  const projects = pickProjectsForSlug(slug, 2)
  const badge = t.demo_card_badge
  const ctaLabel = t.view_demo || 'View Demo'

  return (
    <section
      className="py-14 md:py-16"
      style={{ background: '#F5F3EF' }}
      aria-labelledby="local-seo-projects-heading"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <h2
          id="local-seo-projects-heading"
          className="text-2xl md:text-3xl font-bold tracking-tight text-[#1E293B] mb-2"
          style={{ letterSpacing: '-0.02em' }}
        >
          {sectionTitle}
        </h2>
        <p className="text-sm md:text-base text-[#475569] mb-8 max-w-2xl leading-relaxed">
          Demo ve vitrin projelerinden seçilmiş örnekler — canlı demo adresine giderek inceleyebilirsiniz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
          {projects.map((project) => (
            <DemoProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              url={project.url}
              badge={badge}
              ctaLabel={ctaLabel}
              typeLabel={project.typeLabel}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={SHOWCASE_HREF}
            className="inline-flex items-center justify-center px-6 py-3 rounded-[12px] text-sm font-semibold text-white bg-[#2563EB] border border-[#2563EB] hover:bg-[#1d4ed8] transition-all duration-300 hover:-translate-y-0.5"
          >
            Tüm Projeleri Gör
          </Link>
        </div>
      </div>
    </section>
  )
}
