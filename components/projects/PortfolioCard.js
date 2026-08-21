import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getProjectTypeIcon } from '@/components/projects/projectVisuals'

/**
 * Kompakt proje kartı — görselsiz, yazılım portföyü vitrini.
 * Tüm kart tıklanabilir; slug ve locale ile mevcut route'lara gider.
 */
export default function PortfolioCard({ project, locale = 'tr' }) {
  const data = project[locale] || project.tr
  const category = project.category[locale] || project.category.tr
  const href = locale === 'tr'
    ? `/tr/projects/${project.slug}`
    : `/projects/${project.slug}`
  const btnLabel = locale === 'tr' ? 'Projeyi İncele' : 'View Project'
  const Icon = getProjectTypeIcon(project)

  return (
    <Link
      href={href}
      className="group flex flex-col h-full rounded-[14px] border border-[#E2E8F0] bg-white px-5 py-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#C7D2FE] hover:bg-[#FAFBFF]"
      aria-label={`${data.title} — ${btnLabel}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <span className="inline-block max-w-[calc(100%-2.25rem)] truncate text-[11px] font-semibold tracking-wide uppercase text-[#4F46E5] px-2 py-0.5 rounded-md bg-[#EEF2FF] border border-[#E0E7FF]">
          {category}
        </span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#E2E8F0] text-[#94A3B8]"
          aria-hidden="true"
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>

      <h3 className="text-[15px] font-semibold text-[#0F172A] leading-snug break-words mb-2">
        {data.title}
      </h3>

      <p className="text-[13px] text-[#64748B] leading-relaxed line-clamp-3 mb-3.5 flex-grow">
        {data.shortDesc}
      </p>

      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-[#475569] px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-3 border-t border-[#F1F5F9]">
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] transition-[gap] duration-200 group-hover:gap-2.5">
          {btnLabel}
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}
