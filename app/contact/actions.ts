"use server";

import { redirect } from "next/navigation";
import {
  buildGoogleFormPrefillUrl,
  getQuoteFormValues,
  type QuoteFormState,
  validateQuoteForm,
} from "@/lib/quote";

export async function submitQuoteRequest(
  previousState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  void previousState;
  const values = getQuoteFormValues(formData);
  const result = validateQuoteForm(values);

  if (!result.success) {
    return {
      values: result.data,
      fieldErrors: result.fieldErrors,
      formError: result.formError,
    };
  }

  let redirectUrl: string;

  try {
    redirectUrl = buildGoogleFormPrefillUrl(result.data);
  } catch {
    return {
      values: result.data,
      fieldErrors: {},
      formError:
        "The online intake form is not configured yet. Please call Thandy to request your quote.",
    };
  }

  redirect(redirectUrl);
}
