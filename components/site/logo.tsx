"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { smoothScrollToPosition } from "@/lib/smooth-scroll";

type LogoProps = {
  variant?: "light" | "dark";
  size?: "header" | "footer";
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "light",
  size = "footer",
  className,
  priority = false,
}: LogoProps) {
  const pathname = usePathname();

  const handleHomepageClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", "/");
    smoothScrollToPosition(0, {
      minDuration: 760,
      maxDuration: 1450,
      distanceFactor: 0.42,
    });
  };

  return (
    <Link
      aria-label="Go to Thandy homepage"
      className={cn("inline-flex shrink-0 items-center", className)}
      href="/"
      onClick={handleHomepageClick}
    >
      <Image
        alt="Thandy Landscaping Services Inc."
        className={cn(
          "h-auto",
          size === "header" ? "w-[122px] sm:w-[142px]" : "w-[136px] sm:w-[156px]",
        )}
        height={106}
        priority={priority}
        src={
          variant === "light"
            ? "/images/brand/logo-white-green.png"
            : "/images/brand/logo-black-green.png"
        }
        width={216}
      />
    </Link>
  );
}
