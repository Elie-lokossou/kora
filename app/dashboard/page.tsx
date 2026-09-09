"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
import { EvidencePanel } from "@/components/EvidencePanel";
import { MetricCard } from "@/components/MetricCard";
import { RevenueChart } from "@/components/RevenueChart";
import { formatFcfa, formatPct } from "@/lib/format";

export default function DashboardPage() {
  const { passport, receipts } = useDemo();
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
        fragmentée, rassemblée, partageable à durée limitée. Tu vois qui a
        ouvert le dossier.
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

      <section className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-5">
        <h2 className="font-serif text-xl">Qui a ouvert le dossier</h2>
        {receipts.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--muted)]">
            Personne pour l&apos;instant. Autorise un partenaire, puis ouvre sa
            vue : le reçu apparaît ici.
          </p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {receipts.map((receipt) => (
              <li key={receipt.id} className="flex justify-between gap-4">
                <span>{receipt.partnerName} a consulté le dossier</span>
                <span className="text-[var(--muted)]">
                  {receipt.viewedAt.slice(11, 16)}
                </span>
              </li>
            ))}
          </ul>
        )}
        <Link href="/consent" className="mt-4 inline-block text-sm underline">
          Décider ce qu&apos;ils voient
        </Link>
      </section>

      <div className="mt-6">
        <EvidencePanel evidence={passport.evidence} compact />
      </div>
    </AppShell>
  );
}
