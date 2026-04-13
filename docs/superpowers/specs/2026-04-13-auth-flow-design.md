# Auth Flow Design — frontend_tryon

**Date:** 2026-04-13  
**Scope:** Frontend authentication flow bám theo auth_service_tryon + api-gateway  
**Status:** Approved

---

## 1. Tổng quan

Frontend (`frontend_tryon`) xác thực người dùng thông qua chuỗi:

```
Browser → Next.js Route Handler → API Gateway (:8080) → auth_service_tryon
```

Token được lưu trong **HttpOnly Cookie** — không bao giờ lộ ra JavaScript phía browser.  
Mọi HTTP call từ browser đều dùng **`fetch` thuần** — không dùng axios hay thư viện HTTP khác.

---

## 2. Kiến trúc tổng thể

```
┌──────────────────────────────────────────────────────────────┐
│                         Browser                               │
│  - Gửi form (phone + password)                               │
│  - Cookie tự động gắn vào mọi request (HttpOnly)             │
└──────────────────┬───────────────────────────────────────────┘
                   │ fetch /api/auth/*
                   ▼
┌──────────────────────────────────────────────────────────────┐
│                  Next.js (App Router)                         │
│                                                               │
│  Route Handlers (src/app/api/auth/*)                         │
│  ├── POST /api/auth/login      ← proxy → gateway             │
│  ├── POST /api/auth/logout     ← proxy → gateway             │
│  └── POST /api/auth/refresh    ← proxy → gateway             │
│                                                               │
│  Middleware (src/middleware.ts)                               │
│  └── Kiểm tra access_token cookie → redirect /auth/login     │
│                                                               │
│  Auth Store (Zustand)                                         │
│  └── { user_id, uuid, isLoggedIn } — NON-sensitive only      │
└──────────────────┬───────────────────────────────────────────┘
                   │ fetch + Authorization: Bearer <access_token>
                   ▼
┌──────────────────────────────────────────────────────────────┐
│                  API Gateway (:8080)                          │
│  /auth/**  → identity-service  (NO JWT required)             │
│  /orders/** → commerce-service (JWT required)                 │
│  /cart/**  → cart-service      (JWT required)                 │
│  ...                                                          │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│              auth_service_tryon (identity-service)           │
│  POST /api/v2/login                                          │
│  POST /api/v2/token/refresh                                  │
│  POST /api/v2/logout                                         │
└──────────────────────────────────────────────────────────────┘
```

### Cookies

| Cookie | Value | Flags |
|--------|-------|-------|
| `access_token` | JWT RS256 (15 phút) | HttpOnly, Secure, SameSite=Lax, Path=/ |
| `refresh_token` | JWT RS256 (7 ngày) | HttpOnly, Secure, SameSite=Lax, Path=/api/auth/refresh |

> `refresh_token` chỉ gửi tới `/api/auth/refresh` — không bị lộ sang các request khác.

---

## 3. Luồng chi tiết

### 3.1 Login

```
Browser                    Next.js Route Handler           API Gateway → auth_service
   │                              │                              │
   │-- POST /api/auth/login ----→│                              │
   │   { phone, password }        │                              │
   │                              │-- POST /gateway/auth/api/v2/login
   │                              │   { username: phone,         │
   │                              │     password,                │
   │                              │     metadata: {              │
   │                              │       device_id: uuid(),     │  ← fresh per login
   │                              │       device_os: "web",      │
   │                              │       device_name: "Browser",│
   │                              │       os_version: "web",     │
   │                              │       app_version: "1.0.0" }}│
   │                              │←── { access_token,           │
   │                              │      refresh_token,          │
   │                              │      user_id, uuid }         │
   │                              │                              │
   │                              │ Set-Cookie: access_token     │
   │                              │ Set-Cookie: refresh_token    │
   │←── 200 { user_id, uuid } ───│                              │
   │    (token KHÔNG trả về body) │                              │
```

### 3.2 Gọi API protected

```
Browser                    Next.js Route Handler           API Gateway
   │                              │                              │
   │-- GET /api/orders ----------→│                              │
   │   (cookie tự gắn)            │                              │
   │                              │ Đọc access_token từ cookie() │
   │                              │-- GET /gateway/orders -----→│
   │                              │   Authorization: Bearer <at> │
   │                              │←── order data               │
   │←── order data ──────────────│                              │
```

### 3.3 Silent Refresh

Xảy ra **trong Route Handler** (server-side) — browser hoàn toàn transparent:

```
Route Handler → fetch Gateway → 401 "token is expired"
    ↓
Route Handler gọi POST /api/auth/refresh (nội bộ)
    ↓
    ├── Thành công → rotate cả 2 cookies → retry request gốc
    └── Thất bại   → xóa cả 2 cookies → return 401 → browser redirect /auth/login
```

### 3.4 Logout

```
Browser                    Next.js Route Handler           API Gateway
   │                              │                              │
   │-- POST /api/auth/logout ---→│                              │
   │   (cả 2 cookies tự gắn)     │                              │
   │                              │-- POST /gateway/auth/api/v2/logout
   │                              │   Authorization: Bearer <at> │
   │                              │   body: { refresh_token }    │
   │                              │←── 200 OK                   │
   │                              │ Clear cả 2 cookies           │
   │←── 200 OK ──────────────────│                              │
   │ redirect → /auth/login       │                              │
```

### 3.5 Middleware protection

```
Request tới /profile, /checkout, /orders, /wishlist, /try-on
        ↓
middleware.ts: đọc access_token cookie
        ↓
    Có cookie?
    ├── Có  → next()
    └── Không → redirect /auth/login?redirect=<original-path>
```

> Middleware chỉ kiểm tra **sự tồn tại** của cookie, không verify JWT (tránh load RSA key trong Edge Runtime).

---

## 4. Error Handling

### 4.1 Mapping lỗi từ Gateway

| HTTP Code | Message | Frontend action |
|-----------|---------|-----------------|
| `401` `"token is expired"` | Access token hết hạn | Silent refresh → retry |
| `401` `"token has been revoked"` | Bị revoke (logout thiết bị khác) | Clear store → redirect login |
| `401` `"invalid token"` | Token corrupt | Clear store → redirect login |
| `429` | Rate limit | Toast "Thử lại sau X giây" |
| `5xx` | Gateway/upstream down | Toast lỗi chung |

### 4.2 `fetchWithRefresh` utility

```ts
// Dùng trong mọi Route Handler gọi Gateway cho protected routes
async function fetchWithRefresh(url: string, options: RequestInit, cookieStore) {
  const accessToken = cookieStore.get('access_token')?.value

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    },
  })

  if (res.status === 401) {
    const body = await res.json()
    if (body.message === 'token is expired') {
      const refreshed = await attemptRefresh(cookieStore)
      if (refreshed) {
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${refreshed.accessToken}`,
          },
        })
      }
    }
    throw new AuthError(body.message)
  }

  return res
}
```

---

## 5. Cấu trúc file

### 5.1 Files mới

```
src/
├── app/
│   └── api/
│       └── auth/
│           ├── login/route.ts          # POST /api/auth/login
│           ├── logout/route.ts         # POST /api/auth/logout
│           └── refresh/route.ts        # POST /api/auth/refresh
│
├── middleware.ts                        # Route protection
│
└── features/
    └── auth/
        ├── api/
        │   └── auth.api.ts             # fetch() wrappers → /api/auth/*
        ├── store/
        │   └── auth.store.ts           # Zustand: { userId, uuid, isLoggedIn }
        └── hooks/
            └── use-auth.ts             # useLogin, useLogout, useAuthState
```

### 5.2 Files cần sửa

| File | Thay đổi |
|------|----------|
| `features/auth/schemas/auth.schema.ts` | Đổi `email` → `phone` (validate SĐT VN) |
| `features/auth/hooks/use-auth-forms.ts` | Đổi default value + field name |
| `features/auth/components/login-page.tsx` | Đổi input phone, kết nối `useAuth()` |
| `features/auth/components/register-page.tsx` | Đổi phone, kết nối API |
| `features/auth/components/forgot-password-page.tsx` | Đổi phone |
| `next.config.ts` | Không cần thay đổi |

### 5.3 Middleware config

```ts
// src/middleware.ts
export const config = {
  matcher: [
    '/profile/:path*',
    '/checkout/:path*',
    '/orders/:path*',
    '/wishlist/:path*',
    '/try-on/:path*',
  ],
}
```

---

## 6. Schema — phone validation

```ts
// Validate SĐT Việt Nam (đầu số 03x, 05x, 07x, 08x, 09x)
const phoneSchema = z
  .string()
  .min(9, "Số điện thoại không hợp lệ")
  .max(11, "Số điện thoại không hợp lệ")
  .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ")

export const loginSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
})

export const registerSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: phoneSchema,
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  agree: z.literal(true, { error: "Bạn cần đồng ý với điều khoản" }),
})

export const forgotPasswordSchema = z.object({
  phone: phoneSchema,
})
```

---

## 7. Auth Store (Zustand)

```ts
interface AuthState {
  userId: number | null
  uuid: string | null
  isLoggedIn: boolean
  setAuth: (userId: number, uuid: string) => void
  clearAuth: () => void
}
// Token KHÔNG lưu trong store — chỉ tồn tại trong HttpOnly Cookie
```

---

## 8. Client-side hook

```ts
// features/auth/hooks/use-auth.ts
// Chỉ gọi /api/auth/* (Next.js Route Handler)
// Tuyệt đối không gọi thẳng Gateway từ browser
// Dùng fetch thuần — không axios

export function useAuth() {
  const { setAuth, clearAuth } = useAuthStore()
  const router = useRouter()
  const searchParams = useSearchParams()

  async function login(phone: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message)
    }
    const { userId, uuid } = await res.json()
    setAuth(userId, uuid)
    const redirect = searchParams.get('redirect') ?? '/'
    router.push(redirect)
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    clearAuth()
    router.push('/auth/login')
  }

  return { login, logout }
}
```

---

## 9. Biến môi trường

```env
# .env.local (server-side only — không prefix NEXT_PUBLIC_)
GATEWAY_URL=http://localhost:8080
```

> Browser không bao giờ biết `GATEWAY_URL`. Mọi request từ browser đều đến `/api/auth/*` của Next.js.

---

## 10. Quy tắc bất biến

1. **Tuyệt đối không dùng axios** — chỉ dùng `fetch` hoặc `http` thuần
2. **Token không bao giờ trong JS browser** — chỉ trong HttpOnly Cookie
3. **Browser không gọi thẳng Gateway** — luôn qua Next.js Route Handler
4. **Middleware chỉ kiểm tra sự tồn tại cookie** — không verify JWT (Edge Runtime)
5. **Silent refresh xảy ra server-side** — trong Route Handler, transparent với browser
6. **`GATEWAY_URL` là server-side env** — không `NEXT_PUBLIC_` prefix
