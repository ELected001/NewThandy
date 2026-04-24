"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

const HeroPlaqueCanvas = dynamic(
  () => import("./hero-plaque-canvas").then((module) => module.HeroPlaqueCanvas),
  {
    ssr: false,
    loading: () => <PlaquePoster />,
  },
);

function PlaquePoster() {
  return (
    <div className="relative aspect-[1.45/1] overflow-hidden rounded-[2rem] border border-white/10 bg-[rgb(5_8_5/74%)] shadow-[var(--shadow-card)]">
      <Image
        alt="Thandy hero plaque"
        className="h-full w-full object-cover"
        fill
        sizes="(max-width: 920px) 100vw, 560px"
        src="/images/photography/brand-plaque.jpg"
      />
    </div>
  );
}

export function HeroPlaque() {
  const prefersReducedMotion = useReducedMotion();
  const [fallback, setFallback] = useState(prefersReducedMotion);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const hardwareThreads = navigator.hardwareConcurrency || 4;

    const update = () => {
      setFallback(prefersReducedMotion || media.matches || hardwareThreads <= 4);
    };

    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, [prefersReducedMotion]);

  if (fallback) {
    return <PlaquePoster />;
  }

  return <HeroPlaqueCanvas />;
}
