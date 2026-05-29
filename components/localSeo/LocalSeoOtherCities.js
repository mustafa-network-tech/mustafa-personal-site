import Link from 'next/link'
import { getOtherCityLinks } from '@/lib/localSeo/pages'

/**
 * @param {{ currentCityKey: string, cityName: string }} props
 */
export default function LocalSeoOtherCities({ currentCityKey, cityName }) {
  const links = getOtherCityLinks(currentCityKey)
  if (!links.length) return null

  return (
    <section className="container mx-auto px-4 py-12 md:py-14 max-w-5xl border-t border-[rgba(248,250,252,0.08)]">
      <h2 className="text-lg md:text-xl font-semibold text-[#F8FAFC] mb-2">Diğer şehirler</h2>
      <p className="text-sm text-[#94A3B8] mb-6 max-w-2xl">
        {cityName} dışında farklı illerde de web tasarım ve kurumsal site hizmetleri sunuyoruz. Aşağıdan
        diğer şehir sayfalarına geçebilirsiniz.
      </p>
      <ul className="flex flex-wrap gap-2">
        {links.map((city) => (
          <li key={city.key}>
            <Link
              href={`/${city.slug}`}
              className="local-seo-city-pill text-xs font-medium text-sub hover:text-primary transition-all duration-200"
            >
              {city.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
