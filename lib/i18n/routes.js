/** İngilizce kök sayfalar (/tr ve /en hariç) */
const EN_PAGE_PREFIXES = ['/contact', '/services', '/projects', '/vitrin']

export function isEnglishPath(pathname) {
  if (!pathname) return false
  if (pathname.startsWith('/en')) return true
  if (pathname.startsWith('/tr')) return false
  return EN_PAGE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

export function isTurkishPath(pathname) {
  if (!pathname) return true
  if (pathname.startsWith('/tr')) return true
  return !isEnglishPath(pathname)
}

export function homeHrefFor(pathname) {
  return isEnglishPath(pathname) ? '/en' : '/tr'
}

export function vitrinHrefFor(pathname) {
  return isEnglishPath(pathname) ? '/vitrin' : '/tr/vitrin'
}

export function toTurkishPath(pathname) {
  if (!pathname || pathname.startsWith('/tr')) return pathname || '/tr'
  if (pathname.startsWith('/en')) {
    const rest = pathname.slice(3)
    return rest ? `/tr${rest}` : '/tr'
  }
  if (pathname === '/') return '/tr'
  return `/tr${pathname}`
}

export function toEnglishPath(pathname) {
  if (!pathname) return '/en'
  if (pathname.startsWith('/tr')) {
    const rest = pathname.slice(3)
    return rest || '/en'
  }
  if (pathname === '/') return '/en'
  return pathname
}
