import { MetricCard } from "@/components/MetricCard";
import type { PartnerView } from "@/lib/engine/types";
import { formatFcfa, formatPct } from "@/lib/format";

export function SharePreview({ view }: { view: PartnerView }) {
  const data = view.passport;

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <MetricCard
          label="Revenu"
          value={
            data.monthlyAvgRevenue !== undefined
              ? formatFcfa(data.monthlyAvgRevenue)
              : "—"
          }
          hint={data.monthlyAvgRevenue === undefined ? "Non transmis" : undefined}
        />
        <MetricCard
          label="Évolution"
          value={
            data.growthRate !== undefined ? formatPct(data.growthRate) : "—"
          }
          hint={data.growthRate === undefined ? "Non transmis" : undefined}
        />
        <MetricCard
          label="Régularité"
          value={
            data.regularityScore !== undefined
              ? `${Math.round(data.regularityScore * 100)} %`
              : "—"
          }
          hint={data.regularityScore === undefined ? "Non transmis" : undefined}
        />
        <MetricCard
          label="Fournisseurs"
          value={
            data.supplierPaid !== undefined && data.supplierExpected !== undefined
              ? `${data.supplierPaid}/${data.supplierExpected}`
              : "—"
          }
          hint={data.supplierPaid === undefined ? "Non transmis" : undefined}
        />
      </div>
      <p className="text-xs text-[var(--muted)]">
        {view.denied.includes("individual_transactions")
          ? "Aucune transaction individuelle n'est envoyée."
          : "Les lignes de vente seraient visibles."}
      </p>
    </div>
  );
}
