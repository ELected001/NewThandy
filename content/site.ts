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
    "Thandy Landscaping Services Inc. helps homeowners, seniors, landlords, property managers, and individuals keep outdoor spaces clean, healthy, safe, and attractive in Hamilton and surrounding residential and commercial areas.",
  tagline: "Clean Lawns. Clear Surroundings.",
  hero: {
    eyebrow: "Reliable Property Care",
    title: "Reliable lawn care and property maintenance in Hamilton.",
    description:
      "Locally operated lawn mowing, seasonal cleanup, and outdoor property maintenance for Hamilton homes, rental properties, managed spaces, and individuals who need consistent service and attention to detail.",
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
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Profile", href: "/#profile" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#quote-form" },
] as const;

export const trustChips = [
  { label: "Hamilton and surrounding areas", icon: "map" as const },
  { label: "Lawn mowing and leaf cleaning", icon: "leaf" as const },
  { label: "Clear quote conversations", icon: "phone" as const },
] as const;

export const audienceCards = [
  {
    title: "Homeowners",
    description: "For households that want a neat lawn, clean surroundings, and a simple way to book care.",
    icon: "leaf" as const,
  },
  {
    title: "Seniors",
    description: "Helpful, respectful upkeep for clients who want outdoor maintenance handled with care.",
    icon: "shield" as const,
  },
  {
    title: "Landlords",
    description: "Outdoor upkeep that helps rental properties stay tidy, attractive, and ready for tenants.",
    icon: "building" as const,
  },
  {
    title: "Property managers",
    description: "Reliable support for managed spaces, estate properties, facilities, and recurring needs.",
    icon: "layers" as const,
  },
] as const;

export const serviceCards = [
  {
    slug: "lawn-care",
    title: "Lawn mowing",
    eyebrow: "Clean lawn care",
    summary:
      "Mowing, edging, and trimming for lawns that need a neat and attractive finish.",
    detail:
      "A straightforward service for homeowners, seniors, landlords, and managed properties that need dependable lawn upkeep.",
    bullets: ["Lawn mowing", "Edging and trimming", "Clean finish after the visit"],
    href: "/?service=lawn-care#quote-form",
    icon: "leaf" as const,
  },
  {
    slug: "seasonal-cleanup",
    title: "Leaf cleaning",
    eyebrow: "Seasonal reset",
    summary:
      "Leaf removal, debris clearing, and spring or fall cleanups that restore order around the property.",
    detail:
      "Leaf cleaning keeps paths, lawns, and outdoor spaces easier to use and better to look at.",
    bullets: ["Leaf removal", "Spring and fall cleanup", "Debris clearing"],
    href: "/?service=seasonal-cleanup#quote-form",
    icon: "wind" as const,
  },
  {
    slug: "property-maintenance",
    title: "Maintenance",
    eyebrow: "Ongoing outdoor care",
    summary:
      "General property maintenance shaped around the outdoor work your space needs.",
    detail:
      "A flexible scope for properties that need consistent attention beyond one mowing visit.",
    bullets: ["General outdoor upkeep", "Green waste removal", "Recurring maintenance planning"],
    href: "/?service=property-maintenance#quote-form",
    icon: "layers" as const,
  },
] as const;

export const brandFoundation = [
  {
    title: "Purpose",
    description:
      "Keep outdoor spaces clean, healthy, and attractive so every environment feels pleasant and worthy of living in.",
    icon: "leaf" as const,
  },
  {
    title: "Vision",
    description:
      "Build a reliable local landscaping service known for clean outdoor spaces, clear communication, and visible care in the environments served.",
    icon: "map" as const,
  },
  {
    title: "Mission",
    description:
      "Use effective equipment, skilled workmanship, and client-focused service to deliver neat, attractive lawns and clean surroundings while leaving a noticeable difference after every job.",
    icon: "spark" as const,
  },
  {
    title: "Values",
    description:
      "Customer satisfaction, quality work, reliability, clean and healthy environments, and respect for clients, properties, and the environment.",
    icon: "shield" as const,
  },
] as const;

export const reliabilityPoints = [
  {
    title: "Customer satisfaction",
    description: "The client's happiness comes first, from the first conversation through the completed visit.",
    icon: "phone" as const,
  },
  {
    title: "Quality work",
    description: "Neat, detailed, and professional results should be visible when the work is complete.",
    icon: "check" as const,
  },
  {
    title: "Reliable",
    description: "We keep communication clear, arrive prepared, and handle each agreed scope with care.",
    icon: "clock" as const,
  },
  {
    title: "Clean environment",
    description: "Clean and healthy surroundings improve the way people live with and use outdoor spaces.",
    icon: "leaf" as const,
  },
  {
    title: "Respect",
    description: "Respect for clients, properties, and the environment guides how every visit is handled.",
    icon: "shield" as const,
  },
] as const;

export const brandVoicePoints = [
  {
    title: "Professional",
    description: "Clear conduct, organized work, and service that feels legitimate from first contact.",
    icon: "check" as const,
  },
  {
    title: "Friendly",
    description: "Helpful and approachable while staying professional and easy to understand.",
    icon: "phone" as const,
  },
  {
    title: "Trustworthy",
    description: "Confident without being aggressive, with simple communication and dependable follow-through.",
    icon: "shield" as const,
  },
  {
    title: "Community-focused",
    description: "Local, Hamilton-centered service shaped around households, managed spaces, and nearby environments.",
    icon: "map" as const,
  },
  {
    title: "Family-friendly",
    description: "Safe, courteous service for homeowners, seniors, and households that want respectful outdoor care.",
    icon: "leaf" as const,
  },
  {
    title: "Clear business identity",
    description: "Simple, direct contact details and a clear local service focus help clients know who they are speaking with.",
    icon: "shield" as const,
  },
] as const;

export const brandStoryPoints = [
  {
    title: "How we started",
    description: "A desire to help people maintain clean and attractive environments.",
    icon: "leaf" as const,
  },
  {
    title: "What we're building",
    description: "A local landscaping company focused on quality, clear communication, and satisfaction.",
    icon: "building" as const,
  },
  {
    title: "Our goal",
    description: "Every household in Hamilton and its surrounding environment should experience the Thandy difference.",
    icon: "spark" as const,
  },
] as const;

export const pricingFactors = [
  {
    title: "Property size",
    description: "Larger spaces and more complex layouts affect the time and equipment needed.",
    icon: "map" as const,
  },
  {
    title: "Service frequency",
    description: "One-time, weekly, bi-weekly, and seasonal visits each need a different scope.",
    icon: "clock" as const,
  },
  {
    title: "Cleanup volume",
    description: "Leaf volume, debris, and access shape the final quote for cleanup work.",
    icon: "wind" as const,
  },
  {
    title: "Level of care",
    description: "The quote reflects the finish and maintenance rhythm your property needs.",
    icon: "spark" as const,
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Share the property details",
    description:
      "Call or send the quote form with your service type, location, timing, and access notes.",
    icon: "phone" as const,
  },
  {
    number: "02",
    title: "Get a custom scope",
    description:
      "We shape the quote around property size, service frequency, cleanup volume, and level of care.",
    icon: "spark" as const,
  },
  {
    number: "03",
    title: "Book the work",
    description:
      "Once the scope is clear, the next step is scheduling the service and preparing the property.",
    icon: "check" as const,
  },
] as const;

export const faqItems = [
  {
    question: "Do you provide custom quotes?",
    answer:
      "Yes. Every property is different, so quotes are based on size, service frequency, cleanup volume, and the level of care required.",
  },
  {
    question: "Which services are available?",
    answer:
      "The current service focus is lawn mowing, leaf cleaning, seasonal cleanup, and outdoor property maintenance.",
  },
  {
    question: "Who do you work with?",
    answer:
      "Thandy works with homeowners, seniors, landlords, property managers, and individuals who need reliable outdoor care.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Hamilton is the core service area, along with surrounding residential and commercial areas.",
  },
] as const;

export const comparisonColumns = [
  {
    title: "Residential care",
    items: [
      "Lawn mowing and trimming",
      "Leaf cleaning and seasonal reset",
      "Simple quote and booking process",
    ],
  },
  {
    title: "Managed properties",
    items: [
      "Recurring outdoor maintenance",
      "Clear scope for rental and estate properties",
      "Property manager and facility support",
    ],
  },
] as const;

export const serviceAreas = [
  "Hamilton",
  "Surrounding residential areas",
  "Surrounding commercial areas",
] as const;

export const aboutHighlights = [
  {
    title: "Clear and simple",
    description:
      "The brand voice is friendly, professional, confident, and easy to understand.",
    icon: "check" as const,
  },
  {
    title: "Visible care",
    description:
      "The service goal is an outdoor space that looks cleaner, healthier, and more attractive.",
    icon: "spark" as const,
  },
  {
    title: "Community focused",
    description:
      "Thandy is positioned as a local landscaping company serving Hamilton and nearby areas.",
    icon: "map" as const,
  },
] as const;

export const contentPlanItems = [
  "Mowing process photos",
  "Leaf cleaning process videos",
  "Seasonal cleanup notes",
  "Work-in-progress clips",
  "Service preparation tips",
  "Simple lawn care and leaf cleanup guidance",
] as const;

export const connectionChannels = [
  {
    title: "Website quote form",
    description: "Service details, contact information, and quote requests stay in one clear place.",
    icon: "building" as const,
  },
  {
    title: "Phone",
    description: "A direct call keeps urgent or detailed property questions simple.",
    icon: "map" as const,
  },
  {
    title: "Email",
    description: "Email is useful for project notes, access details, and photos a client wants reviewed before a callback.",
    icon: "spark" as const,
  },
  {
    title: "Local follow-up",
    description: "Quote conversations stay focused on service type, property context, timing, and access.",
    icon: "phone" as const,
  },
] as const;

export const contactCards = [
  {
    title: "Phone",
    description: "Call or message today to discuss the property and next available booking options.",
    value: siteConfig.phone.label,
    href: siteConfig.phone.href,
    icon: "phone" as const,
  },
  {
    title: "Email",
    description: "Use email for project notes and any details you want to send before a callback.",
    value: siteConfig.email.label,
    href: siteConfig.email.href,
    icon: "mail" as const,
  },
  {
    title: "Service area",
    description: "Serving Hamilton and surrounding residential and commercial areas.",
    value: siteConfig.location.summary,
    href: undefined,
    icon: "map" as const,
  },
] as const;
