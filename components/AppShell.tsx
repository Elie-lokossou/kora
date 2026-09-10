"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Building2,
  FileCheck2,
  Fingerprint,
  LayoutDashboard,
  LockKeyhole,
  UploadCloud,
} from "lucide-react";
import { useDemo } from "./DemoProvider";

const NAV = [
  { href: "/dashboard", label: "Tableau de bord", shortLabel: "Accueil", icon: LayoutDashboard },
  { href: "/import", label: "Importer", shortLabel: "Import", icon: UploadCloud },
  { href: "/analysis", label: "Analyse", shortLabel: "Analyse", icon: BarChart3 },
  { href: "/passport", label: "Passeport", shortLabel: "Passeport", icon: Fingerprint },
  { href: "/consent", label: "Consentement", shortLabel: "Partage", icon: LockKeyhole },
  { href: "/partner", label: "Vue partenaire", shortLabel: "Banque", icon: Building2 },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { role, setRole } = useDemo();

  return (
    <div className="paper-grid min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <a
        href="#main-content"
        className="fixed left-4 top-2 z-50 -translate-y-20 rounded-lg bg-white px-4 py-2 text-sm font-bold text-[var(--forest)] focus:translate-y-0"
      >
        Aller au contenu
      </a>
      <header className="border-b border-white/10 bg-[var(--forest-deep)] text-[var(--sand)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl tracking-tight">
            <span className="grid size-8 place-items-center rounded-xl bg-[var(--gold)] text-[var(--forest-deep)]">
              <Fingerprint className="size-4" aria-hidden="true" />
            </span>
            Kora
          </Link>
          <p className="hidden text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)] lg:block">
            Votre identité économique
          </p>
          <div
            className="flex rounded-full bg-black/20 p-1 text-xs"
            role="group"
            aria-label="Changer de rôle de démonstration"
          >
            <button
              type="button"
              aria-pressed={role === "entrepreneur"}
              onClick={() => {
                setRole("entrepreneur");
                if (pathname === "/partner") {
                  router.push("/dashboard");
                }
              }}
              className={`rounded-full px-3 py-1.5 font-bold transition-colors ${
                role === "entrepreneur" ? "bg-[var(--gold)] text-[var(--ink)]" : "text-white/75"
              }`}
            >
              Mariam
            </button>
            <button
              type="button"
              aria-pressed={role === "partner"}
              onClick={() => {
                setRole("partner");
                router.push("/partner");
              }}
              className={`rounded-full px-3 py-1.5 font-bold transition-colors ${
                role === "partner" ? "bg-[var(--gold)] text-[var(--ink)]" : "text-white/75"
              }`}
            >
              ABC Bank
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-[#8e4028] bg-[var(--clay)] px-4 py-2 text-center text-xs font-medium text-white">
        <span className="mr-1.5 inline-block size-1.5 rounded-full bg-white" aria-hidden="true" />
        Données de démonstration · Mariam, commerçante à Cotonou · Aucun résultat de terrain
      </div>

      <nav
        className="border-b border-[var(--line)] bg-[var(--white)] md:hidden"
        aria-label="Parcours Kora"
      >
        <div className="flex snap-x overflow-x-auto px-2 py-2">
          {NAV.map((item, index) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-w-[78px] snap-start flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-bold ${
                  active ? "bg-[var(--forest-soft)] text-[var(--forest)]" : "text-[var(--muted)]"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                <span>{index + 1}. {item.shortLabel}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="mx-auto flex max-w-7xl gap-10 px-4 py-7 sm:px-6 lg:py-10">
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="sticky top-6" aria-label="Parcours Kora">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
              Parcours démo
            </p>
            <div className="space-y-1">
            {NAV.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[var(--forest)] text-white shadow-sm"
                      : "text-[var(--muted)] hover:bg-[var(--white)] hover:text-[var(--forest)]"
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
            </div>
            <div className="mt-7 rounded-2xl border border-[var(--line)] bg-[var(--gold-soft)] p-4">
              <FileCheck2 className="size-5 text-[var(--forest)]" aria-hidden="true" />
              <p className="mt-2 text-xs font-bold text-[var(--forest)]">Passeport sous contrôle</p>
              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                Mariam choisit ce qui est visible et pendant combien de temps.
              </p>
            </div>
          </nav>
        </aside>
        <main id="main-content" className="min-w-0 flex-1 pb-20">{children}</main>
      </div>
    </div>
  );
}
