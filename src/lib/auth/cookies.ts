import { cookies } from 'next/headers'
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'
import type { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'

export const ACCESS_TOKEN_COOKIE = 'sid'
export const REFRESH_TOKEN_COOKIE = 'rid'

// TTL khớp với auth_service_tryon: access=15m, refresh=7d
const ACCESS_MAX_AGE = 15 * 60          // 15 phút (giây)
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60 // 7 ngày (giây)

const COOKIE_BASE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
}

// ---------------------------------------------------------------------------
// AES-256-GCM helpers
// ---------------------------------------------------------------------------

// Evaluated once at module load — throws immediately if misconfigured
const ENCRYPTION_KEY: Buffer = (() => {
  const hex = process.env.COOKIE_ENCRYPTION_KEY
  if (!hex || hex.length !== 64 || !/^[0-9a-fA-F]{64}$/.test(hex)) {
    throw new Error(
      'COOKIE_ENCRYPTION_KEY must be a 64-character hex string (32 bytes). ' +
      "Generate with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"",
    )
  }
  return Buffer.from(hex, 'hex')
})()

// Fixed-length offsets in the blob (base64url, no separators):
// [0..16)  = IV        (12 bytes → 16 base64url chars)
// [16..38) = authTag   (16 bytes → 22 base64url chars)
// [38..)   = ciphertext
const IV_LEN = 16
const TAG_LEN = 22
const HEADER_LEN = IV_LEN + TAG_LEN // 38

/**
 * Encrypt a JWT string using AES-256-GCM.
 * Returns a compact base64url blob: <iv(16)><authTag(22)><ciphertext>
 */
export function encryptToken(plaintext: string): string {
  const iv = randomBytes(12) // 96-bit IV recommended for GCM
  const cipher = createCipheriv('aes-256-gcm', ENCRYPTION_KEY, iv)

  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ])
  const authTag = cipher.getAuthTag()

  return (
    iv.toString('base64url') +
    authTag.toString('base64url') +
    encrypted.toString('base64url')
  )
}

/**
 * Decrypt a token produced by encryptToken.
 * Returns the original JWT string, or undefined if decryption fails
 * (tampered data, wrong key, malformed input).
 */
export function decryptToken(blob: string): string | undefined {
  if (!blob || blob.length <= HEADER_LEN) return undefined
  try {
    const iv = Buffer.from(blob.slice(0, IV_LEN), 'base64url')
    const authTag = Buffer.from(blob.slice(IV_LEN, HEADER_LEN), 'base64url')
    const encryptedData = Buffer.from(blob.slice(HEADER_LEN), 'base64url')

    if (iv.length !== 12 || authTag.length !== 16) return undefined

    const decipher = createDecipheriv('aes-256-gcm', ENCRYPTION_KEY, iv)
    decipher.setAuthTag(authTag)

    return Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ]).toString('utf8')
  } catch {
    return undefined
  }
}

// ---------------------------------------------------------------------------
// Cookie helpers (public API — unchanged signatures)
// ---------------------------------------------------------------------------

/** Set cả 2 cookies sau login/refresh thành công */
export function setAuthCookies(
  resCookies: ResponseCookies,
  accessToken: string,
  refreshToken: string,
) {
  resCookies.set(ACCESS_TOKEN_COOKIE, encryptToken(accessToken), {
    ...COOKIE_BASE,
    path: '/',
    maxAge: ACCESS_MAX_AGE,
  })
  resCookies.set(REFRESH_TOKEN_COOKIE, encryptToken(refreshToken), {
    ...COOKIE_BASE,
    path: '/api/auth/refresh',
    maxAge: REFRESH_MAX_AGE,
  })
}

/** Xóa cả 2 cookies khi logout hoặc refresh thất bại */
export function clearAuthCookies(resCookies: ResponseCookies) {
  resCookies.set(ACCESS_TOKEN_COOKIE, '', { ...COOKIE_BASE, path: '/', maxAge: 0 })
  resCookies.set(REFRESH_TOKEN_COOKIE, '', { ...COOKIE_BASE, path: '/api/auth/refresh', maxAge: 0 })
}

/** Đọc và decrypt access token từ request cookies */
export async function getAccessToken(): Promise<string | undefined> {
  const store = await cookies()
  const encrypted = store.get(ACCESS_TOKEN_COOKIE)?.value
  if (!encrypted) return undefined
  return decryptToken(encrypted)
}

/** Đọc và decrypt refresh token từ request cookies */
export async function getRefreshToken(): Promise<string | undefined> {
  const store = await cookies()
  const encrypted = store.get(REFRESH_TOKEN_COOKIE)?.value
  if (!encrypted) return undefined
  return decryptToken(encrypted)
}
