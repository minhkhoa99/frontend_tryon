import { cookies } from 'next/headers'
import type { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'

export const ACCESS_TOKEN_COOKIE = 'access_token'
export const REFRESH_TOKEN_COOKIE = 'refresh_token'

// TTL khớp với auth_service_tryon: access=15m, refresh=7d
const ACCESS_MAX_AGE = 15 * 60          // 15 phút (giây)
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60 // 7 ngày (giây)

const COOKIE_BASE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
}

/** Set cả 2 cookies sau login/refresh thành công */
export function setAuthCookies(
  resCookies: ResponseCookies,
  accessToken: string,
  refreshToken: string,
) {
  resCookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
    ...COOKIE_BASE,
    path: '/',
    maxAge: ACCESS_MAX_AGE,
  })
  resCookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    ...COOKIE_BASE,
    path: '/api/auth/refresh', // chỉ gửi khi gọi refresh endpoint
    maxAge: REFRESH_MAX_AGE,
  })
}

/** Xóa cả 2 cookies khi logout hoặc refresh thất bại */
export function clearAuthCookies(resCookies: ResponseCookies) {
  resCookies.set(ACCESS_TOKEN_COOKIE, '', { ...COOKIE_BASE, path: '/', maxAge: 0 })
  resCookies.set(REFRESH_TOKEN_COOKIE, '', { ...COOKIE_BASE, path: '/api/auth/refresh', maxAge: 0 })
}

/** Đọc access token từ request cookies (dùng trong Route Handlers + Middleware) */
export async function getAccessToken(): Promise<string | undefined> {
  const store = await cookies()
  return store.get(ACCESS_TOKEN_COOKIE)?.value
}

/** Đọc refresh token từ request cookies (chỉ dùng trong /api/auth/refresh) */
export async function getRefreshToken(): Promise<string | undefined> {
  const store = await cookies()
  return store.get(REFRESH_TOKEN_COOKIE)?.value
}
