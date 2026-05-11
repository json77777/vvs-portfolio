"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import GeometricLines from "@/components/GeometricLines";

const HERO_VIDEOS = [
  "https://res.cloudinary.com/dl4f50vlj/video/upload/v1777107837/Final_Promo_fxbnnf.mp4",
];

const HERO_QUOTES: Record<string, string> = {
  think: "Every masterpiece begins as a silent spark inside the mind.",
  create: "Creation is where imagination stops dreaming and starts breathing.",
  render: "Rendering turns vision into something the world can finally feel.",
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  useEffect(() => {
    // Start playing the first video
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      firstVideo.style.opacity = "1";
      firstVideo.play().catch(() => {});
    }
  }, []);

  const handleEnded = (endedIndex: number) => {
    const nextIndex = (endedIndex + 1) % HERO_VIDEOS.length;
    const currentVideo = videoRefs.current[endedIndex];
    const nextVideo = videoRefs.current[nextIndex];

    if (!currentVideo || !nextVideo) return;

    activeRef.current = nextIndex;

    // Reset next video to start
    nextVideo.currentTime = 0;
    nextVideo.play().catch(() => {});

    // Crossfade
    gsap.to(nextVideo, { opacity: 1, duration: 1, ease: "power2.inOut" });
    gsap.to(currentVideo, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        currentVideo.pause();
        currentVideo.currentTime = 0;
      },
    });
  };

  // Animate quote in/out
  useEffect(() => {
    if (!quoteRef.current) return;

    if (hoveredWord) {
      gsap.killTweensOf(quoteRef.current);
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 14, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power3.out",
        }
      );
    } else {
      gsap.killTweensOf(quoteRef.current);
      gsap.to(quoteRef.current, {
        opacity: 0,
        y: 8,
        filter: "blur(4px)",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [hoveredWord]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      ".hero-line",
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.18,
      }
    ).fromTo(
      ".hero-scroll",
      { opacity: 0, y: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    ).to(".hero-scroll", {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut"
    });
  }, []);

  const handleMouseEnter = useCallback((word: string) => {
    setHoveredWord(word);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredWord(null);
  }, []);

  /* Shared glass-card style — capsule shape, smaller size */
  const glassStyle = (variant: "side" | "center") => ({
    padding: "clamp(0.5rem, 1.2vw, 0.9rem) clamp(1.2rem, 3vw, 2.8rem)",
    background:
      variant === "center"
        ? "rgba(255, 255, 255, 0.07)"
        : "rgba(255, 255, 255, 0.05)",
    backdropFilter:
      variant === "center"
        ? "blur(24px) saturate(1.6)"
        : "blur(20px) saturate(1.4)",
    WebkitBackdropFilter:
      variant === "center"
        ? "blur(24px) saturate(1.6)"
        : "blur(20px) saturate(1.4)",
    border:
      variant === "center"
        ? "1px solid rgba(255, 255, 255, 0.16)"
        : "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "9999px",
    boxShadow:
      variant === "center"
        ? "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
        : "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
  });

  const textStyle = {
    fontFamily: "var(--font-lemonmilk)",
    fontSize: "clamp(1.1rem, 2.4vw, 2.2rem)",
    fontWeight: 700,
    letterSpacing: "0.06em",
    lineHeight: 1,
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full flex items-center overflow-hidden bg-bg"
    >
      {/* Video background layer */}
      <div className="absolute inset-0 z-0">
        {HERO_VIDEOS.map((url, i) => (
          <video
            key={i}
            ref={(el) => { videoRefs.current[i] = el; }}
            muted
            loop
            playsInline
            preload="auto"
            onEnded={() => handleEnded(i)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <source src={url} type="video/mp4" />
          </video>
        ))}
      </div>

      {/* Dark cinematic gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.95) 100%)",
        }}
      />

      {/* Subtle decorative arcs */}
      <div className="relative z-[2]">
        <GeometricLines variant="hero" />
      </div>

      {/* Horizontal headline — THINK · CREATE · RENDER */}
      <div className="relative z-10 w-full container-wide">
        {/* Glass capsule row */}
        <div
          className="flex items-center justify-between"
          style={{ gap: "clamp(0.8rem, 2vw, 2rem)" }}
        >
          {/* THINK — left-aligned with logo */}
          <div className="overflow-hidden">
            <div
              className="hero-line hero-glass-card"
              style={glassStyle("side")}
              onMouseEnter={() => handleMouseEnter("think")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-white uppercase block" style={textStyle}>
                THINK
              </span>
            </div>
          </div>

          {/* Dot separator */}
          <div className="hero-line flex-shrink-0" style={{ opacity: 0 }}>
            <span
              className="block"
              style={{
                width: "clamp(5px, 0.5vw, 8px)",
                height: "clamp(5px, 0.5vw, 8px)",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0 0 12px rgba(255, 255, 255, 0.15)",
              }}
            />
          </div>

          {/* CREATE — centered */}
          <div className="overflow-hidden">
            <div
              className="hero-line hero-glass-card"
              style={glassStyle("center")}
              onMouseEnter={() => handleMouseEnter("create")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-white uppercase block" style={textStyle}>
                CREATE
              </span>
            </div>
          </div>

          {/* Dot separator */}
          <div className="hero-line flex-shrink-0" style={{ opacity: 0 }}>
            <span
              className="block"
              style={{
                width: "clamp(5px, 0.5vw, 8px)",
                height: "clamp(5px, 0.5vw, 8px)",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0 0 12px rgba(255, 255, 255, 0.15)",
              }}
            />
          </div>

          {/* RENDER — right-aligned with Fiverr|YT */}
          <div className="overflow-hidden">
            <div
              className="hero-line hero-glass-card"
              style={glassStyle("side")}
              onMouseEnter={() => handleMouseEnter("render")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-white uppercase block" style={textStyle}>
                RENDER
              </span>
            </div>
          </div>
        </div>

        {/* Animated quote beneath */}
        <div
          ref={quoteRef}
          className="w-full flex justify-center mt-6"
          style={{ opacity: 0, minHeight: "2.5rem" }}
        >
          {hoveredWord && (
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
                fontWeight: 600,
                fontStyle: "italic",
                color: "rgba(255, 255, 255, 0.7)",
                letterSpacing: "0.02em",
                lineHeight: 1.5,
                textAlign: "center",
                maxWidth: "600px",
              }}
            >
              &ldquo;{HERO_QUOTES[hoveredWord]}&rdquo;
            </p>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity: 0 }}
      >
        <span
          className="font-accent text-sm tracking-wide"
          style={{
            fontStyle: "italic",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
