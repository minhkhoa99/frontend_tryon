import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/auth/cookies'

const GATEWAY_URL = process.env.GATEWAY_URL!

export interface UserProfile {
  user_id: number
  uuid: string
  phone: string
  email: string | null
  full_name: string
  address: string
  phone_verified: boolean
  status: string
  created_at: string
  updated_at: string
}

interface GatewayProfileResponse {
  code: number
  success: boolean
  message: string
  data: UserProfile | null
}

export async function GET() {
  const accessToken = await getAccessToken()

  if (!accessToken) {
    return NextResponse.json(
      { code: 401, success: false, message: 'Chưa đăng nhập' },
      { status: 401 },
    )
  }

  let gatewayRes: Response
  try {
    gatewayRes = await fetch(`${GATEWAY_URL}/api/v1/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    })
  } catch {
    return NextResponse.json(
      { code: 502, success: false, message: 'Không thể kết nối đến server' },
      { status: 502 },
    )
  }

  const body: GatewayProfileResponse = await gatewayRes.json()

  if (!gatewayRes.ok || !body.success || !body.data) {
    return NextResponse.json(
      { code: gatewayRes.status, success: false, message: body.message },
      { status: gatewayRes.status },
    )
  }

  return NextResponse.json(
    { code: 200, success: true, message: 'ok', data: body.data },
    { status: 200 },
  )
}
