"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type {
  ConsentGrant,
  ConsentScope,
  EconomicPassport,
  PartnerView,
  Transaction,
} from "@/lib/engine/types";
import { buildMariamPassport, MARIAM_TRANSACTIONS } from "@/lib/demo/mariam";
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
  authorize: () => Promise<void>;
  revoke: () => Promise<void>;
  partnerView: PartnerView | null;
  importCsv: (csv: string) => Promise<void>;
  resetDemo: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const stored = useSyncExternalStore(
    subscribeDemo,
    getDemoSnapshot,
    getServerDemoSnapshot,
  );
  const [transactions, setTransactions] =
    useState<Transaction[]>(MARIAM_TRANSACTIONS);
  const [passport, setPassport] = useState<EconomicPassport>(() => buildMariamPassport());
  const [consent, setConsent] = useState<ConsentGrant | null>(null);
  const [partnerView, setPartnerView] = useState<PartnerView | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const patch = useCallback((partial: Partial<DemoState>) => {
    writeDemoState({ ...getDemoSnapshot(), ...partial });
  }, []);

  const applyState = useCallback((state: {
    transactions: Transaction[];
    passport: EconomicPassport;
    consent: ConsentGrant | null;
  }) => {
    setTransactions(state.transactions);
    setPassport(state.passport);
    setConsent(state.consent);
  }, []);

  const request = useCallback(async <T,>(
    url: string,
    init?: RequestInit,
  ): Promise<T> => {
    const response = await fetch(url, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
      cache: "no-store",
    });
    const payload: unknown = await response.json();
    if (!response.ok) {
      const message =
        payload && typeof payload === "object" && "error" in payload
          ? String((payload as { error: unknown }).error)
          : "Une erreur est survenue.";
      throw new Error(message);
    }
    return payload as T;
  }, []);

  useEffect(() => {
    let active = true;
    request<{
      transactions: Transaction[];
      passport: EconomicPassport;
      consent: ConsentGrant | null;
    }>("/api/state")
      .then((state) => {
        if (active) applyState(state);
      })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : "Dossier indisponible.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [applyState, request]);

  useEffect(() => {
    if (pathname !== "/partner" || !consent) {
      if (!consent) setPartnerView(null);
      return;
    }
    let active = true;
    setIsLoading(true);
    request<{ view: PartnerView | null }>("/api/partner")
      .then(({ view }) => {
        if (active) setPartnerView(view);
      })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : "Vue partenaire indisponible.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [consent, pathname, request]);

  const value: DemoContextValue = {
    role: stored.role,
    setRole: (role) => patch({ role }),
    transactions,
    passport,
    scopes: stored.scopes,
    setScopes: (scopes) => patch({ scopes }),
    durationDays: stored.durationDays,
    setDurationDays: (durationDays) => patch({ durationDays }),
    consent,
    authorize: async () => {
      const current = getDemoSnapshot();
      setIsLoading(true);
      setError(null);
      try {
        const nextConsent = await request<ConsentGrant>("/api/consents", {
          method: "POST",
          body: JSON.stringify({
            scopes: current.scopes,
            durationDays: current.durationDays,
          }),
        });
        setConsent(nextConsent);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Autorisation impossible.");
      } finally {
        setIsLoading(false);
      }
    },
    revoke: async () => {
      setIsLoading(true);
      setError(null);
      try {
        const revoked = await request<ConsentGrant>("/api/consents", {
          method: "DELETE",
        });
        setConsent(revoked);
        setPartnerView(null);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Révocation impossible.");
      } finally {
        setIsLoading(false);
      }
    },
    partnerView,
    importCsv: async (csv: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const state = await request<{
          transactions: Transaction[];
          passport: EconomicPassport;
          consent: ConsentGrant | null;
        }>("/api/import", {
          method: "POST",
          body: JSON.stringify({ csv }),
        });
        applyState(state);
        setPartnerView(null);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Import impossible.");
        throw cause;
      } finally {
        setIsLoading(false);
      }
    },
    resetDemo: async () => {
      setIsLoading(true);
      setError(null);
      try {
        const state = await request<{
          transactions: Transaction[];
          passport: EconomicPassport;
          consent: ConsentGrant | null;
        }>("/api/reset", { method: "POST" });
        applyState(state);
        setPartnerView(null);
        writeDemoState({
          role: "entrepreneur",
          scopes: DEFAULT_SCOPES,
          durationDays: 30,
          consent: null,
        });
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Réinitialisation impossible.");
      } finally {
        setIsLoading(false);
      }
    },
    isLoading,
    error,
    clearError: () => setError(null),
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
