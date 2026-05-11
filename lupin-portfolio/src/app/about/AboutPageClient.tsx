"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import Footer from "@/components/Footer";

const values = [
  {
    number: "01",
    title: "Authenticity",
    description:
      "Genuine creative expression. Every project tells a true, compelling story that resonates with audiences.",
  },
  {
    number: "02",
    title: "Boldness",
    description:
      "Pushing boundaries and challenging conventions. Work that stands out because it dares to embrace the unconventional.",
  },
  {
    number: "03",
    title: "Craft",
    description:
      "Meticulous attention to detail. From concept to final delivery, every frame, every pixel is carefully considered.",
  },
  {
    number: "04",
    title: "Collaboration",
    description:
      "Great work is born from great partnerships. Open dialogue and shared vision throughout every project.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Brands Elevated" },
  { value: "8", label: "Years of Craft" },
  { value: "12", label: "Collaborators" },
];

export default function AboutPageClient() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;

    const heroLines = pageRef.current.querySelectorAll(".about-hero-line");
    heroLines.forEach((line, i) => {
      gsap.fromTo(
        line,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3 + i * 0.12,
        }
      );
    });

    const statValues = pageRef.current.querySelectorAll(".stat-value");
    statValues.forEach((stat) => {
      gsap.fromTo(
        stat,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    const valueCards = pageRef.current.querySelectorAll(".value-card");
    valueCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.fromTo(
      ".philosophy-text",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".philosophy-text",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 bg-bg relative overflow-hidden">
        <div className="container-wide">
          <h1 className="font-headline text-ink leading-[0.88] max-w-5xl"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.02em" }}
          >
            <div className="overflow-hidden">
              <span className="about-hero-line block">WE CRAFT VISUAL</span>
            </div>
            <div className="overflow-hidden">
              <span className="about-hero-line block">
                NARRATIVES{" "}
                <em
                  className="font-accent not-italic"
                  style={{
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "var(--color-ink-muted)",
                  }}
                >
                  for
                </em>{" "}
                BRANDS
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="about-hero-line block">
                THAT DARE TO STAND OUT
              </span>
            </div>
          </h1>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-40 bg-bg-warm relative overflow-hidden">
        {/* Vertical divider */}
        <div
          className="hidden md:block absolute top-0 bottom-0 left-[33%] w-px"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        />

        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            <div>
              <span
                className="font-accent text-sm text-ink-faded mb-3 block"
                style={{ fontStyle: "italic" }}
              >
                01. Philosophy
              </span>
              <h2 className="font-headline text-h2 md:text-h1 text-ink leading-[0.9]">
                A CREATIVE
                <br />
                <span className="text-ink-faded">WITHOUT LIMITS</span>
              </h2>
            </div>
            <div
              className="philosophy-text md:col-span-2 flex items-end"
              style={{ opacity: 0 }}
            >
              <div>
                <p
                  className="font-accent leading-[1.4] mb-5"
                  style={{
                    fontStyle: "italic",
                    fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                    color: "var(--color-ink)",
                    fontWeight: 300,
                  }}
                >
                  VISUAL VERSE STUDIOS is a multidisciplinary creator — a designer, editor, and
                  visual storyteller crafting work from concept to final frame.
                  Not just production; strategy, design, and direction all in one
                  place.
                </p>
                <p className="font-body text-body text-ink-faded leading-[1.8]">
                  A multidisciplinary approach combining strategy, design, and
                  production expertise to deliver work that transcends
                  expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-32 bg-bg">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-value text-center md:text-left"
                style={{ opacity: 0 }}
              >
                <div
                  className="font-headline text-[3rem] md:text-[4rem] text-ink leading-none mb-2"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {stat.value}
                </div>
                <div className="font-label text-body-sm text-ink-faded tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-40 bg-bg-warm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-border" />
        <div className="container-wide">
          <div className="mb-16 md:mb-24">
            <span
              className="font-accent text-sm text-ink-faded mb-3 block"
              style={{ fontStyle: "italic" }}
            >
              02. Values
            </span>
            <h2 className="font-headline text-h2 md:text-h1 text-ink leading-[0.9]">
              WHAT DRIVES
              <br />
              EVERYTHING WE DO
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {values.map((value, index) => (
              <div
                key={value.number}
                className={`value-card group py-8 md:py-10 px-6 md:px-8 ${index < 2 ? "border-b border-border" : ""} ${index % 2 === 0 ? "md:border-r md:border-border" : ""}`}
                style={{ opacity: 0 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-headline text-h3 text-ink group-hover:text-ink-muted transition-colors duration-500">
                    {value.title}
                  </h3>
                  <span
                    className="font-accent text-sm text-ink-ghost"
                    style={{ fontStyle: "italic" }}
                  >
                    {value.number}
                  </span>
                </div>
                <p className="font-body text-ink-muted leading-relaxed group-hover:text-ink-light transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48 bg-bg relative overflow-hidden">
        <div className="container-wide">
          <h2
            className="font-headline text-ink leading-[0.9] mb-10"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
          >
            READY TO WORK
            <br />
            TOGETHER?
          </h2>
          <a
            href="mailto:hello@visualversestudios.com"
            className="arrow-link group inline-flex items-center font-label text-sm tracking-wide text-ink-muted hover:text-ink transition-colors duration-300"
          >
            <span className="relative">
              Get in touch
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-ink-muted scale-x-100 group-hover:scale-x-0 transition-transform duration-500 origin-right" />
            </span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
