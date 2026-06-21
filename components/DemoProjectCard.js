import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

/**
 * Demo proje kartı.
 * Üst alan: proje görseli (16:9 oranı, object-cover).
 * Alt alan: beyaz içerik bölümü — görsel ile metin asla üst üste gelmez.
 */
export default function DemoProjectCard({
  title,
  description,
  tags = [],
  url,
  ctaLabel = 'View Demo',
  typeLabel = 'Demo',
  image,
}) {
  return (
    <div className="group flex flex-col rounded-[20px] overflow-hidden border border-[#E2E8F0] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.13)] h-full">

      {/* ── Üst: Proje görseli ── */}
      <div className="relative w-full shrink-0 overflow-hidden bg-[#F1F5F9]" style={{ height: 180 }}>
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#94A3B8] text-sm font-medium">{title}</span>
          </div>
        )}
      </div>

      {/* ── Alt: İçerik alanı (saf beyaz, görsel yok) ── */}
      <div className="flex flex-col flex-grow p-5">

        {/* Kategori etiketi */}
        <div className="mb-3">
          <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF]">
            {typeLabel}
          </span>
        </div>

        {/* Başlık */}
        <h3 className="text-[16px] font-bold text-[#0F172A] mb-2 leading-snug">
          {title}
        </h3>

        {/* Açıklama */}
        <p className="text-[13px] text-[#64748B] leading-relaxed mb-4 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Teknoloji etiketleri */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Buton */}
        <div className="mt-auto pt-4 border-t border-[#F1F5F9]">
          <a
            href={url || '#'}
            target={url ? '_blank' : undefined}
            rel={url ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-semibold bg-[#2563EB] text-white border border-[#2563EB] transition-all duration-300 hover:bg-[#1d4ed8] hover:border-[#1d4ed8] hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)] hover:-translate-y-0.5"
          >
            <ExternalLink className="w-3.5 h-3.5" aria-hidden />
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
