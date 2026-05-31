"use client";

import React from "react";

/**
 * GeometricLines — subtle decorative arcs & lines
 * Mirrors the flowing curves from prototypestudio.fr
 *
 * Each variant has multiple layered elements:
 * concentric arcs, diagonal sweeps, tangent lines, and flowing curves
 */

type Variant = "about" | "works" | "services" | "cta" | "footer" | "hero";

interface Props {
  variant: Variant;
  className?: string;
}

const S = "#FFFFFF"; // stroke color for dark sections

// --- Helper Glow Components ---
// These components render the original base shape plus two overlapping
// glowing strokes (one wider/fainter, one brighter/thinner) that animate.
const GlowCircle = (props: React.SVGProps<SVGCircleElement>) => (
  <>
    <circle {...props} />
    <circle {...props} opacity={0.3} stroke="#ffffff" strokeWidth={Number(props.strokeWidth || 1) * 3} className="trace-glow-path" pathLength="100" />
    <circle {...props} opacity={0.8} stroke="#ffffff" strokeWidth={Number(props.strokeWidth || 1) * 1.5} className="trace-glow-path" pathLength="100" />
  </>
);

const GlowPath = (props: React.SVGProps<SVGPathElement>) => (
  <>
    <path {...props} />
    <path {...props} opacity={0.3} stroke="#ffffff" strokeWidth={Number(props.strokeWidth || 1) * 3} className="trace-glow-path" pathLength="100" />
    <path {...props} opacity={0.8} stroke="#ffffff" strokeWidth={Number(props.strokeWidth || 1) * 1.5} className="trace-glow-path" pathLength="100" />
  </>
);

const GlowEllipse = (props: React.SVGProps<SVGEllipseElement>) => (
  <>
    <ellipse {...props} />
    <ellipse {...props} opacity={0.3} stroke="#ffffff" strokeWidth={Number(props.strokeWidth || 1) * 3} className="trace-glow-path" pathLength="100" />
    <ellipse {...props} opacity={0.8} stroke="#ffffff" strokeWidth={Number(props.strokeWidth || 1) * 1.5} className="trace-glow-path" pathLength="100" />
  </>
);

const GlowLine = (props: React.SVGProps<SVGLineElement>) => (
  <>
    <line {...props} />
    <line {...props} opacity={0.3} stroke="#ffffff" strokeWidth={Number(props.strokeWidth || 1) * 3} className="trace-glow-path" pathLength="100" />
    <line {...props} opacity={0.8} stroke="#ffffff" strokeWidth={Number(props.strokeWidth || 1) * 1.5} className="trace-glow-path" pathLength="100" />
  </>
);

export default function GeometricLines({ variant, className = "" }: Props) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {variant === "about" && <AboutLines />}
      {variant === "works" && <WorksLines />}
      {variant === "services" && <ServicesLines />}
      {variant === "cta" && <CTALines />}
      {variant === "footer" && <FooterLines />}
      {variant === "hero" && <HeroLines />}
    </div>
  );
}

/* ─── About: large arc top-right + vertical divider + crossing diagonals ─── */
function AboutLines() {
  return (
    <>
      {/* Vertical divider at ~33% */}
      <div
        className="hidden md:block absolute top-0 bottom-0 left-[33.33%] w-px"
        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
      />

      {/* Large arc — top-right, extends off-screen */}
      <svg
        className="absolute -top-[25%] -right-[15%] w-[80vw] h-[80vw] max-w-[1100px] max-h-[1100px]"
        viewBox="0 0 1100 1100"
        fill="none"
      >
        <GlowCircle cx="550" cy="550" r="500" stroke={S} strokeWidth="0.8" opacity="0.09" />
        <GlowCircle cx="550" cy="550" r="380" stroke={S} strokeWidth="0.6" opacity="0.07" />
        <GlowCircle cx="550" cy="550" r="260" stroke={S} strokeWidth="0.5" opacity="0.05" />
      </svg>

      {/* Small arc — bottom-left, peeking in */}
      <svg
        className="absolute -bottom-[20%] -left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]"
        viewBox="0 0 600 600"
        fill="none"
      >
        <GlowCircle cx="300" cy="300" r="280" stroke={S} strokeWidth="0.7" opacity="0.07" />
        <GlowCircle cx="300" cy="300" r="180" stroke={S} strokeWidth="0.5" opacity="0.05" />
      </svg>

      {/* Diagonal sweep — top-left to bottom-right */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
        <GlowPath d="M 1440 0 Q 800 350 0 900" stroke={S} strokeWidth="0.8" opacity="0.08" />
        <GlowPath d="M 1200 0 Q 600 450 -100 700" stroke={S} strokeWidth="0.5" opacity="0.06" />
      </svg>

      {/* Horizontal tangent line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
        <GlowLine x1="0" y1="450" x2="1440" y2="420" stroke={S} strokeWidth="0.5" opacity="0.05" />
      </svg>
    </>
  );
}

/* ─── Works: sweeping arcs flowing through center + criss-cross lines ─── */
function WorksLines() {
  return (
    <>
      {/* Horizontal section divider at top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

      {/* Large centered ellipse */}
      <svg
        className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[1400px] max-h-[1400px]"
        viewBox="0 0 1400 1400"
        fill="none"
      >
        <GlowCircle cx="700" cy="700" r="650" stroke={S} strokeWidth="0.8" opacity="0.08" />
        <GlowCircle cx="700" cy="700" r="480" stroke={S} strokeWidth="0.6" opacity="0.06" />
        <GlowCircle cx="700" cy="700" r="300" stroke={S} strokeWidth="0.5" opacity="0.045" />
      </svg>

      {/* Diagonal sweeps — crossing each other */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 2000" preserveAspectRatio="none" fill="none">
        <GlowPath d="M -100 100 Q 500 500 1540 300" stroke={S} strokeWidth="0.7" opacity="0.07" />
        <GlowPath d="M -100 700 Q 700 950 1540 500" stroke={S} strokeWidth="0.6" opacity="0.06" />
        <GlowPath d="M 1540 100 Q 900 600 -100 800" stroke={S} strokeWidth="0.5" opacity="0.05" />
      </svg>

      {/* Arc from bottom-right */}
      <svg
        className="absolute -bottom-[15%] -right-[15%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px]"
        viewBox="0 0 700 700"
        fill="none"
      >
        <GlowCircle cx="350" cy="350" r="330" stroke={S} strokeWidth="0.7" opacity="0.06" />
      </svg>
    </>
  );
}

/* ─── Services: flowing S-curves with grid-like rhythm ─── */
function ServicesLines() {
  return (
    <>
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

      {/* Large arc — right side, crossing into section */}
      <svg
        className="absolute -top-[35%] -right-[25%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px]"
        viewBox="0 0 900 900"
        fill="none"
      >
        <GlowCircle cx="450" cy="450" r="420" stroke={S} strokeWidth="0.8" opacity="0.08" />
        <GlowCircle cx="450" cy="450" r="310" stroke={S} strokeWidth="0.6" opacity="0.06" />
      </svg>

      {/* S-curve flowing horizontally */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none">
        <GlowPath d="M 0 80 Q 360 280 720 180 Q 1080 80 1440 280" stroke={S} strokeWidth="0.8" opacity="0.07" />
        <GlowPath d="M 0 400 Q 480 200 960 350 Q 1200 450 1440 300" stroke={S} strokeWidth="0.5" opacity="0.055" />
      </svg>

      {/* Left side arc peeking in */}
      <svg
        className="absolute -bottom-[25%] -left-[20%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px]"
        viewBox="0 0 550 550"
        fill="none"
      >
        <GlowCircle cx="275" cy="275" r="260" stroke={S} strokeWidth="0.6" opacity="0.06" />
      </svg>

      {/* Diagonal accent */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none">
        <GlowLine x1="200" y1="600" x2="1300" y2="0" stroke={S} strokeWidth="0.5" opacity="0.04" />
      </svg>
    </>
  );
}

/* ─── CTA: arcs framing the headline ─── */
function CTALines() {
  return (
    <>
      {/* Large arc — bottom-right */}
      <svg
        className="absolute -bottom-[45%] -right-[25%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px]"
        viewBox="0 0 800 800"
        fill="none"
      >
        <GlowCircle cx="400" cy="400" r="370" stroke={S} strokeWidth="0.8" opacity="0.08" />
        <GlowCircle cx="400" cy="400" r="260" stroke={S} strokeWidth="0.6" opacity="0.06" />
      </svg>

      {/* Smaller arc — top-left */}
      <svg
        className="absolute -top-[30%] -left-[15%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px]"
        viewBox="0 0 500 500"
        fill="none"
      >
        <GlowCircle cx="250" cy="250" r="230" stroke={S} strokeWidth="0.6" opacity="0.06" />
      </svg>

      {/* Flowing curve */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 500" preserveAspectRatio="none" fill="none">
        <GlowPath d="M 0 420 Q 500 150 1000 300 Q 1300 400 1440 200" stroke={S} strokeWidth="0.7" opacity="0.07" />
        <GlowPath d="M 0 250 Q 720 450 1440 180" stroke={S} strokeWidth="0.5" opacity="0.05" />
      </svg>
    </>
  );
}

/* ─── Footer: rising arcs, vertical divider, tangent lines ─── */
function FooterLines() {
  return (
    <>
      {/* Vertical divider at ~33% */}
      <div
        className="hidden md:block absolute top-0 bottom-0 left-[33.33%] w-px"
        style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
      />

      {/* Large ellipse from center-top, rising upward */}
      <svg
        className="absolute -top-[35%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vw] max-w-[1100px] max-h-[700px]"
        viewBox="0 0 1100 700"
        fill="none"
      >
        <GlowEllipse cx="550" cy="700" rx="520" ry="520" stroke={S} strokeWidth="0.8" opacity="0.08" />
        <GlowEllipse cx="550" cy="700" rx="380" ry="380" stroke={S} strokeWidth="0.6" opacity="0.06" />
      </svg>

      {/* Diagonal flowing line — bottom-left to top-right */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none" fill="none">
        <GlowPath d="M 100 800 Q 720 350 1350 0" stroke={S} strokeWidth="0.7" opacity="0.07" />
        <GlowPath d="M 400 800 Q 900 500 1440 100" stroke={S} strokeWidth="0.5" opacity="0.055" />
      </svg>

      {/* Small arc — bottom-right */}
      <svg
        className="absolute -bottom-[20%] -right-[15%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px]"
        viewBox="0 0 450 450"
        fill="none"
      >
        <GlowCircle cx="225" cy="225" r="210" stroke={S} strokeWidth="0.6" opacity="0.06" />
      </svg>

      {/* Horizontal tangent */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none" fill="none">
        <GlowLine x1="0" y1="200" x2="1440" y2="180" stroke={S} strokeWidth="0.4" opacity="0.05" />
      </svg>
    </>
  );
}

/* ─── Hero: concentric circles on dark bg with white strokes ─── */
function HeroLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <GlowCircle cx="720" cy="550" r="500" stroke="#ffffff" strokeWidth="0.8" opacity="0.06" />
      <GlowCircle cx="720" cy="550" r="380" stroke="#ffffff" strokeWidth="0.6" opacity="0.045" />
      <GlowCircle cx="720" cy="550" r="250" stroke="#ffffff" strokeWidth="0.5" opacity="0.035" />
      {/* Diagonal accent lines */}
      <GlowPath d="M 0 900 Q 720 400 1440 0" stroke="#ffffff" strokeWidth="0.5" opacity="0.03" />
      <GlowPath d="M 0 0 Q 720 500 1440 900" stroke="#ffffff" strokeWidth="0.4" opacity="0.025" />
    </svg>
  );
}
