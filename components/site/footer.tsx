import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { navigation, siteConfig } from "@/content/site";
import { Logo } from "@/components/site/logo";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[var(--ink-950)] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="page-shell section-space">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="max-w-md">
            <Logo className="w-fit" />
            <p className="mt-6 text-base leading-7 text-white/70">
              {siteConfig.tagline} Proudly serving Hamilton and surrounding residential and commercial areas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={siteConfig.phone.href} icon="phone" size="small" variant="secondary">
                Call
              </ButtonLink>
              <ButtonLink href="/#quote-form" size="small" trailingArrow>
                Get quote
              </ButtonLink>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase text-white/42">
              Site
            </p>
            <ul className="mt-5 space-y-3 text-base text-white/76">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link className="transition hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase text-white/42">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-base text-white/76">
              <li>
                <a className="transition hover:text-white" href={siteConfig.phone.href}>
                  {siteConfig.phone.label}
                </a>
              </li>
              <li>
                <a className="transition hover:text-white" href={siteConfig.email.href}>
                  {siteConfig.email.label}
                </a>
              </li>
              <li>{siteConfig.location.summary}</li>
              <li>Hamilton and surrounding residential and commercial areas</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm leading-6 text-white/52">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. Quote-led lawn care,
            leaf cleaning, and property maintenance.
          </p>
        </div>
      </div>
    </footer>
  );
}
