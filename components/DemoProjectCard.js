import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Ana sayfa demo kartı — minimal, "Projeyi İncele" butonu ile detail sayfasına yönlendirir.
 * slug + locale verildiğinde internal link; verilmediğinde external url kullanılır.
 */
export default function DemoProjectCard({
  title,
  description,
  tags = [],
  url,
  typeLabel = 'Demo',
  image,
  slug,
  locale = 'tr',
}) {
  const href = slug
    ? (locale === 'tr' ? `/tr/projects/${slug}` : `/projects/${slug}`)
    : (url || '#')
  const isInternal = !!slug
  const btnLabel = isInternal
    ? (locale === 'tr' ? 'Projeyi İncele' : 'View Project')
    : (locale === 'tr' ? 'Siteyi Gör' : 'View Site')

  const cardContent = (
    <>
      {/* ── Üst: Proje görseli ── */}
      <div className="relative w-full shrink-0 overflow-hidden bg-[#F1F5F9]" style={{ height: 180 }}>
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#94A3B8] text-sm font-medium">{title}</span>
          </div>
        )}
      </div>

      {/* ── Alt: İçerik alanı ── */}
      <div className="flex flex-col flex-grow p-5">
        <div className="mb-3">
          <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF]">
            {typeLabel}
          </span>
        </div>

        <h3 className="text-[16px] font-bold text-[#0F172A] mb-2 leading-snug">
          {title}
        </h3>

        <p className="text-[13px] text-[#64748B] leading-relaxed mb-4 line-clamp-2 flex-grow">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-[#F1F5F9]">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] transition-all duration-200 group-hover:gap-2.5">
            {btnLabel}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </>
  )

  const baseClass =
    'group flex flex-col rounded-[20px] overflow-hidden border border-[#E2E8F0] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.13)] h-full'

  if (isInternal) {
    return (
      <Link href={href} className={baseClass}>
        {cardContent}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={baseClass}>
      {cardContent}
    </a>
  )
}
