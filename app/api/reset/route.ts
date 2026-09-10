import { resetKoraState } from "@/lib/server/kora-store";

export const runtime = "nodejs";

export async function POST() {
  try {
    return Response.json(await resetKoraState());
  } catch {
    return Response.json(
      { error: "Impossible de réinitialiser la démonstration." },
      { status: 500 },
    );
  }
}
