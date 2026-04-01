"use client";

import Link from "next/link";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { useLoginForm } from "@/features/auth/hooks/use-auth-forms";
import { getLoginContent } from "@/features/auth/services/auth-content.service";
import type { LoginSchema } from "@/features/auth/schemas/auth.schema";

export function LoginPage() {
  const content = getLoginContent();
  const form = useLoginForm();
  const { register, handleSubmit } = form;

  const onSubmit = async (_values: LoginSchema) => {
    void _values;
    await new Promise((resolve) => setTimeout(resolve, 200));
  };

  return (
    <AuthShell content={content} activeTab="login">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1 className="font-[family-name:var(--font-playfair)] text-[34px] font-bold text-[#FFF7F2]">{content.title}</h1>
        <p className="text-[14px] leading-[1.5] text-[#A79F9A]">{content.subtitle}</p>

        <div className="mt-2 flex flex-col gap-3">
          <p className="text-[13px] text-[#6B6560]">{content.socialIntro}</p>
          <div className="grid grid-cols-2 gap-3">
            {content.providers?.map((provider) => (
              <button key={provider.id} type="button" className="flex h-12 items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-white/[0.05] text-[14px] font-medium text-[#E0D8D4]">
                <span className="text-white">{provider.icon}</span>
                <span>{provider.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="my-1 h-px w-full bg-white/[0.08]" />

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium text-[#D0C7C2]">Email</span>
          <input {...register("email")} className="h-[52px] rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-4 text-[15px] text-[#FFF4EF] outline-none" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium text-[#D0C7C2]">Password</span>
          <input {...register("password")} type="password" className="h-[52px] rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-4 text-[15px] text-[#FFF4EF] outline-none" />
        </label>

        <Link href="/auth/forgot-password" className="text-right text-[14px] font-medium text-[#D7AFC0]">
          {content.forgotLabel}
        </Link>

        <button type="submit" className="mt-1 flex h-[52px] items-center justify-center rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[15px] font-bold text-[#140E12] shadow-[0_8px_24px_rgba(243,198,213,0.4)]">
          {content.submitLabel}
        </button>

        <p className="text-center text-[14px] text-[#8B837E]">
          {content.promptLabel} <Link href="/auth/register" className="font-semibold text-[#F6D2DB]">{content.promptAction}</Link>
        </p>
      </form>
    </AuthShell>
  );
}
