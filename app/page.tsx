import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { FAQ } from "@/components/ui/faq";
import { Icon } from "@/components/ui/icons";
import { FadeIn } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { JsonLd } from "@/components/site/json-ld";
import { QuoteForm } from "@/components/site/quote-form";
import { HeroPlaque } from "@/components/three/hero-plaque";
import {
  aboutHighlights,
  audienceCards,
  contactCards,
  faqItems,
  packageCards,
  pricingFactors,
  processSteps,
  reliabilityPoints,
  serviceCards,
  siteConfig,
  trustChips,
} from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createFaqSchema, createProfessionalServiceSchema } from "@/lib/schema";

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata = createPageMetadata({
  title: "Hamilton lawn care, cleanup, and property maintenance",
  description:
    "Thandy Landscaping Services Inc. is a locally operated business providing dependable lawn care, seasonal cleanup, and outdoor property maintenance in Hamilton and surrounding areas.",
  path: "/",
});

const serviceMedia = [
  {
    src: "/images/photography/lawn-care-golden-hour.jpg",
    alt: "A mower and crew member crossing a lawn at golden hour",
    className: "object-center",
  },
  {
    src: "/images/photography/seasonal-cleanup-leaf-blower.jpg",
    alt: "A Thandy crew member clearing leaves along a garden path",
    className: "object-center",
  },
  {
    src: "/images/photography/thandy-sign-yard.jpg",
    alt: "A Thandy yard sign set into a landscaped lawn at sunrise",
    className: "object-center",
  },
] as const;

const aboutMedia = {
  src: "/images/photography/brand-guide.jpg",
  alt: "A close-up Thandy brand image featuring the mower and logo in green light",
  className: "object-center",
} as const;

const marqueeItems = [
  "Lawn mowing, edging & trimming",
  "Spring and fall cleanup",
  "Debris clearing",
  "Green waste removal",
  "Reliable service and consistent quality",
  "Trusted, registered business",
] as const;

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const selectedService = typeof params.service === "string" ? params.service : null;
  const schema = [
    createProfessionalServiceSchema(),
    createBreadcrumbSchema([{ name: "Home", path: "/" }]),
    createFaqSchema(),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <section className="hero-gradient relative overflow-hidden pt-40 text-white sm:pt-44">
        <div className="motion-orb motion-orb-slow pointer-events-none absolute -left-16 top-28 h-72 w-72 rounded-full bg-[rgb(126_217_87/16%)] blur-[90px]" />
        <div className="motion-orb motion-orb-fast pointer-events-none absolute right-12 top-18 h-56 w-56 rounded-full bg-[rgb(126_217_87/10%)] blur-[80px]" />
        <div className="motion-orb pointer-events-none absolute bottom-8 left-[42%] h-44 w-44 rounded-full bg-[rgb(185_234_150/9%)] blur-[68px]" />
        <div className="page-shell pb-12 pt-10 sm:pb-16 sm:pt-12">
          <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr] lg:items-stretch">
            <FadeIn className="h-full">
              <div className="panel-dark relative flex h-full min-h-[38rem] flex-col overflow-hidden rounded-[2.5rem] px-7 py-8 sm:px-8 sm:py-9">
                <div className="motion-orb motion-orb-fast pointer-events-none absolute -right-14 top-12 h-44 w-44 rounded-full bg-[rgb(126_217_87/12%)] blur-[52px]" />
                <div>
                  <span className="section-kicker">{siteConfig.hero.eyebrow}</span>
                  <h1 className="mt-6 max-w-[12ch] text-balance text-[clamp(3rem,7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
                    {siteConfig.hero.title}
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
                    {siteConfig.hero.description}
                  </p>
                </div>
                <div className="mt-10">
                  <div className="flex flex-wrap gap-3">
                    <ButtonLink href="/#quote-form" trailingArrow>
                      Get a free quote
                    </ButtonLink>
                    <ButtonLink href={siteConfig.phone.href} icon="phone" variant="secondary">
                      {siteConfig.phone.label}
                    </ButtonLink>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {trustChips.map((chip) => (
                      <span
                        key={chip.label}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-white/80"
                      >
                        <Icon className="text-[var(--brand-green-500)]" name={chip.icon} />
                        {chip.label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 rounded-[1.9rem] border border-white/10 bg-white/6 px-5 py-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-green-100)]">
                      Get a free quote
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/72 sm:text-base">
                      Every property is different — we provide custom quotes based on your needs.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn className="h-full" delay={0.16}>
              <div className="hero-aurora relative h-full min-h-[38rem] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/6 shadow-[var(--shadow-hero)]">
                <div className="motion-orb motion-orb-fast pointer-events-none absolute -left-8 top-20 h-24 w-24 rounded-full bg-[rgb(126_217_87/16%)] blur-[28px]" />
                <div className="motion-orb motion-orb-slow pointer-events-none absolute right-10 top-12 h-40 w-40 rounded-full bg-[rgb(185_234_150/12%)] blur-[42px]" />
                <Image
                  alt="A close-up mower image in green light"
                  className="h-full w-full object-cover object-[56%_center]"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  src="/images/photography/mower-closeup-green.jpg"
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,8,5,0.26),rgba(5,8,5,0.1)_36%,rgba(5,8,5,0.72))]" />
                <div className="relative grid h-full grid-rows-[auto_1fr_auto] p-5 sm:p-7">
                  <div className="flex justify-end">
                    <TiltCard className="max-w-[18rem]" intensity={8} lift={-6}>
                      <div className="rounded-[1.75rem] border border-white/12 bg-[rgb(255_255_255/10%)] px-5 py-4 backdrop-blur">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-green-100)]">
                          Service area
                        </p>
                        <p className="mt-3 text-sm leading-6 text-white/76">
                          Proudly serving Hamilton and surrounding residential and commercial areas.
                        </p>
                      </div>
                    </TiltCard>
                  </div>
                  <div />
                  <div className="grid gap-4 lg:grid-cols-[0.94fr_1.06fr] lg:items-end">
                    <TiltCard className="h-full" intensity={7} lift={-6}>
                      <div className="h-full rounded-[1.75rem] border border-white/12 bg-[rgb(5_8_5/42%)] px-5 py-4 backdrop-blur">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-green-100)]">
                          Reliable Property Care
                        </p>
                        <p className="mt-3 text-sm leading-6 text-white/72">
                          {siteConfig.tagline}
                        </p>
                      </div>
                    </TiltCard>
                    <div className="w-full max-w-[20.5rem] justify-self-end motion-safe:animate-[float-drift_9s_ease-in-out_infinite]">
                      <HeroPlaque />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="relative pb-8 pt-4 sm:pt-6">
        <div className="page-shell">
          <div className="panel px-5 py-5 sm:px-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {audienceCards.map((card, index) => (
                <FadeIn key={card.title} delay={index * 0.04}>
                  <TiltCard className="h-full" glare={false} intensity={7} lift={-6}>
                    <article className="h-full rounded-[1.7rem] border border-[rgb(17_22_17/6%)] bg-[linear-gradient(180deg,#fff,#f8fbf6)] px-5 py-5">
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-[rgb(126_217_87/16%)] p-3 text-[var(--brand-green-700)]">
                          <Icon name={card.icon} />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink-900)]">
                            {card.title}
                          </h2>
                          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
        <div className="relative left-1/2 mt-5 w-screen -translate-x-1/2 overflow-hidden border-y border-[rgb(17_22_17/8%)] bg-white/84 py-3 shadow-[var(--shadow-soft)]">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,var(--surface-base),rgb(252_252_251/0))] sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,var(--surface-base),rgb(252_252_251/0))] sm:w-24" />
          <div className="motion-marquee flex w-max gap-3 px-4 pr-3 sm:px-6 lg:px-8">
            {Array.from({ length: 2 }).flatMap((_, repeatIndex) =>
              marqueeItems.map((item, itemIndex) => (
                <div
                  key={`${repeatIndex}-${itemIndex}-${item}`}
                  className="inline-flex items-center gap-3 rounded-full border border-[rgb(17_22_17/6%)] bg-[var(--surface-base)] px-4 py-2 text-sm font-medium text-[var(--ink-900)]"
                >
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand-green-500)] shadow-[0_0_0_5px_rgb(126_217_87/14%)]" />
                  <span>{item}</span>
                </div>
              )),
            )}
          </div>
        </div>
      </section>

      <section
        className="section-space scroll-mt-32 sm:scroll-mt-36"
        id="services"
      >
        <div className="page-shell">
          <SectionHeading
            description="We offer a range of landscaping and maintenance services designed to keep your outdoor space looking its best."
            eyebrow="Services"
            size="wide"
            title="Our services"
          />
          <div className="mt-14 grid gap-6 xl:grid-cols-3">
            {serviceCards.map((service, index) => (
              <FadeIn key={service.slug} className="h-full" delay={index * 0.05}>
                <TiltCard className="h-full" intensity={8}>
                  <article
                    className={
                      index === 1
                        ? "panel-dark group flex h-full flex-col overflow-hidden rounded-[2.3rem]"
                        : "panel group flex h-full flex-col overflow-hidden rounded-[2.3rem]"
                    }
                  >
                    <div className="relative h-64 overflow-hidden sm:h-72">
                      <Image
                        alt={serviceMedia[index].alt}
                        className={`h-full w-full object-cover transition duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04] ${serviceMedia[index].className}`}
                        height={2481}
                        src={serviceMedia[index].src}
                        width={3508}
                      />
                      {index === 0 ? (
                        <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-[1.35rem] border border-white/14 bg-[rgb(5_8_5/52%)] px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur">
                          <Image
                            alt=""
                            aria-hidden="true"
                            className="h-auto w-[9.5rem] drop-shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
                            height={160}
                            src="/images/brand/logo-white-green.png"
                            width={534}
                          />
                        </div>
                      ) : null}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,5,0.04),rgba(5,8,5,0.38))]" />
                    </div>
                    <div className="flex flex-1 flex-col px-6 py-6 sm:px-7 sm:py-7">
                      <span className={index === 1 ? "section-kicker" : "section-kicker section-kicker-light"}>
                        {service.eyebrow}
                      </span>
                      <div className="mt-5 flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${
                            index === 1
                              ? "bg-[rgb(126_217_87/18%)]"
                              : "bg-[rgb(126_217_87/12%)] ring-1 ring-[rgb(126_217_87/20%)]"
                          }`}
                        >
                          {service.emoji}
                        </span>
                        <h2
                          className={`text-3xl font-semibold tracking-[-0.05em] ${
                            index === 1 ? "text-white" : "text-[var(--ink-900)]"
                          }`}
                        >
                          {service.title}
                        </h2>
                      </div>
                      <p
                        className={`mt-4 text-base leading-7 ${
                          index === 1 ? "text-white/76" : "text-[var(--text-secondary)]"
                        }`}
                      >
                        {service.summary}
                      </p>
                      <ul
                        className={`mt-6 space-y-3 text-sm leading-6 ${
                          index === 1 ? "text-white/72" : "text-[var(--text-secondary)]"
                        }`}
                      >
                        {service.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 rounded-full p-1 ${
                                index === 1
                                  ? "bg-[rgb(126_217_87/20%)] text-[var(--brand-green-500)]"
                                  : "bg-[rgb(126_217_87/16%)] text-[var(--brand-green-700)]"
                              }`}
                            >
                              <Icon className="h-3.5 w-3.5" name="check" />
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-6">
                        <ButtonLink href={service.href} trailingArrow variant={index === 1 ? "primary" : "ghost"}>
                          Request this service
                        </ButtonLink>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-space scroll-mt-32 bg-[var(--surface-soft)] sm:scroll-mt-36"
        id="pricing"
      >
        <div className="page-shell">
          <SectionHeading
            description="Our pricing is based on property size, service frequency, and the level of care required. We focus on delivering reliable, high-quality service — not rushed or low-quality work."
            eyebrow="Pricing guide"
            size="wide"
            title="Maintenance packages and custom quotes."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pricingFactors.map((factor, index) => (
              <FadeIn key={factor.title} className="h-full" delay={index * 0.04}>
                <TiltCard className="h-full" intensity={7}>
                  <article className="panel-dark flex h-full flex-col rounded-[1.8rem] px-5 py-5">
                    <div className="rounded-2xl bg-[rgb(126_217_87/18%)] p-3 text-[var(--brand-green-500)]">
                      <Icon name={factor.icon} />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">{factor.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/68">{factor.description}</p>
                  </article>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {packageCards.map((pkg, index) => (
              <FadeIn key={pkg.name} delay={index * 0.06}>
                <TiltCard className="h-full" intensity={6}>
                  <article className="panel h-full px-8 py-8">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgb(126_217_87/12%)] text-xl ring-1 ring-[rgb(126_217_87/20%)]"
                      >
                        {pkg.emoji}
                      </span>
                      <span className="section-kicker section-kicker-light">{pkg.name}</span>
                    </div>
                    <h3 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-[var(--ink-900)]">
                      {pkg.audience}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                      {pkg.summary}
                    </p>
                    <ul className="mt-6 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
                      {pkg.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-0.5 rounded-full bg-[rgb(126_217_87/16%)] p-1 text-[var(--brand-green-700)]">
                            <Icon className="h-3.5 w-3.5" name="check" />
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <ButtonLink href={pkg.href} trailingArrow>
                        Request quote
                      </ButtonLink>
                    </div>
                  </article>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.12}>
            <div className="band-gradient band-gradient-animated mt-10 rounded-[2.2rem] px-6 py-6 text-white shadow-[var(--shadow-card)] sm:px-8 sm:py-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="section-kicker">Get a free quote</p>
                  <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                    Every property is different — we provide custom quotes based on your needs.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/#quote-form" trailingArrow>
                    Get a free quote
                  </ButtonLink>
                  <ButtonLink href={siteConfig.phone.href} icon="phone" variant="secondary">
                    Call or message today
                  </ButtonLink>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section
        className="section-space scroll-mt-32 bg-[var(--ink-950)] text-white sm:scroll-mt-36"
        id="about"
      >
        <div className="page-shell">
          <SectionHeading
            description="Thandy Landscaping Services Inc. is a locally operated business dedicated to providing reliable, professional, and high-quality outdoor property care."
            eyebrow="About us"
            light
            size="wide"
            title="Who we are"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
            <FadeIn className="h-full">
              <article className="panel-dark flex h-full flex-col rounded-[2.2rem] px-7 py-7">
                <p className="section-kicker">Our approach</p>
                <h3 className="mt-5 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.05em]">
                  We don’t rush jobs or cut corners.
                </h3>
                <p className="mt-5 max-w-3xl text-base leading-7 text-white/74">
                  Every service is delivered with attention to detail, respect for your property, and consistent quality. We aim to build long-term relationships by being dependable and easy to work with.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {aboutHighlights.map((highlight) => (
                    <TiltCard key={highlight.title} className="h-full" intensity={6} lift={-5}>
                      <div className="h-full rounded-[1.6rem] border border-white/8 bg-white/6 px-4 py-4">
                        <div className="rounded-2xl bg-[rgb(126_217_87/18%)] p-3 text-[var(--brand-green-500)]">
                          <Icon name={highlight.icon} />
                        </div>
                        <h4 className="mt-4 text-lg font-semibold tracking-[-0.03em]">{highlight.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-white/72">{highlight.description}</p>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </article>
            </FadeIn>
            <FadeIn className="h-full" delay={0.06}>
              <TiltCard className="h-full" intensity={5} lift={-6}>
                <div className="h-full overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/6 shadow-[var(--shadow-card)]">
                  <Image
                    alt={aboutMedia.alt}
                    className={`h-full min-h-[24rem] w-full object-cover transition duration-700 ease-[var(--ease-out)] hover:scale-[1.03] ${aboutMedia.className}`}
                    height={2481}
                    src={aboutMedia.src}
                    width={3508}
                  />
                </div>
              </TiltCard>
            </FadeIn>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reliabilityPoints.map((point, index) => (
              <FadeIn key={point.title} className="h-full" delay={index * 0.05}>
                <TiltCard className="h-full" intensity={6} lift={-6}>
                  <article className="flex h-full flex-col rounded-[1.75rem] border border-white/8 bg-white/6 px-5 py-5">
                    <div className="rounded-2xl bg-[rgb(126_217_87/18%)] p-3 text-[var(--brand-green-500)]">
                      <Icon name={point.icon} />
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">{point.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/72">{point.description}</p>
                  </article>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          <SectionHeading
            description="Our pricing is based on property size, service frequency, and the level of care required. Contact us for a personalized quote."
            eyebrow="Get a free quote"
            size="wide"
            title="Every property is different — we provide custom quotes based on your needs."
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <FadeIn key={step.number} className="h-full" delay={index * 0.05}>
                <TiltCard className="h-full" intensity={7}>
                  <article className="panel flex h-full flex-col px-6 py-7">
                    <div className="rounded-2xl bg-[rgb(126_217_87/16%)] p-3 text-[var(--brand-green-700)]">
                      <Icon name={step.icon} />
                    </div>
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Step {step.number}
                    </p>
                    <h3 className="mt-3 text-[1.95rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--ink-900)]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{step.description}</p>
                  </article>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.12}>
            <div className="panel mt-10 rounded-[2.2rem] px-6 py-6 sm:px-8 sm:py-8">
              <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
                <div className="max-w-xl">
                  <p className="section-kicker section-kicker-light">FAQ</p>
                  <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.05em] text-[var(--ink-900)] sm:text-4xl">
                    Before and after results, service area, and common questions.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                    Real results. Real properties. Consistent, high-quality results you can trust, plus a few quick answers before you request a quote.
                  </p>
                  <div className="mt-6">
                    <ButtonLink href="/#quote-form" trailingArrow>
                      Jump to the quote form
                    </ButtonLink>
                  </div>
                </div>
                <FAQ items={faqItems} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section
        className="hero-gradient relative overflow-hidden scroll-mt-32 text-white sm:scroll-mt-36"
        id="quote-form"
      >
        <div className="page-shell section-space">
          <FadeIn>
            <div className="max-w-[58rem]">
              <span className="section-kicker">Get a free quote</span>
              <h2 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                Get a free quote
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
                Every property is different — we provide custom quotes based on your needs.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="mt-8 flex flex-wrap gap-3">
              {trustChips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-white/80"
                >
                  <Icon className="text-[var(--brand-green-500)]" name={chip.icon} />
                  {chip.label}
                </span>
              ))}
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {contactCards.map((card, index) => (
              <FadeIn key={card.title} className="h-full" delay={0.12 + index * 0.04}>
                <TiltCard className="h-full" intensity={6} lift={-5}>
                  <article className="flex h-full min-w-0 flex-col rounded-[1.75rem] border border-white/10 bg-white/6 px-5 py-5">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgb(126_217_87/18%)] text-xl">
                      <span aria-hidden="true" className="leading-none">
                        {card.emoji}
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/54">
                      {card.title}
                    </p>
                    {card.href ? (
                      <a
                        className="mt-2 block min-w-0 text-base font-medium leading-7 text-white/78 [overflow-wrap:anywhere]"
                        href={card.href}
                      >
                        {card.value}
                      </a>
                    ) : (
                      <p className="mt-2 min-w-0 text-base font-medium leading-7 text-white/78 [overflow-wrap:anywhere]">
                        {card.value}
                      </p>
                    )}
                    <p className="mt-2 text-sm leading-6 text-white/58">{card.description}</p>
                  </article>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.22}>
            <div className="panel mt-8 rounded-[2.4rem] bg-white px-6 py-6 text-[var(--text-primary)] shadow-[var(--shadow-card)] sm:px-8 sm:py-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="section-kicker section-kicker-light">Quote form</p>
                  <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[var(--ink-900)]">
                    Share the details for your quote request.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                    Name, phone, address, service needed, and a short message help us prepare a personalized quote.
                  </p>
                </div>
                <ButtonLink href={siteConfig.phone.href} icon="phone" variant="ghost">
                  Call or message today
                </ButtonLink>
              </div>
              <div className="mt-8">
                <QuoteForm service={selectedService} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
