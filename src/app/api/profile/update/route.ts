import { NextRequest, NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/auth/cookies'

const GATEWAY_URL = process.env.GATEWAY_URL!

interface UpdateProfileBody {
  full_name?: string
  email?: string
  address?: string
}

interface GatewayUpdateProfileResponse {
  code: number
  success: boolean
  message: string
  data: {
    user_id: number
    uuid: string
    full_name: string
    email: string | null
    address: string
  } | null
}

export async function PUT(req: NextRequest) {
  const accessToken = await getAccessToken()
  if (!accessToken) {
    return NextResponse.json(
      { code: 401, success: false, message: 'Chưa đăng nhập' },
      { status: 401 },
    )
  }

  let body: UpdateProfileBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { code: 400, success: false, message: 'invalid request body' },
      { status: 400 },
    )
  }

  let gatewayRes: Response
  try {
    gatewayRes = await fetch(`${GATEWAY_URL}/api/v1/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        full_name: body.full_name ?? '',
        email: body.email ?? '',
        address: body.address ?? '',
      }),
    })
  } catch {
    return NextResponse.json(
      { code: 502, success: false, message: 'Không thể kết nối đến server' },
      { status: 502 },
    )
  }

  const result: GatewayUpdateProfileResponse = await gatewayRes.json()

  if (!gatewayRes.ok || !result.success) {
    return NextResponse.json(
      { code: gatewayRes.status, success: false, message: result.message },
      { status: gatewayRes.status },
    )
  }

  return NextResponse.json(
    { code: 200, success: true, message: 'ok', data: result.data },
    { status: 200 },
  )
}
