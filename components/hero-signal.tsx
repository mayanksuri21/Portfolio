"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export function HeroSignal() {
  const signal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !signal.current) return;

    const context = gsap.context(() => {
      gsap.to(".hero-signal__orbit", { rotate: 360, duration: 28, repeat: -1, ease: "none" });
      gsap.to(".hero-signal__dot", { scale: 1.65, opacity: 0.22, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero-signal__line", { scaleX: 1.15, opacity: 0.72, duration: 4.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, signal);

    return () => context.revert();
  }, []);

  return (
    <div ref={signal} aria-hidden="true" className="hero-signal">
      <div className="hero-signal__orbit" />
      <div className="hero-signal__dot" />
      <div className="hero-signal__line" />
      <span>Build / Explore</span>
    </div>
  );
}
