export function ActionsRow() {
  return (
    <div className="flex gap-3.5">
      <button type="button" className="flex-1 rounded-full bg-linear-to-b from-[#f6d2db] to-[#d89aae] px-6 py-4 text-[15px] font-bold text-[#140e12] shadow-[0_20px_40px_rgba(241,196,214,0.22)] transition hover:scale-[1.02]">
        Thêm vào giỏ hàng
      </button>
      <button type="button" className="rounded-full border border-white/[0.1] bg-white/[0.05] px-6 py-4 text-[15px] font-semibold text-[#f4ece7] transition hover:bg-white/[0.09]">
        AI gợi ý phối thêm
      </button>
    </div>
  );
}
