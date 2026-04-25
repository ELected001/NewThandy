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
  const requestedService = typeof service === "string" ? service : "";
  const initialService = quoteServiceOptions.includes(requestedService as never)
    ? requestedService
    : "";

  const [state, formAction] = useActionState(submitQuoteRequest, {
    ...initialQuoteFormState,
    values: {
      ...initialQuoteFormState.values,
      serviceNeeded: initialService,
    },
  });
  const selectedService = state.values.serviceNeeded || initialService;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="field-label" htmlFor="name">
            Name
          </label>
          <input
            aria-describedby={state.fieldErrors.name ? "name-error" : undefined}
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
            <p className="text-sm text-rose-600" id="name-error">{state.fieldErrors.name}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="field-label" htmlFor="phone">
            Phone
          </label>
          <input
            aria-describedby={state.fieldErrors.phone ? "phone-error" : undefined}
            aria-invalid={Boolean(state.fieldErrors.phone)}
            autoComplete="tel"
            className="input-field"
            data-invalid={Boolean(state.fieldErrors.phone)}
            defaultValue={state.values.phone}
            id="phone"
            inputMode="tel"
            name="phone"
            placeholder="+1 289-994-5553"
            type="tel"
          />
          {state.fieldErrors.phone ? (
            <p className="text-sm text-rose-600" id="phone-error">{state.fieldErrors.phone}</p>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <label className="field-label" htmlFor="serviceAddress">
          Property address or nearest intersection
        </label>
        <input
          aria-describedby={state.fieldErrors.serviceAddress ? "serviceAddress-error" : undefined}
          aria-invalid={Boolean(state.fieldErrors.serviceAddress)}
          autoComplete="street-address"
          className="input-field"
          data-invalid={Boolean(state.fieldErrors.serviceAddress)}
          defaultValue={state.values.serviceAddress}
          id="serviceAddress"
          name="serviceAddress"
          placeholder="Address or nearby intersection"
          type="text"
        />
        {state.fieldErrors.serviceAddress ? (
          <p className="text-sm text-rose-600" id="serviceAddress-error">{state.fieldErrors.serviceAddress}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label className="field-label" htmlFor="serviceNeeded">
          Service needed
        </label>
        <div className="relative">
          <select
            aria-describedby={state.fieldErrors.serviceNeeded ? "serviceNeeded-error" : undefined}
            aria-invalid={Boolean(state.fieldErrors.serviceNeeded)}
            className="select-field"
            data-invalid={Boolean(state.fieldErrors.serviceNeeded)}
            defaultValue={selectedService}
            id="serviceNeeded"
            key={selectedService || "empty-service"}
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
          <p className="text-sm text-rose-600" id="serviceNeeded-error">{state.fieldErrors.serviceNeeded}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label className="field-label" htmlFor="message">
          Message
        </label>
        <textarea
          aria-describedby={state.fieldErrors.message ? "message-error" : undefined}
          aria-invalid={Boolean(state.fieldErrors.message)}
          className="textarea-field"
          data-invalid={Boolean(state.fieldErrors.message)}
          defaultValue={state.values.message}
          id="message"
          name="message"
          placeholder="Service notes, timing, access, or cleanup details."
        />
        {state.fieldErrors.message ? (
          <p className="text-sm text-rose-600" id="message-error">{state.fieldErrors.message}</p>
        ) : null}
      </div>
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input autoComplete="off" id="company" name="company" tabIndex={-1} type="text" />
      </div>
      <label className="flex items-start gap-3 rounded-[1rem] bg-[var(--surface-soft)] px-4 py-4 text-sm leading-6 text-[var(--text-secondary)]">
        <input
          aria-describedby={state.fieldErrors.consent ? "consent-error" : undefined}
          className="mt-1 h-4 w-4 rounded border-[var(--border-medium)] text-[var(--brand-green-600)]"
          defaultChecked={state.values.consent}
          id="consent"
          name="consent"
          type="checkbox"
        />
        <span>
          I agree that Thandy can contact me by phone about this quote request.
          Thandy uses these details to price and coordinate the job. Submitting opens a
          Google Forms intake page with your name, phone, property location, service
          choice, and message prefilled.
        </span>
      </label>
      {state.fieldErrors.consent ? (
        <p className="text-sm text-rose-600" id="consent-error">{state.fieldErrors.consent}</p>
      ) : null}
      {state.formError ? (
        <p
          aria-live="polite"
          className={cn("text-sm", state.fieldErrors.company ? "sr-only" : "text-rose-600")}
        >
          {state.formError}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton />
        <p className="text-sm leading-6 text-[var(--text-muted)]">
          Submitting opens the current Google Forms intake page to finish your request.
        </p>
      </div>
    </form>
  );
}
