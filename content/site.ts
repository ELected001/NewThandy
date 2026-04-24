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
    "Thandy Landscaping Services Inc. is a locally operated business providing dependable lawn care, seasonal cleanup, and outdoor property maintenance for homeowners, seniors, landlords, and property managers in Hamilton and surrounding areas.",
  tagline: "Reliable Property Care — Season After Season",
  hero: {
    eyebrow: "Hamilton property care",
    title: "Reliable property care you can count on.",
    description:
      "Thandy Landscaping Services Inc. is a locally operated business providing dependable lawn care, seasonal cleanup, and outdoor property maintenance for homeowners, seniors, landlords, and property managers in Hamilton and surrounding areas. We keep outdoor spaces clean, safe, and well-maintained with consistent service and attention to detail.",
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
    description: "Ideal for homeowners who want dependable care and a clean, professional finish.",
    icon: "leaf" as const,
  },
  {
    title: "Seniors",
    description: "Respectful, family-friendly service that keeps outdoor upkeep easier to manage.",
    icon: "shield" as const,
  },
  {
    title: "Landlords",
    description: "Reliable exterior maintenance that helps rental properties stay tidy and presentable.",
    icon: "building" as const,
  },
  {
    title: "Property managers",
    description: "Priority-oriented care for managed spaces, shared grounds, and multi-property needs.",
    icon: "layers" as const,
  },
] as const;

export const serviceCards = [
  {
    slug: "lawn-care",
    emoji: "🌿",
    title: "Lawn care",
    eyebrow: "Recurring core service",
    summary:
      "Lawn mowing, edging, and trimming delivered with a clean, professional finish.",
    detail:
      "Keep pathways defined, turf tidy, and curb appeal consistent through dependable recurring visits.",
    bullets: [
      "Lawn mowing",
      "Edging & trimming",
      "Clean, professional finish",
    ],
    href: "/?service=lawn-care#quote-form",
    icon: "leaf" as const,
  },
  {
    slug: "seasonal-cleanup",
    emoji: "🍂",
    title: "Seasonal cleanup",
    eyebrow: "Spring and fall resets",
    summary:
      "Leaf removal, spring and fall yard cleanup, and debris clearing for safer, tidier outdoor spaces.",
    detail:
      "Reset properties between seasons without forcing a long contract or unsupported service bundle.",
    bullets: [
      "Leaf removal",
      "Spring & fall yard cleanup",
      "Debris clearing",
    ],
    href: "/?service=seasonal-cleanup#quote-form",
    icon: "wind" as const,
  },
  {
    slug: "property-maintenance",
    emoji: "🏡",
    title: "Property maintenance",
    eyebrow: "Flexible recurring upkeep",
    summary:
      "General outdoor upkeep, green waste removal, and ongoing maintenance services.",
    detail:
      "A maintenance plan shaped around property size, service frequency, and the level of care required.",
    bullets: [
      "General outdoor upkeep",
      "Green waste removal",
      "Ongoing maintenance services",
    ],
    href: "/?service=property-maintenance#quote-form",
    icon: "layers" as const,
  },
];

export const reliabilityPoints = [
  {
    title: "Reliable service",
    description:
      "Reliable service and consistent quality from the first visit onward.",
    icon: "clock" as const,
  },
  {
    title: "Respectful care",
    description:
      "Respectful, family-friendly care with clean, organized work every time.",
    icon: "shield" as const,
  },
  {
    title: "Trusted business",
    description:
      "Trusted, registered business you can feel confident working with.",
    icon: "spark" as const,
  },
  {
    title: "Consistent quality",
    description:
      "Attention to detail and dependable follow-through that keeps outdoor spaces well-maintained.",
    icon: "map" as const,
  },
];

export const packageCards = [
  {
    emoji: "🏡",
    name: "Essential Care Package",
    audience: "Ideal for homeowners and seniors",
    summary:
      "Bi-weekly lawn care and light maintenance for properties that need reliable seasonal upkeep.",
    bullets: [
      "Bi-weekly lawn care",
      "Light maintenance",
      "Ideal for homeowners & seniors",
    ],
    href: "/?service=lawn-care#quote-form",
  },
  {
    emoji: "🏢",
    name: "Property Manager Package",
    audience: "Recurring care for landlords and managed sites",
    summary:
      "Recurring lawn maintenance with priority service for rental and managed properties.",
    bullets: [
      "Recurring lawn maintenance",
      "Priority service",
      "Ideal for landlords & multi-property clients",
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
      "A locally operated business dedicated to reliable, professional outdoor property care.",
    icon: "map" as const,
  },
  {
    title: "Attention to detail",
    description:
      "We don’t rush jobs or cut corners, and every visit is handled with care.",
    icon: "check" as const,
  },
  {
    title: "Consistent quality",
    description:
      "Respect for your property and consistent quality are part of every service.",
    icon: "phone" as const,
  },
];

export const contactCards = [
  {
    emoji: "📞",
    title: "Phone",
    description: "Call or message today — fast response guaranteed.",
    value: siteConfig.phone.label,
    href: siteConfig.phone.href,
  },
  {
    emoji: "📧",
    title: "Email",
    description: "Use email for project notes and any details you want to send ahead of the callback.",
    value: siteConfig.email.label,
    href: siteConfig.email.href,
  },
  {
    emoji: "📍",
    title: "Service area",
    description: "Proudly serving Hamilton and surrounding residential and commercial areas.",
    value: siteConfig.location.summary,
    href: undefined,
  },
];
