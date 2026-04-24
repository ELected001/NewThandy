import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "small";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: Parameters<typeof Icon>[0]["name"];
  trailingArrow?: boolean;
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "default",
  className?: string,
) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.01em] transition duration-200 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
  const sizes = {
    default: "h-[3.25rem] px-5 text-[0.96rem]",
    small: "h-11 px-4 text-[0.92rem]",
  };
  const variants = {
    primary:
      "bg-[var(--brand-green-500)] text-[var(--ink-950)] shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:bg-[var(--brand-green-300)]",
    secondary:
      "border border-white/16 bg-white/6 text-white hover:-translate-y-0.5 hover:bg-white/12",
    ghost:
      "border border-[rgb(17_22_17/10%)] bg-white text-[var(--ink-900)] hover:-translate-y-0.5 hover:bg-[var(--surface-soft)]",
  };

  return cn(base, sizes[size], variants[variant], className);
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "default",
  className,
  icon,
  trailingArrow = false,
}: ButtonLinkProps) {
  const content = (
    <>
      {icon ? <Icon className="h-[1.125rem] w-[1.125rem]" name={icon} /> : null}
      <span>{children}</span>
      {trailingArrow ? (
        <svg
          aria-hidden="true"
          className="h-[1.125rem] w-[1.125rem]"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 12h14M13 5l7 7-7 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.9"
          />
        </svg>
      ) : null}
    </>
  );

  const classNames = buttonClassName(variant, size, className);

  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http")) {
    return (
      <a
        className={classNames}
        href={href}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={classNames} href={href}>
      {content}
    </Link>
  );
}
