'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { AuthShell } from '@/features/auth/components/auth-shell'
import { useLoginForm } from '@/features/auth/hooks/use-auth-forms'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { getLoginContent } from '@/features/auth/services/auth-content.service'
import type { LoginSchema } from '@/features/auth/schemas/auth.schema'

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID

export function LoginPage() {
  const content = getLoginContent()
  const form = useLoginForm()
  const { register, handleSubmit, formState: { errors } } = form
  const { login, loginWithOAuth, isLoading, error } = useAuth()
  const [isGoogleSdkLoaded, setIsGoogleSdkLoaded] = useState(false)

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !isGoogleSdkLoaded || !window.google?.accounts.oauth2) {
      return
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'openid email profile',
      callback: (response) => {
        if (!response.access_token) {
          return
        }

        void loginWithOAuth('google', response.access_token, 'access_token')
      },
      error_callback: () => {
        // Provider SDK error is surfaced through the common auth error state.
      },
    })

    window.__tryOnGoogleTokenClient = tokenClient
  }, [isGoogleSdkLoaded, loginWithOAuth])

  const onSubmit = async (values: LoginSchema) => {
    await login(values.phone, values.password)
  }

  const handleGoogleLogin = () => {
    window.__tryOnGoogleTokenClient?.requestAccessToken()
  }

  const handleFacebookLogin = () => {
    if (!window.FB) {
      return
    }

    window.FB.login((response) => {
      const accessToken = response.authResponse?.accessToken
      if (!accessToken) {
        return
      }

      void loginWithOAuth('facebook', accessToken, 'access_token')
    }, { scope: 'public_profile,email' })
  }

  const handleSocialLogin = (providerId: string) => {
    if (providerId === 'google') {
      handleGoogleLogin()
      return
    }

    if (providerId === 'facebook') {
      handleFacebookLogin()
    }
  }

  return (
    <AuthShell content={content} activeTab="login">
      {GOOGLE_CLIENT_ID ? (
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
          onLoad={() => setIsGoogleSdkLoaded(true)}
        />
      ) : null}
      {FACEBOOK_APP_ID ? (
        <Script
          id="facebook-sdk"
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (!window.FB || !FACEBOOK_APP_ID) {
              return
            }

            window.FB.init({
              appId: FACEBOOK_APP_ID,
              cookie: false,
              xfbml: false,
              version: 'v22.0',
            })
          }}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1 className="font-[family-name:var(--font-playfair)] text-[34px] font-bold text-[#FFF7F2]">
          {content.title}
        </h1>
        <p className="text-[14px] leading-[1.5] text-[#A79F9A]">{content.subtitle}</p>

        <div className="mt-2 flex flex-col gap-3">
          <p className="text-[13px] text-[#6B6560]">{content.socialIntro}</p>
          <div className="grid grid-cols-2 gap-3">
            {content.providers?.map((provider) => (
              <button
                key={provider.id}
                type="button"
                onClick={() => handleSocialLogin(provider.id)}
                disabled={isLoading}
                className="flex h-12 items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-white/[0.05] text-[14px] font-medium text-[#E0D8D4]"
              >
                <span className="text-white">{provider.icon}</span>
                <span>{provider.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="my-1 h-px w-full bg-white/[0.08]" />

        {/* Error message từ server */}
        {error && (
          <p className="rounded-[8px] bg-red-500/10 px-3 py-2 text-[13px] text-red-400">
            {error}
          </p>
        )}

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

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium text-[#D0C7C2]">Mật khẩu</span>
          <input
            {...register('password')}
            type="password"
            className="h-[52px] rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-4 text-[15px] text-[#FFF4EF] outline-none"
          />
          {errors.password && (
            <span className="text-[12px] text-red-400">{errors.password.message}</span>
          )}
        </label>

        <Link href="/auth/forgot-password" className="text-right text-[14px] font-medium text-[#D7AFC0]">
          {content.forgotLabel}
        </Link>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-1 flex h-[52px] items-center justify-center rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[15px] font-bold text-[#140E12] shadow-[0_8px_24px_rgba(243,198,213,0.4)] disabled:opacity-60"
        >
          {isLoading ? 'Đang đăng nhập...' : content.submitLabel}
        </button>

        <p className="text-center text-[14px] text-[#8B837E]">
          {content.promptLabel}{' '}
          <Link href="/auth/register" className="font-semibold text-[#F6D2DB]">
            {content.promptAction}
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}
