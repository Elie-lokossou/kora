import { computeIndicators } from "../engine/indicators";
import { buildPassport } from "../engine/explain";
import { transactionsToCsv } from "../engine/normalize";
import type { Transaction } from "../engine/types";

export const MARIAM_PROFILE = {
  ownerName: "Mariam Adjovi",
  businessName: "Mariam Commerce",
  city: "Cotonou",
  country: "Bénin",
  sector: "Commerce de détail",
  story:
    "Mariam vend au détail à Cotonou. Ses encaissements passent par le cash, le Mobile Money et un compte bancaire. Elle paie ses fournisseurs chaque mois.",
} as const;

const MONTHLY_INBOUND = [349321, 363999, 378678, 393357, 408036, 422714];
const MONTHS = [
  "2026-03",
  "2026-04",
  "2026-05",
  "2026-06",
  "2026-07",
  "2026-08",
] as const;

function splitAmount(total: number, parts: number[]): number[] {
  const weightSum = parts.reduce((sum, part) => sum + part, 0);
  const amounts = parts.map((part) => Math.round((total * part) / weightSum));
  const drift = total - amounts.reduce((sum, amount) => sum + amount, 0);
  const last = amounts[amounts.length - 1];
  if (last !== undefined) {
    amounts[amounts.length - 1] = last + drift;
  }
  return amounts;
}

export function buildMariamTransactions(): Transaction[] {
  const transactions: Transaction[] = [];
  let seq = 1;

  MONTHS.forEach((month, monthIndex) => {
    const inbound = MONTHLY_INBOUND[monthIndex] ?? 0;
    const sales = splitAmount(inbound, [38, 34, 28]);
    const cash = sales[0] ?? 0;
    const momo = sales[1] ?? 0;
    const bank = sales[2] ?? 0;
    const day = String(4 + monthIndex).padStart(2, "0");

    transactions.push({
      id: `tx-${String(seq).padStart(3, "0")}`,
      date: `${month}-${day}`,
      amount: cash,
      currency: "XOF",
      source: "cash",
      direction: "in",
      category: "sales",
      counterparty: "Clients marché",
      description: "Ventes en espèces",
    });
    seq += 1;

    transactions.push({
      id: `tx-${String(seq).padStart(3, "0")}`,
      date: `${month}-12`,
      amount: momo,
      currency: "XOF",
      source: "mobile_money",
      direction: "in",
      category: "sales",
      counterparty: "Clients Mobile Money",
      description: "Encaissements Mobile Money",
    });
    seq += 1;

    transactions.push({
      id: `tx-${String(seq).padStart(3, "0")}`,
      date: `${month}-22`,
      amount: bank,
      currency: "XOF",
      source: "bank",
      direction: "in",
      category: "sales",
      counterparty: "Virements clients",
      description: "Ventes reçues en banque",
    });
    seq += 1;

    transactions.push({
      id: `tx-${String(seq).padStart(3, "0")}`,
      date: `${month}-08`,
      amount: 62000 + monthIndex * 2500,
      currency: "XOF",
      source: "cash",
      direction: "out",
      category: "stock",
      counterparty: "Réapprovisionnement",
      description: "Achat de stock au marché",
    });
    seq += 1;

    if (monthIndex >= 2) {
      transactions.push({
        id: `tx-${String(seq).padStart(3, "0")}`,
        date: `${month}-18`,
        amount: 85000,
        currency: "XOF",
        source: "supplier",
        direction: "out",
        category: "supplier",
        counterparty: "Fournisseur Dantokpa",
        description: "Paiement fournisseur mensuel",
      });
      seq += 1;
    }
  });

  return transactions;
}

export const MARIAM_TRANSACTIONS = buildMariamTransactions();

export function buildMariamPassport(generatedAt = "2026-09-09T09:00:00.000Z") {
  return buildPassport({
    ...MARIAM_PROFILE,
    generatedAt,
    indicators: computeIndicators(MARIAM_TRANSACTIONS),
  });
}

export const MARIAM_CSV = transactionsToCsv(MARIAM_TRANSACTIONS);
