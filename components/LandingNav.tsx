"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { KoraLogo } from "./KoraLogo";

const LINKS = [
  { href: "#produit", label: "Produit" },
  { href: "#fonctionnement", label: "Fonctionnement" },
  { href: "#confiance", label: "Confiance" },
] as const;

export function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[var(--forest-deep)]/92 text-white shadow-[0_12px_40px_rgba(7,35,27,.12)] backdrop-blur-xl">
      <nav
        className="mx-auto flex h-[4.5rem] max-w-[86rem] items-center justify-between px-5 sm:px-8"
        aria-label="Navigation principale"
      >
        <Link href="/" aria-label="Kora — accueil">
          <KoraLogo inverse />
        </Link>
        <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/dashboard"
            className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/8"
          >
            Se connecter
          </Link>
          <Link
            href="/dashboard"
            className="focus-ring rounded-full bg-[var(--gold)] px-5 py-2.5 text-sm font-bold text-[var(--forest-deep)]"
          >
            Voir la démo
          </Link>
        </div>
        <button
          type="button"
          className="grid size-10 place-items-center rounded-xl border border-white/15 sm:hidden"
          aria-expanded={open}
          aria-controls="landing-mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      {open ? (
        <div
          id="landing-mobile-menu"
          className="border-t border-white/10 bg-[var(--forest-deep)] px-5 py-5 sm:hidden"
        >
          <div className="mx-auto flex max-w-[86rem] flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-sm text-white/75 hover:bg-white/8 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/dashboard"
              className="mt-3 rounded-full bg-[var(--gold)] px-5 py-3 text-center text-sm font-bold text-[var(--forest-deep)]"
              onClick={() => setOpen(false)}
            >
              Explorer le cas Mariam
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
