"use client";

import { cn } from "@/shared/lib/cn";
import { useToastStore } from "@/shared/store/toast-store";

export function ToastViewport() {
  const { toasts, dismissToast } = useToastStore();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-[calc(100vw-2.5rem)] max-w-[360px] flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto rounded-[22px] border bg-[#17161CCC] px-4 py-[14px] shadow-[0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-[22px]",
            toast.tone === "success" && "border-emerald-300/20",
            toast.tone === "error" && "border-rose-300/20",
            toast.tone === "info" && "border-white/10",
          )}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p
                className={cn(
                  "text-[14px] font-semibold",
                  toast.tone === "success" && "text-emerald-200",
                  toast.tone === "error" && "text-rose-200",
                  toast.tone === "info" && "text-[#F4ECE7]",
                )}
              >
                {toast.title}
              </p>
              {toast.description ? <p className="text-[13px] leading-[1.5] text-[#CEC6C1]">{toast.description}</p> : null}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="text-[13px] font-semibold text-[#8F8884]"
              aria-label="Đóng thông báo"
            >
              x
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
