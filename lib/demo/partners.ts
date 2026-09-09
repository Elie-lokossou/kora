export const DEMO_PARTNERS = [
  {
    id: "dantokpa",
    name: "Fournisseur Dantokpa",
    kind: "supplier",
    ask: "Veut savoir si Mariam règle ses stocks avant de lui faire crédit marchand.",
  },
  {
    id: "abc",
    name: "ABC Bank",
    kind: "bank",
    ask: "Veut un dossier de fonds de roulement, pas tout l'historique de ventes.",
  },
] as const;

export type DemoPartnerId = (typeof DEMO_PARTNERS)[number]["id"];

export function getDemoPartner(id: DemoPartnerId) {
  const partner = DEMO_PARTNERS.find((item) => item.id === id);
  if (!partner) {
    return DEMO_PARTNERS[0];
  }
  return partner;
}
