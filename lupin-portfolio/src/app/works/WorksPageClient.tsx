"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { projects } from "@/data/projects";
import Footer from "@/components/Footer";

const categories = [
  "All",
  "Design",
  "Creative",
  "Production",
  "Post-production",
];

export default function WorksPageClient() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
              ALL PROJECTS
              <sup className="font-label text-body text-ink-faded ml-2" style={{ fontSize: "0.25em" }}>
                ({projects.length})
              </sup>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
            {/* Left column */}
            <div className="lg:w-[30%] lg:pr-6 space-y-8">
              {filteredProjects
                .filter((_, i) => i % 2 === 0)
                .map((project) => (
                  <div key={project.id} className="works-grid-card">
                    <Link
                      href={`/works#${project.id}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-surface">
                        <div
                          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundColor: project.color }}
                        />
                      </div>
                      <div className="mt-3 flex items-start justify-between">
                        <div>
                          <h3 className="font-headline text-lg text-ink group-hover:text-ink-muted transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p
                            className="font-accent text-body-sm text-ink-faded"
                            style={{ fontStyle: "italic" }}
                          >
                            {project.subtitle}
                          </p>
                        </div>
                        <span className="font-label text-[10px] tracking-wider uppercase text-ink-ghost">
                          {project.category}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>

            {/* Center filters */}
            <div className="lg:w-[40%] lg:px-8 flex flex-col items-center">
              <div className="lg:sticky lg:top-32 space-y-2 w-full">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`works-category-filter block w-full text-center font-headline uppercase tracking-tight transition-all duration-500 ${
                      activeCategory === cat
                        ? "text-ink"
                        : "text-ink-ghost hover:text-ink-faded"
                    }`}
                    style={{
                      opacity: 0,
                      fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="lg:w-[30%] lg:pl-6 space-y-8 lg:mt-24">
              {filteredProjects
                .filter((_, i) => i % 2 === 1)
                .map((project) => (
                  <div key={project.id} className="works-grid-card">
                    <Link
                      href={`/works#${project.id}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-surface">
                        <div
                          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundColor: project.color }}
                        />
                      </div>
                      <div className="mt-3 flex items-start justify-between">
                        <div>
                          <h3 className="font-headline text-lg text-ink group-hover:text-ink-muted transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p
                            className="font-accent text-body-sm text-ink-faded"
                            style={{ fontStyle: "italic" }}
                          >
                            {project.subtitle}
                          </p>
                        </div>
                        <span className="font-label text-[10px] tracking-wider uppercase text-ink-ghost">
                          {project.category}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
