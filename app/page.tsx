import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-full bg-[var(--forest)] text-[var(--sand)]">
      <div className="mx-auto flex min-h-full max-w-4xl flex-col justify-center px-6 py-16">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--gold)]">
          Kora Labs · Hackathon Cotonou
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-tight">
          Elle ne donne plus le cahier.
          <br />
          Elle ouvre un dossier qui expire.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--sand)]/80">
          Un fournisseur ou une banque veut comprendre l&apos;activité de
          Mariam. Kora lui envoie seulement ce qu&apos;elle déverrouille, pour
          30 jours. Elle voit qui a ouvert. Personne n&apos;emporte les
          tickets de vente. Et le dossier ne peut pas se faire passer pour une
          attestation.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/consent"
            className="rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-medium text-[var(--ink)]"
          >
            Voir le moment qui gagne
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-[var(--sand)]/30 px-5 py-3 text-sm"
          >
            Tableau de Mariam
          </Link>
        </div>
        <p className="mt-8 text-xs text-[var(--sand)]/60">
          Prototype de démonstration. Aucune intégration opérateur n&apos;est
          prétendue.
        </p>
      </div>
    </div>
  );
}
