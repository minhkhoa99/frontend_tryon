'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthShell } from '@/features/auth/components/auth-shell'
import { OtpModal } from '@/features/auth/components/otp-modal'
import { ResetPasswordModal } from '@/features/auth/components/reset-password-modal'
import { useForgotPasswordForm } from '@/features/auth/hooks/use-auth-forms'
import { getForgotPasswordContent } from '@/features/auth/services/auth-content.service'
import type { ForgotPasswordSchema } from '@/features/auth/schemas/auth.schema'

type Step = 'form' | 'otp' | 'reset'

export function ForgotPasswordPage() {
  const content = getForgotPasswordContent()
  const router = useRouter()
  const form = useForgotPasswordForm()
  const { register, handleSubmit, formState: { errors }, getValues } = form

  const [step, setStep] = useState<Step>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [otpExpSeconds, setOtpExpSeconds] = useState(120)
  // Lưu sign_key + uid sau khi verify OTP để dùng ở bước reset
  const [resetData, setResetData] = useState<{ signKey: string; uid: number } | null>(null)

  // Step 1: Gửi OTP qua email
  const onSubmit = async (values: ForgotPasswordSchema) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: values.phone }),
      })
      const body = await res.json()
      if (!res.ok || !body.success) {
        setError(body.message ?? 'Gửi OTP thất bại')
        return
      }

      setOtpExpSeconds(body.data?.expTimeOut ?? 120)
      setStep('otp')
    } catch {
      setError('Lỗi kết nối. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  // Step 2: Xác nhận OTP → nhận sign_key
  const handleVerifyOtp = async (otpCode: string) => {
    const { phone } = getValues()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otpCode }),
      })
      const body = await res.json()
      if (!res.ok || !body.success) {
        setError(body.message ?? 'Mã OTP không đúng')
        return
      }

      setResetData({ signKey: body.data.signKey, uid: body.data.uid })
      setStep('reset')
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

  // Step 3: Đặt mật khẩu mới
  const handleResetPassword = async (newPassword: string) => {
    if (!resetData) return
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: resetData.uid,
          newPassword,
          signKey: resetData.signKey,
        }),
      })
      const body = await res.json()
      if (!res.ok || !body.success) {
        setError(body.message ?? 'Đặt lại mật khẩu thất bại')
        return
      }

      router.push('/auth/login?reset=1')
    } catch {
      setError('Lỗi kết nối. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AuthShell content={content} activeTab="forgot">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h1 className="font-[family-name:var(--font-playfair)] text-[34px] font-bold text-[#FFF7F2]">
            {content.title}
          </h1>
          <p className="text-[14px] leading-[1.5] text-[#A79F9A]">{content.subtitle}</p>

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

          <p className="text-[13px] text-[#A79F9A]">
            Mã OTP sẽ được gửi đến email liên kết với số điện thoại này
          </p>

          {error && (
            <p className="text-[13px] text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 flex h-[52px] items-center justify-center rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[15px] font-bold text-[#140E12] shadow-[0_8px_24px_rgba(243,198,213,0.4)] disabled:opacity-50 transition-opacity"
          >
            {isLoading ? 'Đang gửi...' : content.submitLabel}
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

      {step === 'reset' && (
        <ResetPasswordModal
          onSubmit={handleResetPassword}
          onClose={() => setStep('otp')}
          error={error}
          isLoading={isLoading}
        />
      )}
    </>
  )
}
