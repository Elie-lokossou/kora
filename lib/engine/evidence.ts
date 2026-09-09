import type { DataSource, EvidenceLevel, EvidenceProfile, Transaction } from "./types";

const LEVEL_BY_SOURCE: Record<DataSource, EvidenceLevel> = {
  cash: "declared",
  mobile_money: "imported",
  bank: "imported",
  supplier: "imported",
};

export function evidenceLevelForSource(source: DataSource): EvidenceLevel {
  return LEVEL_BY_SOURCE[source];
}

function shareOf(part: number, total: number): number {
  if (total <= 0) {
    return 0;
  }
  return part / total;
}

export function computeEvidence(transactions: Transaction[]): EvidenceProfile {
  const inbound = transactions.filter((tx) => tx.direction === "in");
  const totalInbound = inbound.reduce((sum, tx) => sum + tx.amount, 0);

  const inboundBySource: Record<DataSource, number> = {
    cash: 0,
    mobile_money: 0,
    bank: 0,
    supplier: 0,
  };
  for (const tx of inbound) {
    inboundBySource[tx.source] += tx.amount;
  }

  let declared = 0;
  let imported = 0;
  let attested = 0;
  for (const source of Object.keys(inboundBySource) as DataSource[]) {
    const amount = inboundBySource[source];
    const level = evidenceLevelForSource(source);
    if (level === "declared") {
      declared += amount;
    } else if (level === "imported") {
      imported += amount;
    } else {
      attested += amount;
    }
  }

  const declaredShare = shareOf(declared, totalInbound);
  const importedShare = shareOf(imported, totalInbound);
  const attestedShare = shareOf(attested, totalInbound);

  const grade =
    attestedShare >= 0.5
      ? "attested"
      : importedShare > 0 && declaredShare < 0.6
        ? "mixed"
        : "declared";

  const bySource = (Object.keys(inboundBySource) as DataSource[])
    .map((source) => ({
      source,
      inbound: inboundBySource[source],
      share: shareOf(inboundBySource[source], totalInbound),
      level: evidenceLevelForSource(source),
    }))
    .filter((row) => row.inbound > 0);

  const cashPct = Math.round(declaredShare * 100);
  const importedPct = Math.round(importedShare * 100);
  const attestedPct = Math.round(attestedShare * 100);

  const statement =
    attestedShare === 0
      ? `Kora n'atteste aucun de ces chiffres. ${cashPct} % des encaissements sont déclarés en espèces — invérifiables ici. ${importedPct} % sont importés comme Mobile Money ou banque, sans relevé signé ni API. ${attestedPct} % est attesté par un tiers.`
      : `Kora n'est pas une autorité de certification. ${attestedPct} % des encaissements portent une attestation tierce. Le reste reste déclaré ou simplement importé.`;

  return {
    grade,
    declaredShare,
    importedShare,
    attestedShare,
    bySource,
    statement,
    koraAttestsNothing: attestedShare === 0,
  };
}
