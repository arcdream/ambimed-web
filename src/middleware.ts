import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isLoginAndBookingDisabled, isBookingOrLoginPath } from '@/lib/featureFlags'

export function middleware(request: NextRequest) {
  if (!isLoginAndBookingDisabled()) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  if (pathname === '/app' || pathname === '/app/') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isBookingOrLoginPath(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/app', '/app/:path*'],
}
