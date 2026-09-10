import type { LucideIcon } from "lucide-react";

export function ScreenHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--clay)]">
          <span className="grid size-8 place-items-center rounded-full bg-[var(--clay-soft)]">
            <Icon aria-hidden="true" className="size-4" />
          </span>
          {eyebrow}
        </div>
        <h1 className="font-serif text-4xl leading-tight text-[var(--forest)] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">
          {description}
        </p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning";
}) {
  const tones = {
    neutral: "bg-[var(--paper-deep)] text-[var(--muted)]",
    success: "bg-[var(--forest-soft)] text-[var(--success)]",
    warning: "bg-[var(--gold-soft)] text-[var(--forest-deep)]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${tones[tone]}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </span>
  );
}
