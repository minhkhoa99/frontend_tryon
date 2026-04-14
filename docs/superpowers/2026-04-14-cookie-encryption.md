# Cookie Encryption Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Encrypt JWT tokens with AES-256-GCM before storing in HttpOnly cookies, so the raw JWT payload is never visible in browser DevTools.

**Architecture:** Add `encrypt`/`decrypt` helpers using Node.js built-in `crypto` module inside `src/lib/auth/cookies.ts`. `setAuthCookies` encrypts before writing; `getAccessToken`/`getRefreshToken` decrypt before returning. All other files (`fetch-with-refresh.ts`, route handlers, middleware) remain unchanged — they continue to receive/send raw JWTs as before.

**Tech Stack:** Next.js 14 App Router, Node.js `crypto` (built-in, no new dependency), TypeScript

---

## File Map

| Action | File | Change |
|--------|------|--------|
| Modify | `src/lib/auth/cookies.ts` | Add `encrypt`/`decrypt`, wrap set/get |
| Modify | `.env.local` | Add `COOKIE_ENCRYPTION_KEY` |
| Modify | `.env` | Add `COOKIE_ENCRYPTION_KEY` placeholder |
| Create | `src/lib/auth/__tests__/cookies.encryption.test.ts` | Unit tests for encrypt/decrypt roundtrip |

---

### Task 1: Add `COOKIE_ENCRYPTION_KEY` to environment files

**Files:**
- Modify: `.env.local`
- Modify: `.env`

- [ ] **Step 1: Generate a 32-byte hex key**

Run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Expected output: a 64-character hex string, e.g. `a3f9b2c1d4e5f6...` (will differ each run)

- [ ] **Step 2: Add key to `.env.local`**

Open `E:/try_on/frontend_cms_tryon/.env.local` and append:
```
# 32-byte hex key for AES-256-GCM cookie encryption
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
COOKIE_ENCRYPTION_KEY=<paste-generated-key-here>
```

Replace `<paste-generated-key-here>` with the actual key from Step 1.

- [ ] **Step 3: Add placeholder to `.env`**

Open `E:/try_on/frontend_cms_tryon/.env` and append:
```
# 32-byte hex key for AES-256-GCM cookie encryption (required)
COOKIE_ENCRYPTION_KEY=replace_with_32_byte_hex_key
```

- [ ] **Step 4: Commit**

```bash
cd E:/try_on/frontend_cms_tryon
git add .env
git commit -m "chore: add COOKIE_ENCRYPTION_KEY placeholder to env"
```

Note: do NOT commit `.env.local` (it contains the real key and should be in `.gitignore`).

---

### Task 2: Write failing tests for encrypt/decrypt

**Files:**
- Create: `src/lib/auth/__tests__/cookies.encryption.test.ts`

- [ ] **Step 1: Create test directory and file**

```bash
mkdir -p "E:/try_on/frontend_cms_tryon/src/lib/auth/__tests__"
```

- [ ] **Step 2: Write the failing tests**

Create `src/lib/auth/__tests__/cookies.encryption.test.ts`:

```typescript
/**
 * Tests for AES-256-GCM encrypt/decrypt helpers in cookies.ts
 * These are internal helpers — tested directly via module internals.
 */

// Set required env var before importing module
process.env.COOKIE_ENCRYPTION_KEY = 'a'.repeat(64) // 32 bytes as hex

// We'll export encrypt/decrypt from cookies.ts for testing
import { encryptToken, decryptToken } from '../cookies'

describe('encryptToken / decryptToken', () => {
  const sampleJwt =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjZhYzgxZTczIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.signature'

  it('encrypt returns a non-empty string different from input', () => {
    const encrypted = encryptToken(sampleJwt)
    expect(encrypted).toBeDefined()
    expect(encrypted).not.toBe(sampleJwt)
    expect(encrypted.length).toBeGreaterThan(0)
  })

  it('encrypted value does not contain the original JWT', () => {
    const encrypted = encryptToken(sampleJwt)
    expect(encrypted).not.toContain('eyJhbGci')
    expect(encrypted).not.toContain('admin_id')
  })

  it('decrypt(encrypt(token)) returns the original token', () => {
    const encrypted = encryptToken(sampleJwt)
    const decrypted = decryptToken(encrypted)
    expect(decrypted).toBe(sampleJwt)
  })

  it('each encryption produces a different ciphertext (random IV)', () => {
    const enc1 = encryptToken(sampleJwt)
    const enc2 = encryptToken(sampleJwt)
    expect(enc1).not.toBe(enc2)
  })

  it('decryptToken returns undefined for tampered ciphertext', () => {
    const encrypted = encryptToken(sampleJwt)
    const tampered = encrypted.slice(0, -4) + 'XXXX'
    const result = decryptToken(tampered)
    expect(result).toBeUndefined()
  })

  it('decryptToken returns undefined for random garbage', () => {
    const result = decryptToken('notvalidbase64::::garbage')
    expect(result).toBeUndefined()
  })

  it('decryptToken returns undefined for empty string', () => {
    const result = decryptToken('')
    expect(result).toBeUndefined()
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
cd E:/try_on/frontend_cms_tryon
npx jest src/lib/auth/__tests__/cookies.encryption.test.ts --no-coverage
```

Expected: FAIL — `encryptToken`/`decryptToken` are not exported yet.

- [ ] **Step 4: Commit failing tests**

```bash
git add src/lib/auth/__tests__/cookies.encryption.test.ts
git commit -m "test: add failing tests for cookie AES-256-GCM encryption"
```

---

### Task 3: Implement encrypt/decrypt in `cookies.ts`

**Files:**
- Modify: `src/lib/auth/cookies.ts`

- [ ] **Step 1: Replace `cookies.ts` with the full implementation**

Open `src/lib/auth/cookies.ts` and replace the entire file content with:

```typescript
import { cookies } from 'next/headers'
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'
import type { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'

export const ACCESS_TOKEN_COOKIE = 'cms_access_token'
export const REFRESH_TOKEN_COOKIE = 'cms_refresh_token'

// TTL khớp với identity-service CMS tokens: access=15m, refresh=7d
const ACCESS_MAX_AGE = 15 * 60            // 15 phút (giây)
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60  // 7 ngày (giây)

const COOKIE_BASE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
}

// ---------------------------------------------------------------------------
// AES-256-GCM helpers
// ---------------------------------------------------------------------------

function getEncryptionKey(): Buffer {
  const hex = process.env.COOKIE_ENCRYPTION_KEY
  if (!hex || hex.length !== 64) {
    throw new Error(
      'COOKIE_ENCRYPTION_KEY must be a 64-character hex string (32 bytes). ' +
      'Generate with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"',
    )
  }
  return Buffer.from(hex, 'hex')
}

/**
 * Encrypt a JWT string using AES-256-GCM.
 * Returns a base64url string in the format: <iv>:<authTag>:<ciphertext>
 */
export function encryptToken(plaintext: string): string {
  const key = getEncryptionKey()
  const iv = randomBytes(12) // 96-bit IV recommended for GCM
  const cipher = createCipheriv('aes-256-gcm', key, iv)

  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ])
  const authTag = cipher.getAuthTag()

  return [
    iv.toString('base64url'),
    authTag.toString('base64url'),
    encrypted.toString('base64url'),
  ].join(':')
}

/**
 * Decrypt a token produced by encryptToken.
 * Returns the original JWT string, or undefined if decryption fails
 * (tampered data, wrong key, malformed input).
 */
export function decryptToken(ciphertext: string): string | undefined {
  if (!ciphertext) return undefined
  try {
    const parts = ciphertext.split(':')
    if (parts.length !== 3) return undefined

    const [ivB64, authTagB64, encryptedB64] = parts
    const key = getEncryptionKey()
    const iv = Buffer.from(ivB64, 'base64url')
    const authTag = Buffer.from(authTagB64, 'base64url')
    const encryptedData = Buffer.from(encryptedB64, 'base64url')

    const decipher = createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(authTag)

    return decipher.update(encryptedData) + decipher.final('utf8')
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
```

- [ ] **Step 2: Run the tests to verify they pass**

```bash
cd E:/try_on/frontend_cms_tryon
npx jest src/lib/auth/__tests__/cookies.encryption.test.ts --no-coverage
```

Expected output:
```
PASS src/lib/auth/__tests__/cookies.encryption.test.ts
  encryptToken / decryptToken
    ✓ encrypt returns a non-empty string different from input
    ✓ encrypted value does not contain the original JWT
    ✓ decrypt(encrypt(token)) returns the original token
    ✓ each encryption produces a different ciphertext (random IV)
    ✓ decryptToken returns undefined for tampered ciphertext
    ✓ decryptToken returns undefined for random garbage
    ✓ decryptToken returns undefined for empty string

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
```

- [ ] **Step 3: Verify TypeScript compiles without errors**

```bash
cd E:/try_on/frontend_cms_tryon
npx tsc --noEmit
```

Expected: no output (zero errors).

- [ ] **Step 4: Commit**

```bash
git add src/lib/auth/cookies.ts
git commit -m "feat: encrypt JWT tokens with AES-256-GCM before storing in cookies"
```

---

### Task 4: Smoke test the full login flow

**Files:** no code changes — manual verification only

- [ ] **Step 1: Start the dev server**

```bash
cd E:/try_on/frontend_cms_tryon
npm run dev
```

- [ ] **Step 2: Open browser DevTools → Network tab**

Navigate to `http://localhost:3000/login`

- [ ] **Step 3: Login with valid credentials**

Submit the login form. In the Network tab, find the `POST /api/auth/login` request.

- [ ] **Step 4: Inspect Set-Cookie headers**

Click the request → Headers → Response Headers → look for `set-cookie`.

**Expected (before fix):**
```
cms_access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6...
```

**Expected (after fix):**
```
cms_access_token=a1b2c3d4:e5f6g7h8:i9j0k1l2m3n4...
```
→ No `eyJhbGci`, no readable payload, no `admin_id` or `email` visible.

- [ ] **Step 5: Verify CMS loads correctly after login**

After login, navigate around the CMS. If pages load and API calls succeed, decryption is working correctly end-to-end.

- [ ] **Step 6: Verify logout works**

Click logout. Confirm redirect to `/login` and that protected pages redirect back.

- [ ] **Step 7: Final commit**

```bash
cd E:/try_on/frontend_cms_tryon
git add .
git commit -m "chore: verify cookie encryption smoke test passed"
```
