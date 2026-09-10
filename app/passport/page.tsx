"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  CalendarRange,
  CircleDollarSign,
  Fingerprint,
  MapPin,
  RefreshCcw,
  ShieldCheck,
  Store,
  Truck,
  WalletCards,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
import { MetricCard } from "@/components/MetricCard";
import { ScreenHeader, StatusBadge } from "@/components/ScreenHeader";
import { formatFcfa, formatPct } from "@/lib/format";

export default function PassportPage() {
  const { passport } = useDemo();
  const { indicators } = passport;

  return (
    <AppShell>
      <ScreenHeader
        eyebrow="Étape 4 sur 6"
        title="Economic Passport"
        description="Une représentation structurée de l’activité de Mariam, lisible et portable. Ce document produit n’est ni une identité légale, ni un score."
        icon={Fingerprint}
        action={<StatusBadge tone="success">Généré</StatusBadge>}
      />

      <section className="relative mt-8 overflow-hidden rounded-[2rem] bg-[var(--forest-deep)] p-6 text-white shadow-2xl shadow-[var(--forest)]/15 sm:p-9">
        <div className="absolute -right-12 -top-12 size-48 rounded-full border-[35px] border-white/[0.035]" aria-hidden="true" />
        <div className="relative flex flex-col justify-between gap-8 lg:flex-row">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--gold)]">
              Kora · Identité économique
            </p>
            <h2 className="mt-4 font-serif text-4xl">{passport.businessName}</h2>
            <p className="mt-2 text-white/65">{passport.ownerName}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2">
                <Store className="size-3.5 text-[var(--gold)]" aria-hidden="true" />
                {passport.sector}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2">
                <MapPin className="size-3.5 text-[var(--gold)]" aria-hidden="true" />
                {passport.city}, {passport.country}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-4 lg:text-right">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">Référence</p>
              <p className="mt-1 font-mono text-sm">KORA-DEMO-0926</p>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-white/45">Généré le</p>
              <p className="mt-1 text-sm">
                {new Date(passport.generatedAt).toLocaleDateString("fr-FR", { dateStyle: "long" })}
              </p>
            </div>
            <span className="grid size-14 place-items-center rounded-2xl bg-[var(--gold)] text-[var(--forest-deep)]">
              <Fingerprint className="size-7" aria-hidden="true" />
            </span>
          </div>
        </div>
        <div className="relative mt-9 flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-white/55">
          <ShieldCheck className="size-4 text-[var(--gold)]" aria-hidden="true" />
          Données contrôlées par l&apos;entrepreneure · Prototype de démonstration
        </div>
      </section>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Revenu mensuel moyen"
          value={formatFcfa(indicators.monthlyAvgRevenue)}
          hint="Agrégé sur six mois"
          icon={CircleDollarSign}
          accent
        />
        <MetricCard label="Croissance" value={formatPct(indicators.growthRate)} hint="Premier au dernier mois" icon={BadgePercent} />
        <MetricCard
          label="Régularité"
          value={`${Math.round(indicators.regularityScore * 100)} %`}
          hint="Stabilité de l’activité"
          icon={RefreshCcw}
        />
        <MetricCard
          label="Paiements fournisseurs"
          value={`${indicators.supplierPaid}/${indicators.supplierExpected}`}
          hint="Paiements observés"
          icon={Truck}
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6">
          <h2 className="font-serif text-2xl text-[var(--forest)]">Lecture du dossier</h2>
          <p className="mt-4 text-sm leading-7">{passport.explanation}</p>
        </section>
        <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6">
          <h2 className="font-serif text-2xl text-[var(--forest)]">Périmètre</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="flex items-center gap-2 text-[var(--muted)]"><CalendarRange className="size-4" aria-hidden="true" /> Période</dt>
              <dd className="font-bold">{indicators.periodStart.slice(0, 7)} — {indicators.periodEnd.slice(0, 7)}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="flex items-center gap-2 text-[var(--muted)]"><WalletCards className="size-4" aria-hidden="true" /> Cash-flow net</dt>
              <dd className="font-bold">{formatFcfa(indicators.netCashflow)}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="mt-5 flex flex-col justify-between gap-5 rounded-3xl border border-[var(--gold)]/40 bg-[var(--gold-soft)] p-5 sm:flex-row sm:items-center sm:p-6">
        <div>
          <h2 className="font-serif text-2xl text-[var(--forest)]">Mariam reste aux commandes</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Le passeport complet n&apos;est jamais transmis automatiquement. Choisis les informations, le destinataire et la durée.
          </p>
        </div>
        <Link
          href="/consent"
          className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--forest)] px-5 py-3 text-sm font-bold text-white"
        >
          Choisir ce que je partage
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>
      <p className="mt-4 text-xs leading-5 text-[var(--muted)]">{passport.disclaimer}</p>
    </AppShell>
  );
}
