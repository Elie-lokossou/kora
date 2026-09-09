# Backlog par personne

Coche dans ta branche. John met à jour l'état global à chaque synchro.

Priorité : **P0 = la démo meurt sans ça**. P1 = ça rend la démo crédible. P2 = seulement si P0+P1 sont verts.

---

## Ronald — `feat/ronald-ui`

P0

- [ ] Appliquer le design system (papier / forêt / or) sur les 6 écrans
- [ ] Dashboard : 4 indicateurs + un graphique de revenus
- [ ] Import : charger le CSV démo, afficher un aperçu, bouton « Analyser »
- [ ] Passeport : profil lisible (identité économique, pas un tableau Excel)
- [ ] Consentement : cases + durée + destinataire ABC Bank
- [ ] Vue partenaire : uniquement les scopes cochés, le reste clairement « non partagé »

P1

- [ ] Analyse : tendances / anomalies / texte d'explication
- [ ] Bandeau « Données de démonstration » sur **tous** les écrans
- [ ] Switch de rôle Entrepreneur / Partenaire dans le header (arme de démo)
- [ ] États vides, chargement, erreur d'import CSV
- [ ] Responsive : ordinateur d'abord, mobile acceptable

P2

- [ ] Micro-animations, illustration, PDF du passeport
- [ ] Version anglaise de l'UI

Tu n'attends pas Convex. Branche-toi sur `DemoProvider` + `lib/demo` + `lib/engine`.

---

## Euloge — `feat/euloge-backend`

P0

- [ ] `npx convex dev` (développement, jamais `deploy` pendant le hackathon)
- [ ] Seed Mariam + ABC Bank + transactions
- [ ] Mutation d'import CSV → transactions normalisées
- [ ] Mutation « générer le passeport » qui appelle `lib/engine`
- [ ] Mutation créer / révoquer un consentement
- [ ] Query vue partenaire **filtrée par scopes + expiration**

P1

- [ ] Journal d'accès (`accessLogs`) à chaque lecture partenaire
- [ ] Séparer les fonctions publiques / internes
- [ ] Validators `args` + `returns` sur chaque fonction publique
- [ ] Brancher le frontend (avec John) sans casser le mode démo local

P2

- [ ] Pagination des transactions
- [ ] Upload fichier Convex storage

Tu ne conçois pas les formules. Tu les appelles. Tu ne construis pas de vraie auth OAuth.

---

## Hanniel — `feat/hanniel-engine`

P0

- [ ] Verrouiller `lib/engine/types.ts` (Transaction, Indicators, Passport, ConsentScope)
- [ ] `normalize.ts` : CSV / lignes brutes → transactions
- [ ] `indicators.ts` : revenu moyen, croissance, régularité, fournisseurs, cash-flow, anomalies
- [ ] Tests des formules (`npm test`)
- [ ] Schéma Convex indexé (plus de `.filter()` sur les tables chaudes)
- [ ] Règle d'accès : partenaire = consentement actif, sinon rien

P1

- [ ] `explain.ts` : résumé français déterministe (la démo marche sans clé LLM)
- [ ] Option LLM derrière un fallback (si la clé manque, texte déterministe)
- [ ] Checklist sécu dans `docs/SECURITY.md` (déjà amorcée)
- [ ] Ne jamais logger de transactions individuelles côté partenaire

P2

- [ ] Détection d'anomalies plus fine, notebook d'exploration

Tu ne construis pas l'UI. Tu livres des fonctions pures + un contrat.

---

## John — `feat/john-integration`

P0

- [ ] Fusionner cette base dans `master`
- [ ] Créer / faire créer les 4 branches
- [ ] Coller le parcours bout-en-bout (même en local)
- [ ] Script de démo chronométré : [DEMO-SCRIPT.md](./DEMO-SCRIPT.md)
- [ ] TDR : [TDR.md](./TDR.md)

P1

- [ ] Pitch 3 min + réponses aux 10 questions du brief
- [ ] Plan B hors-ligne (données locales) si le backend lâche
- [ ] Relire chaque PR : est-ce que le jury peut encore cliquer la démo ?
- [ ] Textes « ce que Kora n'est pas » visibles dans l'app (crédibilité)

P2

- [ ] Enregistrement de secours de la démo
- [ ] Page d'accueil / storytelling

Si quelqu'un est bloqué plus de 30 minutes, tu le débloques ou tu réduis sa tâche. Tu n'écris pas 4 features en parallèle.

---

## Ordre de construction (toute l'équipe)

```text
P0a  Contrats + données Mariam          Hanniel / déjà dans ce repo
P0b  6 écrans cliquables                Ronald
P0c  Seed + consentement persisté       Euloge
P0d  Parcours unique collé              John
P1   Explication + polish + journal     Hanniel / Ronald
P1   Pitch + TDR                        John + Ronald (contenu)
FREEZE  plus de features
```
