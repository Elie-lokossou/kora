import {
  EVIDENCE_GRADE_LABELS,
  EVIDENCE_LEVEL_LABELS,
  type EvidenceProfile,
} from "@/lib/engine/types";
import { sourceLabel } from "@/lib/format";

function pct(value: number): string {
  return `${Math.round(value * 100)} %`;
}

export function EvidencePanel({
  evidence,
  title = "Poids de la preuve",
  compact = false,
}: {
  evidence: EvidenceProfile;
  title?: string;
  compact?: boolean;
}) {
  return (
    <section className="rounded-2xl border border-[var(--clay)]/40 bg-white p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--clay)]">
        {title}
      </p>
      <h2 className="mt-1 font-serif text-xl text-[var(--forest)]">
        {EVIDENCE_GRADE_LABELS[evidence.grade]}
      </h2>
      {compact ? (
        <p className="mt-2 text-sm text-[var(--muted)]">
          {Math.round(evidence.declaredShare * 100)} % déclaré ·{" "}
          {Math.round(evidence.importedShare * 100)} % importé ·{" "}
          {Math.round(evidence.attestedShare * 100)} % attesté. Kora n&apos;est
          pas une attestation.
        </p>
      ) : (
        <p className="mt-3 text-sm leading-7">{evidence.statement}</p>
      )}
      {compact ? null : (
        <>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
            <li className="rounded-lg bg-[var(--sand)] px-3 py-2">
              Déclaré · {pct(evidence.declaredShare)}
            </li>
            <li className="rounded-lg bg-[var(--sand)] px-3 py-2">
              Importé · {pct(evidence.importedShare)}
            </li>
            <li className="rounded-lg bg-[var(--sand)] px-3 py-2">
              Attesté · {pct(evidence.attestedShare)}
            </li>
          </ul>
          <ul className="mt-4 space-y-1 text-sm text-[var(--muted)]">
            {evidence.bySource.map((row) => (
              <li key={row.source} className="flex justify-between gap-4">
                <span>
                  {sourceLabel(row.source)} · {EVIDENCE_LEVEL_LABELS[row.level]}
                </span>
                <span>{pct(row.share)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
