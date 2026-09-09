import type { Anomaly, Indicators, MonthlyPoint, Transaction } from "./types";

function monthKey(date: string): string {
  return date.slice(0, 7);
}

function mean(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function stdev(values: number[]): number {
  if (values.length < 2) {
    return 0;
  }
  const avg = mean(values);
  const variance =
    values.reduce((sum, value) => sum + (value - avg) ** 2, 0) /
    (values.length - 1);
  return Math.sqrt(variance);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function computeIndicators(transactions: Transaction[]): Indicators {
  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  const buckets = new Map<string, MonthlyPoint>();
  for (const tx of sorted) {
    const month = monthKey(tx.date);
    const current = buckets.get(month) ?? {
      month,
      inbound: 0,
      outbound: 0,
      net: 0,
    };
    if (tx.direction === "in") {
      current.inbound += tx.amount;
    } else {
      current.outbound += tx.amount;
    }
    current.net = current.inbound - current.outbound;
    buckets.set(month, current);
  }

  const monthly = [...buckets.values()].sort((a, b) =>
    a.month.localeCompare(b.month),
  );
  const revenues = monthly.map((point) => point.inbound);
  const monthlyAvgRevenue = Math.round(mean(revenues));
  const firstRevenue = revenues[0] ?? 0;
  const lastMonthRevenue = revenues[revenues.length - 1] ?? 0;
  const growthRate =
    firstRevenue === 0 ? 0 : (lastMonthRevenue - firstRevenue) / firstRevenue;

  const revenueStdev = stdev(revenues);
  const coefficient =
    monthlyAvgRevenue === 0 ? 1 : revenueStdev / monthlyAvgRevenue;
  const regularityScore = clamp(1 - coefficient, 0, 1);

  const supplierPaid = sorted.filter(
    (tx) => tx.source === "supplier" && tx.direction === "out",
  ).length;
  const uniqueSupplierMonths = new Set(
    sorted
      .filter((tx) => tx.source === "supplier" && tx.direction === "out")
      .map((tx) => monthKey(tx.date)),
  );
  const supplierExpected = Math.max(uniqueSupplierMonths.size, supplierPaid);

  const anomalies: Anomaly[] = [];
  if (revenues.length >= 3 && revenueStdev > 0) {
    for (const point of monthly) {
      const deviation = (point.inbound - monthlyAvgRevenue) / revenueStdev;
      if (Math.abs(deviation) >= 1.5) {
        anomalies.push({
          month: point.month,
          inbound: point.inbound,
          deviationPct: monthlyAvgRevenue === 0 ? 0 : point.inbound / monthlyAvgRevenue - 1,
          kind: deviation > 0 ? "high" : "low",
        });
      }
    }
  }

  return {
    currency: "XOF",
    periodStart: first?.date ?? "",
    periodEnd: last?.date ?? "",
    monthlyAvgRevenue,
    lastMonthRevenue,
    growthRate,
    regularityScore,
    supplierPaid,
    supplierExpected,
    netCashflow: monthly.reduce((sum, point) => sum + point.net, 0),
    monthly,
    anomalies,
  };
}
