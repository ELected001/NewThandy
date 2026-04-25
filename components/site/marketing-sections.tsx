import Image from "next/image";
import type { ReactNode } from "react";
import { QuoteForm } from "@/components/site/quote-form";
import { ButtonLink } from "@/components/ui/button";
import { FAQ } from "@/components/ui/faq";
import { Icon } from "@/components/ui/icons";
import { FadeIn } from "@/components/ui/reveal";
import {
  brandFoundation,
  brandStoryPoints,
  brandVoicePoints,
  connectionChannels,
  contactCards,
  contentPlanItems,
  faqItems,
  pricingFactors,
  processSteps,
  reliabilityPoints,
  serviceCards,
  siteConfig,
  trustChips,
} from "@/content/site";

const media = {
  brandHero: {
    src: "/images/brand-strategy/mower-green-hero.jpg",
    alt: "A lawn mower moving through green grass in Thandy brand colors",
  },
  sunsetMower: {
    src: "/images/brand-strategy/sunset-mower.jpg",
    alt: "A mower and worker crossing a residential lawn at sunset",
  },
  mowerClose: {
    src: "/images/brand-strategy/lawn-mower-close.jpg",
    alt: "A landscaping worker mowing a bright green residential lawn",
  },
  hedge: {
    src: "/images/brand-strategy/hedge-maintenance.jpg",
    alt: "A landscaping worker trimming a clean hedge beside a lawn",
  },
  leafCleanup: {
    src: "/images/photography/leaf-cleanup.jpg",
    alt: "A residential yard being cleared of seasonal leaves",
  },
  residential: {
    src: "/images/brand-strategy/residential-lawn.jpg",
    alt: "A large residential property with a clean green lawn",
  },
  gardenPath: {
    src: "/images/brand-strategy/garden-path.jpg",
    alt: "A clean garden path surrounded by healthy landscaping",
  },
  clearPark: {
    src: "/images/brand-strategy/clear-park.jpg",
    alt: "A clear green outdoor space with trees and open lawn",
  },
} as const;

const packageCards = [
  {
    title: "Essential Care Package",
    audience: "Homeowners and seniors",
    description:
      "Bi-weekly lawn care and light outdoor maintenance for properties that need dependable upkeep without a complicated plan.",
    inclusions: ["Bi-weekly lawn care", "Light maintenance", "Simple seasonal add-ons"],
  },
  {
    title: "Property Manager Package",
    audience: "Landlords and multi-property clients",
    description:
      "Recurring lawn maintenance and practical visit planning for rental, estate, and managed properties.",
    inclusions: ["Recurring maintenance", "Visit planning", "Clear scope for multiple locations"],
  },
] as const;

const routeIntents = [
  { label: "Homeowners", copy: "Clean, usable yards without a long booking process." },
  { label: "Seniors", copy: "Respectful outdoor support with clear communication." },
  { label: "Landlords", copy: "Tidy curb appeal between tenants and visits." },
  { label: "Managers", copy: "Planned maintenance for recurring property needs." },
  { label: "Commercial spaces", copy: "Outdoor areas that need clean, attractive surroundings." },
  { label: "Individuals", copy: "A direct route for one-time or recurring outdoor care." },
] as const;

const serviceCoverageCards = [
  {
    title: "Routine lawn visits",
    description: "Mowing, edging, and trimming for yards that need a neat finish week after week.",
    icon: "leaf" as const,
  },
  {
    title: "Seasonal reset work",
    description: "Leaf removal, debris clearing, green waste removal, and spring or fall cleanup when the property needs order restored.",
    icon: "wind" as const,
  },
  {
    title: "Recurring maintenance",
    description: "Outdoor upkeep planned around access, frequency, green waste, and the condition of the space.",
    icon: "layers" as const,
  },
  {
    title: "Managed-property support",
    description: "Clear service scope for rental, estate, facility, and multi-property maintenance needs.",
    icon: "building" as const,
  },
] as const;

const profilePrinciples = [
  {
    title: "Respectful on site",
    description: "Property, paths, lawns, and client time are treated with care from arrival to cleanup.",
    icon: "shield" as const,
  },
  {
    title: "Clear before arrival",
    description: "The first conversation focuses on the service need, location, timing, and useful access notes.",
    icon: "phone" as const,
  },
  {
    title: "Noticeable finish",
    description: "The work should leave outdoor areas cleaner, easier to use, and more attractive.",
    icon: "spark" as const,
  },
  {
    title: "Local focus",
    description: "Hamilton and nearby residential and commercial areas remain the practical service base.",
    icon: "map" as const,
  },
] as const;

const serviceMedia = {
  "lawn-care": media.mowerClose,
  "seasonal-cleanup": media.leafCleanup,
  "property-maintenance": media.hedge,
} as const;

const serviceAngles = [
  "Mowing lines, edging, and trimming should leave the lawn neat from the street and usable up close.",
  "Seasonal cleanup restores order around paths, beds, yards, and outdoor spaces after leaves or debris collect.",
  "Maintenance keeps outdoor areas from sliding back into clutter between major visits.",
] as const;

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <span className={light ? "section-kicker section-kicker-light" : "section-kicker"}>
      {children}
    </span>
  );
}

function ImagePanel({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`image-panel relative overflow-hidden ${className ?? ""}`}>
      <Image
        alt={alt}
        className="h-full w-full object-cover"
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 50vw"
        src={src}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_8_5/0),rgb(5_8_5/42%))]" />
    </div>
  );
}

export function HomeHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-white pt-32 text-[var(--text-primary)] sm:pt-36"
      id="home"
    >
      <div className="soft-grid absolute inset-0 -z-20 opacity-70" />
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[linear-gradient(180deg,rgb(126_217_87/12%),rgb(255_255_255/0))]" />

      <div className="page-shell grid min-h-[calc(88svh-8rem)] gap-10 pb-14 lg:grid-cols-[minmax(0,0.56fr)_minmax(24rem,0.44fr)] lg:items-end">
        <div className="max-w-4xl pb-2">
          <Eyebrow light>{siteConfig.hero.eyebrow}</Eyebrow>
          <p className="mt-5 text-base font-semibold text-[var(--brand-green-700)]">
            {siteConfig.tagline}
          </p>
          <h1 className="headline-balance mt-5 max-w-5xl text-5xl font-semibold leading-[0.92] text-black sm:text-7xl lg:text-[5.8rem]">
            Reliable lawn care and property maintenance in Hamilton.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl sm:leading-9">
            {siteConfig.hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/#quote-form" trailingArrow>
              Get a free quote
            </ButtonLink>
            <ButtonLink href={siteConfig.phone.href} icon="phone" variant="ghost">
              Call Thandy
            </ButtonLink>
            <ButtonLink href="/#services" variant="ghost">
              See services
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustChips.map((chip) => (
              <div
                key={chip.label}
                className="flex items-center gap-3 rounded-[1rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-base)] px-4 py-3 text-sm font-semibold text-[var(--ink-900)] shadow-[var(--shadow-soft)]"
              >
                <Icon className="h-4 w-4 text-[var(--brand-green-700)]" name={chip.icon} />
                <span>{chip.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[34rem] overflow-hidden rounded-[1.5rem] border border-[rgb(17_22_17/8%)] bg-[var(--ink-950)] shadow-[var(--shadow-hero)]">
          <Image
            alt={media.brandHero.alt}
            className="h-full w-full object-cover object-[55%_50%]"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 44vw"
            src={media.brandHero.src}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_8_5/0)_30%,rgb(5_8_5/68%))]" />
          <div className="absolute bottom-5 left-5 right-5 rounded-[1rem] border border-white/12 bg-white/14 px-5 py-5 text-white backdrop-blur-md">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--brand-green-300)]">
              Season after season
            </p>
            <p className="mt-2 text-base leading-7 text-white/78">
              A direct path from first message to a property-specific quote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MotionMarquee() {
  const items = [
    "Lawn mowing",
    "Leaf cleaning",
    "Seasonal cleanup",
    "Property maintenance",
    "Hamilton and surrounding areas",
  ];

  return (
    <section
      aria-label="Services at a glance"
      className="relative overflow-hidden border-y border-[rgb(17_22_17/8%)] bg-[var(--surface-base)] py-4"
    >
      <div className="marquee-edge pointer-events-none absolute inset-y-0 left-0 z-10 w-16" />
      <div className="marquee-edge pointer-events-none absolute inset-y-0 right-0 z-10 w-16 rotate-180" />
      <div className="marquee-track">
        {[0, 1].map((cycle) => (
          <div
            aria-hidden={cycle === 1}
            className="marquee-group"
            key={cycle}
          >
            {items.map((item) => (
              <span
                key={`${cycle}-${item}`}
                className="inline-flex items-center gap-3 rounded-full border border-[rgb(17_22_17/8%)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-900)] shadow-[var(--shadow-soft)]"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand-green-500)]" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeServiceShowcase() {
  return (
    <section className="section-space bg-[var(--surface-base)]" id="services">
      <div className="page-shell">
        <span className="sr-only" id="services-preview" />
        <div className="grid gap-5 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <FadeIn>
            <Eyebrow light>Core services</Eyebrow>
            <h2 className="mt-5 max-w-lg text-4xl font-semibold leading-[0.96] text-black sm:text-6xl">
              Clean outdoor care, split into clear service lanes.
            </h2>
          </FadeIn>
          <FadeIn className="max-w-2xl" delay={0.08}>
            <p className="text-lg leading-8 text-[var(--text-secondary)]">
              We offer a range of landscaping and maintenance services designed to keep outdoor spaces looking their best: clean lawn care, seasonal reset work, debris clearing, green waste removal, and ongoing property maintenance.
            </p>
          </FadeIn>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {serviceCards.map((service, index) => (
            <FadeIn key={service.slug} delay={index * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[rgb(17_22_17/8%)] bg-white shadow-[var(--shadow-soft)]">
                <div className="relative min-h-[15rem] overflow-hidden bg-[var(--ink-950)]">
                  <Image
                    alt={serviceMedia[service.slug].alt}
                    className="h-full w-full object-cover transition duration-700 ease-[var(--ease-out)] group-hover:scale-[1.05]"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    src={serviceMedia[service.slug].src}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--brand-green-700)]">
                    0{index + 1} / {service.eyebrow}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold text-black">{service.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">{service.detail}</p>
                  <ul className="mt-5 grid gap-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm font-semibold text-[var(--ink-900)]">
                        <Icon className="mt-0.5 h-4 w-4 text-[var(--brand-green-700)]" name="check" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <ButtonLink href={service.href} trailingArrow variant="ghost">
                      Request this service
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeAudienceFit() {
  return (
    <section className="section-space bg-[var(--ink-950)] text-white" id="profile">
      <div className="page-shell">
        <span className="sr-only" id="about" />
        <div className="grid gap-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-stretch">
          <FadeIn className="h-full">
            <div className="relative h-full min-h-[34rem] overflow-hidden rounded-[2.2rem] border border-white/10">
              <Image
                alt={media.residential.alt}
                className="h-full w-full object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                src={media.residential.src}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_8_5/0)_36%,rgb(5_8_5/72%))]" />
              <div className="absolute bottom-6 left-6 max-w-sm">
                <p className="text-sm font-semibold uppercase text-[var(--brand-green-300)]">
                  Service area
                </p>
                <p className="mt-3 text-3xl font-semibold leading-tight">
                  Hamilton and surrounding residential and commercial areas.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Eyebrow>Built for local properties</Eyebrow>
            <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[0.98] sm:text-5xl">
              The audience is broad, so the journey has to stay direct.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              Thandy works across homes, rentals, managed properties, commercial spaces, and individual property needs. The experience stays direct: choose the service need, share the property context, and move toward a clear quote.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {routeIntents.map((item) => (
                <article key={item.label} className="rounded-[1.35rem] border border-white/10 bg-white/7 px-5 py-5">
                  <h3 className="text-xl font-semibold">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/64">{item.copy}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function HomeBookingFlow() {
  return (
    <section className="section-space bg-white" id="pricing">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <FadeIn>
            <Eyebrow light>Booking flow</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-[0.98] text-black sm:text-5xl">
              Pricing stays quote-led, not repeated across separate pages.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              Pricing is intentionally quote-led. Property size, frequency, cleanup volume, access, and level of care shape the final scope.
            </p>
            <div className="mt-7">
              <ButtonLink href="/#quote-form" trailingArrow>
                Start a quote
              </ButtonLink>
            </div>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-[linear-gradient(180deg,var(--brand-green-500),rgb(126_217_87/0))] sm:block" />
            <div className="grid gap-4">
              {processSteps.map((step, index) => (
                <FadeIn key={step.number} delay={index * 0.06}>
                  <article className="relative rounded-[1.7rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-base)] px-6 py-6 shadow-[var(--shadow-soft)] sm:ml-14">
                    <span className="absolute -left-14 top-6 hidden h-12 w-12 items-center justify-center rounded-full bg-[var(--ink-950)] text-sm font-semibold text-[var(--brand-green-500)] sm:flex">
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-semibold text-black">{step.title}</h3>
                    <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">{step.description}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[rgb(17_22_17/8%)] pt-8">
          <FadeIn>
            <div className="max-w-2xl">
              <Eyebrow light>Quote factors</Eyebrow>
              <h3 className="mt-4 text-3xl font-semibold leading-tight text-black sm:text-4xl">
                One pricing explanation, four details that shape the scope.
              </h3>
            </div>
          </FadeIn>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pricingFactors.map((factor, index) => (
              <FadeIn key={factor.title} delay={index * 0.04}>
                <article className="h-full rounded-[1.35rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-base)] px-5 py-5 shadow-[var(--shadow-soft)]">
                  <Icon className="text-[var(--brand-green-700)]" name={factor.icon} />
                  <h4 className="mt-5 text-xl font-semibold text-black">{factor.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {factor.description}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeQuoteSection({ service }: { service?: string }) {
  return (
    <section className="section-space bg-[var(--surface-base)]" id="quote-form">
      <div className="page-shell">
        <div className="grid gap-8 rounded-[1.5rem] border border-[rgb(17_22_17/8%)] bg-white p-6 shadow-[var(--shadow-soft)] lg:grid-cols-[0.42fr_0.58fr] lg:p-8">
          <div>
            <Eyebrow light>Free quote</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-[0.98] text-black sm:text-5xl">
              Share the property details.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              Share the service, location, timing, and access notes so the next conversation starts with useful property context.
            </p>
            <div className="mt-6 rounded-[1rem] bg-[var(--surface-soft)] px-5 py-5 text-sm leading-6 text-[var(--text-secondary)]">
              Prefer a phone conversation? Call {siteConfig.phone.label} and mention the property location, service need, and timing.
            </div>
          </div>
          <div>
            <QuoteForm key={service ?? "empty-service"} service={service} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeFaqSection() {
  return (
    <section className="section-space bg-white" id="faq">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
          <FadeIn>
            <Eyebrow light>FAQ</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-[0.98] text-black sm:text-5xl">
              Quick answers before you request a quote.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              The single-page layout keeps service scope, pricing context, and contact details in one place.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="rounded-[1.5rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-base)] px-5 py-5 shadow-[var(--shadow-soft)] sm:px-6 sm:py-6">
              <FAQ items={faqItems} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-32 sm:pt-36">
      <div className="page-shell pb-12 pt-8 sm:pb-16">
        <div className="grid gap-8 lg:grid-cols-[0.54fr_0.46fr] lg:items-stretch">
          <div>
            <Eyebrow light>Services</Eyebrow>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-black sm:text-7xl">
              Lawn mowing.
              <br />
              Leaf cleaning.
              <br />
              Maintenance.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              A detailed look at Thandy&apos;s launch services: clean lawn care, seasonal reset work, and practical property maintenance for outdoor spaces that need a clean, professional finish.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/#quote-form" trailingArrow>
                Request a quote
              </ButtonLink>
              <ButtonLink href="/#pricing" variant="ghost">
                See pricing approach
              </ButtonLink>
            </div>
          </div>

          <FadeIn delay={0.1}>
            <div className="service-lens relative min-h-[30rem] overflow-hidden rounded-[2.2rem] bg-[var(--ink-950)] shadow-[var(--shadow-hero)]">
              <Image
                alt={media.gardenPath.alt}
                className="h-full w-full object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                src={media.gardenPath.src}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_8_5/4%),rgb(5_8_5/70%))]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/12 bg-white/12 px-5 py-5 text-white backdrop-blur-md">
                <p className="text-sm font-semibold uppercase text-[var(--brand-green-300)]">
                  Professional finish
                </p>
                <p className="mt-3 text-xl font-semibold leading-7">
                  Clean surroundings should be visible after the work is complete.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function ServicesDeepDive() {
  return (
    <section className="bg-[var(--surface-base)] py-10 sm:py-14 lg:py-16" id="service-details">
      <div className="page-shell">
        <div className="grid gap-8">
          {serviceCards.map((service, index) => (
            <FadeIn key={service.slug} delay={index * 0.04}>
              <article className="grid overflow-hidden rounded-[2.2rem] border border-[rgb(17_22_17/8%)] bg-white shadow-[var(--shadow-soft)] lg:grid-cols-[0.48fr_0.52fr]">
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""} relative min-h-[24rem]`}>
                  <Image
                    alt={serviceMedia[service.slug].alt}
                    className="h-full w-full object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    src={serviceMedia[service.slug].src}
                  />
                </div>
                <div className="flex flex-col justify-between px-6 py-7 sm:px-8 lg:px-10">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink-950)] text-sm font-semibold text-[var(--brand-green-500)]">
                        0{index + 1}
                      </span>
                      <Eyebrow light>{service.eyebrow}</Eyebrow>
                    </div>
                    <h2 className="mt-6 text-4xl font-semibold leading-[0.98] text-black sm:text-5xl">
                      {service.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                      {serviceAngles[index]}
                    </p>
                  </div>
                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {service.bullets.map((bullet) => (
                      <div key={bullet} className="rounded-[1.25rem] bg-[var(--surface-soft)] px-4 py-4">
                        <Icon className="text-[var(--brand-green-700)]" name="check" />
                        <p className="mt-3 text-sm font-semibold leading-5 text-[var(--ink-900)]">{bullet}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <ButtonLink href={service.href} trailingArrow variant="ghost">
                      Request this service
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesAreaSection() {
  return (
    <section className="section-space bg-[var(--ink-950)] text-white">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr] lg:items-stretch">
          <FadeIn>
            <Eyebrow>Service coverage</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold leading-[0.98] sm:text-5xl">
              Residential and managed properties need different detail.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              Each property has a different level of access, cleanup volume, and visit rhythm. The quote conversation turns that context into a clear plan of work.
            </p>
          </FadeIn>
          <div className="grid gap-4 md:grid-cols-2">
            {serviceCoverageCards.map((card, index) => (
              <FadeIn key={card.title} delay={index * 0.05}>
                <article className="h-full rounded-[1.7rem] border border-white/10 bg-white/7 px-6 py-6">
                  <Icon className="text-[var(--brand-green-500)]" name={card.icon} />
                  <h3 className="mt-5 text-2xl font-semibold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/66">{card.description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesContentPlanSection() {
  return (
    <section className="section-space bg-white">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[0.46fr_0.54fr] lg:items-stretch">
          <FadeIn>
            <div className="relative h-full min-h-[32rem] overflow-hidden rounded-[2.2rem] bg-[var(--ink-950)] shadow-[var(--shadow-hero)]">
              <Image
                alt={media.mowerClose.alt}
                className="h-full w-full object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                src={media.mowerClose.src}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_8_5/4%),rgb(5_8_5/80%))]" />
              <div className="absolute bottom-6 left-6 right-6">
                <Eyebrow>Service standard</Eyebrow>
                <h2 className="mt-5 max-w-lg text-4xl font-semibold leading-[0.98] text-white sm:text-5xl">
                  Clean work should be easy to see.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/72">
                  Every visit should leave outdoor areas neater, easier to use, and ready for the next conversation about ongoing care.
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-[2.2rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-base)] px-6 py-7 shadow-[var(--shadow-soft)] sm:px-8 sm:py-8">
              <div>
                <Eyebrow light>Content plan</Eyebrow>
                <h3 className="mt-5 max-w-2xl text-4xl font-semibold leading-[0.98] text-black sm:text-5xl">
                  Show the process clearly as work is documented.
                </h3>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                  The brand guide points toward documenting real work over time, using clean minimal layouts, green, white, and earth tones, and consistent logo and brand colors.
                </p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {contentPlanItems.map((item, index) => (
                  <div key={item} className="rounded-[1.25rem] bg-white px-4 py-4">
                    <Icon className="text-[var(--brand-green-700)]" name={index % 2 === 0 ? "spark" : "leaf"} />
                    <p className="mt-3 text-sm font-semibold leading-5 text-[var(--ink-900)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function ProfileHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--ink-950)] pt-32 text-white sm:pt-36" id="profile">
      <div className="absolute inset-0 opacity-38">
        <Image
          alt={media.clearPark.alt}
          className="h-full w-full object-cover"
          fill
          priority
          sizes="100vw"
          src={media.clearPark.src}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink-950)_0%,rgb(5_8_5/92%)_42%,rgb(5_8_5/64%))]" />
      <div className="page-shell relative pb-16 pt-8 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-end">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.92] sm:text-7xl">
              Friendly, professional care for local outdoor spaces.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
              Thandy is a locally operated business dedicated to reliable, professional, and high-quality outdoor property care. Your property matters, whether it is a home, an investment, or a managed space.
            </p>
          </div>
          <FadeIn delay={0.1}>
            <div className="grid gap-3">
              {brandFoundation.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/8 px-5 py-5 backdrop-blur-md">
                  <div className="flex gap-4">
                    <Icon className="mt-1 text-[var(--brand-green-500)]" name={item.icon} />
                    <div>
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-white/66">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function ProfileStorySection() {
  return (
    <section className="section-space bg-white">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
          <FadeIn>
            <Eyebrow light>Our approach</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-[0.98] text-black sm:text-5xl">
              Do the work carefully, communicate simply, leave the property better.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              We do not rush jobs or cut corners. Every service is delivered with attention to detail, respect for your property, and consistent quality so the property remains clean, safe, and well-maintained throughout the season.
            </p>
          </FadeIn>
          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
            {reliabilityPoints.map((point, index) => (
              <FadeIn key={point.title} delay={index * 0.05}>
                <article className="flex h-full flex-col rounded-[1.25rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-base)] px-6 py-6 shadow-[var(--shadow-soft)]">
                  <Icon className="text-[var(--brand-green-700)]" name={point.icon} />
                  <h3 className="mt-5 text-2xl font-semibold text-black">{point.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{point.description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProfileStrategySection() {
  return (
    <section className="section-space bg-[var(--ink-950)] text-white">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[0.46fr_0.54fr] lg:items-start">
          <FadeIn>
            <Eyebrow>Brand communication</Eyebrow>
            <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[0.98] sm:text-5xl">
              We help keep your lawn neat and your surroundings clean.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              THANDY helps homeowners and property managers maintain clean, attractive outdoor spaces through professional lawn mowing and leaf cleaning services in Hamilton and surrounding areas.
            </p>
            <div className="mt-7 rounded-[1.7rem] border border-white/10 bg-white/8 px-5 py-5">
              <p className="text-sm font-semibold uppercase text-[var(--brand-green-300)]">Positioning statement</p>
              <p className="mt-3 text-base leading-7 text-white/72">
                THANDY is a reliable, customer-focused landscaping company in Hamilton that helps homeowners and property managers maintain clean, attractive outdoor spaces through professional lawn mowing and leaf cleaning services.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-4">
            {brandStoryPoints.map((point, index) => (
              <FadeIn key={point.title} delay={index * 0.05}>
                <article className="rounded-[1.6rem] border border-white/10 bg-white/8 px-6 py-5">
                  <div className="flex gap-4">
                    <Icon className="mt-1 text-[var(--brand-green-500)]" name={point.icon} />
                    <div>
                      <h3 className="text-xl font-semibold">{point.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/66">{point.description}</p>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {brandVoicePoints.map((point, index) => (
            <FadeIn key={point.title} delay={index * 0.04}>
              <article className="h-full rounded-[1.6rem] border border-white/10 bg-white/7 px-5 py-5">
                <Icon className="text-[var(--brand-green-500)]" name={point.icon} />
                <h3 className="mt-5 text-xl font-semibold">{point.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/64">{point.description}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProfileAudienceSection() {
  return (
    <section className="section-space bg-[var(--surface-soft)]">
      <div className="page-shell">
        <div className="grid gap-5 lg:grid-cols-[0.36fr_0.28fr_0.36fr] lg:items-stretch">
          <FadeIn>
            <ImagePanel
              alt={media.gardenPath.alt}
              className="h-full min-h-[30rem] rounded-[2rem] border border-[rgb(17_22_17/8%)] shadow-[var(--shadow-soft)]"
              src={media.gardenPath.src}
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="flex h-full flex-col justify-center rounded-[2rem] bg-[var(--ink-950)] px-6 py-8 text-white shadow-[var(--shadow-card)]">
              <Eyebrow>Service character</Eyebrow>
              <h2 className="mt-5 text-3xl font-semibold leading-tight">
                The way the work is handled matters as much as the service list.
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/68">
                Clients should feel respectful conduct, clear contact, careful finish, and a practical local footprint before they book.
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-4">
            {profilePrinciples.map((card, index) => (
              <FadeIn key={card.title} delay={index * 0.04}>
                <article className="rounded-[1.45rem] border border-[rgb(17_22_17/8%)] bg-white px-5 py-5 shadow-[var(--shadow-soft)]">
                  <div className="flex gap-4">
                    <Icon className="mt-1 text-[var(--brand-green-700)]" name={card.icon} />
                    <div>
                      <h3 className="text-xl font-semibold text-black">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{card.description}</p>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface-base)] pt-32 sm:pt-36" id="pricing">
      <div className="page-shell pb-12 pt-8 sm:pb-16">
        <div className="grid gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-stretch">
          <div>
            <Eyebrow light>Pricing</Eyebrow>
            <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.92] text-black sm:text-7xl">
              Custom quotes for the work your property needs.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
              Pricing is based on property size, service frequency, cleanup volume, and the level of care required. Thandy focuses on reliable, high-quality service, not rushed or low-quality work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/#quote-form" trailingArrow>
                Start a quote
              </ButtonLink>
              <ButtonLink href="/#services" variant="ghost">
                Review services
              </ButtonLink>
            </div>
          </div>
          <FadeIn delay={0.1}>
            <div className="relative min-h-[29rem] overflow-hidden rounded-[2.2rem] bg-[var(--ink-950)] shadow-[var(--shadow-hero)]">
              <Image
                alt={media.residential.alt}
                className="h-full w-full object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                src={media.residential.src}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_8_5/0),rgb(5_8_5/82%))]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/12 bg-white/12 px-5 py-5 text-white backdrop-blur-md">
                <p className="text-sm font-semibold uppercase text-[var(--brand-green-300)]">
                  Quote-led pricing
                </p>
                <p className="mt-2 text-base leading-7 text-white/76">
                  Every property is different, so the first step is clarity on property size, service rhythm, cleanup volume, and the level of care required.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function PricingPackagesSection() {
  return (
    <section className="section-space bg-white">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
          <FadeIn>
            <Eyebrow light>Maintenance packages</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-[0.98] text-black sm:text-5xl">
              Packages guide the conversation, not a generic price table.
            </h2>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-2">
            {packageCards.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.07}>
                <article className="flex h-full flex-col rounded-[1.25rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-base)] px-6 py-7 shadow-[var(--shadow-soft)]">
                  <p className="text-sm font-semibold uppercase text-[var(--brand-green-700)]">{item.audience}</p>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight text-black">{item.title}</h3>
                  <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{item.description}</p>
                  <ul className="mt-6 space-y-3">
                    {item.inclusions.map((inclusion) => (
                      <li key={inclusion} className="flex gap-3 text-sm font-semibold text-[var(--ink-900)]">
                        <Icon className="mt-0.5 h-4 w-4 text-[var(--brand-green-700)]" name="check" />
                        <span>{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <ButtonLink
                      href={
                        index === 0
                          ? "/?service=lawn-care#quote-form"
                          : "/?service=property-maintenance#quote-form"
                      }
                      trailingArrow
                      variant="ghost"
                    >
                      Discuss this scope
                    </ButtonLink>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PricingFactorsSection() {
  return (
    <section className="section-space bg-[var(--surface-soft)]">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <FadeIn>
            <Eyebrow light>Quote factors</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-[0.98] text-black sm:text-5xl">
              What changes the quote?
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              The form and follow-up conversation collect the information needed to price the work responsibly.
            </p>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            {pricingFactors.map((factor, index) => (
              <FadeIn key={factor.title} delay={index * 0.04}>
                <article className="rounded-[1.55rem] border border-[rgb(17_22_17/8%)] bg-white px-5 py-5 shadow-[var(--shadow-soft)]">
                  <Icon className="text-[var(--brand-green-700)]" name={factor.icon} />
                  <h3 className="mt-5 text-2xl font-semibold text-black">{factor.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{factor.description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactQuoteSection({
  includeFaq = true,
  service,
}: {
  includeFaq?: boolean;
  service?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--ink-950)] pt-32 text-white sm:pt-36" id="quote-form">
      <div className="absolute inset-0 opacity-25">
        <Image
          alt={media.gardenPath.alt}
          className="h-full w-full object-cover"
          fill
          priority
          sizes="100vw"
          src={media.gardenPath.src}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink-950)_0%,rgb(5_8_5/94%)_48%,rgb(5_8_5/78%))]" />
      <div className="page-shell relative pb-16 pt-8 sm:pb-20 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-stretch">
          <div className="h-full">
            <div className="flex h-full flex-col justify-between">
              <div>
                <Eyebrow>Contact</Eyebrow>
                <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-[0.94] sm:text-6xl">
                  Tell us what needs attention.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/76">
                  Every property is different. Share the property, service need, and timing notes so Thandy can prepare a custom quote and respond with useful next steps.
                </p>
              </div>
              <div className="mt-8 grid gap-4">
                {contactCards.map((card) => (
                  <article key={card.title} className="rounded-[1.5rem] border border-white/10 bg-white/8 px-5 py-5 backdrop-blur-md">
                    <div className="flex gap-4">
                      <Icon className="mt-1 text-[var(--brand-green-500)]" name={card.icon} />
                      <div className="min-w-0">
                        <h2 className="font-semibold">{card.title}</h2>
                        {card.href ? (
                          <a className="mt-2 block [overflow-wrap:anywhere] text-white/82" href={card.href}>
                            {card.value}
                          </a>
                        ) : (
                          <p className="mt-2 [overflow-wrap:anywhere] text-white/82">{card.value}</p>
                        )}
                        <p className="mt-2 text-sm leading-6 text-white/58">{card.description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div className="h-full">
            <div className="h-full rounded-[2rem] bg-white px-6 py-6 text-[var(--text-primary)] shadow-[var(--shadow-card)] sm:px-8 sm:py-8">
              <Eyebrow light>Quote form</Eyebrow>
              <h2 className="mt-5 text-3xl font-semibold text-black">
                Request a landscaping quote.
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                The form keeps the booking path short while collecting enough detail for a useful callback.
              </p>
              <div className="mt-7">
                <QuoteForm key={service ?? "empty-service"} service={service} />
              </div>
            </div>
          </div>
        </div>

        {includeFaq ? <FaqPanel /> : null}
      </div>
    </section>
  );
}

export function ContactChannelsSection() {
  return (
    <section className="section-space bg-white">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <FadeIn>
            <Eyebrow light>Where we show up</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-[0.98] text-black sm:text-5xl">
              Service details, booking, and communication all need a clear place.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              The brand strategy keeps customer communication simple: the website carries service details and quote requests, while phone and email keep follow-up direct.
            </p>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            {connectionChannels.map((channel, index) => (
              <FadeIn key={channel.title} delay={index * 0.05}>
                <article className="h-full rounded-[1.65rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-base)] px-6 py-6 shadow-[var(--shadow-soft)]">
                  <Icon className="text-[var(--brand-green-700)]" name={channel.icon} />
                  <h3 className="mt-5 text-2xl font-semibold text-black">{channel.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{channel.description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqPanel() {
  return (
    <FadeIn delay={0.18}>
      <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/8 px-6 py-6 backdrop-blur-md">
        <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold">
              Quick answers before booking.
            </h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </div>
    </FadeIn>
  );
}

export function FinalCtaSection({
  eyebrow = "Ready to book",
  title = "Start with the property details.",
  description = "Send the location, service need, and timing notes so Thandy can prepare the next conversation about your quote.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="section-space bg-[var(--surface-base)]">
      <div className="page-shell">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2.2rem] bg-[var(--ink-950)] px-6 py-8 text-white shadow-[var(--shadow-card)] sm:px-8 sm:py-10 lg:px-10">
            <Image
              alt={media.sunsetMower.alt}
              className="absolute inset-0 h-full w-full object-cover opacity-28"
              fill
              sizes="100vw"
              src={media.sunsetMower.src}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink-950),rgb(5_8_5/74%))]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <Eyebrow>{eyebrow}</Eyebrow>
                <h2 className="mt-5 text-balance text-4xl font-semibold sm:text-5xl">
                  {title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/76">{description}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <ButtonLink href="/#quote-form" trailingArrow>
                  Request quote
                </ButtonLink>
                <ButtonLink href={siteConfig.phone.href} icon="phone" variant="secondary">
                  Call Thandy
                </ButtonLink>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
