import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { defaultMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, "h-full scroll-smooth")}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-[var(--surface-base)] font-sans text-[var(--text-primary)] antialiased">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
