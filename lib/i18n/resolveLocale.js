import { isEnglishPath } from '@/lib/i18n/routes'

/** Route + middleware locale bilgisinden aktif dili belirler (varsayılan: Türkçe) */
export function resolveLocale(pathname, initialLocale) {
  if (pathname && isEnglishPath(pathname)) return 'en'
  if (initialLocale === 'en' && pathname && isEnglishPath(pathname)) return 'en'
  return 'tr'
}
