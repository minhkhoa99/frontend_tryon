import type { FitNote } from "@/features/try-on/types/try-on.types";

type FitNotePanelProps = {
  fitNote: FitNote;
};

export function FitNotePanel({ fitNote }: FitNotePanelProps) {
  return (
    <div className="flex flex-col gap-3.5 rounded-[28px] border border-white/[0.09] bg-[#12121acc] p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-semibold text-[#f4ece7]">Ghi chú fit AI</p>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-2 font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#e4b8c8]">
          Confidence {fitNote.confidence}%
        </span>
      </div>
      <p className="text-[14px] font-semibold text-[#fff4ef]">{fitNote.recommendation}</p>
      <div className="grid grid-cols-3 gap-2.5">
        {fitNote.measurements.map((m) => (
          <div key={m.label} className="flex flex-col gap-1.5 rounded-[18px] border border-white/[0.06] bg-[#17161d] p-3">
            <p className="text-[11px] font-semibold text-[#afa7a2]">{m.label}</p>
            <p className="font-[family-name:var(--font-mono)] text-[13px] font-bold text-[#f4ece7]">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
