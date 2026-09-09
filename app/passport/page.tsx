"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
import { EvidencePanel } from "@/components/EvidencePanel";
import { MetricCard } from "@/components/MetricCard";
import { formatFcfa, formatPct } from "@/lib/format";

export default function PassportPage() {
  const { passport } = useDemo();
  const { indicators } = passport;

  return (
    <AppShell>
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--gold)]">
        Economic Passport
      </p>
      <h1 className="mt-1 font-serif text-4xl text-[var(--forest)]">
        {passport.businessName}
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        {passport.ownerName} · {passport.city}, {passport.country} ·{" "}
        {passport.sector}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <MetricCard
          label="Revenu mensuel moyen"
          value={formatFcfa(indicators.monthlyAvgRevenue)}
        />
        <MetricCard label="Croissance" value={formatPct(indicators.growthRate)} />
        <MetricCard
          label="Régularité"
          value={`${Math.round(indicators.regularityScore * 100)} %`}
        />
        <MetricCard
          label="Paiements fournisseurs"
          value={`${indicators.supplierPaid}/${indicators.supplierExpected}`}
        />
      </div>

      <div className="mt-6">
        <EvidencePanel evidence={passport.evidence} compact />
      </div>

      <section className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-5">
        <h2 className="font-serif text-xl">Ce que ce document est</h2>
        <p className="mt-3 text-sm leading-7">
          Une représentation produit de l&apos;activité, pas une attestation.
          Mariam peut la partager ; le partenaire voit aussi le poids de la
          preuve — ce champ n&apos;est pas masquable. Ce n&apos;est pas une
          identité légale, pas un score, pas une décision. {passport.disclaimer}
        </p>
        <Link
          href="/consent"
          className="mt-4 inline-block rounded-full bg-[var(--forest)] px-4 py-2 text-sm text-white"
        >
          Choisir ce que je partage
        </Link>
      </section>
    </AppShell>
  );
}
