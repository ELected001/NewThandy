# Thandy Website

A premium, conversion-first single-page marketing site for Thandy Landscaping Services Inc. built with Next.js App Router, TypeScript, Tailwind CSS v4, Motion, and image-led service sections.

## Architecture

- `app/`: the single-page homepage, compatibility redirects, metadata, sitemap/robots, thank-you route, and the contact server action.
- `components/site/`: header, footer, quote form, JSON-LD helper, single-page marketing sections, and shared site chrome.
- `components/ui/`: buttons, icons, reveal animation wrapper, FAQ, and section-heading primitives.
- `content/site.ts`: source-of-truth content, service definitions, brand foundation copy, trust copy, and contact details.
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
- `GOOGLE_FORM_URL`: Google Form `viewform` URL for quote handoff. Must be an `https://docs.google.com/forms/.../viewform` URL before the form can submit.
- `GOOGLE_FORM_ENTRY_NAME`
- `GOOGLE_FORM_ENTRY_PHONE`
- `GOOGLE_FORM_ENTRY_SERVICE_ADDRESS`
- `GOOGLE_FORM_ENTRY_SERVICE_NEEDED`
- `GOOGLE_FORM_ENTRY_MESSAGE`
- `GOOGLE_FORM_ENTRY_CONSENT`
  These are required before the form can submit. If they are missing, the form fails closed and asks the visitor to call instead of sending PII to an invalid URL.

## Major decisions

- The site stays inside the supported scope from the artefacts: lawn care, seasonal cleanup, and property maintenance only.
- The primary marketing experience is now single-page: `/` contains home, services, profile, pricing, FAQ, and quote sections. Legacy `/services`, `/profile`, `/pricing`, `/contact`, and `/about` routes redirect to homepage anchors for compatibility.
- Pricing is explicitly quote-led. There are no invented fixed prices or “starting at” tables.
- Trust language is conservative. The implementation avoids unsupported testimonials, gallery proof, and stronger claims like “guaranteed” response times.
- The latest visual direction is clean and brand-led: white/light-gray reading surfaces, black typography, grass-green accents, literal service imagery, and the guide tagline “Clean Lawns. Clear Surroundings.”
- The rejected WebGL plaque was removed. Motion is intentionally restrained: hero content renders without animation, decorative marquee and global scroll-progress motion are no longer loaded, and reveal animation degrades under reduced motion.
- The quote form includes a consent checkbox, a hidden honeypot field, and a lightweight privacy note because the form captures personal contact and location data.
- The current draft validates locally, then redirects to a configured Google Forms handoff. The form copy explicitly discloses that the handoff sends the submitted details to Google Forms.

## Performance strategy

- App Router server rendering keeps most of the site static and light.
- Motion is isolated to small client components and CSS effects. Reduced-motion users get static layouts without losing content.
- All photography and logos use `next/image`.
- Content is intentionally consolidated on one page to avoid repeated hero, image, and section patterns across routes.

## Assumptions

- `+1 289-994-5553` is the canonical phone number.
- Hamilton plus surrounding residential and commercial areas is the launch-safe service-area wording.
- `hello@thandylandscaping.ca` is a temporary assumed public email until the business confirms the real address.
- The Google Form URL and entry ids must be supplied before online quote submissions can complete.

## Validation

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run test`
- `npm run test:e2e`
