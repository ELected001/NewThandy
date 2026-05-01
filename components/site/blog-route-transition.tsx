"use client";

import { useEffect, useState, type PropsWithChildren } from "react";

type TransitionPhase = "idle" | "entering" | "ready";

export function BlogRouteTransition({ children }: PropsWithChildren) {
  const [phase, setPhase] = useState<TransitionPhase>("idle");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let timeoutId: number | null = null;
    const frameId = window.requestAnimationFrame(() => {
      setPhase("entering");
      timeoutId = window.setTimeout(() => setPhase("ready"), 180);
    });

    return () => {
      window.cancelAnimationFrame(frameId);

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="blog-route-frame" data-phase={phase}>
      <div aria-hidden="true" className="blog-route-veil" />
      <div className="blog-route-content">{children}</div>
    </div>
  );
}
