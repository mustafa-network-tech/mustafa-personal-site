// middleware.js – locale header + Türkçe ana dil yönlendirmesi
import { NextResponse } from 'next/server'
import { REMOVED_ROOT_SLUGS, REMOVED_TR_SLUGS, REMOVED_PREFIXES } from '@/lib/removedRoutes'
import { isEnglishPath } from '@/lib/i18n/routes'

const LOCALE_HEADER = 'x-path-locale'

export function middleware(request) {
  const pathname = request.nextUrl.pathname

  // Ana sayfa varsayılan olarak Türkçe (kalıcı, 308)
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/tr', request.url), 308)
  }

  // Kaldırılan eski ticari sayfalar: karşılığı yoksa 410 (Gone)
  const clean = pathname.replace(/\/$/, '')
  const parts = clean.replace(/^\//, '').split('/')
  const removed =
    REMOVED_PREFIXES.some((p) => clean === p || clean.startsWith(p + '/')) ||
    (parts.length === 1 && REMOVED_ROOT_SLUGS.includes(parts[0])) ||
    (parts.length === 2 && parts[0] === 'tr' && (REMOVED_TR_SLUGS.includes(parts[1]) || REMOVED_ROOT_SLUGS.includes(parts[1])))
  if (removed) {
    return new NextResponse('410 Gone: bu sayfa kalıcı olarak kaldırıldı.', { status: 410, headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex' } })
  }

  const locale = isEnglishPath(pathname) ? 'en' : 'tr'

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(LOCALE_HEADER, locale)
  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:ico|png|jpeg|jpg|webp)).*)'],
}
