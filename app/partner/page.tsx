"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
import { EvidencePanel } from "@/components/EvidencePanel";
import { MetricCard } from "@/components/MetricCard";
import { CONSENT_SCOPE_LABELS, type ConsentScope } from "@/lib/engine/types";
import { formatFcfa, formatPct } from "@/lib/format";

function Denied({ scope }: { scope: ConsentScope }) {
  return (
    <article className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--sand)]/50 p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
        {CONSENT_SCOPE_LABELS[scope]}
      </p>
      <p className="mt-2 text-sm text-[var(--muted)]">Non partagé</p>
    </article>
  );
}

export default function PartnerPage() {
  const { partnerView, setRole } = useDemo();

  if (!partnerView || partnerView.granted.length === 0) {
    return (
      <AppShell>
        <h1 className="font-serif text-4xl text-[var(--forest)]">
          Vue partenaire
        </h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">
          Aucun consentement actif. ABC Bank ne reçoit rien — pas même un
          passeport flouté.
        </p>
        <Link
          href="/consent"
          className="mt-6 inline-block rounded-full bg-[var(--forest)] px-4 py-2 text-sm text-white"
        >
          Revenir au consentement
        </Link>
      </AppShell>
    );
  }

  const view = partnerView.passport;

  return (
    <AppShell>
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
        Partenaire · {partnerView.partnerName}
      </p>
      <h1 className="mt-1 font-serif text-4xl text-[var(--forest)]">
        Dossier consenti
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Accès jusqu&apos;au {partnerView.expiresAt.slice(0, 10)}. Les champs
        refusés ne sont pas transmis. Le poids de la preuve l&apos;est
        toujours : un dossier ne peut pas paraître plus sûr que ses sources.
      </p>

      {partnerView.evidence ? (
        <div className="mt-6">
          <EvidencePanel
            evidence={partnerView.evidence}
            title="Toujours visible — hors consentement"
          />
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {view.monthlyAvgRevenue !== undefined ? (
          <MetricCard
            label="Revenu mensuel moyen"
            value={formatFcfa(view.monthlyAvgRevenue)}
          />
        ) : (
          <Denied scope="aggregated_revenue" />
        )}
        {view.growthRate !== undefined ? (
          <MetricCard label="Évolution" value={formatPct(view.growthRate)} />
        ) : (
          <Denied scope="activity_trend" />
        )}
        {view.regularityScore !== undefined ? (
          <MetricCard
            label="Régularité"
            value={`${Math.round(view.regularityScore * 100)} %`}
          />
        ) : (
          <Denied scope="regularity" />
        )}
        {view.supplierPaid !== undefined && view.supplierExpected !== undefined ? (
          <MetricCard
            label="Fournisseurs"
            value={`${view.supplierPaid}/${view.supplierExpected}`}
          />
        ) : (
          <Denied scope="supplier_reliability" />
        )}
      </div>

      {view.explanation ? (
        <section className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-5">
          <h2 className="font-serif text-xl">Résumé autorisé</h2>
          <p className="mt-3 text-sm leading-7">{view.explanation}</p>
        </section>
      ) : (
        <div className="mt-6">
          <Denied scope="ai_summary" />
        </div>
      )}

      {partnerView.denied.length > 0 ? (
        <section className="mt-6 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--sand)]/40 p-5">
          <h2 className="font-serif text-xl">Non transmis</h2>
          <ul className="mt-3 space-y-1 text-sm text-[var(--muted)]">
            {partnerView.denied.map((scope) => (
              <li key={scope}>✗ {CONSENT_SCOPE_LABELS[scope]}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-6 text-xs text-[var(--muted)]">
        ABC Bank construit sa propre décision. Kora n&apos;accorde aucun prêt.
      </p>
      <button
        type="button"
        onClick={() => setRole("entrepreneur")}
        className="mt-4 text-sm underline"
      >
        Revenir côté Mariam
      </button>
    </AppShell>
  );
}
