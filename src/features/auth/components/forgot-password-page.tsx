'use client'

import Link from 'next/link'
import { AuthShell } from '@/features/auth/components/auth-shell'
import { useForgotPasswordForm } from '@/features/auth/hooks/use-auth-forms'
import { getForgotPasswordContent } from '@/features/auth/services/auth-content.service'
import type { ForgotPasswordSchema } from '@/features/auth/schemas/auth.schema'

export function ForgotPasswordPage() {
  const content = getForgotPasswordContent()
  const form = useForgotPasswordForm()
  const { register, handleSubmit, formState: { errors } } = form

  const onSubmit = async (_values: ForgotPasswordSchema) => {
    // TODO: kết nối forgot-password API khi backend endpoint sẵn sàng
    void _values
    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  return (
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

        <button
          type="submit"
          className="mt-1 flex h-[52px] items-center justify-center rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[15px] font-bold text-[#140E12] shadow-[0_8px_24px_rgba(243,198,213,0.4)]"
        >
          {content.submitLabel}
        </button>

        <p className="text-center text-[14px] text-[#8B837E]">
          {content.promptLabel}{' '}
          <Link href="/auth/login" className="font-semibold text-[#F6D2DB]">
            {content.promptAction}
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}
