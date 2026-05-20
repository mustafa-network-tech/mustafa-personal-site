import Link from 'next/link'
import { FOOTER_SEO_CITIES, getPagesForCityKey, getStoreFocusedPages } from '@/lib/localSeo/pages'

/**
 * @param {{ title?: string, storeTitle?: string }} props
 */
export default function FooterLocalSeoCities({
  title = 'Bölgesel web hizmetleri',
  storeTitle = 'E-ticaret & mağaza sayfaları',
}) {
  const storePages = getStoreFocusedPages()

  return (
    <div className="mt-8 pt-6 border-t border-divider/80 space-y-8">
      <nav aria-label={title}>
        <h3 className="text-primary text-sm font-semibold mb-4 uppercase tracking-wider">{title}</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FOOTER_SEO_CITIES.map((city) => {
            const pages = getPagesForCityKey(city.key)
            return (
              <li key={city.key}>
                <span className="block text-xs font-semibold text-primary mb-2">{city.label}</span>
                <ul className="flex flex-col gap-1.5">
                  {pages.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/${p.slug}`}
                        className="text-xs text-sub hover:text-primary transition-colors leading-snug"
                      >
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </nav>

      {storePages.length > 0 && (
        <nav aria-label={storeTitle} className="pt-6 border-t border-divider/60">
          <h3 className="text-primary text-sm font-semibold mb-3 uppercase tracking-wider">{storeTitle}</h3>
          <ul className="flex flex-wrap gap-2">
            {storePages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="local-seo-city-pill text-xs font-medium text-sub hover:text-primary transition-all duration-200"
                >
                  {p.cityName} — {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
