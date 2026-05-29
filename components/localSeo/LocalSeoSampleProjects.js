'use client'

import Link from 'next/link'
import LocalSeoProjectCard from '@/components/localSeo/LocalSeoProjectCard'
import { pickProjectsForSlug } from '@/lib/localSeo/projectPool'

const PROJECTS_HREF = '/projects'

/**
 * @param {{ slug: string, sectionTitle?: string }} props
 */
export default function LocalSeoSampleProjects({ slug, sectionTitle = 'Örnek çalışmalar' }) {
  const projects = pickProjectsForSlug(slug, 2)

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
          Gerçek demo ve vitrin projelerinden seçilmiş örnekler — canlı adres üzerinden inceleyebilir,
          portföy sayfasından tüm çalışmalara ulaşabilirsiniz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
          {projects.map((project) => (
            <LocalSeoProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={PROJECTS_HREF}
            className="inline-flex items-center justify-center px-6 py-3 rounded-[12px] text-sm font-semibold text-white bg-[#2563EB] border border-[#2563EB] hover:bg-[#1d4ed8] transition-all duration-300 hover:-translate-y-0.5"
          >
            Bütün Projelerimizi İnceleyin
          </Link>
        </div>
      </div>
    </section>
  )
}
