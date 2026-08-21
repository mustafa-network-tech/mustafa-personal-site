import Link from 'next/link'
import { getProjectTypeIcon } from '@/components/projects/projectVisuals'
import { getProjectBySlug } from '@/lib/projects/projectsData'
import ProjectCardCta from '@/components/projects/ProjectCardCta'

/**
 * Ana sayfa proje kartı — görselsiz, kompakt yazılım portföyü stili.
 * slug varsa detay sayfasına, yoksa dış URL'ye gider.
 */
export default function DemoProjectCard({
  title,
  description,
  tags = [],
  url,
  typeLabel = 'Demo',
  slug,
  locale = 'tr',
  focus = [],
}) {
  const dataProject = slug ? getProjectBySlug(slug) : null
  const category = dataProject
    ? (dataProject.category[locale] || dataProject.category.tr)
    : typeLabel
  const href = slug
    ? (locale === 'tr' ? `/tr/projects/${slug}` : `/projects/${slug}`)
    : (url || '#')
  const isInternal = !!slug
  const btnLabel = isInternal
    ? (locale === 'tr' ? 'Projeyi İncele' : 'View Project')
    : (locale === 'tr' ? 'Siteyi Gör' : 'View Site')
  const Icon = getProjectTypeIcon(
    dataProject || { category: { tr: typeLabel, en: typeLabel }, tags }
  )

  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <span className="inline-block max-w-[calc(100%-2.25rem)] truncate text-[11px] font-semibold tracking-wide uppercase text-[#4F46E5] px-2 py-0.5 rounded-md bg-[#EEF2FF] border border-[#E0E7FF] transition-colors duration-200 group-hover:border-[#818CF8]">
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
        {title}
      </h3>

      <p className="text-[13px] text-[#64748B] leading-relaxed line-clamp-3 mb-3 flex-grow">
        {description}
      </p>

      {focus.length > 0 && (
        <ul className="mb-3 space-y-1">
          {focus.slice(0, 3).map((item) => (
            <li
              key={item}
              className="text-[12px] text-[#64748B] leading-snug pl-2 border-l border-[#E2E8F0]"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium tracking-tight text-[#475569] px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] transition-colors duration-200 group-hover:border-[#C7D2FE] group-hover:bg-white"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-3 border-t border-[#F1F5F9]">
        <ProjectCardCta label={btnLabel} />
      </div>
    </>
  )

  const baseClass =
    'group flex flex-col h-full rounded-[14px] border border-[#E2E8F0] bg-white px-5 py-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#C7D2FE] hover:bg-[#FAFBFF]'

  if (isInternal) {
    return (
      <Link href={href} className={baseClass} aria-label={`${title} — ${btnLabel}`}>
        {cardContent}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClass}
      aria-label={`${title} — ${btnLabel}`}
    >
      {cardContent}
    </a>
  )
}
