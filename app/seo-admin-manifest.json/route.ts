import { createSeoAdminManifest } from "@/lib/seo-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await createSeoAdminManifest(), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
