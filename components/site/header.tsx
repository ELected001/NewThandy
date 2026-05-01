"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { navigation, siteConfig } from "@/content/site";
import { smoothScrollToElement, type SmoothScrollHandle } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/logo";
import { SocialLinks } from "@/components/site/social-links";

function getHomepageSectionId(href: string) {
  return href.startsWith("/#") ? href.slice(2) : null;
}

const homepageSectionIds = navigation
  .map((item) => getHomepageSectionId(item.href))
  .filter((id): id is string => Boolean(id));

export function SiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState(homepageSectionIds[0] ?? "home");
  const [menuState, setMenuState] = useState({ open: false, pathname });
  const navScrollHandle = useRef<SmoothScrollHandle | null>(null);
  const open = menuState.pathname === pathname ? menuState.open : false;
  const setOpenForPath = useCallback(
    (nextOpen: boolean) => setMenuState({ open: nextOpen, pathname }),
    [pathname],
  );
  const stopNavScroll = useCallback(() => {
    navScrollHandle.current?.cancel();
    navScrollHandle.current = null;
  }, []);
  const isNavItemActive = useCallback(
    (href: string) => {
      const sectionId = getHomepageSectionId(href);

      if (sectionId) {
        return pathname === "/" && activeSection === sectionId;
      }

      return pathname === href;
    },
    [activeSection, pathname],
  );
  const scrollToHomepageSection = useCallback(
    (sectionId: string) => {
      const section = document.getElementById(sectionId);

      if (!section) {
        return false;
      }

      stopNavScroll();
      setActiveSection(sectionId);
      window.history.pushState(null, "", `/#${sectionId}`);

      const handle = smoothScrollToElement(section, {
        minDuration: 940,
        maxDuration: 1800,
        distanceFactor: 0.5,
        onComplete: () => {
          navScrollHandle.current = null;
          setActiveSection(sectionId);
        },
      });

      navScrollHandle.current = handle;

      return true;
    },
    [stopNavScroll],
  );
  const handleHomepageSectionClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, sectionId: string | null) => {
      if (pathname !== "/" || !sectionId) {
        return;
      }

      if (scrollToHomepageSection(sectionId)) {
        event.preventDefault();
      }
    },
    [pathname, scrollToHomepageSection],
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

  useEffect(() => () => stopNavScroll(), [stopNavScroll]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    let frameId: number | null = null;

    const updateActiveSection = () => {
      frameId = null;

      const activationLine = Math.min(180, window.innerHeight * 0.35);
      let currentSection = homepageSectionIds[0] ?? "home";

      for (const sectionId of homepageSectionIds) {
        const section = document.getElementById(sectionId);

        if (section && section.getBoundingClientRect().top <= activationLine) {
          currentSection = sectionId;
        }
      }

      const documentHeight = document.documentElement.scrollHeight;
      const atPageEnd = window.scrollY + window.innerHeight >= documentHeight - 8;
      const finalSection = homepageSectionIds.at(-1);

      setActiveSection(atPageEnd && finalSection ? finalSection : currentSection);
    };

    const scheduleUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    const syncHash = () => {
      const hashSection = window.location.hash.slice(1);

      if (homepageSectionIds.includes(hashSection)) {
        setActiveSection(hashSection);
      }

      scheduleUpdate();
    };

    syncHash();

    window.addEventListener("hashchange", syncHash);
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
    };
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-3 sm:px-4">
      <div className="mx-auto w-full max-w-[1320px] pt-3 sm:pt-4">
        <div className="site-header-panel rounded-[1.25rem] border border-[rgb(17_22_17/8%)] bg-white px-3 py-2 shadow-[var(--shadow-soft)] sm:px-4">
          <div className="flex items-center justify-between gap-4">
            <Logo size="header" variant="dark" />
            <nav
              aria-label="Primary"
              className="hidden items-center gap-6 text-[0.92rem] font-medium text-[var(--text-secondary)] lg:flex xl:gap-7"
            >
              {navigation.map((item) => {
                const sectionId = getHomepageSectionId(item.href);
                const active = isNavItemActive(item.href);

                return (
                  <Link
                    key={item.href}
                    aria-current={active ? (sectionId ? "location" : "page") : undefined}
                    className={cn(
                      "relative py-2 transition hover:text-[var(--ink-950)]",
                      active && "text-[var(--ink-950)]",
                    )}
                    href={item.href}
                    onClick={(event) => handleHomepageSectionClick(event, sectionId)}
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
                Call Thandy
              </ButtonLink>
              <ButtonLink className="h-10 px-4" href="/#quote-form" size="small" trailingArrow>
                Free quote
              </ButtonLink>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <ButtonLink href="/#quote-form" size="small">
                Free quote
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
                {navigation.map((item) => {
                  const sectionId = getHomepageSectionId(item.href);
                  const active = isNavItemActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      aria-current={active ? (sectionId ? "location" : "page") : undefined}
                      className={cn(
                        "rounded-[1rem] px-4 py-3 text-base font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--ink-950)]",
                        active && "bg-[var(--surface-soft)] text-[var(--ink-950)]",
                      )}
                      href={item.href}
                      onClick={(event) => {
                        handleHomepageSectionClick(event, sectionId);

                        setOpenForPath(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <ButtonLink href={siteConfig.phone.href} icon="phone" variant="ghost">
                  {siteConfig.phone.label}
                </ButtonLink>
                <ButtonLink href={siteConfig.email.href} icon="mail" variant="ghost">
                  Email us
                </ButtonLink>
              </div>
              <SocialLinks
                className="mt-4"
                linkClassName="border-[rgb(17_22_17/10%)] bg-white text-[var(--ink-950)] hover:bg-[var(--surface-soft)] focus-visible:ring-offset-white"
              />
              <div className="mt-4 flex items-start gap-3 rounded-[1rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                <Icon className="mt-0.5 text-[var(--brand-green-500)]" name="map" />
                <span>Serving Hamilton and surrounding residential and commercial communities.</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
