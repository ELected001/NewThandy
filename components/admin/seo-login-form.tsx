"use client";

import { useActionState } from "react";
import { loginSeoAdminAction, type SeoLoginState } from "@/app/admin/seo/actions";

const initialState: SeoLoginState = {};

function SubmitButton() {
  return (
    <button
      className="button-effect inline-flex h-12 items-center justify-center rounded-full bg-[var(--brand-green-500)] px-5 text-sm font-semibold text-[var(--ink-950)] shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-green-300)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green-500)]"
      type="submit"
    >
      Sign in
    </button>
  );
}

export function SeoLoginForm() {
  const [state, formAction] = useActionState(loginSeoAdminAction, initialState);

  return (
    <form action={formAction} className="mt-6 grid gap-4">
      <label className="grid gap-2 text-sm font-semibold text-[var(--ink-900)]">
        Admin username
        <input
          autoComplete="username"
          className="h-12 rounded-[0.85rem] border border-[rgb(17_22_17/12%)] bg-white px-4 text-base font-normal text-[var(--ink-900)] outline-none transition focus:border-[var(--brand-green-700)] focus:ring-4 focus:ring-[rgb(126_217_87/18%)]"
          name="username"
          required
          type="text"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[var(--ink-900)]">
        Admin password
        <input
          autoComplete="current-password"
          className="h-12 rounded-[0.85rem] border border-[rgb(17_22_17/12%)] bg-white px-4 text-base font-normal text-[var(--ink-900)] outline-none transition focus:border-[var(--brand-green-700)] focus:ring-4 focus:ring-[rgb(126_217_87/18%)]"
          name="password"
          required
          type="password"
        />
      </label>
      {state.formError ? (
        <p className="rounded-[0.85rem] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {state.formError}
        </p>
      ) : null}
      <SubmitButton />
    </form>
  );
}
