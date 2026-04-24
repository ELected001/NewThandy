import { siteConfig } from "@/content/site";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
