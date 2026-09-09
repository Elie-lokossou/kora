# Décisions verrouillées

Ces décisions sont prises pour le hackathon. On ne les rouvre que si la démo est en danger.

## D1 — Problème

L'entrepreneur a une activité réelle, mais **pas de représentation structurée, portable et contrôlable** de cette activité. Le crédit est une conséquence possible, pas le produit.

## D2 — Produit

Kora génère un **Economic Passport** à partir de données d'activité. L'IA **explique**. Elle **ne décide pas**.

## D3 — Cas d'usage unique

**Évaluation de fonds de roulement / dossier économique partageable** pour un petit commerçant au Bénin.

- Entrepreneur : Mariam, commerce de détail à Cotonou
- Partenaire : ABC Bank (analyste, pas un moteur de décision)
- Valeur entrepreneur : un dossier qu'elle contrôle et réutilise
- Valeur partenaire : une vue structurée, minimisée, horodatée, consentie

On ne pitch pas l'assurance, la marketplace, ni « toute l'identité économique de l'Afrique » comme MVP.

## D4 — Données du MVP

Données de **démonstration** uniquement :

- CSV de ventes, Mobile Money, banque, paiements fournisseurs
- Aucune intégration MTN / Moov / banque réelle
- Tous les chiffres affichés portent la mention « démonstration »

## D5 — Parcours démo (3 minutes)

1. Dashboard entrepreneur (Mariam)
2. Import CSV (ou chargement du jeu démo)
3. Analyse : tendances, anomalies, résumé en français
4. Economic Passport
5. Consentement granulaire + durée
6. Vue partenaire ABC Bank (champs non autorisés invisibles)

## D6 — Stack

| Couche | Choix | Pourquoi |
|---|---|---|
| App | Next.js + TypeScript + Tailwind | Un langage, un repo, UI rapide |
| Data live | Convex (après le squelette UI) | Temps réel, auth/roles, vitesse |
| Moteur | TypeScript pur dans `lib/engine` | Hanniel teste sans backend |
| IA | Explication déterministe d'abord, LLM ensuite si clé dispo | La démo ne dépend pas d'une API |
| Auth démo | 2 rôles (entrepreneur / partenaire), comptes de démo | Zéro OAuth à configurer en 48 h |

## D7 — Contrôle des données

Un consentement a **toujours** :

- une liste de *scopes* (ce qui est partagé)
- un destinataire
- une durée
- un statut (actif / révoqué / expiré)
- une trace dans le journal d'accès

La vue partenaire ne lit **jamais** le passeport brut. Elle lit le passeport **filtré par le consentement**.

## D9 — Poids de la preuve (non négociable)

Un chiffre sans provenance est une allégation. Le passeport porte toujours :

- **déclaré** (espèces) — invérifiable dans ce MVP
- **importé** (Mobile Money / banque / CSV) — non signé, non API
- **attesté** (tiers) — 0 % dans la démo, et on le dit

Le poids de la preuve **n'est pas un scope de consentement**. Mariam peut cacher ses transactions. Elle ne peut pas cacher que Kora n'atteste rien.

Voir [ESPRIT-CRITIQUE.md](./ESPRIT-CRITIQUE.md).

## D8 — Ce que l'on ne construit pas

- Score de crédit, acceptation/refus de prêt
- Chatbot
- App de budget personnelle
- Connecteurs Mobile Money / banques
- Multi-entrepreneurs, multi-pays, admin complexe
- Billing, notifications email, app mobile native
