import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "light", className }: LogoProps) {
  return (
    <Link
      aria-label="Go to Thandy home"
      className={cn("inline-flex shrink-0 items-center", className)}
      href="/"
    >
      <Image
        alt="Thandy Landscaping Services Inc."
        className="h-auto w-[136px] sm:w-[156px]"
        height={106}
        priority
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
