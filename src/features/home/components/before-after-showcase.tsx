import Image from "next/image";
import { GlassPanel } from "@/shared/components/ui/glass-panel";

export function BeforeAfterShowcase() {
  return (
    <GlassPanel className="flex flex-col gap-5 p-5 md:p-[22px]">
      <figure className="flex flex-col gap-5">
        <div className="relative h-[420px] overflow-hidden rounded-[26px] bg-[#120f14]">
          <div className="absolute inset-y-0 left-0 w-[52%] overflow-hidden">
            <Image
              src="/images/home/demo-before.jpg"
              alt="Original portrait before try-on"
              fill
              sizes="(min-width: 1280px) 680px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
              className="object-cover"
            />
          </div>
          <Image
            src="/images/home/demo-after.jpg"
            alt="Styled portrait after AI try-on"
            fill
            sizes="(min-width: 1280px) 680px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-[52%] w-1 -translate-x-1/2 bg-linear-to-b from-transparent via-white to-transparent"
          />
          <div className="absolute left-[52%] top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-[#fff5f7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1217] shadow-[0_8px_20px_rgba(0,0,0,0.24)]">
            Static preview
          </div>
        </div>
        <figcaption className="flex items-center justify-between gap-4 text-sm font-medium text-[#f1e6e2]">
          <span>Before / Ảnh gốc</span>
          <span>After / AI styling</span>
        </figcaption>
      </figure>
    </GlassPanel>
  );
}
