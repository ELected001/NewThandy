export const quoteServiceOptions = [
  "lawn-care",
  "seasonal-cleanup",
  "property-maintenance",
  "custom-scope",
] as const;

export type QuoteServiceOption = (typeof quoteServiceOptions)[number];

export const quoteServiceLabels: Record<QuoteServiceOption, string> = {
  "lawn-care": "Lawn care",
  "seasonal-cleanup": "Seasonal cleanup",
  "property-maintenance": "Property maintenance",
  "custom-scope": "Custom scope",
};

export type QuoteFormValues = {
  name: string;
  phone: string;
  serviceAddress: string;
  serviceNeeded: string;
  message: string;
  consent: boolean;
  company: string;
};

export type QuoteFormState = {
  values: QuoteFormValues;
  fieldErrors: Partial<Record<keyof QuoteFormValues, string>>;
  formError?: string;
};

const googleFormConfig = {
  formUrl:
    process.env.GOOGLE_FORM_URL?.trim() ||
    "https://docs.google.com/forms/d/e/PLACEHOLDER_FORM_ID/viewform",
  entries: {
    name: process.env.GOOGLE_FORM_ENTRY_NAME?.trim() || "entry.1111111111",
    phone: process.env.GOOGLE_FORM_ENTRY_PHONE?.trim() || "entry.2222222222",
    serviceAddress:
      process.env.GOOGLE_FORM_ENTRY_SERVICE_ADDRESS?.trim() || "entry.3333333333",
    serviceNeeded:
      process.env.GOOGLE_FORM_ENTRY_SERVICE_NEEDED?.trim() || "entry.4444444444",
    message: process.env.GOOGLE_FORM_ENTRY_MESSAGE?.trim() || "entry.5555555555",
    consent: process.env.GOOGLE_FORM_ENTRY_CONSENT?.trim() || "entry.6666666666",
  },
} as const;

export const initialQuoteFormState: QuoteFormState = {
  values: {
    name: "",
    phone: "",
    serviceAddress: "",
    serviceNeeded: "",
    message: "",
    consent: false,
    company: "",
  },
  fieldErrors: {},
};

export function normalizePhone(input: string) {
  const digits = input.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  if (input.trim().startsWith("+") && digits.length >= 10 && digits.length <= 15) {
    return `+${digits}`;
  }

  return null;
}

export function getQuoteFormValues(formData: FormData): QuoteFormValues {
  return {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    serviceAddress: String(formData.get("serviceAddress") ?? "").trim(),
    serviceNeeded: String(formData.get("serviceNeeded") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    consent: formData.get("consent") === "on",
    company: String(formData.get("company") ?? "").trim(),
  };
}

export function buildGoogleFormPrefillUrl(values: QuoteFormValues) {
  const url = new URL(googleFormConfig.formUrl);

  url.searchParams.set("usp", "pp_url");
  url.searchParams.set(googleFormConfig.entries.name, values.name);
  url.searchParams.set(googleFormConfig.entries.phone, values.phone);
  url.searchParams.set(googleFormConfig.entries.serviceAddress, values.serviceAddress);
  url.searchParams.set(
    googleFormConfig.entries.serviceNeeded,
    quoteServiceLabels[values.serviceNeeded as QuoteServiceOption] ?? values.serviceNeeded,
  );
  url.searchParams.set(googleFormConfig.entries.message, values.message);
  url.searchParams.set(googleFormConfig.entries.consent, values.consent ? "Yes" : "No");

  return url.toString();
}

export function validateQuoteForm(values: QuoteFormValues) {
  const fieldErrors: QuoteFormState["fieldErrors"] = {};
  const normalizedPhone = normalizePhone(values.phone);

  if (values.company) {
    return {
      success: false as const,
      fieldErrors,
      formError: undefined,
      data: values,
    };
  }

  if (values.name.length < 2) {
    fieldErrors.name = "Please share your name so we know who to call.";
  }

  if (!normalizedPhone) {
    fieldErrors.phone = "Please enter a valid phone number.";
  }

  if (values.serviceAddress.length < 4) {
    fieldErrors.serviceAddress =
      "Share the property address or a nearby intersection.";
  }

  if (!quoteServiceOptions.includes(values.serviceNeeded as QuoteServiceOption)) {
    fieldErrors.serviceNeeded = "Choose the service that best matches the request.";
  }

  if (values.message && values.message.length > 800) {
    fieldErrors.message = "Keep the message under 800 characters.";
  }

  if (!values.consent) {
    fieldErrors.consent = "Please confirm we can contact you about this request.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false as const,
      fieldErrors,
      formError: "Please correct the highlighted fields and try again.",
      data: values,
    };
  }

  return {
    success: true as const,
    fieldErrors: {},
    formError: undefined,
    data: {
      ...values,
      phone: normalizedPhone!,
      message: values.message,
    },
  };
}
