import { gsap } from "gsap";

/**
 * Reusable animation presets for consistency across components.
 */
export const EASING = {
  smooth: "power3.out",
  snappy: "power2.inOut",
  elastic: "elastic.out(1, 0.3)",
  expo: "expo.out",
} as const;

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  verySlow: 1.2,
} as const;

/** Fade up from below with opacity */
export function fadeUpPreset(target: gsap.TweenTarget, delay = 0) {
  return gsap.fromTo(
    target,
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: DURATION.slow, ease: EASING.smooth, delay }
  );
}

/** Staggered fade up for multiple elements */
export function staggerFadeUp(
  targets: gsap.TweenTarget,
  stagger = 0.1,
  delay = 0
) {
  return gsap.fromTo(
    targets,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: DURATION.slow,
      ease: EASING.smooth,
      stagger,
      delay,
    }
  );
}

/** Text line reveal with clip-path */
export function lineRevealPreset(
  targets: gsap.TweenTarget,
  stagger = 0.08
) {
  return gsap.fromTo(
    targets,
    { y: "100%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: DURATION.slow,
      ease: EASING.smooth,
      stagger,
    }
  );
}

/** Scale in from 0.8 */
export function scaleInPreset(target: gsap.TweenTarget, delay = 0) {
  return gsap.fromTo(
    target,
    { scale: 0.85, opacity: 0 },
    { scale: 1, opacity: 1, duration: DURATION.slow, ease: EASING.smooth, delay }
  );
}

/** Horizontal slide */
export function slideInPreset(
  target: gsap.TweenTarget,
  direction: "left" | "right" = "left",
  delay = 0
) {
  const x = direction === "left" ? -80 : 80;
  return gsap.fromTo(
    target,
    { x, opacity: 0 },
    { x: 0, opacity: 1, duration: DURATION.slow, ease: EASING.smooth, delay }
  );
}
