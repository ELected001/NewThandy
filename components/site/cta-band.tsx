import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";

type CtaBandProps = {
  eyebrow: string;
  title: string;
  description: string;
  primary: {
    label: string;
    href: string;
    icon?: "phone" | "mail";
  };
  secondary?: {
    label: string;
    href: string;
  };
  children?: ReactNode;
};

export function CtaBand({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  children,
}: CtaBandProps) {
  return (
    <section className="section-space">
      <div className="page-shell">
        <div className="band-gradient overflow-hidden rounded-[2.4rem] border border-white/8 px-6 py-8 text-white shadow-[var(--shadow-card)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-2xl">
              <span className="section-kicker">{eyebrow}</span>
              <h2 className="mt-5 text-balance text-4xl font-semibold sm:text-5xl">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/76">
                {description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={primary.href} icon={primary.icon} trailingArrow>
                  {primary.label}
                </ButtonLink>
                {secondary ? (
                  <ButtonLink href={secondary.href} variant="secondary">
                    {secondary.label}
                  </ButtonLink>
                ) : null}
              </div>
            </div>
            <div className="panel rounded-[2rem] bg-white px-6 py-6 text-[var(--text-primary)] shadow-[var(--shadow-soft)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
