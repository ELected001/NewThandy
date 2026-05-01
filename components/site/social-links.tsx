import { Icon } from "@/components/ui/icons";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
  linkClassName?: string;
};

export function SocialLinks({ className, linkClassName }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {siteConfig.socialLinks.map((link) => (
        <a
          key={link.href}
          aria-label={`Visit Thandy on ${link.label}`}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/7 text-white transition hover:-translate-y-0.5 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink-950)]",
            linkClassName,
          )}
          href={link.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon className="h-[1.125rem] w-[1.125rem]" name={link.icon} />
        </a>
      ))}
    </div>
  );
}
