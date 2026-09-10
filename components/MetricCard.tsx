import type { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
  accent?: boolean;
}) {
  return (
    <article
      className={`focus-ring rounded-2xl border p-5 shadow-[0_8px_30px_rgba(20,35,28,0.04)] ${
        accent
          ? "border-[var(--forest)] bg-[var(--forest)] text-white"
          : "border-[var(--line)] bg-[var(--white)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className={`text-[11px] font-bold uppercase tracking-[0.14em] ${
            accent ? "text-white/65" : "text-[var(--muted)]"
          }`}
        >
          {label}
        </p>
        {Icon ? (
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-xl ${
              accent ? "bg-white/10 text-[var(--gold)]" : "bg-[var(--forest-soft)] text-[var(--forest)]"
            }`}
          >
            <Icon className="size-4" aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <p
        className={`mt-3 font-serif text-3xl leading-none ${
          accent ? "text-white" : "text-[var(--forest)]"
        }`}
      >
        {value}
      </p>
      {hint ? (
        <p className={`mt-3 text-xs ${accent ? "text-white/65" : "text-[var(--muted)]"}`}>
          {hint}
        </p>
      ) : null}
    </article>
  );
}
