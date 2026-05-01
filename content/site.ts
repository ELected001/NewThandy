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
  | "mail"
  | "instagram"
  | "x"
  | "facebook";

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
    "Thandy Landscaping Services Inc. helps homeowners, seniors, landlords, property managers, and individuals keep outdoor spaces clean, healthy, safe, and attractive across local residential and commercial areas.",
  tagline: "Clean Lawns. Clear Surroundings.",
  hero: {
    eyebrow: "Reliable Property Care",
    title: "Reliable lawn care and property maintenance",
    description:
      "Locally operated lawn mowing, seasonal cleanup, and outdoor property maintenance for homes, rental properties, managed spaces, and individuals who need consistent service and attention to detail.",
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
    summary: "Hamilton, Ontario and surrounding areas",
  },
  socialLinks: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/thandylandscaping/",
      icon: "instagram" as const,
    },
    {
      label: "X",
      href: "https://x.com/Thandylandscape",
      icon: "x" as const,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61575481803705",
      icon: "facebook" as const,
    },
  ],
} as const;

export type SeoRobots = {
  index: boolean;
  follow: boolean;
};

export type SeoImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type SeoPageConfig = {
  title: string;
  description: string;
  path: string;
  canonical?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  image?: SeoImage;
  robots?: SeoRobots;
};

export type SeoAdminField = {
  name: keyof SeoPageConfig;
  label: string;
  type: "text" | "textarea" | "url" | "image" | "robots";
  required: boolean;
  maxLength?: number;
  helpText: string;
  fallback?: string;
};

export const seo = {
  defaultTitle: `${siteConfig.name} | Local property care`,
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultDescription: siteConfig.description,
  defaultImage: {
    src: "/images/brand-strategy/mower-green-hero.jpg",
    alt: "A lawn mower moving through green grass for Thandy Landscaping Services Inc.",
    width: 2400,
    height: 1697,
  },
  pages: {
    home: {
      title: "Lawn care and property maintenance for homes and properties",
      description:
        "Request quote-led lawn mowing, leaf cleaning, seasonal cleanup, and outdoor property maintenance from Thandy Landscaping Services Inc. for Hamilton and surrounding communities.",
      path: "/",
      openGraphTitle: siteConfig.hero.title,
      openGraphDescription:
        "Clean lawns, clear surroundings, and direct quote conversations for homes, rentals, managed properties, and commercial spaces.",
      image: {
        src: "/images/brand-strategy/mower-green-hero.jpg",
        alt: "A lawn mower moving through green grass in Thandy brand colors",
        width: 2400,
        height: 1697,
      },
    },
    blog: {
      title: "Lawn care tips and property maintenance notes",
      description:
        "Read practical lawn care, leaf cleanup, seasonal preparation, and property maintenance notes from Thandy Landscaping Services Inc.",
      path: "/blog",
      openGraphTitle: "Lawn care tips and property maintenance notes",
      openGraphDescription:
        "Practical outdoor care notes for lawn mowing, seasonal cleanup, and property maintenance planning.",
      image: {
        src: "/images/brand-strategy/garden-path.jpg",
        alt: "A clean garden path surrounded by healthy landscaping",
        width: 2200,
        height: 1237,
      },
    },
    thankYou: {
      title: "Quote request received",
      description:
        "Confirmation page for a submitted Thandy Landscaping Services Inc. quote request.",
      path: "/thank-you",
      openGraphTitle: "Quote request received",
      openGraphDescription:
        "Your Thandy Landscaping Services Inc. quote request has been received.",
      image: {
        src: "/images/brand-strategy/key-handoff.jpg",
        alt: "A simple property service handoff scene",
        width: 1800,
        height: 1200,
      },
      robots: {
        index: false,
        follow: false,
      },
    },
    notFound: {
      title: "Page not found",
      description:
        "The requested page could not be found on the Thandy Landscaping Services Inc. site.",
      path: "/404",
      canonical: "/",
      openGraphTitle: "Page not found",
      openGraphDescription:
        "Use the homepage or quote form to continue with Thandy Landscaping Services Inc.",
      image: {
        src: "/images/brand/logo-black-green.png",
        alt: "Thandy Landscaping Services Inc. logo",
        width: 3299,
        height: 1617,
      },
      robots: {
        index: false,
        follow: true,
      },
    },
  },
} as const satisfies {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultImage: SeoImage;
  pages: Record<string, SeoPageConfig>;
};

export const seoAdmin = {
  version: 1,
  pageLabels: {
    home: "Homepage",
    blog: "Blog index",
    thankYou: "Quote confirmation",
    notFound: "404 page",
  },
  fields: [
    {
      name: "title",
      label: "Page title",
      type: "text",
      required: true,
      maxLength: 60,
      helpText: "Primary browser and search result title. Keep it specific to the page.",
    },
    {
      name: "description",
      label: "Meta description",
      type: "textarea",
      required: true,
      maxLength: 160,
      helpText: "Search result summary. Write naturally and avoid keyword stuffing.",
    },
    {
      name: "canonical",
      label: "Canonical URL path",
      type: "url",
      required: false,
      helpText: "Optional canonical override. Use a site-relative path unless a cross-domain canonical is intentional.",
      fallback: "path",
    },
    {
      name: "openGraphTitle",
      label: "Open Graph title",
      type: "text",
      required: false,
      maxLength: 70,
      helpText: "Social sharing title for Facebook, LinkedIn, and other Open Graph consumers.",
      fallback: "title",
    },
    {
      name: "openGraphDescription",
      label: "Open Graph description",
      type: "textarea",
      required: false,
      maxLength: 200,
      helpText: "Social sharing description for Open Graph consumers.",
      fallback: "description",
    },
    {
      name: "twitterTitle",
      label: "Twitter/X title",
      type: "text",
      required: false,
      maxLength: 70,
      helpText: "Optional X card title.",
      fallback: "openGraphTitle, title",
    },
    {
      name: "twitterDescription",
      label: "Twitter/X description",
      type: "textarea",
      required: false,
      maxLength: 200,
      helpText: "Optional X card description.",
      fallback: "openGraphDescription, description",
    },
    {
      name: "image",
      label: "Social image",
      type: "image",
      required: false,
      helpText: "Open Graph and Twitter/X image with required alt text, width, and height.",
      fallback: "seo.defaultImage",
    },
    {
      name: "robots",
      label: "Robots",
      type: "robots",
      required: false,
      helpText: "Index/follow controls. Use noindex for confirmation, utility, and error pages only.",
      fallback: "index: true, follow: true",
    },
  ],
  platformNotes: [
    "Map these fields one-to-one in the chosen CMS or admin panel.",
    "Keep canonical paths site-relative unless there is an approved external canonical.",
    "Require social image alt text whenever a social image is changed.",
    "Do not index thank-you, 404, or other utility pages.",
    "Use the manifest endpoint as the source for current values and fallback behavior.",
  ],
} as const satisfies {
  version: number;
  pageLabels: Record<keyof typeof seo.pages, string>;
  fields: SeoAdminField[];
  platformNotes: readonly string[];
};

export const navigation = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Profile", href: "/#profile" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#quote-form" },
  { label: "Blog", href: "/blog" },
] as const;

export const trustChips = [
  { label: "Hamilton and surrounding communities", icon: "map" as const },
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
    description: "Local service shaped around households, managed spaces, and nearby environments.",
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
    description: "Homes and managed properties across the service area should feel the difference careful outdoor work can make.",
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
      "Thandy serves Hamilton along with surrounding residential and commercial communities including Oakville, Burlington, Waterdown and many more.",
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
      "Thandy is positioned as a local landscaping company serving Hamilton and nearby communities.",
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
    description: "Serving Hamilton and surrounding residential and commercial communities.",
    value: siteConfig.location.summary,
    href: undefined,
    icon: "map" as const,
  },
] as const;

export const blogTopicCards = [
  {
    title: "Preparing for a lawn mowing visit",
    description:
      "Simple notes on access, pets, outdoor items, and the property details that help a mowing visit stay efficient.",
    icon: "leaf" as const,
  },
  {
    title: "What shapes a seasonal cleanup quote",
    description:
      "A practical look at leaf volume, debris, access, green waste, and timing before a cleanup is scoped.",
    icon: "wind" as const,
  },
  {
    title: "Planning recurring property maintenance",
    description:
      "How property size, visit rhythm, and outdoor problem areas can guide a maintenance conversation.",
    icon: "layers" as const,
  },
] as const;
