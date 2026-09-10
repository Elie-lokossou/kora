import Link from "next/link";
import { ArrowLeft, Map } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--forest-deep)] px-6 text-white">
      <section className="max-w-lg text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white/10 text-[var(--gold)]">
          <Map className="size-7" aria-hidden="true" />
        </span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">Erreur 404</p>
        <h1 className="mt-3 font-serif text-4xl">Cette page n&apos;existe pas</h1>
        <p className="mt-4 text-sm leading-6 text-white/65">
          Reviens au dossier de démonstration pour poursuivre le parcours de Mariam.
        </p>
        <Link
          href="/dashboard"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-bold text-[var(--forest-deep)]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Retour au tableau de bord
        </Link>
      </section>
    </main>
  );
}
