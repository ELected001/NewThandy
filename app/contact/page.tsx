import { permanentRedirect } from "next/navigation";

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const service = typeof params.service === "string" ? params.service : null;

  permanentRedirect(
    service ? `/?service=${encodeURIComponent(service)}#quote-form` : "/#quote-form",
  );
}
