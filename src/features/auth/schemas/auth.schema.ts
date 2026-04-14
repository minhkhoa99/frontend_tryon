import { z } from 'zod'

// Validate SĐT Việt Nam: đầu số 03x, 05x, 07x, 08x, 09x — 10 số
const phoneSchema = z
  .string()
  .min(10, 'Số điện thoại không hợp lệ')
  .max(10, 'Số điện thoại không hợp lệ')
  .regex(/^(0[35789])\d{8}$/, 'Số điện thoại không hợp lệ')

export const loginSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
})

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: phoneSchema,
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  agree: z.literal(true, { error: 'Bạn cần đồng ý với điều khoản' }),
})

export const otpSchema = z.object({
  otpCode: z
    .string()
    .length(6, 'OTP phải có đúng 6 số')
    .regex(/^\d{6}$/, 'OTP chỉ gồm chữ số'),
})

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  phone: phoneSchema,
})

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type OtpSchema = z.infer<typeof otpSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
