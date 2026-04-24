import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

type ThankYouPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata = createPageMetadata({
  title: "Thank you",
  description: "Your quote request has been received by Thandy Landscaping Services Inc.",
  path: "/thank-you",
});

const serviceLabels: Record<string, string> = {
  "lawn-care": "lawn care",
  "seasonal-cleanup": "seasonal cleanup",
  "property-maintenance": "property maintenance",
  "custom-scope": "a custom scope",
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const selectedService =
    typeof params.service === "string" ? serviceLabels[params.service] : undefined;

  return (
    <section className="hero-gradient min-h-[calc(100vh-5rem)] pt-36 text-white">
      <div className="page-shell pb-20">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-white/10 bg-[rgb(255_255_255/8%)] px-7 py-8 shadow-[var(--shadow-card)] backdrop-blur">
          <div className="rounded-2xl bg-[rgb(126_217_87/18%)] p-3 text-[var(--brand-green-500)] w-fit">
            <Icon name="check" />
          </div>
          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
            Thanks. The request is in.
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/76">
            {selectedService
              ? `We captured your request for ${selectedService}.`
              : "We captured your request."} If the work is urgent, calling now is still the fastest option.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.phone.href} icon="phone">
              Call now
            </ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Return home
            </ButtonLink>
          </div>
          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/6 px-5 py-5 text-sm leading-7 text-white/70">
            Service area: Hamilton and surrounding residential and commercial areas. If you need to
            add context before the callback, email {siteConfig.email.label}.
          </div>
        </div>
      </div>
    </section>
  );
}
