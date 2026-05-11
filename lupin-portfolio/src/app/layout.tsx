import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import LoaderWrapper from "@/components/LoaderWrapper";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "VISUAL VERSE STUDIOS — Creator, Designer & Editor",
  description:
    "VISUAL VERSE STUDIOS is a multidisciplinary creator, designer, and editor — crafting visual narratives from concept to final frame.",
  keywords: [
    "creator",
    "designer",
    "editor",
    "portfolio",
    "VISUAL VERSE STUDIOS",
    "creative",
    "visual storytelling",
  ],
  openGraph: {
    title: "VISUAL VERSE STUDIOS — Creator, Designer & Editor",
    description:
      "A multidisciplinary creator crafting visual narratives for brands that dare to stand out.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LoaderWrapper>
          <SmoothScroll>
            <Navigation />
            <main>{children}</main>
          </SmoothScroll>
        </LoaderWrapper>
      </body>
    </html>
  );
}
