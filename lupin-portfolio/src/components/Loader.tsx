"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Lock scroll during loader
    document.body.style.overflow = "hidden";

    const counter = { value: 0 };

    // Animate the counter from 0 to 100
    const countAnim = gsap.to(counter, {
      value: 100,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.floor(counter.value));
      },
      onComplete: () => {
        exitAnimation();
      },
    });

    // Entrance animations
    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(
      ".loader-name-char",
      { y: "120%", rotateX: 90 },
      {
        y: "0%",
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05,
      }
    )
      .fromTo(
        ".loader-tagline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ".loader-counter",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ".loader-progress-bar",
        { scaleX: 0 },
        { scaleX: 1, duration: 2.4, ease: "power2.inOut" },
        0.4
      );

    return () => {
      countAnim.kill();
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function exitAnimation() {
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      },
    });

    // Fade out text elements
    tl.to(".loader-counter", {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(
        ".loader-progress-wrap",
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2"
      )
      .to(
        ".loader-tagline",
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2"
      )
      .to(
        ".loader-name-char",
        {
          y: "-120%",
          rotateX: -90,
          duration: 0.5,
          ease: "power3.in",
          stagger: 0.03,
        },
        "-=0.1"
      )
      // Curtain split reveal
      .to(".loader-curtain-top", {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      })
      .to(
        ".loader-curtain-bottom",
        {
          yPercent: 100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        "<"
      );
  }

  const nameChars = "VISUAL VERSE".split("");

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0"
      style={{ zIndex: 99999 }}
      aria-hidden="true"
    >
      {/* Top curtain half */}
      <div
        className="loader-curtain-top absolute top-0 left-0 w-full h-1/2"
        style={{ backgroundColor: "#0D0D0D", zIndex: 1 }}
      />

      {/* Bottom curtain half */}
      <div
        className="loader-curtain-bottom absolute bottom-0 left-0 w-full h-1/2"
        style={{ backgroundColor: "#0D0D0D", zIndex: 1 }}
      />

      {/* Content overlay — centered on the split line */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ zIndex: 2 }}
      >
        <div className="flex flex-col items-center w-max max-w-full px-4">
          {/* Main name */}
          <div
            className="flex items-center gap-[0.02em] overflow-hidden"
            style={{ perspective: "600px" }}
          >
            {nameChars.map((char, i) => (
              <span
                key={i}
                className="loader-name-char inline-block font-headline text-white"
                style={{
                  fontSize: "clamp(2rem, 8vw, 8rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  transformOrigin: "center bottom",
                  willChange: "transform",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* Tagline / Footer */}
          <span
            className="loader-tagline font-headline mt-1 tracking-widest text-white/80"
            style={{
              fontSize: "clamp(1rem, 3vw, 2rem)",
              letterSpacing: "0.5em",
              opacity: 0,
              textTransform: "uppercase"
            }}
          >
            STUDIOS
          </span>

          {/* Progress bar */}
          <div className="loader-progress-wrap relative mt-4 w-full">
            <div
              className="h-[1px] w-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            />
            <div
              className="loader-progress-bar absolute top-0 left-0 h-[1px] w-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                transformOrigin: "left center",
                transform: "scaleX(0)",
              }}
            />
          </div>

          {/* Counter */}
          <span
            ref={counterRef}
            className="loader-counter font-headline mt-2"
            style={{
              fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.4)",
              opacity: 0,
            }}
          >
            {String(count).padStart(3, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
