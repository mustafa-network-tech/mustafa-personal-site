import Link from 'next/link'
import { getPagesForCityKey, getPageLinkLabel } from '@/lib/localSeo/pages'

/**
 * Aynı şehirdeki diğer hizmet sayfalarına geçiş (ör. Adapazarı Web Tasarım ↔ E-Ticaret/Mağaza).
 * @param {{ cityKey: string, cityName: string, currentSlug: string }} props
 */
export default function LocalSeoCityNav({ cityKey, cityName, currentSlug }) {
  const pages = getPagesForCityKey(cityKey)
  if (pages.length <= 1) return null

  return (
    <nav
      className="border-b border-[rgba(248,250,252,0.08)] bg-[rgba(15,23,42,0.5)]"
      aria-label={`${cityName} bölgesel hizmet sayfaları`}
    >
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
          {cityName} — diğer hizmet sayfaları
        </p>
        <ul className="flex flex-wrap gap-2">
          {pages.map((p) => {
            const isCurrent = p.slug === currentSlug
            return (
              <li key={p.slug}>
                {isCurrent ? (
                  <span
                    className="inline-block text-xs font-medium px-3 py-1.5 rounded-full border border-[#4F7CFF] bg-[rgba(79,124,255,0.15)] text-[#F8FAFC]"
                    aria-current="page"
                  >
                    {getPageLinkLabel(p.slug)}
                  </span>
                ) : (
                  <Link
                    href={`/${p.slug}`}
                    className="inline-block text-xs font-medium px-3 py-1.5 rounded-full border border-[rgba(248,250,252,0.12)] text-[#CBD5E1] hover:text-[#F8FAFC] hover:border-[rgba(79,124,255,0.35)] hover:bg-[rgba(79,124,255,0.08)] transition-colors"
                  >
                    {p.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
