"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { navigation, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState({ open: false, pathname });
  const open = menuState.pathname === pathname ? menuState.open : false;
  const setOpenForPath = useCallback(
    (nextOpen: boolean) => setMenuState({ open: nextOpen, pathname }),
    [pathname],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenForPath(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpenForPath]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      <div className="mx-auto w-full max-w-[1320px] pt-3 sm:pt-4">
        <div className="rounded-[1.25rem] border border-[rgb(17_22_17/8%)] bg-white px-3 py-2 shadow-[var(--shadow-soft)] sm:px-4">
          <div className="flex items-center justify-between gap-4">
            <Logo size="header" variant="dark" />
            <nav
              aria-label="Primary"
              className="hidden items-center gap-6 text-[0.92rem] font-medium text-[var(--text-secondary)] lg:flex xl:gap-7"
            >
              {navigation.map((item) => {
                const active = pathname === "/" && item.href === "/#home";

                return (
                  <Link
                    key={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 transition hover:text-[var(--ink-950)]",
                      active && "text-[var(--ink-950)]",
                    )}
                    href={item.href}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[var(--brand-green-500)] transition",
                        active ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>
            <div className="hidden items-center gap-2 md:flex">
              <ButtonLink
                href={siteConfig.phone.href}
                icon="phone"
                className="h-10 px-3.5"
                size="small"
                variant="ghost"
              >
                Call
              </ButtonLink>
              <ButtonLink className="h-10 px-4" href="/#quote-form" size="small" trailingArrow>
                Free quote
              </ButtonLink>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <ButtonLink href="/#quote-form" size="small">
                Quote
              </ButtonLink>
              <button
                aria-controls="mobile-nav"
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(17_22_17/10%)] bg-[var(--surface-soft)] text-[var(--ink-950)] transition hover:bg-white"
                onClick={() => setOpenForPath(!open)}
                type="button"
              >
                {open ? (
                  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <path
                      d="m6 6 12 12M18 6 6 18"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.9"
                    />
                  </svg>
                ) : (
                  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.9"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {open ? (
            <div className="mt-4 border-t border-[rgb(17_22_17/8%)] pt-4 md:hidden" id="mobile-nav">
              <nav aria-label="Mobile navigation" className="grid gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    aria-current={pathname === "/" && item.href === "/#home" ? "page" : undefined}
                    className={cn(
                      "rounded-[1rem] px-4 py-3 text-base font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--ink-950)]",
                      pathname === "/" &&
                        item.href === "/#home" &&
                        "bg-[var(--surface-soft)] text-[var(--ink-950)]",
                    )}
                    href={item.href}
                    onClick={() => setOpenForPath(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <ButtonLink href={siteConfig.phone.href} icon="phone" variant="ghost">
                  {siteConfig.phone.label}
                </ButtonLink>
                <ButtonLink href={siteConfig.email.href} icon="mail" variant="ghost">
                  Email us
                </ButtonLink>
              </div>
              <div className="mt-4 flex items-start gap-3 rounded-[1rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                <Icon className="mt-0.5 text-[var(--brand-green-500)]" name="map" />
                <span>Serving Hamilton and surrounding residential and commercial areas.</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
