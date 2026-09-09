import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-full bg-[var(--forest)] text-[var(--sand)]">
      <div className="mx-auto flex min-h-full max-w-4xl flex-col justify-center px-6 py-16">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--gold)]">
          Kora Labs · Hackathon Cotonou
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-tight">
          Ton activité existe déjà.
          <br />
          Kora la rend visible.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--sand)]/80">
          Kora transforme des données d&apos;activité fragmentées en un
          Economic Passport : un profil structuré, portable, que
          l&apos;entrepreneur contrôle et partage sélectivement. Ce n&apos;est
          pas une banque. Ce n&apos;est pas un score. Ce n&apos;est pas une IA
          qui décide.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-medium text-[var(--ink)]"
          >
            Voir la démo Mariam
          </Link>
          <Link
            href="/partner"
            className="rounded-full border border-[var(--sand)]/30 px-5 py-3 text-sm"
          >
            Vue partenaire ABC Bank
          </Link>
        </div>
        <p className="mt-8 text-xs text-[var(--sand)]/60">
          Prototype de démonstration. Aucune intégration opérateur ou banque
          n&apos;est prétendue.
        </p>
      </div>
    </div>
  );
}
