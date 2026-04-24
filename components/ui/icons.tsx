import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
};

export function Icon({
  name,
  className,
}: IconProps & {
  name:
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
}) {
  const props = {
    className: cn("h-5 w-5", className),
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "leaf":
      return (
        <svg {...props}>
          <path d="M5 14c0-6 5-10 14-10-1 9-5 14-11 14A3 3 0 0 1 5 14Z" />
          <path d="M9 15c2-3 4.5-5.5 8-8" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3 5 6v5c0 5 3.1 8.7 7 10 3.9-1.3 7-5 7-10V6l-7-3Z" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="m5 13 4 4L19 7" />
        </svg>
      );
    case "building":
      return (
        <svg {...props}>
          <path d="M4 20V8l8-4 8 4v12" />
          <path d="M9 20v-5h6v5" />
          <path d="M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props}>
          <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.23.2 2.42.57 3.58a1 1 0 0 1-.24 1L6.6 10.8Z" />
        </svg>
      );
    case "map":
      return (
        <svg {...props}>
          <path d="M12 21s6-4.6 6-10a6 6 0 1 0-12 0c0 5.4 6 10 6 10Z" />
          <path d="M12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "spark":
      return (
        <svg {...props}>
          <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
        </svg>
      );
    case "wind":
      return (
        <svg {...props}>
          <path d="M4 9h10a2.5 2.5 0 1 0-2.5-2.5" />
          <path d="M2 13h14a2.5 2.5 0 1 1-2.5 2.5" />
          <path d="M4 17h7" />
        </svg>
      );
    case "layers":
      return (
        <svg {...props}>
          <path d="m12 4 8 4-8 4-8-4 8-4Z" />
          <path d="m4 12 8 4 8-4" />
          <path d="m4 16 8 4 8-4" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
  }
}
