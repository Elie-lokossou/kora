"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Ban,
  Building2,
  CalendarClock,
  Check,
  Database,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
import { ScreenHeader, StatusBadge } from "@/components/ScreenHeader";
import {
  CONSENT_SCOPE_LABELS,
  CONSENT_SCOPES,
  type ConsentScope,
} from "@/lib/engine/types";

export default function ConsentPage() {
  const {
    scopes,
    setScopes,
    durationDays,
    setDurationDays,
    authorize,
    revoke,
    consent,
    isLoading,
    error,
  } = useDemo();

  function toggle(scope: ConsentScope) {
    if (scopes.includes(scope)) {
      setScopes(scopes.filter((item) => item !== scope));
      return;
    }
    setScopes([...scopes, scope]);
  }

  return (
    <AppShell>
      <ScreenHeader
        eyebrow="Étape 5 sur 6"
        title="Partager, sans tout livrer"
        description="ABC Bank demande un accès au dossier. Mariam choisit précisément les informations visibles et la durée de l’autorisation."
        icon={LockKeyhole}
        action={
          <StatusBadge tone={consent?.status === "active" ? "success" : "neutral"}>
            {consent?.status === "active" ? "Partage actif" : "Non partagé"}
          </StatusBadge>
        }
      />

      {consent?.status === "active" ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[var(--success)]/20 bg-[var(--forest-soft)] p-4 text-sm" role="status" aria-live="polite">
          <BadgeCheck className="mt-0.5 size-5 shrink-0 text-[var(--success)]" aria-hidden="true" />
          <div>
            <p className="font-bold text-[var(--success)]">Autorisation enregistrée</p>
            <p className="mt-1 text-[var(--muted)]">ABC Bank peut consulter {consent.scopes.length} catégories jusqu&apos;au {new Date(consent.expiresAt).toLocaleDateString("fr-FR")}.</p>
          </div>
        </div>
      ) : null}
      {error ? (
        <div className="mt-4 rounded-2xl border border-[var(--clay)]/20 bg-[var(--clay-soft)] p-4 text-sm text-[var(--clay)]" role="alert">
          <p className="font-bold">Action impossible</p>
          <p className="mt-1">{error}</p>
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl text-[var(--forest)]">Informations autorisées</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">{scopes.length} catégorie{scopes.length > 1 ? "s" : ""} sélectionnée{scopes.length > 1 ? "s" : ""}</p>
            </div>
            <ShieldCheck className="size-6 text-[var(--success)]" aria-hidden="true" />
          </div>
          <ul className="mt-5 divide-y divide-[var(--line)]">
          {CONSENT_SCOPES.map((scope) => (
            <li key={scope}>
              <label className="flex cursor-pointer items-center justify-between gap-4 py-3.5">
                <span className="flex items-center gap-3">
                  <span className={`grid size-9 place-items-center rounded-xl ${scope === "individual_transactions" || scope === "personal_identity" ? "bg-[var(--clay-soft)] text-[var(--clay)]" : "bg-[var(--forest-soft)] text-[var(--forest)]"}`}>
                    {scope === "personal_identity" ? <UserRound className="size-4" aria-hidden="true" /> : <Database className="size-4" aria-hidden="true" />}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{CONSENT_SCOPE_LABELS[scope]}</span>
                    <span className="mt-0.5 block text-xs text-[var(--muted)]">
                      {scope === "individual_transactions" || scope === "personal_identity" ? "Sensible · refusé par défaut" : "Indicateur agrégé"}
                    </span>
                  </span>
                </span>
                <span className="relative">
                <input
                  type="checkbox"
                  checked={scopes.includes(scope)}
                  onChange={() => toggle(scope)}
                    className="peer sr-only"
                />
                  <span className="grid size-6 place-items-center rounded-lg border-2 border-[var(--line)] bg-white text-transparent peer-checked:border-[var(--forest)] peer-checked:bg-[var(--forest)] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--gold)]">
                    <Check className="size-4" aria-hidden="true" />
              </span>
                </span>
              </label>
            </li>
          ))}
        </ul>
        </section>

        <aside className="space-y-5">
          <section className="rounded-3xl border border-[var(--line)] bg-[var(--white)] p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-[var(--gold-soft)] text-[var(--forest)]">
                <Building2 className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs text-[var(--muted)]">Destinataire</p>
                <h2 className="font-bold text-[var(--forest)]">ABC Bank</h2>
              </div>
            </div>
            <div className="mt-5 border-t border-[var(--line)] pt-5">
              <label htmlFor="duration" className="flex items-center gap-2 text-sm font-bold">
                <CalendarClock className="size-4 text-[var(--forest)]" aria-hidden="true" />
                Durée de l&apos;accès
              </label>
              <select
                id="duration"
                value={durationDays}
                onChange={(event) => setDurationDays(Number(event.target.value))}
                className="mt-3 w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm"
              >
                <option value={7}>7 jours</option>
                <option value={15}>15 jours</option>
                <option value={30}>30 jours</option>
                <option value={60}>60 jours</option>
                <option value={90}>90 jours</option>
              </select>
            </div>
          </section>

          <section className="rounded-3xl bg-[var(--forest-deep)] p-5 text-white">
            <LockKeyhole className="size-5 text-[var(--gold)]" aria-hidden="true" />
            <h2 className="mt-3 font-serif text-xl">Contrôle total</h2>
            <ul className="mt-3 space-y-2 text-xs leading-5 text-white/65">
              <li>• Accès limité à ABC Bank</li>
              <li>• Expiration automatique</li>
              <li>• Révocation immédiate</li>
              <li>• Aucun détail non coché transmis</li>
            </ul>
          </section>
        </aside>
      </div>

      <section className="mt-5 flex flex-col justify-between gap-4 rounded-3xl border border-[var(--line)] bg-[var(--white)] p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-bold text-[var(--forest)]">
            {scopes.length > 0 ? `${scopes.length} catégories pendant ${durationDays} jours` : "Sélection requise"}
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">Tu peux révoquer cet accès à tout moment.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void authorize()}
            disabled={scopes.length === 0 || isLoading}
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--forest)] px-5 py-3 text-sm font-bold text-white"
          >
            {isLoading ? "Enregistrement…" : "Autoriser ABC Bank"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          {consent?.status === "active" ? (
            <>
              <button
                type="button"
                onClick={() => void revoke()}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--clay)]/30 px-4 py-3 text-sm font-bold text-[var(--clay)]"
              >
                <Ban className="size-4" aria-hidden="true" />
                Révoquer
              </button>
              <Link href="/partner" className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-[var(--forest)]">
                Vue banque
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </>
          ) : null}
        </div>
      </section>
    </AppShell>
  );
}
