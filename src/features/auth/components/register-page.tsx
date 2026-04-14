'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthShell } from '@/features/auth/components/auth-shell'
import { OtpModal } from '@/features/auth/components/otp-modal'
import { useRegisterForm } from '@/features/auth/hooks/use-auth-forms'
import { getRegisterContent } from '@/features/auth/services/auth-content.service'
import type { RegisterSchema } from '@/features/auth/schemas/auth.schema'

type Step = 'form' | 'otp' | 'done'

export function RegisterPage() {
  const content = getRegisterContent()
  const router = useRouter()
  const form = useRegisterForm()
  const { register, handleSubmit, formState: { errors }, getValues } = form

  const [step, setStep] = useState<Step>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [otpExpSeconds, setOtpExpSeconds] = useState(120)

  // Step 1: Đăng ký tài khoản → gửi OTP
  const onSubmit = async (values: RegisterSchema) => {
    setIsLoading(true)
    setError(null)

    try {
      // 1. Tạo tài khoản
      const regRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: values.phone, email: values.email }),
      })
      const regBody = await regRes.json()
      if (!regRes.ok || !regBody.success) {
        setError(regBody.message ?? 'Đăng ký thất bại')
        return
      }

      // 2. Gửi OTP qua email
      const otpRes = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: values.phone }),
      })
      const otpBody = await otpRes.json()
      if (!otpRes.ok || !otpBody.success) {
        setError(otpBody.message ?? 'Gửi OTP thất bại')
        return
      }

      setOtpExpSeconds(otpBody.data?.expTimeOut ?? 120)
      setStep('otp')
    } catch {
      setError('Lỗi kết nối. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  // Step 2: Xác nhận OTP → đặt mật khẩu
  const handleVerifyOtp = async (otpCode: string) => {
    const { phone, password } = getValues()
    setIsLoading(true)
    setError(null)

    try {
      // 3. Verify OTP → nhận sign_key + uid
      const verifyRes = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otpCode }),
      })
      const verifyBody = await verifyRes.json()
      if (!verifyRes.ok || !verifyBody.success) {
        setError(verifyBody.message ?? 'Mã OTP không đúng')
        return
      }

      const { signKey, uid } = verifyBody.data

      // 4. Đặt mật khẩu người dùng đã nhập
      const resetRes = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: uid, newPassword: password, signKey }),
      })
      const resetBody = await resetRes.json()
      if (!resetRes.ok || !resetBody.success) {
        setError(resetBody.message ?? 'Không thể đặt mật khẩu')
        return
      }

      // Đăng ký thành công → về trang đăng nhập
      router.push('/auth/login?registered=1')
    } catch {
      setError('Lỗi kết nối. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    const { phone } = getValues()
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    })
    const body = await res.json()
    if (!res.ok || !body.success) {
      setError(body.message ?? 'Gửi lại OTP thất bại')
    } else {
      setError(null)
      setOtpExpSeconds(body.data?.expTimeOut ?? 120)
    }
  }

  return (
    <>
      <AuthShell content={content} activeTab="register">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h1 className="font-[family-name:var(--font-playfair)] text-[36px] font-bold text-[#FFF7F2]">
            {content.title}
          </h1>
          <p className="text-[15px] text-[#A79F9A]">{content.subtitle}</p>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-medium text-[#D0C7C2]">Họ và tên</span>
            <input
              {...register('fullName')}
              className="h-[52px] rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-4 text-[15px] text-[#FFF4EF] outline-none"
            />
            {errors.fullName && (
              <span className="text-[12px] text-red-400">{errors.fullName.message}</span>
            )}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-medium text-[#D0C7C2]">Số điện thoại</span>
            <input
              {...register('phone')}
              type="tel"
              placeholder="0987654321"
              className="h-[52px] rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-4 text-[15px] text-[#FFF4EF] outline-none"
            />
            {errors.phone && (
              <span className="text-[12px] text-red-400">{errors.phone.message}</span>
            )}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-medium text-[#D0C7C2]">Email</span>
            <input
              {...register('email')}
              type="email"
              placeholder="example@gmail.com"
              className="h-[52px] rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-4 text-[15px] text-[#FFF4EF] outline-none"
            />
            {errors.email && (
              <span className="text-[12px] text-red-400">{errors.email.message}</span>
            )}
            <span className="text-[12px] text-[#A79F9A]">Mã OTP sẽ được gửi đến email này</span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-medium text-[#D0C7C2]">Mật khẩu</span>
            <input
              {...register('password')}
              type="password"
              className="h-[52px] rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-4 text-[15px] text-[#FFF4EF] outline-none"
            />
            <div className="grid grid-cols-3 gap-1">
              <div className="h-[3px] rounded-full bg-red-400/30" />
              <div className="h-[3px] rounded-full bg-amber-300/50" />
              <div className="h-[3px] rounded-full bg-emerald-400/30" />
            </div>
            {errors.password && (
              <span className="text-[12px] text-red-400">{errors.password.message}</span>
            )}
            <span className="text-[12px] text-[#FBBF24]">{content.passwordStrengthLabel}</span>
          </label>

          <label className="flex items-center gap-3 text-[13px] text-[#A79F9A]">
            <input
              {...register('agree')}
              type="checkbox"
              className="h-5 w-5 rounded border border-white/20 bg-white/5"
            />
            <span>{content.termsLabel}</span>
          </label>
          {errors.agree && (
            <span className="text-[12px] text-red-400">{errors.agree.message}</span>
          )}

          {error && (
            <p className="text-[13px] text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 flex h-[52px] items-center justify-center rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[15px] font-bold text-[#140E12] shadow-[0_8px_24px_rgba(243,198,213,0.4)] disabled:opacity-50 transition-opacity"
          >
            {isLoading ? 'Đang xử lý...' : content.submitLabel}
          </button>

          <p className="text-center text-[14px] text-[#8B837E]">
            {content.promptLabel}{' '}
            <Link href="/auth/login" className="font-semibold text-[#F6D2DB]">
              {content.promptAction}
            </Link>
          </p>
        </form>
      </AuthShell>

      {step === 'otp' && (
        <OtpModal
          phone={getValues('phone')}
          expSeconds={otpExpSeconds}
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
          onClose={() => setStep('form')}
          error={error}
          isLoading={isLoading}
        />
      )}
    </>
  )
}
