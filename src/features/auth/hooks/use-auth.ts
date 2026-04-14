'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/features/auth/store/auth.store'

type OAuthProvider = 'google' | 'facebook'

type AuthSuccessResponse = {
  success: true
  data: {
    userId: number
    uuid: string
  }
}

type AuthErrorResponse = {
  success: false
  message?: string
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  let res: Response

  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'same-origin',
    })
  } catch {
    throw new Error('Lỗi kết nối. Vui lòng thử lại.')
  }

  const response = (await res.json()) as T | AuthErrorResponse

  if (!res.ok) {
    throw new Error((response as AuthErrorResponse).message ?? 'Đăng nhập thất bại')
  }

  return response as T
}

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
      const body = await postJson<AuthSuccessResponse>('/api/auth/login', { phone, password })

      const { userId: uid, uuid: userUuid } = body.data
      setAuth(uid, userUuid)

      const redirect = searchParams.get('redirect') ?? '/'
      router.push(redirect)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại')
    } finally {
      setIsLoading(false)
    }
  }

  async function loginWithOAuth(
    provider: OAuthProvider,
    providerAccessToken: string,
    providerTokenType: 'access_token' | 'id_token',
  ): Promise<void> {
    setIsLoading(true)
    setError(null)

    try {
      const body = await postJson<AuthSuccessResponse>('/api/auth/oauth', {
        provider_name: provider,
        provider_access_token: providerAccessToken,
        provider_token_type: providerTokenType,
      })

      const { userId: uid, uuid: userUuid } = body.data
      setAuth(uid, userUuid)

      const redirect = searchParams.get('redirect') ?? '/'
      router.push(redirect)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại')
    } finally {
      setIsLoading(false)
    }
  }

  async function logout(): Promise<void> {
    setIsLoading(true)
    try {
      await postJson('/api/auth/logout', {})
    } finally {
      clearAuth()
      setIsLoading(false)
      router.push('/auth/login')
    }
  }

  return { login, loginWithOAuth, logout, isLoading, error, isLoggedIn, userId, uuid }
}
