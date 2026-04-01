import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Vui lòng nhập email hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên"),
  email: z.email("Vui lòng nhập email hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  agree: z.literal(true, { error: "Bạn cần đồng ý với điều khoản" }),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Vui lòng nhập email hợp lệ"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
