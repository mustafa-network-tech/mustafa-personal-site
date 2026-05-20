import Link from 'next/link'
import { pickProjectsForSlug } from '@/lib/localSeo/projectPool'

const SHOWCASE_HREF = '/vitrin'

/**
 * @param {{ slug: string, sectionTitle?: string }} props
 */
export default function LocalSeoSampleProjects({ slug, sectionTitle = 'Örnek çalışmalar' }) {
  const projects = pickProjectsForSlug(slug, 2)

  return (
    <section className="py-14 md:py-16 border-t border-[rgba(248,250,252,0.08)]" aria-labelledby="local-seo-projects-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 id="local-seo-projects-heading" className="text-xl md:text-2xl font-semibold text-[#F8FAFC] mb-2">
          {sectionTitle}
        </h2>
        <p className="text-[#94A3B8] text-sm mb-8 max-w-2xl">
          Demo, vitrin ve kişisel portföy projelerinden seçilmiş örnekler — müşteri gizliliği kapsamında canlı referans yerine
          gösterilir.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl overflow-hidden border border-[rgba(248,250,252,0.1)] bg-[rgba(15,23,42,0.45)]"
            >
              <div
                className={`h-32 md:h-36 bg-gradient-to-br ${project.tone} flex items-end p-4`}
                role="img"
                aria-label={`${project.title} görsel alanı`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80 px-2 py-1 rounded-md bg-black/25">
                  {project.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">{project.title}</h3>
                <p className="text-sm text-[#CBD5E1] leading-relaxed">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={SHOWCASE_HREF}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#4F7CFF] hover:bg-[#3d6ae8] transition-colors"
          >
            Tüm Projeleri Gör
          </Link>
        </div>
      </div>
    </section>
  )
}
