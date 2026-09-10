"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { KoraLogo } from "@/components/KoraLogo";

const SLIDES = [
  {
    kicker: "Kora Labs · Cotonou",
    title: "Kora",
    body: "Le dossier économique que l’entrepreneur possède — et qu’il ouvre seulement à qui il veut, pour un temps limité.",
    foot: "Prototype de démonstration · Cursor Hackathon",
  },
  {
    kicker: "Le problème",
    title: "L’activité existe déjà. Le dossier, non.",
    body: "Cash, Mobile Money, banque, cahier, WhatsApp. Quand un fournisseur ou une banque demande une preuve, Mariam redonne tout — ou elle n’a rien de propre à montrer.",
    foot: "Ce n’est pas “pas de crédit”. C’est pas de représentation portable.",
  },
  {
    kicker: "Ce qui existe déjà",
    title: "L’Inde a déjà ce geste.",
    body: "L’Account Aggregator : tu autorises une institution à voir certaines données, pour un motif, pour une durée. Tu peux retirer l’accès. Au Bénin, ce tuyau officiel n’existe pas encore — et beaucoup d’activité n’est même pas dans un système.",
    foot: "On ne copie pas l’Inde. On adapte l’idée au commerçant de Cotonou.",
  },
  {
    kicker: "Notre solution",
    title: "Elle n’envoie plus le cahier. Elle ouvre un dossier qui expire.",
    body: "Kora rassemble l’activité, la rend lisible, et laisse Mariam choisir quoi / pour qui / combien de jours. L’autre ne voit que ça. Kora ne prête pas. L’IA explique. Elle ne décide pas.",
    foot: "Données de démonstration. Aucun connecteur MTN ou banque.",
  },
] as const;

export default function PitchPage() {
  const [index, setIndex] = useState(0);
  const last = index === SLIDES.length - 1;
  const slide = SLIDES[index] ?? SLIDES[0];

  const go = useCallback((next: number) => {
    setIndex(Math.min(SLIDES.length - 1, Math.max(0, next)));
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        go(index + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(index - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  return (
    <div className="flex min-h-full flex-col bg-[var(--forest-deep)] text-white">
      <header className="flex items-center justify-between px-6 py-5 sm:px-12">
        <KoraLogo inverse />
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
          {index + 1} / {SLIDES.length}
        </p>
      </header>

      <button
        type="button"
        className="flex flex-1 flex-col justify-center px-6 text-left sm:px-16 lg:px-24"
        onClick={() => go(index + 1)}
      >
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--gold)]">
          {slide.kicker}
        </p>
        <h1 className="mt-5 max-w-5xl font-serif text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
          {slide.title}
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
          {slide.body}
        </p>
        <p className="mt-10 text-sm text-white/40">{slide.foot}</p>
      </button>

      <footer className="flex flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-12">
        <div className="flex gap-2">
          {SLIDES.map((item, slideIndex) => (
            <button
              key={item.kicker}
              type="button"
              aria-label={`Aller à ${item.kicker}`}
              onClick={() => go(slideIndex)}
              className={`h-1.5 rounded-full transition-all ${
                slideIndex === index ? "w-8 bg-[var(--gold)]" : "w-3 bg-white/25"
              }`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70"
          >
            Retour
          </button>
          {last ? (
            <Link
              href="/consent"
              className="rounded-full bg-[var(--gold)] px-5 py-2 text-sm font-bold text-[var(--forest-deep)]"
            >
              Voir le geste →
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="rounded-full bg-[var(--gold)] px-5 py-2 text-sm font-bold text-[var(--forest-deep)]"
            >
              Suite
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
