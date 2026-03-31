"use client";

import { useState } from "react";
import Image from "next/image";
import type { TryOnProduct } from "@/features/try-on/types/try-on.types";

const tabs = ["Tops", "Bottoms", "Accessories"] as const;

type ProductPanelProps = {
  product: TryOnProduct;
};

export function ProductPanel({ product }: ProductPanelProps) {
  const [activeTab, setActiveTab] = useState<string>("Tops");

  return (
    <div className="flex flex-col gap-[18px] rounded-[32px] border border-white/[0.1] bg-[#14131acc] p-[22px] backdrop-blur-xl">
      <h2 className="font-[family-name:var(--font-playfair)] text-[34px] font-bold leading-tight text-[#fff7f2]">
        Tủ đồ AI cho outfit hiện tại
      </h2>

      {/* Tabs */}
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4.5 py-3 text-[13px] font-semibold transition ${
              activeTab === tab
                ? "bg-linear-to-b from-[#f6d2db] to-[#d89aae] text-[#140e12]"
                : "border border-white/[0.1] bg-white/[0.05] text-[#f4ece7]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product card */}
      <div className="flex gap-4 rounded-[24px] border border-white/[0.06] bg-[#111119] p-4">
        <div className="relative h-[220px] w-[178px] flex-shrink-0 overflow-hidden rounded-[20px]">
          <Image src={product.image} alt={product.alt} fill sizes="178px" className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <h3 className="text-[22px] font-semibold text-[#fff4ef]">{product.name}</h3>
          <p className="text-[14px] leading-[1.5] text-[#cfc6c1]">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold text-[#f4ece7]">AI Fit Match</span>
            <span className="font-[family-name:var(--font-mono)] text-[16px] font-bold text-[#e6b8c8]">{product.fitMatchPercent}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-linear-to-r from-[#f5d0d8] to-[#ce8ea4]"
              style={{ width: `${product.fitMatchPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
