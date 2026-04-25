"use client";

import type { PropsWithChildren } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type TiltCardProps = PropsWithChildren<{
  className?: string;
  glare?: boolean;
  intensity?: number;
  lift?: number;
}>;

export function TiltCard({
  children,
  className,
  glare = true,
  intensity = 10,
  lift = -8,
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);

  const rotateX = useSpring(rotateXRaw, {
    damping: 18,
    mass: 0.55,
    stiffness: 180,
  });
  const rotateY = useSpring(rotateYRaw, {
    damping: 18,
    mass: 0.55,
    stiffness: 180,
  });

  const shine = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgb(255 255 255 / 0.18), transparent 42%)`;

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative h-full", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "relative h-full will-change-transform [perspective:1400px] [transform-style:preserve-3d]",
        className,
      )}
      onMouseLeave={() => {
        rotateXRaw.set(0);
        rotateYRaw.set(0);
        shineX.set(50);
        shineY.set(50);
      }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;

        rotateYRaw.set((x - 0.5) * intensity);
        rotateXRaw.set((0.5 - y) * intensity);
        shineX.set(x * 100);
        shineY.set(y * 100);
      }}
      style={{ rotateX, rotateY }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.012, y: lift }}
    >
      {glare ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-80 mix-blend-screen"
          style={{ background: shine }}
        />
      ) : null}
      <div className="relative h-full [transform:translateZ(0)]">{children}</div>
    </motion.div>
  );
}
