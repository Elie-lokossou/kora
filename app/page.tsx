import Link from "next/link";
import {
  ArrowRight,
  Database,
  Eye,
  Fingerprint,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

const STEPS = [
  { icon: Database, label: "Rassembler", text: "Import CSV de démonstration" },
  { icon: Sparkles, label: "Comprendre", text: "Indicateurs expliqués clairement" },
  { icon: Fingerprint, label: "Construire", text: "Passeport économique portable" },
  { icon: LockKeyhole, label: "Partager", text: "Consentement précis et limité" },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--forest-deep)] text-[var(--sand)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5" aria-label="Accueil">
        <span className="flex items-center gap-2 font-serif text-2xl">
          <span className="grid size-9 place-items-center rounded-xl bg-[var(--gold)] text-[var(--forest-deep)]">
            <Fingerprint className="size-5" aria-hidden="true" />
          </span>
          Kora
        </span>
        <span className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70">
          Prototype de démonstration
        </span>
      </nav>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pb-24 lg:pt-20">
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--gold)]">
            Identité économique · Cotonou
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.03] sm:text-6xl lg:text-7xl">
            Ton activité existe déjà.
            <span className="block text-[var(--gold)]">Rends-la visible.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
            Kora transforme une activité fragmentée en un passeport économique
            structuré et portable. Mariam le contrôle, puis partage uniquement
            ce qu&apos;elle choisit.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-bold text-[var(--forest-deep)]"
          >
              Découvrir le dossier de Mariam
              <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/partner"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white/85"
          >
              <Eye className="size-4" aria-hidden="true" />
            Vue partenaire ABC Bank
          </Link>
        </div>
          <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/50">
            <span>Pas un score de crédit</span>
            <span aria-hidden="true">•</span>
            <span>Pas une décision automatisée</span>
            <span aria-hidden="true">•</span>
            <span>Données de démonstration</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-20 rounded-full bg-[var(--gold)]/10 blur-3xl" aria-hidden="true" />
          <div className="relative rotate-1 rounded-[2rem] border border-white/15 bg-[var(--paper)] p-3 text-[var(--ink)] shadow-2xl shadow-black/25">
            <div className="rounded-[1.5rem] border border-[var(--line)] p-6 sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--clay)]">
                    Economic Passport
                  </p>
                  <h2 className="mt-2 font-serif text-3xl text-[var(--forest)]">Mariam Commerce</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">Commerce de détail · Cotonou</p>
                </div>
                <div className="grid size-12 place-items-center rounded-2xl bg-[var(--forest)] text-[var(--gold)]">
                  <Fingerprint className="size-6" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[var(--forest-soft)] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Revenu moyen</p>
                  <p className="mt-2 font-serif text-xl text-[var(--forest)]">386 018 FCFA</p>
                </div>
                <div className="rounded-2xl bg-[var(--gold-soft)] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Évolution</p>
                  <p className="mt-2 font-serif text-xl text-[var(--forest)]">+21 %</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-[var(--line)] pt-5 text-xs text-[var(--muted)]">
                <LockKeyhole className="size-4 text-[var(--forest)]" aria-hidden="true" />
                Partage sélectif · Durée limitée · Révocable
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="border-t border-white/10 bg-white/[0.035]">
        <div className="mx-auto grid max-w-7xl gap-px px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, label, text }, index) => (
            <article key={label} className="flex gap-4 p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/8 text-[var(--gold)]">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/45">
                  0{index + 1} · {label}
                </p>
                <p className="mt-1 text-sm text-white/80">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
