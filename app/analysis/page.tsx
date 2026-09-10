"use client";

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
import { RevenueChart } from "@/components/RevenueChart";
import { ScreenHeader, StatusBadge } from "@/components/ScreenHeader";
import { formatFcfa, formatMonth } from "@/lib/format";

export default function AnalysisPage() {
  const { passport } = useDemo();
  const { indicators } = passport;

  return (
    <AppShell>
      <ScreenHeader
        eyebrow="Étape 3 sur 6"
        title="Comprendre les signaux"
        description="Kora traduit les indicateurs calculés en une lecture claire. Cette explication décrit les données : elle ne décide jamais d’un crédit."
        icon={Activity}
        action={<StatusBadge tone="success">Analyse terminée</StatusBadge>}
      />

      <section className="mt-8 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--white)]">
        <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--forest-soft)]/60 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-[var(--forest)] text-[var(--gold)]">
              <Bot className="size-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-bold text-[var(--forest)]">Lecture Kora</h2>
              <p className="text-xs text-[var(--muted)]">Explication déterministe disponible hors ligne</p>
            </div>
          </div>
          <Lightbulb className="hidden size-5 text-[var(--gold)] sm:block" aria-hidden="true" />
        </div>
        <div className="p-5 sm:p-7">
          <p className="font-serif text-xl leading-8 text-[var(--ink)] sm:text-2xl sm:leading-9">
            {passport.explanation}
          </p>
          <p className="mt-5 border-t border-[var(--line)] pt-4 text-xs leading-5 text-[var(--muted)]">
            {passport.disclaimer}
          </p>
        </div>
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_.8fr]">
        <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="size-5 text-[var(--success)]" aria-hidden="true" />
            <h2 className="font-serif text-2xl text-[var(--forest)]">Tendance des revenus</h2>
          </div>
          <div className="mt-4">
            <RevenueChart data={indicators.monthly} />
          </div>
        </section>

        <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6">
          <h2 className="font-serif text-2xl text-[var(--forest)]">Détail mensuel</h2>
          <ul className="mt-4 divide-y divide-[var(--line)] text-sm">
            {indicators.monthly.map((point) => (
              <li key={point.month} className="flex justify-between gap-4 py-3 first:pt-0">
                <span>{formatMonth(point.month)}</span>
                <span className="font-bold text-[var(--forest)]">{formatFcfa(point.inbound)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-5 rounded-3xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          {indicators.anomalies.length === 0 ? (
            <CheckCircle2 className="size-5 text-[var(--success)]" aria-hidden="true" />
          ) : (
            <AlertTriangle className="size-5 text-[var(--clay)]" aria-hidden="true" />
          )}
          <h2 className="font-serif text-2xl text-[var(--forest)]">Points inhabituels</h2>
        </div>
          {indicators.anomalies.length === 0 ? (
          <div className="mt-4 rounded-2xl bg-[var(--forest-soft)]/65 p-4">
            <p className="text-sm font-bold text-[var(--success)]">Aucune anomalie forte détectée</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Aucun mois ne dépasse le seuil statistique retenu de 1,5 écart-type.
            </p>
          </div>
          ) : (
          <ul className="mt-4 space-y-2 text-sm">
              {indicators.anomalies.map((anomaly) => (
              <li key={anomaly.month} className="rounded-2xl bg-[var(--clay-soft)] p-4">
                  {formatMonth(anomaly.month)} · {formatFcfa(anomaly.inbound)} ·{" "}
                  {anomaly.kind === "high" ? "haut" : "bas"}
                </li>
              ))}
            </ul>
          )}
      </section>

      <div className="mt-7 flex justify-end">
        <Link
          href="/passport"
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--forest)] px-5 py-3 text-sm font-bold text-white"
        >
          Générer le passeport
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </AppShell>
  );
}
