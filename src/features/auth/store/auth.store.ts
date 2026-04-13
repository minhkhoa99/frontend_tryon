import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  userId: number | null
  uuid: string | null
  isLoggedIn: boolean
}

interface AuthActions {
  setAuth: (userId: number, uuid: string) => void
  clearAuth: () => void
}

// persist lưu vào localStorage để giữ state qua F5
// Token KHÔNG lưu ở đây — token chỉ tồn tại trong HttpOnly Cookie
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      userId: null,
      uuid: null,
      isLoggedIn: false,

      setAuth: (userId, uuid) =>
        set({ userId, uuid, isLoggedIn: true }),

      clearAuth: () =>
        set({ userId: null, uuid: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-store', // localStorage key
      partialize: (state) => ({
        userId: state.userId,
        uuid: state.uuid,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
)
