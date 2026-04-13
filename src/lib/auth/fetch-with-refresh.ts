import { cookies } from 'next/headers'
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, setAuthCookies, clearAuthCookies } from '@/lib/auth/cookies'
import type { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'

const GATEWAY_URL = process.env.GATEWAY_URL!

interface RefreshResult {
  accessToken: string
  refreshToken: string
}

/** Cố gắng refresh token. Trả về token mới hoặc null nếu thất bại. */
async function attemptRefresh(resCookies: ResponseCookies): Promise<RefreshResult | null> {
  const store = await cookies()
  const refreshToken = store.get(REFRESH_TOKEN_COOKIE)?.value
  if (!refreshToken) return null

  try {
    const res = await fetch(`${GATEWAY_URL}/api/v1/token/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!res.ok) {
      clearAuthCookies(resCookies)
      return null
    }

    const body = await res.json()
    if (!body.success || !body.data) {
      clearAuthCookies(resCookies)
      return null
    }

    const { access_token, refresh_token } = body.data
    setAuthCookies(resCookies, access_token, refresh_token)
    return { accessToken: access_token, refreshToken: refresh_token }
  } catch {
    clearAuthCookies(resCookies)
    return null
  }
}

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly status: number = 401,
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

/**
 * Gọi Gateway với access token từ cookie.
 * Nếu nhận 401 "token is expired" → tự động refresh rồi retry 1 lần.
 * Nếu refresh thất bại hoặc token bị revoke → throw AuthError.
 *
 * Dùng trong các Route Handlers cần gọi protected endpoints của Gateway.
 */
export async function fetchWithRefresh(
  url: string,
  options: RequestInit,
  resCookies: ResponseCookies,
): Promise<Response> {
  const store = await cookies()
  const accessToken = store.get(ACCESS_TOKEN_COOKIE)?.value

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  })

  if (res.status === 401) {
    const body = await res.json()

    // Chỉ silent refresh khi token expired — không retry khi revoked/invalid
    if (body.message === 'token is expired' || body.message === 'invalid or expired token') {
      const refreshed = await attemptRefresh(resCookies)
      if (refreshed) {
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${refreshed.accessToken}`,
          },
        })
      }
    }

    throw new AuthError(body.message ?? 'unauthorized', 401)
  }

  return res
}
