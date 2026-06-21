import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Minimal proje kartı.
 * Görsel üstte, içerik altta — yazı ile görsel asla üst üste gelmez.
 * Tüm kart tıklanabilir link.
 */
export default function PortfolioCard({ project, locale = 'tr' }) {
  const data = project[locale] || project.tr
  const category = project.category[locale] || project.category.tr
  const href = locale === 'tr'
    ? `/tr/projects/${project.slug}`
    : `/projects/${project.slug}`
  const btnLabel = locale === 'tr' ? 'Projeyi İncele' : 'View Project'

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-[20px] overflow-hidden border border-[#E2E8F0] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.13)] h-full"
      aria-label={`${data.title} — ${btnLabel}`}
    >
      {/* ── Üst: Proje görseli (16:9 oranı) ── */}
      <div className="relative w-full shrink-0 overflow-hidden bg-[#F1F5F9]" style={{ height: 200 }}>
        {project.image ? (
          <Image
            src={project.image}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#94A3B8] text-sm font-medium">{data.title}</span>
          </div>
        )}
      </div>

      {/* ── Alt: İçerik (beyaz, görsel yok) ── */}
      <div className="flex flex-col flex-grow p-5">
        {/* Kategori etiketi */}
        <div className="mb-3">
          <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF]">
            {category}
          </span>
        </div>

        {/* Başlık */}
        <h3 className="text-[16px] font-bold text-[#0F172A] mb-2 leading-snug">
          {data.title}
        </h3>

        {/* Kısa açıklama — max 2 satır */}
        <p className="text-[13px] text-[#64748B] leading-relaxed mb-4 line-clamp-2 flex-grow">
          {data.shortDesc}
        </p>

        {/* Teknoloji etiketleri */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-4 border-t border-[#F1F5F9]">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] transition-all duration-200 group-hover:gap-2.5">
            {btnLabel}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}
