"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDemo } from "./DemoProvider";

const NAV = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/import", label: "Import" },
  { href: "/analysis", label: "Analyse" },
  { href: "/passport", label: "Passeport" },
  { href: "/consent", label: "Consentement" },
  { href: "/partner", label: "Vue partenaire" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { role, setRole, partnerName } = useDemo();

  return (
    <div className="min-h-full bg-[var(--paper)] text-[var(--ink)]">
      <div className="border-b border-[var(--line)] bg-[var(--forest)] text-[var(--sand)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="font-serif text-xl tracking-tight">
            Kora
          </Link>
          <p className="hidden text-xs uppercase tracking-[0.18em] text-[var(--gold)] sm:block">
            Identité économique
          </p>
          <div className="flex rounded-full bg-black/20 p-1 text-xs">
            <button
              type="button"
              onClick={() => {
                setRole("entrepreneur");
                if (pathname === "/partner") {
                  router.push("/dashboard");
                }
              }}
              className={`rounded-full px-3 py-1 ${
                role === "entrepreneur" ? "bg-[var(--gold)] text-[var(--ink)]" : ""
              }`}
            >
              Mariam
            </button>
            <button
              type="button"
              onClick={() => {
                setRole("partner");
                router.push("/partner");
              }}
              className={`rounded-full px-3 py-1 ${
                role === "partner" ? "bg-[var(--gold)] text-[var(--ink)]" : ""
              }`}
            >
              {partnerName}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[var(--clay)] px-4 py-2 text-center text-xs text-white">
        Données de démonstration — Mariam, commerçante à Cotonou. Pas un résultat de terrain.
      </div>

      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-6">
        <aside className="hidden w-52 shrink-0 md:block">
          <nav className="sticky top-6 space-y-1">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 text-sm ${
                    active
                      ? "bg-[var(--forest)] text-[var(--sand)]"
                      : "text-[var(--muted)] hover:bg-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 pb-16">{children}</main>
      </div>
    </div>
  );
}
