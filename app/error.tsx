"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorPage({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--paper)] px-6">
      <section className="max-w-lg rounded-3xl border border-[var(--line)] bg-[var(--white)] p-8 text-center shadow-xl shadow-[var(--forest)]/5">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--clay-soft)] text-[var(--clay)]">
          <AlertTriangle className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-serif text-3xl text-[var(--forest)]">Le dossier ne peut pas s&apos;afficher</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Une erreur inattendue est survenue. Les données de démonstration n&apos;ont pas été modifiées.
        </p>
        <button
          type="button"
          onClick={() => retry()}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--forest)] px-5 py-3 text-sm font-bold text-white"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Réessayer
        </button>
      </section>
    </main>
  );
}
