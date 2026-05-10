"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import GeometricLines from "@/components/GeometricLines";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".about-statement",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-statement",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".about-image",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 md:py-48 bg-bg overflow-hidden"
    >
      {/* Decorative geometric lines */}
      <GeometricLines variant="about" />

      <div className="container-wide relative z-10">
        {/* Side-by-side layout: image left, text right */}
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
          {/* Left image — beside the text */}
          <div className="about-image w-full md:w-[28%] shrink-0" style={{ opacity: 0 }}>
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-surface">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(60,50,45,0.8) 0%, rgba(30,25,22,0.95) 100%)",
                }}
              />
              {/* Placeholder content — subtle creative workspace feel */}
              <div className="absolute bottom-4 left-4 font-accent text-sm text-white/40" style={{ fontStyle: "italic" }}>
                Lupin Studio
              </div>
            </div>
          </div>

          {/* Right — large italic serif statement */}
          <div className="about-statement flex-1" style={{ opacity: 0 }}>
            <p
              className="font-accent leading-[1.35]"
              style={{
                fontStyle: "italic",
                fontSize: "clamp(1.9rem, 4.2vw, 3.5rem)",
                color: "var(--color-ink)",
                fontWeight: 300,
                marginTop: "-0.3em",
              }}
            >
              "I am a designer and editor driven by a single goal: to turn raw ideas into cinematic reality. My work is a balance of meticulous craft and bold instinct. I don't just build frames; I build authenticity. This is where your brand stops blending in and starts rising above the crowd."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
