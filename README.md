# Thandy Website

A premium, conversion-first single-page marketing site for Thandy Landscaping Services Inc. built with Next.js App Router, TypeScript, Tailwind CSS v4, Motion, and image-led service sections.

## Architecture

- `app/`: the single-page homepage, compatibility redirects, metadata, sitemap/robots, thank-you route, and the contact server action.
- `components/site/`: header, footer, quote form, JSON-LD helper, single-page marketing sections, and shared site chrome.
- `components/ui/`: buttons, icons, reveal animation wrapper, FAQ, and section-heading primitives.
- `content/site.ts`: source-of-truth content, service definitions, editable SEO fields, brand foundation copy, trust copy, and contact details.
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
- Editable SEO metadata lives in the `seo` export in `content/site.ts`. Each indexable page configuration can define title, description, canonical path, Open Graph copy and image, Twitter/X copy and image fallback, and robots intent.
- SEO admin readiness is platform-agnostic. `lib/seo-admin.ts` resolves all fallback behavior into a serializable manifest, and `/seo-admin-manifest.json` exposes the current editable fields, page labels, resolved canonical URLs, social image data, robots settings, sitemap inclusion, and platform handoff notes for any future CMS or custom admin panel.
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

## SEO admin handoff

Use `/seo-admin-manifest.json` as the integration contract for whichever CMS or admin platform is chosen. The manifest is intentionally plain JSON so it can be mapped into Sanity, Contentful, Payload, Strapi, a custom admin panel, or another editor without changing page code first.

Recommended CMS fields per page:

- `title`: required page title.
- `description`: required meta description.
- `canonical`: optional site-relative canonical override; falls back to `path`.
- `openGraphTitle`: optional; falls back to `title`.
- `openGraphDescription`: optional; falls back to `description`.
- `twitterTitle`: optional; falls back to Open Graph title, then title.
- `twitterDescription`: optional; falls back to Open Graph description, then description.
- `image`: optional social image object with `src`, `alt`, `width`, and `height`; falls back to the default image.
- `robots`: optional `index` and `follow` booleans; utility pages should remain noindex.

When a CMS is selected, keep the output shape compatible with `SeoPageConfig` in `content/site.ts`, then feed that data into `createPageMetadata`. The sitemap and robots rules already read from the same SEO source, so admin edits can stay consistent across metadata, social cards, sitemap inclusion, and structured data.

## Assumptions

- `+1 289-994-5553` is the canonical phone number.
- Hamilton and surrounding residential and commercial communities is the launch-safe service-area wording.
- `hello@thandylandscaping.ca` is a temporary assumed public email until the business confirms the real address.
- The Google Form URL and entry ids must be supplied before online quote submissions can complete.

## Validation

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run test`
- `npm run test:e2e`
