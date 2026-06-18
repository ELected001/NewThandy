"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearSeoAdminSession,
  createSeoAdminSession,
  isSeoAdminAuthenticated,
  isSeoAdminConfigured,
  verifySeoAdminCredentials,
} from "@/lib/admin-auth";
import { isSeoPageId, resetSeoPageOverride, saveSeoPageOverride } from "@/lib/seo-store";
import {
  getSeoAdminFormValues,
  type SeoAdminFieldErrors,
  type SeoAdminFormValues,
  validateSeoAdminForm,
} from "@/lib/seo-validation";

export type SeoLoginState = {
  formError?: string;
};

export type SeoEditorState = {
  status: "idle" | "saved" | "error";
  values: SeoAdminFormValues;
  fieldErrors: SeoAdminFieldErrors;
  formError?: string;
  savedAt?: string;
};

function revalidateSeoSurfaces(pageId?: string) {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/thank-you");
  revalidatePath("/sitemap.xml");
  revalidatePath("/seo-admin-manifest.json");
  revalidatePath("/admin/seo");

  if (pageId) {
    revalidatePath(`/admin/seo/${pageId}`);
  }
}

export async function loginSeoAdminAction(
  previousState: SeoLoginState,
  formData: FormData,
): Promise<SeoLoginState> {
  void previousState;

  if (!isSeoAdminConfigured()) {
    return {
      formError:
        "SEO admin is not configured. Set SEO_ADMIN_USERNAME and SEO_ADMIN_PASSWORD before using this area.",
    };
  }

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifySeoAdminCredentials(username, password)) {
    return {
      formError: "The username or password is incorrect.",
    };
  }

  await createSeoAdminSession(password);
  redirect("/admin/seo");
}

export async function logoutSeoAdminAction() {
  await clearSeoAdminSession();
  redirect("/admin/seo/login");
}

export async function saveSeoPageAction(
  previousState: SeoEditorState,
  formData: FormData,
): Promise<SeoEditorState> {
  void previousState;

  if (!(await isSeoAdminAuthenticated())) {
    return {
      status: "error",
      values: getSeoAdminFormValues(formData),
      fieldErrors: {},
      formError: "Your admin session expired. Sign in again before saving.",
    };
  }

  const result = validateSeoAdminForm(formData);

  if (!result.success) {
    return {
      status: "error",
      values: result.values,
      fieldErrors: result.fieldErrors,
      formError: result.formError,
    };
  }

  await saveSeoPageOverride(result.data.pageId, result.data.override);
  revalidateSeoSurfaces(result.data.pageId);

  return {
    status: "saved",
    values: result.data.values,
    fieldErrors: {},
    savedAt: new Date().toISOString(),
  };
}

export async function resetSeoPageAction(formData: FormData) {
  if (!(await isSeoAdminAuthenticated())) {
    redirect("/admin/seo/login");
  }

  const pageId = String(formData.get("pageId") ?? "");

  if (!isSeoPageId(pageId)) {
    redirect("/admin/seo");
  }

  await resetSeoPageOverride(pageId);
  revalidateSeoSurfaces(pageId);
  redirect(`/admin/seo/${pageId}?reset=1`);
}
