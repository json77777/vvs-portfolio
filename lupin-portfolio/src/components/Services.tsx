"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { services } from "@/data/projects";
import GeometricLines from "@/components/GeometricLines";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Service items stagger
    const items = sectionRef.current.querySelectorAll(".service-item");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 sm:py-32 md:py-48 bg-bg-warm overflow-hidden"
    >
      {/* Decorative geometric lines */}
      <GeometricLines variant="services" />

      {/* Services grid — clean horizontal layout like reference */}
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {services.map((service, idx) => (
            <div
              key={service.number}
              className={`service-item group py-8 sm:py-10 px-4 sm:px-6 md:px-8 ${
                idx > 0 ? "md:border-l border-border" : ""
              }`}
              style={{ opacity: 0 }}
            >
              {/* Number — italic serif like reference */}
              <div className="mb-6">
                <span
                  className="font-accent text-base text-ink-faded"
                  style={{ fontStyle: "italic" }}
                >
                  {service.number}.
                </span>
                {/* Title — DeanGothic headline */}
                <h3 className="font-headline text-h4 md:text-h3 text-ink mt-1 group-hover:text-ink-muted transition-colors duration-500">
                  {service.title}
                </h3>
              </div>
              {/* Items — italic serif matching reference's service sub-items */}
              <ul className="space-y-2.5">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="font-accent text-body text-ink-muted group-hover:text-ink transition-colors duration-300"
                    style={{ fontStyle: "italic" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
