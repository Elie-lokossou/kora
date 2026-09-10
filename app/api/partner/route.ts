import { getPartnerProjection } from "@/lib/server/kora-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await getPartnerProjection(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json(
      { error: "Impossible de charger la projection partenaire." },
      { status: 500 },
    );
  }
}
