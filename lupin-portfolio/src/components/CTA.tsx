"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import GeometricLines from "@/components/GeometricLines";
import MagneticButton from "./MagneticButton";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const lines = sectionRef.current.querySelectorAll(".cta-line");
    lines.forEach((line, i) => {
      gsap.fromTo(
        line,
        { y: "120%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.fromTo(
      ".cta-link",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-link",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 md:py-48 bg-bg overflow-hidden"
    >
      {/* Decorative geometric lines */}
      <GeometricLines variant="cta" />

      <div className="container-wide relative z-10">
        {/* Top divider */}
        <div className="h-px w-full bg-border mb-20" />

        {/* Bold headline — left aligned, matching reference exactly */}
        <h2 className="font-headline text-ink leading-[0.92] max-w-5xl"
          style={{ fontSize: "clamp(2.8rem, 7.5vw, 7rem)", letterSpacing: "-0.02em" }}
        >
          <div className="overflow-hidden">
            <span className="cta-line block">LET&apos;S CRAFT</span>
          </div>
          <div className="overflow-hidden">
            <span className="cta-line block">YOUR PROJECT TOGETHER</span>
          </div>
        </h2>

        {/* Simple contact link — triangle arrow + underline like reference */}
        <div className="cta-link mt-14 inline-block" style={{ opacity: 0 }}>
          <MagneticButton as="div" strength={0.4}>
            <a
              href="mailto:hello@visualversestudios.com"
              className="arrow-link group inline-flex items-center gap-2 font-label text-base tracking-wide text-ink-muted hover:text-ink transition-colors duration-300"
            >
              <span className="relative">
                Contact us
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-ink-muted scale-x-100 group-hover:scale-x-0 transition-transform duration-500 origin-right" />
              </span>
              <svg 
                className="w-4 h-4 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#E32626]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
