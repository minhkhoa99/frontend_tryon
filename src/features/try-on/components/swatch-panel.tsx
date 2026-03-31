"use client";

import { useState } from "react";
import type { ColorSwatch, SizeOption } from "@/features/try-on/types/try-on.types";

type SwatchPanelProps = {
  swatches: ColorSwatch[];
  sizes: SizeOption[];
};

export function SwatchPanel({ swatches: initialSwatches, sizes: initialSizes }: SwatchPanelProps) {
  const [selectedColor, setSelectedColor] = useState(initialSwatches.find((s) => s.selected)?.id);
  const [selectedSize, setSelectedSize] = useState(initialSizes.find((s) => s.selected)?.id);

  return (
    <div className="flex flex-col gap-[18px] rounded-[32px] border border-white/[0.09] bg-[#14131acc] p-[22px] backdrop-blur-xl">
      <p className="text-[16px] font-semibold text-[#f4ece7]">Tone, color and size</p>

      {/* Color swatches */}
      <div className="flex gap-3">
        {initialSwatches.map((swatch) => (
          <button
            key={swatch.id}
            type="button"
            onClick={() => setSelectedColor(swatch.id)}
            className={`h-[22px] w-[22px] rounded-full transition ${
              selectedColor === swatch.id ? "ring-2 ring-[#fff7fa] ring-offset-2 ring-offset-transparent" : ""
            }`}
            style={{ backgroundColor: swatch.hex }}
            aria-label={`Color ${swatch.id}`}
          />
        ))}
      </div>

      {/* Size pills */}
      <div className="flex gap-2.5">
        {initialSizes.map((size) => (
          <button
            key={size.id}
            type="button"
            onClick={() => setSelectedSize(size.id)}
            className={`rounded-full px-4 py-3 font-[family-name:var(--font-mono)] text-[13px] font-semibold transition ${
              selectedSize === size.id
                ? "bg-linear-to-b from-[#f6d2db] to-[#d89aae] text-[#140e12]"
                : "border border-white/[0.1] bg-white/[0.05] text-[#e7deda]"
            }`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
}
