import Image from "next/image";
import type { StylePairing } from "@/features/try-on/types/try-on.types";

type StyleRailProps = {
  pairings: StylePairing[];
};

export function StyleRail({ pairings }: StyleRailProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-white/[0.07] bg-[#111119cc] p-5 backdrop-blur-xl">
      <p className="text-[15px] font-semibold text-[#f4ece7]">Gợi ý phối cùng</p>
      <div className="grid grid-cols-2 gap-3.5">
        {pairings.map((item) => (
          <div key={item.id} className="flex flex-col gap-2.5 rounded-[22px] border border-white/[0.06] bg-[#17161d] p-3 pb-3.5">
            <div className="relative h-[128px] overflow-hidden rounded-[18px]">
              <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1280px) 274px, 50vw" className="object-cover" />
            </div>
            <p className="text-[15px] font-semibold text-[#fff4ef]">{item.name}</p>
            <p className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[#d9afc0]">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
