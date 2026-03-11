// middleware.js – set locale header for SEO (html lang) and language sync
import { NextResponse } from 'next/server'

const LOCALE_HEADER = 'x-path-locale'

export function middleware(request) {
  const pathname = request.nextUrl.pathname
  const locale = pathname.startsWith('/tr') ? 'tr' : 'en'
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(LOCALE_HEADER, locale)
  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:ico|png|jpeg|jpg|webp)).*)'],
}
