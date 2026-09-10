import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildMariamTransactions } from "../demo/mariam";
import { buildPartnerView } from "./consent";
import { explainIndicators, buildPassport } from "./explain";
import { computeIndicators } from "./indicators";
import { parseCsv, transactionsToCsv } from "./normalize";
import type { ConsentGrant, Transaction } from "./types";

const sample: Transaction[] = [
  {
    id: "a",
    date: "2026-03-01",
    amount: 100,
    currency: "XOF",
    source: "cash",
    direction: "in",
    category: "sales",
    counterparty: "A",
    description: "",
  },
  {
    id: "b",
    date: "2026-04-01",
    amount: 121,
    currency: "XOF",
    source: "cash",
    direction: "in",
    category: "sales",
    counterparty: "A",
    description: "",
  },
];

describe("computeIndicators", () => {
  it("computes growth between first and last month", () => {
    const indicators = computeIndicators(sample);
    assert.equal(indicators.monthlyAvgRevenue, 111);
    assert.ok(Math.abs(indicators.growthRate - 0.21) < 0.001);
  });

  it("keeps Mariam near the conceptual brief", () => {
    const indicators = computeIndicators(buildMariamTransactions());
    assert.ok(indicators.monthlyAvgRevenue > 370000);
    assert.ok(indicators.monthlyAvgRevenue < 400000);
    assert.ok(indicators.growthRate > 0.18);
    assert.ok(indicators.growthRate < 0.24);
    assert.equal(indicators.supplierPaid, 4);
    assert.equal(indicators.supplierExpected, 4);
    assert.ok(indicators.regularityScore > 0.8);
  });
});

describe("csv roundtrip", () => {
  it("parses the exported Mariam file", () => {
    const csv = transactionsToCsv(buildMariamTransactions());
    const parsed = parseCsv(csv);
    assert.equal(parsed.length, buildMariamTransactions().length);
    assert.equal(parsed[0]?.source, "cash");
  });
});

describe("partner filtering", () => {
  it("hides revenue when the scope is denied", () => {
    const passport = buildPassport({
      businessName: "Mariam Commerce",
      ownerName: "Mariam Adjovi",
      city: "Cotonou",
      country: "Bénin",
      sector: "Commerce",
      generatedAt: "2026-09-09T09:00:00.000Z",
      indicators: computeIndicators(sample),
    });
    const consent: ConsentGrant = {
      id: "c1",
      partnerName: "ABC Bank",
      partnerId: "abc",
      scopes: ["ai_summary"],
      durationDays: 30,
      createdAt: "2026-09-09T09:00:00.000Z",
      expiresAt: "2026-10-09T09:00:00.000Z",
      status: "active",
    };
    const view = buildPartnerView(passport, consent, "2026-09-10T09:00:00.000Z");
    assert.equal(view.passport.monthlyAvgRevenue, undefined);
    assert.equal(typeof view.passport.explanation, "string");
    assert.doesNotMatch(view.passport.explanation ?? "", /\b111\b|FCFA/);
    assert.ok(explainIndicators(passport.indicators).includes("FCFA"));
  });

  it("returns no passport values after revocation or expiration", () => {
    const passport = buildPassport({
      businessName: "Mariam Commerce",
      ownerName: "Mariam Adjovi",
      city: "Cotonou",
      country: "Bénin",
      sector: "Commerce",
      generatedAt: "2026-09-09T09:00:00.000Z",
      indicators: computeIndicators(sample),
    });
    const consent: ConsentGrant = {
      id: "c2",
      partnerName: "ABC Bank",
      partnerId: "abc",
      scopes: ["aggregated_revenue", "personal_identity"],
      durationDays: 7,
      createdAt: "2026-09-01T09:00:00.000Z",
      expiresAt: "2026-09-08T09:00:00.000Z",
      status: "active",
    };
    const expired = buildPartnerView(passport, consent, "2026-09-10T09:00:00.000Z");
    const revoked = buildPartnerView(
      passport,
      { ...consent, status: "revoked", expiresAt: "2026-10-08T09:00:00.000Z" },
      "2026-09-10T09:00:00.000Z",
    );
    assert.deepEqual(expired.passport, {});
    assert.deepEqual(revoked.passport, {});
    assert.equal(expired.granted.length, 0);
    assert.equal(revoked.granted.length, 0);
  });
});
