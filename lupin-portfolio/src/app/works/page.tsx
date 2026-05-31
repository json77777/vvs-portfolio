import type { Metadata } from "next";
import WorksPageClient from "./WorksPageClient";

export const metadata: Metadata = {
  title: "Works — VISUAL VERSE STUDIOS",
  description:
    "Explore our selected works across branding, creative direction, production, and post-production.",
};

export default function WorksPage() {
  return <WorksPageClient />;
}
