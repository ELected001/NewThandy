import {
  seo,
  seoAdmin,
  siteConfig,
  type SeoAdminField,
  type SeoImage,
  type SeoPageConfig,
  type SeoRobots,
} from "@/content/site";
import type { SeoPageId, SeoPageOverride } from "@/lib/seo-store";

export type SeoAdminFormValues = {
  title: string;
  description: string;
  canonical: string;
  openGraphTitle: string;
  openGraphDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: string;
  imageHeight: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
};

export type SeoAdminFieldErrors = Partial<Record<keyof SeoAdminFormValues | "pageId", string>>;

export type SeoAdminValidationResult =
  | {
      success: true;
      data: {
        pageId: SeoPageId;
        override: SeoPageOverride;
        values: SeoAdminFormValues;
      };
    }
  | {
      success: false;
      fieldErrors: SeoAdminFieldErrors;
      formError: string;
      values: SeoAdminFormValues;
    };

const fieldMaxLengths = Object.fromEntries(
  (seoAdmin.fields as readonly SeoAdminField[])
    .filter((field) => typeof field.maxLength === "number")
    .map((field) => [field.name, field.maxLength]),
) as Partial<Record<string, number>>;

function asString(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function isValidPath(value: string) {
  return value.startsWith("/") && !value.startsWith("//") && !/\s/.test(value);
}

function isValidImageSource(value: string) {
  if (value.startsWith("/") && !value.startsWith("//") && !/\s/.test(value)) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" && Boolean(url.hostname);
  } catch {
    return false;
  }
}

function parseImageDimension(value: string) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 10000) {
    return null;
  }

  return parsed;
}

function isSeoPageId(value: string): value is SeoPageId {
  return Object.hasOwn(seo.pages, value);
}

export function getSeoAdminFormValues(formData: FormData): SeoAdminFormValues {
  return {
    title: asString(formData.get("title")),
    description: asString(formData.get("description")),
    canonical: asString(formData.get("canonical")),
    openGraphTitle: asString(formData.get("openGraphTitle")),
    openGraphDescription: asString(formData.get("openGraphDescription")),
    twitterTitle: asString(formData.get("twitterTitle")),
    twitterDescription: asString(formData.get("twitterDescription")),
    imageSrc: asString(formData.get("imageSrc")),
    imageAlt: asString(formData.get("imageAlt")),
    imageWidth: asString(formData.get("imageWidth")),
    imageHeight: asString(formData.get("imageHeight")),
    robotsIndex: formData.get("robotsIndex") === "on",
    robotsFollow: formData.get("robotsFollow") === "on",
  };
}

export function getSeoAdminFormValuesFromPage(
  page: SeoPageOverride & {
    title: string;
    description: string;
    robots?: SeoRobots;
    image?: SeoImage;
  },
): SeoAdminFormValues {
  return {
    title: page.title,
    description: page.description,
    canonical: page.canonical ?? "",
    openGraphTitle: page.openGraphTitle ?? "",
    openGraphDescription: page.openGraphDescription ?? "",
    twitterTitle: page.twitterTitle ?? "",
    twitterDescription: page.twitterDescription ?? "",
    imageSrc: page.image?.src ?? "",
    imageAlt: page.image?.alt ?? "",
    imageWidth: page.image ? String(page.image.width) : "",
    imageHeight: page.image ? String(page.image.height) : "",
    robotsIndex: page.robots?.index ?? true,
    robotsFollow: page.robots?.follow ?? true,
  };
}

export function validateSeoAdminForm(formData: FormData): SeoAdminValidationResult {
  const pageIdValue = asString(formData.get("pageId"));
  const values = getSeoAdminFormValues(formData);
  const fieldErrors: SeoAdminFieldErrors = {};

  if (!isSeoPageId(pageIdValue)) {
    return {
      success: false,
      fieldErrors: { pageId: "Choose a valid page to edit." },
      formError: "The SEO page could not be found.",
      values,
    };
  }

  const basePage: SeoPageConfig = seo.pages[pageIdValue];

  if (!values.title) {
    fieldErrors.title = "Page title is required.";
  } else if (values.title.length > (fieldMaxLengths.title ?? 60)) {
    fieldErrors.title = `Keep the title under ${fieldMaxLengths.title ?? 60} characters.`;
  }

  if (!values.description) {
    fieldErrors.description = "Meta description is required.";
  } else if (values.description.length > (fieldMaxLengths.description ?? 160)) {
    fieldErrors.description = `Keep the description under ${
      fieldMaxLengths.description ?? 160
    } characters.`;
  }

  if (values.canonical && !isValidPath(values.canonical)) {
    fieldErrors.canonical =
      "Use a site-relative canonical path that starts with / and contains no spaces.";
  }

  const optionalLengthFields = [
    "openGraphTitle",
    "openGraphDescription",
    "twitterTitle",
    "twitterDescription",
  ] as const;

  for (const field of optionalLengthFields) {
    const maxLength = fieldMaxLengths[field];

    if (maxLength && values[field].length > maxLength) {
      fieldErrors[field] = `Keep this field under ${maxLength} characters.`;
    }
  }

  const hasAnyImageValue = Boolean(
    values.imageSrc || values.imageAlt || values.imageWidth || values.imageHeight,
  );
  const imageWidth = values.imageWidth ? parseImageDimension(values.imageWidth) : null;
  const imageHeight = values.imageHeight ? parseImageDimension(values.imageHeight) : null;

  if (hasAnyImageValue) {
    if (!values.imageSrc || !isValidImageSource(values.imageSrc)) {
      fieldErrors.imageSrc =
        "Use a local image path starting with / or a secure https image URL.";
    }

    if (!values.imageAlt) {
      fieldErrors.imageAlt = "Social image alt text is required when an image is set.";
    } else if (values.imageAlt.length > 180) {
      fieldErrors.imageAlt = "Keep image alt text under 180 characters.";
    }

    if (!imageWidth) {
      fieldErrors.imageWidth = "Use a positive image width in pixels.";
    }

    if (!imageHeight) {
      fieldErrors.imageHeight = "Use a positive image height in pixels.";
    }
  }

  if (basePage.robots?.index === false && values.robotsIndex) {
    fieldErrors.robotsIndex = "Utility pages must remain noindex.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      fieldErrors,
      formError: "Correct the highlighted SEO fields before saving.",
      values,
    };
  }

  const image = hasAnyImageValue
    ? {
        src: values.imageSrc,
        alt: values.imageAlt,
        width: imageWidth!,
        height: imageHeight!,
      }
    : undefined;

  return {
    success: true,
    data: {
      pageId: pageIdValue,
      values,
      override: {
        title: values.title,
        description: values.description,
        canonical: values.canonical || undefined,
        openGraphTitle: values.openGraphTitle || undefined,
        openGraphDescription: values.openGraphDescription || undefined,
        twitterTitle: values.twitterTitle || undefined,
        twitterDescription: values.twitterDescription || undefined,
        image,
        robots: {
          index: basePage.robots?.index === false ? false : values.robotsIndex,
          follow: values.robotsFollow,
        },
      },
    },
  };
}

export function getCanonicalPreview(path: string) {
  return new URL(path || "/", siteConfig.url).toString();
}
