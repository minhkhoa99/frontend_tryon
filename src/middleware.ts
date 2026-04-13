import { NextRequest, NextResponse } from 'next/server'
import { ACCESS_TOKEN_COOKIE } from '@/lib/auth/cookies'

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value

  if (!accessToken) {
    const loginUrl = new URL('/auth/login', req.url)
    loginUrl.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Middleware chỉ kiểm tra sự TỒN TẠI của cookie — không verify JWT
// (Edge Runtime không load RSA key; verify thực sự xảy ra tại Gateway)
export const config = {
  matcher: [
    '/profile/:path*',
    '/checkout/:path*',
    '/orders/:path*',
    '/wishlist/:path*',
    '/try-on/:path*',
  ],
}
