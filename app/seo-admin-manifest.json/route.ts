import { createSeoAdminManifest } from "@/lib/seo-admin";

export const dynamic = "force-static";

export function GET() {
  return Response.json(createSeoAdminManifest(), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
