"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  Building2,
  ChevronRight,
  FileCheck2,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  UploadCloud,
  X,
} from "lucide-react";
import { useDemo } from "./DemoProvider";
import { KoraLogo, KoraMark } from "./KoraLogo";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/dashboard", label: "Vue d’ensemble", shortLabel: "Accueil", icon: LayoutDashboard },
  { href: "/import", label: "Importer l’activité", shortLabel: "Import", icon: UploadCloud },
  { href: "/analysis", label: "Analyse Kora", shortLabel: "Analyse", icon: BarChart3 },
  { href: "/passport", label: "Economic Passport", shortLabel: "Passeport", icon: FileCheck2 },
  { href: "/consent", label: "Consentement", shortLabel: "Partage", icon: LockKeyhole },
  { href: "/partner", label: "Espace partenaire", shortLabel: "Banque", icon: Building2 },
] as const;

const ROUTE_META = Object.fromEntries(
  NAV.map((item, index) => [
    item.href,
    { label: item.label, step: index + 1 },
  ]),
);

function RoleSwitcher({
  compact = false,
  onNavigate,
}: {
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { role, setRole } = useDemo();

  if (compact) {
    return (
      <button
        type="button"
        title={role === "entrepreneur" ? "Passer côté ABC Bank" : "Revenir côté Mariam"}
        aria-label={role === "entrepreneur" ? "Passer côté ABC Bank" : "Revenir côté Mariam"}
        className="mx-auto grid size-9 place-items-center rounded-xl bg-white/8 text-[var(--gold)]"
        onClick={() => {
          const nextRole = role === "entrepreneur" ? "partner" : "entrepreneur";
          setRole(nextRole);
          router.push(nextRole === "partner" ? "/partner" : "/dashboard");
          onNavigate?.();
        }}
      >
        {role === "entrepreneur" ? "M" : "A"}
      </button>
    );
  }

  return (
    <div className="rounded-xl bg-white/[.055] p-1" role="group" aria-label="Changer de rôle de démonstration">
      <div className="grid grid-cols-2 gap-1">
        <button
          type="button"
          aria-pressed={role === "entrepreneur"}
          onClick={() => {
            setRole("entrepreneur");
            if (pathname === "/partner") router.push("/dashboard");
            onNavigate?.();
          }}
          className={cn(
            "rounded-lg px-2 py-2 text-[11px] font-bold transition-colors",
            role === "entrepreneur" ? "bg-[var(--gold)] text-[var(--forest-deep)]" : "text-white/55 hover:text-white",
          )}
        >
          Mariam
        </button>
        <button
          type="button"
          aria-pressed={role === "partner"}
          onClick={() => {
            setRole("partner");
            router.push("/partner");
            onNavigate?.();
          }}
          className={cn(
            "rounded-lg px-2 py-2 text-[11px] font-bold transition-colors",
            role === "partner" ? "bg-[var(--gold)] text-[var(--forest-deep)]" : "text-white/55 hover:text-white",
          )}
        >
          ABC Bank
        </button>
      </div>
    </div>
  );
}

function SidebarContent({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const currentIndex = NAV.findIndex((item) => item.href === pathname);

  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex h-[4.75rem] items-center border-b border-white/9", collapsed ? "justify-center px-3" : "px-5")}>
        <Link href="/" aria-label="Kora — retour à l’accueil" onClick={onNavigate}>
          <KoraLogo compact={collapsed} inverse />
        </Link>
      </div>
      <div className={cn("flex-1 overflow-y-auto py-6", collapsed ? "px-2" : "px-4")}>
        {collapsed ? null : (
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-white/30">Espace Kora</p>
        )}
        <nav className="space-y-1.5" aria-label="Parcours Kora">
          {NAV.map((item, index) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center rounded-xl text-sm font-medium transition-all",
                  collapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5",
                  active
                    ? "bg-white text-[var(--forest-deep)] shadow-[0_8px_24px_rgba(0,0,0,.12)]"
                    : "text-white/56 hover:bg-white/[.06] hover:text-white",
                )}
              >
                <Icon className={cn("size-[18px] shrink-0", active ? "text-[var(--forest)]" : "text-white/50 group-hover:text-[var(--gold)]")} aria-hidden="true" />
                {collapsed ? null : <span className="flex-1">{item.label}</span>}
                {collapsed ? null : (
                  <span className={cn("text-[10px]", active ? "text-[var(--clay)]" : "text-white/22")}>0{index + 1}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {collapsed ? null : (
          <div className="mt-8 rounded-2xl border border-white/9 bg-white/[.045] p-4">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-white/38">
              <span>Parcours démo</span><span>{Math.max(currentIndex + 1, 1)}/6</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-[var(--gold)] transition-[width]"
                style={{ width: `${Math.max(((currentIndex + 1) / NAV.length) * 100, 16.67)}%` }}
              />
            </div>
            <p className="mt-3 text-[11px] leading-5 text-white/42">
              Importer, comprendre, créer puis partager sous contrôle.
            </p>
          </div>
        )}
      </div>
      <div className={cn("border-t border-white/9 py-4", collapsed ? "px-2" : "px-4")}>
        <RoleSwitcher compact={collapsed} onNavigate={onNavigate} />
        {collapsed ? null : (
          <div className="mt-4 flex items-center gap-3 px-2">
            <span className="grid size-9 place-items-center rounded-xl bg-[var(--gold)] text-xs font-bold text-[var(--forest-deep)]">MD</span>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white">Mariam Dossou</p>
              <p className="truncate text-[10px] text-white/35">Mariam Commerce</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const route = ROUTE_META[pathname] ?? { label: "Kora", step: 1 };

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--ink)]">
      <a href="#main-content" className="fixed left-4 top-2 z-[70] -translate-y-20 rounded-lg bg-white px-4 py-2 text-sm font-bold text-[var(--forest)] shadow-lg focus:translate-y-0">
        Aller au contenu
      </a>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 hidden bg-[var(--forest-deep)] text-white transition-[width] duration-200 md:block",
          collapsed ? "w-[5rem]" : "w-[16.5rem]",
        )}
      >
        <SidebarContent collapsed={collapsed} />
        <button
          type="button"
          className="absolute -right-3 top-[5.55rem] grid size-7 place-items-center rounded-full border border-[var(--line)] bg-[var(--white)] text-[var(--forest)] shadow-sm"
          aria-label={collapsed ? "Déployer la barre latérale" : "Réduire la barre latérale"}
          onClick={() => setCollapsed((current) => !current)}
        >
          {collapsed ? <PanelLeftOpen className="size-3.5" /> : <PanelLeftClose className="size-3.5" />}
        </button>
      </aside>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 h-[4.75rem] border-b border-[var(--line)] bg-[var(--white)]/92 backdrop-blur-xl transition-[left] md:left-[16.5rem]",
          collapsed && "md:left-[5rem]",
        )}
      >
        <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="grid size-10 shrink-0 place-items-center rounded-xl border border-[var(--line)] text-[var(--forest)] md:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <KoraMark className="size-8 shrink-0 text-[var(--forest)] md:hidden" />
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-bold text-[var(--forest)]">{route.label}</p>
              <p className="text-[10px] text-[var(--muted)]">Parcours Mariam · étape {route.step} sur 6</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full bg-[var(--forest-soft)] px-3 py-2 text-[10px] font-bold text-[var(--success)] lg:inline-flex">
              <span className="size-1.5 rounded-full bg-current" />Dossier synchronisé
            </span>
            <Link href="/consent" className="hidden items-center gap-2 rounded-full bg-[var(--forest)] px-4 py-2.5 text-xs font-bold text-white sm:inline-flex">
              Partager le passeport<ChevronRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button type="button" className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" aria-label="Fermer le menu" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[min(86vw,20rem)] bg-[var(--forest-deep)] text-white shadow-2xl">
            <button type="button" className="absolute right-4 top-5 z-10 grid size-9 place-items-center rounded-xl bg-white/8" aria-label="Fermer le menu" onClick={() => setMobileOpen(false)}>
              <X className="size-4" />
            </button>
            <SidebarContent collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className={cn("min-h-screen pt-[4.75rem] transition-[margin] md:ml-[16.5rem]", collapsed && "md:ml-[5rem]")}>
        <div className="border-b border-[#8e4028]/35 bg-[var(--clay-soft)] px-4 py-2 text-center text-[10px] font-bold text-[var(--clay)]">
          Données de démonstration · aucun résultat de terrain
        </div>
        <main id="main-content" className="mx-auto max-w-[96rem] px-4 pb-24 pt-7 sm:px-6 lg:px-8 lg:py-9">
          {children}
        </main>
        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-6 border-t border-[var(--line)] bg-[var(--white)]/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden" aria-label="Navigation mobile">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={cn("flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-[9px] font-bold", active ? "text-[var(--forest)]" : "text-[var(--muted)]")}>
                <Icon className="size-4" /><span className="max-w-full truncate">{item.shortLabel}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
