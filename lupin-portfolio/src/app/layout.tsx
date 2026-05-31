import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond, Syne } from "next/font/google";
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

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Visual Verse Studios - Portfolio",
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
  metadataBase: new URL("https://example.com"), // replace with your site URL
  authors: [{ name: "Visual Verse Studios", url: "https://example.com" }],
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#000000" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Visual Verse Studios - Portfolio",
    description:
      "A multidisciplinary creator crafting visual narratives for brands that dare to stand out.",
    type: "website",
    locale: "en_US",
    // default image (used by social previews)
    images: [
      {
        url: "https://res.cloudinary.com/dxvpm6xhq/image/upload/v1779984329/vvlogo-updated_tzg7bh.png",
        width: 1200,
        height: 630,
        alt: "Visual Verse Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visual Verse Studios - Portfolio",
    description: "Creative studio crafting cinematic visual narratives.",
    // creator handle (optional) - replace with your Twitter handle
    creator: "@visualverse",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable} ${syne.variable}`} suppressHydrationWarning>
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
