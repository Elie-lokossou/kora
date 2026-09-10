import { createConsent, revokeConsent } from "@/lib/server/kora-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return Response.json({ error: "Requête invalide." }, { status: 400 });
    }
    const { scopes, durationDays } = body as {
      scopes?: unknown;
      durationDays?: unknown;
    };
    return Response.json(await createConsent({ scopes, durationDays }), {
      status: 201,
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Autorisation impossible." },
      { status: 400 },
    );
  }
}

export async function DELETE() {
  try {
    return Response.json(await revokeConsent());
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Révocation impossible." },
      { status: 400 },
    );
  }
}
