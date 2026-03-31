"use client";

import Link from "next/link";
import type { FooterLinkGroup } from "@/features/home/types/home.types";
import { SiteShell } from "@/shared/components/layout/site-shell";
import { PremiumButton } from "@/shared/components/ui/premium-button";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
];

type HomeFooterProps = {
  groups: FooterLinkGroup[];
};

export function HomeFooter({ groups }: HomeFooterProps) {
  return (
    <footer id="subscribe" className="scroll-mt-28 border-t border-white/8 bg-[#070709] py-10 md:py-12">
      <SiteShell>
        <div className="flex flex-col gap-7 px-2 md:px-4 xl:px-16">
          <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
            <div className="max-w-[360px] space-y-3">
              <p className="text-sm font-semibold text-[#e9dfda]">AURELIA / Virtual Try-On Luxury Commerce</p>
              <p className="text-sm leading-7 text-[#bdb4af]">
                Nền tảng thời trang cao cấp kết hợp AI stylist, virtual try-on và shopping journey mượt mà
                cho thế hệ mua sắm mới.
              </p>
            </div>

            <div className="flex flex-col gap-8 md:flex-row md:gap-11">
              {groups.map((group) => (
                <div key={group.id} className="flex flex-col gap-2.5">
                  <p className="text-[13px] font-semibold text-[#f1e7e2]">{group.title}</p>
                  {group.links.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      className="text-[13px] font-medium text-[#bdb4af] transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-[18px] md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium text-[#e9dfda]">
              Nhận drop mới, AI styling notes và private offers mỗi tuần.
            </p>
            <PremiumButton
              className="self-start md:self-auto"
              onClick={() => {
                window.location.href = "mailto:hello@aurelia.ai?subject=Subscribe%20to%20AURELIA%20updates";
              }}
            >
              Subscribe
            </PremiumButton>
          </div>

          <div className="flex flex-col gap-3 border-t border-transparent pt-1 text-xs md:flex-row md:items-center md:justify-between">
            <p className="text-[#8f8884]">© 2026 AURELIA. All rights reserved.</p>
            <nav aria-label="AURELIA social links" className="flex flex-wrap items-center gap-3 font-[family-name:var(--font-mono)] text-[#a79f9a]">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9afc0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070709]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </SiteShell>
    </footer>
  );
}
