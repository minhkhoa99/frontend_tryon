import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SharedHeader } from "@/shared/components/layout/shared-header";
import { SharedFooter } from "@/shared/components/layout/shared-footer";
import { ToastViewport } from "@/shared/components/ui/toast-viewport";
import { getHomeViewModel } from "@/features/home/mappers/home.mapper";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  weight: ["700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-mono",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "AURELIA | AI Try-On Luxury Commerce",
  description:
    "Luxury fashion discovery, AI styling, and virtual try-on in one editorial shopping experience.",
  openGraph: {
    title: "AURELIA | AI Try-On Luxury Commerce",
    description:
      "Luxury fashion discovery, AI styling, and virtual try-on in one editorial shopping experience.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const viewModel = getHomeViewModel();

  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${plexMono.variable}`} suppressHydrationWarning>
        <SharedHeader navItems={viewModel.navItems} />
        {children}
        <SharedFooter groups={viewModel.footerGroups} />
        <ToastViewport />
      </body>
    </html>
  );
}
