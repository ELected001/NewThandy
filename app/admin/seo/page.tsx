import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutSeoAdminAction } from "@/app/admin/seo/actions";
import { isSeoAdminAuthenticated } from "@/lib/admin-auth";
import { getPublishedSeoAdminPages } from "@/lib/seo-admin";

export default async function SeoAdminPage() {
  if (!(await isSeoAdminAuthenticated())) {
    redirect("/admin/seo/login");
  }

  const pages = await getPublishedSeoAdminPages();

  return (
    <section className="section-space bg-[var(--surface-base)] pt-36">
      <div className="page-shell">
        <div className="flex flex-col gap-5 border-b border-[rgb(17_22_17/8%)] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--brand-green-700)]">
              SEO Admin
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-black">
              Manage published search metadata.
            </h1>
            <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
              Edit the page-level SEO fields that power metadata, social cards,
              sitemap inclusion, and the admin manifest.
            </p>
          </div>
          <form action={logoutSeoAdminAction}>
            <button
              className="inline-flex h-11 items-center justify-center rounded-full border border-[rgb(17_22_17/12%)] bg-white px-4 text-sm font-semibold text-[var(--ink-900)] transition hover:-translate-y-0.5 hover:bg-[var(--surface-soft)]"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {pages.map((page) => (
            <article
              className="rounded-[1.25rem] border border-[rgb(17_22_17/8%)] bg-white p-5 shadow-[var(--shadow-soft)]"
              key={page.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold text-black">{page.label}</h2>
                  <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">
                    {page.path}
                  </p>
                </div>
                <span className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-xs font-semibold text-[var(--ink-900)]">
                  {page.indexable ? "Indexable" : "Noindex"}
                </span>
              </div>
              <p className="mt-5 text-base font-semibold leading-7 text-[var(--ink-900)]">
                {page.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {page.description}
              </p>
              <dl className="mt-5 grid gap-2 border-t border-[rgb(17_22_17/8%)] pt-4 text-sm">
                <div>
                  <dt className="font-semibold text-[var(--ink-900)]">Canonical</dt>
                  <dd className="mt-1 break-words text-[var(--text-secondary)]">
                    {page.canonicalUrl}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-[var(--ink-900)]">Sitemap</dt>
                  <dd className="mt-1 text-[var(--text-secondary)]">
                    {page.sitemapIncluded ? "Included" : "Excluded"}
                  </dd>
                </div>
              </dl>
              <div className="mt-5">
                <Link
                  className="button-effect inline-flex h-11 items-center justify-center rounded-full bg-[var(--brand-green-500)] px-4 text-sm font-semibold text-[var(--ink-950)] shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-green-300)]"
                  href={`/admin/seo/${page.id}`}
                >
                  Edit SEO
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
