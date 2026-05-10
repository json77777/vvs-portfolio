import type { Metadata } from "next";
import { Manrope } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Lupin — Creator, Designer & Editor",
  description:
    "Lupin is a multidisciplinary creator, designer, and editor — crafting visual narratives from concept to final frame.",
  keywords: [
    "creator",
    "designer",
    "editor",
    "portfolio",
    "Lupin",
    "creative",
    "visual storytelling",
  ],
  openGraph: {
    title: "Lupin — Creator, Designer & Editor",
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
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
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
