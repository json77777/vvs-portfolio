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
  const [heroAspectRatio, setHeroAspectRatio] = useState("16 / 9");

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

  // Removed quoteRef and GSAP quote animation in favor of pure CSS transitions
  // for smoother fade in/out without unmount glitches.

  /* Shared glass-card style — capsule shape, smaller size */
  const glassStyle = (variant: "side" | "center") => ({
    padding: "clamp(0.35rem, 1vw, 0.7rem) clamp(1rem, 2.5vw, 2.2rem)",
    // Match Navigation glass pill: subtle translucent white, heavy blur, soft shadow
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(40px) saturate(1.8)",
    WebkitBackdropFilter: "blur(40px) saturate(1.8)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
  });

  const textStyle = {
    fontFamily: "var(--font-headline)",
    fontSize: "clamp(1.2rem, 2.35vw, 2.2rem)",
    fontWeight: 600,
    letterSpacing: "0.06em",
    lineHeight: 1,
    textShadow: "0 2px 6px rgba(0, 0, 0, 0.55)",
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full flex items-start overflow-hidden bg-bg"
    >
      {/* Video background layer */}
      <div className="relative z-0 w-full" style={{ aspectRatio: heroAspectRatio }}>
        {HERO_VIDEOS.map((url, i) => (
          <video
            key={i}
            ref={(el) => { videoRefs.current[i] = el; }}
            muted
            loop
            playsInline
            preload="auto"
            onLoadedMetadata={(event) => {
              if (i === 0) {
                const { videoWidth, videoHeight } = event.currentTarget;
                if (videoWidth && videoHeight) {
                  setHeroAspectRatio(`${videoWidth} / ${videoHeight}`);
                }
              }
            }}
            onEnded={() => handleEnded(i)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0, objectPosition: "center center" }}
          >
            <source src={url} type="video/mp4" />
          </video>
        ))}

        {/* Centered headline — shared for all screens */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 md:px-6">
          <div className="container-wide w-full">
            <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-8 flex-nowrap">
              <div className="relative flex flex-col items-center shrink-0 z-30">
                <div className="overflow-visible shrink-0">
                  <div
                    className="hero-line hero-glass-card"
                    style={{
                      ...glassStyle("side"),
                      padding: "clamp(0.32rem, 1vw, 0.68rem) clamp(0.9rem, 2.4vw, 1.9rem)",
                    }}
                    onMouseEnter={() => handleMouseEnter("think")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span
                      className="text-white uppercase block"
                      style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "clamp(0.9rem, 1.85vw, 1.85rem)",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        lineHeight: 1,
                        textShadow: "0 2px 6px rgba(0, 0, 0, 0.55)",
                      }}
                    >
                      THINK
                    </span>
                  </div>
                </div>
                <div
                  className="absolute top-full left-1/2 mt-3 w-max max-w-[160px] sm:max-w-[220px] pointer-events-none transition-all duration-500 ease-out z-50"
                  style={{
                    opacity: hoveredWord === "think" ? 1 : 0,
                    transform: hoveredWord === "think" ? "translateX(-50%) translateY(0px) translateZ(20px)" : "translateX(-50%) translateY(8px) translateZ(20px)",
                    filter: hoveredWord === "think" ? "blur(0px)" : "blur(3px)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)",
                      fontWeight: 500,
                      fontStyle: "italic",
                      color: "rgba(255, 255, 255, 0.9)",
                      letterSpacing: "0.03em",
                      lineHeight: 1.4,
                      textAlign: "center",
                      textShadow: "0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)",
                    }}
                  >
                    &ldquo;{HERO_QUOTES.think}&rdquo;
                  </p>
                </div>
              </div>

              <div className="hero-line shrink-0" style={{ opacity: 0 }}>
                <span
                  className="block"
                  style={{
                    width: "clamp(4px, 0.5vw, 7px)",
                    height: "clamp(4px, 0.5vw, 7px)",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 0 12px rgba(255, 255, 255, 0.15)",
                  }}
                />
              </div>

              <div className="relative flex flex-col items-center shrink-0 z-30">
                <div className="overflow-visible shrink-0">
                  <div
                    className="hero-line hero-glass-card"
                    style={{
                      ...glassStyle("center"),
                      padding: "clamp(0.32rem, 1vw, 0.68rem) clamp(0.9rem, 2.4vw, 1.9rem)",
                    }}
                    onMouseEnter={() => handleMouseEnter("create")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span
                      className="text-white uppercase block"
                      style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "clamp(0.9rem, 1.85vw, 1.85rem)",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        lineHeight: 1,
                        textShadow: "0 2px 6px rgba(0, 0, 0, 0.55)",
                      }}
                    >
                      CREATE
                    </span>
                  </div>
                </div>
                <div
                  className="absolute top-full left-1/2 mt-3 w-max max-w-[160px] sm:max-w-[220px] pointer-events-none transition-all duration-500 ease-out z-50"
                  style={{
                    opacity: hoveredWord === "create" ? 1 : 0,
                    transform: hoveredWord === "create" ? "translateX(-50%) translateY(0px) translateZ(20px)" : "translateX(-50%) translateY(8px) translateZ(20px)",
                    filter: hoveredWord === "create" ? "blur(0px)" : "blur(3px)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)",
                      fontWeight: 500,
                      fontStyle: "italic",
                      color: "rgba(255, 255, 255, 0.9)",
                      letterSpacing: "0.03em",
                      lineHeight: 1.4,
                      textAlign: "center",
                      textShadow: "0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)",
                    }}
                  >
                    &ldquo;{HERO_QUOTES.create}&rdquo;
                  </p>
                </div>
              </div>

              <div className="hero-line shrink-0" style={{ opacity: 0 }}>
                <span
                  className="block"
                  style={{
                    width: "clamp(4px, 0.5vw, 7px)",
                    height: "clamp(4px, 0.5vw, 7px)",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 0 12px rgba(255, 255, 255, 0.15)",
                  }}
                />
              </div>

              <div className="relative flex flex-col items-center shrink-0 z-30">
                <div className="overflow-visible shrink-0">
                  <div
                    className="hero-line hero-glass-card"
                    style={{
                      ...glassStyle("side"),
                      padding: "clamp(0.32rem, 1vw, 0.68rem) clamp(0.9rem, 2.4vw, 1.9rem)",
                    }}
                    onMouseEnter={() => handleMouseEnter("render")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span
                      className="text-white uppercase block"
                      style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "clamp(0.9rem, 1.85vw, 1.85rem)",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        lineHeight: 1,
                        textShadow: "0 2px 6px rgba(0, 0, 0, 0.55)",
                      }}
                    >
                      RENDER
                    </span>
                  </div>
                </div>
                <div
                  className="absolute top-full left-1/2 mt-3 w-max max-w-[160px] sm:max-w-[220px] pointer-events-none transition-all duration-500 ease-out z-50"
                  style={{
                    opacity: hoveredWord === "render" ? 1 : 0,
                    transform: hoveredWord === "render" ? "translateX(-50%) translateY(0px) translateZ(20px)" : "translateX(-50%) translateY(8px) translateZ(20px)",
                    filter: hoveredWord === "render" ? "blur(0px)" : "blur(3px)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)",
                      fontWeight: 500,
                      fontStyle: "italic",
                      color: "rgba(255, 255, 255, 0.9)",
                      letterSpacing: "0.03em",
                      lineHeight: 1.4,
                      textAlign: "center",
                      textShadow: "0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)",
                    }}
                  >
                    &ldquo;{HERO_QUOTES.render}&rdquo;
                  </p>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>

      {/* Dark cinematic gradient overlay */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.95) 100%)",
        }}
      />

      {/* Subtle decorative arcs */}
      <div className="relative z-2">
        <GeometricLines variant="hero" />
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-2 z-10 lg:flex"
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
