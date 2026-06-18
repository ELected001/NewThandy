import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SeoEditor } from "@/components/admin/seo-editor";
import { seo, type SeoPageConfig } from "@/content/site";
import { isSeoAdminAuthenticated } from "@/lib/admin-auth";
import { resolveSeoPageConfig } from "@/lib/seo-admin";
import { getSeoPageConfig, isSeoPageId } from "@/lib/seo-store";
import { getSeoAdminFormValuesFromPage } from "@/lib/seo-validation";

type SeoAdminEditorPageProps = {
  params: Promise<{
    pageId: string;
  }>;
  searchParams?: Promise<{
    reset?: string;
    storage?: string;
  }>;
};

export default async function SeoAdminEditorPage({
  params,
  searchParams,
}: SeoAdminEditorPageProps) {
  if (!(await isSeoAdminAuthenticated())) {
    redirect("/admin/seo/login");
  }

  const { pageId } = await params;

  if (!isSeoPageId(pageId)) {
    notFound();
  }

  const query = await searchParams;
  const pageConfig = await getSeoPageConfig(pageId);
  const resolvedPage = resolveSeoPageConfig(pageId, pageConfig);
  const initialValues = getSeoAdminFormValuesFromPage(pageConfig);
  const basePage: SeoPageConfig = seo.pages[pageId];
  const lockedNoindex = basePage.robots?.index === false;

  return (
    <section className="section-space bg-[var(--surface-base)] pt-36">
      <div className="page-shell">
        <div className="mb-6">
          <Link
            className="text-sm font-semibold text-[var(--brand-green-700)] transition hover:text-[var(--ink-900)]"
            href="/admin/seo"
          >
            Back to SEO admin
          </Link>
        </div>
        <div className="mb-8 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--brand-green-700)]">
            {resolvedPage.label}
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight text-black">
            Edit page SEO.
          </h1>
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
            Update metadata for {resolvedPage.path}. These edits affect search snippets,
            social previews, canonical URLs, and index/follow intent.
          </p>
        </div>
        <SeoEditor
          initialValues={initialValues}
          lockedNoindex={lockedNoindex}
          page={resolvedPage}
          resetNotice={query?.reset === "1"}
          storageNotice={query?.storage === "readonly"}
        />
      </div>
    </section>
  );
}
