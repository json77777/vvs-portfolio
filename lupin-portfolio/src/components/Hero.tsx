"use client";

import { useRef, useEffect } from "react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import GeometricLines from "@/components/GeometricLines";

const HERO_VIDEOS = [
  "https://res.cloudinary.com/dl4f50vlj/video/upload/v1777107837/Final_Promo_fxbnnf.mp4",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(0);

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
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{ backgroundColor: "#0D0D0D" }}
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
            "linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.5) 50%, rgba(13,13,13,0.85) 100%)",
        }}
      />

      {/* Subtle decorative arcs */}
      <div className="relative z-[2]">
        <GeometricLines variant="hero" />
      </div>

      {/* Left-aligned headline */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-24">
        <h1 className="font-headline text-white uppercase" style={{ lineHeight: 0.88 }}>
          <div className="overflow-hidden">
            <span
              className="hero-line block"
              style={{
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              THINK.
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              className="hero-line block"
              style={{
                fontSize: "clamp(4rem, 11vw, 9rem)",
                letterSpacing: "-0.03em",
              }}
            >
              CREATE.
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              className="hero-line block"
              style={{
                fontSize: "clamp(5.5rem, 15vw, 13rem)",
                letterSpacing: "-0.03em",
              }}
            >
              RENDER.
            </span>
          </div>
        </h1>
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
