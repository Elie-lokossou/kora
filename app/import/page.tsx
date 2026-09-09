"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
import { MARIAM_CSV } from "@/lib/demo/mariam";
import { sourceLabel } from "@/lib/format";

export default function ImportPage() {
  const { transactions, importCsv, resetDemo } = useDemo();
  const [error, setError] = useState<string | null>(null);

  return (
    <AppShell>
      <h1 className="font-serif text-4xl text-[var(--forest)]">Import</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Charge un CSV d&apos;activité ou le jeu de démonstration Mariam. Aucun
        connecteur MTN, Moov ou banque n&apos;est branché dans ce MVP.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-full bg-[var(--forest)] px-4 py-2 text-sm text-white"
          onClick={() => {
            importCsv(MARIAM_CSV);
            setError(null);
          }}
        >
          Charger le CSV démo
        </button>
        <label className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm">
          Importer un fichier
          <input
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) {
                return;
              }
              try {
                importCsv(await file.text());
                setError(null);
              } catch (cause) {
                setError(
                  cause instanceof Error ? cause.message : "CSV illisible",
                );
              }
            }}
          />
        </label>
        <button
          type="button"
          className="rounded-full px-4 py-2 text-sm underline"
          onClick={() => {
            resetDemo();
            setError(null);
          }}
        >
          Réinitialiser
        </button>
      </div>

      {error ? <p className="mt-3 text-sm text-[var(--clay)]">{error}</p> : null}

      <p className="mt-6 text-sm text-[var(--muted)]">
        {transactions.length} transactions normalisées
      </p>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--sand)] text-xs uppercase tracking-wider text-[var(--muted)]">
            <tr>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2">Sens</th>
              <th className="px-3 py-2">Montant</th>
              <th className="px-3 py-2">Contrepartie</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t border-[var(--line)]">
                <td className="px-3 py-2">{tx.date}</td>
                <td className="px-3 py-2">{sourceLabel(tx.source)}</td>
                <td className="px-3 py-2">{tx.direction === "in" ? "Entrée" : "Sortie"}</td>
                <td className="px-3 py-2">{tx.amount.toLocaleString("fr-FR")}</td>
                <td className="px-3 py-2">{tx.counterparty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
