import { NextRequest, NextResponse } from 'next/server'
import { setAuthCookies } from '@/lib/auth/cookies'

const GATEWAY_URL = process.env.GATEWAY_URL!

interface GatewayLoginResponse {
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

export async function POST(req: NextRequest) {
  const { phone, password } = await req.json()

  if (!phone || !password) {
    return NextResponse.json(
      { code: 400, success: false, message: 'phone và password là bắt buộc' },
      { status: 400 },
    )
  }

  let gatewayRes: Response
  try {
    gatewayRes = await fetch(`${GATEWAY_URL}/api/v1/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: phone,
        password,
        metadata: {
          device_id: crypto.randomUUID(), // fresh per login (spec rule)
          device_os: 'web',
          device_name: 'Browser',
          os_version: 'web',
          app_version: '1.0.0',
        },
      }),
    })
  } catch {
    return NextResponse.json(
      { code: 502, success: false, message: 'Không thể kết nối đến server' },
      { status: 502 },
    )
  }

  const body: GatewayLoginResponse = await gatewayRes.json()

  if (!gatewayRes.ok || !body.success || !body.data) {
    return NextResponse.json(
      { code: gatewayRes.status, success: false, message: body.message },
      { status: gatewayRes.status },
    )
  }

  const { access_token, refresh_token, user_id, uuid } = body.data

  // Tạo response — token đặt vào HttpOnly Cookie, KHÔNG trả về body
  const res = NextResponse.json(
    { code: 200, success: true, message: 'ok', data: { userId: user_id, uuid } },
    { status: 200 },
  )

  setAuthCookies(res.cookies, access_token, refresh_token)

  return res
}
