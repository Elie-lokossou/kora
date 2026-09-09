"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
import { EvidencePanel } from "@/components/EvidencePanel";
import { MetricCard } from "@/components/MetricCard";
import { RevenueChart } from "@/components/RevenueChart";
import { formatFcfa, formatPct } from "@/lib/format";

export default function DashboardPage() {
  const { passport } = useDemo();
  const { indicators } = passport;

  return (
    <AppShell>
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
        Entrepreneur
      </p>
      <h1 className="mt-1 font-serif text-4xl text-[var(--forest)]">
        {passport.ownerName}
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        {passport.businessName} · {passport.sector} · {passport.city}. Activité
        fragmentée rassemblée dans un profil que tu contrôles. Les
        indicateurs ne sont pas une preuve.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Revenu mensuel moyen"
          value={formatFcfa(indicators.monthlyAvgRevenue)}
          hint="Démonstration"
        />
        <MetricCard
          label="Croissance"
          value={formatPct(indicators.growthRate)}
          hint="Premier → dernier mois"
        />
        <MetricCard
          label="Régularité"
          value={`${Math.round(indicators.regularityScore * 100)} %`}
        />
        <MetricCard
          label="Fournisseurs"
          value={`${indicators.supplierPaid}/${indicators.supplierExpected}`}
        />
      </div>

      <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl">Revenus mensuels</h2>
          <Link href="/import" className="text-sm text-[var(--forest)] underline">
            Importer des données
          </Link>
        </div>
        <RevenueChart data={indicators.monthly} />
      </section>

      <div className="mt-6">
        <EvidencePanel evidence={passport.evidence} />
      </div>
    </AppShell>
  );
}
