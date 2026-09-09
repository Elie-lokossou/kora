import type { EconomicPassport, EvidenceProfile, Indicators } from "./types";
import { DEMO_DISCLAIMER } from "./types";

function formatFcfa(value: number): string {
  return new Intl.NumberFormat("fr-FR").format(Math.round(value));
}

function formatPct(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${Math.round(value * 100)} %`;
}

function monthLabel(month: string): string {
  const [year, mm] = month.split("-");
  if (!year || !mm) {
    return month;
  }
  const date = new Date(Number(year), Number(mm) - 1, 1);
  return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

export function explainIndicators(
  indicators: Indicators,
  evidence?: EvidenceProfile,
): string {
  const growth =
    indicators.growthRate >= 0.05
      ? `Les revenus sont en hausse (${formatPct(indicators.growthRate)}) entre le premier et le dernier mois observés.`
      : indicators.growthRate <= -0.05
        ? `Les revenus reculent (${formatPct(indicators.growthRate)}) sur la période.`
        : `Les revenus restent globalement stables (${formatPct(indicators.growthRate)}).`;

  const regularity =
    indicators.regularityScore >= 0.8
      ? `L'activité est régulière (${Math.round(indicators.regularityScore * 100)} %), ce qui indique un rythme de ventes prévisible.`
      : indicators.regularityScore >= 0.55
        ? `La régularité est moyenne (${Math.round(indicators.regularityScore * 100)} %) : l'activité existe, avec des variations mensuelles.`
        : `La régularité est faible (${Math.round(indicators.regularityScore * 100)} %). Un partenaire devrait lire cela comme une volatilité, pas comme une absence d'activité.`;

  const suppliers =
    indicators.supplierExpected === 0
      ? `Aucun paiement fournisseur n'est présent dans le jeu importé.`
      : `Les paiements fournisseurs observés sont de ${indicators.supplierPaid}/${indicators.supplierExpected} sur la période.`;

  const anomaly =
    indicators.anomalies[0] === undefined
      ? `Aucune anomalie mensuelle forte n'a été détectée au seuil retenu.`
      : `Point inhabituel : ${monthLabel(indicators.anomalies[0].month)} (${formatFcfa(indicators.anomalies[0].inbound)} FCFA).`;

  const proof = evidence
    ? evidence.statement
    : `Ceci est une lecture des données importées. Kora n'en atteste pas la véracité.`;

  return [
    `Revenu mensuel moyen : ${formatFcfa(indicators.monthlyAvgRevenue)} FCFA.`,
    growth,
    regularity,
    suppliers,
    anomaly,
    proof,
    `Ceci n'est pas une décision de crédit.`,
  ].join(" ");
}

export function buildPassport(input: {
  businessName: string;
  ownerName: string;
  city: string;
  country: string;
  sector: string;
  generatedAt: string;
  indicators: Indicators;
  evidence: EvidenceProfile;
  explanation?: string;
}): EconomicPassport {
  return {
    businessName: input.businessName,
    ownerName: input.ownerName,
    city: input.city,
    country: input.country,
    sector: input.sector,
    generatedAt: input.generatedAt,
    indicators: input.indicators,
    evidence: input.evidence,
    explanation:
      input.explanation ??
      explainIndicators(input.indicators, input.evidence),
    disclaimer: DEMO_DISCLAIMER,
  };
}
