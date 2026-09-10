import { getPublicState } from "@/lib/server/kora-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await getPublicState(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json(
      { error: "Impossible de charger le dossier Kora." },
      { status: 500 },
    );
  }
}
