import { NextRequest, NextResponse } from 'next/server'

const GATEWAY_URL = process.env.GATEWAY_URL!

interface GatewayResetPasswordResponse {
  code: number
  success: boolean
  message: string
  data: {
    status: string
    uuid: string
  } | null
}

export async function POST(req: NextRequest) {
  let userId: number
  let newPassword: string
  let signKey: string

  try {
    const body = await req.json()
    userId = body.userId
    newPassword = body.newPassword
    signKey = body.signKey
  } catch {
    return NextResponse.json(
      { code: 400, success: false, message: 'invalid request body' },
      { status: 400 },
    )
  }

  if (userId == null || !newPassword || !signKey) {
    return NextResponse.json(
      { code: 400, success: false, message: 'userId, newPassword và signKey là bắt buộc' },
      { status: 400 },
    )
  }

  let gatewayRes: Response
  try {
    gatewayRes = await fetch(`${GATEWAY_URL}/api/v1/reset_password/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_password: newPassword, sign_key: signKey }),
    })
  } catch {
    return NextResponse.json(
      { code: 502, success: false, message: 'Không thể kết nối đến server' },
      { status: 502 },
    )
  }

  const body: GatewayResetPasswordResponse = await gatewayRes.json()

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
