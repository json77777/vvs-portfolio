"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { projects } from "@/data/projects";
import Image from "next/image";
import GeometricLines from "@/components/GeometricLines";

const TOTAL = projects.length;

/*
 * INNER CAROUSEL — like standing INSIDE a cylinder looking at
 * cards pinned to the inner wall.
 *
 * CENTER card is the DEEPEST (furthest from viewer) → appears smallest.
 * SIDE cards come TOWARD the viewer → appear LARGER due to perspective.
 * Side cards tilt INWARD (their outer edges come forward).
 *
 * This matches the SonduckFilm "Inner Carousel" After Effects tutorial.
 * INFINITE LOOP — after last card wraps back to first.
 *
 * Scroll is LOCAL — only the carousel moves when you scroll over it.
 * The rest of the page scrolls normally.
 */

// Geometry
const CYLINDER_RADIUS = 800;  // large radius → wider horizontal spread
const ANGLE_PER_CARD = 30;    // degrees between each card
const CARD_WIDTH = 300;       // 3:4 ratio
const CARD_HEIGHT = 400;
const CARD_GAP = 3;           // minimal gap between cards

// The center card will be pushed BACK by this amount
const CENTER_DEPTH = -250;    // negative Z = deeper into screen

function MobileWorksCard({ project }: { project: (typeof projects)[number] }) {
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  const hasVideo = !!(project.videoHover || project.youtubeId);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (playing) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [playing]);

  return (
    <>
      <article
        className="shrink-0 snap-center group"
        style={{ width: "78vw", maxWidth: "320px" }}
        onClick={() => hasVideo && setPlaying(true)}
      >
        <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-[1.02] ${hasVideo ? "cursor-pointer" : ""}`}>

          {/* Premium Inner glass bezel */}
          <div className="absolute inset-0 z-30 pointer-events-none rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />

          {/* Play button overlay */}
          {hasVideo && (
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                <svg className="w-6 h-6 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Seamless Image Area */}
          <div className="relative z-10 w-full bg-black overflow-hidden" style={{ aspectRatio: "4 / 4.5" }}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 82vw, 340px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              loading="lazy"
            />
            {/* Gradient fade to seamless black at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0a0a0a] pointer-events-none" />
          </div>

          {/* Text Area perfectly blended */}
          <div className="relative z-20 px-6 pb-7 pt-1">
            <p className="font-label text-[10px] tracking-[0.25em] uppercase text-white/50 mb-1.5 font-medium">
              {project.subtitle}
            </p>
            <h3 className="font-headline text-[1.65rem] leading-[1.05] text-white tracking-tight">
              {project.title}
            </h3>
          </div>
        </div>
      </article>

      {/* Fullscreen Video Modal using Portal */}
      {mounted && playing && typeof window !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md px-4 pt-24 pb-6"
          onClick={() => setPlaying(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-200"
            onClick={() => setPlaying(false)}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div
            className="w-full max-w-2xl rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {project.youtubeId ? (
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={project.title}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            ) : project.videoHover ? (
              <video
                src={project.videoHover}
                autoPlay
                controls
                playsInline
                className="w-full max-h-[80vh] object-contain bg-black"
              />
            ) : null}
            <div className="px-5 py-4 bg-[#0a0a0a]">
              <p className="font-label text-[10px] tracking-[0.25em] uppercase text-white/50 mb-1">{project.subtitle}</p>
              <h3 className="font-headline text-xl text-white">{project.title}</h3>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselAreaRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  const currentIndex = useRef(0);      // integer card index (wraps)
  const isAnimating = useRef(false);   // prevent scroll spam

  const scrollMobile = useCallback((direction: -1 | 1) => {
    const el = mobileScrollRef.current;
    if (!el) return;

    const card = el.querySelector("article");
    const cardWidth = card ? card.getBoundingClientRect().width : 320;
    const gap = 16;

    el.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  }, []);

  /* ── Position cards on INNER cylinder ── */
  const layoutCards = useCallback((centerIdx: number, dur = 0.5) => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    // Wrap to valid range
    const centerFloat = ((centerIdx % TOTAL) + TOTAL) % TOTAL;

    cards.forEach((card, i) => {
      if (!card) return;

      // MODULAR OFFSET
      let offset = i - centerFloat;
      offset = ((offset % TOTAL) + TOTAL + TOTAL / 2) % TOTAL - TOTAL / 2;
      const absOffset = Math.abs(offset);

      // Angle on the cylinder
      const angle = offset * ANGLE_PER_CARD;
      const angleRad = (angle * Math.PI) / 180;

      const translateX = CYLINDER_RADIUS * Math.sin(angleRad) + (offset * CARD_GAP);
      const translateZ = CENTER_DEPTH + CYLINDER_RADIUS * (1 - Math.cos(angleRad));

      // Side cards tilt INWARD toward center
      const rotateY = -angle * 0.7;
      card.style.setProperty("--card-tilt", `${rotateY}deg`);

      const zIndex = absOffset < 0.5
        ? 100
        : Math.round(50 - absOffset * 5);

      // Hide cards more than 3 positions away — prevents flashing
      const visible = absOffset <= 3;

      gsap.to(card, {
        x: translateX,
        z: translateZ,
        rotateY: rotateY,
        scale: 1,
        zIndex,
        opacity: visible ? 1 : 0,
        duration: dur,
        ease: dur > 0.8 ? "power3.inOut" : "power3.out",
        overwrite: "auto",
      });
    });

    // Update active index
    const clamped = Math.round(centerFloat) % TOTAL;
    if (clamped !== activeRef.current) {
      activeRef.current = clamped;
      setActiveIndex(clamped);
    }
  }, []);

  /* ── Smooth snap: 1 scroll = 1 card ── */
  const goToIndex = useCallback((targetIdx: number, duration = 0.5) => {
    isAnimating.current = true;
    const proxy = { val: currentIndex.current };

    gsap.to(proxy, {
      val: targetIdx,
      duration,
      ease: "power2.out",
      onUpdate: () => layoutCards(proxy.val),
      onComplete: () => {
        currentIndex.current = targetIdx;
        isAnimating.current = false;
        layoutCards(targetIdx);
      },
    });
  }, [layoutCards]);

  /* ── LOCAL wheel event — 1 scroll tick = 1 card move ── */
  useEffect(() => {
    const el = carouselAreaRef.current;
    if (!el) return;

    const getLenis = (): any => (window as any).__lenis;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isAnimating.current) return; // ignore while animating

      // Determine direction: +1 or -1
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIdx = currentIndex.current + direction;
      goToIndex(nextIdx);
    };

    const onEnter = () => {
      const lenis = getLenis();
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
    };

    const onLeave = () => {
      const lenis = getLenis();
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      const lenis = getLenis();
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    };
  }, [layoutCards, goToIndex]);

  /* ── Entry animation ── */
  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    gsap.set(cards, { y: 80, opacity: 0, scale: 0.9 });
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.04,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      onComplete: () => {
        layoutCards(0, 1.5);
        // Fade in shadows and reflections after scatter
        gsap.to(".card-face", {
          boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
          duration: 1.2,
          delay: 0.8,
          ease: "power2.out",
        });
        gsap.to(".card-reflection", {
          opacity: 0.15,
          duration: 1.2,
          delay: 0.8,
          ease: "power2.out",
        });
      },
    });

    // Info bar entry
    gsap.fromTo(
      ".works-info-bar",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // PROJECT GALLERY heading micro-animations
    const galleryTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".project-gallery-heading",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    // Title text fades in and slides up
    galleryTl.fromTo(
      ".gallery-title",
      { opacity: 0, y: 16, letterSpacing: "0.08em" },
      { opacity: 1, y: 0, letterSpacing: "0.25em", duration: 0.8, ease: "power3.out" }
    );

    // Lines expand outward from center
    galleryTl.fromTo(
      ".gallery-line-left, .gallery-line-right",
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    );

    // Diamond accents scale in with rotation
    galleryTl.fromTo(
      ".gallery-diamond",
      { scale: 0, opacity: 0, rotation: 0 },
      { scale: 1, opacity: 1, rotation: 45, duration: 0.4, ease: "back.out(2)", stagger: 0.1 },
      "-=0.4"
    );

    // Instruction text fade in
    galleryTl.fromTo(
      ".gallery-instruction",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

    // Subtle continuous glow pulse on diamonds
    gsap.to(".gallery-diamond", {
      boxShadow: "0 0 8px rgba(255,255,255,0.4)",
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });
  }, [layoutCards]);

  /* ── Click title to jump ── */
  const goTo = (index: number) => {
    const cur = ((currentIndex.current % TOTAL) + TOTAL) % TOTAL;
    let diff = index - cur;
    if (diff > TOTAL / 2) diff -= TOTAL;
    if (diff < -TOTAL / 2) diff += TOTAL;
    goToIndex(currentIndex.current + diff, 0.6);
  };

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative bg-bg-dark"
      style={{ overflow: "visible" }}
    >
      <div className="relative w-full">
        <GeometricLines variant="works" />
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

        {/* ── Subtle spotlight behind carousel ── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            top: "15%",
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />

        {/* ── Mobile Swipe Carousel ─────────────────────── */}
        <div className="relative z-10 pt-12 pb-8 lg:hidden">
          <div className="container-wide">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-label text-[10px] tracking-[0.28em] uppercase text-white/45">
                  Project Gallery
                </p>
                <h2 className="mt-1 font-headline text-4xl leading-[0.9] text-white">
                  Swipe to explore
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollMobile(-1)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition-colors hover:bg-white/10"
                  aria-label="Scroll works left"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollMobile(1)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition-colors hover:bg-white/10"
                  aria-label="Scroll works right"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={mobileScrollRef}
              className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
            >
              {projects.map((project) => (
                <MobileWorksCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Inner Carousel Stage ─────────────────────── */}
        <div className="relative z-10 hidden pt-16 sm:pt-24 lg:block lg:pt-32 pb-4">
          {/* PROJECT GALLERY heading with decorative lines */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-2 sm:mb-3 project-gallery-heading">
            {/* Left decorative line */}
            <div
              className="gallery-line-left h-px shrink-0"
              style={{
                width: "clamp(40px, 8vw, 120px)",
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4))",
              }}
            />
            {/* Small diamond accent */}
            <div
              className="gallery-diamond"
              style={{
                width: "5px",
                height: "5px",
                background: "rgba(255,255,255,0.5)",
                transform: "rotate(45deg)",
                flexShrink: 0,
              }}
            />
            <h2
              className="text-center text-white uppercase gallery-title"
              style={{
                fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontSize: "clamp(0.7rem, 1.4vw, 1rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "0.25em",
                flexShrink: 0,
              }}
            >
              PROJECT GALLERY
            </h2>
            {/* Small diamond accent */}
            <div
              className="gallery-diamond"
              style={{
                width: "5px",
                height: "5px",
                background: "rgba(255,255,255,0.5)",
                transform: "rotate(45deg)",
                flexShrink: 0,
              }}
            />
            {/* Right decorative line */}
            <div
              className="gallery-line-right h-px shrink-0"
              style={{
                width: "clamp(40px, 8vw, 120px)",
                background: "linear-gradient(to left, transparent, rgba(255,255,255,0.4))",
              }}
            />
          </div>

          {/* Instruction text */}
          <div className="hidden text-center mb-8 sm:mb-10 gallery-instruction lg:block" style={{ opacity: 0 }}>
            <span className="font-accent text-xs sm:text-sm text-white/50 tracking-wide" style={{ fontStyle: "italic" }}>
              Hover the cursor over the tiles to play.
            </span>
          </div>

          <div
            ref={carouselAreaRef}
            className="relative w-full flex items-center justify-center"
            style={{
              perspective: "900px",
              perspectiveOrigin: "center 45%",
              height: `${CARD_HEIGHT + 200}px`,
              cursor: "grab",
            }}
          >
            <div
              ref={stageRef}
              className="relative"
              style={{
                transformStyle: "preserve-3d",
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
              }}
            >
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className="absolute top-0 left-0 cursor-pointer"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    willChange: "transform",
                  }}
                  onClick={() => goTo(i)}
                >
                  {/* ── Card face ── */}
                  <div
                    className="card-face relative w-full h-full rounded-none overflow-hidden group border border-white/15 bg-[#050505]"
                    style={{
                      boxShadow: "none",
                      transition: "box-shadow 0.8s ease",
                    }}
                    onMouseEnter={(e) => {
                      const vids = e.currentTarget.parentElement?.querySelectorAll("video");
                      vids?.forEach((vid, index) => {
                        if (index === 0) {
                          vid.muted = false;
                          vid.volume = 0.5;
                        }
                        vid.play().catch(() => {});
                      });
                      const iframe = e.currentTarget.querySelector("iframe") as HTMLIFrameElement;
                      if (iframe?.contentWindow) {
                        iframe.contentWindow.postMessage(
                          JSON.stringify({ event: "command", func: "unMute", args: [] }),
                          "*"
                        );
                        iframe.contentWindow.postMessage(
                          JSON.stringify({ event: "command", func: "playVideo", args: [] }),
                          "*"
                        );
                      }
                    }}
                    onMouseMove={(e) => {
                      const vid = e.currentTarget.querySelector("video");
                      if (vid && vid.muted) {
                        vid.muted = false;
                        vid.volume = 0.5;
                        vid.play().catch(() => {});
                      }
                    }}
                    onMouseLeave={(e) => {
                      const vids = e.currentTarget.parentElement?.querySelectorAll("video");
                      vids?.forEach((vid) => {
                        vid.muted = true;
                        vid.pause();
                      });
                      const iframe = e.currentTarget.querySelector("iframe") as HTMLIFrameElement;
                      if (iframe?.contentWindow) {
                        iframe.contentWindow.postMessage(
                          JSON.stringify({ event: "command", func: "mute", args: [] }),
                          "*"
                        );
                        iframe.contentWindow.postMessage(
                          JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
                          "*"
                        );
                      }
                    }}
                  >
                    <div className="absolute inset-0 z-20 pointer-events-none border border-white/10 opacity-50 mix-blend-overlay" />

                    {/* Static thumbnail (only when no video and no youtube) */}
                    {!project.videoHover && !project.youtubeId && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="280px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}

                    {/* Video — paused by default, plays and unmutes on hover */}
                    {project.videoHover && (
                      <video
                        src={project.videoHover}
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}

                    {/* YouTube embed — paused by default, plays and unmutes on hover */}
                    {project.youtubeId && (
                      <iframe
                        src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=0&mute=1&loop=1&playlist=${project.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                        title={project.title}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-0"
                        style={{ pointerEvents: "none" }}
                      />
                    )}

                    {/* Bottom gradient */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)",
                      }}
                    />
                    {/* Project title */}
                    <div
                      className="absolute bottom-3 left-3 right-3"
                      style={{ transform: "translateZ(24px) rotateY(calc(var(--card-tilt) * -1))" }}
                    >
                      <span
                        className="font-headline text-white text-[10px] tracking-[0.14em] uppercase opacity-90"
                      >
                        {project.title}
                      </span>
                    </div>
                  </div>

                  {/* ── Floor reflection ── */}
                  <div
                    className="card-reflection absolute left-0 w-full overflow-hidden rounded-b-lg pointer-events-none"
                    style={{
                      top: `${CARD_HEIGHT}px`,
                      height: `${CARD_HEIGHT * 0.35}px`,
                      transform: "scaleY(-1)",
                      opacity: 0,
                      maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 80%)",
                      WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 80%)",
                      filter: "blur(2px)",
                    }}
                  >
                    <div className="relative w-full h-full">
                      {project.videoHover ? (
                        <video
                          src={project.videoHover}
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover object-bottom"
                        />
                      ) : project.youtubeId ? (
                        <Image
                          src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`}
                          alt=""
                          fill
                          sizes="280px"
                          className="object-cover object-bottom"
                        />
                      ) : (
                        <Image
                          src={project.image}
                          alt=""
                          fill
                          sizes="280px"
                          className="object-cover object-bottom"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Info Bar ──────────────────────────────────── */}
        <div
          className="works-info-bar relative z-10 container-wide pb-12 sm:pb-16 lg:pb-24 hidden lg:block"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12 border-t border-white/10 pt-8">
            {/* Left — Counter */}
            <div className="shrink-0">
              <div className="flex items-baseline gap-1">
                <span
                  className="font-headline leading-none text-white"
                  style={{
                    fontSize: "clamp(4rem, 10vw, 8rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-headline text-white/40 leading-none"
                  style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  /{String(TOTAL).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Right — Project title list */}
            <div className="flex flex-wrap md:flex-col items-start md:items-end gap-0.5">
              {projects.map((project, i) => (
                <button
                  key={project.id}
                  onClick={() => goTo(i)}
                  className="group/title relative text-right transition-all duration-400"
                  style={{
                    opacity: i === activeIndex ? 1 : 0.2,
                    transform: i === activeIndex ? "translateX(0)" : "translateX(4px)",
                  }}
                >
                  <span
                    className="font-headline block leading-[1.35] text-white transition-all duration-300 hover:opacity-80"
                    style={{
                      fontSize: "clamp(0.7rem, 1.3vw, 1.1rem)",
                      letterSpacing: "0.06em",
                      fontWeight: i === activeIndex ? 700 : 400,
                    }}
                  >
                    {project.title}
                  </span>
                  <span
                    className="absolute -bottom-px right-0 h-px bg-white transition-all duration-500 ease-out"
                    style={{ width: i === activeIndex ? "100%" : "0%" }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="relative h-px bg-white/8 overflow-hidden rounded-full" style={{ width: "140px" }}>
              <div
                className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((activeIndex + 1) / TOTAL) * 100}%` }}
              />
            </div>
            <span className="font-accent text-[10px] text-white/20 tracking-widest uppercase" style={{ fontStyle: "italic" }}>
              Scroll to explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
