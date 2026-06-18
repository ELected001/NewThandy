import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/site/json-ld";
import { Icon } from "@/components/ui/icons";
import { createPublishedPageMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";
import { getSeoPageConfig } from "@/lib/seo-store";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return createPublishedPageMetadata("blog");
}

const categories = [
  { label: "Lawn care", href: "#lawn-care", count: 1 },
  { label: "Seasonal cleanup", href: "#seasonal-cleanup", count: 1 },
  { label: "Property maintenance", href: "#property-maintenance", count: 1 },
  { label: "Booking prep", href: "#booking-prep", count: 1 },
] as const;

const featuredArticle = {
  eyebrow: "Featured guide",
  title: "What to prepare before a lawn care visit",
  description:
    "A practical pre-visit checklist covering access, outdoor items, pets, timing, and the property notes that help a lawn mowing appointment run smoothly.",
  href: "#prepare-lawn-care-visit",
  category: "Booking prep",
  date: "2026-04-28",
  displayDate: "April 28, 2026",
  readTime: "4 min read",
  image: {
    src: "/images/brand-strategy/lawn-mower-close.jpg",
    alt: "A landscaping worker mowing a bright green residential lawn",
  },
} as const;

const articles = [
  {
    id: "prepare-lawn-care-visit",
    categoryId: "booking-prep",
    category: "Booking prep",
    title: "Before the mower arrives: a short property checklist",
    excerpt:
      "Move small outdoor items, confirm gate access, note pets, and flag any areas that need extra care before the visit starts.",
    date: "2026-04-28",
    displayDate: "April 28, 2026",
    readTime: "4 min read",
    image: "/images/photography/lawn-care.jpg",
    imageAlt: "A freshly maintained green lawn near a home",
  },
  {
    id: "leaf-cleanup-quote-factors",
    categoryId: "seasonal-cleanup",
    category: "Seasonal cleanup",
    title: "What affects a leaf cleanup quote?",
    excerpt:
      "Leaf volume, wet debris, bagging needs, green waste handling, and access all shape the final cleanup scope.",
    date: "2026-04-28",
    displayDate: "April 28, 2026",
    readTime: "5 min read",
    image: "/images/photography/leaf-blower.png",
    imageAlt: "A leaf blower clearing leaves from a residential lawn",
  },
  {
    id: "recurring-maintenance-rhythm",
    categoryId: "property-maintenance",
    category: "Property maintenance",
    title: "Choosing a recurring maintenance rhythm",
    excerpt:
      "A simple way to think through property size, use, growth rate, and the difference between one-time cleanup and ongoing upkeep.",
    date: "2026-04-28",
    displayDate: "April 28, 2026",
    readTime: "4 min read",
    image: "/images/brand-strategy/hedge-maintenance.jpg",
    imageAlt: "A landscaping worker trimming a clean hedge beside a lawn",
  },
  {
    id: "lawn-care-finish",
    categoryId: "lawn-care",
    category: "Lawn care",
    title: "What makes a lawn look finished after mowing?",
    excerpt:
      "Mowing height, edges, trimming, path cleanup, and visible lines all contribute to a cleaner finished property.",
    date: "2026-04-28",
    displayDate: "April 28, 2026",
    readTime: "3 min read",
    image: "/images/brand-strategy/residential-lawn.jpg",
    imageAlt: "A large residential property with a clean green lawn",
  },
] as const;

const editorialFormats = [
  "Step-by-step prep guides",
  "Seasonal cleanup explainers",
  "Property maintenance checklists",
  "Short field notes from real service questions",
  "Image-led before-care and after-care notes",
  "FAQ expansions for quote conversations",
] as const;

const readingPaths = [
  {
    title: "For homeowners",
    description: "Start with visit preparation, lawn finish, and seasonal cleanup basics.",
    icon: "leaf" as const,
  },
  {
    title: "For landlords",
    description: "Focus on recurring maintenance rhythm, access planning, and curb appeal between tenants.",
    icon: "building" as const,
  },
  {
    title: "For property managers",
    description: "Use the quote-factor guides to scope repeat visits and multi-property maintenance needs.",
    icon: "layers" as const,
  },
] as const;

export default async function BlogPage() {
  const blogSeo = await getSeoPageConfig("blog");
  const schema = [
    createWebPageSchema({
      name: blogSeo.title,
      description: blogSeo.description,
      path: blogSeo.path,
    }),
    createBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <section className="blog-hero-stage border-b border-[rgb(17_22_17/8%)] bg-white pt-32 text-[var(--text-primary)] sm:pt-36">
        <div aria-hidden="true" className="blog-hero-sweep" />
        <div className="blog-hero-content page-shell pb-12 pt-8 sm:pb-14">
          <div className="max-w-4xl">
            <span className="section-kicker section-kicker-light">Blog</span>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brand-green-700)]">
              Field notes and practical guides
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.96] text-black sm:text-7xl">
              Outdoor Care Journal
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl sm:leading-9">
              Practical reading for lawn care, seasonal cleanup, quote preparation, and property maintenance. Browse short guides, field notes, checklists, and service explainers before planning the next outdoor care visit.
            </p>
          </div>

          <nav aria-label="Blog categories" className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-[rgb(17_22_17/10%)] bg-[var(--surface-base)] px-4 py-2 text-sm font-semibold text-[var(--ink-900)] transition hover:border-[rgb(126_217_87/38%)] hover:bg-white"
                href={category.href}
                key={category.label}
              >
                <span>{category.label}</span>
                <span className="text-[var(--text-muted)]">{category.count}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-[var(--surface-base)] py-10 sm:py-12" id="featured">
        <div className="page-shell">
          <article className="blog-featured-card grid overflow-hidden rounded-[0.85rem] border border-[rgb(17_22_17/8%)] bg-white shadow-[var(--shadow-soft)] lg:grid-cols-[0.52fr_0.48fr]">
            <div className="effect-media-frame relative min-h-[22rem] overflow-hidden bg-[var(--ink-950)] lg:min-h-[32rem]">
              <Image
                alt={featuredArticle.image.alt}
                className="h-full w-full object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                src={featuredArticle.image.src}
              />
            </div>
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-green-700)]">
                  {featuredArticle.eyebrow}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--text-muted)]">
                  <span>{featuredArticle.category}</span>
                  <span aria-hidden="true">/</span>
                  <time dateTime={featuredArticle.date}>{featuredArticle.displayDate}</time>
                  <span aria-hidden="true">/</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-black sm:text-5xl">
                  <a className="transition hover:text-[var(--brand-green-700)]" href={featuredArticle.href}>
                    {featuredArticle.title}
                  </a>
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                  {featuredArticle.description}
                </p>
              </div>
              <div className="mt-8 border-t border-[rgb(17_22_17/8%)] pt-5 text-sm leading-6 text-[var(--text-muted)]">
                Start here if you are preparing for a first visit or want a cleaner quote conversation.
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section-space bg-white" id="latest">
        <div className="page-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="section-kicker section-kicker-light">Latest notes</span>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-black sm:text-5xl">
                Practical notes for common property-care questions.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-[var(--text-secondary)]">
              Browse by service type, cleanup need, or booking stage, then use the details to prepare a clearer request.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {articles.map((article) => (
              <article
                className="blog-note-card grid overflow-hidden rounded-[0.85rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-base)] shadow-[var(--shadow-soft)] sm:grid-cols-[12rem_minmax(0,1fr)]"
                id={article.id}
                key={article.id}
              >
                <div className="effect-media-frame relative min-h-[13rem] overflow-hidden bg-[var(--ink-950)] sm:min-h-full">
                  <Image
                    alt={article.imageAlt}
                    className="h-full w-full object-cover transition duration-700 ease-[var(--ease-out)] hover:scale-[1.04]"
                    fill
                    sizes="(max-width: 768px) 100vw, 12rem"
                    src={article.image}
                  />
                </div>
                <div className="flex flex-col p-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--brand-green-700)]">
                    <span id={article.categoryId}>{article.category}</span>
                    <span className="text-[var(--text-muted)]">{article.readTime}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight text-black">
                    <a className="transition hover:text-[var(--brand-green-700)]" href={`#${article.id}`}>
                      {article.title}
                    </a>
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                    {article.excerpt}
                  </p>
                  <time className="mt-5 text-sm text-[var(--text-muted)]" dateTime={article.date}>
                    {article.displayDate}
                  </time>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--surface-base)]" id="library-plan">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <aside className="blog-note-card rounded-[0.85rem] border border-[rgb(17_22_17/8%)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <span className="section-kicker section-kicker-light">Reading paths</span>
            <div className="mt-6 grid gap-4">
              {readingPaths.map((path) => (
                <div className="border-t border-[rgb(17_22_17/8%)] pt-4 first:border-t-0 first:pt-0" key={path.title}>
                  <Icon className="text-[var(--brand-green-700)]" name={path.icon} />
                  <h3 className="mt-3 text-xl font-semibold text-black">{path.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {path.description}
                  </p>
                </div>
              ))}
            </div>
          </aside>

          <div>
            <span className="section-kicker section-kicker-light">Content pipeline</span>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-black sm:text-5xl">
              More ways to learn outdoor care.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              Future notes can cover service preparation, seasonal timing, visual walkthroughs, and recurring maintenance decisions in a clear editorial format.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {editorialFormats.map((format) => (
                <div
                  className="blog-note-card rounded-[0.85rem] border border-[rgb(17_22_17/8%)] bg-white px-5 py-4 text-sm font-semibold leading-6 text-[var(--ink-900)] shadow-[var(--shadow-soft)]"
                  key={format}
                >
                  {format}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
