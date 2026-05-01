"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type ScrollDepthSceneProps = {
  alt: string;
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes: string;
  src: string;
  tone?: "light" | "dark";
};

const spring = {
  damping: 30,
  mass: 0.42,
  stiffness: 140,
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

export function ScrollDepthScene({
  alt,
  children,
  className,
  imageClassName,
  priority = false,
  sizes,
  src,
  tone = "dark",
}: ScrollDepthSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backY = useSpring(useTransform(scrollYProgress, [0, 1], [-34, 28]), spring);
  const midY = useSpring(useTransform(scrollYProgress, [0, 1], [22, -28]), spring);
  const frontY = useSpring(useTransform(scrollYProgress, [0, 1], [44, -38]), spring);
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], [18, -18]), spring);
  const imageScale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [1.03, 1.075, 1.04]), spring);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [5, -3]), spring);
  const rotateY = useSpring(useTransform(scrollYProgress, [0, 1], [-8, 5]), spring);

  const activeMotion = !prefersReducedMotion;

  return (
    <div
      ref={ref}
      className={cn("scroll-depth-scene", className)}
      data-motion-state={activeMotion ? "active" : "reduced"}
      data-scroll-depth-scene
    >
      <motion.div
        aria-hidden="true"
        className="scroll-depth-plane-motion"
        style={activeMotion ? { y: backY, rotateX, rotateY } : undefined}
      >
        <div className="scroll-depth-plane scroll-depth-plane-back" />
      </motion.div>
      <motion.div
        className="scroll-depth-photo"
        style={activeMotion ? { y: imageY, scale: imageScale, rotateX, rotateY } : undefined}
      >
        <Image
          alt={alt}
          className={cn("h-full w-full object-cover", imageClassName)}
          fill
          priority={priority}
          sizes={sizes}
          src={src}
        />
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 z-10",
            tone === "light"
              ? "bg-[linear-gradient(180deg,rgb(255_255_255/0)_28%,rgb(5_8_5/42%))]"
              : "bg-[linear-gradient(180deg,rgb(5_8_5/0)_30%,rgb(5_8_5/68%))]",
          )}
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="scroll-depth-plane-motion"
        style={activeMotion ? { y: midY, rotateX, rotateY } : undefined}
      >
        <div className="scroll-depth-plane scroll-depth-plane-mid" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="scroll-depth-plane-motion"
        style={activeMotion ? { y: frontY, rotateX, rotateY } : undefined}
      >
        <div className="scroll-depth-plane scroll-depth-plane-front" />
      </motion.div>
      {children ? <div className="scroll-depth-content">{children}</div> : null}
    </div>
  );
}
