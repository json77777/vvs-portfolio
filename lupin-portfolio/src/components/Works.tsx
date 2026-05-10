"use client";

import { useRef, useState, useCallback, useEffect } from "react";
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

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselAreaRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  const currentIndex = useRef(0);      // integer card index (wraps)
  const isAnimating = useRef(false);   // prevent scroll spam

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

        {/* ── Inner Carousel Stage ─────────────────────── */}
        <div className="relative z-10 pt-16 sm:pt-24 md:pt-32 pb-4">
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
                    className="card-face relative w-full h-full rounded-lg overflow-hidden group"
                    style={{
                      boxShadow: "none",
                      transition: "box-shadow 0.8s ease",
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="280px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    {/* Bottom gradient */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)",
                      }}
                    />
                    {/* Project title */}
                    <div className="absolute bottom-3 left-3 right-3">
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
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="280px"
                        className="object-cover object-bottom"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Info Bar ──────────────────────────────────── */}
        <div
          className="works-info-bar relative z-10 container-wide pb-12 sm:pb-16 md:pb-24"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12 border-t border-white/10 pt-8">
            {/* Left — Counter */}
            <div className="flex-shrink-0">
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
              <span
                className="font-accent text-sm text-white/50 block mt-2"
                style={{ fontStyle: "italic" }}
              >
                {projects[activeIndex].subtitle}
              </span>
              <span
                className="font-accent text-xs text-white/30 block mt-1"
                style={{ fontStyle: "italic" }}
              >
                {projects[activeIndex].category}
              </span>
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
                className="absolute top-0 left-0 h-full bg-white/40 rounded-full transition-all duration-500 ease-out"
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
