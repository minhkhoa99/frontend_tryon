import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type PremiumButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function PremiumButton({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: PremiumButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300",
        variant === "primary"
          ? "bg-linear-to-b from-[#f6d2db] to-[#d89aae] text-[#140e12] shadow-[0_20px_40px_rgba(241,196,214,0.22)] hover:scale-[1.02]"
          : "border border-white/12 bg-white/6 text-[#f4ece7] backdrop-blur-md hover:bg-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
