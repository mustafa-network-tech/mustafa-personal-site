import Image from 'next/image'
import { Globe, ExternalLink } from 'lucide-react'

/**
 * Ana sayfa demo kartları.
 * image prop verildiğinde: arka plana görsel + şeffaf cam katmanı.
 * Verilmediğinde: mevcut telekom-glass-card stili korunur.
 */
export default function DemoProjectCard({
  title,
  description,
  tags = [],
  url,
  badge,
  ctaLabel = 'View Demo',
  typeLabel = 'Demo',
  image,
}) {
  const hasImage = !!image

  return (
    <div
      className={`group relative rounded-[18px] transition-all duration-[0.35s] ease-out h-full flex flex-col overflow-hidden ${
        hasImage
          ? 'hover:-translate-y-[6px] hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
          : 'telekom-glass-card'
      }`}
      style={!hasImage ? { padding: 30 } : {}}
    >
      {/* ── Arka plan görseli + cam / gradient overlay ── */}
      {hasImage && (
        <>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Karanlık gradient — alt taraf daha opak (okunabilirlik) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/50 to-black/80 transition-all duration-500 group-hover:from-black/45 group-hover:to-black/88" />
          {/* Cam parlama ışığı (sol üst köşe) */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
        </>
      )}

      {/* ── İçerik ── */}
      <div className="relative z-10 flex flex-col h-full" style={{ padding: hasImage ? 22 : 30 }}>
        {badge && (
          <span
            className={`inline-block text-[10px] font-medium tracking-wide mb-3 px-2.5 py-1 rounded-md ${
              hasImage
                ? 'text-white/70 border border-white/25 bg-white/10 backdrop-blur-sm'
                : 'text-[#64748B] border border-[rgba(0,0,0,0.08)] bg-[rgba(0,0,0,0.03)]'
            }`}
            style={{ letterSpacing: '0.02em' }}
          >
            {badge}
          </span>
        )}

        <div className="flex items-center justify-between mb-4">
          <div
            className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl ${
              hasImage
                ? 'bg-white/15 border border-white/25 backdrop-blur-sm'
                : 'card-icon-container'
            }`}
          >
            <Globe className="w-5 h-5 text-white" aria-hidden />
          </div>
          <span
            className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full ${
              hasImage
                ? 'text-white/85 bg-white/15 border border-white/25 backdrop-blur-sm'
                : 'card-tag'
            }`}
          >
            {typeLabel}
          </span>
        </div>

        <h3
          className={`text-[17px] font-bold mb-2 leading-tight ${
            hasImage ? 'text-white drop-shadow-md' : 'telekom-card-title text-[#1E293B]'
          }`}
        >
          {title}
        </h3>

        <p
          className={`text-sm mb-4 flex-grow ${hasImage ? 'text-white/78' : 'text-[#475569]'}`}
          style={{ lineHeight: 1.65 }}
        >
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                  hasImage
                    ? 'text-white/70 bg-white/10 border border-white/20'
                    : 'card-tag'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className={`mt-auto pt-3 ${
            hasImage ? 'border-t border-white/20' : 'border-t border-[rgba(0,0,0,0.08)]'
          }`}
        >
          <a
            href={url || '#'}
            target={url ? '_blank' : undefined}
            rel={url ? 'noopener noreferrer' : undefined}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 [&_svg]:text-current ${
              hasImage
                ? 'bg-white/20 border border-white/35 text-white backdrop-blur-sm hover:bg-white/32 hover:border-white/55 hover:shadow-[0_4px_20px_rgba(255,255,255,0.18)]'
                : 'bg-[#2563EB] border border-[#2563EB] text-white hover:bg-[#1d4ed8] hover:border-[#1d4ed8] hover:shadow-[0_0_24px_rgba(37,99,235,0.35)]'
            }`}
          >
            <ExternalLink className="w-4 h-4" aria-hidden />
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
