import { importTransactions } from "@/lib/server/kora-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const csv =
      body && typeof body === "object" && "csv" in body
        ? (body as { csv?: unknown }).csv
        : undefined;
    if (typeof csv !== "string") {
      return Response.json({ error: "Le contenu CSV est requis." }, { status: 400 });
    }
    return Response.json(await importTransactions(csv), { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Import impossible." },
      { status: 400 },
    );
  }
}
