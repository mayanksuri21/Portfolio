"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.82,
    });

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
