export function formatFcfa(value: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(Math.round(value))} FCFA`;
}

export function formatPct(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${Math.round(value * 100)} %`;
}

export function formatMonth(month: string): string {
  const [year, mm] = month.split("-");
  if (!year || !mm) {
    return month;
  }
  return new Date(Number(year), Number(mm) - 1, 1).toLocaleDateString("fr-FR", {
    month: "short",
    year: "numeric",
  });
}

export function sourceLabel(source: string): string {
  switch (source) {
    case "cash":
      return "Espèces";
    case "mobile_money":
      return "Mobile Money";
    case "bank":
      return "Banque";
    case "supplier":
      return "Fournisseur";
    default:
      return source;
  }
}
