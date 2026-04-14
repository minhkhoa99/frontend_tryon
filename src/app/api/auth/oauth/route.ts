import { NextRequest, NextResponse } from 'next/server'
import { setAuthCookies } from '@/lib/auth/cookies'

const GATEWAY_URL = process.env.GATEWAY_URL!

interface GatewayOAuthResponse {
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

type OAuthRequestBody = {
  provider_name?: string
  provider_access_token?: string
  provider_token_type?: string
}

export async function POST(req: NextRequest) {
  let requestBody: OAuthRequestBody

  try {
    requestBody = await req.json()
  } catch {
    return NextResponse.json(
      { code: 400, success: false, message: 'invalid request body' },
      { status: 400 },
    )
  }

  const providerName = requestBody.provider_name
  const providerAccessToken = requestBody.provider_access_token
  const providerTokenType = requestBody.provider_token_type

  if (!providerName || !providerAccessToken || !providerTokenType) {
    return NextResponse.json(
      { code: 400, success: false, message: 'provider_name, provider_access_token và provider_token_type là bắt buộc' },
      { status: 400 },
    )
  }

  let gatewayRes: Response

  try {
    gatewayRes = await fetch(`${GATEWAY_URL}/api/v1/login/oauth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': req.headers.get('user-agent') ?? 'frontend_tryon',
      },
      body: JSON.stringify({
        provider_name: providerName,
        provider_access_token: providerAccessToken,
        provider_token_type: providerTokenType,
        metadata: {
          device_id: crypto.randomUUID(),
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

  try {
    const body = await gatewayRes.json() as GatewayOAuthResponse

    if (!gatewayRes.ok || !body.success || !body.data) {
      return NextResponse.json(
        { code: gatewayRes.status, success: false, message: body.message },
        { status: gatewayRes.status },
      )
    }

    const { access_token, refresh_token, user_id, uuid } = body.data

    const res = NextResponse.json(
      { code: 200, success: true, message: 'ok', data: { userId: user_id, uuid } },
      { status: 200 },
    )

    setAuthCookies(res.cookies, access_token, refresh_token)

    return res
  } catch {
    return NextResponse.json(
      { code: 502, success: false, message: 'Gateway trả về dữ liệu không hợp lệ' },
      { status: 502 },
    )
  }
}
