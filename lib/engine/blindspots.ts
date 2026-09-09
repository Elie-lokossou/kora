import {
  CONSENT_SCOPE_LABELS,
  type ConsentScope,
} from "./types";

const BLINDSPOTS: Record<ConsentScope, string> = {
  aggregated_revenue:
    "Il ne voit pas le revenu : il ne peut pas juger le volume de l'activité.",
  activity_trend:
    "Il ne voit pas la tendance : un bon mois isolé et une vraie croissance se ressemblent pour lui.",
  cashflow_summary:
    "Il ne voit pas le cash-flow : il ignore si l'argent reste dans l'activité.",
  regularity:
    "Il ne voit pas la régularité : il ne sait pas si l'activité est un rythme ou un accident.",
  supplier_reliability:
    "Il ne voit pas les paiements fournisseurs : inutile pour un grosiste qui veut justement ça.",
  ai_summary:
    "Il n'a pas le résumé : il doit interpréter les chiffres tout seul.",
  individual_transactions:
    "Il ne voit aucune ligne de vente : il ne peut pas reconstituer ta clientèle ni tes tickets.",
  personal_identity:
    "Il n'a pas tes informations personnelles inutiles à sa décision.",
};

export function explainBlindSpots(denied: ConsentScope[]): string {
  if (denied.length === 0) {
    return "Tu as tout ouvert. Le partenaire voit le dossier complet — et toujours le poids de la preuve.";
  }

  const highlights = denied
    .filter(
      (scope) =>
        scope === "individual_transactions" || scope === "personal_identity",
    )
    .map((scope) => BLINDSPOTS[scope]);

  const others = denied
    .filter(
      (scope) =>
        scope !== "individual_transactions" && scope !== "personal_identity",
    )
    .slice(0, 2)
    .map((scope) => BLINDSPOTS[scope]);

  const lines = [...highlights, ...others];
  const names = denied.map((scope) => CONSENT_SCOPE_LABELS[scope]).join(", ");

  return `Ce que ${denied.length === 1 ? "ce refus cache" : "ces refus cachent"} (${names}). ${lines.join(" ")} C'est le produit : un dossier utile sans livrer toute la vie.`;
}
