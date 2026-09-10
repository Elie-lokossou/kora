import {
  CONSENT_SCOPES,
  type ConsentGrant,
  type ConsentScope,
  type EconomicPassport,
  type PartnerView,
} from "./types";

function buildScopedExplanation(
  passport: EconomicPassport,
  allowed: Set<ConsentScope>,
): string {
  const sentences: string[] = [];
  const { indicators } = passport;
  if (allowed.has("aggregated_revenue")) {
    sentences.push(
      `Le revenu mensuel moyen observé est de ${new Intl.NumberFormat("fr-FR").format(indicators.monthlyAvgRevenue)} FCFA.`,
    );
  }
  if (allowed.has("activity_trend")) {
    const sign = indicators.growthRate > 0 ? "+" : "";
    sentences.push(
      `L’évolution entre le premier et le dernier mois est de ${sign}${Math.round(indicators.growthRate * 100)} %.`,
    );
  }
  if (allowed.has("regularity")) {
    sentences.push(
      `La régularité mensuelle calculée est de ${Math.round(indicators.regularityScore * 100)} %.`,
    );
  }
  if (allowed.has("supplier_reliability")) {
    sentences.push(
      `${indicators.supplierPaid} paiement(s) fournisseur(s) sur ${indicators.supplierExpected} attendu(s) sont observés.`,
    );
  }
  if (allowed.has("cashflow_summary")) {
    sentences.push(
      `Le cash-flow net cumulé est de ${new Intl.NumberFormat("fr-FR").format(indicators.netCashflow)} FCFA.`,
    );
  }
  if (sentences.length === 0) {
    return "Le résumé chiffré n’est pas disponible, car les indicateurs correspondants n’ont pas été autorisés.";
  }
  return `${sentences.join(" ")} Cette lecture décrit les données autorisées et ne constitue pas une décision de crédit.`;
}

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
    view.explanation = buildScopedExplanation(passport, allowed);
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
