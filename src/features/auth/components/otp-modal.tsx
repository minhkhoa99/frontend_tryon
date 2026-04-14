'use client'

import { useEffect, useRef, useState } from 'react'

interface OtpModalProps {
  phone: string
  expSeconds: number
  onVerify: (otpCode: string) => Promise<void>
  onResend: () => Promise<void>
  onClose: () => void
  error?: string | null
  isLoading?: boolean
}

export function OtpModal({
  phone,
  expSeconds,
  onVerify,
  onResend,
  onClose,
  error,
  isLoading,
}: OtpModalProps) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''))
  const [countdown, setCountdown] = useState(expSeconds)
  const [resendLoading, setResendLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Đếm ngược thời gian OTP
  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  function handleChange(index: number, value: string) {
    const char = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = char
    setDigits(next)
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!text) return
    e.preventDefault()
    const next = Array(6).fill('')
    text.split('').forEach((c, i) => { next[i] = c })
    setDigits(next)
    inputRefs.current[Math.min(text.length, 5)]?.focus()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const code = digits.join('')
    if (code.length !== 6) return
    await onVerify(code)
  }

  async function handleResend() {
    setResendLoading(true)
    try {
      await onResend()
      setCountdown(expSeconds)
      setDigits(Array(6).fill(''))
    } finally {
      setResendLoading(false)
    }
  }

  const maskedPhone = phone.replace(/(\d{4})\d{3}(\d{3})/, '$1***$2')

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
          Nhập mã OTP
        </h2>
        <p className="mb-6 text-[14px] text-[#A79F9A]">
          Mã 6 số đã gửi qua email đến số điện thoại <span className="text-[#F6D2DB]">{maskedPhone}</span>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="h-[56px] w-[48px] rounded-[12px] border border-white/10 bg-white/5 text-center text-[22px] font-bold text-[#FFF7F2] outline-none focus:border-[#F6D2DB]/50 focus:bg-white/10 transition-colors"
              />
            ))}
          </div>

          {error && (
            <p className="text-center text-[13px] text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || digits.join('').length !== 6}
            className="flex h-[52px] items-center justify-center rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[15px] font-bold text-[#140E12] shadow-[0_8px_24px_rgba(243,198,213,0.4)] disabled:opacity-50 transition-opacity"
          >
            {isLoading ? 'Đang xác nhận...' : 'Xác nhận'}
          </button>

          <div className="text-center text-[13px] text-[#8B837E]">
            {countdown > 0 ? (
              <span>Gửi lại sau <span className="text-[#F6D2DB]">{countdown}s</span></span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading}
                className="font-semibold text-[#F6D2DB] hover:underline disabled:opacity-50"
              >
                {resendLoading ? 'Đang gửi...' : 'Gửi lại OTP'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
