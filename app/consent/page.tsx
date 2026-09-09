"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
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
      <h1 className="font-serif text-4xl text-[var(--forest)]">
        Consentement
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        ABC Bank demande l&apos;accès. Mariam choisit les champs et la durée.
        Les transactions individuelles et les infos personnelles restent hors
        du partage par défaut.
      </p>

      <section className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-5">
        <h2 className="font-serif text-xl">Autorisation</h2>
        <ul className="mt-4 space-y-3">
          {CONSENT_SCOPES.map((scope) => (
            <li key={scope} className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={scopes.includes(scope)}
                  onChange={() => toggle(scope)}
                />
                {CONSENT_SCOPE_LABELS[scope]}
              </label>
              <span className="text-xs text-[var(--muted)]">
                {scopes.includes(scope) ? "Partagé" : "Refusé"}
              </span>
            </li>
          ))}
        </ul>

        <label className="mt-6 block text-sm">
          Durée (jours)
          <input
            type="number"
            min={1}
            max={90}
            value={durationDays}
            onChange={(event) => setDurationDays(Number(event.target.value))}
            className="ml-3 w-20 rounded border border-[var(--line)] px-2 py-1"
          />
        </label>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={authorize}
            className="rounded-full bg-[var(--forest)] px-4 py-2 text-sm text-white"
          >
            Autoriser ABC Bank
          </button>
          <button
            type="button"
            onClick={revoke}
            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm"
          >
            Révoquer
          </button>
          <Link href="/partner" className="rounded-full px-4 py-2 text-sm underline">
            Voir ce que la banque voit
          </Link>
        </div>

        <p className="mt-4 text-sm text-[var(--muted)]">
          Statut : {consent ? `${consent.status} · expire ${consent.expiresAt.slice(0, 10)}` : "aucun partage actif"}
        </p>
      </section>
    </AppShell>
  );
}
