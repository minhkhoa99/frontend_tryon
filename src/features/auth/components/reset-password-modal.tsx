'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema, type ResetPasswordSchema } from '@/features/auth/schemas/auth.schema'

interface ResetPasswordModalProps {
  onSubmit: (newPassword: string) => Promise<void>
  onClose: () => void
  error?: string | null
  isLoading?: boolean
}

export function ResetPasswordModal({ onSubmit, onClose, error, isLoading }: ResetPasswordModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
    mode: 'onBlur',
  })

  async function onFormSubmit(values: ResetPasswordSchema) {
    await onSubmit(values.newPassword)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-[380px] rounded-[20px] border border-white/10 bg-[#1A1118] p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="mb-4 text-[#A79F9A] hover:text-[#FFF7F2] transition-colors"
        >
          ← Quay lại
        </button>

        <h2 className="mb-1 font-[family-name:var(--font-playfair)] text-[26px] font-bold text-[#FFF7F2]">
          Đặt mật khẩu mới
        </h2>
        <p className="mb-6 text-[14px] text-[#A79F9A]">
          Nhập mật khẩu mới cho tài khoản của bạn
        </p>

        <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-medium text-[#D0C7C2]">Mật khẩu mới</span>
            <input
              {...register('newPassword')}
              type="password"
              className="h-[52px] rounded-[12px] border border-white/10 bg-white/5 px-4 text-[15px] text-[#FFF4EF] outline-none focus:border-[#F6D2DB]/50 transition-colors"
            />
            {errors.newPassword && (
              <span className="text-[12px] text-red-400">{errors.newPassword.message}</span>
            )}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-medium text-[#D0C7C2]">Xác nhận mật khẩu</span>
            <input
              {...register('confirmPassword')}
              type="password"
              className="h-[52px] rounded-[12px] border border-white/10 bg-white/5 px-4 text-[15px] text-[#FFF4EF] outline-none focus:border-[#F6D2DB]/50 transition-colors"
            />
            {errors.confirmPassword && (
              <span className="text-[12px] text-red-400">{errors.confirmPassword.message}</span>
            )}
          </label>

          {error && (
            <p className="text-[13px] text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex h-[52px] items-center justify-center rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[15px] font-bold text-[#140E12] shadow-[0_8px_24px_rgba(243,198,213,0.4)] disabled:opacity-50 transition-opacity"
          >
            {isLoading ? 'Đang đặt lại...' : 'Xác nhận'}
          </button>
        </form>
      </div>
    </div>
  )
}
