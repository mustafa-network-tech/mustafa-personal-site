import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'

const GRADIENTS = {
  'mk-digital': 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
  'mk-ops': 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
  'musty-music': 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
  'mavi-iletisim': 'linear-gradient(135deg, #0e7490 0%, #0891b2 100%)',
  hukuk: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
  danismanlik: 'linear-gradient(135deg, #14532d 0%, #16a34a 100%)',
  guzellik: 'linear-gradient(135deg, #831843 0%, #db2777 100%)',
  'mavi-sarkilar': 'linear-gradient(135deg, #312e81 0%, #6366f1 100%)',
  aria: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
  'mavi-kadraj': 'linear-gradient(135deg, #164e63 0%, #0ea5e9 100%)',
  'kadraj-rotam': 'linear-gradient(135deg, #365314 0%, #65a30d 100%)',
  'gonul-pusulasi': 'linear-gradient(135deg, #581c87 0%, #a855f7 100%)',
  'siir-dunyasi': 'linear-gradient(135deg, #713f12 0%, #ca8a04 100%)',
}

/**
 * @param {{ project: import('@/lib/localSeo/projectPool').LOCAL_SEO_PROJECT_POOL[0] }} props
 */
export default function LocalSeoProjectCard({ project }) {
  const gradient = GRADIENTS[project.id] || 'linear-gradient(135deg, #1e293b 0%, #475569 100%)'

  return (
    <article className="telekom-glass-card group relative rounded-[18px] transition-all duration-[0.35s] ease-out h-full flex flex-col overflow-hidden">
      <div
        className="h-36 w-full flex items-end p-5"
        style={{ background: gradient }}
        aria-hidden
      >
        <span className="text-[10px] font-medium tracking-wide text-white/80 px-2.5 py-1 rounded-md border border-white/20 bg-black/20">
          {project.typeLabel}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="telekom-card-title text-[18px] font-semibold mb-3 leading-tight text-[#1E293B]">
          {project.title}
        </h3>
        <p className="text-sm mb-4 text-[#475569] flex-grow" style={{ lineHeight: 1.6 }}>
          {project.description}
        </p>
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="card-tag inline-block">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto pt-4 border-t border-[rgba(0,0,0,0.08)] flex flex-wrap gap-2">
          <a
            href={project.url || '#'}
            target={project.url ? '_blank' : undefined}
            rel={project.url ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 bg-[#2563EB] border border-[#2563EB] text-white hover:bg-[#1d4ed8]"
          >
            <ExternalLink className="w-4 h-4" aria-hidden />
            Canlı Site
          </a>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 border border-[rgba(0,0,0,0.12)] text-[#1E293B] hover:bg-[rgba(0,0,0,0.04)]"
          >
            Proje Detayı
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  )
}
