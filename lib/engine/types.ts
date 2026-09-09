export const DATA_SOURCES = [
  "cash",
  "mobile_money",
  "bank",
  "supplier",
] as const;

export type DataSource = (typeof DATA_SOURCES)[number];

export const DIRECTIONS = ["in", "out"] as const;
export type Direction = (typeof DIRECTIONS)[number];

export const CONSENT_SCOPES = [
  "aggregated_revenue",
  "activity_trend",
  "cashflow_summary",
  "regularity",
  "supplier_reliability",
  "ai_summary",
  "individual_transactions",
  "personal_identity",
] as const;

export type ConsentScope = (typeof CONSENT_SCOPES)[number];

export const CONSENT_SCOPE_LABELS: Record<ConsentScope, string> = {
  aggregated_revenue: "Revenu agrégé",
  activity_trend: "Évolution de l'activité",
  cashflow_summary: "Résumé du cash-flow",
  regularity: "Régularité de l'activité",
  supplier_reliability: "Paiements fournisseurs",
  ai_summary: "Résumé d'analyse",
  individual_transactions: "Transactions individuelles",
  personal_identity: "Informations personnelles",
};

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  currency: "XOF";
  source: DataSource;
  direction: Direction;
  category: string;
  counterparty: string;
  description: string;
};

export type MonthlyPoint = {
  month: string;
  inbound: number;
  outbound: number;
  net: number;
};

export type Anomaly = {
  month: string;
  inbound: number;
  deviationPct: number;
  kind: "high" | "low";
};

export const EVIDENCE_LEVELS = ["declared", "imported", "attested"] as const;
export type EvidenceLevel = (typeof EVIDENCE_LEVELS)[number];

export const EVIDENCE_GRADES = ["declared", "mixed", "attested"] as const;
export type EvidenceGrade = (typeof EVIDENCE_GRADES)[number];

export const EVIDENCE_GRADE_LABELS: Record<EvidenceGrade, string> = {
  declared: "Déclaratif",
  mixed: "Mixte — non attesté",
  attested: "Partiellement attesté",
};

export const EVIDENCE_LEVEL_LABELS: Record<EvidenceLevel, string> = {
  declared: "Déclaré",
  imported: "Importé, non signé",
  attested: "Attesté par un tiers",
};

export type SourceEvidence = {
  source: DataSource;
  inbound: number;
  share: number;
  level: EvidenceLevel;
};

export type EvidenceProfile = {
  grade: EvidenceGrade;
  declaredShare: number;
  importedShare: number;
  attestedShare: number;
  bySource: SourceEvidence[];
  statement: string;
  koraAttestsNothing: boolean;
};

export type Indicators = {
  currency: "XOF";
  periodStart: string;
  periodEnd: string;
  monthlyAvgRevenue: number;
  lastMonthRevenue: number;
  growthRate: number;
  regularityScore: number;
  supplierPaid: number;
  supplierExpected: number;
  netCashflow: number;
  monthly: MonthlyPoint[];
  anomalies: Anomaly[];
};

export type EconomicPassport = {
  businessName: string;
  ownerName: string;
  city: string;
  country: string;
  sector: string;
  generatedAt: string;
  indicators: Indicators;
  evidence: EvidenceProfile;
  explanation: string;
  disclaimer: string;
};

export type ConsentGrant = {
  id: string;
  partnerName: string;
  partnerId: string;
  scopes: ConsentScope[];
  durationDays: number;
  createdAt: string;
  expiresAt: string;
  status: "pending" | "active" | "revoked" | "expired";
};

export type PartnerView = {
  partnerName: string;
  expiresAt: string;
  granted: ConsentScope[];
  denied: ConsentScope[];
  evidence: EvidenceProfile | null;
  passport: Partial<{
    businessName: string;
    ownerName: string;
    city: string;
    sector: string;
    monthlyAvgRevenue: number;
    lastMonthRevenue: number;
    growthRate: number;
    regularityScore: number;
    supplierPaid: number;
    supplierExpected: number;
    netCashflow: number;
    monthly: MonthlyPoint[];
    explanation: string;
  }>;
};

export const DEMO_DISCLAIMER =
  "Données de démonstration. Ces chiffres n'ont pas été collectés sur le terrain et ne constituent pas un historique réel.";
