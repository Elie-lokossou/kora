export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--paper)] px-4 py-24" role="status" aria-label="Chargement de la page">
      <div className="mx-auto max-w-4xl animate-pulse">
        <div className="h-3 w-28 rounded-full bg-[var(--line)]" />
        <div className="mt-5 h-12 w-3/5 rounded-xl bg-[var(--line)]" />
        <div className="mt-4 h-4 w-4/5 rounded-full bg-[var(--line)]" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="h-32 rounded-2xl bg-[var(--line)]/70" />
          ))}
        </div>
        <div className="mt-5 h-72 rounded-3xl bg-[var(--line)]/70" />
      </div>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}
