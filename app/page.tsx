import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  ChevronRight,
  Database,
  EyeOff,
  FileCheck2,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UploadCloud,
  WalletCards,
} from "lucide-react";
import { KoraLogo, KoraMark } from "@/components/KoraLogo";
import { LandingNav } from "@/components/LandingNav";

const MONTHS = [
  ["Mars", 42],
  ["Avr.", 50],
  ["Mai", 56],
  ["Juin", 68],
  ["Juil.", 78],
  ["Août", 92],
] as const;

const JOURNEY = [
  {
    icon: UploadCloud,
    step: "01",
    title: "Rassembler l’activité",
    text: "Ventes, Mobile Money, banque et paiements fournisseurs entrent dans un format commun.",
    href: "/import",
    link: "Tester l’import",
  },
  {
    icon: BarChart3,
    step: "02",
    title: "Lire les signaux",
    text: "Kora calcule les tendances, la régularité et le cash-flow avec des règles explicables.",
    href: "/analysis",
    link: "Voir l’analyse",
  },
  {
    icon: FileCheck2,
    step: "03",
    title: "Créer le passeport",
    text: "L’activité devient un dossier horodaté, portable et compréhensible par un partenaire.",
    href: "/passport",
    link: "Ouvrir le passeport",
  },
  {
    icon: LockKeyhole,
    step: "04",
    title: "Partager avec contrôle",
    text: "Mariam choisit les catégories, le destinataire et la durée. Elle peut révoquer l’accès.",
    href: "/consent",
    link: "Configurer un partage",
  },
] as const;

const FOOTER_LINKS = [
  ["Produit", [["Vue d’ensemble", "/dashboard"], ["Import", "/import"], ["Passeport", "/passport"]]],
  ["Parcours", [["Analyse", "/analysis"], ["Consentement", "/consent"], ["Vue partenaire", "/partner"]]],
  ["Principes", [["Fonctionnement", "#fonctionnement"], ["Confiance", "#confiance"], ["Retour en haut", "#top"]]],
] as const;

export default function Home() {
  return (
    <main id="top" className="overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
      <LandingNav />

      <section className="relative min-h-[850px] bg-[var(--forest-deep)] px-5 pb-24 pt-36 text-white sm:px-8 lg:flex lg:min-h-screen lg:items-center lg:pb-28 lg:pt-32">
        <div className="landing-grid absolute inset-0" aria-hidden="true" />
        <div className="absolute left-[8%] top-32 size-72 rounded-full bg-[var(--gold)]/8 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-[86rem] gap-16 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
          <div className="reveal max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--mint)]">
              <span className="size-1.5 rounded-full bg-[var(--mint)]" />
              Passeport économique · conçu au Bénin
            </div>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-[4.75rem]">
              Faites de votre activité
              <span className="block text-[var(--gold)]">une preuve qui vous appartient.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
              Kora réunit les traces économiques dispersées des entrepreneurs,
              les rend lisibles et crée un dossier partageable — uniquement avec
              leur consentement.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-bold text-[var(--forest-deep)]"
              >
                Explorer le dossier de Mariam
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href="#produit"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-6 py-3.5 text-sm font-bold text-white/85"
              >
                Découvrir Kora
                <ChevronRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                ["28", "transactions démo"],
                ["6 mois", "d’activité réunie"],
                ["100 %", "révocable"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-serif text-xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-[10px] leading-4 text-white/42">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal relative [animation-delay:120ms]">
            <div className="absolute -inset-16 rounded-full bg-[var(--mint)]/8 blur-3xl" aria-hidden="true" />
            <div className="relative rounded-[2rem] border border-white/14 bg-[#f7f3eb] p-2.5 shadow-[0_35px_100px_rgba(0,0,0,.32)] sm:p-4">
              <div className="overflow-hidden rounded-[1.45rem] border border-[var(--line)] bg-[var(--white)]">
                <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3 sm:px-5">
                  <KoraLogo className="scale-90 origin-left" />
                  <div className="flex items-center gap-2">
                    <span className="hidden rounded-full bg-[var(--forest-soft)] px-3 py-1.5 text-[10px] font-bold text-[var(--success)] sm:block">
                      Dossier à jour
                    </span>
                    <span className="grid size-8 place-items-center rounded-full bg-[var(--forest)] text-[10px] font-bold text-white">MD</span>
                  </div>
                </div>
                <div className="grid min-h-[480px] grid-cols-[62px_1fr] sm:grid-cols-[150px_1fr]">
                  <div className="border-r border-[var(--line)] bg-[#f3efe7] p-3">
                    <div className="space-y-2">
                      {[BarChart3, UploadCloud, FileCheck2, LockKeyhole].map((Icon, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-2 rounded-xl px-2 py-2.5 text-[10px] font-bold ${index === 0 ? "bg-[var(--forest)] text-white" : "text-[var(--muted)]"}`}
                        >
                          <Icon className="size-4 shrink-0" aria-hidden="true" />
                          <span className="hidden sm:block">{["Vue d’ensemble", "Importer", "Passeport", "Consentement"][index]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="min-w-0 p-4 sm:p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[var(--clay)]">Bonjour Mariam</p>
                    <div className="mt-1 flex items-end justify-between gap-3">
                      <div>
                        <h2 className="text-xl text-[var(--forest)] sm:text-2xl">Ton activité en un regard</h2>
                        <p className="mt-1 text-[10px] text-[var(--muted)]">Mars — août 2026</p>
                      </div>
                      <BadgeCheck className="size-5 text-[var(--success)]" aria-hidden="true" />
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-2.5">
                      <div className="rounded-2xl bg-[var(--forest)] p-3.5 text-white">
                        <p className="text-[9px] uppercase tracking-wider text-white/58">Revenu moyen</p>
                        <p className="mt-2 font-serif text-base sm:text-lg">386 018 F</p>
                        <p className="mt-2 text-[9px] text-[var(--mint)]">↗ +21 % sur la période</p>
                      </div>
                      <div className="rounded-2xl border border-[var(--line)] p-3.5">
                        <p className="text-[9px] uppercase tracking-wider text-[var(--muted)]">Régularité</p>
                        <p className="mt-2 font-serif text-lg text-[var(--forest)]">94 %</p>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--forest-soft)]">
                          <div className="h-full w-[94%] rounded-full bg-[var(--success)]" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 rounded-2xl border border-[var(--line)] p-3.5">
                      <div className="flex justify-between">
                        <p className="text-xs font-bold text-[var(--forest)]">Revenus mensuels</p>
                        <span className="text-[9px] text-[var(--muted)]">Démonstration</span>
                      </div>
                      <div className="mt-4 flex h-24 items-end gap-2" aria-label="Tendance croissante de mars à août">
                        {MONTHS.map(([month, height]) => (
                          <div key={month} className="flex h-full flex-1 flex-col justify-end gap-1.5 text-center">
                            <span className="w-full rounded-t-md bg-[var(--forest)]/90" style={{ height: `${height}%` }} />
                            <span className="text-[8px] text-[var(--muted)]">{month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-[var(--gold-soft)] px-3 py-2.5 text-[10px] font-bold text-[var(--forest)]">
                      <Sparkles className="size-3.5" aria-hidden="true" />
                      L’activité progresse de façon régulière.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-2 rounded-2xl border border-white/10 bg-[var(--forest)] px-4 py-3 text-xs font-bold text-white shadow-xl sm:-left-6">
              <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-[var(--gold)]" /> Données sous contrôle</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Engagements Kora" className="border-b border-[var(--line)] bg-[var(--white)]">
        <div className="mx-auto grid max-w-[86rem] divide-y divide-[var(--line)] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
          {[
            ["Activité vérifiable", "Une lecture structurée des traces disponibles"],
            ["Moteur explicable", "Des indicateurs, jamais une décision opaque"],
            ["Partage minimisé", "Seules les catégories autorisées sont envoyées"],
          ].map(([title, text], index) => (
            <div key={title} className="flex gap-4 py-6 sm:px-6 sm:first:pl-0">
              <span className="font-serif text-sm text-[var(--clay)]">0{index + 1}</span>
              <div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs leading-5 text-[var(--muted)]">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="produit" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-[86rem]">
          <div className="grid gap-6 lg:grid-cols-[1fr_.65fr] lg:items-end">
            <div>
              <p className="section-kicker">Le problème que Kora résout</p>
              <h2 className="mt-4 max-w-4xl text-4xl leading-tight text-[var(--forest)] sm:text-5xl lg:text-6xl">
                L’activité existe déjà.<br />Sa représentation manque encore.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[var(--muted)]">
              Pour une institution, des ventes réparties entre espèces, Mobile
              Money et cahiers restent difficiles à lire. Kora crée la couche
              commune sans prétendre remplacer les sources.
            </p>
          </div>
          <div className="mt-14 grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
            <article className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--white)] p-6 sm:p-9">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="section-kicker">Avant Kora</p>
                  <h3 className="mt-3 text-2xl text-[var(--forest)] sm:text-3xl">Une activité, quatre traces isolées</h3>
                </div>
                <Database className="size-7 text-[var(--clay)]" aria-hidden="true" />
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Espèces", "Cahier"],
                  ["Mobile Money", "Export"],
                  ["Banque", "Relevé"],
                  ["Fournisseurs", "Reçus"],
                ].map(([name, type]) => (
                  <div key={name} className="rounded-2xl bg-[var(--paper)] p-4">
                    <div className="mb-6 size-2 rounded-full bg-[var(--clay)]" />
                    <p className="text-sm font-bold">{name}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{type}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-dashed border-[var(--clay)]/30 bg-[var(--clay-soft)]/50 p-4 text-sm text-[var(--clay)]">
                <EyeOff className="size-5 shrink-0" aria-hidden="true" />
                Beaucoup de valeur créée, peu de preuves immédiatement lisibles.
              </div>
            </article>
            <article className="relative overflow-hidden rounded-[2rem] bg-[var(--forest)] p-7 text-white sm:p-9">
              <KoraMark className="absolute -bottom-12 -right-12 size-56 text-white/[.035]" />
              <p className="section-kicker !text-[var(--gold)]">Avec Kora</p>
              <h3 className="mt-3 max-w-sm text-3xl">Une identité économique portable</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/62">
                Un même dossier relie les sources, la période, les indicateurs et
                les conditions de partage.
              </p>
              <ul className="relative mt-9 space-y-3 text-sm">
                {["Structurée", "Horodatée", "Compréhensible", "Révocable"].map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-white/10 pb-3 last:border-0">
                    <span className="grid size-6 place-items-center rounded-full bg-[var(--gold)] text-[var(--forest)]"><Check className="size-3.5" /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="fonctionnement" className="scroll-mt-20 bg-[var(--paper-deep)]/55 px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-[86rem]">
          <div className="text-center">
            <p className="section-kicker">Un parcours complet</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-tight text-[var(--forest)] sm:text-5xl">
              Des données brutes à un dossier utile, en quatre temps.
            </h2>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {JOURNEY.map(({ icon: Icon, step, title, text, href, link }) => (
              <article key={title} className="landing-card group flex min-h-[320px] flex-col rounded-[1.75rem] p-6 transition-transform hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-[var(--forest-soft)] text-[var(--forest)]"><Icon className="size-5" /></span>
                  <span className="font-serif text-xs text-[var(--clay)]">{step}</span>
                </div>
                <h3 className="mt-8 text-2xl text-[var(--forest)]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
                <Link href={href} className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[var(--forest)]">
                  {link}<ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-[86rem] gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="section-kicker">Une lecture exploitable</p>
            <h2 className="mt-4 text-4xl leading-tight text-[var(--forest)] sm:text-5xl">Des chiffres reliés à leur contexte.</h2>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">
              Le moteur calcule. L’explication donne du sens. L’entrepreneur et
              le partenaire voient d’où viennent les conclusions.
            </p>
            <div className="mt-8 space-y-5">
              {[
                [TrendingUp, "Tendances visibles", "L’évolution mensuelle reste reliée aux montants observés."],
                [Sparkles, "Explication claire", "Kora formule les signaux sans score secret ni recommandation de crédit."],
                [WalletCards, "Périmètre explicite", "Période, sources et limites accompagnent chaque passeport."],
              ].map(([Icon, title, text]) => {
                const ItemIcon = Icon as typeof TrendingUp;
                return (
                  <div key={String(title)} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--gold-soft)] text-[var(--forest)]"><ItemIcon className="size-4" /></span>
                    <div><h3 className="font-bold text-[var(--forest)]">{String(title)}</h3><p className="mt-1 text-sm leading-6 text-[var(--muted)]">{String(text)}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-[2rem] bg-[var(--forest-deep)] p-3 shadow-2xl shadow-[var(--forest)]/15 sm:p-6">
            <div className="rounded-[1.4rem] bg-[var(--white)] p-5 sm:p-7">
              <div className="flex items-start justify-between">
                <div><p className="section-kicker">Lecture Kora</p><h3 className="mt-2 text-2xl text-[var(--forest)]">Une progression régulière</h3></div>
                <span className="rounded-full bg-[var(--forest-soft)] px-3 py-1.5 text-[10px] font-bold text-[var(--success)]">Explicable</span>
              </div>
              <p className="mt-5 rounded-2xl bg-[var(--paper)] p-5 text-sm leading-7">
                Les revenus observés progressent sur six mois, avec une hausse
                de 21 % entre le premier et le dernier mois. Les paiements
                fournisseurs attendus apparaissent tous dans les données.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[["+21 %", "Évolution"], ["94 %", "Régularité"], ["4/4", "Fournisseurs"]].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-[var(--line)] p-3 text-center">
                    <p className="font-serif text-lg text-[var(--forest)]">{value}</p><p className="mt-1 text-[9px] text-[var(--muted)]">{label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[10px] leading-4 text-[var(--muted)]">Cette lecture décrit les données de démonstration. Elle n’accorde, ni ne refuse, aucun financement.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="confiance" className="scroll-mt-20 bg-[var(--forest-deep)] px-5 py-24 text-white sm:px-8 lg:py-32">
        <div className="mx-auto max-w-[86rem]">
          <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-end">
            <div>
              <p className="section-kicker !text-[var(--gold)]">Confiance par conception</p>
              <h2 className="mt-4 max-w-4xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Ce qui n’est pas autorisé<br />n’est pas transmis.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-white/58">
              Le consentement nomme ABC Bank, précise les catégories, fixe une
              expiration et peut être révoqué. La projection est filtrée côté
              serveur avant chaque réponse.
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [LockKeyhole, "Consentement explicite", "Catégories, destinataire et durée sont enregistrés."],
              [ShieldCheck, "Minimisation serveur", "Les données refusées sont absentes de la réponse."],
              [FileCheck2, "Journal d’accès", "Chaque consultation autorisée laisse une trace."],
              [Landmark, "Décision séparée", "ABC Bank reste seule responsable de son analyse."],
            ].map(([Icon, title, text]) => {
              const ItemIcon = Icon as typeof ShieldCheck;
              return (
                <article key={String(title)} className="rounded-2xl border border-white/10 bg-white/[.045] p-6">
                  <ItemIcon className="size-5 text-[var(--gold)]" />
                  <h3 className="mt-6 text-lg">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/50">{String(text)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="relative mx-auto max-w-[74rem] overflow-hidden rounded-[2.25rem] bg-[var(--gold-soft)] px-6 py-16 text-center sm:px-12 sm:py-20">
          <KoraMark className="absolute -left-20 -top-20 size-64 text-[var(--forest)]/[.035]" />
          <p className="section-kicker">Parcours de démonstration</p>
          <h2 className="relative mx-auto mt-5 max-w-4xl text-4xl leading-tight text-[var(--forest)] sm:text-5xl">
            Chaque entrepreneur crée de la valeur.<br />Kora la rend visible.
          </h2>
          <p className="relative mx-auto mt-5 max-w-2xl leading-7 text-[var(--muted)]">
            Suivez Mariam de l’import CSV jusqu’à la projection consentie pour ABC Bank.
          </p>
          <Link href="/dashboard" className="focus-ring relative mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--forest)] px-6 py-3.5 text-sm font-bold text-white">
            Lancer le parcours complet <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="bg-[#09281f] px-5 pb-8 pt-16 text-white sm:px-8">
        <div className="mx-auto max-w-[86rem]">
          <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <KoraLogo inverse />
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/48">Le passeport économique portable et consenti des petits entrepreneurs.</p>
              <p className="mt-5 text-xs text-[var(--gold)]">Conçu à Cotonou, Bénin.</p>
            </div>
            {FOOTER_LINKS.map(([title, links]) => (
              <div key={title}>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-white/35">{title}</p>
                <div className="mt-4 flex flex-col gap-3 text-sm text-white/65">
                  {links.map(([label, href]) => (
                    <Link key={label} href={href} className="hover:text-white">{label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between gap-3 pt-7 text-xs text-white/35 sm:flex-row">
            <p>© 2026 Kora Labs. Prototype de démonstration.</p>
            <p>Aucun résultat de terrain ni connecteur bancaire réel.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
