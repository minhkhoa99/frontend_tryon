import { NextResponse } from 'next/server'
import { getAccessToken, getRefreshToken, clearAuthCookies } from '@/lib/auth/cookies'

const GATEWAY_URL = process.env.GATEWAY_URL!

export async function POST() {
  const accessToken = await getAccessToken()
  const refreshToken = await getRefreshToken()

  // Dù gateway có lỗi hay không, vẫn xóa cookie phía client
  if (accessToken && refreshToken) {
    try {
      await fetch(`${GATEWAY_URL}/api/v1/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })
    } catch {
      // Non-fatal: cookies vẫn bị xóa dù gateway không phản hồi
    }
  }

  const res = NextResponse.json(
    { code: 200, success: true, message: 'logged out' },
    { status: 200 },
  )
  clearAuthCookies(res.cookies)

  return res
}
