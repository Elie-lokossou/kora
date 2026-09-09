import {
  CONSENT_SCOPES,
  type ConsentGrant,
  type ConsentScope,
  type EconomicPassport,
  type PartnerView,
} from "./types";

export function filterPassportForScopes(
  passport: EconomicPassport,
  scopes: ConsentScope[],
): PartnerView["passport"] {
  const allowed = new Set(scopes);
  const view: PartnerView["passport"] = {};

  if (allowed.has("personal_identity")) {
    view.ownerName = passport.ownerName;
    view.businessName = passport.businessName;
    view.city = passport.city;
    view.sector = passport.sector;
  } else {
    view.businessName = passport.businessName;
    view.city = passport.city;
    view.sector = passport.sector;
  }

  if (allowed.has("aggregated_revenue")) {
    view.monthlyAvgRevenue = passport.indicators.monthlyAvgRevenue;
    view.lastMonthRevenue = passport.indicators.lastMonthRevenue;
  }

  if (allowed.has("activity_trend")) {
    view.growthRate = passport.indicators.growthRate;
    view.monthly = passport.indicators.monthly;
  }

  if (allowed.has("cashflow_summary")) {
    view.netCashflow = passport.indicators.netCashflow;
  }

  if (allowed.has("regularity")) {
    view.regularityScore = passport.indicators.regularityScore;
  }

  if (allowed.has("supplier_reliability")) {
    view.supplierPaid = passport.indicators.supplierPaid;
    view.supplierExpected = passport.indicators.supplierExpected;
  }

  if (allowed.has("ai_summary")) {
    view.explanation = passport.explanation;
  }

  return view;
}

export function buildPartnerView(
  passport: EconomicPassport,
  consent: ConsentGrant,
  nowIso: string,
): PartnerView {
  const expired = consent.expiresAt <= nowIso;
  const active = consent.status === "active" && !expired;
  const granted = active ? consent.scopes : [];

  return {
    partnerName: consent.partnerName,
    expiresAt: consent.expiresAt,
    granted,
    denied: CONSENT_SCOPES.filter((scope) => !granted.includes(scope)),
    passport: active ? filterPassportForScopes(passport, granted) : {},
  };
}

export function addDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}
