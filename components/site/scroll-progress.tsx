"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "motion/react";
import { smoothScrollToElement, type SmoothScrollHandle } from "@/lib/smooth-scroll";

function highlightTarget(target: HTMLElement) {
  target.classList.remove("scroll-target-pulse");
  window.requestAnimationFrame(() => {
    target.classList.add("scroll-target-pulse");
    window.setTimeout(() => target.classList.remove("scroll-target-pulse"), 1450);
  });
}

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

export function ScrollExperience() {
  const pathname = usePathname();
  const scrollHandle = useRef<SmoothScrollHandle | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 30,
    mass: 0.32,
    stiffness: 155,
  });

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");

      if (!anchor || anchor.target || anchor.hasAttribute("download")) {
        return;
      }

      const url = new URL(anchor.href);

      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
        return;
      }

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));

      if (!target) {
        return;
      }

      event.preventDefault();
      scrollHandle.current?.cancel();
      window.history.pushState(null, "", `${url.pathname}${url.hash}`);

      const handle = smoothScrollToElement(target, {
        minDuration: 940,
        maxDuration: 1800,
        distanceFactor: 0.5,
        onComplete: () => {
          scrollHandle.current = null;
          highlightTarget(target);
        },
      });

      scrollHandle.current = handle;

      if (!handle) {
        highlightTarget(target);
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      scrollHandle.current?.cancel();
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash));

      if (target) {
        highlightTarget(target);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);

  return (
    <>
      <div aria-hidden="true" className="scroll-depth-glow" />
      <div aria-hidden="true" className="scroll-progress-shell">
        <motion.span className="scroll-progress-line" style={{ scaleX }} />
      </div>
    </>
  );
}
