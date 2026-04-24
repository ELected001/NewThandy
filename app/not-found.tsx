import { ButtonLink } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Page not found",
  description: "The requested page could not be found on the Thandy Landscaping Services Inc. site.",
  path: "/404",
});

export default function NotFound() {
  return (
    <section className="section-space pt-36">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-[rgb(17_22_17/8%)] bg-white px-7 py-8 text-center shadow-[var(--shadow-card)]">
          <p className="section-kicker section-kicker-light">404</p>
          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.06em] text-[var(--ink-900)] sm:text-6xl">
            The page has gone missing, but the quote path is still easy.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
            Head back to the homepage or jump straight to the quote form.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Go home</ButtonLink>
            <ButtonLink href="/#quote-form" variant="ghost">
              Get a free quote
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
