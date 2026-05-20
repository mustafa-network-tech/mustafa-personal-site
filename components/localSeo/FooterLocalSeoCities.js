import Link from 'next/link'
import { FOOTER_SEO_CITIES } from '@/lib/localSeo/pages'
import { getPrimarySlugForCity, getServiceFooterLinks } from '@/lib/localSeo/serviceCategories'

/**
 * Üst: yalnızca şehir pill’leri. Alt: yalnızca hizmet paketi pill’leri (il adı yok).
 * @param {{ citiesTitle?: string, servicesTitle?: string }} props
 */
export default function FooterLocalSeoCities({
  citiesTitle = 'Şehirler',
  servicesTitle = 'Hizmetler',
}) {
  const serviceLinks = getServiceFooterLinks()

  return (
    <div className="mt-8 pt-6 border-t border-divider/80 space-y-6">
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
        <h3 className="text-primary text-sm font-semibold mb-3 uppercase tracking-wider">{servicesTitle}</h3>
        <ul className="flex flex-wrap gap-2">
          {serviceLinks.map((service) => (
            <li key={service.key}>
              <Link
                href={`/${service.slug}`}
                className="local-seo-service-pill text-xs font-medium text-sub hover:text-primary transition-all duration-200"
              >
                {service.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
