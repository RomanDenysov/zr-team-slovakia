import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale } from './i18n/config'

/**
 * The default locale is served without a prefix, so `/schedule` is rewritten
 * to `/sk/schedule` internally while `/en/schedule` passes straight through.
 * `/sk/*` is redirected to the bare path by `next.config.mjs`, which runs
 * before middleware.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split('/')[1]

  if (isLocale(firstSegment)) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Everything except the Payload admin/API, Next internals, uploaded media
  // and any path that looks like a file (robots.txt, favicon.ico, …).
  matcher: ['/((?!admin|api|_next|media|.*\\.).*)'],
}
