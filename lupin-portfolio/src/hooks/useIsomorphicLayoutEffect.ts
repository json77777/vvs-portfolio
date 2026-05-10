import { useEffect, useLayoutEffect } from "react";

/**
 * SSR-safe useLayoutEffect.
 * Falls back to useEffect on the server to avoid React warnings.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
