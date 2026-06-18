"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  resetSeoPageAction,
  saveSeoPageAction,
  type SeoEditorState,
} from "@/app/admin/seo/actions";
import type { SeoAdminFormValues } from "@/lib/seo-validation";

type SeoEditorPage = {
  id: string;
  label: string;
  path: string;
  canonicalPath: string;
  canonicalUrl: string;
  robots: {
    index: boolean;
    follow: boolean;
  };
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    url: string;
  };
};

type SeoEditorProps = {
  page: SeoEditorPage;
  initialValues: SeoAdminFormValues;
  lockedNoindex: boolean;
  resetNotice?: boolean;
};

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="button-effect inline-flex h-12 items-center justify-center rounded-full bg-[var(--brand-green-500)] px-5 text-sm font-semibold text-[var(--ink-950)] shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-green-300)] disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      {pending ? "Saving..." : "Save SEO changes"}
    </button>
  );
}

function fieldClassName(hasError: boolean) {
  return [
    "w-full rounded-[0.85rem] border bg-white px-4 py-3 text-sm text-[var(--ink-900)] outline-none transition",
    "focus:border-[var(--brand-green-700)] focus:ring-4 focus:ring-[rgb(126_217_87/18%)]",
    hasError ? "border-red-300" : "border-[rgb(17_22_17/12%)]",
  ].join(" ");
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm font-medium text-red-700">{message}</p>;
}

function TextInput({
  error,
  helpText,
  label,
  maxLength,
  name,
  placeholder,
  required = false,
  value,
}: {
  error?: string;
  helpText?: string;
  label: string;
  maxLength?: number;
  name: keyof SeoAdminFormValues;
  placeholder?: string;
  required?: boolean;
  value: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[var(--ink-900)]">
      <span className="flex flex-wrap items-center justify-between gap-2">
        {label}
        {maxLength ? (
          <span className="text-xs font-medium text-[var(--text-muted)]">
            Max {maxLength}
          </span>
        ) : null}
      </span>
      <input
        className={fieldClassName(Boolean(error))}
        defaultValue={value}
        maxLength={maxLength}
        name={name}
        placeholder={placeholder}
        required={required}
        type="text"
      />
      {helpText ? <span className="text-xs font-medium text-[var(--text-muted)]">{helpText}</span> : null}
      <FieldError message={error} />
    </label>
  );
}

function TextArea({
  error,
  helpText,
  label,
  maxLength,
  name,
  required = false,
  rows = 4,
  value,
}: {
  error?: string;
  helpText?: string;
  label: string;
  maxLength?: number;
  name: keyof SeoAdminFormValues;
  required?: boolean;
  rows?: number;
  value: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[var(--ink-900)]">
      <span className="flex flex-wrap items-center justify-between gap-2">
        {label}
        {maxLength ? (
          <span className="text-xs font-medium text-[var(--text-muted)]">
            Max {maxLength}
          </span>
        ) : null}
      </span>
      <textarea
        className={fieldClassName(Boolean(error))}
        defaultValue={value}
        maxLength={maxLength}
        name={name}
        required={required}
        rows={rows}
      />
      {helpText ? <span className="text-xs font-medium text-[var(--text-muted)]">{helpText}</span> : null}
      <FieldError message={error} />
    </label>
  );
}

function NumberInput({
  error,
  label,
  name,
  value,
}: {
  error?: string;
  label: string;
  name: keyof SeoAdminFormValues;
  value: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[var(--ink-900)]">
      {label}
      <input
        className={fieldClassName(Boolean(error))}
        defaultValue={value}
        min="1"
        name={name}
        type="number"
      />
      <FieldError message={error} />
    </label>
  );
}

function ResetButton({ pageId }: { pageId: string }) {
  return (
    <form action={resetSeoPageAction}>
      <input name="pageId" type="hidden" value={pageId} />
      <button
        className="inline-flex h-12 items-center justify-center rounded-full border border-[rgb(17_22_17/12%)] bg-white px-5 text-sm font-semibold text-[var(--ink-900)] transition hover:-translate-y-0.5 hover:bg-[var(--surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green-500)]"
        type="submit"
      >
        Reset to defaults
      </button>
    </form>
  );
}

export function SeoEditor({
  initialValues,
  lockedNoindex,
  page,
  resetNotice = false,
}: SeoEditorProps) {
  const initialState: SeoEditorState = {
    status: "idle",
    values: initialValues,
    fieldErrors: {},
  };
  const [state, formAction] = useActionState(saveSeoPageAction, initialState);
  const values = state.values;
  const searchTitle = values.title || "Page title";
  const searchDescription = values.description || "Meta description";
  const socialTitle = values.openGraphTitle || values.title || "Social title";
  const socialDescription =
    values.openGraphDescription || values.description || "Social description";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.66fr)_minmax(20rem,0.34fr)] lg:items-start">
      <form action={formAction} className="grid gap-5 rounded-[1.25rem] border border-[rgb(17_22_17/8%)] bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
        <input name="pageId" type="hidden" value={page.id} />

        {state.status === "saved" ? (
          <p className="rounded-[0.85rem] border border-[rgb(74_140_46/24%)] bg-[var(--brand-green-050)] px-4 py-3 text-sm font-semibold text-[var(--brand-green-700)]">
            SEO changes saved.
          </p>
        ) : null}
        {resetNotice ? (
          <p className="rounded-[0.85rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-[var(--ink-900)]">
            This page was reset to the default SEO values.
          </p>
        ) : null}
        {state.formError ? (
          <p className="rounded-[0.85rem] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
            {state.formError}
          </p>
        ) : null}

        <div className="grid gap-5">
          <TextInput
            error={state.fieldErrors.title}
            helpText="Primary browser and search result title."
            label="Page title"
            maxLength={60}
            name="title"
            required
            value={values.title}
          />
          <TextArea
            error={state.fieldErrors.description}
            helpText="Search result summary. Write naturally and avoid keyword stuffing."
            label="Meta description"
            maxLength={160}
            name="description"
            required
            value={values.description}
          />
          <TextInput
            error={state.fieldErrors.canonical}
            helpText={`Leave blank to use ${page.path}. Use site-relative paths only.`}
            label="Canonical path"
            name="canonical"
            placeholder={page.path}
            value={values.canonical}
          />
        </div>

        <div className="grid gap-5 border-t border-[rgb(17_22_17/8%)] pt-5">
          <TextInput
            error={state.fieldErrors.openGraphTitle}
            helpText="Optional. Falls back to page title."
            label="Open Graph title"
            maxLength={70}
            name="openGraphTitle"
            value={values.openGraphTitle}
          />
          <TextArea
            error={state.fieldErrors.openGraphDescription}
            helpText="Optional. Falls back to meta description."
            label="Open Graph description"
            maxLength={200}
            name="openGraphDescription"
            rows={3}
            value={values.openGraphDescription}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextInput
              error={state.fieldErrors.twitterTitle}
              helpText="Optional X card title."
              label="Twitter/X title"
              maxLength={70}
              name="twitterTitle"
              value={values.twitterTitle}
            />
            <TextArea
              error={state.fieldErrors.twitterDescription}
              helpText="Optional X card description."
              label="Twitter/X description"
              maxLength={200}
              name="twitterDescription"
              rows={3}
              value={values.twitterDescription}
            />
          </div>
        </div>

        <div className="grid gap-5 border-t border-[rgb(17_22_17/8%)] pt-5">
          <TextInput
            error={state.fieldErrors.imageSrc}
            helpText="Use a local /images path or secure https image URL."
            label="Social image source"
            name="imageSrc"
            value={values.imageSrc}
          />
          <TextInput
            error={state.fieldErrors.imageAlt}
            helpText="Required if a social image is set."
            label="Social image alt text"
            name="imageAlt"
            value={values.imageAlt}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberInput
              error={state.fieldErrors.imageWidth}
              label="Image width"
              name="imageWidth"
              value={values.imageWidth}
            />
            <NumberInput
              error={state.fieldErrors.imageHeight}
              label="Image height"
              name="imageHeight"
              value={values.imageHeight}
            />
          </div>
        </div>

        <fieldset className="grid gap-3 border-t border-[rgb(17_22_17/8%)] pt-5">
          <legend className="text-sm font-semibold text-[var(--ink-900)]">Robots</legend>
          <label className="flex items-start gap-3 rounded-[0.85rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-base)] px-4 py-3 text-sm font-semibold text-[var(--ink-900)]">
            <input
              className="mt-1 h-4 w-4 accent-[var(--brand-green-700)] disabled:opacity-50"
              defaultChecked={values.robotsIndex && !lockedNoindex}
              disabled={lockedNoindex}
              name="robotsIndex"
              type="checkbox"
            />
            <span>
              Allow indexing
              {lockedNoindex ? (
                <span className="block text-xs font-medium text-[var(--text-muted)]">
                  Locked off for utility pages.
                </span>
              ) : null}
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-[0.85rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-base)] px-4 py-3 text-sm font-semibold text-[var(--ink-900)]">
            <input
              className="mt-1 h-4 w-4 accent-[var(--brand-green-700)]"
              defaultChecked={values.robotsFollow}
              name="robotsFollow"
              type="checkbox"
            />
            Allow following links
          </label>
          <FieldError message={state.fieldErrors.robotsIndex} />
        </fieldset>

        <div className="flex flex-wrap gap-3 border-t border-[rgb(17_22_17/8%)] pt-5">
          <SaveButton />
        </div>
      </form>

      <aside className="grid gap-4">
        <div className="rounded-[1.25rem] border border-[rgb(17_22_17/8%)] bg-white p-5 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--brand-green-700)]">
            Search preview
          </p>
          <div className="mt-4 rounded-[1rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-base)] p-4">
            <p className="break-words text-sm text-[#1a0dab]">{searchTitle}</p>
            <p className="mt-1 break-words text-xs text-[#006621]">{page.canonicalUrl}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              {searchDescription}
            </p>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-[rgb(17_22_17/8%)] bg-white p-5 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--brand-green-700)]">
            Social preview
          </p>
          <div className="mt-4 overflow-hidden rounded-[1rem] border border-[rgb(17_22_17/8%)] bg-[var(--surface-base)]">
            <div className="flex aspect-[1.91/1] items-center justify-center bg-[var(--ink-950)] px-5 text-center text-sm font-semibold text-white/78">
              {values.imageSrc || page.image.src}
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-[var(--ink-900)]">{socialTitle}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {socialDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-[rgb(17_22_17/8%)] bg-white p-5 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--brand-green-700)]">
            Current routing
          </p>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="font-semibold text-[var(--ink-900)]">Page path</dt>
              <dd className="mt-1 break-words text-[var(--text-secondary)]">{page.path}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--ink-900)]">Canonical path</dt>
              <dd className="mt-1 break-words text-[var(--text-secondary)]">
                {page.canonicalPath}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--ink-900)]">Sitemap</dt>
              <dd className="mt-1 text-[var(--text-secondary)]">
                {page.robots.index ? "Included" : "Excluded"}
              </dd>
            </div>
          </dl>
          <div className="mt-5">
            <ResetButton pageId={page.id} />
          </div>
        </div>
      </aside>
    </div>
  );
}
