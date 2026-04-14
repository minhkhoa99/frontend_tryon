import type { ForgotPasswordContent, LoginContent, RegisterContent } from '@/features/auth/types/auth.types'

const tabs = [
  { id: 'login', label: 'Sign In', href: '/auth/login' },
  { id: 'register', label: 'Register', href: '/auth/register' },
  { id: 'forgot', label: 'Reset', href: '/auth/forgot-password' },
] as const

const providers = [
  { id: 'google', label: 'Google', icon: 'G' },
  { id: 'facebook', label: 'Facebook', icon: 'f' },
] as const

export function getLoginContent(): LoginContent {
  return {
    title: 'Welcome Back',
    subtitle: 'Sign in securely to access your saved looks, size profile, and AI styling history.',
    socialIntro: 'Or continue with',
    providers: [...providers],
    tabs: [...tabs],
    submitLabel: 'Sign In',
    forgotLabel: 'Forgot password?',
    promptLabel: "Don't have an account?",
    promptAction: 'Register now',
  }
}

export function getRegisterContent(): RegisterContent {
  return {
    title: 'Join the AI Fashion World',
    subtitle: 'Create account to unlock personalized styling',
    tabs: [...tabs],
    submitLabel: 'Create Account',
    termsLabel: 'I agree to Terms & Privacy Policy',
    promptLabel: 'Already have an account?',
    promptAction: 'Sign in',
    passwordStrengthLabel: 'Password strength: Medium',
  }
}

export function getForgotPasswordContent(): ForgotPasswordContent {
  return {
    title: 'Reset Password',
    subtitle: 'Enter your email and we will send you a reset link',
    tabs: [...tabs],
    submitLabel: 'Send Link',
    promptLabel: 'Back to',
    promptAction: 'Sign in',
  }
}
