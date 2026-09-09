"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
import { SharePreview } from "@/components/SharePreview";
import { DEMO_PARTNERS } from "@/lib/demo/partners";
import { explainBlindSpots } from "@/lib/engine/blindspots";
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
    partnerId,
    setPartnerId,
    partnerName,
    partnerAsk,
    previewView,
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
        Ce qu&apos;ils verront
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        {partnerAsk} Décoche à gauche : la colonne de droite change tout de suite.
        C&apos;est ça le produit — pas le graphique.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {DEMO_PARTNERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPartnerId(item.id)}
            className={`rounded-full px-3 py-1 text-sm ${
              partnerId === item.id
                ? "bg-[var(--forest)] text-white"
                : "border border-[var(--line)] bg-white"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <h2 className="font-serif text-xl">Mariam décide</h2>
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
              Ouvrir à {partnerName}
            </button>
            <button
              type="button"
              onClick={revoke}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm"
            >
              Révoquer
            </button>
          </div>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Statut :{" "}
            {consent
              ? `${consent.status} · expire ${consent.expiresAt.slice(0, 10)}`
              : "aucun partage actif"}
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--forest)] bg-[var(--sand)]/40 p-5">
          <h2 className="font-serif text-xl">{partnerName} voit</h2>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
            Aperçu en direct
          </p>
          <div className="mt-4">
            <SharePreview view={previewView} />
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--ink)]">
            {explainBlindSpots(previewView.denied)}
          </p>
          <Link
            href="/partner"
            className="mt-4 inline-block text-sm underline"
          >
            Ouvrir la vue partenaire (un reçu sera créé)
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
