"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  RotateCcw,
  UploadCloud,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useDemo } from "@/components/DemoProvider";
import { ScreenHeader, StatusBadge } from "@/components/ScreenHeader";
import { MARIAM_CSV } from "@/lib/demo/mariam";
import { formatFcfa, sourceLabel } from "@/lib/format";

export default function ImportPage() {
  const { transactions, importCsv, resetDemo, isLoading } = useDemo();
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("mariam-transactions.csv");

  async function loadCsv(csv: string, name: string) {
    try {
      await importCsv(csv);
      setFileName(name);
      setError(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "CSV illisible");
    }
  }

  return (
    <AppShell>
      <ScreenHeader
        eyebrow="Étape 2 sur 6"
        title="Rassembler l’activité"
        description="Charge un export d’activité ou utilise le jeu de démonstration Mariam. Kora le normalise avant toute analyse."
        icon={UploadCloud}
        action={<StatusBadge tone="neutral">CSV uniquement</StatusBadge>}
      />

      <section className="mt-8 rounded-3xl border border-dashed border-[var(--gold)] bg-[var(--gold-soft)]/45 p-6 text-center sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--white)] text-[var(--forest)] shadow-sm">
          <FileSpreadsheet className="size-7" aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-serif text-2xl text-[var(--forest)]">Importer un fichier d&apos;activité</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--muted)]">
          Colonnes requises : date, montant, source et sens. Aucun fichier n&apos;est envoyé à un service externe.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <label className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--forest)] px-5 py-3 text-sm font-bold text-white">
            <UploadCloud className="size-4" aria-hidden="true" />
            Choisir un CSV
          <input
            type="file"
            accept=".csv,text/csv"
            className="hidden"
              aria-label="Choisir un fichier CSV d’activité"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) {
                return;
              }
              try {
                  const csv = await file.text();
                  if (csv.trim().split(/\r?\n/).length < 2) {
                    throw new Error("Le fichier ne contient aucune transaction.");
                  }
                  await loadCsv(csv, file.name);
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
            className="focus-ring rounded-full border border-[var(--line)] bg-[var(--white)] px-5 py-3 text-sm font-bold text-[var(--forest)]"
            onClick={() => void loadCsv(MARIAM_CSV, "mariam-transactions.csv")}
            disabled={isLoading}
          >
            {isLoading ? "Normalisation…" : "Utiliser le jeu Mariam"}
          </button>
        </div>
      </section>

      {error ? (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[var(--clay)]/20 bg-[var(--clay-soft)] p-4 text-sm text-[var(--clay)]" role="alert">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-bold">Import impossible</p>
            <p className="mt-1">{error} Vérifie le format puis réessaie.</p>
          </div>
        </div>
      ) : null}

      {transactions.length > 0 ? (
        <section className="mt-6 rounded-3xl border border-[var(--line)] bg-[var(--white)]">
          <div className="flex flex-col justify-between gap-4 border-b border-[var(--line)] p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-[var(--forest-soft)] text-[var(--success)]">
                <CheckCircle2 className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-bold text-[var(--forest)]">{fileName}</h2>
                <p className="text-xs text-[var(--muted)]">{transactions.length} transactions normalisées avec succès</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-[var(--muted)]"
                disabled={isLoading}
                onClick={() => {
                  void resetDemo();
                  setFileName("mariam-transactions.csv");
                  setError(null);
                }}
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                Réinitialiser
              </button>
              <Link
                href="/analysis"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--forest)] px-4 py-2 text-xs font-bold text-white"
              >
                Analyser
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <caption className="sr-only">Aperçu des huit premières transactions normalisées</caption>
              <thead className="bg-[var(--paper-deep)]/60 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
            <tr>
                  <th scope="col" className="px-5 py-3">Date</th>
                  <th scope="col" className="px-5 py-3">Source</th>
                  <th scope="col" className="px-5 py-3">Sens</th>
                  <th scope="col" className="px-5 py-3">Montant</th>
                  <th scope="col" className="px-5 py-3">Contrepartie</th>
            </tr>
          </thead>
          <tbody>
                {transactions.slice(0, 8).map((tx) => (
                  <tr key={tx.id} className="border-t border-[var(--line)] first:border-0">
                    <td className="whitespace-nowrap px-5 py-3">{tx.date}</td>
                    <td className="whitespace-nowrap px-5 py-3">{sourceLabel(tx.source)}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-bold ${tx.direction === "in" ? "bg-[var(--forest-soft)] text-[var(--success)]" : "bg-[var(--clay-soft)] text-[var(--clay)]"}`}>
                        {tx.direction === "in" ? "Entrée" : "Sortie"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 font-bold">{formatFcfa(tx.amount)}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-[var(--muted)]">{tx.counterparty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          {transactions.length > 8 ? (
            <p className="border-t border-[var(--line)] px-5 py-3 text-xs text-[var(--muted)]">
              Aperçu de 8 lignes sur {transactions.length}.
            </p>
          ) : null}
        </section>
      ) : (
        <div className="mt-6 rounded-3xl border border-[var(--line)] bg-[var(--white)] p-10 text-center">
          <FileSpreadsheet className="mx-auto size-8 text-[var(--muted)]" aria-hidden="true" />
          <p className="mt-3 font-bold">Aucune transaction à prévisualiser</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Charge un fichier valide pour commencer.</p>
        </div>
      )}

      <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
        Ce MVP ne dispose d&apos;aucun connecteur MTN, Moov ou bancaire. Il prouve la normalisation d&apos;un export CSV local.
      </p>
    </AppShell>
  );
}
