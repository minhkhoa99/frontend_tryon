"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Bell, Menu, ShoppingBag, User } from "lucide-react";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/features/home/types/home.types";
import { SiteShell } from "@/shared/components/layout/site-shell";

type SharedHeaderProps = {
  navItems: NavItem[];
};

const headerCtaClassName =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-linear-to-b from-[#f6d2db] to-[#d89aae] px-5 py-3 text-sm font-semibold text-[#140e12] shadow-[0_20px_40px_rgba(241,196,214,0.22)] transition duration-300 hover:scale-[1.02]";

const mobileHeaderCtaClassName =
  "inline-flex min-h-10 items-center justify-center rounded-full bg-linear-to-b from-[#f6d2db] to-[#d89aae] px-4 py-2.5 text-[13px] font-semibold text-[#140e12] shadow-[0_18px_36px_rgba(241,196,214,0.2)] transition duration-300 hover:scale-[1.02]";

const iconLinkClassName =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-[#f4ece7] backdrop-blur-md transition hover:bg-white/[0.09]";

const menuButtonClassName =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-[#f4ece7] backdrop-blur-md transition hover:bg-white/[0.09] lg:hidden";

export function SharedHeader({ navItems }: SharedHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileNavId = useId();

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#090a0e]/80 backdrop-blur-xl">
      <SiteShell>
        <div className="flex min-h-[84px] items-center justify-between gap-3 px-2 md:gap-6 md:px-4 xl:px-12">
          <Link href="/" className="text-[12px] font-semibold tracking-[0.14em] text-[#f5f1ed] sm:text-sm sm:tracking-[0.18em]">
            AURELIA / AI TRY-ON
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className={`text-sm font-medium transition hover:text-white ${
                  pathname === item.href ? "text-white" : "text-[#c9c2bc]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/notifications" className={iconLinkClassName} aria-label="Thông báo và cập nhật hệ thống">
              <Bell size={18} />
            </Link>
            <Link href="/cart" className={iconLinkClassName} aria-label="Giỏ hàng của tôi">
              <ShoppingBag size={18} />
            </Link>
            <Link href="/auth/login" className={iconLinkClassName} aria-label="Tài khoản và hỗ trợ">
              <User size={18} />
            </Link>
            <Link href="/try-on" className={headerCtaClassName}>
              Thử đồ AI
            </Link>
          </div>

          <div className="flex items-center gap-1.5 lg:hidden">
            <Link href="/try-on" className={`${mobileHeaderCtaClassName} max-[420px]:hidden`}>
              <span className="sm:hidden">Thử đồ</span>
              <span className="hidden sm:inline">Thử đồ AI</span>
            </Link>
            <button
              type="button"
              className={menuButtonClassName}
              aria-expanded={isMobileMenuOpen}
              aria-controls={mobileNavId}
              aria-label={isMobileMenuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        <nav
          id={mobileNavId}
          aria-label="Điều hướng di động"
          className={isMobileMenuOpen ? "border-t border-white/8 px-2 pb-5 pt-4 lg:hidden" : "hidden"}
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={`${item.href}-${item.label}-mobile`}
                href={item.href}
                className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm font-medium text-[#f4ece7] transition hover:bg-white/[0.08]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-1">
              <Link href="/notifications" className={iconLinkClassName} aria-label="Thông báo và cập nhật hệ thống">
                <Bell size={18} />
              </Link>
              <Link href="/cart" className={iconLinkClassName} aria-label="Giỏ hàng của tôi">
                <ShoppingBag size={18} />
              </Link>
              <Link href="/auth/login" className={iconLinkClassName} aria-label="Tài khoản và hỗ trợ">
                <User size={18} />
              </Link>
            </div>
          </div>
        </nav>
      </SiteShell>
    </header>
  );
}
