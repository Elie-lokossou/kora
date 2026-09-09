"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { addDays, buildPartnerView } from "@/lib/engine/consent";
import { computeEvidence } from "@/lib/engine/evidence";
import { computeIndicators } from "@/lib/engine/indicators";
import { buildPassport } from "@/lib/engine/explain";
import { parseCsv } from "@/lib/engine/normalize";
import type {
  ConsentGrant,
  ConsentScope,
  EconomicPassport,
  PartnerView,
  Transaction,
} from "@/lib/engine/types";
import { buildMariamPassport, MARIAM_PROFILE, MARIAM_TRANSACTIONS } from "@/lib/demo/mariam";
import { getDemoPartner, type DemoPartnerId } from "@/lib/demo/partners";
import {
  DEFAULT_SCOPES,
  getDemoSnapshot,
  getServerDemoSnapshot,
  subscribeDemo,
  writeDemoState,
  type AccessReceipt,
  type DemoRole,
  type DemoState,
} from "@/lib/demo/storage";

type DemoContextValue = {
  role: DemoRole;
  setRole: (role: DemoRole) => void;
  partnerId: DemoPartnerId;
  setPartnerId: (id: DemoPartnerId) => void;
  partnerName: string;
  partnerAsk: string;
  transactions: Transaction[];
  passport: EconomicPassport;
  scopes: ConsentScope[];
  setScopes: (scopes: ConsentScope[]) => void;
  durationDays: number;
  setDurationDays: (days: number) => void;
  consent: ConsentGrant | null;
  authorize: () => void;
  revoke: () => void;
  partnerView: PartnerView | null;
  previewView: PartnerView;
  receipts: AccessReceipt[];
  recordPartnerOpen: () => void;
  importCsv: (csv: string) => void;
  resetDemo: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

function makeGrant(
  partnerName: string,
  scopes: ConsentScope[],
  durationDays: number,
  status: ConsentGrant["status"],
): ConsentGrant {
  return {
    id: "consent-demo",
    partnerName,
    partnerId: "partner-demo",
    scopes,
    durationDays,
    createdAt: "2026-09-09T09:00:00.000Z",
    expiresAt: addDays("2026-09-09", durationDays),
    status,
  };
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(
    subscribeDemo,
    getDemoSnapshot,
    getServerDemoSnapshot,
  );
  const [transactions, setTransactions] =
    useState<Transaction[]>(MARIAM_TRANSACTIONS);

  const partner = getDemoPartner(stored.partnerId);

  const passport = useMemo(() => {
    if (transactions === MARIAM_TRANSACTIONS) {
      return buildMariamPassport();
    }
    return buildPassport({
      ...MARIAM_PROFILE,
      generatedAt: "2026-09-09T09:00:00.000Z",
      indicators: computeIndicators(transactions),
      evidence: computeEvidence(transactions),
    });
  }, [transactions]);

  const partnerView = useMemo(() => {
    if (!stored.consent) {
      return null;
    }
    return buildPartnerView(
      passport,
      stored.consent,
      "2026-09-09T12:00:00.000Z",
    );
  }, [stored.consent, passport]);

  const previewView = useMemo(() => {
    return buildPartnerView(
      passport,
      makeGrant(partner.name, stored.scopes, stored.durationDays, "active"),
      "2026-09-09T12:00:00.000Z",
    );
  }, [passport, partner.name, stored.scopes, stored.durationDays]);

  const patch = useCallback((partial: Partial<DemoState>) => {
    writeDemoState({ ...getDemoSnapshot(), ...partial });
  }, []);

  const recordPartnerOpen = useCallback(() => {
    const current = getDemoSnapshot();
    if (!current.consent || current.consent.status !== "active") {
      return;
    }
    const last = current.receipts[current.receipts.length - 1];
    if (last && last.partnerName === current.consent.partnerName) {
      return;
    }
    const receipt: AccessReceipt = {
      id: `receipt-${current.receipts.length + 1}`,
      partnerName: current.consent.partnerName,
      viewedAt: "2026-09-09T15:02:00.000Z",
      scopes: current.consent.scopes,
    };
    patch({ receipts: [...current.receipts, receipt] });
  }, [patch]);

  const value: DemoContextValue = {
    role: stored.role,
    setRole: (role) => patch({ role }),
    partnerId: stored.partnerId,
    setPartnerId: (partnerId) => patch({ partnerId, consent: null }),
    partnerName: partner.name,
    partnerAsk: partner.ask,
    transactions,
    passport,
    scopes: stored.scopes,
    setScopes: (scopes) => patch({ scopes }),
    durationDays: stored.durationDays,
    setDurationDays: (durationDays) => patch({ durationDays }),
    consent: stored.consent,
    authorize: () => {
      const current = getDemoSnapshot();
      const selected = getDemoPartner(current.partnerId);
      patch({
        consent: makeGrant(
          selected.name,
          current.scopes,
          current.durationDays,
          "active",
        ),
      });
    },
    revoke: () => {
      const current = getDemoSnapshot().consent;
      if (!current) {
        return;
      }
      patch({ consent: { ...current, status: "revoked" } });
    },
    partnerView,
    previewView,
    receipts: stored.receipts,
    recordPartnerOpen,
    importCsv: (csv: string) => {
      setTransactions(parseCsv(csv));
    },
    resetDemo: () => {
      setTransactions(MARIAM_TRANSACTIONS);
      writeDemoState({
        role: "entrepreneur",
        partnerId: "dantokpa",
        scopes: DEFAULT_SCOPES,
        durationDays: 30,
        consent: null,
        receipts: [],
      });
    },
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within DemoProvider");
  }
  return context;
}
