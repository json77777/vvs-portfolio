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
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-surface flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dxvpm6xhq/image/upload/v1778486225/new_png_2_00000_dapjwm.png"
                alt="Visual Verse Studios"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right — large italic serif statement */}
          <div className="about-statement flex-1" style={{ opacity: 0 }}>
            <p
              className="font-accent leading-[1.4] group text-justify"
              style={{
                fontStyle: "italic",
                fontSize: "clamp(1.2rem, 2.5vw, 2.2rem)",
                color: "var(--color-ink)",
                fontWeight: 300,
                marginTop: "-0.3em",
              }}
            >
              {"“At Visual Verse Studios, we are a team of designers and editors driven by a single goal: transforming raw ideas into cinematic reality. Our work is built on the balance between meticulous craft and bold instinct. We don’t just create frames, we create authenticity. This is where brands stop blending in and start rising above the crowd.”".split(" ").map((word, i, arr) => (
                <span key={i} className="inline">
                  <span className="inline-block transition-all duration-300 hover:scale-[1.15] hover:-translate-y-1 hover:text-white hover:z-10 relative cursor-default origin-center">
                    {word}
                  </span>
                  {i < arr.length - 1 && " "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
