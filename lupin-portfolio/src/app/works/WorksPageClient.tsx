"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { worksProjects } from "@/data/projects";
import type { Project } from "@/data/projects";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";

const categories = [
  "Long Form Edits",
  "Graphic Design",
  "Shorts Edits",
];

/* ── Works Card ─────────────────────────────────────────────
 * Video categories: loops muted, unmutes on hover (like carousel)
 * Graphic Design:   static image, natural aspect ratio
 * ────────────────────────────────────────────────────────── */
function WorksCard({ project, activeCategory }: { project: Project; activeCategory: string }) {
  const isVideo = activeCategory === "Long Form Edits" || activeCategory === "Shorts Edits";
  const aspectClass =
    activeCategory === "Graphic Design"
      ? ""
      : activeCategory === "Long Form Edits"
        ? "aspect-video"
        : "aspect-[9/16]";

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const vid = e.currentTarget.querySelector("video");
    if (vid) {
      vid.muted = false;
      vid.volume = 0.5;
      vid.play().catch(() => {});
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const vid = e.currentTarget.querySelector("video");
    if (vid && vid.muted) {
      vid.muted = false;
      vid.volume = 0.5;
      vid.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const vid = e.currentTarget.querySelector("video");
    if (vid) {
      vid.muted = true;
    }
  }, []);

  return (
    <div className="works-grid-card">
      <div
        className="group block"
        onMouseEnter={isVideo ? handleMouseEnter : undefined}
        onMouseMove={isVideo ? handleMouseMove : undefined}
        onMouseLeave={isVideo ? handleMouseLeave : undefined}
      >
        <div className={`relative ${aspectClass} rounded-sm overflow-hidden bg-surface`}>
          {isVideo ? (
            <video
              src={project.videoHover || project.image}
              loop
              muted
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorksPageClient() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Long Form Edits");

  /* Each category maps to its own internal tag — completely independent */
  const categoryMap: Record<string, string> = {
    "Long Form Edits": "Long Form",
    "Graphic Design": "Design",
    "Shorts Edits": "Shorts",
  };

  const filteredProjects = worksProjects.filter(
    (p) => p.category === categoryMap[activeCategory]
  );

  useGSAP(() => {
    if (!pageRef.current) return;
    gsap.fromTo(
      ".works-page-title",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );
    gsap.fromTo(
      ".works-category-filter",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.05,
        delay: 0.5,
      }
    );
  }, []);

  useGSAP(() => {
    if (!pageRef.current) return;
    const cards = pageRef.current.querySelectorAll(".works-grid-card");
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 }
    );
  }, [activeCategory]);

  return (
    <div ref={pageRef}>
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-bg min-h-screen">
        <div className="container-wide">
          <div className="mb-16 md:mb-24">
            <h1
              className="works-page-title font-headline text-ink leading-[0.85]"
              style={{
                opacity: 0,
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.02em",
              }}
            >
              ALL WORKS
              <sup className="font-label text-body text-ink-faded ml-2" style={{ fontSize: "0.25em" }}>
                ({worksProjects.length})
              </sup>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
            {/* Left column */}
            <div className="lg:w-[30%] lg:pr-6 space-y-8">
              {filteredProjects
                .filter((_, i) => i % 2 === 0)
                .map((project) => (
                  <WorksCard key={project.id} project={project} activeCategory={activeCategory} />
                ))}
            </div>

            {/* Center filters */}
            <div className="lg:w-[40%] lg:px-8 flex flex-col items-center">
              <div className="lg:sticky lg:top-32 space-y-6 w-full mt-10">
                {categories.map((cat) => (
                  <div key={cat} className="works-category-filter w-full">
                    <MagneticButton as="div" strength={0.2} className="w-full flex justify-center">
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={`relative block text-center font-headline uppercase tracking-tight transition-all duration-500 ${
                          activeCategory === cat
                            ? "text-ink scale-110"
                            : "text-ink-ghost hover:text-ink-faded hover:scale-105"
                        }`}
                        style={{
                          fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                        }}
                      >
                        {cat}
                        <span
                          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-[#E32626] transition-all duration-500 ease-out ${
                            activeCategory === cat ? "w-12 opacity-100" : "w-0 opacity-0"
                          }`}
                        />
                      </button>
                    </MagneticButton>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="lg:w-[30%] lg:pl-6 space-y-8 lg:mt-24">
              {filteredProjects
                .filter((_, i) => i % 2 === 1)
                .map((project) => (
                  <WorksCard key={project.id} project={project} activeCategory={activeCategory} />
                ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
