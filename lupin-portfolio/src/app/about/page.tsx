import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About — VISUAL VERSE STUDIOS",
  description:
    "Learn about VISUAL VERSE STUDIOS — a creative-driven hybrid structure where brands can be more authentic, bold, and rise above the crowd.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
