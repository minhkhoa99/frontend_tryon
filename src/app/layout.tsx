import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${plexMono.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
