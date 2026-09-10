import { cn } from "@/lib/cn";

type KoraLogoProps = {
  className?: string;
  compact?: boolean;
  inverse?: boolean;
};

export function KoraMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 3.75 40.5 10v12.35c0 10.1-6.67 18.73-16.5 21.9-9.83-3.17-16.5-11.8-16.5-21.9V10L24 3.75Z"
        fill="currentColor"
      />
      <path
        d="M16.2 14.6v18.8M31.8 14.6 20.4 24l11.4 9.4"
        stroke="var(--logo-detail, #F4C95D)"
        strokeWidth="4.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.1 35.55c3.85 1.46 7.95 1.46 11.8 0"
        stroke="var(--logo-detail, #F4C95D)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="34.2" cy="12.8" r="2.2" fill="var(--logo-detail, #F4C95D)" />
    </svg>
  );
}

export function KoraLogo({
  className,
  compact = false,
  inverse = false,
}: KoraLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        inverse ? "text-white" : "text-[var(--forest-deep)]",
        className,
      )}
    >
      <KoraMark className="size-9 shrink-0" />
      {compact ? null : (
        <span className="font-serif text-[1.35rem] font-semibold leading-none tracking-[-0.06em]">
          kora
        </span>
      )}
    </span>
  );
}
