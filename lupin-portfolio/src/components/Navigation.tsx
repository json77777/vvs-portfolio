"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/works", label: "WORKS" },
  { href: "/about", label: "ABOUT" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inDarkSection, setInDarkSection] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Check if we're in the hero (dark) section
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        setInDarkSection(heroBottom > 80);
      } else {
        setInDarkSection(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const textColor = inDarkSection && !scrolled ? "text-white" : "text-ink";
  const hoverColor = inDarkSection && !scrolled ? "hover:text-white/70" : "hover:text-ink-muted";

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "border-b border-white/10"
          : "border-b border-transparent"
          }`}
        style={{
          opacity: 0,
          background: scrolled
            ? "rgba(10, 10, 10, 0.7)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none",
          boxShadow: scrolled
            ? "0 4px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
            : "none",
        }}
      >
        <div className="container-wide flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-3 transition-opacity duration-300 hover:opacity-80`}
          >
            <img 
              src="https://res.cloudinary.com/dxvpm6xhq/image/upload/v1778486225/new_png_2_00000_dapjwm.png" 
              alt="Visual Verse Logo" 
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
            <span
              className={`transition-colors duration-500 ${textColor}`}
              style={{
                fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontSize: "clamp(0.7rem, 1.4vw, 1rem)",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              VISUAL VERSE STUDIOS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <MagneticButton as="div" key={link.href} strength={0.2} className="inline-block">
                <Link
                  href={link.href}
                  className={`relative font-label text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${textColor} ${hoverColor} ${pathname === link.href ? "opacity-100" : ""
                    }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px transition-all duration-500 ${inDarkSection && !scrolled ? "bg-white" : "bg-ink"
                      } ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  />
                </Link>
              </MagneticButton>
            ))}

            <MagneticButton as="div" strength={0.2} className="inline-block">
              <a
                href="mailto:hello@visualversestudios.com"
                className={`font-label text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${textColor} ${hoverColor}`}
              >
                CONTACT
              </a>
            </MagneticButton>

            <div className={`flex items-center gap-2 ml-2 pl-4 border-l transition-colors duration-500 ${inDarkSection && !scrolled ? "border-white/20" : "border-border"
              }`}>
              <MagneticButton as="div" strength={0.15} className="inline-block">
                <a
                  href="https://www.fiverr.com/visual_verse_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-label tracking-widest transition-colors duration-300 ${textColor} ${hoverColor}`}
                >
                  Fiverr
                </a>
              </MagneticButton>
              <span className={`transition-colors duration-500 ${inDarkSection && !scrolled ? "text-white/30" : "text-ink-ghost"}`}>/</span>
              <MagneticButton as="div" strength={0.15} className="inline-block">
                <a
                  href="http://www.youtube.com/@vverse-ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-label tracking-widest transition-colors duration-300 ${textColor} ${hoverColor}`}
                >
                  YT
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px transition-all duration-300 ${inDarkSection && !scrolled ? "bg-white" : "bg-ink"
                } ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 ${inDarkSection && !scrolled ? "bg-white" : "bg-ink"
                } ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-bg/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${menuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-headline text-4xl text-ink transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <a
          href="mailto:hello@visualversestudios.com"
          onClick={() => setMenuOpen(false)}
          className="font-headline text-4xl text-ink transition-colors"
        >
          CONTACT
        </a>
      </div>
    </>
  );
}
