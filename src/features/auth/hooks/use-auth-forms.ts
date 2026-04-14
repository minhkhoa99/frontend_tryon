'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  type ForgotPasswordSchema,
  type LoginSchema,
  type RegisterSchema,
} from '@/features/auth/schemas/auth.schema'

export function useLoginForm() {
  return useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: '', password: '' },
    mode: 'onBlur',
  })
}

export function useRegisterForm() {
  return useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', phone: '', email: '', password: '', agree: true },
    mode: 'onBlur',
  })
}

export function useForgotPasswordForm() {
  return useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { phone: '' },
    mode: 'onBlur',
  })
}
