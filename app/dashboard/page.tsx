"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  LayoutDashboard,
  LockKeyhole,
  RefreshCcw,
  Store,
  Truck,
  WalletCards,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
import { MetricCard } from "@/components/MetricCard";
import { RevenueChart } from "@/components/RevenueChart";
import { ScreenHeader, StatusBadge } from "@/components/ScreenHeader";
import { formatFcfa, formatMonth, formatPct } from "@/lib/format";

export default function DashboardPage() {
  const { passport } = useDemo();
  const { indicators } = passport;

  return (
    <AppShell>
      <ScreenHeader
        eyebrow="Espace entrepreneur"
        title={`Bonjour, ${passport.ownerName.split(" ")[0]}`}
        description={`${passport.businessName} · ${passport.sector} · ${passport.city}. Voici la lecture consolidée de ton activité de démonstration.`}
        icon={LayoutDashboard}
        action={<StatusBadge tone="success">Dossier à jour</StatusBadge>}
      />

      <section className="mt-8 overflow-hidden rounded-3xl bg-[var(--forest-deep)] p-6 text-white shadow-xl shadow-[var(--forest)]/10 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-[var(--gold)]">
              <Store className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
                Ton activité prend forme
              </p>
              <h2 className="mt-2 font-serif text-2xl">6 mois d&apos;activité consolidés</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                Espèces, Mobile Money, banque et fournisseurs réunis dans un seul dossier lisible.
              </p>
            </div>
          </div>
          <Link
            href="/import"
            className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-bold text-[var(--forest-deep)]"
          >
            Continuer le parcours
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Revenu mensuel moyen"
          value={formatFcfa(indicators.monthlyAvgRevenue)}
          hint="Moyenne sur la période observée"
          icon={CircleDollarSign}
          accent
        />
        <MetricCard
          label="Croissance"
          value={formatPct(indicators.growthRate)}
          hint="Premier → dernier mois"
          icon={BadgePercent}
        />
        <MetricCard
          label="Régularité"
          value={`${Math.round(indicators.regularityScore * 100)} %`}
          hint="Stabilité des revenus mensuels"
          icon={RefreshCcw}
        />
        <MetricCard
          label="Paiements fournisseurs"
          value={`${indicators.supplierPaid}/${indicators.supplierExpected}`}
          hint="Paiements observés sur la période"
          icon={Truck}
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_.75fr]">
        <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-2xl text-[var(--forest)]">Revenus mensuels</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">
                {formatMonth(indicators.monthly[0]?.month ?? "")} — {formatMonth(indicators.monthly.at(-1)?.month ?? "")}
              </p>
            </div>
            <StatusBadge tone="warning">{formatPct(indicators.growthRate)} sur la période</StatusBadge>
          </div>
          <div className="mt-4">
            <RevenueChart data={indicators.monthly} />
          </div>
        </section>

        <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6">
          <h2 className="font-serif text-2xl text-[var(--forest)]">Aperçu du dossier</h2>
          <div className="mt-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-[var(--forest-soft)] text-[var(--forest)]">
                <CalendarDays className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs text-[var(--muted)]">Période observée</p>
                <p className="text-sm font-bold">{indicators.periodStart} — {indicators.periodEnd}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-[var(--gold-soft)] text-[var(--forest)]">
                <WalletCards className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs text-[var(--muted)]">Cash-flow net cumulé</p>
                <p className="text-sm font-bold">{formatFcfa(indicators.netCashflow)}</p>
              </div>
            </div>
          </div>
          <Link
            href="/passport"
            className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--forest)]"
          >
            Voir le passeport
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </section>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
        <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl text-[var(--forest)]">Activité récente</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">Les dernières étapes du dossier Mariam</p>
            </div>
            <Link href="/analysis" className="text-xs font-bold text-[var(--forest)]">Tout consulter</Link>
          </div>
          <ol className="mt-5 divide-y divide-[var(--line)]">
            {[
              [CheckCircle2, "28 transactions normalisées", "Import CSV Mariam", "Aujourd’hui, 09:42", "bg-[var(--forest-soft)] text-[var(--success)]"],
              [BarChart3, "Analyse économique recalculée", "6 mois consolidés", "Aujourd’hui, 09:43", "bg-[var(--gold-soft)] text-[var(--forest)]"],
              [FileCheck2, "Passeport économique généré", "Référence KORA-DEMO-0926", "Aujourd’hui, 09:43", "bg-[var(--clay-soft)] text-[var(--clay)]"],
            ].map(([Icon, title, detail, time, tone]) => {
              const ItemIcon = Icon as typeof CheckCircle2;
              return (
                <li key={String(title)} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${String(tone)}`}>
                    <ItemIcon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{String(title)}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{String(detail)}</p>
                  </div>
                  <span className="hidden items-center gap-1.5 text-[10px] text-[var(--muted)] sm:flex">
                    <Clock3 className="size-3" aria-hidden="true" />{String(time)}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-[var(--forest)]">Prêt à partager</h2>
            <LockKeyhole className="size-5 text-[var(--clay)]" aria-hidden="true" />
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Le dossier est complet. Il reste à choisir les informations qu’ABC Bank pourra consulter.
          </p>
          <div className="mt-6 space-y-3">
            {[
              ["Données importées", true],
              ["Analyse calculée", true],
              ["Passeport généré", true],
              ["Consentement configuré", false],
            ].map(([label, complete]) => (
              <div key={String(label)} className="flex items-center gap-3 text-sm">
                <span className={`grid size-5 place-items-center rounded-full ${complete ? "bg-[var(--success)] text-white" : "border border-[var(--line)] text-transparent"}`}>
                  <CheckCircle2 className="size-3" aria-hidden="true" />
                </span>
                <span className={complete ? "text-[var(--ink)]" : "text-[var(--muted)]"}>{String(label)}</span>
              </div>
            ))}
          </div>
          <Link href="/consent" className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--forest)] px-5 py-3 text-sm font-bold text-white">
            Configurer le consentement<ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
