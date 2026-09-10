import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  ChevronRight,
  Database,
  Eye,
  FileCheck2,
  Fingerprint,
  Globe2,
  Landmark,
  LockKeyhole,
  Menu,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  UploadCloud,
  WalletCards,
} from "lucide-react";

const STEPS = [
  {
    icon: UploadCloud,
    number: "01",
    label: "Rassembler",
    text: "Mariam importe ses ventes, encaissements et paiements fournisseurs depuis un CSV.",
  },
  {
    icon: BarChart3,
    number: "02",
    label: "Comprendre",
    text: "Le moteur normalise les lignes et calcule des indicateurs explicables.",
  },
  {
    icon: Fingerprint,
    number: "03",
    label: "Construire",
    text: "Kora produit un dossier économique portable, lisible et horodaté.",
  },
  {
    icon: LockKeyhole,
    number: "04",
    label: "Partager",
    text: "Elle choisit le destinataire, les catégories visibles et la durée.",
  },
] as const;

const BENEFITS = [
  {
    icon: Database,
    title: "Une activité enfin réunie",
    text: "Espèces, Mobile Money, banque et fournisseurs convergent dans un format unique.",
  },
  {
    icon: Sparkles,
    title: "Des chiffres qui se lisent",
    text: "Tendances, régularité et cash-flow sont expliqués sans décision opaque.",
  },
  {
    icon: ShieldCheck,
    title: "Un partage qui se maîtrise",
    text: "Les données refusées sont retirées côté serveur avant la vue partenaire.",
  },
] as const;

export default function Home() {
  return (
    <main className="overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
      <header className="absolute inset-x-0 top-0 z-30">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8" aria-label="Navigation principale">
          <Link href="/" className="flex items-center gap-2.5 text-white">
            <span className="grid size-9 place-items-center rounded-xl bg-[var(--gold)] text-[var(--forest-deep)]">
              <Fingerprint className="size-5" aria-hidden="true" />
            </span>
            <span className="font-serif text-xl font-bold tracking-tight">Kora</span>
          </Link>
          <div className="hidden items-center gap-7 text-sm text-white/70 md:flex">
            <a href="#fonctionnement" className="transition-colors hover:text-white">Fonctionnement</a>
            <a href="#benefices" className="transition-colors hover:text-white">Bénéfices</a>
            <a href="#confiance" className="transition-colors hover:text-white">Confiance</a>
          </div>
          <Link href="/dashboard" className="focus-ring hidden rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[var(--forest-deep)] sm:inline-flex">
            Ouvrir la démo
          </Link>
          <span className="text-white sm:hidden" aria-label="Navigation compacte">
            <Menu className="size-5" aria-hidden="true" />
          </span>
        </nav>
      </header>

      <section className="relative bg-[var(--forest-deep)] px-5 pb-20 pt-32 text-white sm:px-8 lg:pb-28 lg:pt-40">
        <div className="landing-grid absolute inset-0" aria-hidden="true" />
        <div className="absolute -right-40 top-12 size-[32rem] rounded-full bg-[var(--gold)]/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--mint)]">
              <span className="size-1.5 rounded-full bg-[var(--mint)]" />
              Passeport économique · Bénin
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-[4.6rem]">
              Votre activité a de la valeur.
              <span className="block text-[var(--gold)]">Donnez-lui une preuve.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
              Kora rassemble l&apos;activité fragmentée d&apos;un entrepreneur en un dossier lisible et portable — puis ne partage que ce qu&apos;il autorise.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-bold text-[var(--forest-deep)]">
                Explorer le dossier de Mariam
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a href="#fonctionnement" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-6 py-3.5 text-sm font-bold text-white/85">
                Voir comment ça marche
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/45">
              <span>Pas un score de crédit</span><span>•</span>
              <span>Pas une décision automatisée</span><span>•</span>
              <span>Prototype transparent</span>
            </div>
          </div>

          <div className="reveal relative [animation-delay:120ms]">
            <div className="absolute -inset-12 rounded-full bg-[var(--mint)]/8 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#f9f6ef] p-3 text-[var(--ink)] shadow-2xl shadow-black/30">
              <div className="rounded-[1.45rem] border border-[var(--line)] bg-[var(--white)] p-5 sm:p-7">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--clay)]">Economic Passport</p>
                    <h2 className="mt-2 text-2xl text-[var(--forest)] sm:text-3xl">Mariam Commerce</h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">Commerce de détail · Cotonou</p>
                  </div>
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--forest)] text-[var(--gold)]">
                    <Fingerprint className="size-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[var(--forest-soft)] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Revenu moyen</p>
                    <p className="mt-2 font-serif text-lg text-[var(--forest)] sm:text-xl">386 018 FCFA</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--gold-soft)] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Évolution</p>
                    <p className="mt-2 font-serif text-xl text-[var(--forest)]">+21 %</p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-[var(--line)] p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">Activité observée</span>
                    <span className="text-[var(--success)]">mars → août 2026</span>
                  </div>
                  <div className="mt-4 flex h-16 items-end gap-2" aria-hidden="true">
                    {[42, 49, 57, 65, 75, 88].map((height) => (
                      <span key={height} className="flex-1 rounded-t-md bg-[var(--forest)]/85" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2 border-t border-[var(--line)] pt-4 text-xs text-[var(--muted)]">
                  <LockKeyhole className="size-4 text-[var(--forest)]" aria-hidden="true" />
                  Partage sélectif · Limité dans le temps · Révocable
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-[var(--forest)] px-4 py-3 text-xs font-bold text-white shadow-xl sm:-left-8">
              <BadgeCheck className="size-4 text-[var(--gold)]" aria-hidden="true" />
              28 lignes normalisées
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Principes Kora" className="border-b border-[var(--line)] bg-[var(--white)]">
        <div className="mx-auto grid max-w-7xl divide-y divide-[var(--line)] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
          {[
            ["01", "Une identité produit", "Pas une identité légale"],
            ["02", "Une explication claire", "Jamais une décision de crédit"],
            ["03", "Un contrôle granulaire", "Jamais un dossier livré en bloc"],
          ].map(([number, title, text]) => (
            <div key={number} className="flex gap-4 py-6 sm:px-6 sm:first:pl-0">
              <span className="font-serif text-sm text-[var(--clay)]">{number}</span>
              <div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs text-[var(--muted)]">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="fonctionnement" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--clay)]">Le parcours Kora</p>
              <h2 className="mt-4 max-w-3xl text-4xl leading-tight text-[var(--forest)] sm:text-5xl">De données dispersées à un dossier qui voyage.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[var(--muted)]">Quatre étapes suffisent pour transformer une activité existante en preuve économique contrôlée.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {STEPS.map(({ icon: Icon, number, label, text }) => (
              <article key={label} className="landing-card group rounded-3xl p-6 transition-transform hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[var(--forest-soft)] text-[var(--forest)]"><Icon className="size-5" aria-hidden="true" /></span>
                  <span className="font-serif text-xs text-[var(--muted)]">{number}</span>
                </div>
                <h3 className="mt-8 text-xl text-[var(--forest)]">{label}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="benefices" className="bg-[var(--paper-deep)]/55 px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--clay)]">Pourquoi Kora</p>
              <h2 className="mt-4 text-4xl leading-tight text-[var(--forest)] sm:text-5xl">L&apos;activité est là. La preuve manquait.</h2>
              <p className="mt-5 text-base leading-7 text-[var(--muted)]">Un commerçant peut vendre chaque jour et rester illisible pour une institution parce que son activité vit dans plusieurs systèmes.</p>
              <Link href="/import" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--forest)]">
                Tester l&apos;import de démonstration <ChevronRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-4">
              {BENEFITS.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className={`rounded-3xl border border-[var(--line)] p-6 sm:p-7 ${index === 1 ? "bg-[var(--forest)] text-white" : "bg-[var(--white)]"}`}>
                  <div className="flex gap-5">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${index === 1 ? "bg-white/10 text-[var(--gold)]" : "bg-[var(--gold-soft)] text-[var(--forest)]"}`}>
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl">{title}</h3>
                      <p className={`mt-2 text-sm leading-6 ${index === 1 ? "text-white/65" : "text-[var(--muted)]"}`}>{text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--clay)]">Dans le produit</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-tight text-[var(--forest)] sm:text-5xl">Deux vues. Une seule source de vérité.</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-[var(--muted)]">Mariam voit son dossier complet. ABC Bank reçoit une projection construite uniquement avec les catégories autorisées.</p>
          </div>
          <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--white)] shadow-xl shadow-[var(--forest)]/5 lg:grid-cols-2">
            <div className="p-6 sm:p-9">
              <div className="flex items-center gap-3"><Store className="size-5 text-[var(--clay)]" /><p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Vue Mariam</p></div>
              <h3 className="mt-6 text-2xl text-[var(--forest)]">Son passeport complet</h3>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[["Revenu moyen", "386 018 FCFA"], ["Régularité", "94 %"], ["Croissance", "+21 %"], ["Fournisseurs", "4 / 4"]].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-[var(--paper)] p-4"><p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">{label}</p><p className="mt-2 font-serif text-base text-[var(--forest)]">{value}</p></div>
                ))}
              </div>
            </div>
            <div className="bg-[var(--forest-deep)] p-6 text-white sm:p-9">
              <div className="flex items-center gap-3"><Landmark className="size-5 text-[var(--gold)]" /><p className="text-xs font-bold uppercase tracking-wider text-white/45">Vue ABC Bank</p></div>
              <h3 className="mt-6 text-2xl">Seulement ce qui est consenti</h3>
              <ul className="mt-6 space-y-3 text-sm">
                {["Revenu agrégé", "Évolution de l’activité", "Résumé du cash-flow"].map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-xl bg-white/7 px-4 py-3"><Check className="size-4 text-[var(--mint)]" />{item}</li>
                ))}
                {["Transactions individuelles", "Informations personnelles"].map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-xl border border-dashed border-white/12 px-4 py-3 text-white/40"><LockKeyhole className="size-4" />{item} · non transmis</li>
                ))}
              </ul>
              <Link href="/consent" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--gold)]">Configurer ce partage <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section id="confiance" className="bg-[var(--forest-deep)] px-5 py-24 text-white sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">Confiance par conception</p>
              <h2 className="mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">La donnée refusée n&apos;est pas simplement cachée. Elle n&apos;est pas envoyée.</h2>
              <p className="mt-5 max-w-2xl leading-7 text-white/60">Le consentement nomme ABC Bank, précise les catégories, fixe une expiration et peut être révoqué immédiatement. Chaque consultation autorisée est journalisée.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [LockKeyhole, "Consentement explicite", "Catégories + destinataire + durée"],
                [Eye, "Minimisation serveur", "Projection filtrée avant réponse"],
                [FileCheck2, "Journal d’accès", "Chaque lecture autorisée laisse une trace"],
                [Globe2, "Démonstration honnête", "Aucun connecteur bancaire prétendu"],
              ].map(([Icon, title, text]) => {
                const ItemIcon = Icon as typeof ShieldCheck;
                return (
                  <article key={String(title)} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <ItemIcon className="size-5 text-[var(--gold)]" aria-hidden="true" />
                    <h3 className="mt-5 text-base">{String(title)}</h3>
                    <p className="mt-2 text-xs leading-5 text-white/50">{String(text)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[var(--gold-soft)] px-6 py-14 text-center sm:px-12 sm:py-20">
          <WalletCards className="mx-auto size-7 text-[var(--forest)]" aria-hidden="true" />
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl leading-tight text-[var(--forest)] sm:text-5xl">Chaque entrepreneur crée de la valeur. Kora la rend visible.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[var(--muted)]">Parcourez le cas Mariam de l&apos;import CSV jusqu&apos;à la projection consentie pour ABC Bank.</p>
          <Link href="/dashboard" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--forest)] px-6 py-3.5 text-sm font-bold text-white">
            Lancer le parcours complet <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-[var(--white)] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5"><span className="grid size-8 place-items-center rounded-xl bg-[var(--forest)] text-[var(--gold)]"><Fingerprint className="size-4" /></span><span className="font-serif font-bold text-[var(--forest)]">Kora</span></div>
          <p className="text-xs text-[var(--muted)]">Prototype de démonstration · Kora Labs · Cotonou, Bénin</p>
          <div className="flex gap-5 text-xs font-bold text-[var(--forest)]"><a href="#fonctionnement">Produit</a><Link href="/dashboard">Démo</Link></div>
        </div>
      </footer>
    </main>
  );
}
