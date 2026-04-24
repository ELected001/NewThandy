"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitQuoteRequest } from "@/app/contact/actions";
import { buttonClassName } from "@/components/ui/button";
import {
  initialQuoteFormState,
  quoteServiceLabels,
  quoteServiceOptions,
} from "@/lib/quote";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className={buttonClassName("primary")} disabled={pending} type="submit">
      {pending ? "Sending request..." : "Request quote"}
    </button>
  );
}

type QuoteFormProps = {
  service?: string | null;
};

export function QuoteForm({ service }: QuoteFormProps) {
  const initialService =
    typeof service === "string" && quoteServiceOptions.includes(service as never)
      ? service
      : "";
  const [state, formAction] = useActionState(submitQuoteRequest, {
    ...initialQuoteFormState,
    values: {
      ...initialQuoteFormState.values,
      serviceNeeded: initialService,
    },
  });

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="field-label" htmlFor="name">
            Name
          </label>
          <input
            aria-invalid={Boolean(state.fieldErrors.name)}
            autoComplete="name"
            className="input-field"
            data-invalid={Boolean(state.fieldErrors.name)}
            defaultValue={state.values.name}
            id="name"
            name="name"
            placeholder="Your name"
            type="text"
          />
          {state.fieldErrors.name ? (
            <p className="text-sm text-rose-600">{state.fieldErrors.name}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="field-label" htmlFor="phone">
            Phone
          </label>
          <input
            aria-invalid={Boolean(state.fieldErrors.phone)}
            autoComplete="tel"
            className="input-field"
            data-invalid={Boolean(state.fieldErrors.phone)}
            defaultValue={state.values.phone}
            id="phone"
            name="phone"
            placeholder="+1 289-994-5553"
            type="tel"
          />
          {state.fieldErrors.phone ? (
            <p className="text-sm text-rose-600">{state.fieldErrors.phone}</p>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <label className="field-label" htmlFor="serviceAddress">
          Property address or nearest intersection
        </label>
        <input
          aria-invalid={Boolean(state.fieldErrors.serviceAddress)}
          autoComplete="street-address"
          className="input-field"
          data-invalid={Boolean(state.fieldErrors.serviceAddress)}
          defaultValue={state.values.serviceAddress}
          id="serviceAddress"
          name="serviceAddress"
          placeholder="A full address is helpful, but a nearby intersection is fine for the first call."
          type="text"
        />
        {state.fieldErrors.serviceAddress ? (
          <p className="text-sm text-rose-600">{state.fieldErrors.serviceAddress}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label className="field-label" htmlFor="serviceNeeded">
          Service needed
        </label>
        <div className="relative">
          <select
            aria-invalid={Boolean(state.fieldErrors.serviceNeeded)}
            className="select-field"
            data-invalid={Boolean(state.fieldErrors.serviceNeeded)}
            defaultValue={state.values.serviceNeeded}
            id="serviceNeeded"
            name="serviceNeeded"
          >
            <option value="">Choose a service</option>
            {quoteServiceOptions.map((option) => (
              <option key={option} value={option}>
                {quoteServiceLabels[option]}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="m6 9 6 6 6-6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.9"
            />
          </svg>
        </div>
        {state.fieldErrors.serviceNeeded ? (
          <p className="text-sm text-rose-600">{state.fieldErrors.serviceNeeded}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label className="field-label" htmlFor="message">
          Message
        </label>
        <textarea
          aria-invalid={Boolean(state.fieldErrors.message)}
          className="textarea-field"
          data-invalid={Boolean(state.fieldErrors.message)}
          defaultValue={state.values.message}
          id="message"
          name="message"
          placeholder="Tell us what needs attention, when you need it, and anything useful for the first callback."
        />
        {state.fieldErrors.message ? (
          <p className="text-sm text-rose-600">{state.fieldErrors.message}</p>
        ) : null}
      </div>
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input autoComplete="organization" id="company" name="company" tabIndex={-1} type="text" />
      </div>
      <label className="flex items-start gap-3 rounded-[1.4rem] bg-[var(--surface-soft)] px-4 py-4 text-sm leading-6 text-[var(--text-secondary)]">
        <input
          className="mt-1 h-4 w-4 rounded border-[var(--border-medium)] text-[var(--brand-green-600)]"
          defaultChecked={state.values.consent}
          id="consent"
          name="consent"
          type="checkbox"
        />
        <span>
          I agree that Thandy can contact me by phone or email about this quote request.
          We only use the details above to price and coordinate the job.
        </span>
      </label>
      {state.fieldErrors.consent ? (
        <p className="text-sm text-rose-600">{state.fieldErrors.consent}</p>
      ) : null}
      {state.formError ? (
        <p className={cn("text-sm", state.fieldErrors.company ? "sr-only" : "text-rose-600")}>
          {state.formError}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton />
        <p className="text-sm leading-6 text-[var(--text-muted)]">
          Submitting opens the current online intake form to finish your request.
        </p>
      </div>
    </form>
  );
}
