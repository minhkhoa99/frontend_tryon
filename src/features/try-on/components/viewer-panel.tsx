"use client";

import Image from "next/image";
import { useState } from "react";
import type { ViewerMode } from "@/features/try-on/types/try-on.types";

type ViewerPanelProps = {
  viewerImage: string;
  viewerImageAlt: string;
};

export function ViewerPanel({ viewerImage, viewerImageAlt }: ViewerPanelProps) {
  const [mode, setMode] = useState<ViewerMode>("before-after");

  return (
    <div className="flex flex-col gap-[16px] rounded-[34px] border border-white/[0.1] bg-white/[0.04] p-5 backdrop-blur-xl">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-semibold text-[#f4ece7]">Live Avatar Canvas</p>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => setMode("before-after")}
            className={`rounded-full px-3.5 py-2.5 text-[12px] font-semibold transition ${
              mode === "before-after"
                ? "bg-[#f2d2db] text-[#150f12]"
                : "border border-white/[0.1] bg-white/[0.05] text-[#e7deda]"
            }`}
          >
            Before / After
          </button>
          <button
            type="button"
            onClick={() => setMode("zoom")}
            className={`rounded-full px-3.5 py-2.5 text-[12px] font-semibold transition ${
              mode === "zoom"
                ? "bg-[#f2d2db] text-[#150f12]"
                : "border border-white/[0.1] bg-white/[0.05] text-[#e7deda]"
            }`}
          >
            Zoom 100%
          </button>
        </div>
      </div>

      {/* Photo area */}
      <div className="relative h-[720px] overflow-hidden rounded-[28px]">
        <Image
          src={viewerImage}
          alt={viewerImageAlt}
          fill
          sizes="620px"
          className="object-cover"
        />

        {/* Bottom gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#070709cc]" />

        {/* Scan line */}
        <div className="absolute inset-x-[42px] top-[244px] h-1 bg-linear-to-r from-transparent via-[#f2d2db] to-transparent shadow-[0_0_24px_rgba(242,210,219,0.6)]" />

        {/* Scan glow */}
        <div className="absolute inset-x-[22px] top-[232px] h-7 bg-linear-to-r from-transparent via-[#f1c7d855] to-transparent opacity-35" />

        {/* Body guide silhouette */}
        <div className="absolute left-[132px] top-[88px] h-[598px] w-[356px] rounded-full border border-white/[0.14] bg-white/[0.01]" />

        {/* Fit badge */}
        <div className="absolute left-6 top-6 flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-[#101015cc] px-4 py-3 backdrop-blur-md">
          <span className="text-[13px] font-semibold text-[#f5ece7]">AI Scanning Silhouette</span>
        </div>

        {/* Compare bar */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div className="w-[178px] rounded-[20px] border border-white/[0.08] bg-[#101015cc] p-[14px] backdrop-blur-md">
            <p className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[#e4b8c8]">Empty state</p>
            <p className="mt-2 text-[12px] leading-[1.45] text-[#d0c7c2]">Hiển thị mannequin wireframe nếu chưa có ảnh.</p>
          </div>
          <div className="w-[236px] rounded-[20px] border border-white/[0.08] bg-[#101015cc] p-[14px] backdrop-blur-md">
            <p className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[#e4b8c8]">Error state</p>
            <p className="mt-2 text-[12px] leading-[1.45] text-[#d0c7c2]">Không nhận diện được khuôn dáng, vui lòng chọn ảnh rõ toàn thân.</p>
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex gap-3.5">
        <button
          type="button"
          className="rounded-full bg-linear-to-b from-[#f6d2db] to-[#d89aae] px-4.5 py-3.5 text-[14px] font-bold text-[#140e12] shadow-[0_20px_40px_rgba(241,196,214,0.22)] transition hover:scale-[1.02]"
        >
          Tải ảnh lên
        </button>
        <button
          type="button"
          className="rounded-full border border-white/[0.1] bg-white/[0.05] px-4.5 py-3.5 text-[14px] font-semibold text-[#f4ece7] transition hover:bg-white/[0.09]"
        >
          Bật camera
        </button>
        <button
          type="button"
          className="rounded-full border border-white/[0.1] bg-white/[0.05] px-4.5 py-3.5 text-[14px] font-semibold text-[#f4ece7] transition hover:bg-white/[0.09]"
        >
          Error state
        </button>
      </div>
    </div>
  );
}
