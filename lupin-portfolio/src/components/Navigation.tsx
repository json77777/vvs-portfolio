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
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
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
              src="https://res.cloudinary.com/dxvpm6xhq/image/upload/v1779984329/vvlogo-updated_tzg7bh.png" 
              alt="Visual Verse Logo" 
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
            <span
              className={`transition-colors duration-500 ${textColor}`}
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(0.8rem, 1.6vw, 1.15rem)",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              Visual Verse Studios
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

            {/* Contact Dropdown */}
            <div className="relative">
              <MagneticButton as="div" strength={0.2} className="inline-block">
                <button
                  onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
                  className={`font-label text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${textColor} ${hoverColor} flex items-center gap-1.5`}
                >
                  CONTACT
                  <svg 
                    width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`transition-transform duration-300 ${contactDropdownOpen ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </MagneticButton>

              {/* Dropdown Menu */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 py-2 w-44 overflow-hidden bg-bg/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl transition-all duration-300 origin-top flex flex-col ${
                  contactDropdownOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <a href="https://discord.gg/QVYzq9yy" target="_blank" rel="noopener noreferrer" onClick={() => setContactDropdownOpen(false)} className="group flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors duration-200">
                  <svg className="w-4 h-4 text-white transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                  <span className="text-xs font-label tracking-widest text-white uppercase transition-transform duration-200 group-hover:translate-x-1">Discord</span>
                </a>
                <a href="#" onClick={() => setContactDropdownOpen(false)} className="group flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors duration-200">
                  <svg className="w-4 h-4 text-white transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="text-xs font-label tracking-widest text-white uppercase transition-transform duration-200 group-hover:translate-x-1">Instagram</span>
                </a>
              </div>
            </div>

            <div className={`flex items-center gap-2 ml-2 pl-4 border-l transition-colors duration-500 ${inDarkSection && !scrolled ? "border-white/20" : "border-border"
              }`}>
              <MagneticButton as="div" strength={0.15} className="inline-block">
                <a
                  href="https://www.fiverr.com/visual_verse_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-label tracking-widest transition-colors duration-300 ${textColor} ${hoverColor} flex items-center justify-center`}
                  aria-label="Fiverr"
                >
                  <img
                    src="https://res.cloudinary.com/dxvpm6xhq/image/upload/v1780159034/icons8-fiverr-50_inwqny.png"
                    alt="Fiverr"
                    className="w-[18px] h-[18px] object-contain invert"
                  />
                </a>
              </MagneticButton>
              <span className={`transition-colors duration-500 ${inDarkSection && !scrolled ? "text-white/30" : "text-ink-ghost"}`}>/</span>
              <MagneticButton as="div" strength={0.15} className="inline-block">
                <a
                  href="http://www.youtube.com/@vverse-ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-label tracking-widest transition-colors duration-300 ${textColor} ${hoverColor} flex items-center justify-center`}
                  aria-label="YouTube"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                  </svg>
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
        {/* Mobile Contact Dropdown */}
        <div className="flex flex-col items-center gap-6 mt-4">
          <button
            onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
            className="font-headline text-4xl text-ink transition-colors flex items-center gap-3"
          >
            CONTACT
            <svg 
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className={`transition-transform duration-300 ${contactDropdownOpen ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <div className={`flex flex-col items-center gap-6 overflow-hidden transition-all duration-300 ${contactDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
            <a href="https://discord.gg/QVYzq9yy" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="font-headline text-2xl text-ink hover:scale-110 transition-all duration-200 flex items-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
              DISCORD
            </a>
            <a href="#" onClick={() => setMenuOpen(false)} className="font-headline text-2xl text-ink hover:scale-110 transition-all duration-200 flex items-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
