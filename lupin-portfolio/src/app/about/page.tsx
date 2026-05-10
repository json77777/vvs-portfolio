import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About — Lupin Studio",
  description:
    "Learn about Lupin Studio — a creative-driven hybrid structure where brands can be more authentic, bold, and rise above the crowd.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
