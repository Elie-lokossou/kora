import assert from "node:assert/strict";
import { rm } from "node:fs/promises";
import { join } from "node:path";
import { after, describe, it } from "node:test";
import { MARIAM_CSV } from "../demo/mariam";

const testFile = join(process.cwd(), ".data", "kora-api-test.json");
process.env.KORA_DATA_FILE = testFile;

after(async () => {
  await rm(testFile, { force: true });
});

describe("Kora API", () => {
  it("validates import payloads and persists normalized transactions", async () => {
    const { POST } = await import("../../app/api/import/route");
    const invalid = await POST(
      new Request("http://localhost/api/import", {
        method: "POST",
        body: JSON.stringify({ csv: "bad,data\n1,2" }),
      }),
    );
    assert.equal(invalid.status, 400);

    const valid = await POST(
      new Request("http://localhost/api/import", {
        method: "POST",
        body: JSON.stringify({ csv: MARIAM_CSV }),
      }),
    );
    const payload = (await valid.json()) as { transactions: unknown[] };
    assert.equal(valid.status, 201);
    assert.equal(payload.transactions.length, 28);
  });

  it("never exposes refused revenue or identity through the partner API", async () => {
    const consentRoute = await import("../../app/api/consents/route");
    const partnerRoute = await import("../../app/api/partner/route");
    const created = await consentRoute.POST(
      new Request("http://localhost/api/consents", {
        method: "POST",
        body: JSON.stringify({ scopes: ["ai_summary"], durationDays: 30 }),
      }),
    );
    assert.equal(created.status, 201);

    const response = await partnerRoute.GET();
    const body = (await response.json()) as {
      view: { passport: Record<string, unknown>; granted: string[] };
      accessLogId: string | null;
    };
    assert.deepEqual(body.view.granted, ["ai_summary"]);
    assert.equal(body.view.passport.monthlyAvgRevenue, undefined);
    assert.equal(body.view.passport.ownerName, undefined);
    assert.equal(body.view.passport.growthRate, undefined);
    assert.doesNotMatch(JSON.stringify(body.view.passport), /386.?018|Mariam Adjovi/);
    assert.ok(body.accessLogId?.startsWith("access-"));
  });

  it("cuts partner access immediately after revocation", async () => {
    const consentRoute = await import("../../app/api/consents/route");
    const partnerRoute = await import("../../app/api/partner/route");
    const revoked = await consentRoute.DELETE();
    assert.equal(revoked.status, 200);

    const response = await partnerRoute.GET();
    const body = (await response.json()) as {
      view: { passport: Record<string, unknown>; granted: string[] };
      accessLogId: string | null;
    };
    assert.deepEqual(body.view.passport, {});
    assert.deepEqual(body.view.granted, []);
    assert.equal(body.accessLogId, null);
  });
});
