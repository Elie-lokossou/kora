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
import {
  DEFAULT_SCOPES,
  getDemoSnapshot,
  getServerDemoSnapshot,
  subscribeDemo,
  writeDemoState,
  type DemoRole,
  type DemoState,
} from "@/lib/demo/storage";

type DemoContextValue = {
  role: DemoRole;
  setRole: (role: DemoRole) => void;
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
  importCsv: (csv: string) => void;
  resetDemo: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(
    subscribeDemo,
    getDemoSnapshot,
    getServerDemoSnapshot,
  );
  const [transactions, setTransactions] =
    useState<Transaction[]>(MARIAM_TRANSACTIONS);

  const passport = useMemo(() => {
    if (transactions === MARIAM_TRANSACTIONS) {
      return buildMariamPassport();
    }
    return buildPassport({
      ...MARIAM_PROFILE,
      generatedAt: "2026-09-09T09:00:00.000Z",
      indicators: computeIndicators(transactions),
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

  const patch = useCallback((partial: Partial<DemoState>) => {
    writeDemoState({ ...getDemoSnapshot(), ...partial });
  }, []);

  const value: DemoContextValue = {
    role: stored.role,
    setRole: (role) => patch({ role }),
    transactions,
    passport,
    scopes: stored.scopes,
    setScopes: (scopes) => patch({ scopes }),
    durationDays: stored.durationDays,
    setDurationDays: (durationDays) => patch({ durationDays }),
    consent: stored.consent,
    authorize: () => {
      const current = getDemoSnapshot();
      patch({
        consent: {
          id: "consent-abc-bank",
          partnerName: "ABC Bank",
          partnerId: "partner-abc",
          scopes: current.scopes,
          durationDays: current.durationDays,
          createdAt: "2026-09-09T09:00:00.000Z",
          expiresAt: addDays("2026-09-09", current.durationDays),
          status: "active",
        },
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
    importCsv: (csv: string) => {
      setTransactions(parseCsv(csv));
    },
    resetDemo: () => {
      setTransactions(MARIAM_TRANSACTIONS);
      writeDemoState({
        role: "entrepreneur",
        scopes: DEFAULT_SCOPES,
        durationDays: 30,
        consent: null,
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
