'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { CARD_DATA, SECTIONS } from './showcaseProjects'

const CARD_LOGO_WATERMARK = '/showcase/mk-logo.png'

const TYPE_COLORS = {
  showcase_type_platform: 'text-[#a78bfa]',      // purple
  showcase_type_system: 'text-[#60a5fa]',        // blue
  showcase_type_website: 'text-[#94a3b8]',      // gray
  showcase_type_corporate: 'text-[#2dd4bf]',   // turkuaz
  showcase_type_app: 'text-[#fbbf24]',         // amber (app)
}
function getTypeColor(typeKey) {
  return TYPE_COLORS[typeKey] || 'text-[#94A3B8]'
}

function Card({ title, titleKey, typeKey, url, descKey }) {
  const { t } = useLanguage()
  const displayTitle = titleKey ? (t[titleKey] || title) : title
  const typeColor = getTypeColor(typeKey)
  const description = descKey ? t[descKey] : null
  const ariaLabel = `${displayTitle} — ${t[typeKey] || ''}. ${description ? `${description} ` : ''}${t.showcase_view_site} (${t.showcase_cards_heading})`
  return (
    <Link
      href={url || '#'}
      target={url ? '_blank' : undefined}
      rel={url ? 'noopener noreferrer' : undefined}
      aria-label={url ? `${ariaLabel}. Opens in a new tab` : ariaLabel}
      className="group relative block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1e293b]/80 p-4 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-[rgba(148,163,184,0.35)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.35),0_0_0_1px_rgba(148,163,184,0.15)] hover:bg-[#1e293b]"
    >
      {/* Watermark */}
      <div
        className="absolute bottom-0 right-0 w-[35%] min-h-[40%] flex items-end justify-end pointer-events-none select-none"
        style={{ opacity: 0.06 }}
        aria-hidden
      >
        <img
          src={CARD_LOGO_WATERMARK}
          alt=""
          className="object-contain max-w-full max-h-full"
          style={{ filter: 'blur(0.5px)' }}
        />
      </div>
      {/* İçerik */}
      <div className="relative z-10">
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${typeColor}`}>
          {t[typeKey] || typeKey}
        </span>
        <h3 className="mt-1 text-sm font-semibold text-[#F8FAFC] group-hover:text-white transition-colors line-clamp-2">
          {displayTitle}
        </h3>
        {description && (
          <p className="mt-1.5 text-[11px] leading-snug text-[#94A3B8] line-clamp-2">
            {description}
          </p>
        )}
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#CBD5E1] group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5">
          {t.showcase_view_site} →
        </span>
      </div>
    </Link>
  )
}

export default function ShowcaseCards() {
  const { t } = useLanguage()
  return (
    <section className="relative py-16 px-4">
      <div className="container mx-auto space-y-14">
        <header className="text-center mb-10 group/header">
          <h2 className="text-[32px] font-bold text-[#F8FAFC] mb-2.5 flex items-center justify-center gap-2 cursor-default">
            <span className="text-[28px] opacity-90" aria-hidden>⚡</span>
            <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-[#94A3B8] after:w-0 after:transition-[width] after:duration-500 after:ease-out group-hover/header:after:w-full">
              {t.showcase_cards_heading}
            </span>
          </h2>
          <div className="mt-1 h-px w-12 bg-[rgba(255,255,255,0.2)] mx-auto overflow-hidden transition-all duration-500 ease-out group-hover/header:w-16 group-hover/header:bg-[rgba(255,255,255,0.3)]" />
          <p className="mt-2 text-base text-[#94A3B8] max-w-[700px] mx-auto mb-10 transition-colors hover:text-[#CBD5E1] cursor-default" style={{ opacity: 0.75 }}>
            {t.showcase_cards_slogan}
          </p>
        </header>
        {SECTIONS.map((section) => (
          <div key={section.titleKey} id={section.sectionId} className="group/section scroll-mt-24">
            <header className="mb-6">
              <h2 className="group/title text-[20px] font-semibold tracking-[1px] text-[#F8FAFC] flex items-center gap-2 cursor-default w-fit">
                <span className="opacity-80 text-lg" aria-hidden>{section.icon}</span>
                <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-[#94A3B8] after:w-0 after:transition-[width] after:duration-500 after:ease-out group-hover/title:after:w-full">
                  {t[section.titleKey]}
                </span>
              </h2>
              <div className="mt-1 h-px w-12 overflow-hidden transition-[width] duration-500 ease-out group-hover/section:w-14 bg-[rgba(255,255,255,0.2)] group-hover/section:bg-[rgba(255,255,255,0.35)]" />
              <p className="mt-2 text-[14px] text-[#94A3B8] transition-colors hover:text-[#94A3B8] hover:opacity-100 cursor-default" style={{ opacity: 0.7 }}>
                {t[section.descKey]}
              </p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {section.cardTitles.map((title) => {
                const data = CARD_DATA[title]
                if (!data) return null
                return <Card key={title} title={title} titleKey={data.titleKey} typeKey={data.typeKey} url={data.url} descKey={data.descKey} />
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
