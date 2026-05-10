"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for scoped GSAP animations with automatic cleanup.
 * Prevents memory leaks by reverting all animations on unmount.
 */
export function useGSAP(
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = [],
  scope?: React.RefObject<HTMLElement | null>
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      callback(self);
    }, scope?.current || undefined);

    ctxRef.current = ctx;

    return () => {
      ctx.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const refresh = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  return { refresh };
}

export { gsap, ScrollTrigger };
