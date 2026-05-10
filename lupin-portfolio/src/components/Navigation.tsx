"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP, gsap } from "@/hooks/useGSAP";

const navLinks = [
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
            ? "rgba(247, 247, 245, 0.25)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none",
          boxShadow: scrolled
            ? "0 4px 30px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(233, 225, 225, 0.4)"
            : "none",
        }}
      >
        <div className="container-wide flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`font-headline text-2xl md:text-3xl tracking-tight transition-colors duration-500 ${textColor}`}
          >
            Lupin
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
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
            ))}

            <a
              href="mailto:hello@lupin.studio"
              className={`font-label text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${textColor} ${hoverColor}`}
            >
              CONTACT
            </a>

            <div className={`flex items-center gap-2 ml-2 pl-4 border-l transition-colors duration-500 ${inDarkSection && !scrolled ? "border-white/20" : "border-border"
              }`}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs font-label tracking-widest transition-colors duration-300 ${textColor} ${hoverColor}`}
              >
                IG
              </a>
              <span className={`transition-colors duration-500 ${inDarkSection && !scrolled ? "text-white/30" : "text-ink-ghost"}`}>/</span>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs font-label tracking-widest transition-colors duration-300 ${textColor} ${hoverColor}`}
              >
                YT
              </a>
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
          href="mailto:hello@lupin.studio"
          onClick={() => setMenuOpen(false)}
          className="font-headline text-4xl text-ink transition-colors"
        >
          CONTACT
        </a>
      </div>
    </>
  );
}
