"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { navigation, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="page-shell pt-3 sm:pt-4">
        <div className="rounded-[1.75rem] border border-white/10 bg-[rgb(5_8_5/78%)] px-4 py-2.5 shadow-[var(--shadow-card)] backdrop-blur-xl sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <Logo />
            <nav
              aria-label="Primary"
              className="hidden items-center gap-7 text-[0.95rem] text-white/78 lg:flex"
            >
              {navigation.map((item) => {
                const active = !item.href.includes("#") && pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    className={cn(
                      "relative py-2 transition hover:text-white",
                      active && "text-white",
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
            <div className="hidden items-center gap-3 md:flex">
              <ButtonLink
                href={siteConfig.phone.href}
                icon="phone"
                size="small"
                variant="secondary"
              >
                Call
              </ButtonLink>
              <ButtonLink href="/#quote-form" size="small" trailingArrow>
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white transition hover:bg-white/14"
                onClick={() => setOpen((value) => !value)}
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
          <AnimatePresence>
            {open ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 border-t border-white/10 pt-4 md:hidden"
                exit={{ opacity: 0, y: -12 }}
                id="mobile-nav"
                initial={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                <nav aria-label="Mobile navigation" className="grid gap-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      className={cn(
                        "rounded-2xl px-4 py-3 text-base font-medium text-white/80 transition hover:bg-white/8 hover:text-white",
                        !item.href.includes("#") && pathname === item.href && "bg-white/8 text-white",
                      )}
                      href={item.href}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <ButtonLink href={siteConfig.phone.href} icon="phone" variant="secondary">
                    {siteConfig.phone.label}
                  </ButtonLink>
                  <ButtonLink href={siteConfig.email.href} icon="mail" variant="ghost">
                    Email us
                  </ButtonLink>
                </div>
                <div className="mt-4 flex items-start gap-3 rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/72">
                  <Icon className="mt-0.5 text-[var(--brand-green-500)]" name="map" />
                  <span>Serving Hamilton and surrounding residential and commercial areas.</span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
