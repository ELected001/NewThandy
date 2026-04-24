# Thandy Website Agent Notes

## Project purpose

Build and maintain a premium lead-generation website for Thandy Landscaping Services Inc. The launch site is about fast conversion into calls or quote requests, not broad editorial storytelling. The canonical marketing experience is a single anchored homepage; legacy marketing routes are redirect shims, not parallel content surfaces.

## Commands

- `npm run dev`: start the local Next.js app.
- `npm run lint`: run ESLint.
- `npm run typecheck`: run TypeScript without emit.
- `npm run build`: production build check.
- `npm run test`: run Vitest unit tests.
- `npm run test:e2e`: run Playwright smoke tests.

## Architecture map

- `app/`: the anchored homepage, redirect route shims, metadata, sitemap/robots, and the quote server action.
- `components/site/`: header, footer, CTA band, quote form, JSON-LD.
- `components/ui/`: reusable UI primitives and icons.
- `components/three/`: the optional hero 3D plaque and static fallback.
- `content/site.ts`: canonical marketing copy, navigation, packages, services, and contact details.
- `lib/`: validation, schema helpers, metadata helpers, shared utilities.
- `tests/`: unit and smoke tests.

## Design system rules

- Keep the black / green / off-white palette anchored to the existing brand guide.
- Use the supplied logo assets in `public/images/brand/`; do not redraw or recolor the mark ad hoc.
- Preserve the site’s visual hierarchy: dark poster-style hero, bright reading surfaces, restrained green accents.
- Motion should stay subtle and removable. Do not add ornamental looping animation outside the current narrow hero treatment.
- Use the current rounded geometry, spacing rhythm, and CTA patterns before introducing new primitives.

## Content rules

- Stay within the supported launch scope: lawn care, seasonal cleanup, and property maintenance.
- Keep pricing quote-led. Do not invent numeric prices, “starting at” tiers, or unsupported discounts.
- Do not publish fake testimonials, project counts, before/after claims, or review aggregates.
- Avoid stronger trust claims unless verified. Prefer “prompt replies” over “guaranteed response,” and avoid adding registration/licensing claims without evidence.
- Hamilton and surrounding residential/commercial areas is the safe launch service-area phrasing.

## Performance constraints

- Prefer server components by default.
- Keep 3D isolated, lazy-loaded, and optional.
- Use `next/image` and keep large media limited to the current hero/supporting visuals.
- Avoid adding client-only state or effects to static sections unless the interaction needs it.

## Conventions for future agents

- Update `content/site.ts` first when copy, navigation, services, or contact details change.
- If you add new CTAs or links, cover them with either unit tests or Playwright smoke assertions.
- If the form transport changes, document the new delivery path in `README.md` and keep the privacy note accurate.
- Before shipping new marketing copy, verify it does not exceed the proof supplied by the business.
