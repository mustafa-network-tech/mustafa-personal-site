// middleware.js – locale header + Türkçe ana dil yönlendirmesi
import { NextResponse } from 'next/server'
import { isLocalSeoSlug } from '@/lib/localSeo/pages'
import { isEnglishPath } from '@/lib/i18n/routes'

const LOCALE_HEADER = 'x-path-locale'

export function middleware(request) {
  const pathname = request.nextUrl.pathname

  // Ana sayfa varsayılan olarak Türkçe
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/tr', request.url))
  }

  const segment = pathname.replace(/^\//, '').split('/')[0]
  let locale = isEnglishPath(pathname) ? 'en' : 'tr'
  if (segment && isLocalSeoSlug(segment)) {
    locale = 'tr'
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(LOCALE_HEADER, locale)
  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:ico|png|jpeg|jpg|webp)).*)'],
}
