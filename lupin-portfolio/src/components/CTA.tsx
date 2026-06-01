"use client";

import { useRef, useState } from "react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import GeometricLines from "@/components/GeometricLines";
import MagneticButton from "./MagneticButton";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const lines = sectionRef.current.querySelectorAll(".cta-line");
    lines.forEach((line, i) => {
      gsap.fromTo(
        line,
        { y: "120%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.fromTo(
      ".cta-link",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-link",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 md:py-48 bg-bg overflow-hidden"
    >
      {/* Decorative geometric lines */}
      <GeometricLines variant="cta" />

      <div className="container-wide relative z-10">
        {/* Top divider */}
        <div className="h-px w-full bg-border mb-20" />

        {/* Bold headline — left aligned, matching reference exactly */}
        <h2 className="font-headline text-ink leading-[0.92] max-w-5xl"
          style={{ fontSize: "clamp(2.8rem, 7.5vw, 7rem)", letterSpacing: "-0.02em" }}
        >
          <div className="overflow-hidden">
            <span className="cta-line block">LET&apos;S CRAFT</span>
          </div>
          <div className="overflow-hidden">
            <span className="cta-line block">YOUR PROJECT TOGETHER</span>
          </div>
        </h2>

        {/* Simple contact link — triangle arrow + underline like reference */}
        <div className="cta-link mt-14 inline-block relative" style={{ opacity: 0 }}>
          <MagneticButton as="div" strength={0.4}>
            <button
              onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
              className="arrow-link group inline-flex items-center gap-2 font-label text-base tracking-wide text-ink-muted hover:text-ink transition-colors duration-300"
            >
              <span className="relative">
                Contact us
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-ink-muted scale-x-100 group-hover:scale-x-0 transition-transform duration-500 origin-right" />
              </span>
              <svg 
                className={`w-4 h-4 transition-transform duration-500 group-hover:text-[#E32626] ${contactDropdownOpen ? "rotate-90" : "group-hover:translate-x-1"}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </MagneticButton>

          {/* Dropdown Menu */}
          <div 
            className={`absolute top-full left-0 mt-4 py-2 w-48 overflow-hidden bg-bg border border-ink/10 rounded-lg shadow-xl transition-all duration-300 origin-top flex flex-col z-50 ${
              contactDropdownOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <a href="mailto:visualversestudiosofficial@gmail.com" onClick={() => setContactDropdownOpen(false)} className="group flex items-center gap-3 px-4 py-3 hover:bg-ink/5 transition-colors duration-200">
              <img src="/mail.png" alt="" className="w-5 h-5 object-contain brightness-0 invert" />
              <span className="text-sm font-label tracking-widest text-ink uppercase transition-transform duration-200 group-hover:translate-x-1">Mail</span>
            </a>
            <a href="https://discord.gg/QVYzq9yy" target="_blank" rel="noopener noreferrer" onClick={() => setContactDropdownOpen(false)} className="group flex items-center gap-3 px-4 py-3 hover:bg-ink/5 transition-colors duration-200">
              <svg className="w-5 h-5 text-ink transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
              <span className="text-sm font-label tracking-widest text-ink uppercase transition-transform duration-200 group-hover:translate-x-1">Discord</span>
            </a>
            <a href="https://www.instagram.com/visualversestudiosofficial?igsh=Y254dTF1ZmI3eGxi" target="_blank" rel="noopener noreferrer" onClick={() => setContactDropdownOpen(false)} className="group flex items-center gap-3 px-4 py-3 hover:bg-ink/5 transition-colors duration-200">
              <svg className="w-5 h-5 text-ink transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="text-sm font-label tracking-widest text-ink uppercase transition-transform duration-200 group-hover:translate-x-1">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
