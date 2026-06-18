import { redirect } from "next/navigation";
import { SeoLoginForm } from "@/components/admin/seo-login-form";
import { isSeoAdminAuthenticated, isSeoAdminConfigured } from "@/lib/admin-auth";

export default async function SeoAdminLoginPage() {
  if (await isSeoAdminAuthenticated()) {
    redirect("/admin/seo");
  }

  const configured = isSeoAdminConfigured();

  return (
    <section className="section-space bg-[var(--surface-base)] pt-36">
      <div className="page-shell">
        <div className="mx-auto max-w-xl rounded-[1.5rem] border border-[rgb(17_22_17/8%)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--brand-green-700)]">
            SEO Admin
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-black">
            Sign in to manage search metadata.
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
            This area controls page titles, descriptions, canonical paths, social sharing
            metadata, and robots settings.
          </p>
          {!configured ? (
            <p className="mt-6 rounded-[0.85rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
              Set SEO_ADMIN_USERNAME and SEO_ADMIN_PASSWORD before this admin area can be used.
            </p>
          ) : (
            <SeoLoginForm />
          )}
        </div>
      </div>
    </section>
  );
}
