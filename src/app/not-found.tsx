import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-84px)] bg-[#070709] text-white">
      <div className="mx-auto flex min-h-[calc(100vh-84px)] w-full max-w-[1440px] flex-col">
        <section className="flex flex-1 items-center justify-center px-4 py-16 md:px-8 xl:px-12">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center rounded-[20px] border border-white/[0.12] bg-linear-to-b from-white/[0.05] to-white/[0.02] px-12 py-10 shadow-[0_30px_60px_rgba(0,0,0,0.45)] backdrop-blur-[30px] md:px-20 md:py-[60px]">
              <div className="bg-linear-to-b from-white/[0.9] to-white/[0.6] bg-clip-text font-[family-name:var(--font-playfair)] text-[88px] font-bold leading-none text-transparent drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] md:text-[120px]">
                404
              </div>
              <p className="mt-2 text-center text-[16px] tracking-[0.03125em] text-white/60 md:text-[18px]">
                Looks like you lost your style
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-4">
              <Link
                href="/"
                className="flex h-[52px] items-center justify-center rounded-[26px] bg-linear-to-r from-[#F6D2DB] to-[#D89AAE] px-8 text-[15px] font-semibold text-[#140F12] shadow-[0_8px_24px_rgba(246,210,219,0.3)]"
              >
                Go to Homepage
              </Link>
              <Link
                href="/chatbot"
                className="flex h-[52px] items-center justify-center rounded-[26px] border border-white/[0.2] bg-white/[0.05] px-8 text-[15px] font-medium text-white/90"
              >
                Ask AI Stylist
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
