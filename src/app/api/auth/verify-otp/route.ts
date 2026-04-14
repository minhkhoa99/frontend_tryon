import { NextRequest, NextResponse } from 'next/server'

const GATEWAY_URL = process.env.GATEWAY_URL!

interface GatewayVerifyOtpResponse {
  code: number
  success: boolean
  message: string
  data: {
    sign_key: string
    uid: number
  } | null
}

export async function POST(req: NextRequest) {
  let phone: string
  let otp_code: string
  let device_id: string

  try {
    const body = await req.json()
    phone = body.phone
    otp_code = body.otpCode
    device_id = body.deviceId ?? crypto.randomUUID()
  } catch {
    return NextResponse.json(
      { code: 400, success: false, message: 'invalid request body' },
      { status: 400 },
    )
  }

  if (!phone || !otp_code) {
    return NextResponse.json(
      { code: 400, success: false, message: 'phone và otpCode là bắt buộc' },
      { status: 400 },
    )
  }

  let gatewayRes: Response
  try {
    gatewayRes = await fetch(`${GATEWAY_URL}/api/v1/verify_otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp_code, device_id }),
    })
  } catch {
    return NextResponse.json(
      { code: 502, success: false, message: 'Không thể kết nối đến server' },
      { status: 502 },
    )
  }

  const body: GatewayVerifyOtpResponse = await gatewayRes.json()

  if (!gatewayRes.ok || !body.success || !body.data) {
    return NextResponse.json(
      { code: gatewayRes.status, success: false, message: body.message },
      { status: gatewayRes.status },
    )
  }

  return NextResponse.json(
    {
      code: 200,
      success: true,
      message: 'ok',
      data: {
        signKey: body.data.sign_key,
        uid: body.data.uid,
      },
    },
    { status: 200 },
  )
}
