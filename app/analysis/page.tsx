"use client";

import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
import { EvidencePanel } from "@/components/EvidencePanel";
import { formatFcfa, formatMonth } from "@/lib/format";

export default function AnalysisPage() {
  const { passport } = useDemo();
  const { indicators } = passport;

  return (
    <AppShell>
      <h1 className="font-serif text-4xl text-[var(--forest)]">
        Analyse économique
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        L&apos;IA de Kora explique les données importées. Elle ne les
        certifie pas, et elle ne décide pas d&apos;un crédit.
      </p>

      <section className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-5">
        <h2 className="font-serif text-xl">Lecture</h2>
        <p className="mt-3 leading-7 text-[var(--ink)]">{passport.explanation}</p>
        <p className="mt-4 text-xs text-[var(--muted)]">{passport.disclaimer}</p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <h2 className="font-serif text-xl">Tendances</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {indicators.monthly.map((point) => (
              <li key={point.month} className="flex justify-between">
                <span>{formatMonth(point.month)}</span>
                <span>{formatFcfa(point.inbound)}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <h2 className="font-serif text-xl">Anomalies</h2>
          {indicators.anomalies.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--muted)]">
              Aucun mois ne sort du seuil (1,5 écart-type).
            </p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {indicators.anomalies.map((anomaly) => (
                <li key={anomaly.month}>
                  {formatMonth(anomaly.month)} · {formatFcfa(anomaly.inbound)} ·{" "}
                  {anomaly.kind === "high" ? "haut" : "bas"}
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>

      <div className="mt-6">
        <EvidencePanel evidence={passport.evidence} />
      </div>
    </AppShell>
  );
}
