import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export const GlassPanel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function GlassPanel(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("rounded-[32px] border border-white/10 bg-white/[0.06] backdrop-blur-xl", className)}
      {...props}
    />
  );
});
