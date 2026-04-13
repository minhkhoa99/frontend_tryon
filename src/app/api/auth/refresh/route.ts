import { NextResponse } from 'next/server'
import { getRefreshToken, setAuthCookies, clearAuthCookies } from '@/lib/auth/cookies'

const GATEWAY_URL = process.env.GATEWAY_URL!

interface GatewayRefreshResponse {
  code: number
  success: boolean
  message: string
  data: {
    access_token: string
    refresh_token: string
    user_id: number
    uuid: string
  } | null
}

export async function POST() {
  const refreshToken = await getRefreshToken()

  if (!refreshToken) {
    return NextResponse.json(
      { code: 401, success: false, message: 'refresh token không tồn tại' },
      { status: 401 },
    )
  }

  let gatewayRes: Response
  try {
    gatewayRes = await fetch(`${GATEWAY_URL}/api/v1/token/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })
  } catch {
    return NextResponse.json(
      { code: 502, success: false, message: 'Không thể kết nối đến server' },
      { status: 502 },
    )
  }

  const body: GatewayRefreshResponse = await gatewayRes.json()

  if (!gatewayRes.ok || !body.success || !body.data) {
    // Refresh thất bại → xóa cả 2 cookies, buộc login lại
    const res = NextResponse.json(
      { code: 401, success: false, message: body.message },
      { status: 401 },
    )
    clearAuthCookies(res.cookies)
    return res
  }

  const { access_token, refresh_token } = body.data

  const res = NextResponse.json(
    { code: 200, success: true, message: 'ok', data: { accessToken: access_token } },
    { status: 200 },
  )

  setAuthCookies(res.cookies, access_token, refresh_token)

  return res
}
