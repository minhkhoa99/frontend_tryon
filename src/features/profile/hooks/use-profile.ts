'use client'

import { useEffect, useState } from 'react'
import type { UserProfile } from '@/app/api/profile/route'

type ProfileState =
  | { status: 'loading' }
  | { status: 'success'; data: UserProfile }
  | { status: 'error'; message: string }

export function useProfile() {
  const [state, setState] = useState<ProfileState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile', { credentials: 'same-origin' })
        const body = await res.json()

        if (cancelled) return

        if (!res.ok || !body.success) {
          setState({ status: 'error', message: body.message ?? 'Không thể tải hồ sơ' })
          return
        }

        setState({ status: 'success', data: body.data as UserProfile })
      } catch {
        if (!cancelled) setState({ status: 'error', message: 'Lỗi kết nối' })
      }
    }

    void fetchProfile()
    return () => { cancelled = true }
  }, [])

  return state
}
