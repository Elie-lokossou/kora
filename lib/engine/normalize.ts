import {
  DATA_SOURCES,
  DIRECTIONS,
  type DataSource,
  type Direction,
  type Transaction,
} from "./types";

export type RawTransaction = {
  id?: string;
  date: string;
  amount: string | number;
  currency?: string;
  source: string;
  direction: string;
  category?: string;
  counterparty?: string;
  description?: string;
};

function isDataSource(value: string): value is DataSource {
  return (DATA_SOURCES as readonly string[]).includes(value);
}

function isDirection(value: string): value is Direction {
  return (DIRECTIONS as readonly string[]).includes(value);
}

function parseAmount(value: string | number): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? Math.round(value) : Number.NaN;
  }
  const cleaned = value.replace(/\s/g, "").replace(",", ".");
  const amount = Number(cleaned);
  return Number.isFinite(amount) ? Math.round(amount) : Number.NaN;
}

export function normalizeTransaction(
  raw: RawTransaction,
  index: number,
): Transaction | null {
  const date = raw.date.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return null;
  }

  const amount = parseAmount(raw.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  const source = raw.source.trim().toLowerCase();
  const direction = raw.direction.trim().toLowerCase();
  if (!isDataSource(source) || !isDirection(direction)) {
    return null;
  }

  const currency = (raw.currency ?? "XOF").trim().toUpperCase();
  if (currency !== "XOF") {
    return null;
  }

  return {
    id: raw.id?.trim() || `tx-${index + 1}`,
    date,
    amount,
    currency: "XOF",
    source,
    direction,
    category: raw.category?.trim() || "other",
    counterparty: raw.counterparty?.trim() || "—",
    description: raw.description?.trim() || "",
  };
}

export function parseCsv(csv: string): Transaction[] {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const header = lines[0];
  if (!header) {
    return [];
  }

  const columns = header.split(",").map((column) => column.trim());
  const required = ["date", "amount", "source", "direction"];
  for (const name of required) {
    if (!columns.includes(name)) {
      throw new Error(`Colonne CSV manquante : ${name}`);
    }
  }

  const rows: Transaction[] = [];
  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line) {
      continue;
    }
    const values = line.split(",").map((value) => value.trim());
    const raw: RawTransaction = {
      date: "",
      amount: "",
      source: "",
      direction: "",
    };

    columns.forEach((column, columnIndex) => {
      const value = values[columnIndex] ?? "";
      switch (column) {
        case "id":
          raw.id = value;
          break;
        case "date":
          raw.date = value;
          break;
        case "amount":
          raw.amount = value;
          break;
        case "currency":
          raw.currency = value;
          break;
        case "source":
          raw.source = value;
          break;
        case "direction":
          raw.direction = value;
          break;
        case "category":
          raw.category = value;
          break;
        case "counterparty":
          raw.counterparty = value;
          break;
        case "description":
          raw.description = value;
          break;
        default:
          break;
      }
    });

    const normalized = normalizeTransaction(raw, i - 1);
    if (normalized) {
      rows.push(normalized);
    }
  }

  return rows;
}

export function transactionsToCsv(transactions: Transaction[]): string {
  const header = [
    "id",
    "date",
    "amount",
    "currency",
    "source",
    "direction",
    "category",
    "counterparty",
    "description",
  ];
  const lines = transactions.map((tx) =>
    [
      tx.id,
      tx.date,
      String(tx.amount),
      tx.currency,
      tx.source,
      tx.direction,
      tx.category,
      tx.counterparty,
      tx.description,
    ].join(","),
  );
  return [header.join(","), ...lines].join("\n");
}
