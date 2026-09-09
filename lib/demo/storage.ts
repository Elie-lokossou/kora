import type { ConsentGrant, ConsentScope } from "../engine/types";
import type { DemoPartnerId } from "./partners";

const KEY = "kora.demo.v2";

export type DemoRole = "entrepreneur" | "partner";

export type AccessReceipt = {
  id: string;
  partnerName: string;
  viewedAt: string;
  scopes: ConsentScope[];
};

export type DemoState = {
  role: DemoRole;
  partnerId: DemoPartnerId;
  scopes: ConsentScope[];
  durationDays: number;
  consent: ConsentGrant | null;
  receipts: AccessReceipt[];
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
  partnerId: "dantokpa",
  scopes: DEFAULT_SCOPES,
  durationDays: 30,
  consent: null,
  receipts: [],
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
      partnerId: parsed.partnerId ?? DEFAULT_STATE.partnerId,
      scopes: parsed.scopes ?? DEFAULT_SCOPES,
      receipts: parsed.receipts ?? [],
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
