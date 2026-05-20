'use client'

import { useRouter } from 'next/navigation'
import { FOOTER_SEO_CITIES, getSlugsForCityKey } from '@/lib/localSeo/pages'

/**
 * @param {{ title?: string }} props
 */
export default function FooterLocalSeoCities({ title = 'Bölgesel web hizmetleri' }) {
  const router = useRouter()

  const handleCityClick = (cityKey) => {
    const slugs = getSlugsForCityKey(cityKey)
    if (!slugs.length) return
    const slug = slugs[Math.floor(Math.random() * slugs.length)]
    router.push(`/${slug}`)
  }

  return (
    <nav className="mt-8 pt-6 border-t border-divider/80" aria-label={title}>
      <h3 className="text-primary text-sm font-semibold mb-3 uppercase tracking-wider">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {FOOTER_SEO_CITIES.map((city) => (
          <li key={city.key}>
            <button
              type="button"
              onClick={() => handleCityClick(city.key)}
              className="local-seo-city-pill text-xs font-medium text-sub hover:text-primary transition-all duration-200"
            >
              {city.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
