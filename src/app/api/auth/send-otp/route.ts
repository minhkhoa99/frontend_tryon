import { NextRequest, NextResponse } from 'next/server'

const GATEWAY_URL = process.env.GATEWAY_URL!

interface GatewaySendOtpResponse {
  code: number
  success: boolean
  message: string
  data: {
    phone: string
    exp_time_out: number
    sys_time: number
    expired_at: number
  } | null
}

export async function POST(req: NextRequest) {
  let phone: string
  let otp_provider: string

  try {
    const body = await req.json()
    phone = body.phone
    // Mặc định dùng email (gmail), không hỗ trợ sms/zalo
    otp_provider = 'email'
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
    gatewayRes = await fetch(`${GATEWAY_URL}/api/v1/send_otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp_provider }),
    })
  } catch {
    return NextResponse.json(
      { code: 502, success: false, message: 'Không thể kết nối đến server' },
      { status: 502 },
    )
  }

  const body: GatewaySendOtpResponse = await gatewayRes.json()

  if (!gatewayRes.ok || !body.success) {
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
        expTimeOut: body.data?.exp_time_out,
        expiredAt: body.data?.expired_at,
      },
    },
    { status: 200 },
  )
}
