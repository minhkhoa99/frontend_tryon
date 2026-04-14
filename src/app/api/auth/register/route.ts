import { NextRequest, NextResponse } from 'next/server'

const GATEWAY_URL = process.env.GATEWAY_URL!

interface GatewayRegisterResponse {
  code: number
  success: boolean
  message: string
  data: { verified: boolean } | null
}

export async function POST(req: NextRequest) {
  let phone: string
  let email: string

  try {
    const body = await req.json()
    phone = body.phone
    email = body.email
  } catch {
    return NextResponse.json(
      { code: 400, success: false, message: 'invalid request body' },
      { status: 400 },
    )
  }

  if (!phone) {
    return NextResponse.json(
      { code: 400, success: false, message: 'phone là bắt buộc' },
      { status: 400 },
    )
  }

  let gatewayRes: Response
  try {
    gatewayRes = await fetch(`${GATEWAY_URL}/api/v1/phone`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        email: email ?? '',
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

  const body: GatewayRegisterResponse = await gatewayRes.json()

  if (!gatewayRes.ok || !body.success) {
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
