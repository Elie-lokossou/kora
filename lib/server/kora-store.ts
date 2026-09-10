import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { buildMariamPassport, MARIAM_PROFILE, MARIAM_TRANSACTIONS } from "@/lib/demo/mariam";
import { addDays, buildPartnerView } from "@/lib/engine/consent";
import { buildPassport } from "@/lib/engine/explain";
import { computeIndicators } from "@/lib/engine/indicators";
import { parseCsv } from "@/lib/engine/normalize";
import {
  CONSENT_SCOPES,
  type ConsentGrant,
  type ConsentScope,
  type EconomicPassport,
  type PartnerView,
  type Transaction,
} from "@/lib/engine/types";

export type AccessLog = {
  id: string;
  consentId: string;
  actor: "ABC Bank";
  action: "partner_view";
  createdAt: string;
  scopes: ConsentScope[];
};

export type KoraState = {
  version: 1;
  transactions: Transaction[];
  consent: ConsentGrant | null;
  accessLogs: AccessLog[];
  updatedAt: string;
};

export type PublicKoraState = {
  transactions: Transaction[];
  passport: EconomicPassport;
  consent: ConsentGrant | null;
  accessLogCount: number;
  updatedAt: string;
};

const STORE_PATH = process.env.KORA_DATA_FILE ?? join(process.cwd(), ".data", "kora.json");
const MAX_CSV_BYTES = 512_000;
let writeQueue = Promise.resolve();

function initialState(): KoraState {
  return {
    version: 1,
    transactions: MARIAM_TRANSACTIONS,
    consent: null,
    accessLogs: [],
    updatedAt: new Date().toISOString(),
  };
}

function isStoredState(value: unknown): value is KoraState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<KoraState>;
  return (
    state.version === 1 &&
    Array.isArray(state.transactions) &&
    (state.consent === null || typeof state.consent === "object") &&
    Array.isArray(state.accessLogs) &&
    typeof state.updatedAt === "string"
  );
}

async function persist(state: KoraState): Promise<void> {
  await mkdir(dirname(STORE_PATH), { recursive: true });
  const temporaryPath = `${STORE_PATH}.${process.pid}.tmp`;
  await writeFile(temporaryPath, JSON.stringify(state, null, 2), "utf8");
  await rename(temporaryPath, STORE_PATH);
}

async function readState(): Promise<KoraState> {
  try {
    const parsed: unknown = JSON.parse(
      await readFile(/* turbopackIgnore: true */ STORE_PATH, "utf8"),
    );
    if (!isStoredState(parsed)) throw new Error("Format de stockage Kora invalide.");
    return parsed;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    const state = initialState();
    await persist(state);
    return state;
  }
}

function passportFrom(transactions: Transaction[], updatedAt: string): EconomicPassport {
  if (transactions.length === MARIAM_TRANSACTIONS.length) {
    const sameIds = transactions.every((transaction, index) => transaction.id === MARIAM_TRANSACTIONS[index]?.id);
    if (sameIds) return buildMariamPassport(updatedAt);
  }
  return buildPassport({
    ...MARIAM_PROFILE,
    generatedAt: updatedAt,
    indicators: computeIndicators(transactions),
  });
}

async function mutate(update: (state: KoraState) => KoraState | Promise<KoraState>): Promise<KoraState> {
  let result: KoraState | undefined;
  writeQueue = writeQueue.then(async () => {
    result = await update(await readState());
    await persist(result);
  });
  await writeQueue;
  if (!result) throw new Error("La mutation Kora n’a pas abouti.");
  return result;
}

export async function getPublicState(): Promise<PublicKoraState> {
  const state = await readState();
  return {
    transactions: state.transactions,
    passport: passportFrom(state.transactions, state.updatedAt),
    consent: state.consent,
    accessLogCount: state.accessLogs.length,
    updatedAt: state.updatedAt,
  };
}

export async function importTransactions(csv: string): Promise<PublicKoraState> {
  if (Buffer.byteLength(csv, "utf8") > MAX_CSV_BYTES) {
    throw new Error("Le fichier dépasse la limite de 500 Ko.");
  }
  const transactions = parseCsv(csv);
  if (transactions.length === 0) {
    throw new Error("Aucune transaction valide n’a été trouvée.");
  }
  await mutate((state) => ({
    ...state,
    transactions,
    consent: null,
    updatedAt: new Date().toISOString(),
  }));
  return getPublicState();
}

export async function createConsent(input: {
  scopes: unknown;
  durationDays: unknown;
}): Promise<ConsentGrant> {
  if (!Array.isArray(input.scopes) || input.scopes.length === 0) {
    throw new Error("Sélectionne au moins une catégorie.");
  }
  const scopes = [...new Set(input.scopes)];
  if (!scopes.every((scope): scope is ConsentScope => typeof scope === "string" && CONSENT_SCOPES.includes(scope as ConsentScope))) {
    throw new Error("Une catégorie de consentement est invalide.");
  }
  const durationDays = Number(input.durationDays);
  if (![7, 15, 30, 60, 90].includes(durationDays)) {
    throw new Error("La durée de consentement est invalide.");
  }
  const createdAt = new Date().toISOString();
  const consent: ConsentGrant = {
    id: `consent-${crypto.randomUUID()}`,
    partnerName: "ABC Bank",
    partnerId: "partner-abc",
    scopes,
    durationDays,
    createdAt,
    expiresAt: addDays(createdAt.slice(0, 10), durationDays),
    status: "active",
  };
  await mutate((state) => ({ ...state, consent, updatedAt: createdAt }));
  return consent;
}

export async function revokeConsent(): Promise<ConsentGrant> {
  const state = await mutate((current) => {
    if (!current.consent) throw new Error("Aucun consentement à révoquer.");
    return {
      ...current,
      consent: { ...current.consent, status: "revoked" },
      updatedAt: new Date().toISOString(),
    };
  });
  if (!state.consent) throw new Error("Aucun consentement à révoquer.");
  return state.consent;
}

export async function getPartnerProjection(): Promise<{
  view: PartnerView | null;
  accessLogId: string | null;
}> {
  const state = await readState();
  if (!state.consent) return { view: null, accessLogId: null };
  const view = buildPartnerView(
    passportFrom(state.transactions, state.updatedAt),
    state.consent,
    new Date().toISOString(),
  );
  if (view.granted.length === 0) return { view, accessLogId: null };
  const log: AccessLog = {
    id: `access-${crypto.randomUUID()}`,
    consentId: state.consent.id,
    actor: "ABC Bank",
    action: "partner_view",
    createdAt: new Date().toISOString(),
    scopes: view.granted,
  };
  await mutate((current) => ({ ...current, accessLogs: [...current.accessLogs, log] }));
  return { view, accessLogId: log.id };
}

export async function resetKoraState(): Promise<PublicKoraState> {
  await mutate(() => initialState());
  return getPublicState();
}
