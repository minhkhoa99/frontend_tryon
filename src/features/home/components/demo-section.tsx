import Link from "next/link";
import { BeforeAfterShowcase } from "@/features/home/components/before-after-showcase";
import { SiteShell } from "@/shared/components/layout/site-shell";
import { SectionHeading } from "@/shared/components/ui/section-heading";

export function DemoSection() {
  return (
    <section id="demo" className="scroll-mt-28 bg-[#090a0f] py-16 md:py-20">
      <SiteShell>
        <div className="flex flex-col gap-8 px-2 md:px-4 xl:px-16">
          <SectionHeading eyebrow="DEMO THỬ ĐỒ" title="Xem AI biến đổi outfit trên chính phom dáng của bạn." />
          <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-center">
            <div className="flex flex-col gap-[18px]">
              <p className="text-[17px] leading-8 text-[#cec6c1]">
                Card glassmorphism mô phỏng thao tác kéo trước/sau giúp người dùng hiểu ngay trải nghiệm cốt lõi mà không cần đăng nhập.
              </p>
              <div>
                <Link
                  href="#chat-stylist"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-[#f4ece7] backdrop-blur-md transition duration-300 hover:bg-white/10"
                >
                  Thử lên ảnh của bạn
                </Link>
              </div>
            </div>
            <BeforeAfterShowcase />
          </div>
        </div>
      </SiteShell>
    </section>
  );
}
