import { permanentRedirect } from "next/navigation";

type ContactPageProps = {
  searchParams?: Promise<{
    service?: string | string[];
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const requestedService = Array.isArray(params?.service)
    ? params?.service[0]
    : params?.service;
  const query = requestedService ? `?service=${encodeURIComponent(requestedService)}` : "";

  permanentRedirect(`/${query}#quote-form`);
}
