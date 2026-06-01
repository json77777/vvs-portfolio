"use client";

import { useRef, useState } from "react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import Footer from "@/components/Footer";

const values = [
  {
    number: "01",
    title: "Authenticity",
    description:
      "Genuine creative expression. Every project tells a true, compelling story that resonates with audiences.",
  },
  {
    number: "02",
    title: "Boldness",
    description:
      "Pushing boundaries and challenging conventions. Work that stands out because it dares to embrace the unconventional.",
  },
  {
    number: "03",
    title: "Craft",
    description:
      "Meticulous attention to detail. From concept to final delivery, every frame, every pixel is carefully considered.",
  },
  {
    number: "04",
    title: "Collaboration",
    description:
      "Great work is born from great partnerships. Open dialogue and shared vision throughout every project.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "10+", label: "Brands Elevated" },
  { value: "5", label: "Years of Craft" },
  { value: "7", label: "Collaborators" },
];

export default function AboutPageClient() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);

  useGSAP(() => {
    if (!pageRef.current) return;

    const heroLines = pageRef.current.querySelectorAll(".about-hero-line");
    heroLines.forEach((line, i) => {
      gsap.fromTo(
        line,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3 + i * 0.12,
        }
      );
    });

    const statValues = pageRef.current.querySelectorAll(".stat-value");
    statValues.forEach((stat) => {
      gsap.fromTo(
        stat,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    const valueCards = pageRef.current.querySelectorAll(".value-card");
    valueCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.fromTo(
      ".philosophy-text",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".philosophy-text",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 bg-bg relative overflow-hidden">
        <div className="container-wide">
          <h1 className="font-headline text-ink leading-[0.88] max-w-5xl"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.02em" }}
          >
            <div className="overflow-hidden">
              <span className="about-hero-line block">WE CRAFT VISUAL</span>
            </div>
            <div className="overflow-hidden">
              <span className="about-hero-line block">
                NARRATIVES{" "}
                <em
                  className="font-accent not-italic"
                  style={{
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "var(--color-ink-muted)",
                  }}
                >
                  for
                </em>{" "}
                BRANDS
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="about-hero-line block">
                THAT DARE TO STAND OUT
              </span>
            </div>
          </h1>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-40 bg-bg-warm relative overflow-hidden">
        {/* Vertical divider */}
        <div
          className="hidden md:block absolute top-0 bottom-0 left-[33%] w-px"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        />

        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            <div>
              <h2 className="font-headline text-h2 md:text-h1 text-ink leading-[0.9]">
                A CREATIVE
                <br />
                <span className="text-ink-faded">WITHOUT LIMITS</span>
              </h2>
            </div>
            <div
              className="philosophy-text md:col-span-2 flex items-end"
              style={{ opacity: 0 }}
            >
              <div>
                <p
                  className="font-accent leading-[1.4] mb-5"
                  style={{
                    fontStyle: "italic",
                    fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                    color: "var(--color-ink)",
                    fontWeight: 300,
                  }}
                >
                  VISUAL VERSE STUDIOS is a team of multidisciplinary creator's —  designer's, editor's, and
                  visual storyteller's crafting work from concept to final frame.
                  Not just production; strategy, design, and direction all in one
                  place.
                </p>
                <p className="font-body text-body text-ink-faded leading-[1.8]">
                  A multidisciplinary approach combining strategy, design, and
                  production expertise to deliver work that transcends
                  expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-32 bg-bg">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-value text-center md:text-left"
                style={{ opacity: 0 }}
              >
                <div
                  className="font-headline text-[3rem] md:text-[4rem] text-ink leading-none mb-2"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {stat.value}
                </div>
                <div className="font-label text-body-sm text-ink-faded tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-40 bg-bg-warm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-border" />
        <div className="container-wide">
          <div className="mb-16 md:mb-24">
            <h2 className="font-headline text-h2 md:text-h1 text-ink leading-[0.9]">
              WHAT DRIVES
              <br />
              EVERYTHING WE DO
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {values.map((value, index) => (
              <div
                key={value.number}
                className={`value-card group py-8 md:py-10 px-6 md:px-8 ${index < 2 ? "border-b border-border" : ""} ${index % 2 === 0 ? "md:border-r md:border-border" : ""}`}
                style={{ opacity: 0 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-headline text-h3 text-ink group-hover:text-ink-muted transition-colors duration-500">
                    {value.title}
                  </h3>
                  <span
                    className="font-accent text-sm text-ink-ghost"
                    style={{ fontStyle: "italic" }}
                  >
                    {value.number}
                  </span>
                </div>
                <p className="font-body text-ink-muted leading-relaxed group-hover:text-ink-light transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48 bg-bg relative overflow-hidden">
        <div className="container-wide">
          <h2
            className="font-headline text-ink leading-[0.9] mb-10"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
          >
            READY TO WORK
            <br />
            TOGETHER?
          </h2>
          <div className="relative inline-block">
            <button
              onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
              className="arrow-link group inline-flex items-center gap-2 font-label text-sm tracking-wide text-ink-muted hover:text-ink transition-colors duration-300"
            >
              <span className="relative">
                Get in touch
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

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 mt-4 pt-2 pb-2 w-48 bg-bg border border-ink/10 rounded-lg shadow-xl transition-all duration-300 origin-top flex flex-col z-50 overflow-hidden ${contactDropdownOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
              <a href="https://discord.gg/QVYzq9yy" target="_blank" rel="noopener noreferrer" onClick={() => setContactDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-ink/5 transition-all duration-200">
                <svg className="w-5 h-5 text-ink" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
                <span className="text-sm font-label tracking-widest text-ink uppercase">Discord</span>
              </a>
              <a href="https://www.instagram.com/visualversestudiosofficial?igsh=Y254dTF1ZmI3eGxi" target="_blank" rel="noopener noreferrer" onClick={() => setContactDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-ink/5 transition-all duration-200">
                <svg className="w-5 h-5 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="text-sm font-label tracking-widest text-ink uppercase">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
