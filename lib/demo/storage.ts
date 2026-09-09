import type { ConsentGrant, ConsentScope } from "../engine/types";

const KEY = "kora.demo.v1";

export type DemoRole = "entrepreneur" | "partner";

export type DemoState = {
  role: DemoRole;
  scopes: ConsentScope[];
  durationDays: number;
  consent: ConsentGrant | null;
};

export const DEFAULT_SCOPES: ConsentScope[] = [
  "aggregated_revenue",
  "activity_trend",
  "cashflow_summary",
  "regularity",
  "supplier_reliability",
  "ai_summary",
];

export const DEFAULT_STATE: DemoState = {
  role: "entrepreneur",
  scopes: DEFAULT_SCOPES,
  durationDays: 30,
  consent: null,
};

const listeners = new Set<() => void>();
let snapshot: DemoState = DEFAULT_STATE;
let rawCache: string | null = null;

function readState(): DemoState {
  if (typeof window === "undefined") {
    return DEFAULT_STATE;
  }
  const raw = window.localStorage.getItem(KEY);
  if (raw === rawCache) {
    return snapshot;
  }
  rawCache = raw;
  if (!raw) {
    snapshot = DEFAULT_STATE;
    return snapshot;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<DemoState>;
    snapshot = {
      ...DEFAULT_STATE,
      ...parsed,
      scopes: parsed.scopes ?? DEFAULT_SCOPES,
    };
    return snapshot;
  } catch {
    snapshot = DEFAULT_STATE;
    return snapshot;
  }
}

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function getDemoSnapshot(): DemoState {
  return readState();
}

export function getServerDemoSnapshot(): DemoState {
  return DEFAULT_STATE;
}

export function subscribeDemo(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function writeDemoState(next: DemoState): void {
  snapshot = next;
  if (typeof window !== "undefined") {
    const raw = JSON.stringify(next);
    rawCache = raw;
    window.localStorage.setItem(KEY, raw);
  }
  emit();
}
