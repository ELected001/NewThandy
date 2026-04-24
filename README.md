# Thandy Website

A premium, conversion-first single-page marketing site for Thandy Landscaping Services Inc. built with Next.js App Router, TypeScript, Tailwind CSS v4, Motion, and a lightweight React Three Fiber hero plaque.

## Architecture

- `app/`: the single anchored homepage, redirect shims for legacy routes, metadata, sitemap/robots, and the contact server action.
- `components/site/`: header, footer, CTA band, quote form, JSON-LD helper, and shared site chrome.
- `components/ui/`: buttons, icons, reveal animation wrapper, FAQ, and section-heading primitives.
- `components/three/`: the optional WebGL hero plaque plus static fallback.
- `content/site.ts`: source-of-truth content, service definitions, packages, trust copy, and contact details.
- `lib/`: metadata helpers, schema helpers, validation, and shared utilities.
- `tests/unit/`: utility/content guardrail tests.
- `tests/e2e/`: Playwright smoke coverage for the main conversion journeys.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run test
npm run test:e2e
```

## Environment

Optional environment variables:

- `NEXT_PUBLIC_SITE_URL`: canonical site URL. Defaults to `https://thandylandscaping.ca`.
- `NEXT_PUBLIC_CONTACT_EMAIL`: public email address. Defaults to `hello@thandylandscaping.ca`.
- `GOOGLE_FORM_URL`: Google Form `viewform` URL for quote handoff. Defaults to a placeholder Google Forms URL.
- `GOOGLE_FORM_ENTRY_NAME`
- `GOOGLE_FORM_ENTRY_PHONE`
- `GOOGLE_FORM_ENTRY_SERVICE_ADDRESS`
- `GOOGLE_FORM_ENTRY_SERVICE_NEEDED`
- `GOOGLE_FORM_ENTRY_MESSAGE`
- `GOOGLE_FORM_ENTRY_CONSENT`
  These default to placeholder `entry.xxxxx` ids so the flow can be wired before the final form exists.

## Major decisions

- The site stays inside the supported scope from the artefacts: lawn care, seasonal cleanup, and property maintenance only.
- The primary marketing experience is a single anchored homepage. Legacy `/services`, `/pricing`, `/about`, and `/contact` routes now redirect into the relevant homepage sections instead of maintaining duplicate page copy.
- Pricing is explicitly quote-led. There are no invented fixed prices or “starting at” tables.
- Trust language is conservative. The implementation avoids unsupported testimonials, gallery proof, and stronger claims like “guaranteed” response times.
- The 3D moment is intentionally narrow: a lazy-loaded hero plaque with a static poster fallback on smaller or lower-power devices and under reduced motion.
- The quote form includes a consent checkbox, a hidden honeypot field, and a lightweight privacy note because the form captures personal contact and location data.
- The current draft validates locally, then redirects to a Google Form handoff with placeholder field mappings until the real form is finalized.

## Performance strategy

- App Router server rendering keeps most of the site static and light.
- The 3D plaque is isolated to a client-only island and falls back to a static asset when motion or device constraints suggest it should.
- All photography and logos use `next/image`.
- Motion is limited to reveal and menu interactions; the design still works when animation is reduced or removed.
- The content model is centralized to avoid duplication and keep metadata/CTA consistency easy to audit.

## Assumptions

- `+1 289-994-5553` is the canonical phone number.
- Hamilton plus surrounding residential and commercial areas is the launch-safe service-area wording.
- `hello@thandylandscaping.ca` is a temporary assumed public email until the business confirms the real address.
- The Google Form URL and entry ids are placeholder values until the business creates the final form.

## Validation

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run test`
- `npm run test:e2e`
