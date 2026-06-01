"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  /* Close mobile drawer on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* Lock body scroll when mobile drawer is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* GSAP entrance */
  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.15 }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed left-1/2 top-3 md:top-5 z-100 w-full max-w-5xl -translate-x-1/2 px-3 md:px-8"
      style={{ opacity: 0 }}
    >
      {/* ── Floating Glass Pill ─────────────────────────────── */}
      <nav
        className="flex w-full items-center justify-between rounded-[18px] border border-white/12 px-4 md:px-6 py-2.5 md:py-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(40px) saturate(1.8)",
          WebkitBackdropFilter: "blur(40px) saturate(1.8)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* ── Left: Logo + Name ──────────────────────────────── */}
        <Link
          href="/"
          aria-label="Go to Home"
          className="flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-80"
        >
          <img
            src="https://res.cloudinary.com/dxvpm6xhq/image/upload/v1779984329/vvlogo-updated_tzg7bh.png"
            alt="Visual Verse logo"
            className="w-6.5 h-6.5 md:w-8 md:h-8 object-contain"
          />
          <span
            className="text-white font-extrabold text-sm md:text-lg"
            style={{
              fontFamily: "var(--font-syne)",
              letterSpacing: "-0.04em",
            }}
          >
            Visual Verse Studios
          </span>
        </Link>

        {/* ── Center: Desktop Nav Links ──────────────────────── */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <MagneticButton
                as="div"
                key={link.href}
                strength={0.2}
                className="inline-block"
              >
                <Link
                  href={link.href}
                  className="group relative pb-0.5 transition-colors hover:text-white"
                >
                  <span
                    className={`text-[15px] tracking-tight font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-white/60 group-hover:text-white"
                      }`}
                    style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                  >
                    {link.label}
                  </span>
                  {/* Glowing underline */}
                  <span
                    className={`absolute inset-x-0 -bottom-1 h-0.5 bg-white rounded-full transition-all duration-300 ${isActive
                      ? "scale-x-100 opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50 group-hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                      }`}
                  />
                </Link>
              </MagneticButton>
            );
          })}

          {/* Contact dropdown */}
          <div className="group/contact relative">
            <MagneticButton as="div" strength={0.2} className="inline-block">
              <button
                className="group relative pb-0.5 transition-colors hover:text-white flex items-center gap-1.5"
              >
                <span
                  className="text-[15px] tracking-tight font-semibold text-white/60 group-hover:text-white transition-colors duration-300"
                  style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                >
                  Contact
                </span>
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/50 transition-transform duration-300 group-hover/contact:-rotate-90"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white rounded-full transition-all duration-300 scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50 group-hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
              </button>
            </MagneticButton>

            {/* Contact hover dropdown */}
            <div className="absolute left-1/2 top-full z-50 pt-6 w-48 -translate-x-1/2 opacity-0 pointer-events-none transition-all duration-300 translate-y-2 group-hover/contact:translate-y-0 group-hover/contact:pointer-events-auto group-hover/contact:opacity-100 group-focus-within/contact:pointer-events-auto group-focus-within/contact:opacity-100">
              <div
                className="rounded-xl border border-white/8 p-2"
                style={{
                  background: "rgba(10,10,10,0.95)",
                  backdropFilter: "blur(40px)",
                  boxShadow:
                    "0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.03)",
                }}
              >
                <a
                  href="mailto:visualversestudiosofficial@gmail.com"
                  className="flex items-center justify-between rounded-lg px-4 py-2.5 text-[14px] tracking-normal font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <img src="/mail.png" alt="" className="w-4 h-4 object-contain brightness-0 invert" />
                    Mail
                  </span>
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none" className="text-white/40">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="https://discord.gg/QVYzq9yy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg px-4 py-2.5 text-[14px] tracking-normal font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    </svg>
                    Discord
                  </span>
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none" className="text-white/40">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/visualversestudiosofficial?igsh=Y254dTF1ZmI3eGxi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg px-4 py-2.5 text-[14px] tracking-normal font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <img src="/instagram.png" alt="" className="w-4 h-4 object-contain brightness-0 invert" />
                    Instagram
                  </span>
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none" className="text-white/40">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Compact Icon Cluster ────────────────────── */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Desktop social icons */}
          <div className="hidden md:flex items-center gap-1.5">
            {/* <MagneticButton as="div" strength={0.15} className="inline-block">
              <a
                href="https://www.instagram.com/visualversestudiosofficial?igsh=Y254dTF1ZmI3eGxi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </MagneticButton> */}
            <MagneticButton as="div" strength={0.15} className="inline-block">
              <a
                href="https://www.fiverr.com/visual_verse_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fiverr"
                className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10 transition-colors"
              >
                <img
                  src="https://res.cloudinary.com/dxvpm6xhq/image/upload/v1780159034/icons8-fiverr-50_inwqny.png"
                  alt=""
                  className="w-4.5 h-4.5 object-contain invert opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
            </MagneticButton>
            <MagneticButton as="div" strength={0.15} className="inline-block">
              <a
                href="http://www.youtube.com/@vverse-ae"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                </svg>
              </a>
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8.5 h-8.5 rounded-full bg-white/5 border border-white/10 transition-colors hover:bg-white/10"
            aria-label="Toggle menu"
          >
            <div
              className={`w-3.5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-px" : "-translate-y-0.75"
                }`}
            />
            <div
              className={`w-3.5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[0.5px]" : "translate-y-0.75"
                }`}
            />
          </button>
        </div>
      </nav>

      {/* ── Translucent Mobile Drawer ────────────────────────── */}
      <div
        className={`absolute top-full left-4 right-4 mt-2.5 p-4 rounded-[18px] border border-white/12 transition-all duration-300 md:hidden ${menuOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        style={{
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex flex-col gap-5 text-[15px] font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`transition-colors duration-200 ${isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Contact links in drawer */}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-4">
            <span
              className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium"
              style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
            >
              SOCIALS
            </span>
            <a
              href="mailto:visualversestudiosofficial@gmail.com"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-[14px]"
            >
              <img src="/mail.png" alt="" className="w-4 h-4 object-contain brightness-0 invert" />
              Mail
            </a>
            <a
              href="https://discord.gg/QVYzq9yy"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-[14px]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
              Discord
            </a>
            <a
              href="https://www.instagram.com/visualversestudiosofficial?igsh=Y254dTF1ZmI3eGxi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-[14px]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>
            <a
              href="http://www.youtube.com/@vverse-ae"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-[14px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
              </svg>
              YouTube
            </a>
            <a
              href="https://www.fiverr.com/visual_verse_/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-[14px]"
            >
              <img
                src="https://res.cloudinary.com/dxvpm6xhq/image/upload/v1780159034/icons8-fiverr-50_inwqny.png"
                alt=""
                className="w-4 h-4 object-contain invert"
              />
              Fiverr
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
