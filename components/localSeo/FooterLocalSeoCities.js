import Link from 'next/link'
import { FOOTER_SEO_CITIES } from '@/lib/localSeo/pages'
import { getPagesGroupedByService, getPrimarySlugForCity } from '@/lib/localSeo/serviceCategories'

/**
 * @param {{ citiesTitle?: string, servicesTitle?: string }} props
 */
export default function FooterLocalSeoCities({
  citiesTitle = 'Şehirler',
  servicesTitle = 'Hizmetler',
}) {
  const serviceGroups = getPagesGroupedByService()

  return (
    <div className="mt-8 pt-6 border-t border-divider/80 space-y-8">
      <nav aria-label={citiesTitle}>
        <h3 className="text-primary text-sm font-semibold mb-3 uppercase tracking-wider">{citiesTitle}</h3>
        <ul className="flex flex-wrap gap-2">
          {FOOTER_SEO_CITIES.map((city) => {
            const slug = getPrimarySlugForCity(city.key)
            if (!slug) return null
            return (
              <li key={city.key}>
                <Link
                  href={`/${slug}`}
                  className="local-seo-city-pill text-xs font-medium text-sub hover:text-primary transition-all duration-200"
                >
                  {city.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <nav aria-label={servicesTitle} className="pt-6 border-t border-divider/60">
        <h3 className="text-primary text-sm font-semibold mb-4 uppercase tracking-wider">{servicesTitle}</h3>
        <ul className="space-y-4">
          {serviceGroups.map((group) => (
            <li key={group.key} className="flex flex-wrap items-center gap-x-2 gap-y-2">
              <span className="local-seo-service-badge text-xs font-semibold shrink-0">{group.label}</span>
              <ul className="flex flex-wrap gap-2">
                {group.pages.map((p) => (
                  <li key={`${group.key}-${p.slug}`}>
                    <Link
                      href={`/${p.slug}`}
                      className="local-seo-city-pill text-xs font-medium text-sub hover:text-primary transition-all duration-200"
                    >
                      {p.cityName}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
