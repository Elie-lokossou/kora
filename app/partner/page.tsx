"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CircleDollarSign,
  Clock3,
  Eye,
  EyeOff,
  FileLock2,
  RefreshCcw,
  ShieldCheck,
  TrendingUp,
  Truck,
  WalletCards,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
import { MetricCard } from "@/components/MetricCard";
import { ScreenHeader, StatusBadge } from "@/components/ScreenHeader";
import { CONSENT_SCOPE_LABELS, type ConsentScope } from "@/lib/engine/types";
import { formatFcfa, formatPct } from "@/lib/format";

function Denied({ scope }: { scope: ConsentScope }) {
  return (
    <article className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--paper-deep)]/45 p-5">
      <EyeOff className="size-4 text-[var(--muted)]" aria-hidden="true" />
      <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
        {CONSENT_SCOPE_LABELS[scope]}
      </p>
      <p className="mt-1 text-sm font-bold text-[var(--muted)]">Non partagé par Mariam</p>
    </article>
  );
}

export default function PartnerPage() {
  const { partnerView, setRole } = useDemo();

  if (!partnerView || partnerView.granted.length === 0) {
    return (
      <AppShell>
        <ScreenHeader
          eyebrow="Étape 6 sur 6"
          title="Vue partenaire"
          description="Cet espace représente exactement ce qu’ABC Bank reçoit après consentement — jamais le passeport brut."
          icon={Building2}
          action={<StatusBadge tone="neutral">Aucun accès</StatusBadge>}
        />
        <section className="mt-8 rounded-3xl border border-dashed border-[var(--line)] bg-[var(--white)] p-8 text-center sm:p-12">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--paper-deep)] text-[var(--muted)]">
            <FileLock2 className="size-7" aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-serif text-2xl text-[var(--forest)]">Aucun dossier accessible</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--muted)]">
            Aucun consentement actif. ABC Bank ne reçoit rien — pas même un passeport flouté ou des données cachées côté interface.
          </p>
          <Link
            href="/consent"
            className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--forest)] px-5 py-3 text-sm font-bold text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Configurer le consentement
          </Link>
        </section>
      </AppShell>
    );
  }

  const view = partnerView.passport;

  return (
    <AppShell>
      <ScreenHeader
        eyebrow={`Partenaire · ${partnerView.partnerName}`}
        title="Dossier consenti"
        description="Vue minimisée du profil économique de Mariam Commerce. Seules les catégories explicitement autorisées sont présentes."
        icon={Eye}
        action={<StatusBadge tone="success">Accès autorisé</StatusBadge>}
      />

      <section className="mt-8 flex flex-col justify-between gap-5 rounded-3xl bg-[var(--forest-deep)] p-6 text-white sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-[var(--gold)]">
            <Building2 className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold)]">Economic Passport partagé</p>
            <h2 className="mt-1 font-serif text-2xl">{view.businessName ?? "Activité à Cotonou"}</h2>
            <p className="mt-1 text-xs text-white/55">{view.sector} · {view.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-white/8 px-4 py-3 text-xs text-white/65">
          <Clock3 className="size-4 text-[var(--gold)]" aria-hidden="true" />
          Expire le {new Date(partnerView.expiresAt).toLocaleDateString("fr-FR")}
        </div>
      </section>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {view.monthlyAvgRevenue !== undefined ? (
          <MetricCard
            label="Revenu mensuel moyen"
            value={formatFcfa(view.monthlyAvgRevenue)}
            hint="Donnée agrégée autorisée"
            icon={CircleDollarSign}
            accent
          />
        ) : (
          <Denied scope="aggregated_revenue" />
        )}
        {view.growthRate !== undefined ? (
          <MetricCard label="Évolution" value={formatPct(view.growthRate)} hint="Sur la période observée" icon={TrendingUp} />
        ) : (
          <Denied scope="activity_trend" />
        )}
        {view.regularityScore !== undefined ? (
          <MetricCard
            label="Régularité"
            value={`${Math.round(view.regularityScore * 100)} %`}
            hint="Stabilité mensuelle"
            icon={RefreshCcw}
          />
        ) : (
          <Denied scope="regularity" />
        )}
        {view.supplierPaid !== undefined && view.supplierExpected !== undefined ? (
          <MetricCard
            label="Fournisseurs"
            value={`${view.supplierPaid}/${view.supplierExpected}`}
            hint="Paiements observés"
            icon={Truck}
          />
        ) : (
          <Denied scope="supplier_reliability" />
        )}
        {view.netCashflow !== undefined ? (
          <MetricCard label="Cash-flow net" value={formatFcfa(view.netCashflow)} hint="Résumé cumulé autorisé" icon={WalletCards} />
        ) : (
          <Denied scope="cashflow_summary" />
        )}
      </div>

      {view.explanation ? (
        <section className="mt-5 rounded-3xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-[var(--success)]" aria-hidden="true" />
            <h2 className="font-serif text-2xl text-[var(--forest)]">Résumé autorisé</h2>
          </div>
          <p className="mt-4 text-sm leading-7">{view.explanation}</p>
        </section>
      ) : (
        <div className="mt-5">
          <Denied scope="ai_summary" />
        </div>
      )}

      {partnerView.denied.length > 0 ? (
        <section className="mt-5 rounded-3xl border border-dashed border-[var(--line)] bg-[var(--paper-deep)]/45 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <FileLock2 className="size-5 text-[var(--muted)]" aria-hidden="true" />
            <div>
              <h2 className="font-serif text-2xl text-[var(--forest)]">Hors du partage</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">Ces données ne figurent pas dans le dossier transmis.</p>
            </div>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[var(--muted)]">
            {partnerView.denied.map((scope) => (
              <li key={scope} className="rounded-full border border-[var(--line)] bg-[var(--white)] px-3 py-2">
                {CONSENT_SCOPE_LABELS[scope]} · non partagé
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <footer className="mt-6 flex flex-col justify-between gap-4 border-t border-[var(--line)] pt-5 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-xs leading-5 text-[var(--muted)]">
          ABC Bank construit sa propre décision. Kora explique l&apos;activité et n&apos;accorde aucun prêt.
        </p>
        <button
          type="button"
          onClick={() => setRole("entrepreneur")}
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--forest)]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Revenir côté Mariam
        </button>
      </footer>
    </AppShell>
  );
}
