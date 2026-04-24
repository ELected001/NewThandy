export type IconName =
  | "leaf"
  | "shield"
  | "check"
  | "building"
  | "phone"
  | "map"
  | "clock"
  | "spark"
  | "wind"
  | "layers"
  | "mail";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://thandylandscaping.ca";
const configuredEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@thandylandscaping.ca";

export const siteConfig = {
  name: "Thandy Landscaping Services Inc.",
  legalName: "Thandy Landscaping Services Inc.",
  shortName: "Thandy",
  url: configuredSiteUrl,
  description:
    "Hamilton lawn care, seasonal cleanup, and property maintenance for homeowners, seniors, landlords, and property managers who want dependable, respectful service.",
  tagline: "Reliable property care, season after season.",
  hero: {
    eyebrow: "Hamilton property care",
    title: "Reliable property care you can count on.",
    description:
      "Dependable lawn care, seasonal cleanup, and outdoor property maintenance for homeowners, seniors, landlords, and property managers across Hamilton and surrounding areas.",
  },
  phone: {
    label: "+1 289-994-5553",
    href: "tel:+12899945553",
  },
  email: {
    label: configuredEmail,
    href: `mailto:${configuredEmail}`,
    assumed: !process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  },
  location: {
    city: "Hamilton",
    region: "Ontario",
    country: "Canada",
    summary: "Hamilton, Ontario, Canada",
  },
} as const;

export const navigation = [
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
  { label: "Get Quote", href: "/#quote-form" },
] as const;

export const trustChips = [
  { label: "Hamilton-based service", icon: "map" as const },
  { label: "Phone-first scheduling", icon: "phone" as const },
  { label: "Clean, respectful visits", icon: "check" as const },
] as const;

export const audienceCards = [
  {
    title: "Homeowners",
    description: "Recurring lawn care and outdoor upkeep that keeps the property looking sharp.",
    icon: "leaf" as const,
  },
  {
    title: "Seniors",
    description: "Respectful, dependable service that makes outdoor upkeep easier to manage.",
    icon: "shield" as const,
  },
  {
    title: "Landlords",
    description: "Reliable exterior maintenance that helps rental properties stay tidy and presentable.",
    icon: "building" as const,
  },
  {
    title: "Property managers",
    description: "Consistent care for managed spaces, shared grounds, and multi-property needs.",
    icon: "layers" as const,
  },
] as const;

export const serviceCards = [
  {
    slug: "lawn-care",
    title: "Lawn care",
    eyebrow: "Recurring core service",
    summary:
      "Lawn mowing, edging, and trimming for properties that need a clean, consistent finish.",
    detail:
      "Keep pathways defined, turf tidy, and curb appeal predictable through consistent recurring visits.",
    bullets: [
      "Lawn mowing and crisp perimeter trimming",
      "Edging to keep walkways and beds defined",
      "Clean finish that respects the property",
    ],
    href: "/?service=lawn-care#quote-form",
    icon: "leaf" as const,
  },
  {
    slug: "seasonal-cleanup",
    title: "Seasonal cleanup",
    eyebrow: "Spring and fall resets",
    summary:
      "Leaf removal, debris clearing, and spring or fall yard cleanup for safer, tidier outdoor spaces.",
    detail:
      "Reset properties between seasons without forcing a long contract or unsupported service bundle.",
    bullets: [
      "Leaf removal and debris clearing",
      "Spring and fall yard cleanups",
      "Green waste removal where needed",
    ],
    href: "/?service=seasonal-cleanup#quote-form",
    icon: "wind" as const,
  },
  {
    slug: "property-maintenance",
    title: "Property maintenance",
    eyebrow: "Flexible recurring upkeep",
    summary:
      "Ongoing outdoor upkeep for homes, rentals, and managed properties that need dependable attention.",
    detail:
      "A maintenance plan shaped around property size, visit frequency, and the level of care required.",
    bullets: [
      "Ongoing upkeep for residential and commercial properties",
      "Scope tailored to landlords and property managers",
      "Custom care rhythm instead of generic flat-rate packages",
    ],
    href: "/?service=property-maintenance#quote-form",
    icon: "layers" as const,
  },
];

export const reliabilityPoints = [
  {
    title: "Dependable scheduling",
    description:
      "Scheduled visits, clear communication, and reliable follow-through help keep outdoor upkeep predictable.",
    icon: "clock" as const,
  },
  {
    title: "Respect for the property",
    description:
      "Every visit is handled with care, from tidy work areas to a clean, finished look.",
    icon: "shield" as const,
  },
  {
    title: "Honest quoting",
    description:
      "Quotes are based on the property, the visit frequency, and the level of care required.",
    icon: "spark" as const,
  },
  {
    title: "Local service",
    description:
      "Hamilton-focused service for homeowners, seniors, landlords, and property managers.",
    icon: "map" as const,
  },
];

export const packageCards = [
  {
    name: "Essential Care Package",
    audience: "Ideal for homeowners and seniors",
    summary:
      "Recurring lawn care for homes that need steady, dependable upkeep through the growing season.",
    bullets: [
      "Recurring lawn care schedule",
      "Edging and trimming as needed",
      "Custom quote based on property size and scope",
    ],
    href: "/?service=lawn-care#quote-form",
  },
  {
    name: "Property Manager Package",
    audience: "Recurring care for landlords and managed sites",
    summary:
      "Recurring exterior maintenance for rental and managed properties that need reliable, predictable service.",
    bullets: [
      "Recurring lawn maintenance",
      "Service planning for rentals and managed spaces",
      "Custom scope for single-site or multi-property needs",
    ],
    href: "/?service=property-maintenance#quote-form",
  },
];

export const pricingFactors = [
  {
    title: "Property size",
    description: "Larger sites and more complex layouts naturally take more time and care.",
    icon: "map" as const,
  },
  {
    title: "Service frequency",
    description: "Weekly, bi-weekly, one-time, and seasonal visits each create a different scope.",
    icon: "clock" as const,
  },
  {
    title: "Seasonal scope",
    description: "Leaf volume, debris clearing, and reset work shape the final quote.",
    icon: "wind" as const,
  },
  {
    title: "Level of care",
    description: "The quote reflects the finish standard you need, not a one-size-fits-all package.",
    icon: "spark" as const,
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Share the property details",
    description:
      "Call or send the short quote form with the service type, location, and anything that matters for access or timing.",
    icon: "phone" as const,
  },
  {
    number: "02",
    title: "Get a custom scope",
    description:
      "The quote is shaped around property size, service frequency, and the level of care required.",
    icon: "spark" as const,
  },
  {
    number: "03",
    title: "Confirm the visit",
    description:
      "Once the scope fits, the next step is a simple scheduled visit, not a long sales process.",
    icon: "check" as const,
  },
];

export const faqItems = [
  {
    question: "Do you offer custom quotes?",
    answer:
      "Yes. Every property is different, so pricing is based on size, service frequency, and the level of care required.",
  },
  {
    question: "Do you work with landlords and property managers?",
    answer:
      "Yes. Thandy works with homeowners, landlords, property managers, and multi-property clients.",
  },
  {
    question: "Do you offer seasonal cleanup?",
    answer:
      "Yes. Seasonal cleanup includes leaf removal, debris clearing, and spring or fall reset work.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Hamilton is the core service area, along with surrounding residential and commercial areas.",
  },
];

export const comparisonColumns = [
  {
    title: "Best fit for homeowners and seniors",
    items: [
      "Consistent recurring lawn care",
      "Light maintenance and tidy finishes",
      "A simple, direct quote process",
    ],
  },
  {
    title: "Best fit for landlords and property managers",
    items: [
      "Recurring upkeep across managed spaces",
      "Priority-oriented scope planning",
      "Custom maintenance rhythm for multi-property needs",
    ],
  },
];

export const serviceAreas = [
  "Hamilton",
  "Surrounding residential areas",
  "Surrounding commercial areas",
];

export const aboutHighlights = [
  {
    title: "Locally operated",
    description:
      "Hamilton-area service focused on clean, safe, well-maintained outdoor spaces.",
    icon: "map" as const,
  },
  {
    title: "Attention to detail",
    description:
      "Careful work, tidy finishes, and no rushed jobs or cut corners.",
    icon: "check" as const,
  },
  {
    title: "Easy to work with",
    description:
      "Clear communication and a simple quote process from the first call onward.",
    icon: "phone" as const,
  },
];

export const contactCards = [
  {
    title: "Call directly",
    description: "Call for a fast response and a straightforward quote conversation.",
    value: siteConfig.phone.label,
    href: siteConfig.phone.href,
    icon: "phone" as const,
  },
  {
    title: "Email for project notes",
    description: "Useful for photos, notes, and any details that help before the callback.",
    value: siteConfig.email.label,
    href: siteConfig.email.href,
    icon: "mail" as const,
  },
  {
    title: "Service area",
    description: "Hamilton and surrounding residential and commercial areas.",
    value: siteConfig.location.summary,
    href: undefined,
    icon: "map" as const,
  },
];
