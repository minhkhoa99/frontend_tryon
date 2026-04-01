"use client";

import Link from "next/link";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { useRegisterForm } from "@/features/auth/hooks/use-auth-forms";
import { getRegisterContent } from "@/features/auth/services/auth-content.service";
import type { RegisterSchema } from "@/features/auth/schemas/auth.schema";

export function RegisterPage() {
  const content = getRegisterContent();
  const form = useRegisterForm();
  const { register, handleSubmit } = form;

  const onSubmit = async (_values: RegisterSchema) => {
    void _values;
    await new Promise((resolve) => setTimeout(resolve, 200));
  };

  return (
    <AuthShell content={content} activeTab="register">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1 className="font-[family-name:var(--font-playfair)] text-[36px] font-bold text-[#FFF7F2]">{content.title}</h1>
        <p className="text-[15px] text-[#A79F9A]">{content.subtitle}</p>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium text-[#D0C7C2]">Full Name</span>
          <input {...register("fullName")} className="h-[52px] rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-4 text-[15px] text-[#FFF4EF] outline-none" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium text-[#D0C7C2]">Email</span>
          <input {...register("email")} className="h-[52px] rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-4 text-[15px] text-[#FFF4EF] outline-none" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium text-[#D0C7C2]">Password</span>
          <input {...register("password")} type="password" className="h-[52px] rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-4 text-[15px] text-[#FFF4EF] outline-none" />
          <div className="grid grid-cols-3 gap-1">
            <div className="h-[3px] rounded-full bg-red-400/30" />
            <div className="h-[3px] rounded-full bg-amber-300/50" />
            <div className="h-[3px] rounded-full bg-emerald-400/30" />
          </div>
          <span className="text-[12px] text-[#FBBF24]">{content.passwordStrengthLabel}</span>
        </label>

        <label className="flex items-center gap-3 text-[13px] text-[#A79F9A]">
          <input {...register("agree")} type="checkbox" className="h-5 w-5 rounded border border-white/20 bg-white/5" />
          <span>{content.termsLabel}</span>
        </label>

        <button type="submit" className="mt-1 flex h-[52px] items-center justify-center rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[15px] font-bold text-[#140E12] shadow-[0_8px_24px_rgba(243,198,213,0.4)]">
          {content.submitLabel}
        </button>

        <p className="text-center text-[14px] text-[#8B837E]">
          {content.promptLabel} <Link href="/auth/login" className="font-semibold text-[#F6D2DB]">{content.promptAction}</Link>
        </p>
      </form>
    </AuthShell>
  );
}
