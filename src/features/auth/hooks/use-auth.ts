'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/features/auth/store/auth.store'

export function useAuth() {
  const { setAuth, clearAuth, isLoggedIn, userId, uuid } = useAuthStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function login(phone: string, password: string): Promise<void> {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      })

      const body = await res.json()

      if (!res.ok || !body.success) {
        setError(body.message ?? 'Đăng nhập thất bại')
        return
      }

      const { userId: uid, uuid: userUuid } = body.data
      setAuth(uid, userUuid)

      const redirect = searchParams.get('redirect') ?? '/'
      router.push(redirect)
    } catch {
      setError('Lỗi kết nối. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  async function logout(): Promise<void> {
    setIsLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      clearAuth()
      setIsLoading(false)
      router.push('/auth/login')
    }
  }

  return { login, logout, isLoading, error, isLoggedIn, userId, uuid }
}
