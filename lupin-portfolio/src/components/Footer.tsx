"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import GeometricLines from "@/components/GeometricLines";

const REEL_VIDEO_URL =
  "https://res.cloudinary.com/dl4f50vlj/video/upload/v1777107837/Final_Promo_fxbnnf.mp4";

const footerLinks = [
  { href: "/works", label: "WORKS" },
  { href: "/about", label: "ABOUT" },
  { href: "mailto:hello@lupin.studio", label: "CONTACT" },
];

const legalLinks = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Legals" },
  { href: "#", label: "Credits" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  /* ── Open / Close ────────────────────── */
  const openModal = useCallback(() => {
    setModalOpen(true);
    setIsPlaying(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setIsPlaying(false);
    document.body.style.overflow = "";
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  }, []);

  /* ── Play / Pause toggle ─────────────── */
  const togglePlay = useCallback(() => {
    const vid = modalVideoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => { });
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }, []);

  /* ── Auto-play when modal opens ──────── */
  useEffect(() => {
    if (modalOpen && modalVideoRef.current) {
      modalVideoRef.current.play().catch(() => { });
    }
  }, [modalOpen]);

  /* ── Escape key to close ─────────────── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (modalOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen, closeModal]);

  useGSAP(() => {
    if (!footerRef.current) return;

    const links = footerRef.current.querySelectorAll(".footer-big-link");
    links.forEach((link, i) => {
      gsap.fromTo(
        link,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: link,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.fromTo(
      ".footer-reel",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-reel",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <>
      <footer
        ref={footerRef}
        className="relative bg-bg-warm pt-20 pb-8 overflow-hidden"
      >
        {/* Decorative geometric lines */}
        <GeometricLines variant="footer" />

        <div className="container-wide relative z-10">
          <div className="flex flex-col md:flex-row gap-12 md:gap-8 mb-20">
            {/* Reel — clickable thumbnail */}
            <div
              className="footer-reel md:w-1/3"
              style={{ opacity: 0 }}
            >
              <div
                onClick={openModal}
                className="relative aspect-video rounded-lg overflow-hidden bg-surface group cursor-pointer"
              >
                {/* Thumbnail poster from the video */}
                <video
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={REEL_VIDEO_URL} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-br from-ink/10 to-ink/5 group-hover:from-ink/15 group-hover:to-ink/10 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-ink-muted group-hover:text-ink transition-colors duration-300">
                    <span className="text-xs">▸</span>
                    <span
                      className="font-accent text-base"
                      style={{ fontStyle: "italic" }}
                    >
                      Play
                    </span>
                  </div>
                </div>
                <div
                  className="absolute top-3 left-4 font-accent text-xl text-ink/30"
                  style={{ fontStyle: "italic" }}
                >
                  Reel
                </div>
                <div className="absolute bottom-3 right-4 font-headline text-2xl text-ink/15">
                  2025
                </div>
              </div>
            </div>

            {/* Giant Navigation Links — right aligned like reference */}
            <div className="md:w-2/3 flex flex-col items-end justify-end gap-1">
              {footerLinks.map((link) => (
                <div
                  key={link.label}
                  className="overflow-hidden footer-big-link"
                  style={{ opacity: 0 }}
                >
                  {link.href.startsWith("mailto") ? (
                    <a
                      href={link.href}
                      className="font-headline text-[3rem] md:text-[5rem] lg:text-[7rem] leading-[0.9] text-ink hover:text-ink-muted transition-colors duration-500 tracking-tight block"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-headline text-[3rem] md:text-[5rem] lg:text-[7rem] leading-[0.9] text-ink hover:text-ink-muted transition-colors duration-500 tracking-tight block"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-label text-caption tracking-wider uppercase text-ink-ghost hover:text-ink-muted transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <span
                className="font-label text-caption text-ink-ghost"
                suppressHydrationWarning
              >
                © 2026 Lupin
              </span>
              <button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="group flex items-center gap-2 font-label text-caption tracking-wider uppercase text-ink-ghost hover:text-ink-muted transition-colors duration-300"
              >
                Back to top
                <svg
                  className="w-3 h-3 transform group-hover:-translate-y-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Video Modal Overlay ──────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(12px)" }}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-10 text-white/60 hover:text-white transition-colors duration-300"
            aria-label="Close video"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>

          {/* Video container — 16:9 ratio, ~85% of viewport */}
          <div
            className="relative w-[90vw] max-w-[85vw] max-h-[85vh]"
            style={{ aspectRatio: "16 / 9" }}
          >
            <video
              ref={modalVideoRef}
              className="w-full h-full object-contain rounded-lg"
              playsInline
              onClick={togglePlay}
              style={{ cursor: "pointer" }}
            >
              <source src={REEL_VIDEO_URL} type="video/mp4" />
            </video>

            {/* Play / Pause overlay button */}
            <button
              onClick={togglePlay}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              {isPlaying ? (
                /* Pause icon */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                /* Play icon */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5.14v13.72a1 1 0 001.5.86l11.14-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
                </svg>
              )}
              <span
                className="text-white/80 text-sm tracking-wide"
                style={{ fontFamily: "var(--font-accent, serif)", fontStyle: "italic" }}
              >
                {isPlaying ? "Pause" : "Play"}
              </span>
            </button>
          </div>

          {/* Click backdrop to close */}
          <div className="absolute inset-0 -z-10" onClick={closeModal} />
        </div>
      )}
    </>
  );
}
