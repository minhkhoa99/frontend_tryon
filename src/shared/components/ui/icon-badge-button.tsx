import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type IconBadgeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
};

export function IconBadgeButton({ icon, className, type = "button", ...props }: IconBadgeButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-[#f4ece7] backdrop-blur-md transition hover:bg-white/[0.09]",
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
