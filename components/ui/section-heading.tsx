import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  light?: boolean;
  size?: "default" | "wide";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  size = "default",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        size === "wide" ? "max-w-[60rem]" : "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <span className={cn("section-kicker", !light && "section-kicker-light")}>
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-5 text-balance text-4xl font-semibold sm:text-5xl lg:text-[3.5rem]",
          light ? "text-white" : "text-[var(--ink-900)]",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          size === "wide" ? "mt-5 max-w-[46rem] text-lg leading-8" : "mt-5 max-w-2xl text-lg leading-8",
          light ? "text-white/76" : "text-[var(--text-secondary)]",
          align === "center" ? "mx-auto" : undefined,
        )}
      >
        {description}
      </p>
    </div>
  );
}
